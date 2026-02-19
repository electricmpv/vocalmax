"use client";

import { Mic, Square, Loader2 } from "lucide-react";
import type { RecordState } from "../../core/types";

interface Props {
  state: RecordState;
  countdown: number;
  onStart: () => void;
  onStop: () => void;
}

export function RecordButton({ state, countdown, onStart, onStop }: Props) {
  const isRecording = state === "recording";
  const isAnalyzing = state === "analyzing" || state === "requesting";
  const isDisabled = isAnalyzing;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 主录音按钮 */}
      <button
        onClick={isRecording ? onStop : onStart}
        disabled={isDisabled}
        className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
        style={{
          background: isRecording
            ? "var(--color-danger)"
            : isDisabled
            ? "var(--color-surface-2)"
            : "var(--color-accent)",
        }}
        aria-label={isRecording ? "停止录音" : "开始录音"}
      >
        {isAnalyzing ? (
          <Loader2 className="w-10 h-10 text-black animate-spin" />
        ) : isRecording ? (
          <Square className="w-10 h-10 text-white fill-white" />
        ) : (
          <Mic className="w-10 h-10 text-black" />
        )}

        {/* 录音时的脉冲动画环 */}
        {isRecording && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30"
            style={{ background: "var(--color-danger)" }}
          />
        )}
      </button>

      {/* 状态文字 */}
      <div className="text-center">
        {state === "idle" && (
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            点击开始录音
          </p>
        )}
        {state === "requesting" && (
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            请允许麦克风权限…
          </p>
        )}
        {state === "recording" && (
          <>
            <p className="text-3xl font-bold tabular-nums" style={{ color: "var(--color-danger)" }}>
              {countdown}s
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              正在录音，点击提前停止
            </p>
          </>
        )}
        {state === "analyzing" && (
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            分析中，请稍候…
          </p>
        )}
      </div>
    </div>
  );
}
