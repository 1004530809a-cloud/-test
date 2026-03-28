import argparse
import json
import ssl
from pathlib import Path
from urllib import parse, request


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
    with request.urlopen(req, context=SSL_CONTEXT, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def get_tenant_access_token(app_id: str, app_secret: str) -> str:
    data = http_json(
        "POST",
        f"{API_ROOT}/auth/v3/tenant_access_token/internal",
        payload={"app_id": app_id, "app_secret": app_secret},
    )
    return data["tenant_access_token"]


def list_records(app_token: str, table_id: str, access_token: str, page_token: str = ""):
    query = {"page_size": 500}
    if page_token:
        query["page_token"] = page_token
    url = f"{API_ROOT}/bitable/v1/apps/{app_token}/tables/{table_id}/records?{parse.urlencode(query)}"
    return http_json("GET", url, headers={"Authorization": f"Bearer {access_token}"})


def load_reason_map(config: dict, access_token: str, period: str) -> dict:
    table_id = config["tables"]["low_margin_feedback"]
    field_map = config["fields"]["low_margin_feedback"]
    reason_map = {}
    page_token = ""
    while True:
        data = list_records(config["app_token"], table_id, access_token, page_token=page_token)
        for item in data.get("data", {}).get("items", []):
            fields = item.get("fields", {})
            if str(fields.get(field_map["period"], "") or "").strip() != period:
                continue
            order_no = str(fields.get(field_map["purchase_order_no"], "") or "").strip()
            reason = str(fields.get(field_map["reason"], "") or "").strip()
            if order_no and reason:
                reason_map[order_no] = reason
        if not data.get("data", {}).get("has_more"):
            break
        page_token = data.get("data", {}).get("page_token", "")
        if not page_token:
            break
    return reason_map


def summarize_orders(orders: list[dict]) -> tuple[list[dict], list[list[str]]]:
    filled_count = sum(1 for order in orders if str(order.get("reason", "")).strip())
    amount_total = sum(float(str(order.get("execPriceTax", "0")).replace(",", "") or 0) for order in orders)
    summary_metrics = [
        {"label": "低毛利订单数", "value": str(len(orders))},
        {"label": "低毛利成交金额", "value": f"{amount_total:,.2f}"},
        {"label": "已填写原因", "value": str(filled_count)},
        {"label": "未填写原因", "value": str(len(orders) - filled_count)},
    ]

    grouped = {}
    for order in orders:
        reason = str(order.get("reason", "") or "").strip()
        if not reason:
            continue
        bucket = grouped.setdefault(reason, {"count": 0, "amount": 0.0})
        bucket["count"] += 1
        bucket["amount"] += float(str(order.get("execPriceTax", "0")).replace(",", "") or 0)

    reason_rows = [
        [reason, str(item["count"]), f"{item['amount']:,.2f}", "来自飞书低毛利反馈表"]
        for reason, item in grouped.items()
    ]
    if not reason_rows:
        reason_rows = [["待填写", "0", "0.00", "先在飞书低毛利反馈表中选择原因"]]
    return summary_metrics, reason_rows


def main():
    parser = argparse.ArgumentParser(description="从飞书回填低毛利原因到周报 JSON。")
    parser.add_argument("--config", required=True)
    parser.add_argument("--data", required=True)
    parser.add_argument("--insecure", action="store_true")
    args = parser.parse_args()

    global SSL_CONTEXT
    if args.insecure:
        SSL_CONTEXT = ssl._create_unverified_context()

    config = json.loads(Path(args.config).read_text(encoding="utf-8"))
    data_path = Path(args.data)
    report_data = json.loads(data_path.read_text(encoding="utf-8"))
    access_token = get_tenant_access_token(config["app_id"], config["app_secret"])
    reason_map = load_reason_map(config, access_token, report_data["period"])

    for order in report_data["sections"]["margin"]["orders"]:
        if order["purchaseOrderNo"] in reason_map:
            order["reason"] = reason_map[order["purchaseOrderNo"]]

    mini_metrics, reason_rows = summarize_orders(report_data["sections"]["margin"]["orders"])
    report_data["sections"]["margin"]["miniMetrics"] = mini_metrics
    report_data["sections"]["margin"]["reasons"] = reason_rows
    report_data["metrics"][4]["value"] = mini_metrics[0]["value"]
    report_data["metrics"][5]["value"] = mini_metrics[1]["value"]
    report_data["metrics"][6]["value"] = mini_metrics[2]["value"]

    data_path.write_text(json.dumps(report_data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Updated from Feishu: {data_path}")


if __name__ == "__main__":
    main()
