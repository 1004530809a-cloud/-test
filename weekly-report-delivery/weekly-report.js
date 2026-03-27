const sampleData = {
  title: "行业二组周报",
  period: "2026年03月16日 - 2026年03月22日",
  audience: "直属上级",
  heroSummary:
    "首页按 SZA 与非SZA 两条经营视角拆开，低毛利专项保留核心结果和原因分类，风险事项以周会总结结构化展示，适合快速汇报与导出 PDF。",
  metrics: [
    { section: "core", label: "SZA成交金额", value: "10,739,836.51", note: "点击跳转到 SZA 经营数据。" },
    { section: "core", label: "非SZA成交金额", value: "4,123,801.43", note: "点击跳转到非SZA经营数据。" },
    { section: "core", label: "SZA预估毛利率", value: "20.26%", note: "该指标来自执行订单口径。" },
    { section: "core", label: "非SZA预估毛利率", value: "14.33%", note: "该指标来自执行订单口径。" },
    { section: "margin", label: "压价覆盖率", value: "86.67%", note: "按确认订单口径计算。" },
    { section: "margin", label: "压价成功率", value: "26.48%", note: "按确认订单口径计算。" },
    { section: "margin", label: "压价提升毛利率", value: "0.79%", note: "按执行订单口径计算。" },
    { section: "risk", label: "待协调事项", value: "4项", note: "周会后填写即可自动展示。" }
  ],
  summaries: [
    { title: "经营表现", copy: "本周经营数据按 SZA 与非SZA 两条主线展示，领导可以快速看到两部分规模、毛利和压价结果。" },
    { title: "专项推进", copy: "低毛利与压价专项保留覆盖率、成功率、提升毛利率和原因TOP分类，保证重点清楚但不过重。" },
    { title: "事项管理", copy: "风险与待协调事项按周会总结结构化录入，网页负责自动排版和统一呈现。" }
  ],
  highlights: [
    { title: "SZA/非SZA拆分", copy: "经营模块按广告主名称是否包含“华为”自动区分。", section: "core-section" },
    { title: "重点客户TOP5", copy: "非SZA核心指标先汇总全部非华为订单，TOP5只作单独摘录展示。", section: "core-section" },
    { title: "原表展示", copy: "每个板块下方可挂接上传原表预览，便于对照。", section: "margin-section" }
  ],
  sections: {
    core: {
      quickLabel: "SZA / 非SZA 双分区",
      sourceLinks: [
        { label: "查看经营原表预览", href: "#core-raw-source" }
      ],
      sza: {
        miniMetrics: [
          { label: "订单数量", value: "878" },
          { label: "成交金额", value: "10,739,836.51" },
          { label: "预估毛利额", value: "2,281,690.89" },
          { label: "预估毛利率", value: "20.26%" },
          { label: "压价覆盖率", value: "86.67%" },
          { label: "压价成功率", value: "26.48%" },
          { label: "压价提升毛利率", value: "0.79%" }
        ],
        spuBreakdown: [
          ["3C数码-手机-手机", "459", "81.79%", "21.69%"],
          ["互联网-全球生态发展与销售部-工具", "229", "89.57%", "59.71%"],
          ["互联网-互动媒体BU-娱乐", "70", "75.86%", "0.00%"]
        ],
        narratives: [
          { title: "SZA经营结论", copy: "SZA以华为相关广告主为主，适合看整体规模和压价结果，不需要再堆过多客户分布。" }
        ]
      },
      nonSza: {
        miniMetrics: [
          { label: "订单数量", value: "118" },
          { label: "成交金额", value: "4,123,801.43" },
          { label: "预估毛利额", value: "473,765.70" },
          { label: "预估毛利率", value: "14.33%" },
          { label: "压价覆盖率", value: "78.91%" },
          { label: "压价成功率", value: "50.86%" },
          { label: "压价提升毛利率", value: "2.56%" }
        ],
        customers: [
          ["美的COLMO", "1,639,820.73", "222,637.10", "14.39%", "-0.68%", "方偲岳"],
          ["华熙生物-2024", "906,416.88", "121,596.29", "14.22%", "+1.12%", "梁乐怡"],
          ["安利集团", "898,727.55", "103,672.21", "12.23%", "-0.45%", "梁乐怡"],
          ["华润雪花", "732,220.90", "97,264.48", "14.08%", "+0.31%", "梁铭铭"],
          ["屈臣氏", "471,211.01", "47,758.75", "10.74%", "-1.02%", "梁铭铭"]
        ],
        narratives: [
          { title: "非SZA经营结论", copy: "非SZA上方核心指标统计全部非华为订单，表格仅摘录成交金额前5客户，便于单独看重点客户。" }
        ]
      },
      rawSource: {
        title: "经营数据原表预览",
        description: "这里建议展示上传的确认订单 / 执行订单原表预览，后续由生成脚本自动写入。",
        links: [],
        headers: ["来源", "文件名", "说明"],
        rows: [
          ["确认订单", "采购订单明细表-确认订单.xlsx", "用于成交金额、预估毛利额、压价覆盖率、压价成功率"],
          ["执行订单", "采购订单明细表-执行订单.xlsx", "用于预估毛利率、压价提升毛利率"]
        ]
      }
    },
    margin: {
      quickLabel: "低毛利订单识别 + 原因反馈",
      sourceLinks: [
        { label: "打开可填写反馈表", href: "#low-margin-orders" }
      ],
      miniMetrics: [
        { label: "低毛利订单数", value: "0" },
        { label: "低毛利成交金额", value: "0.00" },
        { label: "已填写原因", value: "0" },
        { label: "未填写原因", value: "0" }
      ],
      reasons: [
        ["待填写", "0", "0.00", "先在低毛利订单反馈表中选择原因"]
      ],
      narratives: [
        { title: "专项结论", copy: "低毛利订单会单独拉出反馈表，人工填写原因后自动刷新原因汇总。" }
      ],
      rawSource: {
        title: "低毛利订单原表预览",
        description: "点击上方入口可查看完整低毛利订单反馈表，并在原因列人工选择后自动刷新。",
        links: [],
        headers: ["采购订单编号", "广告主名称", "预估订单毛利率"],
        rows: [
          ["示例订单", "示例客户", "13.50%"]
        ]
      }
    },
    risk: {
      quickLabel: "周会总结自动排版",
      sourceLinks: [
        { label: "查看事项原表", href: "#" }
      ],
      items: [
        {
          title: "互选渠道推进慢",
          category: "资源推进",
          progress: "已识别为当前资源拓展卡点，准备切换渠道继续推进。",
          risk: "影响资源触达和建联效率，拖慢项目节奏。",
          support: "需要持续跟进新渠道的推进情况。",
          nextAction: "下周继续跟进，并在周会上更新。",
          owner: "行业二组",
          status: "watch"
        },
        {
          title: "资源上架闭环不足",
          category: "流程协同",
          progress: "部分拓回资源未及时完成上架动作，已纳入复盘。",
          risk: "影响拓展成果转化效率。",
          support: "需固定导出节奏，统一反馈上架进度。",
          nextAction: "按周度复盘闭环情况。",
          owner: "行业二组",
          status: "risk"
        }
      ]
    }
  }
};

const DEFAULT_DATA_URL = "./weekly-report-data.generated.json";
const ONLINE_CONFIG_URL = "./weekly-report-online-config.json";
const LOCAL_CACHE_KEY = "weekly-report-state-cache-v5";
const SZA_KEYWORD = "华为";
const SPU_CATEGORY_HEADER = "SPU类目";
const EXCLUDED_SPU_KEYWORD = "汽车";
const LOW_MARGIN_THRESHOLD = 14;
const LOW_MARGIN_FEEDBACK_PREVIEW_LIMIT = 10;
const LOW_MARGIN_REASONS = [
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
  "客户走单账号"
];
const REQUIRED_HEADERS = {
  advertiser: "广告主名称",
  purchaseOrderNo: "采购订单编号",
  execPriceTax: "执行价(含税)",
  grossProfit: "预估订单毛利额",
  grossMargin: "预估订单毛利率",
  actualIncomeNoTax: "订单实际收入(去税)",
  priceResult: "压价结果",
  rebateTaxThird: "应约时返点金额含税(三方)",
  rebateTaxNonThird: "应约时返点金额含税(非三方)",
  rebateTaxPlatform: "应约时返点金额含税(平台)",
  rebateNoTaxEstimate: "预估返点额不含税",
  spuCategory: SPU_CATEGORY_HEADER,
  ownerMedia: "行业媒介"
};
const YELLOW_FILL_RGB = "FFFFFF00";
const DEFAULT_YELLOW_HEADER_STYLE = {
  font: { name: "宋体", size: 11 },
  alignment: { horizontal: "center", vertical: "middle" },
  fill: {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: YELLOW_FILL_RGB },
    bgColor: { argb: YELLOW_FILL_RGB }
  }
};
const DEFAULT_BODY_STYLE = {
  font: { name: "宋体", size: 11 },
  alignment: { horizontal: "center", vertical: "middle" }
};

const state = JSON.parse(JSON.stringify(sampleData));
let executeExportContext = null;
const runtime = {
  onlineEnabled: false,
  onlineMode: "offline",
  onlineConfig: null,
  saveInFlight: false,
  snapshotSaveInFlight: false,
  lastSyncedAt: "",
  pollTimer: null
};

const el = {
  titleInput: document.getElementById("titleInput"),
  periodInput: document.getElementById("periodInput"),
  audienceInput: document.getElementById("audienceInput"),
  importInput: document.getElementById("importInput"),
  confirmExcelInput: document.getElementById("confirmExcelInput"),
  executeExcelInput: document.getElementById("executeExcelInput"),
  sampleBtn: document.getElementById("sampleBtn"),
  generateFromExcelBtn: document.getElementById("generateFromExcelBtn"),
  printBtn: document.getElementById("printBtn"),
  exportBtn: document.getElementById("exportBtn"),
  exportLowMarginExcelBtn: document.getElementById("exportLowMarginExcelBtn"),
  excelUploadHint: document.getElementById("excelUploadHint"),
  onlineSyncBadge: document.getElementById("onlineSyncBadge"),
  onlineSyncText: document.getElementById("onlineSyncText"),
  onlineSyncMeta: document.getElementById("onlineSyncMeta"),
  saveSnapshotBtn: document.getElementById("saveSnapshotBtn"),
  refreshOnlineBtn: document.getElementById("refreshOnlineBtn"),
  clearCacheBtn: document.getElementById("clearCacheBtn"),
  importLowMarginExcelInput: document.getElementById("importLowMarginExcelInput"),
  heroTitle: document.getElementById("heroTitle"),
  heroPeriod: document.getElementById("heroPeriod"),
  heroAudience: document.getElementById("heroAudience"),
  heroSummary: document.getElementById("heroSummary"),
  coreOverviewTable: document.getElementById("coreOverviewTable"),
  marginOverviewTable: document.getElementById("marginOverviewTable"),
  summaryList: document.getElementById("summaryList"),
  highlightList: document.getElementById("highlightList"),
  coreLinks: document.getElementById("coreLinks"),
  marginLinks: document.getElementById("marginLinks"),
  riskLinks: document.getElementById("riskLinks"),
  coreSzaMiniMetrics: document.getElementById("coreSzaMiniMetrics"),
  coreNonSzaMiniMetrics: document.getElementById("coreNonSzaMiniMetrics"),
  spuBreakdownBody: document.querySelector("#spuBreakdownTable tbody"),
  spuInsightList: document.getElementById("spuInsightList"),
  customerBody: document.querySelector("#customerTable tbody"),
  reasonBody: document.querySelector("#reasonTable tbody"),
  lowMarginOrderBody: document.querySelector("#lowMarginOrderTable tbody"),
  coreSzaNarratives: document.getElementById("coreSzaNarratives"),
  coreNonSzaNarratives: document.getElementById("coreNonSzaNarratives"),
  marginMiniMetrics: document.getElementById("marginMiniMetrics"),
  marginNarratives: document.getElementById("marginNarratives"),
  coreRawSource: document.getElementById("coreRawSource"),
  marginRawSource: document.getElementById("marginRawSource"),
  riskBoard: document.getElementById("riskBoard")
};

async function init() {
  await loadOnlineConfig();
  if (!runtime.onlineEnabled) {
    restoreFromLocalCache();
  }
  syncInputsFromState();
  bindControls();
  render();
  if (runtime.onlineEnabled) {
    await loadOnlineState();
    startOnlinePolling();
  } else {
    await loadDefaultGeneratedData();
  }
  updateOnlineSyncStatus();
}

function syncInputsFromState() {
  el.titleInput.value = state.title;
  el.periodInput.value = state.period;
  el.audienceInput.value = state.audience;
}

function bindControls() {
  el.titleInput.addEventListener("input", () => {
    state.title = el.titleInput.value.trim() || "行业二组周报";
    renderHero();
  });
  el.periodInput.addEventListener("input", () => {
    state.period = el.periodInput.value.trim();
    renderHero();
  });
  el.audienceInput.addEventListener("input", () => {
    state.audience = el.audienceInput.value.trim();
    renderHero();
  });
  el.sampleBtn.addEventListener("click", () => {
    executeExportContext = null;
    replaceState(JSON.parse(JSON.stringify(sampleData)), { persistLocal: !runtime.onlineEnabled });
  });
  el.generateFromExcelBtn.addEventListener("click", handleExcelGeneration);
  el.printBtn.addEventListener("click", () => window.print());
  el.exportBtn.addEventListener("click", exportCurrentData);
  el.importInput.addEventListener("change", importDataFile);
  el.exportLowMarginExcelBtn.addEventListener("click", exportLowMarginExcel);
  el.importLowMarginExcelInput.addEventListener("change", importLowMarginExcel);
  el.saveSnapshotBtn.addEventListener("click", saveSnapshotToFeishu);
  el.refreshOnlineBtn.addEventListener("click", async () => {
    if (!runtime.onlineEnabled) {
      alert("当前未开启在线同步配置。");
      return;
    }
    await loadOnlineState(true);
  });
  el.clearCacheBtn.addEventListener("click", () => {
    try {
      localStorage.removeItem(LOCAL_CACHE_KEY);
      updateOnlineSyncStatus("已清理本地缓存。");
    } catch (error) {
      updateOnlineSyncStatus("本地缓存清理失败。", "error");
    }
  });
}

async function loadOnlineConfig() {
  try {
    const response = await fetch(ONLINE_CONFIG_URL, { cache: "no-store" });
    if (!response.ok) return;
    const parsed = await response.json();
    if (!parsed || parsed.enabled !== true) return;
    runtime.onlineEnabled = true;
    runtime.onlineConfig = parsed;
    runtime.onlineMode = "online";
    if (parsed.snapshotButtonText) {
      el.saveSnapshotBtn.textContent = parsed.snapshotButtonText;
    }
  } catch (error) {
    runtime.onlineEnabled = false;
    runtime.onlineMode = "offline";
  }
}

function getOnlineApiBase() {
  const base = runtime.onlineConfig?.apiBaseUrl || "";
  return base.replace(/\/$/, "");
}

async function loadOnlineState(showToast = false) {
  if (!runtime.onlineEnabled) return;
  try {
    updateOnlineSyncStatus("正在拉取在线数据...", "saving");
    const response = await fetch(`${getOnlineApiBase()}/api/report-state`, { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || !payload?.ok || !payload.report) {
      throw new Error(payload?.error || "在线数据读取失败");
    }
    runtime.onlineMode = payload.mode || "online";
    runtime.lastSyncedAt = payload.serverTime || "";
    replaceState(payload.report, { persistLocal: false });
    updateOnlineSyncStatus(showToast ? "已刷新在线数据。" : "在线数据已连接。", "online");
  } catch (error) {
    updateOnlineSyncStatus(`在线同步异常：${error.message || "请检查服务是否启动。"}`, "error");
  }
}

function startOnlinePolling() {
  if (!runtime.onlineEnabled || runtime.pollTimer) return;
  const interval = Number(runtime.onlineConfig?.pollIntervalMs) || 20000;
  runtime.pollTimer = window.setInterval(() => {
    if (runtime.saveInFlight || runtime.snapshotSaveInFlight || document.hidden) return;
    loadOnlineState(false);
  }, interval);
}

function updateOnlineSyncStatus(message = "", mode = "") {
  const statusMode = mode || (runtime.onlineEnabled ? ((runtime.saveInFlight || runtime.snapshotSaveInFlight) ? "saving" : "online") : "offline");
  const badgeTextMap = {
    online: "在线同步中",
    saving: "保存中",
    offline: "本地模式",
    error: "同步异常"
  };
  el.onlineSyncBadge.textContent = badgeTextMap[statusMode] || badgeTextMap.offline;
  el.onlineSyncBadge.className = `status-badge status-${statusMode}`;

  if (message) {
    el.onlineSyncText.textContent = message;
  } else if (runtime.onlineEnabled) {
    el.onlineSyncText.textContent = "当前在线同步范围：低毛利原因填写、原因汇总、飞书留存快照。Excel 重新生成仍在线下执行。";
  } else {
    el.onlineSyncText.textContent = "当前仍按本地 JSON / 本地缓存运行，低毛利原因不会多人实时同步。";
  }

  if (runtime.onlineEnabled) {
    const syncLabel = runtime.lastSyncedAt ? `最近同步：${new Date(runtime.lastSyncedAt).toLocaleString("zh-CN")}` : "最近同步：尚未完成";
    el.onlineSyncMeta.textContent = `模式：${runtime.onlineMode}${runtime.onlineConfig?.editorName ? `；默认填写人：${runtime.onlineConfig.editorName}` : ""}；${syncLabel}`;
  } else {
    el.onlineSyncMeta.textContent = "如需多人在线协作，请提供 weekly-report-online-config.json 并通过在线服务打开页面。";
  }
}

async function loadDefaultGeneratedData() {
  try {
    const response = await fetch(DEFAULT_DATA_URL, { cache: "no-store" });
    if (!response.ok) return;
    const parsed = await response.json();
    replaceState(parsed, { persistLocal: !runtime.onlineEnabled });
  } catch (error) {
    // Keep locally cached data or sample data when the page is opened directly without a local server.
  }
}

async function handleExcelGeneration() {
  const confirmFile = el.confirmExcelInput.files?.[0];
  const executeFile = el.executeExcelInput.files?.[0];

  if (!confirmFile || !executeFile) {
    alert("请先同时上传确认订单和执行订单 Excel。");
    return;
  }

  if (typeof XLSX === "undefined") {
    alert("Excel 解析库加载失败，请检查网络后重试。");
    return;
  }

  try {
    el.generateFromExcelBtn.disabled = true;
    el.generateFromExcelBtn.textContent = "生成中...";

    const [confirmRows, executeRows] = await Promise.all([
      parseExcelFile(confirmFile),
      parseExcelFile(executeFile)
    ]);
    executeExportContext = await extractExecuteExportContext(executeFile);

    const next = buildReportData(
      confirmRows,
      executeRows,
      confirmFile.name,
      executeFile.name,
      URL.createObjectURL(confirmFile),
      URL.createObjectURL(executeFile)
    );
    if (executeExportContext?.highlightedHeaders?.length) {
      next.sections.margin.exportHeaders = [...executeExportContext.highlightedHeaders];
    }
    replaceState(next, { persistLocal: !runtime.onlineEnabled });
    el.excelUploadHint.textContent = `已按最新口径生成：已过滤“${EXCLUDED_SPU_KEYWORD}”类目，并按 SPU类目 输出 SZA 压价数据。`;
  } catch (error) {
    alert(`生成失败：${error.message || "请检查 Excel 表头和文件结构。"}`);
  } finally {
    el.generateFromExcelBtn.disabled = false;
    el.generateFromExcelBtn.textContent = "用 Excel 重新生成";
  }
}

async function parseExcelFile(file) {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const matrix = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: false,
    defval: ""
  });
  return normalizeRows(matrix, file.name);
}

async function extractExecuteExportContext(file) {
  if (typeof ExcelJS === "undefined") return null;

  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.worksheets[0];
  const { rowNumber, headers } = findExcelJsHeaderRow(worksheet, file.name);

  const highlightedHeaders = [];
  const headerStyles = {};
  const bodyStyles = {};
  const columnWidths = {};

  headers.forEach((header, index) => {
    const colNumber = index + 1;
    const headerCell = worksheet.getRow(rowNumber).getCell(colNumber);
    if (!isYellowExcelJsFill(headerCell.fill)) return;

    highlightedHeaders.push(header);
    headerStyles[header] = cloneExcelJsStyle(headerCell.style);
    bodyStyles[header] = cloneExcelJsStyle(worksheet.getRow(rowNumber + 1).getCell(colNumber).style);
    columnWidths[header] = worksheet.getColumn(colNumber).width || 12;
  });

  return {
    highlightedHeaders,
    headerStyles,
    bodyStyles,
    columnWidths
  };
}

function findExcelJsHeaderRow(worksheet, fileName) {
  for (let rowNumber = 1; rowNumber <= Math.min(worksheet.rowCount || 10, 10); rowNumber += 1) {
    const values = [];
    worksheet.getRow(rowNumber).eachCell({ includeEmpty: true }, (cell, colNumber) => {
      values[colNumber - 1] = String(cell.value || "").trim();
    });
    if (values.includes(REQUIRED_HEADERS.advertiser) && values.includes(REQUIRED_HEADERS.priceResult)) {
      return { rowNumber, headers: values };
    }
  }
  throw new Error(`未在 ${fileName} 中找到有效表头。`);
}

function isYellowExcelJsFill(fill) {
  const argb = fill?.fgColor?.argb || fill?.bgColor?.argb || "";
  return fill?.type === "pattern" && fill?.pattern === "solid" && argb.toUpperCase().endsWith("FFFF00");
}

function cloneExcelJsStyle(style) {
  return style ? JSON.parse(JSON.stringify(style)) : null;
}

function normalizeRows(matrix, fileName) {
  const headerRowIndex = matrix.findIndex((row) => row.includes(REQUIRED_HEADERS.advertiser) && row.includes(REQUIRED_HEADERS.priceResult));
  if (headerRowIndex < 0) {
    throw new Error(`未在 ${fileName} 中找到有效表头。`);
  }

  const headers = matrix[headerRowIndex].map((value) => String(value || "").trim());
  const indexMap = {};
  Object.entries(REQUIRED_HEADERS).forEach(([key, label]) => {
    const index = headers.indexOf(label);
    if (index < 0) {
      throw new Error(`${fileName} 缺少表头：${label}`);
    }
    indexMap[key] = index;
  });

  return matrix
    .slice(headerRowIndex + 1)
    .filter((row) => row.some((value) => String(value || "").trim()))
    .map((row) => {
      const advertiser = String(row[indexMap.advertiser] || "").trim();
      const spuCategory = String(row[indexMap.spuCategory] || "").trim();
      const priceResult = String(row[indexMap.priceResult] || "").trim();
      const rebateSum =
        toNumber(row[indexMap.rebateTaxThird]) +
        toNumber(row[indexMap.rebateTaxNonThird]) +
        toNumber(row[indexMap.rebateTaxPlatform]);

      return {
        advertiser,
        purchaseOrderNo: String(row[indexMap.purchaseOrderNo] || "").trim(),
        spuCategory,
        isSza: advertiser.includes(SZA_KEYWORD),
        execPriceTax: toNumber(row[indexMap.execPriceTax]),
        grossProfit: toNumber(row[indexMap.grossProfit]),
        grossMargin: toPercentNumber(row[indexMap.grossMargin]),
        actualIncomeNoTax: toNumber(row[indexMap.actualIncomeNoTax]),
        priceResult,
        rebateSum,
        rebateNoTaxEstimate: toNumber(row[indexMap.rebateNoTaxEstimate]),
        ownerName: extractOwnerName(row[indexMap.ownerMedia]),
        exportFields: Object.fromEntries(
          headers
            .filter((header) => header)
            .map((header, index) => [header, String(row[index] || "").trim()])
        )
      };
    })
    .filter((row) => row.advertiser)
    .filter((row) => !row.spuCategory.includes(EXCLUDED_SPU_KEYWORD));
}

function buildReportData(confirmRows, executeRows, confirmName, executeName, confirmHref = "", executeHref = "") {
  const szaCore = calcCoreMetrics(confirmRows, executeRows, true);
  const nonSzaCore = calcCoreMetrics(confirmRows, executeRows, false);
  const spuBreakdown = calcSzaSpuBreakdown(confirmRows, executeRows);
  const lowMarginOrders = buildLowMarginOrders(executeRows);
  const lowMarginSummary = summarizeLowMarginOrders(lowMarginOrders);

  return {
    title: "行业二组周报",
    period: state.period || sampleData.period,
    audience: state.audience || "直属上级",
    heroSummary: `经营数据已支持网页直接上传 Excel 自动生成；全部数据先过滤“${EXCLUDED_SPU_KEYWORD}”类目，再按 SZA / 非SZA 以及 SZA-SPU类目 计算。`,
    metrics: [
      { section: "core", label: "SZA成交金额", value: szaCore["成交金额"], note: "来自执行订单口径。" },
      { section: "core", label: "非SZA成交金额", value: nonSzaCore["成交金额"], note: "来自执行订单口径。" },
      { section: "core", label: "SZA预估毛利率", value: szaCore["预估毛利率"], note: "来自执行订单口径。" },
      { section: "core", label: "非SZA预估毛利率", value: nonSzaCore["预估毛利率"], note: "来自执行订单口径。" },
      { section: "margin", label: "低毛利订单数", value: lowMarginSummary.orderCount, note: "执行订单中预估订单毛利率低于14%。" },
      { section: "margin", label: "低毛利成交金额", value: lowMarginSummary.amount, note: "来自执行价(含税)汇总。" },
      { section: "margin", label: "已填写原因", value: lowMarginSummary.filledCount, note: "人工填写后自动汇总。" },
      { section: "risk", label: "待协调事项", value: "请维护", note: "风险事项仍建议人工维护。" }
    ],
    summaries: [
      { title: "经营表现", copy: "成交金额与预估毛利率已切换为执行订单口径，首页继续按 SZA / 非SZA 双行展示。" },
      { title: "专项推进", copy: "第二大项已改成低毛利专项，低毛利订单来自执行订单中预估订单毛利率低于14%的数据。" },
      { title: "事项管理", copy: "风险与待协调事项继续人工维护，网页只负责自动排版和数据展示。" }
    ],
    highlights: [
      { title: "执行订单口径", copy: `成交金额、预估毛利率与提升毛利率来自：${executeName}`, section: "core-section" },
      { title: "汽车类目已过滤", copy: `计算前已删除 ${SPU_CATEGORY_HEADER} 含“${EXCLUDED_SPU_KEYWORD}”的所有行。`, section: "margin-section" },
      { title: "重点客户TOP5", copy: "非SZA核心指标汇总全部非华为订单，TOP5仅按成交金额单独摘录。", section: "core-section" }
    ],
    sections: {
      core: {
        quickLabel: "SZA / 非SZA 双分区",
        sourceLinks: [{ label: "查看经营原表预览", href: "#core-raw-source" }],
        sza: {
          miniMetrics: metricsObjectToList(szaCore, ["订单数量", "成交金额", "预估毛利额", "预估毛利率", "压价覆盖率", "压价成功率", "压价提升毛利率"]),
          spuBreakdown,
          narratives: [
            { title: "SZA经营结论", copy: "SZA 继续按广告主名称含“华为”识别，并额外按 SPU类目 输出压价结果。" }
          ]
        },
        nonSza: {
          miniMetrics: metricsObjectToList(nonSzaCore, ["订单数量", "成交金额", "预估毛利额", "预估毛利率", "压价覆盖率", "压价成功率", "压价提升毛利率"]),
          customers: calcTop5NonSza(executeRows),
          narratives: [
            { title: "非SZA经营结论", copy: "非SZA 上方核心指标汇总全部非华为订单，下面只额外摘录成交金额前5客户。" }
          ]
        },
        rawSource: buildRawSource(confirmRows, executeRows, confirmName, executeName, confirmHref, executeHref)
      },
      margin: {
        quickLabel: "低毛利订单识别 + 原因反馈",
        sourceLinks: [
          { label: "打开可填写反馈表", href: "#low-margin-orders" },
          ...(executeHref ? [{ label: "打开执行订单原表", href: executeHref }] : [])
        ],
        exportHeaders: executeExportContext?.highlightedHeaders?.length
          ? [...executeExportContext.highlightedHeaders]
          : Object.keys(lowMarginOrders[0]?.exportFields || {}),
        miniMetrics: [
          { label: "低毛利订单数", value: lowMarginSummary.orderCount },
          { label: "低毛利成交金额", value: lowMarginSummary.amount },
          { label: "已填写原因", value: lowMarginSummary.filledCount },
          { label: "未填写原因", value: lowMarginSummary.unfilledCount }
        ],
        reasons: lowMarginSummary.reasonRows,
        orders: lowMarginOrders,
        narratives: [
          { title: "专项结论", copy: "原因在低毛利订单反馈表里人工选择后，页面会自动刷新原因分类统计。" }
        ],
        rawSource: buildMarginRawSource(lowMarginOrders, executeName, executeHref)
      },
      risk: {
        quickLabel: "周会总结自动排版",
        sourceLinks: [{ label: "查看事项原表", href: "#" }],
        items: state.sections?.risk?.items || sampleData.sections.risk.items
      }
    }
  };
}

function calcCoreMetrics(confirmRows, executeRows, isSza) {
  const confirmScope = confirmRows.filter((row) => row.isSza === isSza);
  const executeScope = executeRows.filter((row) => row.isSza === isSza);
  const covered = confirmScope.filter((row) => row.priceResult && row.rebateSum !== 0);
  const success = covered.filter((row) => row.priceResult === "返点有提升");
  const executeWithRebate = executeScope.filter((row) => row.rebateSum !== 0);

  return {
    成交金额: formatMoney(sumBy(executeScope, "execPriceTax")),
    订单数量: String(confirmScope.length),
    预估毛利额: formatMoney(sumBy(confirmScope, "grossProfit")),
    预估毛利率: formatPercent(sumBy(executeScope, "grossProfit"), sumBy(executeScope, "actualIncomeNoTax")),
    压价覆盖率: formatPercent(covered.length, confirmScope.length),
    压价成功率: formatPercent(success.length, covered.length),
    压价提升毛利率: formatPercent(
      sumBy(executeWithRebate, "rebateNoTaxEstimate") - sumBy(executeWithRebate, "rebateSum"),
      sumBy(executeScope, "actualIncomeNoTax")
    )
  };
}

function calcSzaSpuBreakdown(confirmRows, executeRows) {
  const categories = [...new Set(executeRows.filter((row) => row.isSza && row.spuCategory).map((row) => row.spuCategory))].sort();

  return categories.map((category) => {
    const confirmScope = confirmRows.filter((row) => row.isSza && row.spuCategory === category);
    const executeScope = executeRows.filter((row) => row.isSza && row.spuCategory === category);
    const covered = confirmScope.filter((row) => row.priceResult && row.rebateSum !== 0);
    const success = covered.filter((row) => row.priceResult === "返点有提升");
    const executeWithRebate = executeScope.filter((row) => row.rebateSum !== 0);

    return [
      category,
      String(executeScope.length),
      formatPercent(covered.length, confirmScope.length),
      formatPercent(success.length, covered.length)
    ];
  }).sort((a, b) => Number(b[1]) - Number(a[1]));
}

function buildLowMarginOrders(executeRows) {
  return executeRows
    .filter((row) => row.grossMargin < LOW_MARGIN_THRESHOLD)
    .sort((a, b) => a.grossMargin - b.grossMargin)
    .map((row, index) => ({
      id: row.purchaseOrderNo || `${row.advertiser}-${index}`,
      purchaseOrderNo: row.purchaseOrderNo || "--",
      advertiser: row.advertiser,
      spuCategory: row.spuCategory,
      execPriceTax: formatMoney(row.execPriceTax),
      grossMargin: `${row.grossMargin.toFixed(2)}%`,
      reason: "",
      exportFields: row.exportFields || {}
    }));
}

function summarizeLowMarginOrders(orders) {
  const filledCount = orders.filter((order) => order.reason).length;
  const rows = [];
  LOW_MARGIN_REASONS.forEach((reason) => {
    const matched = orders.filter((order) => order.reason === reason);
    if (!matched.length) return;
    rows.push([
      reason,
      String(matched.length),
      formatMoney(matched.reduce((sum, order) => sum + toNumber(order.execPriceTax), 0)),
      "来自低毛利订单反馈表人工归因"
    ]);
  });
  if (!rows.length) {
    rows.push(["待填写", "0", "0.00", "先在低毛利订单反馈表中选择原因"]);
  }

  return {
    orderCount: String(orders.length),
    amount: formatMoney(orders.reduce((sum, order) => sum + toNumber(order.execPriceTax), 0)),
    filledCount: String(filledCount),
    unfilledCount: String(orders.length - filledCount),
    reasonRows: rows
  };
}

function calcTop5NonSza(rows) {
  const grouped = {};
  rows.filter((row) => !row.isSza).forEach((row) => {
    const ownerName = row.ownerName || "未填写";
    const bucket = grouped[ownerName] || {
      ownerName,
      advertiser: row.advertiser,
      execPriceTax: 0,
      grossProfit: 0,
      actualIncomeNoTax: 0
    };
    bucket.execPriceTax += row.execPriceTax;
    bucket.grossProfit += row.grossProfit;
    bucket.actualIncomeNoTax += row.actualIncomeNoTax;
    grouped[ownerName] = bucket;
  });

  return Object.values(grouped)
    .sort((a, b) => b.execPriceTax - a.execPriceTax)
    .slice(0, 5)
    .map((item) => [
      item.advertiser,
      formatMoney(item.execPriceTax),
      formatMoney(item.grossProfit),
      formatPercent(item.grossProfit, item.actualIncomeNoTax),
      "--",
      item.ownerName
    ]);
}

function buildRawSource(confirmRows, executeRows, confirmName, executeName, confirmHref = "", executeHref = "") {
  return {
    title: "经营数据原表预览",
    description: `确认订单：${confirmName}；执行订单：${executeName}。计算前已删除 ${SPU_CATEGORY_HEADER} 含“${EXCLUDED_SPU_KEYWORD}”的行。`,
    links: [
      ...(confirmHref ? [{ label: "打开确认订单原表", href: confirmHref }] : []),
      ...(executeHref ? [{ label: "打开执行订单原表", href: executeHref }] : [])
    ],
    headers: ["来源", "广告主名称", "SPU类目", "执行价(含税)", "压价结果", "预估订单毛利额"],
    rows: [
      ...confirmRows.slice(0, 5).map((row) => [
        "确认订单",
        row.advertiser,
        row.spuCategory,
        formatMoney(row.execPriceTax),
        row.priceResult,
        formatMoney(row.grossProfit)
      ]),
      ...executeRows.slice(0, 5).map((row) => [
        "执行订单",
        row.advertiser,
        row.spuCategory,
        formatMoney(row.execPriceTax),
        row.priceResult,
        formatMoney(row.grossProfit)
      ])
    ]
  };
}

function buildMarginRawSource(orders, executeName, executeHref = "") {
  return {
    title: "低毛利订单原表预览",
    description: `执行订单来源：${executeName}。此处仅展示低毛利订单的前几行，完整明细请查看低毛利订单反馈表。`,
    links: executeHref ? [{ label: "打开执行订单原表", href: executeHref }] : [],
    headers: ["采购订单编号", "广告主名称", "SPU类目", "执行价(含税)", "预估订单毛利率", "原因"],
    rows: orders.slice(0, 10).map((order) => [
      order.purchaseOrderNo,
      order.advertiser,
      order.spuCategory,
      order.execPriceTax,
      order.grossMargin,
      order.reason
    ])
  };
}

function metricsObjectToList(metrics, order = []) {
  const keys = order.length ? order.filter((key) => key in metrics) : Object.keys(metrics);
  return keys.map((label) => ({ label, value: metrics[label] }));
}

function sumBy(rows, key) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}

function toNumber(value) {
  if (value === null || value === undefined || value === "" || value === "-") return 0;
  const normalized = String(value).replace(/,/g, "").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toPercentNumber(value) {
  if (value === null || value === undefined || value === "" || value === "-") return 0;
  const rawText = String(value).trim();
  const hasPercentSign = rawText.includes("%");
  const text = rawText.replace(/%/g, "").replace(/,/g, "").trim();
  const parsed = Number(text);
  if (!Number.isFinite(parsed)) return 0;
  if (hasPercentSign) return parsed;
  return Math.abs(parsed) <= 1 ? parsed * 100 : parsed;
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatPercent(numerator, denominator) {
  if (!denominator) return "0.00%";
  return `${((Number(numerator) / Number(denominator)) * 100).toFixed(2)}%`;
}

function replaceState(next, options = {}) {
  const { persistLocal = true } = options;
  const normalized = normalizeLoadedReportData(next);
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, normalized);
  if (persistLocal) {
    persistStateToLocalCache();
  }
  syncInputsFromState();
  render();
}

function normalizeLoadedReportData(data) {
  const next = JSON.parse(JSON.stringify(data || sampleData));
  const margin = next.sections?.margin;
  if (!margin) return next;

  const seenOrderNos = new Set();
  const orders = (margin.orders || [])
    .filter((order) => {
      const purchaseOrderNo = String(order?.purchaseOrderNo || "").trim();
      const advertiser = String(order?.advertiser || "").trim();
      if (!purchaseOrderNo || purchaseOrderNo === "--" || purchaseOrderNo === "示例订单") return false;
      if (advertiser === "示例客户") return false;
      if (seenOrderNos.has(purchaseOrderNo)) return false;
      seenOrderNos.add(purchaseOrderNo);
      return true;
    })
    .map((order) => ({
      ...order,
      purchaseOrderNo: String(order.purchaseOrderNo || "").trim(),
      advertiser: String(order.advertiser || "").trim(),
      spuCategory: String(order.spuCategory || "").trim(),
      execPriceTax: String(order.execPriceTax || "").trim(),
      grossMargin: String(order.grossMargin || "").trim(),
      reason: String(order.reason || "").trim(),
      reasonEditor: String(order.reasonEditor || "").trim(),
      reasonUpdatedAt: String(order.reasonUpdatedAt || "").trim(),
      exportFields: order.exportFields || {}
    }));

  margin.orders = orders;
  margin.exportHeaders = (margin.exportHeaders || []).filter(Boolean);
  if (!margin.exportHeaders.length && orders.length) {
    margin.exportHeaders = Object.keys(orders.find((order) => Object.keys(order.exportFields || {}).length)?.exportFields || {});
  }

  const summary = summarizeLowMarginOrders(orders);
  margin.miniMetrics = [
    { label: "低毛利订单数", value: summary.orderCount },
    { label: "低毛利成交金额", value: summary.amount },
    { label: "已填写原因", value: summary.filledCount },
    { label: "未填写原因", value: summary.unfilledCount }
  ];
  margin.reasons = summary.reasonRows;

  if (Array.isArray(next.metrics) && next.metrics.length >= 7) {
    next.metrics[4] = { section: "margin", label: "低毛利订单数", value: summary.orderCount, note: "执行订单中预估订单毛利率低于14%。" };
    next.metrics[5] = { section: "margin", label: "低毛利成交金额", value: summary.amount, note: "来自执行价(含税)汇总。" };
    next.metrics[6] = { section: "margin", label: "已填写原因", value: summary.filledCount, note: "人工填写后自动汇总。" };
  }

  if (margin.rawSource && orders.length) {
    margin.rawSource.headers = ["采购订单编号", "广告主名称", "SPU类目", "执行价(含税)", "预估订单毛利率", "原因"];
    margin.rawSource.rows = orders.slice(0, 10).map((order) => [
      order.purchaseOrderNo,
      order.advertiser,
      order.spuCategory,
      order.execPriceTax,
      order.grossMargin,
      order.reason
    ]);
  }

  if (runtime.onlineEnabled && String(margin.feedbackFileHref || "").startsWith("file:")) {
    margin.feedbackFileHref = "";
  }

  return next;
}

function render() {
  renderHero();
  renderOverviewTables();
  renderTextCards(el.summaryList, state.summaries, "summaries", "summary");
  renderTextCards(el.highlightList, state.highlights, "highlights", "stack");
  renderSectionLinks(el.coreLinks, state.sections.core.sourceLinks, "sections.core.sourceLinks");
  renderSectionLinks(el.marginLinks, state.sections.margin.sourceLinks, "sections.margin.sourceLinks");
  renderSectionLinks(el.riskLinks, state.sections.risk.sourceLinks, "sections.risk.sourceLinks");
  renderMiniMetrics(el.coreSzaMiniMetrics, state.sections.core.sza.miniMetrics, "sections.core.sza.miniMetrics");
  renderMiniMetrics(el.coreNonSzaMiniMetrics, state.sections.core.nonSza.miniMetrics, "sections.core.nonSza.miniMetrics");
  renderMiniMetrics(el.marginMiniMetrics, state.sections.margin.miniMetrics, "sections.margin.miniMetrics");
  renderTable(el.spuBreakdownBody, state.sections.core.sza.spuBreakdown || [], "sections.core.sza.spuBreakdown");
  renderSpuInsightList(state.sections.core.sza.spuBreakdown || []);
  renderTable(el.customerBody, state.sections.core.nonSza.customers, "sections.core.nonSza.customers");
  renderTable(el.reasonBody, state.sections.margin.reasons, "sections.margin.reasons");
  renderLowMarginOrders();
  renderTextCards(el.coreSzaNarratives, state.sections.core.sza.narratives, "sections.core.sza.narratives", "stack");
  renderTextCards(el.coreNonSzaNarratives, state.sections.core.nonSza.narratives, "sections.core.nonSza.narratives", "stack");
  renderTextCards(el.marginNarratives, state.sections.margin.narratives, "sections.margin.narratives", "stack");
  renderRawSource(el.coreRawSource, state.sections.core.rawSource, "sections.core.rawSource", "core-raw-source");
  renderRawSource(el.marginRawSource, state.sections.margin.rawSource, "sections.margin.rawSource", "margin-raw-source");
  renderRiskBoard();
  bindEditable();
}

function renderHero() {
  el.heroTitle.textContent = state.title;
  el.heroPeriod.textContent = state.period;
  el.heroAudience.textContent = state.audience ? `查看对象：${state.audience}` : "";
  el.heroSummary.textContent = state.heroSummary;
}

function renderOverviewTables() {
  renderOverviewMatrix(
    el.coreOverviewTable,
    ["对象", "订单数量", "成交金额", "预估毛利额", "预估毛利率"],
    [
      {
        rowLabel: "SZA",
        cells: [
          state.sections.core.sza.miniMetrics[0],
          state.sections.core.sza.miniMetrics[1],
          state.sections.core.sza.miniMetrics[2],
          state.sections.core.sza.miniMetrics[3]
        ]
      },
      {
        rowLabel: "非SZA",
        cells: [
          state.sections.core.nonSza.miniMetrics[0],
          state.sections.core.nonSza.miniMetrics[1],
          state.sections.core.nonSza.miniMetrics[2],
          state.sections.core.nonSza.miniMetrics[3]
        ]
      }
    ]
  );

  renderOverviewMatrix(
    el.marginOverviewTable,
    ["对象", "低毛利订单数", "低毛利成交金额", "已填写原因"],
    [
      {
        rowLabel: "低毛利",
        cells: [
          state.sections.margin.miniMetrics[0],
          state.sections.margin.miniMetrics[1],
          state.sections.margin.miniMetrics[2]
        ]
      }
    ]
  );
}

function renderSpuInsightList(rows) {
  el.spuInsightList.innerHTML = "";
  if (!rows.length) return;
  rows.forEach((row) => {
    const article = document.createElement("article");
    article.className = "spu-insight-card";
    article.innerHTML = `
      <h4 class="spu-insight-title">${row[0]}</h4>
      <p class="spu-insight-copy">订单数量 ${row[1]}，压价覆盖率 ${row[2]}，压价成功率 ${row[3]}。</p>
    `;
    el.spuInsightList.appendChild(article);
  });
}

function renderOverviewMatrix(table, headers, rows) {
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");
  thead.innerHTML = `<tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>`;
  tbody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <th><span class="overview-row-label">${row.rowLabel}</span></th>
          ${row.cells
            .map(
              (cell) => `
                <td>
                  <div class="overview-cell">
                    <span class="overview-label">${cell.label}</span>
                    <span class="overview-value">${cell.value}</span>
                  </div>
                </td>
              `
            )
            .join("")}
        </tr>
      `
    )
    .join("");
}

function renderTextCards(container, items, basePath, kind) {
  container.innerHTML = "";
  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = kind === "summary" ? "summary-item" : "stack-item";
    article.innerHTML = `
      <h4 class="${kind}-title" contenteditable="true" data-path="${basePath}.${index}.title">${item.title}</h4>
      <p class="${kind}-copy" contenteditable="true" data-path="${basePath}.${index}.copy">${item.copy}</p>
    `;
    if (item.section) {
      article.style.cursor = "pointer";
      article.addEventListener("click", () => {
        const target = document.getElementById(item.section);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    container.appendChild(article);
  });
}

function renderSectionLinks(container, links, basePath) {
  container.innerHTML = "";
  links.forEach((link, index) => {
    const anchor = document.createElement("a");
    anchor.className = "section-link";
    anchor.href = link.href || "#";
    anchor.textContent = link.label;
    anchor.contentEditable = "true";
    anchor.dataset.path = `${basePath}.${index}.label`;
    anchor.addEventListener("click", (event) => {
      if (anchor.getAttribute("href").startsWith("#")) return;
      event.stopPropagation();
    });
    container.appendChild(anchor);
  });
}

function renderMiniMetrics(container, metrics, basePath) {
  container.innerHTML = "";
  metrics.forEach((metric, index) => {
    const div = document.createElement("div");
    div.className = "mini-metric";
    div.innerHTML = `
      <div class="mini-metric-label" contenteditable="true" data-path="${basePath}.${index}.label">${metric.label}</div>
      <div class="mini-metric-value" contenteditable="true" data-path="${basePath}.${index}.value">${metric.value}</div>
    `;
    container.appendChild(div);
  });
}

function renderTable(tbody, rows, basePath) {
  tbody.innerHTML = "";
  rows.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach((value, colIndex) => {
      const td = document.createElement("td");
      td.textContent = value;
      td.contentEditable = "true";
      td.dataset.path = `${basePath}.${rowIndex}.${colIndex}`;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function renderRawSource(container, source, basePath, anchorId) {
  container.innerHTML = "";
  if (!source) return;
  const card = document.createElement("article");
  card.className = "raw-source-card";
  card.id = anchorId;
  card.innerHTML = `
    <details>
      <summary class="raw-source-summary">
        <div class="raw-source-title">
          <h4 contenteditable="true" data-path="${basePath}.title">${source.title}</h4>
          <span class="raw-source-badge">${source.rows.length} 行预览</span>
        </div>
        <span class="raw-source-toggle">点击展开原表</span>
      </summary>
      <div class="raw-source-body">
        <p contenteditable="true" data-path="${basePath}.description">${source.description}</p>
        <div class="section-actions raw-source-links">
          ${(source.links || [])
            .map((link, index) => `<a class="section-link" href="${link.href || "#"}" contenteditable="true" data-path="${basePath}.links.${index}.label">${link.label}</a>`)
            .join("")}
        </div>
        <div class="table-wrap">
          <table class="report-table">
            <thead><tr>${source.headers.map((header, index) => `<th contenteditable="true" data-path="${basePath}.headers.${index}">${header}</th>`).join("")}</tr></thead>
            <tbody>
              ${source.rows
                .map(
                  (row, rowIndex) =>
                    `<tr>${row
                      .map((value, colIndex) => `<td contenteditable="true" data-path="${basePath}.rows.${rowIndex}.${colIndex}">${value}</td>`)
                      .join("")}</tr>`
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  `;
  container.appendChild(card);
}

function renderLowMarginOrders() {
  el.lowMarginOrderBody.innerHTML = "";
  (state.sections.margin.orders || []).slice(0, LOW_MARGIN_FEEDBACK_PREVIEW_LIMIT).forEach((order, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${order.purchaseOrderNo}</td>
      <td>${order.advertiser}</td>
      <td>${order.spuCategory}</td>
      <td>${order.execPriceTax}</td>
      <td>${order.grossMargin}</td>
      <td></td>
    `;
    const select = document.createElement("select");
    select.className = "reason-select";
    select.dataset.index = String(index);
    select.innerHTML = `<option value="">请选择原因</option>${LOW_MARGIN_REASONS.map((reason) => `<option value="${reason}">${reason}</option>`).join("")}`;
    select.value = order.reason || "";
    select.disabled = runtime.saveInFlight;
    if (order.reasonUpdatedAt || order.reasonEditor) {
      select.title = [order.reasonEditor ? `修改人：${order.reasonEditor}` : "", order.reasonUpdatedAt ? `修改时间：${new Date(order.reasonUpdatedAt).toLocaleString("zh-CN")}` : ""]
        .filter(Boolean)
        .join("\n");
    }
    select.addEventListener("change", handleLowMarginReasonChange);
    tr.lastElementChild.appendChild(select);
    el.lowMarginOrderBody.appendChild(tr);
  });
}

async function handleLowMarginReasonChange(event) {
  const index = Number(event.currentTarget.dataset.index);
  const order = state.sections.margin.orders[index];
  const previousReason = order.reason || "";
  const nextReason = event.currentTarget.value;
  order.reason = nextReason;
  refreshLowMarginSummary();
  render();
  if (runtime.onlineEnabled) {
    runtime.saveInFlight = true;
    updateOnlineSyncStatus("正在保存低毛利原因...", "saving");
    try {
      const response = await fetch(`${getOnlineApiBase()}/api/reasons`, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          period: state.period,
          purchaseOrderNo: order.purchaseOrderNo,
          reason: nextReason,
          editor: runtime.onlineConfig?.editorName || ""
        })
      });
      const payload = await response.json();
      if (!response.ok || !payload?.ok || !payload.report) {
        throw new Error(payload?.error || "保存失败");
      }
      runtime.lastSyncedAt = new Date().toISOString();
      replaceState(payload.report, { persistLocal: false });
      updateOnlineSyncStatus("低毛利原因已在线保存。", "online");
    } catch (error) {
      order.reason = previousReason;
      refreshLowMarginSummary();
      render();
      updateOnlineSyncStatus(`保存失败：${error.message || "请稍后重试。"}`, "error");
      alert(`在线保存失败：${error.message || "请稍后重试。"}`);
    } finally {
      runtime.saveInFlight = false;
      render();
    }
    return;
  }
  persistStateToLocalCache();
}

function renderRiskBoard() {
  el.riskBoard.innerHTML = "";
  state.sections.risk.items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = `risk-card status-${item.status}`;
    article.innerHTML = `
      <div class="risk-header">
        <div>
          <p class="eyebrow" contenteditable="true" data-path="sections.risk.items.${index}.category">${item.category}</p>
          <h4 class="risk-title" contenteditable="true" data-path="sections.risk.items.${index}.title">${item.title}</h4>
        </div>
        <span class="risk-badge status-${item.status}" contenteditable="true" data-path="sections.risk.items.${index}.status">${statusLabel(item.status)}</span>
      </div>
      <div class="risk-meta">
        <div class="risk-meta-item">
          <span>当前进展</span>
          <p contenteditable="true" data-path="sections.risk.items.${index}.progress">${item.progress}</p>
        </div>
        <div class="risk-meta-item">
          <span>风险点</span>
          <p contenteditable="true" data-path="sections.risk.items.${index}.risk">${item.risk}</p>
        </div>
        <div class="risk-meta-item">
          <span>需协调事项</span>
          <p contenteditable="true" data-path="sections.risk.items.${index}.support">${item.support}</p>
        </div>
        <div class="risk-meta-item">
          <span>下周动作</span>
          <p contenteditable="true" data-path="sections.risk.items.${index}.nextAction">${item.nextAction}</p>
        </div>
        <div class="risk-meta-item">
          <span>责任人</span>
          <strong contenteditable="true" data-path="sections.risk.items.${index}.owner">${item.owner}</strong>
        </div>
      </div>
    `;
    el.riskBoard.appendChild(article);
  });
}

function bindEditable() {
  document.querySelectorAll("[contenteditable='true']").forEach((node) => {
    node.removeEventListener("input", handleEditableInput);
    node.addEventListener("input", handleEditableInput);
  });
}

function handleEditableInput(event) {
  const { path } = event.currentTarget.dataset;
  if (!path) return;
  const value = event.currentTarget.textContent.trim();
  setByPath(state, path, path.endsWith(".status") ? labelToStatus(value) : value);
  if (!runtime.onlineEnabled) {
    persistStateToLocalCache();
  }
  if (path.endsWith(".status")) {
    renderRiskBoard();
    bindEditable();
  }
}

function setByPath(target, path, value) {
  const parts = path.split(".");
  let ref = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
    ref = ref[key];
  }
  const last = /^\d+$/.test(parts[parts.length - 1]) ? Number(parts[parts.length - 1]) : parts[parts.length - 1];
  ref[last] = value;
}

function exportCurrentData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  downloadBlob(blob, "weekly-report-data.json");
}

function downloadBlob(content, filename) {
  const blob = content instanceof Blob
    ? content
    : new Blob([content], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
    anchor.remove();
  }, 300);
}

function refreshLowMarginSummary() {
  const summary = summarizeLowMarginOrders(state.sections.margin.orders || []);
  state.sections.margin.miniMetrics = [
    { label: "低毛利订单数", value: summary.orderCount },
    { label: "低毛利成交金额", value: summary.amount },
    { label: "已填写原因", value: summary.filledCount },
    { label: "未填写原因", value: summary.unfilledCount }
  ];
  state.sections.margin.reasons = summary.reasonRows;
  state.metrics[4] = { section: "margin", label: "低毛利订单数", value: summary.orderCount, note: "执行订单中预估订单毛利率低于14%。" };
  state.metrics[5] = { section: "margin", label: "低毛利成交金额", value: summary.amount, note: "来自执行价(含税)汇总。" };
  state.metrics[6] = { section: "margin", label: "已填写原因", value: summary.filledCount, note: "人工填写后自动汇总。" };
}

async function exportLowMarginExcel() {
  const feedbackFileHref = state.sections?.margin?.feedbackFileHref;
  if (feedbackFileHref && !String(feedbackFileHref).startsWith("file:")) {
    window.open(feedbackFileHref, "_blank");
    return;
  }
  if (typeof ExcelJS === "undefined") {
    alert("Excel 导出库加载失败，请刷新页面后重试。");
    return;
  }
  const orders = state.sections.margin.orders || [];
  if (!orders.length) {
    alert("当前没有低毛利订单可导出。");
    return;
  }

  const highlightedHeaders = executeExportContext?.highlightedHeaders?.length
    ? executeExportContext.highlightedHeaders
    : ((state.sections?.margin?.exportHeaders || []).length
      ? state.sections.margin.exportHeaders
      : Object.keys(orders.find((order) => Object.keys(order.exportFields || {}).length)?.exportFields || {}));
  if (!highlightedHeaders.length) {
    alert("未找到可导出的执行订单表头，请先重新上传执行订单，或确认生成后的 JSON 含有导出字段。");
    return;
  }

  const previousText = el.exportLowMarginExcelBtn.textContent;
  el.exportLowMarginExcelBtn.disabled = true;
  el.exportLowMarginExcelBtn.textContent = "导出中...";

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("低毛利订单反馈表", {
      views: [{ state: "frozen", ySplit: 1 }]
    });
    const optionSheet = workbook.addWorksheet("原因选项");
    optionSheet.state = "hidden";

    LOW_MARGIN_REASONS.forEach((reason, index) => {
      optionSheet.getCell(index + 1, 1).value = reason;
    });

    const headers = [...highlightedHeaders, "原因"];
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(1, index + 1);
      cell.value = header;
      cell.style = cloneExcelJsStyle(executeExportContext?.headerStyles?.[header]) || cloneExcelJsStyle(DEFAULT_YELLOW_HEADER_STYLE);

      const width = executeExportContext?.columnWidths?.[header]
        || (header === "原因" ? 16 : Math.min(Math.max(header.length + 2, 10), 36));
      worksheet.getColumn(index + 1).width = width;
    });

    orders.forEach((order, orderIndex) => {
      const rowNumber = orderIndex + 2;
      highlightedHeaders.forEach((header, headerIndex) => {
        const cell = worksheet.getCell(rowNumber, headerIndex + 1);
        cell.value = order.exportFields?.[header] ?? "";
        cell.style = cloneExcelJsStyle(executeExportContext?.bodyStyles?.[header]) || cloneExcelJsStyle(DEFAULT_BODY_STYLE);
      });

      const reasonCell = worksheet.getCell(rowNumber, headers.length);
      reasonCell.value = order.reason || "";
      reasonCell.style = cloneExcelJsStyle(DEFAULT_BODY_STYLE);
      reasonCell.dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`'原因选项'!$A$1:$A$${LOW_MARGIN_REASONS.length}`]
      };
    });

    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: Math.max(1, orders.length + 1), column: headers.length }
    };

    const buffer = await workbook.xlsx.writeBuffer();
    downloadBlob(new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }), "低毛利订单反馈表.xlsx");
  } catch (error) {
    alert(`导出失败：${error.message || "请稍后重试。"}`);
  } finally {
    el.exportLowMarginExcelBtn.disabled = false;
    el.exportLowMarginExcelBtn.textContent = previousText;
  }
}

async function saveSnapshotToFeishu() {
  if (!runtime.onlineEnabled) {
    alert("当前未开启在线同步，无法保存周报快照到飞书。");
    return;
  }
  if (runtime.snapshotSaveInFlight) return;

  runtime.snapshotSaveInFlight = true;
  const previousText = el.saveSnapshotBtn.textContent;
  el.saveSnapshotBtn.disabled = true;
  el.saveSnapshotBtn.textContent = "保存中...";
  updateOnlineSyncStatus("正在保存周报 PDF 快照到飞书...", "saving");

  try {
    const response = await fetch(`${getOnlineApiBase()}/api/report-snapshot`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ report: state })
    });
    const payload = await response.json();
    if (!response.ok || !payload?.ok) {
      const diagnostics = payload?.diagnostics || {};
      const hints = [];
      if (diagnostics.storageMode) {
        hints.push(`storageMode=${diagnostics.storageMode}`);
      }
      if ("attachmentField" in diagnostics) {
        hints.push(`attachmentField=${diagnostics.attachmentField || "未配置"}`);
      }
      if (diagnostics.feishuCode) {
        hints.push(`feishuCode=${diagnostics.feishuCode}`);
      }
      if (diagnostics.feishuLogId) {
        hints.push(`feishuLogId=${diagnostics.feishuLogId}`);
      }
      const detail = payload?.error || "保存周报快照失败";
      throw new Error(hints.length ? `${hints.join(", ")}; ${detail}` : detail);
    }
    runtime.lastSyncedAt = payload.savedAt || new Date().toISOString();
    if (payload.storageMode === "bitable_attachment") {
      updateOnlineSyncStatus(
        `周报快照已保存到飞书多维表格：${payload.fileName}（附件字段: ${payload.attachmentField || "unknown"}）`,
        "online"
      );
      alert(
        `已保存到飞书多维表格：${payload.fileName}\n附件字段: ${payload.attachmentField || "unknown"}\n附件数: ${payload.attachmentCount || 1}\nfileToken: ${payload.fileToken || "unknown"}`
      );
    } else {
      updateOnlineSyncStatus(
        `周报快照已保存到飞书：${payload.fileName}（folderToken: ${payload.folderToken || "unknown"}）`,
        "online"
      );
      alert(
        `已保存到飞书：${payload.fileName}\nfolderToken: ${payload.folderToken || "unknown"}\nfileToken: ${payload.fileToken || "unknown"}`
      );
    }
  } catch (error) {
    updateOnlineSyncStatus(`保存周报快照失败：${error.message || "请稍后重试。"}`, "error");
    alert(`保存周报快照失败：${error.message || "请稍后重试。"}`);
  } finally {
    runtime.snapshotSaveInFlight = false;
    el.saveSnapshotBtn.disabled = false;
    el.saveSnapshotBtn.textContent = previousText;
    render();
  }
}

async function importLowMarginExcel(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  if (typeof XLSX === "undefined") {
    alert("Excel 导入库加载失败，请刷新页面后重试。");
    return;
  }

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const matrix = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });
    const headerRow = matrix.findIndex((row) => row.includes("采购订单编号") && row.includes("原因"));
    if (headerRow < 0) throw new Error("未找到反馈表表头。");

    const headers = matrix[headerRow].map((value) => String(value || "").trim());
    const orderIndex = headers.indexOf("采购订单编号");
    const reasonIndex = headers.indexOf("原因");
    const reasonByOrderNo = new Map();

    matrix.slice(headerRow + 1).forEach((row) => {
      const orderNo = String(row[orderIndex] || "").trim();
      const reason = String(row[reasonIndex] || "").trim();
      if (orderNo) reasonByOrderNo.set(orderNo, reason);
    });

    (state.sections.margin.orders || []).forEach((order) => {
      if (reasonByOrderNo.has(order.purchaseOrderNo)) {
        order.reason = reasonByOrderNo.get(order.purchaseOrderNo);
      }
    });

    refreshLowMarginSummary();
    persistStateToLocalCache();
    render();
  } catch (error) {
    alert(`导入低毛利反馈表失败：${error.message || "请检查 Excel 格式。"}`);
  } finally {
    el.importLowMarginExcelInput.value = "";
  }
}

function extractOwnerName(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const chunks = text.replace(/^\[|\]$/g, "").split(",");
  const names = chunks
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => chunk.split("/").pop().trim())
    .filter(Boolean);
  return [...new Set(names)].join("、");
}

function persistStateToLocalCache() {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(state));
  } catch (error) {
    // Ignore storage errors in restricted browser modes.
  }
}

function restoreFromLocalCache() {
  try {
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    if (!cached) return;
    const parsed = JSON.parse(cached);
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, parsed);
  } catch (error) {
    // Ignore invalid cache and continue with bundled data.
  }
}

function importDataFile(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      executeExportContext = null;
      replaceState(parsed, { persistLocal: !runtime.onlineEnabled });
    } catch (error) {
      alert("导入失败：JSON 格式不正确。");
    } finally {
      el.importInput.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function statusLabel(status) {
  if (status === "ontrack") return "推进正常";
  if (status === "watch") return "重点关注";
  return "存在风险";
}

function labelToStatus(label) {
  if (label.includes("推进") || label.includes("正常")) return "ontrack";
  if (label.includes("关注")) return "watch";
  return "risk";
}

init();
