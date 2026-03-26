# Render 免费部署说明

## 适合你当前场景的原因

- 5 到 6 个人查看，低频使用。
- 周五集中使用，可接受十几秒延迟。
- 现在最重要的是先跑通在线保存和飞书留痕，不是追求复杂后端能力。

## 已经替你准备好的文件

- [render.yaml](/Users/sup/Desktop/周报测试/render.yaml)
- [online_sync_server.py](/Users/sup/Desktop/周报测试/weekly-report-delivery/online_sync_server.py)
- [weekly-report-online-config.json](/Users/sup/Desktop/周报测试/weekly-report-delivery/weekly-report-online-config.json)

## 部署前你要知道的边界

- 如果不配飞书环境变量，Render 重启后本地临时原因数据会丢。
- 所以正式给同事用时，建议一定配置飞书，让飞书成为在线原因主存储。
- 免费实例可能休眠，第一次打开会慢一点，这和你当前容忍度是匹配的。

## 部署步骤

1. 把当前目录上传到 GitHub

建议上传这个目录作为仓库根目录：

- [render.yaml](/Users/sup/Desktop/周报测试/render.yaml)
- [weekly-report-delivery](/Users/sup/Desktop/周报测试/weekly-report-delivery)

2. 在 Render 新建 Web Service

- 选择刚才的 GitHub 仓库
- Render 会自动识别 [render.yaml](/Users/sup/Desktop/周报测试/render.yaml)

3. 配置环境变量

如果要正式联动飞书，在 Render 的环境变量里新增：

- `FEISHU_SYNC_CONFIG_JSON`

值直接填成一整段 JSON，内容结构参考：

```json
{
  "app_id": "cli_xxx",
  "app_secret": "xxx",
  "app_token": "bascnxxx",
  "tables": {
    "low_margin_feedback": "tblxxx",
    "weekly_snapshot": "tblyyy"
  },
  "views": {
    "low_margin_feedback": "",
    "weekly_snapshot": ""
  },
  "fields": {
    "low_margin_feedback": {
      "key": "同步键",
      "period": "周报周期",
      "purchase_order_no": "采购订单编号",
      "advertiser": "广告主名称",
      "spu_category": "SPU类目",
      "exec_price_tax": "执行价(含税)",
      "gross_margin": "预估订单毛利率",
      "reason": "原因",
      "reason_editor": "原因修改人",
      "reason_updated_at": "原因修改时间",
      "sync_time": "同步时间"
    },
    "weekly_snapshot": {
      "key": "同步键",
      "period": "周报周期",
      "title": "周报标题",
      "sza_amount": "SZA成交金额",
      "non_sza_amount": "非SZA成交金额",
      "sza_margin": "SZA预估毛利率",
      "non_sza_margin": "非SZA预估毛利率",
      "low_margin_count": "低毛利订单数",
      "low_margin_amount": "低毛利成交金额",
      "filled_count": "已填写原因",
      "unfilled_count": "未填写原因",
      "reason_summary": "原因汇总",
      "pdf_attachment": "PDF快照",
      "sync_time": "同步时间"
    }
  }
}
```

4. 等部署完成后打开 Render 提供的网址

访问路径直接是：

```text
https://你的服务地址/weekly-report.html
```

## 上线后怎么验收

1. 打开网页，左侧不应再只是“本地模式”
2. 改一条低毛利原因
3. 看网页 `已填写原因` 是否变化
4. 看飞书低毛利反馈表是否写入
5. 看飞书周报快照的 `原因汇总` 是否更新

## 我建议的实际做法

- 第一步：先用 Render 免费版上线
- 第二步：你自己和 1 位同事先试填
- 第三步：确认飞书同步稳定后，再给全组使用
