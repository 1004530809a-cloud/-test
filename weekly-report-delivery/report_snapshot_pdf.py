from io import BytesIO
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.pdfbase.pdfmetrics import registerFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


registerFont(UnicodeCIDFont("STSong-Light"))


def to_plain_text(value) -> str:
    return str(value or "").strip()


def to_paragraph_text(value) -> str:
    return escape(to_plain_text(value)).replace("\n", "<br/>")


def status_label(value) -> str:
    mapping = {
        "ontrack": "正常推进",
        "watch": "重点关注",
        "risk": "存在风险",
    }
    return mapping.get(to_plain_text(value), to_plain_text(value) or "未标记")


def build_snapshot_pdf(report: dict, generated_at: str) -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title=str(report.get("title") or "周报快照"),
    )

    styles = getSampleStyleSheet()
    base = ParagraphStyle(
        "BaseCN",
        parent=styles["BodyText"],
        fontName="STSong-Light",
        fontSize=9.5,
        leading=14,
        alignment=TA_LEFT,
    )
    title_style = ParagraphStyle("TitleCN", parent=base, fontSize=20, leading=24, spaceAfter=6)
    heading_style = ParagraphStyle("HeadingCN", parent=base, fontSize=12.5, leading=18, textColor=colors.HexColor("#0f172a"))
    subheading_style = ParagraphStyle("SubHeadingCN", parent=base, fontSize=10.5, leading=15, spaceAfter=2, textColor=colors.HexColor("#111827"))
    small_style = ParagraphStyle("SmallCN", parent=base, fontSize=8.5, leading=12, textColor=colors.HexColor("#667085"))

    story = [
        Paragraph(to_paragraph_text(report.get("title") or "行业二组周报"), title_style),
        Paragraph(f'周报周期：{to_paragraph_text(report.get("period", ""))}', base),
        Paragraph(f"保存时间：{to_paragraph_text(generated_at)}", small_style),
        Spacer(1, 6),
        Paragraph(to_paragraph_text(report.get("heroSummary") or ""), base),
        Spacer(1, 10),
    ]

    metrics = [[item.get("label", ""), item.get("value", "")] for item in report.get("metrics", [])]
    if metrics:
        story.extend(
            [
                Paragraph("首页关键指标", heading_style),
                Spacer(1, 4),
                make_table([["指标", "值"], *metrics], [72 * mm, 92 * mm]),
                Spacer(1, 8),
            ]
        )

    core = report.get("sections", {}).get("core", {})
    core_rows = [["分区", "指标", "值"]]
    for section_label, section in (("SZA", core.get("sza", {})), ("非SZA", core.get("nonSza", {}))):
        for metric in section.get("miniMetrics", [])[:7]:
            core_rows.append([section_label, metric.get("label", ""), metric.get("value", "")])
    if len(core_rows) > 1:
        story.extend(
            [
                Paragraph("核心经营数据", heading_style),
                Spacer(1, 4),
                make_table(core_rows, [24 * mm, 64 * mm, 76 * mm]),
                Spacer(1, 8),
            ]
        )

    margin = report.get("sections", {}).get("margin", {})
    reason_rows = [["原因分类", "订单数", "成交金额"]]
    for row in margin.get("reasons", [])[:12]:
        reason_rows.append([str(row[0]), str(row[1]), str(row[2])])
    if len(reason_rows) > 1:
        story.extend(
            [
                Paragraph("低毛利原因汇总", heading_style),
                Spacer(1, 4),
                make_table(reason_rows, [76 * mm, 28 * mm, 60 * mm]),
                Spacer(1, 8),
            ]
        )

    order_rows = [["采购订单编号", "广告主名称", "毛利率", "原因"]]
    for row in margin.get("orders", [])[:20]:
        order_rows.append([
            str(row.get("purchaseOrderNo", "")),
            str(row.get("advertiser", "")),
            str(row.get("grossMargin", "")),
            str(row.get("reason", "")),
        ])
    if len(order_rows) > 1:
        story.extend(
            [
                Paragraph("低毛利订单摘录", heading_style),
                Spacer(1, 4),
                make_table(order_rows, [44 * mm, 72 * mm, 26 * mm, 42 * mm], repeat_rows=1),
                Spacer(1, 8),
            ]
        )

    risk = report.get("sections", {}).get("risk", {}) or {}
    risk_items = risk.get("items") or []
    if risk_items:
        story.extend(
            [
                Paragraph("风险与待协调事项", heading_style),
                Spacer(1, 4),
            ]
        )
        for index, item in enumerate(risk_items, start=1):
            title = to_plain_text(item.get("title")) or f"事项{index}"
            category = to_plain_text(item.get("category")) or "周会总结"
            owner = to_plain_text(item.get("owner")) or "未填写"
            story.extend(
                [
                    Paragraph(f"{index}. {to_paragraph_text(title)}", subheading_style),
                    Paragraph(
                        f"分类：{to_paragraph_text(category)}；负责人：{to_paragraph_text(owner)}；状态：{to_paragraph_text(status_label(item.get('status')))}",
                        small_style,
                    ),
                    Paragraph(f"当前进展：{to_paragraph_text(item.get('progress') or '待补充')}", base),
                    Paragraph(f"风险点：{to_paragraph_text(item.get('risk') or '待补充')}", base),
                    Paragraph(f"需协调事项：{to_paragraph_text(item.get('support') or '待补充')}", base),
                    Paragraph(f"下周动作：{to_paragraph_text(item.get('nextAction') or '待补充')}", base),
                    Spacer(1, 6),
                ]
            )

    special_items = risk.get("specialItems") or []
    if special_items:
        story.extend(
            [
                Paragraph("专项事项补充", heading_style),
                Spacer(1, 4),
            ]
        )
        for item in special_items:
            title = to_plain_text(item.get("title")) or "专项事项"
            story.append(Paragraph(to_paragraph_text(title), subheading_style))
            summary_title = to_plain_text(item.get("summaryTitle"))
            if summary_title:
                story.append(Paragraph(to_paragraph_text(summary_title), base))

            summary_metrics = [
                [to_plain_text(metric.get("label")), to_plain_text(metric.get("value"))]
                for metric in item.get("summaryMetrics", [])
                if to_plain_text(metric.get("label")) or to_plain_text(metric.get("value"))
            ]
            if summary_metrics:
                story.extend(
                    [
                        Spacer(1, 3),
                        make_table([["指标", "值"], *summary_metrics], [72 * mm, 92 * mm]),
                        Spacer(1, 4),
                    ]
                )

            note_label = to_plain_text(item.get("noteLabel")) or "填写内容"
            note_text = to_plain_text(item.get("note")) or "待补充"
            story.extend(
                [
                    Paragraph(f"{to_paragraph_text(note_label)}：{to_paragraph_text(note_text)}", base),
                    Spacer(1, 6),
                ]
            )

    meeting_notes = to_plain_text(risk.get("meetingNotes"))
    if meeting_notes:
        story.extend(
            [
                Paragraph("周会记录原文", heading_style),
                Spacer(1, 4),
                Paragraph(to_paragraph_text(meeting_notes), base),
            ]
        )

    doc.build(story)
    return buffer.getvalue()


def make_table(rows: list[list[str]], col_widths: list[float], repeat_rows: int = 1) -> Table:
    table = Table(rows, colWidths=col_widths, repeatRows=repeat_rows)
    table.setStyle(
        TableStyle(
            [
                ("FONTNAME", (0, 0), (-1, -1), "STSong-Light"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.8),
                ("LEADING", (0, 0), (-1, -1), 11),
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef2ff")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#111827")),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#d0d5dd")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table
