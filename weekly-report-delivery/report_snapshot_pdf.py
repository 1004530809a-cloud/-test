from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.cidfonts import UnicodeCIDFont
from reportlab.pdfbase.pdfmetrics import registerFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


registerFont(UnicodeCIDFont("STSong-Light"))


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
    small_style = ParagraphStyle("SmallCN", parent=base, fontSize=8.5, leading=12, textColor=colors.HexColor("#667085"))

    story = [
        Paragraph(str(report.get("title") or "行业二组周报"), title_style),
        Paragraph(f'周报周期：{report.get("period", "")}', base),
        Paragraph(f"保存时间：{generated_at}", small_style),
        Spacer(1, 6),
        Paragraph(str(report.get("heroSummary") or ""), base),
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
