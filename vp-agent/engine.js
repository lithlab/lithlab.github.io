window.LITH_ENGINE = (function () {
  const KB = () => window.LITH_KB;

  function parseDeadline(raw) {
    if (!raw) return { label: "未定", days: null };
    const m = String(raw).match(/(\d+)\s*d/i);
    if (m) return { label: m[1] + " 天内", days: Number(m[1]) };
    return { label: String(raw), days: null };
  }

  function durationMul(seconds) {
    if (!seconds) return 1;
    return Math.max(0.45, Math.min(2.2, seconds / KB().durationRefSeconds));
  }

  function shouldKeepStage(stage, fields) {
    if (stage.id === "perf" && !fields.digitalHuman && fields.mocap === "none") return false;
    if (stage.id === "axis" && fields.mocap === "none") return false;
    if (stage.id === "hw" && fields.mocap !== "axis" && fields.mocap !== "compare") return false;
    if (stage.id === "mocap_anim" && fields.mocap === "none" && !fields.digitalHuman) return false;
    if (stage.id === "previz" && fields.engine !== "ue") return false;
    return true;
  }

  function plan(pipelineId, fields) {
    const kb = KB();
    const pipe = kb.pipelines[pipelineId];
    const q = kb.qualityMul[fields.quality] || 1;
    const dmul = durationMul(Number(fields.seconds) || 0);
    const deadline = parseDeadline(fields.deadline);
    const brief = {
      ...fields,
      daysToDeadline: deadline.days,
      pipelineId
    };

    const stages = pipe.stages
      .filter((s) => shouldKeepStage(s, fields))
      .map((s) => {
        let days = s.baseDays * q;
        if (["asset", "comp", "look", "keyart", "art", "art3d", "previz", "body", "concept", "mocap_anim"].includes(s.id)) days *= dmul;
        if (fields.live && ["show", "qa", "previz"].includes(s.id)) days *= 1.15;
        if (fields.quality === "hero" && ["vrperf", "gate"].includes(s.id)) days *= 1.2;
        if ((fields.resolution === "4k" || fields.resolution === "led") && ["asset", "comp", "previz"].includes(s.id)) days *= 1.25;
        if (fields.sim && ["asset", "comp"].includes(s.id)) days *= 1.2;
        if (String(fields.fps) === "60" && s.id === "comp") days *= 1.15;
        days = Math.max(0.5, Math.round(days * 2) / 2);
        return {
          ...s,
          days,
          on: true
        };
      });

    const risks = kb.risks
      .filter((r) => r.when(brief))
      .map((r) => ({ id: r.id, text: r.text, level: r.level }));

    const totalDays = stages.reduce((a, s) => a + s.days, 0);
    const calendarHint = estimateCalendar(stages);

    return {
      pipelineId,
      pipelineName: pipe.name,
      deadline,
      stages,
      risks,
      totalDays: Math.round(totalDays * 10) / 10,
      calendarHint,
      whyNotFullAuto: [
        "模型只建议拆解，不改报价终稿。",
        "现场、验收、识别门槛、发版必须人确认。",
        "TFG 四层工作项和质量门禁来自项目空间规则，不是模型随口编的。"
      ]
    };
  }

  function estimateCalendar(stages) {
    const groups = {};
    stages.forEach((s) => {
      groups[s.parallel] = Math.max(groups[s.parallel] || 0, s.days);
    });
    const days = Object.values(groups).reduce((a, b) => a + b, 0);
    return Math.round(days * 10) / 10;
  }

  function applyEdits(result, edits) {
    const stages = result.stages.map((s) => {
      const e = edits[s.id] || {};
      return {
        ...s,
        on: e.on !== undefined ? e.on : s.on,
        days: e.days !== undefined ? Number(e.days) : s.days,
        mustHuman: e.mustHuman !== undefined ? e.mustHuman : s.mustHuman
      };
    }).filter((s) => s.on);
    const totalDays = Math.round(stages.reduce((a, s) => a + s.days, 0) * 10) / 10;
    return { ...result, stages, totalDays, calendarHint: estimateCalendar(stages) };
  }

  function vendorTasks(result) {
    const kb = KB();
    return result.stages.map((s) => {
      const v = kb.vendors[s.vendor];
      return {
        stage: s.name,
        vendor: v.name,
        days: s.days,
        ai: s.ai,
        mustHuman: s.mustHuman,
        body: v.task + (s.note ? " · " + s.note : "")
      };
    });
  }

  function runEval(item) {
    const raw = plan(item.pipeline, item.fields);
    const tasks = vendorTasks(raw);
    const ex = item.expect;
    const fail = [];

    if (ex.hasRisk && !raw.risks.some((r) => r.id === ex.hasRisk)) fail.push("缺少风险 " + ex.hasRisk);
    if (ex.totalDaysMax && raw.totalDays > ex.totalDaysMax) fail.push("人天过高 " + raw.totalDays);
    if (ex.totalDaysMin && raw.totalDays < ex.totalDaysMin) fail.push("人天过低 " + raw.totalDays);
    if (ex.allMustHuman && raw.stages.some((s) => !s.mustHuman)) fail.push("存在可跳过人工的环节");
    if (ex.stageOn && !raw.stages.some((s) => s.id === ex.stageOn)) fail.push("应开启 " + ex.stageOn);
    if (ex.stageOff && raw.stages.some((s) => s.id === ex.stageOff)) fail.push("应关闭 " + ex.stageOff);
    const aiChecks = ex.stageAiList || (ex.stageAi ? [ex.stageAi] : []);
    aiChecks.forEach(([id, ai]) => {
      const st = raw.stages.find((s) => s.id === id);
      if (!st || st.ai !== ai) fail.push(id + " 的 AI 角色应为 " + ai);
    });
    if (ex.stageHuman) {
      const st = raw.stages.find((s) => s.id === ex.stageHuman);
      if (!st || !st.mustHuman) fail.push(ex.stageHuman + " 必须人工");
    }
    if (ex.taskCountMin && tasks.length < ex.taskCountMin) fail.push("任务单过少");
    if (ex.dispatchedOnlyAfterConfirm) {
      /* 结构性约定：引擎从不在 plan() 里标记 dispatched */
      if (raw.dispatched) fail.push("未确认就下发");
    }

    return { id: item.id, title: item.title, pass: fail.length === 0, fail, totalDays: raw.totalDays, riskCount: raw.risks.length };
  }

  function runAllEvals() {
    return KB().evals.map(runEval);
  }

  return { parseDeadline, plan, applyEdits, vendorTasks, runAllEvals };
})();
