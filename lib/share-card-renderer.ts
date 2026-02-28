/**
 * VocalMax 分享卡 Canvas 渲染器
 * 输出尺寸：540×960px（9:16 竖屏）
 * 纯函数，无 React 依赖
 */

import type { TrackId } from "../store/progress";

export interface ShareCardData {
  voiceScore: number;    // 0-100
  depth: number;
  stability: number;
  pace: number;
  streakDays: number;
  xpToday: number;
  improvement: string;   // 今日最大提升点
  trackId: TrackId;
}

// 梗化文案库（克制但好玩，绝不油腻）
const MEME_CAPTIONS: Record<TrackId, Record<"high" | "mid" | "low", string[]>> = {
  a: {
    high: [
      '低沉の声，让空气都安静了',
      '此声只应天上有，人间能得几回练',
      '男人魅力，从声音开始觉醒',
    ],
    mid: [
      '正在进化中的磁性男声',
      '差一点点就让她心跳加速',
      '继续练，你快了',
    ],
    low: [
      '声音觉醒第一步，已经出发',
      '低沉之路，始于足下',
      '潜力股声音，等待解锁',
    ],
  },
  b: {
    high: [
      '会议室最权威的声音，没有之一',
      '老板听了也要点头的发言节奏',
      'CEO 级音场，正在激活',
    ],
    mid: [
      '职场话语权 +1，继续',
      '发言时全场静了 3 秒',
      '会议发言，已完成进化',
    ],
    low: [
      '职场声音觉醒中，别急',
      '下一次发言，全场侧耳',
      '权威之声，正在起步',
    ],
  },
};

export function getMemeCaption(voiceScore: number, trackId: TrackId): string {
  const tier = voiceScore >= 85 ? "high" : voiceScore >= 65 ? "mid" : "low";
  const captions = MEME_CAPTIONS[trackId][tier];
  // 用分数作为伪随机种子，保持同一次分数结果一致
  return captions[voiceScore % captions.length];
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#22c55e";  // success
  if (score >= 60) return "#f0b429";  // accent
  return "#ef4444";                    // danger
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * 主渲染函数（返回 Blob）
 * 在 onClick 中调用，字体依赖系统字体（中文在多数设备上可用）
 */
export async function renderShareCard(data: ShareCardData): Promise<Blob> {
  const W = 540;
  const H = 960;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // ── 背景 ──
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#0a0a0f");
  bg.addColorStop(1, "#14141e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── 顶部品牌区 ──
  const trackLabel = data.trackId === "a" ? "约会自信" : "职场权威";
  ctx.fillStyle = "#f0b429";
  ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
  ctx.fillText("VOCALMAX", 48, 72);
  ctx.fillStyle = "#6b7280";
  ctx.font = "14px system-ui, -apple-system, sans-serif";
  ctx.fillText(trackLabel, 48, 96);

  // ── 大号评分圆圈 ──
  const cx = W / 2;
  const cy = 230;
  const R = 90;

  // 底层灰圆弧
  ctx.strokeStyle = "#2a2a3e";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();

  // 评分弧（顺时针）
  const fraction = data.voiceScore / 100;
  ctx.strokeStyle = getScoreColor(data.voiceScore);
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * fraction);
  ctx.stroke();

  // 分数数字
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 64px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(String(data.voiceScore), cx, cy + 22);
  ctx.font = "14px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText("VOICE SCORE", cx, cy + 48);
  ctx.textAlign = "left";

  // ── 三维度条形图 ──
  const metrics = [
    { label: "DEPTH", value: data.depth },
    { label: "STABILITY", value: data.stability },
    { label: "PACE", value: data.pace },
  ];
  const barStartY = 370;
  const barH = 10;
  const barW = 260;
  const barX = 200;

  metrics.forEach((m, i) => {
    const y = barStartY + i * 52;

    // label
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px system-ui, -apple-system, sans-serif";
    ctx.fillText(m.label, 48, y + barH / 2 + 4);

    // 背景条
    drawRoundRect(ctx, barX, y, barW, barH, 5);
    ctx.fillStyle = "#2a2a3e";
    ctx.fill();

    // 彩色条
    drawRoundRect(ctx, barX, y, barW * (m.value / 100), barH, 5);
    ctx.fillStyle = getScoreColor(m.value);
    ctx.fill();

    // 数字
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(String(m.value), W - 48, y + barH / 2 + 4);
    ctx.textAlign = "left";
  });

  // ── Streak 区 ──
  const streakY = 530;
  ctx.fillStyle = "#1e1e2e";
  drawRoundRect(ctx, 48, streakY, W - 96, 64, 16);
  ctx.fill();

  ctx.font = "20px system-ui, -apple-system, sans-serif";
  ctx.fillText("🔥", 70, streakY + 38);
  ctx.fillStyle = "#f0b429";
  ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
  ctx.fillText(`${data.streakDays} 天连胜`, 100, streakY + 38);
  ctx.fillStyle = "#6b7280";
  ctx.font = "13px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`今日 +${data.xpToday} XP`, W - 70, streakY + 38);
  ctx.textAlign = "left";

  // ── 今日提升点 ──
  const impY = 630;
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px system-ui, -apple-system, sans-serif";
  ctx.fillText("今日提升", 48, impY);

  ctx.fillStyle = "#ffffff";
  ctx.font = "15px system-ui, -apple-system, sans-serif";
  // 文字换行（简单处理：超过 22 字则截断）
  const impText = data.improvement.length > 22
    ? data.improvement.slice(0, 22) + "…"
    : data.improvement;
  ctx.fillText(impText, 48, impY + 28);

  // ── 梗化文案 ──
  const caption = getMemeCaption(data.voiceScore, data.trackId);
  const captionY = 730;

  // 背景气泡
  ctx.fillStyle = "#1e1e2e";
  drawRoundRect(ctx, 48, captionY - 28, W - 96, 68, 20);
  ctx.fill();

  ctx.fillStyle = "#f0b429";
  ctx.font = `bold 16px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(caption, cx, captionY + 12);
  ctx.textAlign = "left";

  // ── 底部引流 ──
  const footerY = 880;
  ctx.fillStyle = "#2a2a3e";
  ctx.fillRect(0, footerY - 1, W, 1);
  ctx.fillStyle = "#6b7280";
  ctx.font = "13px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("vocalmax.app · 声音训练", cx, footerY + 32);
  ctx.textAlign = "left";

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      "image/png"
    );
  });
}

// ─── Quiz MEME 卡 ─────────────────────────────────────────────────────────────

import type { QuizType } from "../content/quiz-sentences";

export type MemeType =
  | "magnetic"
  | "authority"
  | "potential"
  | "forced"
  | "natural"
  | "dormant";

export interface QuizCardParams {
  scores: { s: number; d: number; st: number; p: number };
  quizType: QuizType;
  sentenceIndex: number;
  forced: boolean;
  memeType: MemeType;
  copyLine1: string;
  copyLine2: string;
  tagline: string;
}

const MEME_STYLE: Record<MemeType, { bg: string; accent: string }> = {
  magnetic:  { bg: "#0a0a0f", accent: "#7B5EA7" },
  authority: { bg: "#0d1117", accent: "#4A90D9" },
  potential: { bg: "#080f1a", accent: "#22c55e" },
  forced:    { bg: "#1a0800", accent: "#f59e0b" },
  natural:   { bg: "#061a0d", accent: "#34d399" },
  dormant:   { bg: "#111111", accent: "#6b7280" },
};

function drawMemeBackground(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  meme: MemeType
) {
  const style = MEME_STYLE[meme];
  ctx.fillStyle = style.bg;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.globalAlpha = 0.12;

  if (meme === "magnetic") {
    // 正弦横波
    ctx.strokeStyle = style.accent;
    ctx.lineWidth = 2;
    for (let row = 0; row < H; row += 40) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 4) {
        const y = row + Math.sin((x / W) * Math.PI * 6) * 10;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  } else if (meme === "authority") {
    // 等距网格
    ctx.strokeStyle = style.accent;
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 36) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += 36) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  } else if (meme === "potential") {
    // 径向圆弧
    ctx.strokeStyle = style.accent;
    ctx.lineWidth = 2;
    const cx = W / 2, cy = H * 0.35;
    for (let r = 60; r < 500; r += 60) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  } else if (meme === "forced") {
    // 45° 黄黑警示条纹
    ctx.fillStyle = style.accent;
    const stripeW = 32;
    for (let i = -H; i < W + H; i += stripeW * 2) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + stripeW, 0);
      ctx.lineTo(i + stripeW + H, H);
      ctx.lineTo(i + H, H);
      ctx.closePath();
      ctx.fill();
    }
  } else if (meme === "natural") {
    // 贝塞尔曲线波
    ctx.strokeStyle = style.accent;
    ctx.lineWidth = 2;
    for (let row = 0; row < H + 100; row += 80) {
      ctx.beginPath();
      ctx.moveTo(0, row);
      ctx.bezierCurveTo(W * 0.25, row - 40, W * 0.75, row + 40, W, row);
      ctx.stroke();
    }
  } else {
    // dormant: 随机噪点
    ctx.fillStyle = style.accent;
    // 固定种子伪随机（用位置决定，可重复）
    for (let i = 0; i < 600; i++) {
      const x = ((i * 137 + 17) % W);
      const y = ((i * 89 + 31) % H);
      ctx.fillRect(x, y, 2, 2);
    }
  }

  ctx.restore();
}

const QUIZ_COPY: Record<MemeType, [string, string][]> = {
  magnetic: [
    ["这声音，开口就是氛围感", "磁性满格，无需努力"],
    ["有一点磁性", "再放松一点，就到位了"],
    ["潜力型磁性选手", "基础在，练练就出来了"],
  ],
  authority: [
    ["会议室最权威的声音", "老板听了也要点头"],
    ["发言时全场静了 3 秒", "职场话语权已开启"],
    ["权威之声，正在起步", "下一次发言，全场侧耳"],
  ],
  potential: [
    ["声音潜力爆棚", "继续挖掘，就在这里了"],
    ["有潜力，缺打磨", "7 天能让你脱胎换骨"],
    ["起点不错", "差一点点就让人印象深刻"],
  ],
  forced: [
    ["检测到：刻意压低模式", "你的声音想说：放开我！"],
    ["压过头了兄弟", "真实的你比这个好听多了"],
  ],
  natural: [
    ["自然流畅，无需加工", "这就是好声音的样子"],
    ["轻松自然，好感加分", "再多一点低沉就完美了"],
    ["声音舒服，听着踏实", "练一练，能出圈"],
  ],
  dormant: [
    ["声音潜力尚未激活", "7 天训练，等你开悟"],
    ["沉睡中的好声音", "一旦觉醒，难以阻挡"],
    ["还差一点点觉醒", "声音训练，从今天开始"],
  ],
};

function getQuizCopy(meme: MemeType, score: number): [string, string] {
  const pool = QUIZ_COPY[meme];
  if (meme === "forced") return pool[score % pool.length];
  const tier = score >= 80 ? 0 : score >= 60 ? 1 : 2;
  const idx = Math.min(tier, pool.length - 1);
  return pool[idx];
}

export function getMemeType(
  f0Median: number | null,
  forced: boolean,
  quizType: QuizType
): MemeType {
  if (forced) return "forced";
  const hz = f0Median ?? 130;
  const score = hz > 120 ? 90 : hz > 100 ? 75 : 60;
  if (quizType === "dating") {
    if (score >= 80) return "magnetic";
    if (score >= 60) return "natural";
    return "dormant";
  } else {
    if (score >= 80) return "authority";
    if (score >= 60) return "potential";
    return "dormant";
  }
}

/** 渲染 Quiz MEME 卡（返回 Blob） */
export async function renderQuizCard(params: QuizCardParams): Promise<Blob> {
  const W = 540;
  const H = 960;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const style = MEME_STYLE[params.memeType];
  const cx = W / 2;

  drawMemeBackground(ctx, W, H, params.memeType);

  // 顶部品牌
  ctx.fillStyle = style.accent;
  ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
  ctx.fillText("VOCALMAX", 48, 72);
  const typeLabel = params.quizType === "dating" ? "约会自信测试" : "职场权威测试";
  ctx.fillStyle = "#6b7280";
  ctx.font = "14px system-ui, -apple-system, sans-serif";
  ctx.fillText(typeLabel, 48, 96);

  // 大号评分圆圈
  const cy = 230;
  const R = 90;
  ctx.strokeStyle = "#2a2a3e";
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();

  const fraction = params.scores.s / 100;
  ctx.strokeStyle = style.accent;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * fraction);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(String(params.scores.s), cx, cy + 22);
  ctx.font = "14px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText("VOICE SCORE", cx, cy + 48);
  ctx.textAlign = "left";

  // forced 警告标语
  if (params.forced) {
    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("⚠ 检测到刻意压低", cx, cy + 76);
    ctx.textAlign = "left";
  }

  // 三维度条形
  const bars = [
    { label: "DEPTH",     value: params.scores.d  },
    { label: "STABILITY", value: params.scores.st },
    { label: "PACE",      value: params.scores.p  },
  ];
  const barStartY = 370;
  const barH = 10;
  const barW = 260;
  const barX = 200;

  bars.forEach((b, i) => {
    const y = barStartY + i * 52;
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px system-ui, -apple-system, sans-serif";
    ctx.fillText(b.label, 48, y + barH / 2 + 4);
    drawRoundRect(ctx, barX, y, barW, barH, 5);
    ctx.fillStyle = "#2a2a3e";
    ctx.fill();
    drawRoundRect(ctx, barX, y, barW * (b.value / 100), barH, 5);
    ctx.fillStyle = getScoreColor(b.value);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(String(b.value), W - 48, y + barH / 2 + 4);
    ctx.textAlign = "left";
  });

  // MEME 评语气泡
  const [line1, line2] = getQuizCopy(params.memeType, params.scores.s);
  const bubbleY = 560;
  ctx.fillStyle = "#1e1e2e";
  drawRoundRect(ctx, 48, bubbleY, W - 96, 90, 20);
  ctx.fill();

  ctx.fillStyle = style.accent;
  ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(line1, cx, bubbleY + 34);
  ctx.fillStyle = "#9ca3af";
  ctx.font = "14px system-ui, -apple-system, sans-serif";
  ctx.fillText(line2, cx, bubbleY + 60);
  ctx.textAlign = "left";

  // 提升建议
  const tipY = 685;
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px system-ui, -apple-system, sans-serif";
  ctx.fillText("提升建议", 48, tipY);
  const tipMap: Record<MemeType, string> = {
    magnetic:  "保持这个共鸣，练 7 天会更稳",
    authority: "加强停顿节奏，发言更有掌控感",
    potential: "挖掘胸腔共鸣，潜力正在等你",
    forced:    "放开喉咙，自然发声才是真磁性",
    natural:   "加一点低沉，自然流畅是你的优势",
    dormant:   "从共鸣练起，基础稳了就起飞",
  };
  ctx.fillStyle = "#ffffff";
  ctx.font = "15px system-ui, -apple-system, sans-serif";
  ctx.fillText(tipMap[params.memeType], 48, tipY + 28);

  // 底部 CTA
  const ctaY = 820;
  ctx.fillStyle = style.accent;
  drawRoundRect(ctx, 48, ctaY, W - 96, 60, 16);
  ctx.fill();
  ctx.fillStyle = "#000000";
  ctx.font = "bold 16px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("开始 7 天声音训练 →", cx, ctaY + 36);
  ctx.textAlign = "left";

  // 底部品牌
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("vocalmax.app · 声音训练", cx, 924);
  ctx.textAlign = "left";

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
      "image/png"
    );
  });
}

/** 生成 Quiz 分享链接 */
export function buildQuizShareUrl(
  params: QuizCardParams,
  appUrl = ""
): string {
  const p = new URLSearchParams({
    s:      String(params.scores.s),
    d:      String(params.scores.d),
    st:     String(params.scores.st),
    p:      String(params.scores.p),
    mode:   "quiz",
    qt:     params.quizType,
    si:     String(params.sentenceIndex),
    forced: params.forced ? "1" : "0",
  });
  return `${appUrl}/share?${p.toString()}`;
}

/** 生成匿名分享链接 */
export function buildShareUrl(data: ShareCardData, appUrl = ""): string {
  const params = new URLSearchParams({
    s: String(data.voiceScore),
    d: String(data.depth),
    st: String(data.stability),
    p: String(data.pace),
    streak: String(data.streakDays),
    track: data.trackId,
  });
  return `${appUrl}/share?${params.toString()}`;
}
