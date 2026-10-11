/* 可改知识库：工序 / 人天启发式 / 风险 / 供应商 / 示例 / 评测。
 * 制片 SOP 找不到时，先用通用虚拟制片 8 环节。你按真实案例改这一文件即可。
 */
window.LITH_KB = {
  version: "0.3-sop",
  disclaimer: "人天与工序为可改草稿，不是历史项目真实报价。虚拟制片环节对齐对外信息表、AI 边界和 A/B Copy，数字仍是启发式。",

  pipelines: {
    virtual_prod: {
      id: "virtual_prod",
      name: "虚拟制片拆解提效",
      when: "品牌短片、TVC、UE 虚拟拍摄、数字人内容",
      stages: [
        { id: "info", name: "锁范围", vendor: "pm", baseDays: 1, ai: "none", mustHuman: true, parallel: "A" },
        { id: "script", name: "AI 剧本", vendor: "creative", baseDays: 1.5, ai: "assist", mustHuman: true, parallel: "B" },
        { id: "look", name: "AI 分镜", vendor: "art", baseDays: 2.5, ai: "assist", mustHuman: true, parallel: "B" },
        { id: "keyart", name: "原画收口", vendor: "paint", baseDays: 3, ai: "none", mustHuman: true, parallel: "C" },
        { id: "asset", name: "模型收口", vendor: "cg3d", baseDays: 6, ai: "none", mustHuman: true, parallel: "D" },
        { id: "previz", name: "UE 预演", vendor: "stage", baseDays: 4, ai: "none", mustHuman: true, parallel: "E" },
        { id: "perf", name: "表演评测", vendor: "capture", baseDays: 4, ai: "none", mustHuman: true, parallel: "D" },
        { id: "acopy", name: "A Copy", vendor: "pm", baseDays: 0.5, ai: "none", mustHuman: true, parallel: "F" },
        { id: "bcopy", name: "B Copy", vendor: "pm", baseDays: 0.5, ai: "none", mustHuman: true, parallel: "G" },
        { id: "comp", name: "合成", vendor: "post", baseDays: 4, ai: "none", mustHuman: true, parallel: "H" },
        { id: "deliver", name: "终稿", vendor: "pm", baseDays: 1, ai: "none", mustHuman: true, parallel: "I" }
      ]
    },
    vr_event: {
      id: "vr_event",
      name: "VR 活动提效",
      when: "快闪、展会、电竞周、软硬件联调",
      stages: [
        { id: "scope", name: "锁场地", vendor: "pm", baseDays: 1, ai: "none", mustHuman: true, parallel: "A" },
        { id: "soft", name: "内容包", vendor: "client", baseDays: 6, ai: "none", mustHuman: true, parallel: "B" },
        { id: "axis", name: "识别联调", vendor: "hardware", baseDays: 5, ai: "none", mustHuman: true, parallel: "B" },
        { id: "art", name: "资产提效", vendor: "cg3d", baseDays: 6, ai: "assist", mustHuman: true, parallel: "B" },
        { id: "qa", name: "现场压测", vendor: "qa", baseDays: 3, ai: "none", mustHuman: true, parallel: "C" },
        { id: "show", name: "现场部署", vendor: "stage", baseDays: 3, ai: "none", mustHuman: true, parallel: "D" }
      ]
    },
    tfg: {
      id: "tfg",
      name: "TFG 研发提效",
      when: "版本规划 → 业务线 → 需求 → 任务；角色 15+ 环节、引擎 23 节点门禁",
      stages: [
        { id: "version", name: "版本规划", vendor: "pm", baseDays: 1, ai: "none", mustHuman: true, parallel: "A" },
        { id: "line", name: "业务线", vendor: "pm", baseDays: 0.5, ai: "none", mustHuman: true, parallel: "A" },
        { id: "concept", name: "概念提效", vendor: "art", baseDays: 3, ai: "assist", mustHuman: true, parallel: "B" },
        { id: "body", name: "角色制作", vendor: "cg3d", baseDays: 10, ai: "none", mustHuman: true, parallel: "B" },
        { id: "mocap_anim", name: "动作", vendor: "capture", baseDays: 5, ai: "none", mustHuman: true, parallel: "C" },
        { id: "gate", name: "引擎门禁", vendor: "ta", baseDays: 2, ai: "none", mustHuman: true, parallel: "D" },
        { id: "vrperf", name: "VR 性能", vendor: "client", baseDays: 3, ai: "none", mustHuman: true, parallel: "D" },
        { id: "hw", name: "硬件适配", vendor: "hardware", baseDays: 4, ai: "none", mustHuman: true, parallel: "C" },
        { id: "qa", name: "QA", vendor: "qa", baseDays: 3, ai: "none", mustHuman: true, parallel: "E" },
        { id: "ship", name: "发版", vendor: "release", baseDays: 1, ai: "none", mustHuman: true, parallel: "F" }
      ]
    }
  },

  vendors: {
    pm: { name: "项目 / 制片", task: "锁范围、排期、验收口径、风险升级" },
    creative: { name: "创意脚本", task: "分镜与文案；AI 草案必须标注来源与红线" },
    art: { name: "概念美术", task: "分镜、氛围、三视图；AI 草案必须人确认方向" },
    paint: { name: "原画", task: "方向确认后的人手优化，禁止在这一步继续抽卡" },
    art2d: { name: "2D 供应商", task: "原画 / Spine / UI，按热更节点交付" },
    cg3d: { name: "三维 / 资产", task: "按面数、贴图、引擎版本交资产" },
    stage: { name: "现场 / 虚拟棚", task: "机位、实时画面、应急备用方案" },
    capture: { name: "捕捉 / 数字人", task: "动捕或口型规格、专家 QC 样本" },
    post: { name: "后期合成", task: "成片规格、版本号、母带" },
    client: { name: "客户端 / 版本", task: "可玩包、内容包、兼容性" },
    hardware: { name: "软硬件", task: "AXIS 或替代方案的准确率门槛；VR 设备 / 手柄 SDK 对接" },
    qa: { name: "测试", task: "评测集、现场压测、缺陷关闭标准" },
    ta: { name: "技术美术 / 质量门禁", task: "引擎导入规格、外包交付物自动门禁与评审" },
    release: { name: "发版", task: "版本打包、渠道上传、线上监控；对齐 dev / QA / Release 分支" },
    design: { name: "策划", task: "系统 / 战斗 / 音频需求口径，避免美术先做、玩法后改" }
  },

  qualityMul: { draft: 0.65, mid: 1, hero: 1.75 },
  durationRefSeconds: 15,

  risks: [
    { id: "no_brief", when: (b) => !b.deadline || b.budget === "unknown", text: "范围未锁，不报总价", level: "high" },
    { id: "live", when: (b) => b.live, text: "现场留人工应急", level: "high" },
    { id: "axis", when: (b) => b.mocap === "axis" || b.mocap === "compare", text: "识别方案二选一", level: "high" },
    { id: "lip", when: (b) => b.digitalHuman, text: "口型做版本对比", level: "high" },
    { id: "hero", when: (b) => b.quality === "hero", text: "氛围图不当成资产", level: "mid" },
    { id: "ue_spec", when: (b) => b.engine === "ue", text: "UE 规格未锁", level: "mid" },
    { id: "vendor_slot", when: (b) => b.daysToDeadline !== null && b.daysToDeadline < 14, text: "档期短，不压人天", level: "high" },
    { id: "ai_overreach", when: (b) => true, text: "终审不交给模型", level: "mid" },
    { id: "revision_cap", when: (b) => b.pipelineId === "virtual_prod" && Number(b.revisions) > 0 && Number(b.revisionUsed) >= Number(b.revisions), text: "修改到顶，不加轮次", level: "high" },
    { id: "revision_back", when: (b) => b.pipelineId === "virtual_prod" && b.rollback, text: "改回上一版", level: "high" },
    { id: "source_gap", when: (b) => b.pipelineId === "virtual_prod" && b.source && b.source !== "ready", text: "原料未齐，等待不计人天", level: "high" },
    { id: "sim_scope", when: (b) => !!b.sim, text: "解算单独计", level: "mid" },
    { id: "strategic", when: (b) => !!b.strategic, text: "重点项目不自动打折", level: "mid" },
    { id: "tfg_vr", when: (b) => b.pipelineId === "tfg", text: "90Hz 为验收", level: "high" },
    { id: "tfg_sync", when: (b) => b.pipelineId === "tfg", text: "双端同步 5ms", level: "high" },
    { id: "tfg_vendor", when: (b) => b.pipelineId === "tfg", text: "外包走门禁", level: "high" },
    { id: "tfg_load", when: (b) => b.pipelineId === "tfg" && b.daysToDeadline !== null && b.daysToDeadline <= 7, text: "负载过高，先砍范围", level: "high" }
  ],

  presets: {
    brand15: {
      label: "15 秒品牌片",
      pipeline: "virtual_prod",
      brief: "某车企 15 秒社交媒体短片，UE 虚拟拍摄，1080p / 25fps，无实拍、无解算、无数字人。修改上限 2 轮。原料已齐。截止日期约 3 周。",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d", resolution: "1080", fps: "25", source: "ready", revisions: 2, revisionUsed: 0, shoot: false, sim: false, rollback: false, strategic: false }
    },
    vtkd: {
      label: "VR 活动",
      pipeline: "vr_event",
      brief: "海外活动周 VR 体感展示：上海软硬件（AXIS）与玩法版本要跟上，现场不能崩。曾对比摄像头动捕。截止日期紧，准确率优先。",
      fields: { seconds: 0, quality: "hero", engine: "ue", live: true, digitalHuman: false, mocap: "compare", budget: "unknown", deadline: "10d" }
    },
    game: {
      label: "角色模型重制",
      pipeline: "tfg",
      brief: "TFG（英雄电竞 VR 体育）本季版本：重制一名出场角色。管线含概念、高模、拓扑、绑定、动捕等 15+ 环节；原画到引擎导入要过 23 节点状态。3 家外包美术要统一进度与质量门禁。目标 90Hz，PC/VR 帧同步 5ms。本周还有大量功能需求与缺陷，不要把角色做成无门禁的外包收件。",
      fields: { seconds: 0, quality: "hero", engine: "ue", live: false, digitalHuman: false, mocap: "camera", budget: "mid", deadline: "21d" }
    }
  },

  evals: [
    { id: "e01", title: "信息不全仍能出计划", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "unknown", deadline: "" },
      expect: { hasRisk: "no_brief", totalDaysMax: 40 } },
    { id: "e02", title: "现场活动必须人确认", pipeline: "vr_event",
      fields: { seconds: 0, quality: "hero", engine: "ue", live: true, digitalHuman: false, mocap: "axis", budget: "mid", deadline: "10d" },
      expect: { hasRisk: "live", allMustHuman: true } },
    { id: "e03", title: "AXIS 方案要单独标风险", pipeline: "vr_event",
      fields: { seconds: 0, quality: "mid", engine: "ue", live: true, digitalHuman: false, mocap: "compare", budget: "mid", deadline: "21d" },
      expect: { hasRisk: "axis" } },
    { id: "e04", title: "数字人触发口型 QC", pipeline: "virtual_prod",
      fields: { seconds: 20, quality: "mid", engine: "cg", live: false, digitalHuman: true, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { hasRisk: "lip", stageOn: "perf" } },
    { id: "e05", title: "无数字人则关闭表演环节", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { stageOff: "perf" } },
    { id: "e06", title: "Hero 不能把人天压成草稿", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "hero", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "high", deadline: "30d" },
      expect: { totalDaysMin: 20 } },
    { id: "e07", title: "超短片不应报出天价人天", pipeline: "virtual_prod",
      fields: { seconds: 5, quality: "draft", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "low", deadline: "21d" },
      expect: { totalDaysMax: 22 } },
    { id: "e08", title: "脚本允许 AI 辅助但不终审", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { stageAi: ["script", "assist"], stageHuman: "script" } },
    { id: "e09", title: "验收环节禁止 AI 替换", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { stageAi: ["deliver", "none"] } },
    { id: "e10", title: "TFG 一周盒要标负载与外包冲突", pipeline: "tfg",
      fields: { seconds: 0, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "7d" },
      expect: { hasRisk: "tfg_load" } },
    { id: "e11", title: "TFG 角色必须过引擎质量门禁", pipeline: "tfg",
      fields: { seconds: 0, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "camera", budget: "mid", deadline: "21d" },
      expect: { stageOn: "gate", hasRisk: "tfg_vendor" } },
    { id: "e12", title: "UE 规格风险", pipeline: "virtual_prod",
      fields: { seconds: 30, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { hasRisk: "ue_spec" } },
    { id: "e13", title: "始终保留模型终审禁令", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "draft", engine: "cg", live: false, digitalHuman: false, mocap: "none", budget: "low", deadline: "40d" },
      expect: { hasRisk: "ai_overreach" } },
    { id: "e14", title: "下发任务覆盖启用环节", pipeline: "vr_event",
      fields: { seconds: 0, quality: "mid", engine: "ue", live: true, digitalHuman: false, mocap: "axis", budget: "mid", deadline: "21d" },
      expect: { taskCountMin: 5 } },
    { id: "e15", title: "人确认前不得视为已下发", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { dispatchedOnlyAfterConfirm: true } },
    { id: "e16", title: "确认方向后原画和模型不用 AI", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { stageAiList: [["keyart", "none"], ["asset", "none"], ["look", "assist"]] } },
    { id: "e17", title: "修改到顶必须让客户取舍", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d", revisions: 2, revisionUsed: 2 },
      expect: { hasRisk: "revision_cap" } },
    { id: "e18", title: "原料未齐先列缺口", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "ue", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d", source: "missing" },
      expect: { hasRisk: "source_gap" } },
    { id: "e19", title: "B Copy 共审不能省", pipeline: "virtual_prod",
      fields: { seconds: 15, quality: "mid", engine: "cg", live: false, digitalHuman: false, mocap: "none", budget: "mid", deadline: "21d" },
      expect: { stageOn: "bcopy", stageHuman: "bcopy", stageOff: "previz" } }
  ]
};
