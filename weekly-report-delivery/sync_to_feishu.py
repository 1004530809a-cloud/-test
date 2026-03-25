import argparse
import json
import mimetypes
import ssl
import time
import uuid
from datetime import datetime
from pathlib import Path
from urllib import error, parse, request


API_ROOT = "https://open.feishu.cn/open-apis"
SSL_CONTEXT = ssl.create_default_context()


def http_json(method: str, url: str, payload=None, headers=None):
    data = None
    req_headers = {"Content-Type": "application/json; charset=utf-8"}
    if headers:
        req_headers.update(headers)
    if payload is not None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = request.Request(url, data=data, headers=req_headers, method=method)
    last_error = None
    for attempt in range(3):
        try:
            with request.urlopen(req, context=SSL_CONTEXT, timeout=30) as response:
                body = response.read().decode("utf-8")
                return json.loads(body)
        except error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="ignore")
            raise RuntimeError(f"HTTP {exc.code} {url}: {detail}") from exc
        except Exception as exc:
            last_error = exc
            if attempt == 2:
                break
            time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"请求失败: {url}: {last_error}") from last_error


def http_multipart(method: str, url: str, fields: dict[str, str], files: list[dict], headers=None):
    boundary = f"----CodexBoundary{uuid.uuid4().hex}"
    body = bytearray()
    for name, value in fields.items():
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode("utf-8"))
        body.extend(str(value).encode("utf-8"))
        body.extend(b"\r\n")
    for file in files:
        body.extend(f"--{boundary}\r\n".encode("utf-8"))
        body.extend(
            f'Content-Disposition: form-data; name="{file["field_name"]}"; filename="{file["filename"]}"\r\n'.encode("utf-8")
        )
        body.extend(f'Content-Type: {file["content_type"]}\r\n\r\n'.encode("utf-8"))
        body.extend(file["content"])
        body.extend(b"\r\n")
    body.extend(f"--{boundary}--\r\n".encode("utf-8"))

    req_headers = {"Content-Type": f"multipart/form-data; boundary={boundary}"}
    if headers:
        req_headers.update(headers)
    req = request.Request(url, data=bytes(body), headers=req_headers, method=method)
    with request.urlopen(req, context=SSL_CONTEXT, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))


def get_tenant_access_token(app_id: str, app_secret: str) -> str:
    payload = {"app_id": app_id, "app_secret": app_secret}
    data = http_json("POST", f"{API_ROOT}/auth/v3/tenant_access_token/internal", payload=payload)
    if data.get("code") != 0:
        raise RuntimeError(f"获取 tenant_access_token 失败: {data}")
    return data["tenant_access_token"]


def list_records(app_token: str, table_id: str, access_token: str, view_id: str = "", page_token: str = ""):
    query = {}
    if view_id:
        query["view_id"] = view_id
    if page_token:
        query["page_token"] = page_token
    query["page_size"] = 500
    url = f"{API_ROOT}/bitable/v1/apps/{app_token}/tables/{table_id}/records"
    if query:
        url = f"{url}?{parse.urlencode(query)}"
    return http_json("GET", url, headers={"Authorization": f"Bearer {access_token}"})


def create_record(app_token: str, table_id: str, access_token: str, fields: dict):
    url = f"{API_ROOT}/bitable/v1/apps/{app_token}/tables/{table_id}/records"
    payload = {"fields": fields}
    data = http_json("POST", url, payload=payload, headers={"Authorization": f"Bearer {access_token}"})
    if data.get("code") != 0:
        raise RuntimeError(f"创建记录失败: {data}")


def update_record(app_token: str, table_id: str, record_id: str, access_token: str, fields: dict):
    url = f"{API_ROOT}/bitable/v1/apps/{app_token}/tables/{table_id}/records/{record_id}"
    payload = {"fields": fields}
    data = http_json("PUT", url, payload=payload, headers={"Authorization": f"Bearer {access_token}"})
    if data.get("code") != 0:
        raise RuntimeError(f"更新记录失败: {data}")


def build_existing_map(app_token: str, table_id: str, access_token: str, key_field: str, view_id: str = ""):
    existing = {}
    page_token = ""
    while True:
        data = list_records(app_token, table_id, access_token, view_id=view_id, page_token=page_token)
        if data.get("code") != 0:
            raise RuntimeError(f"读取记录失败: {data}")
        for item in data.get("data", {}).get("items", []):
            fields = item.get("fields") or {}
            record_key = str(fields.get(key_field, "")).strip()
            if record_key:
                existing[record_key] = {
                    "record_id": item["record_id"],
                    "fields": fields,
                }
        if not data.get("data", {}).get("has_more"):
            break
        page_token = data.get("data", {}).get("page_token", "")
        if not page_token:
            break
    return existing


def metrics_to_map(metrics: list[dict]) -> dict:
    return {item["label"]: item["value"] for item in metrics}


def current_unix_ms() -> int:
    return int(datetime.now().timestamp() * 1000)


def merge_low_margin_reasons(data: dict, config: dict, access_token: str):
    table_id = config["tables"]["low_margin_feedback"]
    field_map = config["fields"]["low_margin_feedback"]
    view_id = config.get("views", {}).get("low_margin_feedback", "")
    key_field = field_map["key"]
    existing = build_existing_map(config["app_token"], table_id, access_token, key_field, view_id=view_id)
    composite_key_enabled = key_field != field_map["purchase_order_no"]
    merged_orders = []

    for order in data["sections"]["margin"]["orders"]:
        record_key = f'{data["period"]}::{order["purchaseOrderNo"]}' if composite_key_enabled else order["purchaseOrderNo"]
        existing_item = existing.get(record_key, {})
        existing_reason = str(existing_item.get("fields", {}).get(field_map["reason"], "") or "").strip()
        editor_field = field_map.get("reason_editor", "")
        updated_at_field = field_map.get("reason_updated_at", "")
        next_order = dict(order)
        next_order["reason"] = str(order.get("reason", "") or "").strip() or existing_reason
        next_order["reasonEditor"] = str(order.get("reasonEditor", "") or existing_item.get("fields", {}).get(editor_field, "") or "").strip()
        next_order["reasonUpdatedAt"] = str(order.get("reasonUpdatedAt", "") or existing_item.get("fields", {}).get(updated_at_field, "") or "").strip()
        next_order["_record_key"] = record_key
        next_order["_existing_record_id"] = existing_item.get("record_id")
        merged_orders.append(next_order)

    return merged_orders


def build_reason_summary(orders: list[dict]) -> tuple[str, int, int]:
    buckets = {}
    filled_count = 0
    for order in orders:
        reason = str(order.get("reason", "") or "").strip()
        if not reason:
            continue
        filled_count += 1
        bucket = buckets.setdefault(reason, {"count": 0, "amount": 0.0})
        bucket["count"] += 1
        amount = str(order.get("execPriceTax", "0")).replace(",", "")
        try:
            bucket["amount"] += float(amount)
        except Exception:
            pass
    summary = "；".join(f"{reason}:{item['count']}单/{item['amount']:.2f}" for reason, item in buckets.items()) or "待填写"
    return summary, filled_count, len(orders) - filled_count


def sync_low_margin(data: dict, config: dict, access_token: str):
    table_id = config["tables"]["low_margin_feedback"]
    field_map = config["fields"]["low_margin_feedback"]
    composite_key_enabled = field_map["key"] != field_map["purchase_order_no"]
    sync_time = current_unix_ms()
    merged_orders = merge_low_margin_reasons(data, config, access_token)

    for order in merged_orders:
        fields = {
            field_map["period"]: data["period"],
            field_map["purchase_order_no"]: order["purchaseOrderNo"],
            field_map["advertiser"]: order["advertiser"],
            field_map["spu_category"]: order["spuCategory"],
            field_map["exec_price_tax"]: order["execPriceTax"],
            field_map["gross_margin"]: order["grossMargin"],
            field_map["reason"]: order.get("reason", ""),
            field_map["sync_time"]: sync_time,
        }
        editor_field = field_map.get("reason_editor")
        if editor_field:
            fields[editor_field] = order.get("reasonEditor", "")
        updated_at_field = field_map.get("reason_updated_at")
        if updated_at_field:
            fields[updated_at_field] = order.get("reasonUpdatedAt", "")
        if composite_key_enabled:
            fields[field_map["key"]] = order["_record_key"]
        if order.get("_existing_record_id"):
            update_record(config["app_token"], table_id, order["_existing_record_id"], access_token, fields)
        else:
            create_record(config["app_token"], table_id, access_token, fields)


def load_low_margin_reason_details(config: dict, access_token: str, period: str) -> dict:
    table_id = config["tables"]["low_margin_feedback"]
    field_map = config["fields"]["low_margin_feedback"]
    view_id = config.get("views", {}).get("low_margin_feedback", "")
    editor_field = field_map.get("reason_editor", "")
    updated_at_field = field_map.get("reason_updated_at", "")
    existing = build_existing_map(config["app_token"], table_id, access_token, field_map["key"], view_id=view_id)
    result = {}
    composite_key_enabled = field_map["key"] != field_map["purchase_order_no"]

    for record_key, item in existing.items():
        fields = item.get("fields", {})
        if str(fields.get(field_map["period"], "") or "").strip() != period:
            continue
        order_no = str(fields.get(field_map["purchase_order_no"], "") or "").strip()
        if not order_no and composite_key_enabled and "::" in record_key:
            order_no = record_key.split("::", 1)[1].strip()
        if not order_no:
            continue
        result[order_no] = {
            "record_id": item.get("record_id", ""),
            "record_key": record_key,
            "reason": str(fields.get(field_map["reason"], "") or "").strip(),
            "reasonEditor": str(fields.get(editor_field, "") or "").strip() if editor_field else "",
            "reasonUpdatedAt": str(fields.get(updated_at_field, "") or "").strip() if updated_at_field else "",
        }
    return result


def upsert_low_margin_reason(
    config: dict,
    access_token: str,
    period: str,
    order: dict,
    reason: str,
    reason_editor: str = "",
    reason_updated_at: str = "",
):
    table_id = config["tables"]["low_margin_feedback"]
    field_map = config["fields"]["low_margin_feedback"]
    view_id = config.get("views", {}).get("low_margin_feedback", "")
    key_field = field_map["key"]
    composite_key_enabled = key_field != field_map["purchase_order_no"]
    existing = build_existing_map(config["app_token"], table_id, access_token, key_field, view_id=view_id)
    record_key = f'{period}::{order["purchaseOrderNo"]}' if composite_key_enabled else order["purchaseOrderNo"]
    existing_item = existing.get(record_key, {})
    fields = {
        field_map["period"]: period,
        field_map["purchase_order_no"]: order["purchaseOrderNo"],
        field_map["advertiser"]: order["advertiser"],
        field_map["spu_category"]: order["spuCategory"],
        field_map["exec_price_tax"]: order["execPriceTax"],
        field_map["gross_margin"]: order["grossMargin"],
        field_map["reason"]: reason,
        field_map["sync_time"]: current_unix_ms(),
    }
    editor_field = field_map.get("reason_editor")
    if editor_field:
        fields[editor_field] = reason_editor
    updated_at_field = field_map.get("reason_updated_at")
    if updated_at_field:
        fields[updated_at_field] = reason_updated_at
    if composite_key_enabled:
        fields[key_field] = record_key
    if existing_item.get("record_id"):
        update_record(config["app_token"], table_id, existing_item["record_id"], access_token, fields)
    else:
        create_record(config["app_token"], table_id, access_token, fields)


def sync_snapshot(data: dict, config: dict, access_token: str):
    table_id = config["tables"]["weekly_snapshot"]
    field_map = config["fields"]["weekly_snapshot"]
    view_id = config.get("views", {}).get("weekly_snapshot", "")
    key_field = field_map["key"]
    existing = build_existing_map(config["app_token"], table_id, access_token, key_field, view_id=view_id)
    sync_time = current_unix_ms()
    metrics = metrics_to_map(data["metrics"])
    merged_orders = merge_low_margin_reasons(data, config, access_token)
    reason_summary, filled_count, unfilled_count = build_reason_summary(merged_orders)
    low_margin_amount = metrics.get("低毛利成交金额", "")

    record_key = data["period"]
    fields = {
        key_field: record_key,
        field_map["period"]: data["period"],
        field_map["title"]: data["title"],
        field_map["sza_amount"]: metrics.get("SZA成交金额", ""),
        field_map["non_sza_amount"]: metrics.get("非SZA成交金额", ""),
        field_map["sza_margin"]: metrics.get("SZA预估毛利率", ""),
        field_map["non_sza_margin"]: metrics.get("非SZA预估毛利率", ""),
        field_map["low_margin_count"]: str(len(merged_orders)),
        field_map["low_margin_amount"]: low_margin_amount,
        field_map["filled_count"]: str(filled_count),
        field_map["unfilled_count"]: str(unfilled_count),
        field_map["sync_time"]: sync_time,
    }
    reason_summary_field = field_map.get("reason_summary")
    if reason_summary_field:
      fields[reason_summary_field] = reason_summary
    if record_key in existing:
        update_record(config["app_token"], table_id, existing[record_key]["record_id"], access_token, fields)
    else:
        create_record(config["app_token"], table_id, access_token, fields)


def get_root_folder_token(access_token: str) -> str:
    data = http_json("GET", f"{API_ROOT}/drive/explorer/v2/root_folder/meta", headers={"Authorization": f"Bearer {access_token}"})
    if data.get("code") != 0:
        raise RuntimeError(f"获取飞书云空间根目录失败: {data}")
    return str(data.get("data", {}).get("token") or "")


def upload_pdf_to_feishu_drive(config: dict, access_token: str, filename: str, content: bytes) -> dict:
    folder_token = str(config.get("drive_folder_token") or "").strip() or get_root_folder_token(access_token)
    content_type = mimetypes.guess_type(filename)[0] or "application/pdf"
    data = http_multipart(
        "POST",
        f"{API_ROOT}/drive/v1/files/upload_all",
        fields={
            "file_name": filename,
            "parent_type": "explorer",
            "parent_node": folder_token,
            "size": str(len(content)),
        },
        files=[
            {
                "field_name": "file",
                "filename": filename,
                "content_type": content_type,
                "content": content,
            }
        ],
        headers={"Authorization": f"Bearer {access_token}"},
    )
    if data.get("code") != 0:
        raise RuntimeError(f"上传 PDF 到飞书失败: {data}")
    result = data.get("data", {}) or {}
    return {
        "file_token": str(result.get("file_token") or ""),
        "name": str(result.get("name") or filename),
        "folder_token": folder_token,
    }


def main():
    parser = argparse.ArgumentParser(description="同步周报数据到飞书多维表格。")
    parser.add_argument("--config", required=True, help="飞书配置 JSON 路径")
    parser.add_argument("--data", required=True, help="weekly-report-data.generated.json 路径")
    parser.add_argument("--sync", default="all", choices=["all", "low-margin", "snapshot"], help="同步范围")
    parser.add_argument("--insecure", action="store_true", help="跳过 HTTPS 证书校验，仅当前机器证书异常时使用")
    args = parser.parse_args()

    global SSL_CONTEXT
    if args.insecure:
        SSL_CONTEXT = ssl._create_unverified_context()

    config = json.loads(Path(args.config).read_text(encoding="utf-8"))
    data = json.loads(Path(args.data).read_text(encoding="utf-8"))
    access_token = get_tenant_access_token(config["app_id"], config["app_secret"])

    if args.sync in ("all", "low-margin"):
        sync_low_margin(data, config, access_token)
        print("Synced: low_margin_feedback")
    if args.sync in ("all", "snapshot"):
        sync_snapshot(data, config, access_token)
        print("Synced: weekly_snapshot")


if __name__ == "__main__":
    main()
