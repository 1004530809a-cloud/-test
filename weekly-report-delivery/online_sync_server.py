import argparse
import json
import os
import re
from copy import deepcopy
from datetime import datetime
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, urlparse

from sync_to_feishu import (
    attach_pdf_to_snapshot_record,
    build_reason_summary,
    get_field_type_label,
    get_tenant_access_token,
    load_low_margin_reason_details,
    sync_snapshot,
    upload_pdf_to_bitable,
    upload_pdf_to_feishu_drive,
    upsert_low_margin_reason,
    validate_snapshot_attachment_field,
)
from report_snapshot_pdf import build_snapshot_pdf


LOW_MARGIN_REASONS = [
    "sza年框账号",
    "客户指定合作账号",
    "二压已最高，无法提升",
    "对客折扣高",
    "koc批量打包订单",
    "特殊订单",
    "机构年框政策，无法再提升",
    "冲榜机构固定政策",
    "非行业媒介压价",
    "未压价",
    "客户走单账号",
]


def now_iso() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def safe_filename_part(value: str) -> str:
    return re.sub(r'[\\/:*?"<>|]+', "-", str(value or "").strip()).strip() or "未命名"


def normalize_reason(value: Any) -> str:
    return str(value or "").strip()


def mask_token(value: Any) -> str:
    text = str(value or "").strip()
    if not text:
        return ""
    if len(text) <= 8:
        return text
    return f"{text[:4]}...{text[-4:]}"


def build_snapshot_log_context(config: dict | None, config_source: str, report: dict | None = None) -> dict:
    context = {
        "configSource": config_source,
    }
    if report:
        context["period"] = str(report.get("period") or "").strip()
        context["title"] = str(report.get("title") or "").strip()
    if not config:
        return {key: value for key, value in context.items() if value not in ("", None)}

    weekly_snapshot_fields = config.get("fields", {}).get("weekly_snapshot", {}) or {}
    attachment_field = str(weekly_snapshot_fields.get("pdf_attachment") or "").strip()
    drive_folder_token = str(config.get("drive_folder_token") or "").strip()
    context.update(
        {
            "attachmentField": attachment_field,
            "storageMode": "bitable_attachment" if attachment_field else "drive",
            "uploadEndpoint": "/drive/v1/medias/upload_all" if attachment_field else "/drive/v1/files/upload_all",
            "snapshotTableId": mask_token(config.get("tables", {}).get("weekly_snapshot", "")),
            "driveFolderToken": mask_token(drive_folder_token),
            "driveFolderConfigured": bool(drive_folder_token),
        }
    )
    return {key: value for key, value in context.items() if value not in ("", None)}


def parse_http_error_details(message: str) -> dict:
    if not message:
        return {}
    base_message, _, request_payload = message.partition(" | request=")
    match = re.match(r"^HTTP (?P<status>\d+) (?P<url>\S+): (?P<body>\{.*\})$", base_message, re.DOTALL)
    if not match:
        return {}

    details: dict[str, Any] = {
        "httpStatus": int(match.group("status")),
        "requestUrl": match.group("url"),
    }
    try:
        body = json.loads(match.group("body"))
    except Exception:
        body = None
    if isinstance(body, dict):
        details["feishuCode"] = body.get("code")
        details["feishuMsg"] = body.get("msg")
        error_info = body.get("error") or {}
        if isinstance(error_info, dict):
            log_id = str(error_info.get("log_id") or "").strip()
            troubleshooter = str(error_info.get("troubleshooter") or "").strip()
            method_id = str(error_info.get("method_id") or "").strip()
            if log_id:
                details["feishuLogId"] = log_id
            if troubleshooter:
                details["troubleshooter"] = troubleshooter
            if method_id:
                details["methodId"] = method_id
    if request_payload:
        try:
            details["requestContext"] = json.loads(request_payload)
        except Exception:
            details["requestContext"] = request_payload
    return {key: value for key, value in details.items() if value not in ("", None, {}, [])}


def build_snapshot_failure_hint(message: str, diagnostics: dict) -> str:
    text = str(message or "").strip()
    attachment_field = str(diagnostics.get("attachmentField") or "").strip()
    if attachment_field:
        if "未找到字段" in text:
            return f'请确认飞书周报快照表里已经创建字段“{attachment_field}”，并且字段名与 FEISHU_SYNC_CONFIG_JSON 完全一致。'
        if "不是附件字段" in text or "当前类型为" in text:
            return f'请把飞书周报快照表中的“{attachment_field}”字段改成附件类型后重试。'
    if diagnostics.get("storageMode") == "bitable_attachment":
        return "请优先检查周报快照表的 PDF 附件字段、应用权限，以及 FEISHU_SYNC_CONFIG_JSON 配置。"
    return ""


def build_snapshot_config_check_message(attachment_field: str, storage_mode: str, drive_folder_configured: bool) -> str:
    attachment_field = str(attachment_field or "").strip()
    if attachment_field:
        return f'飞书快照配置检查通过：字段“{attachment_field}”已确认是附件类型，可直接保存 PDF 快照。'
    if storage_mode == "drive":
        if drive_folder_configured:
            return "飞书快照配置检查通过：当前未配置 PDF 附件字段，快照将上传到飞书云空间指定目录。"
        return "飞书快照配置检查通过：当前未配置 PDF 附件字段，快照将上传到飞书云空间根目录。"
    return "飞书快照配置检查通过。"


def log_snapshot_event(event: str, payload: dict):
    print(f"[{event}] {json.dumps(payload, ensure_ascii=False, sort_keys=True)}", flush=True)


def format_money(value: float) -> str:
    return f"{value:,.2f}"


def to_number(value: Any) -> float:
    if value in (None, "", "-"):
        return 0.0
    try:
        return float(str(value).replace(",", "").strip())
    except Exception:
        return 0.0


def summarize_low_margin_orders(orders: list[dict]) -> dict:
    filled_count = sum(1 for order in orders if normalize_reason(order.get("reason")))
    rows = []
    for reason in LOW_MARGIN_REASONS:
        matched = [order for order in orders if normalize_reason(order.get("reason")) == reason]
        if not matched:
            continue
        rows.append([
            reason,
            str(len(matched)),
            format_money(sum(to_number(order.get("execPriceTax")) for order in matched)),
            "来自在线周报页面填写"
        ])
    if not rows:
        rows = [["待填写", "0", "0.00", "先在网页填写低毛利原因"]]
    return {
        "orderCount": str(len(orders)),
        "amount": format_money(sum(to_number(order.get("execPriceTax")) for order in orders)),
        "filledCount": str(filled_count),
        "unfilledCount": str(len(orders) - filled_count),
        "reasonRows": rows,
    }


class ReasonRepository:
    def __init__(self, data_path: Path, store_path: Path, feishu_config_path: Path | None = None):
        self.data_path = data_path
        self.store_path = store_path
        self.feishu_config_path = feishu_config_path if feishu_config_path and feishu_config_path.exists() else None

    def load_base_data(self) -> dict:
        return json.loads(self.data_path.read_text(encoding="utf-8"))

    def load_store(self) -> dict:
        if not self.store_path.exists():
            return {"periods": {}}
        try:
            return json.loads(self.store_path.read_text(encoding="utf-8"))
        except Exception:
            return {"periods": {}}

    def save_store(self, payload: dict):
        self.store_path.parent.mkdir(parents=True, exist_ok=True)
        self.store_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    def load_shared_report(self) -> dict | None:
        store = self.load_store()
        report = store.get("shared_report")
        if not isinstance(report, dict):
            return None
        return deepcopy(report)

    def save_shared_report(self, report: dict, changed_at: str = "", editor: str = ""):
        store = self.load_store()
        store["shared_report"] = deepcopy(report)
        store["shared_report_updated_at"] = changed_at or now_iso()
        if editor:
            store["shared_report_updated_by"] = editor
        self.save_store(store)

    def get_feishu_config_source(self) -> str:
        if os.environ.get("FEISHU_SYNC_CONFIG_JSON", "").strip():
            return "env_json"
        env_app_id = os.environ.get("FEISHU_APP_ID", "").strip()
        env_app_secret = os.environ.get("FEISHU_APP_SECRET", "").strip()
        env_app_token = os.environ.get("FEISHU_APP_TOKEN", "").strip()
        if env_app_id and env_app_secret and env_app_token:
            return "env_fields"
        if self.feishu_config_path:
            return f"file:{self.feishu_config_path.name}"
        return "none"

    def load_feishu_config(self) -> dict | None:
        env_json = os.environ.get("FEISHU_SYNC_CONFIG_JSON", "").strip()
        if env_json:
            return json.loads(env_json)
        env_app_id = os.environ.get("FEISHU_APP_ID", "").strip()
        env_app_secret = os.environ.get("FEISHU_APP_SECRET", "").strip()
        env_app_token = os.environ.get("FEISHU_APP_TOKEN", "").strip()
        if env_app_id and env_app_secret and env_app_token:
            return {
                "app_id": env_app_id,
                "app_secret": env_app_secret,
                "app_token": env_app_token,
                "drive_folder_token": os.environ.get("FEISHU_DRIVE_FOLDER_TOKEN", "").strip(),
                "tables": {
                    "low_margin_feedback": os.environ.get("FEISHU_TABLE_LOW_MARGIN_FEEDBACK", "").strip(),
                    "weekly_snapshot": os.environ.get("FEISHU_TABLE_WEEKLY_SNAPSHOT", "").strip(),
                },
                "views": {
                    "low_margin_feedback": os.environ.get("FEISHU_VIEW_LOW_MARGIN_FEEDBACK", "").strip(),
                    "weekly_snapshot": os.environ.get("FEISHU_VIEW_WEEKLY_SNAPSHOT", "").strip(),
                },
                "fields": {
                    "low_margin_feedback": {
                        "key": os.environ.get("FEISHU_FIELD_LOW_MARGIN_KEY", "采购订单编号").strip(),
                        "period": os.environ.get("FEISHU_FIELD_LOW_MARGIN_PERIOD", "周报周期").strip(),
                        "purchase_order_no": os.environ.get("FEISHU_FIELD_LOW_MARGIN_PURCHASE_ORDER_NO", "采购订单编号").strip(),
                        "advertiser": os.environ.get("FEISHU_FIELD_LOW_MARGIN_ADVERTISER", "广告主名称").strip(),
                        "spu_category": os.environ.get("FEISHU_FIELD_LOW_MARGIN_SPU_CATEGORY", "SPU类目").strip(),
                        "exec_price_tax": os.environ.get("FEISHU_FIELD_LOW_MARGIN_EXEC_PRICE_TAX", "执行价(含税)").strip(),
                        "gross_margin": os.environ.get("FEISHU_FIELD_LOW_MARGIN_GROSS_MARGIN", "预估订单毛利率").strip(),
                        "reason": os.environ.get("FEISHU_FIELD_LOW_MARGIN_REASON", "原因").strip(),
                        "reason_editor": os.environ.get("FEISHU_FIELD_LOW_MARGIN_REASON_EDITOR", "原因修改人").strip(),
                        "reason_updated_at": os.environ.get("FEISHU_FIELD_LOW_MARGIN_REASON_UPDATED_AT", "原因修改时间").strip(),
                        "sync_time": os.environ.get("FEISHU_FIELD_LOW_MARGIN_SYNC_TIME", "同步时间").strip(),
                    },
                    "weekly_snapshot": {
                        "key": os.environ.get("FEISHU_FIELD_SNAPSHOT_KEY", "周报周期").strip(),
                        "period": os.environ.get("FEISHU_FIELD_SNAPSHOT_PERIOD", "周报周期").strip(),
                        "title": os.environ.get("FEISHU_FIELD_SNAPSHOT_TITLE", "周报标题").strip(),
                        "sza_amount": os.environ.get("FEISHU_FIELD_SNAPSHOT_SZA_AMOUNT", "SZA成交金额").strip(),
                        "non_sza_amount": os.environ.get("FEISHU_FIELD_SNAPSHOT_NON_SZA_AMOUNT", "非SZA成交金额").strip(),
                        "sza_margin": os.environ.get("FEISHU_FIELD_SNAPSHOT_SZA_MARGIN", "SZA预估毛利率").strip(),
                        "non_sza_margin": os.environ.get("FEISHU_FIELD_SNAPSHOT_NON_SZA_MARGIN", "非SZA预估毛利率").strip(),
                        "low_margin_count": os.environ.get("FEISHU_FIELD_SNAPSHOT_LOW_MARGIN_COUNT", "低毛利订单数").strip(),
                        "low_margin_amount": os.environ.get("FEISHU_FIELD_SNAPSHOT_LOW_MARGIN_AMOUNT", "低毛利成交金额").strip(),
                        "filled_count": os.environ.get("FEISHU_FIELD_SNAPSHOT_FILLED_COUNT", "已填写原因").strip(),
                        "unfilled_count": os.environ.get("FEISHU_FIELD_SNAPSHOT_UNFILLED_COUNT", "未填写原因").strip(),
                        "reason_summary": os.environ.get("FEISHU_FIELD_SNAPSHOT_REASON_SUMMARY", "原因汇总").strip(),
                        "pdf_attachment": os.environ.get("FEISHU_FIELD_SNAPSHOT_PDF_ATTACHMENT", "").strip(),
                        "sync_time": os.environ.get("FEISHU_FIELD_SNAPSHOT_SYNC_TIME", "同步时间").strip(),
                    },
                },
            }
        if not self.feishu_config_path:
            return None
        return json.loads(self.feishu_config_path.read_text(encoding="utf-8"))

    def load_reason_details(self, period: str) -> dict[str, dict]:
        config = self.load_feishu_config()
        if config:
            access_token = get_tenant_access_token(config["app_id"], config["app_secret"])
            return load_low_margin_reason_details(config, access_token, period)

        store = self.load_store()
        return deepcopy(store.get("periods", {}).get(period, {}).get("reasons", {}))

    def append_local_history_to_store(self, store: dict, period: str, order: dict, before: str, after: str, editor: str, changed_at: str):
        period_bucket = store.setdefault("periods", {}).setdefault(period, {"reasons": {}, "history": []})
        period_bucket["reasons"][order["purchaseOrderNo"]] = {
            "reason": after,
            "reasonEditor": editor,
            "reasonUpdatedAt": changed_at,
        }
        period_bucket["history"].append({
            "purchaseOrderNo": order["purchaseOrderNo"],
            "advertiser": order.get("advertiser", ""),
            "before": before,
            "after": after,
            "editor": editor,
            "changedAt": changed_at,
        })
        period_bucket["history"] = period_bucket["history"][-200:]

    def append_local_history(self, period: str, order: dict, before: str, after: str, editor: str, changed_at: str):
        store = self.load_store()
        self.append_local_history_to_store(store, period, order, before, after, editor, changed_at)
        self.save_store(store)

    def upsert_reason(self, period: str, order: dict, reason: str, editor: str, changed_at: str):
        config = self.load_feishu_config()
        if config:
            access_token = get_tenant_access_token(config["app_id"], config["app_secret"])
            upsert_low_margin_reason(
                config=config,
                access_token=access_token,
                period=period,
                order=order,
                reason=reason,
                reason_editor=editor,
                reason_updated_at=changed_at,
            )
            merged_data = self.build_report_data()
            self.save_shared_report(merged_data, changed_at=changed_at, editor=editor)
            sync_snapshot(merged_data, config, access_token)
            return
        existing = self.load_reason_details(period).get(order["purchaseOrderNo"], {})
        self.append_local_history(
            period=period,
            order=order,
            before=normalize_reason(existing.get("reason")),
            after=reason,
            editor=editor,
            changed_at=changed_at,
        )
        self.save_shared_report(self.build_report_data(), changed_at=changed_at, editor=editor)

    def bulk_upsert_reasons(self, period: str, updates: list[dict], editor: str, changed_at: str) -> dict:
        report = self.build_report_data()
        orders = {
            str(item.get("purchaseOrderNo") or "").strip(): item
            for item in report.get("sections", {}).get("margin", {}).get("orders", [])
            if str(item.get("purchaseOrderNo") or "").strip()
        }
        normalized_updates = []
        for item in updates:
            order_no = str((item or {}).get("purchaseOrderNo") or "").strip()
            if not order_no or order_no not in orders:
                continue
            order = orders[order_no]
            next_reason = normalize_reason((item or {}).get("reason"))
            current_reason = normalize_reason(order.get("reason"))
            # 前端会把整张低毛利表一并提交，这里只保留真正发生变化的原因，
            # 避免每次同步都对飞书做几百次无效 upsert，导致请求长时间卡住。
            if next_reason == current_reason:
                continue
            normalized_updates.append(
                {
                    "purchaseOrderNo": order_no,
                    "reason": next_reason,
                    "order": order,
                }
            )

        if not normalized_updates:
            return report

        config = self.load_feishu_config()
        if config:
            access_token = get_tenant_access_token(config["app_id"], config["app_secret"])
            for item in normalized_updates:
                upsert_low_margin_reason(
                    config=config,
                    access_token=access_token,
                    period=period,
                    order=item["order"],
                    reason=item["reason"],
                    reason_editor=editor,
                    reason_updated_at=changed_at,
                )
            merged_data = self.build_report_data()
            self.save_shared_report(merged_data, changed_at=changed_at, editor=editor)
            sync_snapshot(merged_data, config, access_token)
            return merged_data

        store = self.load_store()
        existing_details = deepcopy(store.get("periods", {}).get(period, {}).get("reasons", {}))
        for item in normalized_updates:
            order = item["order"]
            order_no = item["purchaseOrderNo"]
            before_detail = existing_details.get(order_no, {})
            self.append_local_history_to_store(
                store,
                period=period,
                order=order,
                before=normalize_reason(before_detail.get("reason")),
                after=item["reason"],
                editor=editor,
                changed_at=changed_at,
            )
            existing_details[order_no] = {
                "reason": item["reason"],
                "reasonEditor": editor,
                "reasonUpdatedAt": changed_at,
            }
        self.save_store(store)
        merged_data = self.build_report_data()
        self.save_shared_report(merged_data, changed_at=changed_at, editor=editor)
        return merged_data

    def build_report_data(self) -> dict:
        report = self.load_shared_report() or self.load_base_data()
        orders = report.get("sections", {}).get("margin", {}).get("orders", [])
        period = str(report.get("period", "")).strip()
        reason_details = self.load_reason_details(period)
        history = []
        if not self.load_feishu_config():
            store = self.load_store()
            history = deepcopy(store.get("periods", {}).get(period, {}).get("history", []))[-20:]

        for order in orders:
            detail = reason_details.get(order.get("purchaseOrderNo", ""), {})
            order["reason"] = normalize_reason(detail.get("reason"))
            order["reasonEditor"] = normalize_reason(detail.get("reasonEditor"))
            order["reasonUpdatedAt"] = normalize_reason(detail.get("reasonUpdatedAt"))

        summary = summarize_low_margin_orders(orders)
        report["sections"]["margin"]["miniMetrics"] = [
            {"label": "低毛利订单数", "value": summary["orderCount"]},
            {"label": "低毛利成交金额", "value": summary["amount"]},
            {"label": "已填写原因", "value": summary["filledCount"]},
            {"label": "未填写原因", "value": summary["unfilledCount"]},
        ]
        report["sections"]["margin"]["reasons"] = summary["reasonRows"]
        report["metrics"][4]["value"] = summary["orderCount"]
        report["metrics"][5]["value"] = summary["amount"]
        report["metrics"][6]["value"] = summary["filledCount"]
        reason_summary, filled_count, unfilled_count = build_reason_summary(orders)
        report["sections"]["margin"]["reasonSummary"] = reason_summary
        report["sections"]["margin"]["history"] = history
        report["sections"]["margin"]["filledCount"] = filled_count
        report["sections"]["margin"]["unfilledCount"] = unfilled_count
        return report


class OnlineSyncHandler(SimpleHTTPRequestHandler):
    server_version = "WeeklyReportOnline/1.0"

    def __init__(self, *args, directory: str | None = None, repository: ReasonRepository | None = None, **kwargs):
        self.repository = repository
        super().__init__(*args, directory=directory, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            return self.send_json({"ok": True, "now": now_iso()})
        if parsed.path == "/api/feishu-config-check":
            return self.handle_feishu_config_check()
        if parsed.path == "/api/report-state":
            return self.handle_report_state()
        if parsed.path == "/api/history":
            return self.handle_history(parsed.query)
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/report-state":
            return self.handle_report_state_save()
        if parsed.path == "/api/reasons":
            return self.handle_reason_save()
        if parsed.path == "/api/reasons/bulk":
            return self.handle_bulk_reason_save()
        if parsed.path == "/api/report-snapshot":
            return self.handle_report_snapshot_save()
        self.send_error(HTTPStatus.NOT_FOUND, "Unknown endpoint")

    def do_HEAD(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            return
        super().do_HEAD()

    def read_json_body(self) -> dict:
        content_length = int(self.headers.get("Content-Length", "0") or "0")
        raw = self.rfile.read(content_length) if content_length > 0 else b"{}"
        return json.loads(raw.decode("utf-8") or "{}")

    def send_json(self, payload: dict, status: int = 200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_report_state(self):
        try:
            report = self.repository.build_report_data()
            self.send_json(
                {
                    "ok": True,
                    "mode": "feishu" if self.repository.load_feishu_config() else "local-store",
                    "report": report,
                    "serverTime": now_iso(),
                }
            )
        except Exception as exc:
            print(f"[report_snapshot_error] {exc}", flush=True)
            self.send_json({"ok": False, "error": str(exc)}, status=500)

    def handle_feishu_config_check(self):
        snapshot_log_context: dict[str, Any] = {}
        try:
            config_source = self.repository.get_feishu_config_source()
            config = self.repository.load_feishu_config()
            if not config:
                return self.send_json(
                    {
                        "ok": True,
                        "checkedAt": now_iso(),
                        "configured": False,
                        "configSource": config_source,
                        "storageMode": "local-store",
                        "message": "当前未配置 FEISHU_SYNC_CONFIG_JSON，保存周报快照会失败。",
                        "diagnostics": {
                            "configSource": config_source,
                        },
                    }
                )

            snapshot_log_context.update(build_snapshot_log_context(config, config_source))
            log_snapshot_event("feishu_config_check_start", snapshot_log_context)
            access_token = get_tenant_access_token(config["app_id"], config["app_secret"])
            attachment_field = str(config.get("fields", {}).get("weekly_snapshot", {}).get("pdf_attachment") or "").strip()

            response_payload: dict[str, Any] = {
                "ok": True,
                "checkedAt": now_iso(),
                "configured": True,
                "configSource": config_source,
                "storageMode": snapshot_log_context.get("storageMode", "drive"),
                "attachmentField": attachment_field,
                "diagnostics": {
                    key: value
                    for key, value in snapshot_log_context.items()
                    if value not in ("", None)
                },
            }
            if attachment_field:
                attachment_meta = validate_snapshot_attachment_field(config, access_token) or {}
                response_payload.update(
                    {
                        "attachmentFieldId": str(attachment_meta.get("field_id") or "").strip(),
                        "attachmentFieldType": attachment_meta.get("type"),
                        "attachmentFieldTypeLabel": get_field_type_label(int(attachment_meta.get("type") or -1)),
                    }
                )
            response_payload["message"] = build_snapshot_config_check_message(
                attachment_field=attachment_field,
                storage_mode=str(response_payload.get("storageMode") or ""),
                drive_folder_configured=bool(snapshot_log_context.get("driveFolderConfigured")),
            )
            log_snapshot_event(
                "feishu_config_check_ok",
                {
                    **snapshot_log_context,
                    "attachmentFieldType": response_payload.get("attachmentFieldType"),
                    "attachmentFieldId": response_payload.get("attachmentFieldId"),
                },
            )
            return self.send_json(response_payload)
        except Exception as exc:
            error_details = parse_http_error_details(str(exc))
            diagnostics = {
                "configSource": snapshot_log_context.get("configSource", ""),
                "storageMode": snapshot_log_context.get("storageMode", ""),
                "attachmentField": snapshot_log_context.get("attachmentField", ""),
                "attachmentFieldType": snapshot_log_context.get("attachmentFieldType", ""),
                "uploadEndpoint": snapshot_log_context.get("uploadEndpoint", ""),
            }
            for key in ("feishuCode", "feishuLogId", "requestUrl", "feishuMsg"):
                if error_details.get(key) not in ("", None):
                    diagnostics[key] = error_details[key]
            hint = build_snapshot_failure_hint(str(exc), diagnostics)
            log_snapshot_event(
                "feishu_config_check_error",
                {
                    **snapshot_log_context,
                    **error_details,
                    "message": str(exc),
                },
            )
            return self.send_json(
                {
                    "ok": False,
                    "checkedAt": now_iso(),
                    "error": str(exc),
                    "hint": hint,
                    "diagnostics": {key: value for key, value in diagnostics.items() if value not in ("", None)},
                },
                status=500,
            )

    def handle_report_state_save(self):
        try:
            payload = self.read_json_body()
            report = payload.get("report")
            if not isinstance(report, dict):
                return self.send_json({"ok": False, "error": "缺少有效的周报数据。"}, status=400)
            editor = normalize_reason(payload.get("editor")) or "网页协作"
            changed_at = now_iso()
            self.repository.save_shared_report(report, changed_at=changed_at, editor=editor)
            fresh = self.repository.build_report_data()
            self.send_json(
                {
                    "ok": True,
                    "message": "在线周报已同步。",
                    "savedAt": changed_at,
                    "mode": "feishu" if self.repository.load_feishu_config() else "local-store",
                    "report": fresh,
                }
            )
        except Exception as exc:
            self.send_json({"ok": False, "error": str(exc)}, status=500)

    def handle_history(self, query: str):
        try:
            limit = int(parse_qs(query).get("limit", ["20"])[0])
        except Exception:
            limit = 20
        report = self.repository.build_report_data()
        history = list(report.get("sections", {}).get("margin", {}).get("history", []))[-max(1, min(limit, 100)) :]
        self.send_json({"ok": True, "history": history})

    def handle_reason_save(self):
        try:
            payload = self.read_json_body()
            report = self.repository.build_report_data()
            period = str(report.get("period") or "").strip()
            order_no = str(payload.get("purchaseOrderNo") or "").strip()
            reason = normalize_reason(payload.get("reason"))
            editor = normalize_reason(payload.get("editor")) or "网页填写"
            changed_at = now_iso()
            order = next(
                (item for item in report.get("sections", {}).get("margin", {}).get("orders", []) if item.get("purchaseOrderNo") == order_no),
                None,
            )
            if not order:
                return self.send_json({"ok": False, "error": f"未找到订单：{order_no}"}, status=404)
            self.repository.upsert_reason(period=period, order=order, reason=reason, editor=editor, changed_at=changed_at)
            fresh = self.repository.build_report_data()
            self.send_json(
                {
                    "ok": True,
                    "message": "已保存",
                    "reasonSummary": fresh["sections"]["margin"].get("reasonSummary", ""),
                    "report": fresh,
                }
            )
        except Exception as exc:
            self.send_json({"ok": False, "error": str(exc)}, status=500)

    def handle_bulk_reason_save(self):
        try:
            payload = self.read_json_body()
            report = self.repository.build_report_data()
            period = str(payload.get("period") or report.get("period") or "").strip()
            updates = payload.get("items") or []
            if not isinstance(updates, list):
                return self.send_json({"ok": False, "error": "批量原因数据格式不正确。"}, status=400)
            editor = normalize_reason(payload.get("editor")) or "网页填写"
            changed_at = now_iso()
            fresh = self.repository.bulk_upsert_reasons(period=period, updates=updates, editor=editor, changed_at=changed_at)
            self.send_json(
                {
                    "ok": True,
                    "message": "已批量保存",
                    "updatedCount": len(updates),
                    "report": fresh,
                }
            )
        except Exception as exc:
            self.send_json({"ok": False, "error": str(exc)}, status=500)

    def handle_report_snapshot_save(self):
        snapshot_log_context: dict[str, Any] = {}
        try:
            payload = self.read_json_body()
            report = payload.get("report") or self.repository.build_report_data()
            if not report.get("sections", {}).get("margin", {}).get("orders"):
                server_report = self.repository.build_report_data()
                report.setdefault("sections", {}).setdefault("margin", {})["orders"] = (
                    server_report.get("sections", {}).get("margin", {}).get("orders", [])
                )
                report["sections"]["margin"].setdefault(
                    "reasons",
                    server_report.get("sections", {}).get("margin", {}).get("reasons", []),
                )
            if not self.repository.load_feishu_config():
                return self.send_json({"ok": False, "error": "当前未配置飞书同步，无法保存 PDF 快照。"}, status=400)

            config = self.repository.load_feishu_config()
            snapshot_log_context.update(
                build_snapshot_log_context(config, self.repository.get_feishu_config_source(), report=report)
            )
            log_snapshot_event("report_snapshot_start", snapshot_log_context)
            access_token = get_tenant_access_token(config["app_id"], config["app_secret"])
            attachment_field = str(config.get("fields", {}).get("weekly_snapshot", {}).get("pdf_attachment") or "").strip()
            if attachment_field:
                attachment_meta = validate_snapshot_attachment_field(config, access_token) or {}
                snapshot_log_context.update(
                    {
                        "attachmentFieldType": attachment_meta.get("type"),
                        "attachmentFieldId": str(attachment_meta.get("field_id") or "").strip(),
                    }
                )
            snapshot_ref = sync_snapshot(report, config, access_token)
            snapshot_log_context.update(
                {
                    "snapshotRecordId": mask_token(snapshot_ref.get("record_id")),
                    "snapshotRecordKey": str(snapshot_ref.get("record_key") or "").strip(),
                    "snapshotTableId": mask_token(snapshot_ref.get("table_id") or snapshot_log_context.get("snapshotTableId")),
                }
            )

            generated_at = now_iso()
            filename = (
                f'{safe_filename_part(report.get("title", "行业二组周报"))}_'
                f'{safe_filename_part(report.get("period", "未命名周期"))}_'
                f'{datetime.now().strftime("%Y%m%d_%H%M%S")}.pdf'
            )
            pdf_bytes = build_snapshot_pdf(report, generated_at)
            if attachment_field:
                upload_result = upload_pdf_to_bitable(config, access_token, filename, pdf_bytes)
                attachment_result = attach_pdf_to_snapshot_record(snapshot_ref, config, access_token, upload_result["file_token"]) or {}
                log_snapshot_event(
                    "report_snapshot_saved",
                    {
                        **snapshot_log_context,
                        "fileName": upload_result["name"],
                        "fileToken": mask_token(upload_result["file_token"]),
                        "attachmentCount": attachment_result.get("attachment_count", 1),
                    },
                )
                return self.send_json(
                    {
                        "ok": True,
                        "message": "周报快照已保存到飞书多维表格。",
                        "savedAt": generated_at,
                        "fileName": upload_result["name"],
                        "fileToken": upload_result["file_token"],
                        "folderToken": "",
                        "storageMode": "bitable_attachment",
                        "attachmentField": attachment_result.get("attachment_field", attachment_field),
                        "attachmentCount": attachment_result.get("attachment_count", 1),
                    }
                )

            upload_result = upload_pdf_to_feishu_drive(config, access_token, filename, pdf_bytes)
            log_snapshot_event(
                "report_snapshot_saved",
                {
                    **snapshot_log_context,
                    "fileName": upload_result["name"],
                    "fileToken": mask_token(upload_result["file_token"]),
                    "folderToken": mask_token(upload_result["folder_token"]),
                },
            )

            return self.send_json(
                {
                    "ok": True,
                    "message": "周报快照已保存到飞书。",
                    "savedAt": generated_at,
                    "fileName": upload_result["name"],
                    "fileToken": upload_result["file_token"],
                    "folderToken": upload_result["folder_token"],
                    "storageMode": "drive",
                }
            )
        except Exception as exc:
            error_details = parse_http_error_details(str(exc))
            log_snapshot_event(
                "report_snapshot_error",
                {
                    **snapshot_log_context,
                    **error_details,
                    "message": str(exc),
                },
            )
            diagnostics = {
                "configSource": snapshot_log_context.get("configSource", ""),
                "storageMode": snapshot_log_context.get("storageMode", ""),
                "attachmentField": snapshot_log_context.get("attachmentField", ""),
                "attachmentFieldType": snapshot_log_context.get("attachmentFieldType", ""),
                "uploadEndpoint": snapshot_log_context.get("uploadEndpoint", ""),
            }
            for key in ("feishuCode", "feishuLogId", "requestUrl", "feishuMsg"):
                if error_details.get(key) not in ("", None):
                    diagnostics[key] = error_details[key]
            hint = build_snapshot_failure_hint(str(exc), diagnostics)
            self.send_json(
                {
                    "ok": False,
                    "error": str(exc),
                    "hint": hint,
                    "diagnostics": {key: value for key, value in diagnostics.items() if value not in ("", None)},
                },
                status=500,
            )


def build_handler(static_dir: Path, repository: ReasonRepository):
    def factory(*args, **kwargs):
        return OnlineSyncHandler(*args, directory=str(static_dir), repository=repository, **kwargs)

    return factory


def main():
    parser = argparse.ArgumentParser(description="行业二组周报在线同步服务")
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8765")))
    parser.add_argument("--static-dir", default=str(Path(__file__).resolve().parent))
    parser.add_argument("--data", default=str(Path(__file__).resolve().parent / "weekly-report-data.generated.json"))
    parser.add_argument("--store", default=str(Path(__file__).resolve().parent / "runtime" / "online-reasons.json"))
    parser.add_argument("--feishu-config", default="")
    args = parser.parse_args()

    repository = ReasonRepository(
        data_path=Path(args.data),
        store_path=Path(args.store),
        feishu_config_path=Path(args.feishu_config) if args.feishu_config else None,
    )
    server = ThreadingHTTPServer((args.host, args.port), build_handler(Path(args.static_dir), repository))
    print(f"Serving weekly report at http://{args.host}:{args.port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
