# Render 免费部署说明

## 适合你当前场景的原因

- 5 到 6 个人查看，低频使用。
- 周五集中使用，可接受十几秒延迟。
- 现在最重要的是先跑通在线保存和飞书留痕，不是追求复杂后端能力。

## 已经替你准备好的文件

- [render.yaml](/Users/sup/Desktop/周报测试/render.yaml)
- [online_sync_server.py](/Users/sup/Desktop/周报测试/weekly-report-delivery/online_sync_server.py)
- [weekly-report-online-config.json](/Users/sup/Desktop/周报测试/weekly-report-delivery/weekly-report-online-config.json)
- [prepare_render_publish_dir.sh](/Users/sup/Desktop/周报测试/prepare_render_publish_dir.sh)

## 部署前你要知道的边界

- 如果不配飞书环境变量，Render 重启后本地临时原因数据会丢。
- 所以正式给同事用时，建议一定配置飞书，让飞书成为在线原因主存储。
- `FEISHU_SYNC_CONFIG_JSON` 里配置的字段名必须和飞书多维表格完全一致；如果配置了 `pdf_attachment`，对应字段必须是“附件”类型。
- 免费实例可能休眠，第一次打开会慢一点，这和你当前容忍度是匹配的。

## 部署步骤

1. 准备一个尽量轻的发布目录

如果当前仓库直接推 GitHub 超时，先在本机执行：

```bash
cd /Users/sup/Desktop/周报测试
./prepare_render_publish_dir.sh
```

脚本会生成一个只包含部署必要文件的 `render-publish/` 目录，里面只有：

- [render.yaml](/Users/sup/Desktop/周报测试/render.yaml)
- [weekly-report-delivery](/Users/sup/Desktop/周报测试/weekly-report-delivery)

然后把 `render-publish/` 作为一个新的轻量 GitHub 仓库推上去。

2. 把发布目录上传到 GitHub

建议上传这个目录作为仓库根目录：

- [render.yaml](/Users/sup/Desktop/周报测试/render.yaml)
- [weekly-report-delivery](/Users/sup/Desktop/周报测试/weekly-report-delivery)

3. 在 Render 新建 Web Service

- 选择刚才的 GitHub 仓库
- Render 会自动识别 [render.yaml](/Users/sup/Desktop/周报测试/render.yaml)

4. 配置环境变量

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

5. 等部署完成后打开 Render 提供的网址

访问路径直接是：

```text
https://你的服务地址/weekly-report.html
```

这就是手动同步版的正式固定入口；后续如果要绑自定义域名，再在 Render 后台额外配置即可。

## 部署后先验环境

先不要急着点“保存周报快照到飞书”，先做两步自检：

1. 健康检查：

```text
https://你的服务地址/api/health
```

2. 飞书快照配置检查：

```text
https://你的服务地址/api/feishu-config-check
```

如果 `PDF快照` 已正确建成附件字段，返回里应能看到：

- `configured: true`
- `storageMode: bitable_attachment`
- `attachmentField: PDF快照`
- `attachmentFieldTypeLabel: 附件`

## 上线后怎么验收

1. 打开网页，左侧不应再只是“本地模式”
2. 先点一次“检查飞书快照配置”，确认网页提示 `PDF快照` 字段可用
3. 改一个文本框或一条低毛利原因
4. 点“同步到线上”
5. 用另一浏览器或无痕窗口打开线上页，确认改动已同步
6. 看飞书低毛利反馈表 / 周报快照的文本字段是否更新
7. 点一次“保存周报快照到飞书”，确认 `PDF快照` 字段真正收到附件

## 我建议的实际做法

- 第一步：先用 Render 免费版上线
- 第二步：你自己和 1 位同事先试填
- 第三步：确认飞书同步稳定后，再给全组使用
