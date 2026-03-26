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
    build_reason_summary,
    get_tenant_access_token,
    load_low_margin_reason_details,
    sync_snapshot,
    upload_pdf_to_feishu_drive,
    upsert_low_margin_reason,
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

    def append_local_history(self, period: str, order: dict, before: str, after: str, editor: str, changed_at: str):
        store = self.load_store()
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

    def build_report_data(self) -> dict:
        report = self.load_base_data()
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
        if parsed.path == "/api/report-state":
            return self.handle_report_state()
        if parsed.path == "/api/history":
            return self.handle_history(parsed.query)
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/reasons":
            return self.handle_reason_save()
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

    def handle_report_snapshot_save(self):
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
            access_token = get_tenant_access_token(config["app_id"], config["app_secret"])
            sync_snapshot(report, config, access_token)

            generated_at = now_iso()
            filename = (
                f'{safe_filename_part(report.get("title", "行业二组周报"))}_'
                f'{safe_filename_part(report.get("period", "未命名周期"))}_'
                f'{datetime.now().strftime("%Y%m%d_%H%M%S")}.pdf'
            )
            pdf_bytes = build_snapshot_pdf(report, generated_at)
            upload_result = upload_pdf_to_feishu_drive(config, access_token, filename, pdf_bytes)

            self.send_json(
                {
                    "ok": True,
                    "message": "周报快照已保存到飞书。",
                    "savedAt": generated_at,
                    "fileName": upload_result["name"],
                    "fileToken": upload_result["file_token"],
                    "folderToken": upload_result["folder_token"],
                }
            )
        except Exception as exc:
            self.send_json({"ok": False, "error": str(exc)}, status=500)


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
        feishu_config_path=Path(args.feishu_config),
    )
    server = ThreadingHTTPServer((args.host, args.port), build_handler(Path(args.static_dir), repository))
    print(f"Serving weekly report at http://{args.host}:{args.port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
