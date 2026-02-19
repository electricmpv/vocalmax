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
