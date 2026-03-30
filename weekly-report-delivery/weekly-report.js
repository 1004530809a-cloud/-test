const DEFAULT_SPECIAL_ITEMS = [
  {
    id: "electronic-contract",
    title: "电子合同",
    tableImportEnabled: true,
    summaryTitle: "行业二组电子合同签署情况汇总（截止2026年03月20日）",
    summaryMetrics: [
      { label: "总完成率", value: "97.01%" },
      { label: "总共触发合同", value: "1,872份" },
      { label: "待签署", value: "51份" },
      { label: "已完成签署", value: "1,816份" }
    ],
    noteLabel: "原因/跟进说明",
    note: "",
    importedTable: null,
    removable: false
  },
  {
    id: "auto-accrual",
    title: "自动计提",
    summaryTitle: "",
    summaryMetrics: [],
    noteLabel: "填写内容",
    note: "",
    removable: false
  },
  {
    id: "rebate-progress",
    title: "21-23年返点进度反馈",
    summaryTitle: "",
    summaryMetrics: [],
    noteLabel: "填写内容",
    note: "",
    removable: false
  }
];

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
    { section: "risk", label: "待协调事项", value: "5项", note: "支持周会记录整理与专项事项补充。" }
  ],
  summaries: [
    { title: "经营表现", copy: "本周经营数据按 SZA 与非SZA 两条主线展示，领导可以快速看到两部分规模、毛利和压价结果。" },
    { title: "专项推进", copy: "低毛利与压价专项保留覆盖率、成功率、提升毛利率和原因TOP分类，保证重点清楚但不过重。" },
    { title: "事项管理", copy: "风险事项支持粘贴周会记录自动整理，电子合同和其他专项事项也能在同页持续维护。" }
  ],
  highlights: [
    { title: "SZA/非SZA拆分", copy: "经营模块按广告主名称是否包含“华为”自动区分。", section: "core-section" },
    { title: "非SZA客户清单", copy: "非SZA客户表会展示全部客户，并按预估毛利率从低到高自动排序。", section: "core-section" },
    { title: "原表展示", copy: "每个板块下方可挂接上传原表预览，便于对照。", section: "margin-section" }
  ],
  sections: {
    core: {
      quickLabel: "SZA / 非SZA 双分区",
      sourceLinks: [],
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
          ["屈臣氏", "471,211.01", "47,758.75", "10.74%"],
          ["安利集团", "898,727.55", "103,672.21", "12.23%"],
          ["华润雪花", "732,220.90", "97,264.48", "14.08%"],
          ["华熙生物-2024", "906,416.88", "121,596.29", "14.22%"],
          ["美的COLMO", "1,639,820.73", "222,637.10", "14.39%"]
        ],
        narratives: [
          { title: "非SZA经营结论", copy: "非SZA上方核心指标统计全部非华为订单，表格展示全部客户并按预估毛利率由低到高排序，便于优先关注低毛利客户。" }
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
      sourceLinks: [],
      meetingNotes: "",
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
      ],
      specialItems: JSON.parse(JSON.stringify(DEFAULT_SPECIAL_ITEMS))
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
const SPECIAL_TABLE_PREVIEW_LIMIT = 50;
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
  snapshotConfigCheckInFlight: false,
  snapshotConfigSummary: "",
  snapshotConfigCheckedAt: "",
  stateSyncInFlight: false,
  stateSyncTimer: null,
  stateSyncQueued: false,
  pendingStatePayload: null,
  lastSyncedAt: "",
  hasPendingChanges: false,
  pollTimer: null
};

const el = {
  titleInput: document.getElementById("titleInput"),
  periodInput: document.getElementById("periodInput"),
  audienceInput: document.getElementById("audienceInput"),
  confirmExcelInput: document.getElementById("confirmExcelInput"),
  executeExcelInput: document.getElementById("executeExcelInput"),
  generateFromExcelBtn: document.getElementById("generateFromExcelBtn"),
  printBtn: document.getElementById("printBtn"),
  exportLowMarginExcelBtn: document.getElementById("exportLowMarginExcelBtn"),
  excelUploadHint: document.getElementById("excelUploadHint"),
  onlineSyncBadge: document.getElementById("onlineSyncBadge"),
  onlineSyncText: document.getElementById("onlineSyncText"),
  onlineSyncMeta: document.getElementById("onlineSyncMeta"),
  snapshotConfigMeta: document.getElementById("snapshotConfigMeta"),
  syncOnlineBtn: document.getElementById("syncOnlineBtn"),
  saveSnapshotBtn: document.getElementById("saveSnapshotBtn"),
  checkSnapshotConfigBtn: document.getElementById("checkSnapshotConfigBtn"),
  refreshOnlineBtn: document.getElementById("refreshOnlineBtn"),
  clearCacheBtn: document.getElementById("clearCacheBtn"),
  importLowMarginExcelInput: document.getElementById("importLowMarginExcelInput"),
  meetingNotesInput: document.getElementById("meetingNotesInput"),
  formatMeetingBtn: document.getElementById("formatMeetingBtn"),
  addSpecialMatterBtn: document.getElementById("addSpecialMatterBtn"),
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
  riskBoard: document.getElementById("riskBoard"),
  specialMatterBoard: document.getElementById("specialMatterBoard")
};

async function init() {
  await loadOnlineConfig();
  const restoredCacheMeta = restoreFromLocalCache();
  syncInputsFromState();
  bindControls();
  render();
  if (runtime.onlineEnabled) {
    if (restoredCacheMeta?.hasPendingChanges) {
      runtime.hasPendingChanges = true;
    } else {
      if (restoredCacheMeta?.restored) {
        clearPersistedStateCache();
      }
      await loadOnlineState();
    }
  } else if (!restoredCacheMeta?.restored) {
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
    scheduleOnlineReportSync();
  });
  el.periodInput.addEventListener("input", () => {
    state.period = el.periodInput.value.trim();
    renderHero();
    scheduleOnlineReportSync();
  });
  el.audienceInput.addEventListener("input", () => {
    state.audience = el.audienceInput.value.trim();
    renderHero();
    scheduleOnlineReportSync();
  });
  el.generateFromExcelBtn.addEventListener("click", handleExcelGeneration);
  el.printBtn.addEventListener("click", () => window.print());
  el.exportLowMarginExcelBtn.addEventListener("click", exportLowMarginExcel);
  el.importLowMarginExcelInput.addEventListener("change", importLowMarginExcel);
  el.syncOnlineBtn.addEventListener("click", () => {
    void syncOnlineReportState();
  });
  el.saveSnapshotBtn.addEventListener("click", saveSnapshotToFeishu);
  el.checkSnapshotConfigBtn.addEventListener("click", checkSnapshotConfig);
  el.meetingNotesInput.addEventListener("input", handleMeetingNotesInput);
  el.formatMeetingBtn.addEventListener("click", handleFormatMeetingNotes);
  el.addSpecialMatterBtn.addEventListener("click", handleAddSpecialMatter);
  el.refreshOnlineBtn.addEventListener("click", async () => {
    if (!runtime.onlineEnabled) {
      alert("当前未开启在线同步配置。");
      return;
    }
    if (runtime.hasPendingChanges && !window.confirm("当前有未同步改动，刷新在线数据会覆盖本地内容。是否继续？")) {
      return;
    }
    await loadOnlineState(true);
  });
  el.clearCacheBtn.addEventListener("click", () => {
    try {
      clearPersistedStateCache();
      const message = runtime.hasPendingChanges
        ? "已清理本地缓存，当前页面改动仍未同步。"
        : "已清理本地缓存。";
      updateOnlineSyncStatus(message, runtime.onlineEnabled ? (runtime.hasPendingChanges ? "pending" : "online") : "offline");
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
    replaceState(payload.report, { persistLocal: false, clearPending: true });
    updateOnlineSyncStatus(showToast ? "已刷新在线数据。" : "在线数据已连接。", "online");
  } catch (error) {
    updateOnlineSyncStatus(`在线同步异常：${error.message || "请检查服务是否启动。"}`, "error");
  }
}

function scheduleOnlineReportSync(options = {}) {
  void options;
  markPendingChanges();
}

async function syncOnlineReportState() {
  if (!runtime.onlineEnabled) return;
  if (runtime.saveInFlight || runtime.snapshotSaveInFlight || runtime.stateSyncInFlight) {
    return;
  }
  if (!runtime.hasPendingChanges) {
    updateOnlineSyncStatus("当前没有需要同步的改动。", "online");
    return;
  }

  runtime.stateSyncInFlight = true;
  updateOnlineSyncStatus("正在同步在线周报...", "saving");
  try {
    const reportPayload = JSON.parse(JSON.stringify(state));
    await syncOnlineReasonsBeforeReportSave(reportPayload);
    (reportPayload?.sections?.margin?.orders || []).forEach((order) => {
      if (order && "reasonDirty" in order) {
        delete order.reasonDirty;
      }
    });
    const response = await fetch(`${getOnlineApiBase()}/api/report-state`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        report: reportPayload,
        editor: runtime.onlineConfig?.editorName || ""
      })
    });
    const payload = await response.json();
    if (!response.ok || !payload?.ok || !payload.report) {
      throw new Error(payload?.error || "在线周报同步失败");
    }
    runtime.lastSyncedAt = payload.savedAt || new Date().toISOString();
    replaceState(payload.report, { persistLocal: false, clearPending: true });
    updateOnlineSyncStatus("在线周报已同步。", "online");
  } catch (error) {
    updateOnlineSyncStatus(`在线同步异常：${error.message || "请检查服务是否启动。"}`, "error");
  } finally {
    runtime.stateSyncInFlight = false;
  }
}

function markPendingChanges() {
  runtime.hasPendingChanges = true;
  persistStateToLocalCache({ hasPendingChanges: true });
  if (!runtime.onlineEnabled) return;
  runtime.pendingStatePayload = JSON.parse(JSON.stringify(state));
  updateOnlineSyncStatus();
}

async function syncOnlineReasonsBeforeReportSave(reportPayload) {
  const items = (reportPayload?.sections?.margin?.orders || [])
    .filter((order) => order?.reasonDirty && String(order?.purchaseOrderNo || "").trim())
    .map((order) => ({
      purchaseOrderNo: String(order.purchaseOrderNo || "").trim(),
      reason: String(order.reason || "").trim()
    }));
  if (!items.length) return;

  const response = await fetch(`${getOnlineApiBase()}/api/reasons/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      period: reportPayload.period,
      items,
      editor: runtime.onlineConfig?.editorName || ""
    })
  });
  const payload = await response.json();
  if (!response.ok || !payload?.ok) {
    throw new Error(payload?.error || "低毛利原因同步失败");
  }

  (reportPayload?.sections?.margin?.orders || []).forEach((order) => {
    if (order && order.reasonDirty) {
      delete order.reasonDirty;
    }
  });
}

function startOnlinePolling() {
  if (runtime.pollTimer) {
    window.clearInterval(runtime.pollTimer);
    runtime.pollTimer = null;
  }
}

function updateOnlineSyncStatus(message = "", mode = "") {
  const statusMode = mode || (
    runtime.onlineEnabled
      ? ((runtime.saveInFlight || runtime.snapshotSaveInFlight || runtime.snapshotConfigCheckInFlight || runtime.stateSyncInFlight)
        ? "saving"
        : (runtime.hasPendingChanges ? "pending" : "online"))
      : "offline"
  );
  const badgeTextMap = {
    online: "在线同步中",
    pending: "待同步",
    saving: "保存中",
    offline: "本地模式",
    error: "同步异常"
  };
  el.onlineSyncBadge.textContent = badgeTextMap[statusMode] || badgeTextMap.offline;
  el.onlineSyncBadge.className = `status-badge status-${statusMode}`;
  el.syncOnlineBtn.disabled = !runtime.onlineEnabled || runtime.stateSyncInFlight || runtime.snapshotSaveInFlight || runtime.snapshotConfigCheckInFlight;
  el.syncOnlineBtn.textContent = runtime.stateSyncInFlight ? "同步中..." : "同步到线上";
  el.saveSnapshotBtn.disabled = !runtime.onlineEnabled || runtime.stateSyncInFlight || runtime.snapshotSaveInFlight || runtime.snapshotConfigCheckInFlight;
  if (!runtime.snapshotSaveInFlight) {
    el.saveSnapshotBtn.textContent = runtime.onlineConfig?.snapshotButtonText || "保存周报快照到飞书";
  }
  el.checkSnapshotConfigBtn.disabled = !runtime.onlineEnabled || runtime.stateSyncInFlight || runtime.snapshotSaveInFlight || runtime.snapshotConfigCheckInFlight;
  el.checkSnapshotConfigBtn.textContent = runtime.snapshotConfigCheckInFlight ? "检查中..." : "检查飞书快照配置";

  if (message) {
    el.onlineSyncText.textContent = message;
  } else if (runtime.onlineEnabled && runtime.hasPendingChanges) {
    el.onlineSyncText.textContent = "当前改动仅保存在本地，点击“同步到线上”后才会提交。";
  } else if (runtime.onlineEnabled) {
    el.onlineSyncText.textContent = "当前采用手动同步：页面改动先保存在本地，点“同步到线上”后才会提交。";
  } else {
    el.onlineSyncText.textContent = "当前仍按本地 JSON / 本地缓存运行，整份周报数据不会多人实时同步。";
  }

  if (runtime.onlineEnabled) {
    const syncLabel = runtime.lastSyncedAt ? `最近同步：${new Date(runtime.lastSyncedAt).toLocaleString("zh-CN")}` : "最近同步：尚未完成";
    const pendingLabel = runtime.hasPendingChanges ? "；本地有未同步改动" : "";
    el.onlineSyncMeta.textContent = `模式：${runtime.onlineMode}${runtime.onlineConfig?.editorName ? `；默认填写人：${runtime.onlineConfig.editorName}` : ""}${pendingLabel}；${syncLabel}`;
    if (runtime.snapshotConfigSummary) {
      const checkedLabel = runtime.snapshotConfigCheckedAt ? `；最近检查：${new Date(runtime.snapshotConfigCheckedAt).toLocaleString("zh-CN")}` : "";
      el.snapshotConfigMeta.textContent = `飞书快照：${runtime.snapshotConfigSummary}${checkedLabel}`;
    } else {
      el.snapshotConfigMeta.textContent = "飞书快照：正式上线前建议先点“检查飞书快照配置”，确认 PDF快照 字段与保存模式无误。";
    }
  } else {
    el.onlineSyncMeta.textContent = "如需多人在线协作，请提供 weekly-report-online-config.json 并通过在线服务打开页面。";
    el.snapshotConfigMeta.textContent = "";
  }
}

function buildSnapshotConfigSummary(payload) {
  if (!payload?.configured) {
    return "未配置 FEISHU_SYNC_CONFIG_JSON";
  }
  if (payload.attachmentField) {
    const fieldType = payload.attachmentFieldTypeLabel ? `，字段类型：${payload.attachmentFieldTypeLabel}` : "";
    return `字段“${payload.attachmentField}”可用${fieldType}`;
  }
  return payload.storageMode === "drive"
    ? "未配置 PDF 附件字段，将上传到飞书云空间"
    : "快照配置检查通过";
}

function formatSnapshotConfigAlertLines(payload) {
  const lines = [payload?.message || "飞书快照配置检查完成。"];
  if (payload?.configSource) {
    lines.push(`配置来源: ${payload.configSource}`);
  }
  if (payload?.storageMode) {
    lines.push(`保存模式: ${payload.storageMode}`);
  }
  if (payload?.attachmentField) {
    lines.push(`PDF快照字段: ${payload.attachmentField}`);
  }
  if (payload?.attachmentFieldTypeLabel) {
    lines.push(`字段类型: ${payload.attachmentFieldTypeLabel}`);
  }
  return lines;
}

async function checkSnapshotConfig() {
  if (!runtime.onlineEnabled) {
    alert("当前未开启在线同步配置。");
    return;
  }
  if (runtime.snapshotConfigCheckInFlight) return;

  runtime.snapshotConfigCheckInFlight = true;
  updateOnlineSyncStatus("正在检查飞书快照配置...", "saving");
  let finalMessage = "";
  let finalMode = runtime.hasPendingChanges ? "pending" : "online";
  try {
    const response = await fetch(`${getOnlineApiBase()}/api/feishu-config-check`, { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok || payload?.ok === false) {
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
      if (diagnostics.feishuMsg) {
        hints.push(`feishuMsg=${diagnostics.feishuMsg}`);
      }
      const detail = payload?.error || "飞书快照配置检查失败";
      const guidance = payload?.hint ? `；${payload.hint}` : "";
      throw new Error(hints.length ? `${hints.join(", ")}; ${detail}${guidance}` : `${detail}${guidance}`);
    }

    runtime.snapshotConfigCheckedAt = payload?.checkedAt || new Date().toISOString();
    runtime.snapshotConfigSummary = buildSnapshotConfigSummary(payload);
    alert(formatSnapshotConfigAlertLines(payload).join("\n"));
  } catch (error) {
    runtime.snapshotConfigCheckedAt = new Date().toISOString();
    runtime.snapshotConfigSummary = `检查失败：${error.message || "请稍后重试。"}`;
    finalMessage = `飞书快照配置检查失败：${error.message || "请稍后重试。"}`;
    finalMode = "error";
    alert(`飞书快照配置检查失败：${error.message || "请稍后重试。"}`);
  } finally {
    runtime.snapshotConfigCheckInFlight = false;
    updateOnlineSyncStatus(finalMessage, finalMode);
  }
}

async function loadDefaultGeneratedData() {
  try {
    const response = await fetch(DEFAULT_DATA_URL, { cache: "no-store" });
    if (!response.ok) return;
    const parsed = await response.json();
    replaceState(parsed, { persistLocal: !runtime.onlineEnabled, clearPending: !runtime.onlineEnabled });
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
    replaceState(next, { persistLocal: true });
    scheduleOnlineReportSync();
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
  const nonSzaCustomers = calcNonSzaCustomerRows(executeRows);
  const lowMarginOrders = buildLowMarginOrders(executeRows);
  const lowMarginSummary = summarizeLowMarginOrders(lowMarginOrders);
  const riskDraft = state.sections?.risk || sampleData.sections.risk;
  const riskItemCount = countRiskEntries(riskDraft);

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
      { section: "risk", label: "待协调事项", value: `${riskItemCount}项`, note: "支持周会记录整理与专项事项补充。" }
    ],
    summaries: [
      { title: "经营表现", copy: "成交金额与预估毛利率已切换为执行订单口径，首页继续按 SZA / 非SZA 双行展示。" },
      { title: "专项推进", copy: "第二大项已改成低毛利专项，低毛利订单来自执行订单中预估订单毛利率低于14%的数据。" },
      { title: "事项管理", copy: "风险与待协调事项支持粘贴周会记录自动整理，电子合同、自动计提和返点进度可持续同步维护。" }
    ],
    highlights: [
      { title: "执行订单口径", copy: `成交金额、预估毛利率与提升毛利率来自：${executeName}`, section: "core-section" },
      { title: "汽车类目已过滤", copy: `计算前已删除 ${SPU_CATEGORY_HEADER} 含“${EXCLUDED_SPU_KEYWORD}”的所有行。`, section: "margin-section" },
      { title: "非SZA客户清单", copy: "非SZA客户表展示全部客户，并按预估毛利率从低到高自动排序。", section: "core-section" }
    ],
    sections: {
      core: {
        quickLabel: "SZA / 非SZA 双分区",
        sourceLinks: [],
        sza: {
          miniMetrics: metricsObjectToList(szaCore, ["订单数量", "成交金额", "预估毛利额", "预估毛利率", "压价覆盖率", "压价成功率", "压价提升毛利率"]),
          spuBreakdown,
          narratives: [
            { title: "SZA经营结论", copy: "SZA 继续按广告主名称含“华为”识别，并额外按 SPU类目 输出压价结果。" }
          ]
        },
        nonSza: {
          miniMetrics: metricsObjectToList(nonSzaCore, ["订单数量", "成交金额", "预估毛利额", "预估毛利率", "压价覆盖率", "压价成功率", "压价提升毛利率"]),
          customers: nonSzaCustomers,
          narratives: [
            { title: "非SZA经营结论", copy: "非SZA 上方核心指标汇总全部非华为订单，客户清单按预估毛利率从低到高排序，方便优先查看低毛利客户。" }
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
        sourceLinks: [],
        meetingNotes: riskDraft.meetingNotes || "",
        items: riskDraft.items || sampleData.sections.risk.items,
        specialItems: riskDraft.specialItems || JSON.parse(JSON.stringify(DEFAULT_SPECIAL_ITEMS))
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

function calcNonSzaCustomerRows(rows) {
  const grouped = {};
  rows.filter((row) => !row.isSza).forEach((row) => {
    const advertiser = row.advertiser || "未填写客户";
    const bucket = grouped[advertiser] || {
      advertiser,
      execPriceTax: 0,
      grossProfit: 0,
      actualIncomeNoTax: 0
    };
    bucket.execPriceTax += row.execPriceTax;
    bucket.grossProfit += row.grossProfit;
    bucket.actualIncomeNoTax += row.actualIncomeNoTax;
    grouped[advertiser] = bucket;
  });

  return Object.values(grouped)
    .sort((a, b) => {
      const marginDiff = safeRatio(a.grossProfit, a.actualIncomeNoTax) - safeRatio(b.grossProfit, b.actualIncomeNoTax);
      if (marginDiff !== 0) return marginDiff;
      return b.execPriceTax - a.execPriceTax;
    })
    .map((item) => [
      item.advertiser,
      formatMoney(item.execPriceTax),
      formatMoney(item.grossProfit),
      formatPercent(item.grossProfit, item.actualIncomeNoTax)
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

function safeRatio(numerator, denominator) {
  if (!denominator) return 0;
  return Number(numerator || 0) / Number(denominator || 0);
}

function normalizeRiskItem(item = {}) {
  const status = ["ontrack", "watch", "risk"].includes(item.status) ? item.status : "watch";
  return {
    title: String(item.title || "待补充事项").trim(),
    category: String(item.category || "周会总结").trim(),
    progress: String(item.progress || "待补充当前进展。").trim(),
    risk: String(item.risk || "待补充风险点。").trim(),
    support: String(item.support || "待补充需协调事项。").trim(),
    nextAction: String(item.nextAction || "待补充下周动作。").trim(),
    owner: String(item.owner || "行业二组").trim(),
    status
  };
}

function normalizeSummaryMetrics(metrics) {
  return (Array.isArray(metrics) ? metrics : [])
    .map((metric) => ({
      label: String(metric?.label || "").trim(),
      value: String(metric?.value || "").trim()
    }))
    .filter((metric) => metric.label || metric.value);
}

function isRateLikeHeader(header) {
  return String(header || "").includes("率");
}

function formatImportedTableCell(header, value) {
  const rawText = String(value || "").trim();
  if (!rawText || !isRateLikeHeader(header)) return rawText;

  const numericText = rawText.replace(/,/g, "").replace(/%/g, "").trim();
  const parsed = Number(numericText);
  if (!Number.isFinite(parsed)) return rawText;

  const percentValue = rawText.includes("%")
    ? parsed
    : (Math.abs(parsed) <= 1 ? parsed * 100 : parsed);

  return `${percentValue.toFixed(2)}%`;
}

function normalizeImportedTable(table) {
  if (!table || typeof table !== "object") return null;
  const headers = (Array.isArray(table.headers) ? table.headers : [])
    .map((header, index) => String(header || `列${index + 1}`).trim() || `列${index + 1}`)
    .filter(Boolean);
  const rows = (Array.isArray(table.rows) ? table.rows : [])
    .map((row) => (Array.isArray(row) ? row : [])
      .slice(0, headers.length || undefined)
      .map((cell, index) => formatImportedTableCell(headers[index], cell)))
    .filter((row) => row.some(Boolean));
  if (!headers.length && !rows.length) return null;
  return {
    fileName: String(table.fileName || "").trim(),
    importedAt: String(table.importedAt || "").trim(),
    totalRows: Math.max(Number(table.totalRows) || rows.length, rows.length),
    truncated: Boolean(table.truncated),
    headers,
    rows
  };
}

function buildImportedTablePreview(fileName, matrix) {
  const cleanedRows = (Array.isArray(matrix) ? matrix : [])
    .map((row) => (Array.isArray(row) ? row : []).map((cell) => String(cell || "").trim()))
    .filter((row) => row.some(Boolean));
  if (!cleanedRows.length) {
    throw new Error("表格内容为空。");
  }

  const headerScanRows = cleanedRows.slice(0, Math.min(cleanedRows.length, 5));
  let headerRowIndex = 0;
  let headerCellCount = 0;
  headerScanRows.forEach((row, index) => {
    const count = row.filter(Boolean).length;
    if (count > headerCellCount) {
      headerCellCount = count;
      headerRowIndex = index;
    }
  });

  const rawHeaders = cleanedRows[headerRowIndex] || [];
  const headers = rawHeaders.map((header, index) => String(header || `列${index + 1}`).trim() || `列${index + 1}`);
  const bodyRows = cleanedRows
    .slice(headerRowIndex + 1)
    .filter((row) => row.some(Boolean))
    .map((row) => headers.map((header, index) => formatImportedTableCell(header, row[index])));

  // 只保留预览所需行数，避免把超大明细整体塞进本地缓存和在线状态。
  const previewRows = bodyRows.slice(0, SPECIAL_TABLE_PREVIEW_LIMIT);

  return {
    fileName: String(fileName || "").trim(),
    importedAt: new Date().toISOString(),
    totalRows: bodyRows.length,
    truncated: bodyRows.length > previewRows.length,
    headers,
    rows: previewRows
  };
}

function cloneDefaultSpecialItems() {
  return JSON.parse(JSON.stringify(DEFAULT_SPECIAL_ITEMS));
}

function normalizeSpecialItems(items = []) {
  const existingById = new Map((Array.isArray(items) ? items : [])
    .filter((item) => item && item.id)
    .map((item) => [String(item.id), item]));
  const normalizedDefaults = cloneDefaultSpecialItems().map((template) => {
    const existing = existingById.get(template.id) || {};
    return {
      id: template.id,
      title: String(existing.title || template.title).trim(),
      tableImportEnabled: Boolean(existing.tableImportEnabled ?? template.tableImportEnabled),
      summaryTitle: String(existing.summaryTitle || template.summaryTitle || "").trim(),
      summaryMetrics: normalizeSummaryMetrics(existing.summaryMetrics?.length ? existing.summaryMetrics : template.summaryMetrics),
      noteLabel: String(existing.noteLabel || template.noteLabel || "填写内容").trim(),
      note: String(existing.note || ""),
      importedTable: normalizeImportedTable(existing.importedTable || template.importedTable),
      removable: false
    };
  });
  const customItems = (Array.isArray(items) ? items : [])
    .filter((item) => item && item.id && !DEFAULT_SPECIAL_ITEMS.some((template) => template.id === item.id))
    .map((item, index) => ({
      id: String(item.id || `custom-${index}`),
      title: String(item.title || "新增事项").trim(),
      tableImportEnabled: Boolean(item.tableImportEnabled),
      summaryTitle: String(item.summaryTitle || "").trim(),
      summaryMetrics: normalizeSummaryMetrics(item.summaryMetrics),
      noteLabel: String(item.noteLabel || "填写内容").trim(),
      note: String(item.note || ""),
      importedTable: normalizeImportedTable(item.importedTable),
      removable: true
    }));
  return [...normalizedDefaults, ...customItems];
}

function countRiskEntries(riskSection = {}) {
  return (Array.isArray(riskSection.items) ? riskSection.items.length : 0) + (Array.isArray(riskSection.specialItems) ? riskSection.specialItems.length : 0);
}

function syncRiskMetric(target = state) {
  if (!Array.isArray(target.metrics) || target.metrics.length < 8) return;
  const riskSection = target.sections?.risk || {};
  target.metrics[7] = {
    section: "risk",
    label: "待协调事项",
    value: `${countRiskEntries(riskSection)}项`,
    note: "支持周会记录整理与专项事项补充。"
  };
}

function replaceState(next, options = {}) {
  const { persistLocal = true, clearPending = false } = options;
  const normalized = normalizeLoadedReportData(next);
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, normalized);
  if (clearPending) {
    runtime.hasPendingChanges = false;
    runtime.pendingStatePayload = null;
    clearPersistedStateCache();
  }
  if (persistLocal) {
    persistStateToLocalCache();
  }
  syncInputsFromState();
  render();
}

function normalizeLoadedReportData(data) {
  const next = JSON.parse(JSON.stringify(data || sampleData));
  next.sections = next.sections || {};
  next.sections.core = next.sections.core || JSON.parse(JSON.stringify(sampleData.sections.core));
  next.sections.core.sourceLinks = [];
  next.sections.core.nonSza = next.sections.core.nonSza || JSON.parse(JSON.stringify(sampleData.sections.core.nonSza));
  next.sections.core.nonSza.customers = (next.sections.core.nonSza.customers || [])
    .map((row) => row.slice(0, 4).map((value) => String(value || "").trim()))
    .filter((row) => row.some(Boolean))
    .sort((a, b) => {
      const marginDiff = toPercentNumber(a[3]) - toPercentNumber(b[3]);
      if (marginDiff !== 0) return marginDiff;
      return toNumber(b[1]) - toNumber(a[1]);
    });
  next.sections.risk = next.sections.risk || JSON.parse(JSON.stringify(sampleData.sections.risk));
  next.sections.risk.sourceLinks = [];
  next.sections.risk.meetingNotes = String(next.sections.risk.meetingNotes || "");
  next.sections.risk.items = (Array.isArray(next.sections.risk.items) && next.sections.risk.items.length
    ? next.sections.risk.items
    : sampleData.sections.risk.items
  ).map((item) => normalizeRiskItem(item));
  next.sections.risk.specialItems = normalizeSpecialItems(next.sections.risk.specialItems);
  const margin = next.sections?.margin;
  if (!margin) {
    syncRiskMetric(next);
    return next;
  }

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
      reasonDirty: Boolean(order.reasonDirty),
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
  syncRiskMetric(next);

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
  bindDynamicInputs();
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
  const nextReason = event.currentTarget.value;
  if (!order || String(order.reason || "") === nextReason) return;
  order.reason = nextReason;
  order.reasonDirty = true;
  refreshLowMarginSummary();
  render();
  markPendingChanges();
}

function renderRiskBoard() {
  el.riskBoard.innerHTML = "";
  el.specialMatterBoard.innerHTML = "";
  if (el.meetingNotesInput.value !== state.sections.risk.meetingNotes) {
    el.meetingNotesInput.value = state.sections.risk.meetingNotes || "";
  }
  autoResizeTextarea(el.meetingNotesInput, 168);

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

  state.sections.risk.specialItems.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "matter-card";

    const head = document.createElement("div");
    head.className = "matter-head";

    const titleWrap = document.createElement("div");
    const kicker = document.createElement("p");
    kicker.className = "panel-kicker";
    kicker.textContent = item.summaryMetrics.length ? "专项事项" : (item.removable ? "自定义事项" : "事项");
    const title = document.createElement("h4");
    title.className = "matter-title";
    title.contentEditable = "true";
    title.dataset.path = `sections.risk.specialItems.${index}.title`;
    title.textContent = item.title;
    titleWrap.appendChild(kicker);
    titleWrap.appendChild(title);
    head.appendChild(titleWrap);

    if (item.removable) {
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "ghost-btn section-action-btn matter-remove-btn";
      removeBtn.textContent = "删除事项";
      removeBtn.dataset.removeSpecialItem = String(index);
      head.appendChild(removeBtn);
    }
    article.appendChild(head);

    if (item.tableImportEnabled) {
      const importActions = document.createElement("div");
      importActions.className = "matter-import-actions";

      const uploadLabel = document.createElement("label");
      uploadLabel.className = "upload-btn section-action-btn matter-upload-btn";
      uploadLabel.innerHTML = `
        <span>导入表格</span>
        <input
          type="file"
          accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          data-import-special-item="${index}"
        />
      `;
      importActions.appendChild(uploadLabel);

      if (item.importedTable?.rows?.length) {
        const clearBtn = document.createElement("button");
        clearBtn.type = "button";
        clearBtn.className = "ghost-btn section-action-btn";
        clearBtn.textContent = "清空表格";
        clearBtn.dataset.clearSpecialTable = String(index);
        importActions.appendChild(clearBtn);
      }

      article.appendChild(importActions);

      const importMeta = document.createElement("p");
      importMeta.className = "matter-import-meta";
      if (item.importedTable?.rows?.length) {
        const importedAt = item.importedTable.importedAt
          ? new Date(item.importedTable.importedAt).toLocaleString("zh-CN")
          : "";
        const previewCount = item.importedTable.rows.length;
        const totalCount = item.importedTable.totalRows || previewCount;
        importMeta.textContent = [
          item.importedTable.fileName ? `已导入：${item.importedTable.fileName}` : "",
          importedAt ? `导入时间：${importedAt}` : "",
          `预览 ${previewCount}/${totalCount} 行${item.importedTable.truncated ? "（已截断）" : ""}`
        ].filter(Boolean).join("；");
      } else {
        importMeta.textContent = "支持导入 Excel / CSV，导入后会在卡片下方保留表格预览，并随本地缓存和线上同步一起保存。";
      }
      article.appendChild(importMeta);
    }

    if (item.summaryTitle) {
      const summaryTitle = document.createElement("p");
      summaryTitle.className = "matter-summary-title";
      summaryTitle.textContent = item.summaryTitle;
      article.appendChild(summaryTitle);
    }

    if (item.summaryMetrics.length) {
      const metrics = document.createElement("div");
      metrics.className = "matter-metrics";
      item.summaryMetrics.forEach((metric) => {
        const metricCard = document.createElement("div");
        metricCard.className = "matter-metric";
        metricCard.innerHTML = `
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
        `;
        metrics.appendChild(metricCard);
      });
      article.appendChild(metrics);
    }

    const noteField = document.createElement("label");
    noteField.className = "matter-note-field";

    const noteLabel = document.createElement("span");
    noteLabel.textContent = item.noteLabel || "填写内容";
    noteField.appendChild(noteLabel);

    const textarea = document.createElement("textarea");
    textarea.className = "matter-note-input";
    textarea.dataset.inputPath = `sections.risk.specialItems.${index}.note`;
    textarea.placeholder = `${item.noteLabel || "填写内容"}...`;
    textarea.value = item.note || "";
    noteField.appendChild(textarea);
    article.appendChild(noteField);

    if (item.importedTable?.headers?.length && item.importedTable?.rows?.length) {
      const previewWrap = document.createElement("div");
      previewWrap.className = "matter-table-preview";

      const tableWrap = document.createElement("div");
      tableWrap.className = "table-wrap matter-table-wrap";
      const table = document.createElement("table");
      table.className = "report-table";

      const thead = document.createElement("thead");
      const headRow = document.createElement("tr");
      item.importedTable.headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      item.importedTable.rows.forEach((row) => {
        const tr = document.createElement("tr");
        row.forEach((cell) => {
          const td = document.createElement("td");
          td.textContent = cell;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      tableWrap.appendChild(table);
      previewWrap.appendChild(tableWrap);

      el.specialMatterBoard.appendChild(article);
      article.appendChild(previewWrap);
      return;
    }

    el.specialMatterBoard.appendChild(article);
  });
}

function bindDynamicInputs() {
  document.querySelectorAll("textarea[data-input-path]").forEach((node) => {
    node.removeEventListener("input", handleDynamicInput);
    node.addEventListener("input", handleDynamicInput);
    autoResizeTextarea(node);
  });
  document.querySelectorAll("[data-remove-special-item]").forEach((node) => {
    node.removeEventListener("click", handleRemoveSpecialMatter);
    node.addEventListener("click", handleRemoveSpecialMatter);
  });
  document.querySelectorAll("[data-import-special-item]").forEach((node) => {
    node.removeEventListener("change", handleSpecialTableImport);
    node.addEventListener("change", handleSpecialTableImport);
  });
  document.querySelectorAll("[data-clear-special-table]").forEach((node) => {
    node.removeEventListener("click", handleClearSpecialTable);
    node.addEventListener("click", handleClearSpecialTable);
  });
}

function handleMeetingNotesInput(event) {
  state.sections.risk.meetingNotes = event.currentTarget.value || "";
  autoResizeTextarea(event.currentTarget, 168);
  scheduleOnlineReportSync();
}

function handleDynamicInput(event) {
  const { inputPath } = event.currentTarget.dataset;
  if (!inputPath) return;
  setByPath(state, inputPath, event.currentTarget.value || "");
  autoResizeTextarea(event.currentTarget);
  scheduleOnlineReportSync();
}

function handleFormatMeetingNotes() {
  const text = String(state.sections.risk.meetingNotes || "").trim();
  if (!text) {
    alert("请先粘贴周会记录，再点击整理。");
    return;
  }
  const parsedItems = parseMeetingNotesToRiskItems(text);
  state.sections.risk.items = parsedItems.length ? parsedItems : [createFallbackRiskItem(text, 0)];
  syncRiskMetric();
  render();
  scheduleOnlineReportSync({ immediate: true });
}

function handleAddSpecialMatter() {
  state.sections.risk.specialItems.push(createCustomSpecialMatter());
  syncRiskMetric();
  render();
  scheduleOnlineReportSync({ immediate: true });
}

function handleRemoveSpecialMatter(event) {
  const index = Number(event.currentTarget.dataset.removeSpecialItem);
  if (!Number.isFinite(index)) return;
  state.sections.risk.specialItems.splice(index, 1);
  syncRiskMetric();
  render();
  scheduleOnlineReportSync({ immediate: true });
}

function autoResizeTextarea(node, minHeight = 132) {
  if (!node) return;
  node.style.height = "auto";
  node.style.height = `${Math.max(node.scrollHeight, minHeight)}px`;
}

function parseMeetingNotesToRiskItems(text) {
  return splitMeetingBlocks(text)
    .map((block, index) => parseMeetingBlock(block, index))
    .filter(Boolean);
}

function splitMeetingBlocks(text) {
  const normalized = String(text || "").replace(/\r/g, "").trim();
  if (!normalized) return [];
  const byParagraph = normalized.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
  if (byParagraph.length > 1) return byParagraph;
  return normalized
    .split(/\n(?=(?:\d+[、.)）]|[-*•]))/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMeetingBlock(block, index) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return null;

  const structured = {};
  lines.forEach((line) => {
    const matched = line.match(/^(事项|标题|主题|项目|分类|类别|当前进展|进展|现状|风险点|风险|问题|需协调事项|协调事项|需协调|支持事项|支持|下周动作|下一步|后续动作|责任人|负责人|状态|优先级)[:：]\s*(.+)$/);
    if (!matched) return;
    const label = matched[1];
    const value = matched[2].trim();
    if (!value) return;
    if (["事项", "标题", "主题", "项目"].includes(label)) structured.title = value;
    if (["分类", "类别"].includes(label)) structured.category = value;
    if (["当前进展", "进展", "现状"].includes(label)) structured.progress = value;
    if (["风险点", "风险", "问题"].includes(label)) structured.risk = value;
    if (["需协调事项", "协调事项", "需协调", "支持事项", "支持"].includes(label)) structured.support = value;
    if (["下周动作", "下一步", "后续动作"].includes(label)) structured.nextAction = value;
    if (["责任人", "负责人"].includes(label)) structured.owner = value;
    if (["状态", "优先级"].includes(label)) structured.status = labelToStatus(value);
  });

  const cleanBlock = cleanMeetingLine(block);
  const sentences = cleanBlock
    .split(/[。；;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const firstSentence = sentences[0] || cleanBlock;

  return normalizeRiskItem({
    title: structured.title || buildTitleFromSentence(firstSentence, index),
    category: structured.category || "周会总结",
    progress: structured.progress || pickSentence(sentences, /(进展|推进|当前|完成|已|正在|本周|现阶段)/) || firstSentence || "待补充当前进展。",
    risk: structured.risk || pickSentence(sentences, /(风险|问题|卡点|阻塞|影响|困难|异常|延期)/) || "待补充风险点。",
    support: structured.support || pickSentence(sentences, /(协调|支持|配合|资源|协同|推动|需.*支持|需.*协调)/) || "待补充需协调事项。",
    nextAction: structured.nextAction || pickSentence(sentences, /(下周|下一步|后续|计划|安排|动作|推进)/) || "待补充下周动作。",
    owner: structured.owner || runtime.onlineConfig?.editorName || "行业二组",
    status: structured.status || inferRiskStatus(cleanBlock)
  });
}

function cleanMeetingLine(text) {
  return String(text || "").replace(/^\s*(\d+[、.)）]?|[-*•])\s*/, "").trim();
}

function buildTitleFromSentence(sentence, index) {
  const clean = cleanMeetingLine(sentence).replace(/^(事项|标题|主题|项目)[:：]\s*/, "");
  if (!clean) return `周会事项${index + 1}`;
  return clean.length > 24 ? `${clean.slice(0, 24)}...` : clean;
}

function pickSentence(sentences, pattern) {
  return sentences.find((sentence) => pattern.test(sentence)) || "";
}

function inferRiskStatus(text) {
  if (/(阻塞|延期|严重|风险|异常|拒签|未完成|卡点)/.test(text)) return "risk";
  if (/(关注|推进|跟进|待处理|待确认|协调)/.test(text)) return "watch";
  return "ontrack";
}

function createFallbackRiskItem(text, index) {
  return normalizeRiskItem({
    title: buildTitleFromSentence(text, index),
    category: "周会总结",
    progress: cleanMeetingLine(text),
    risk: "待补充风险点。",
    support: "待补充需协调事项。",
    nextAction: "待补充下周动作。",
    owner: runtime.onlineConfig?.editorName || "行业二组",
    status: inferRiskStatus(text)
  });
}

function createCustomSpecialMatter() {
  return {
    id: `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    title: "新增事项",
    tableImportEnabled: false,
    summaryTitle: "",
    summaryMetrics: [],
    noteLabel: "填写内容",
    note: "",
    importedTable: null,
    removable: true
  };
}

async function handleSpecialTableImport(event) {
  const index = Number(event.currentTarget.dataset.importSpecialItem);
  const [file] = event.currentTarget.files || [];
  if (!Number.isFinite(index) || !file) return;
  if (typeof XLSX === "undefined") {
    alert("Excel 导入库加载失败，请刷新页面后重试。");
    event.currentTarget.value = "";
    return;
  }

  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", raw: false, defval: "" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const matrix = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: "" });
    const importedTable = buildImportedTablePreview(file.name, matrix);
    const target = state.sections.risk.specialItems[index];
    if (!target) {
      throw new Error("未找到要写入的事项卡片。");
    }
    target.importedTable = importedTable;
    render();
    scheduleOnlineReportSync({ immediate: true });
  } catch (error) {
    alert(`导入表格失败：${error.message || "请检查表格格式。"}`);
  } finally {
    event.currentTarget.value = "";
  }
}

function handleClearSpecialTable(event) {
  const index = Number(event.currentTarget.dataset.clearSpecialTable);
  if (!Number.isFinite(index)) return;
  const target = state.sections.risk.specialItems[index];
  if (!target) return;
  target.importedTable = null;
  render();
  scheduleOnlineReportSync({ immediate: true });
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
  scheduleOnlineReportSync();
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
      if (diagnostics.feishuMsg) {
        hints.push(`feishuMsg=${diagnostics.feishuMsg}`);
      }
      const detail = payload?.error || "保存周报快照失败";
      const guidance = payload?.hint ? `；${payload.hint}` : "";
      throw new Error(hints.length ? `${hints.join(", ")}; ${detail}${guidance}` : `${detail}${guidance}`);
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
        const nextReason = reasonByOrderNo.get(order.purchaseOrderNo);
        if (String(order.reason || "") !== nextReason) {
          order.reason = nextReason;
          order.reasonDirty = true;
        }
      }
    });

    refreshLowMarginSummary();
    render();
    markPendingChanges();
  } catch (error) {
    alert(`导入低毛利反馈表失败：${error.message || "请检查 Excel 格式。"}`);
  } finally {
    runtime.saveInFlight = false;
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

function persistStateToLocalCache(options = {}) {
  try {
    const payload = {
      version: 2,
      hasPendingChanges: Boolean(options.hasPendingChanges ?? runtime.hasPendingChanges),
      savedAt: new Date().toISOString(),
      report: state
    };
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(payload));
  } catch (error) {
    // Ignore storage errors in restricted browser modes.
  }
}

function clearPersistedStateCache() {
  try {
    localStorage.removeItem(LOCAL_CACHE_KEY);
  } catch (error) {
    // Ignore storage errors in restricted browser modes.
  }
}

function restoreFromLocalCache() {
  try {
    const cached = localStorage.getItem(LOCAL_CACHE_KEY);
    if (!cached) return { restored: false, hasPendingChanges: false };
    const parsed = JSON.parse(cached);
    const isWrappedCache = parsed && typeof parsed === "object" && parsed.version === 2 && parsed.report;
    const cachedReport = isWrappedCache ? parsed.report : parsed;
    const hasPendingChanges = isWrappedCache ? Boolean(parsed.hasPendingChanges) : !runtime.onlineEnabled;

    if (runtime.onlineEnabled && !hasPendingChanges) {
      return { restored: false, hasPendingChanges: false, legacyCache: !isWrappedCache };
    }

    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, cachedReport);
    return { restored: true, hasPendingChanges };
  } catch (error) {
    // Ignore invalid cache and continue with bundled data.
    return { restored: false, hasPendingChanges: false };
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
      replaceState(parsed, { persistLocal: true });
      scheduleOnlineReportSync();
    } catch (error) {
      alert("导入失败：JSON 格式不正确。");
    } finally {
      event.target.value = "";
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
