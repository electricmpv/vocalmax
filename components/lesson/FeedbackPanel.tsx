"use client";

import { CheckCircle, AlertCircle, TrendingUp, Share2 } from "lucide-react";
import type { AnalysisResult } from "../../core/types";

interface Props {
  result: AnalysisResult;
  passScore: number;
  onNext?: () => void;
  onRetry?: () => void;
  onShare?: () => void;
}

const SCORE_LABELS: Record<string, string> = {
  depth: "深沉感",
  stability: "稳定性",
  pace: "节奏感",
};

export function FeedbackPanel({ result, passScore, onNext, onRetry, onShare }: Props) {
  const { scores, feedback, improvement, metrics } = result;
  const passed = scores.overall >= passScore;

  return (
    <div className="flex flex-col gap-5">
      {/* 综合分 */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{
          background: passed ? "rgba(34,197,94,0.1)" : "var(--color-surface)",
          border: `1px solid ${passed ? "var(--color-success)" : "var(--color-border)"}`,
        }}
      >
        <div
          className="text-5xl font-bold mb-1"
          style={{ color: passed ? "var(--color-success)" : "var(--color-accent)" }}
        >
          {scores.overall}
        </div>
        <div className="text-sm" style={{ color: "var(--color-muted)" }}>
          综合评分
        </div>
        {passed ? (
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm" style={{ color: "var(--color-success)" }}>
            <CheckCircle className="w-4 h-4" />
            <span>通过！</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 mt-2 text-sm" style={{ color: "var(--color-warning)" }}>
            <AlertCircle className="w-4 h-4" />
            <span>再试一次，差一点就过了</span>
          </div>
        )}
      </div>

      {/* 三维度分 */}
      <div className="flex flex-col gap-3">
        {(["depth", "stability", "pace"] as const).map((key) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-sm w-14 flex-shrink-0" style={{ color: "var(--color-muted)" }}>
              {SCORE_LABELS[key]}
            </span>
            <div
              className="flex-1 h-2.5 rounded-full overflow-hidden"
              style={{ background: "var(--color-surface-2)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${scores[key]}%`,
                  background:
                    scores[key] >= 70
                      ? "var(--color-success)"
                      : scores[key] >= 50
                      ? "var(--color-accent)"
                      : "var(--color-danger)",
                }}
              />
            </div>
            <span className="text-sm font-bold w-8 text-right tabular-nums">
              {scores[key]}
            </span>
          </div>
        ))}
      </div>

      {/* 文字反馈 */}
      {feedback.length > 0 && (
        <div
          className="rounded-2xl p-4 flex flex-col gap-2"
          style={{ background: "var(--color-surface)" }}
        >
          {feedback.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <TrendingUp
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: "var(--color-accent)" }}
              />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}

      {/* 技术指标（折叠展示，不喧宾夺主） */}
      <details className="text-xs" style={{ color: "var(--color-muted)" }}>
        <summary className="cursor-pointer mb-2">查看详细指标</summary>
        <div className="flex flex-col gap-1 pl-2">
          <span>基频中位数：{metrics.f0_median ? `${metrics.f0_median} Hz` : "未检测到"}</span>
          <span>基频范围：{metrics.f0_range} Hz</span>
          <span>停顿占比：{Math.round(metrics.pause_ratio * 100)}%</span>
          <span>音量：{Math.round(metrics.loudness * 100)}%</span>
          <span>置信度：{Math.round(metrics.confidence * 100)}%</span>
          <span>时长：{(metrics.duration_ms / 1000).toFixed(1)}s</span>
        </div>
      </details>

      {/* 操作按钮 */}
      <div className="flex gap-3 mt-2">
        {!passed && onRetry && (
          <button
            onClick={onRetry}
            className="flex-1 py-4 rounded-2xl border font-bold text-sm active:opacity-75"
            style={{ borderColor: "var(--color-border)" }}
          >
            再试一次
          </button>
        )}
        {onShare && passed && (
          <button
            onClick={onShare}
            className="py-4 px-4 rounded-2xl border font-bold text-sm active:opacity-75"
            style={{ borderColor: "var(--color-border)" }}
          >
            <Share2 className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="flex-1 py-4 rounded-2xl font-bold text-sm active:opacity-75"
            style={{ background: "var(--color-accent)", color: "black" }}
          >
            {passed ? "下一关 →" : "跳过"}
          </button>
        )}
      </div>
    </div>
  );
}
