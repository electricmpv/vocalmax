"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useAudioEngine } from "../../../../hooks/useAudioEngine";
import { RecordButton } from "../../../../components/audio/RecordButton";
import { FeedbackPanel } from "../../../../components/lesson/FeedbackPanel";
import { useProgressStore } from "../../../../store/progress";

interface Props {
  params: Promise<{ lessonId: string }>;
}

// 示例关卡数据（Phase 3 时替换为真实 content 模块数据）
const PLACEHOLDER_LESSON = {
  title: "胸腔共鸣练习",
  instruction: '闭上嘴，用「嗯~」哼出一个长音。感受胸口的振动，保持放松，不要用力压嗓子。',
  durationSeconds: 8,
  passScore: 60,
  xpReward: 20,
  safetyNote: "如果喉咙有不适感，请立即停止，休息一下再继续。",
};

export default function SessionPage({ params }: Props) {
  const { lessonId } = use(params);
  const [showSafety, setShowSafety] = useState(true);

  const { state, countdown, result, error, startRecording, stopEarly, reset } =
    useAudioEngine();

  const completeLesson = useProgressStore((s) => s.completeLesson);

  // 完成关卡
  const handleNext = () => {
    if (result && result.scores.overall >= PLACEHOLDER_LESSON.passScore) {
      completeLesson(lessonId, PLACEHOLDER_LESSON.xpReward);
    }
    // TODO: Phase 3 时跳转到下一关
    window.history.back();
  };

  const lesson = PLACEHOLDER_LESSON;

  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        {/* 顶部 */}
        <header className="flex items-center gap-3 mb-8">
          <Link
            href="/app"
            className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-75"
            style={{ background: "var(--color-surface)" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="font-bold">{lesson.title}</div>
            <div className="text-xs" style={{ color: "var(--color-muted)" }}>
              关卡 · {lesson.durationSeconds}秒录音
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col">
          {/* 安全提示（第一次展示） */}
          {showSafety && state === "idle" && (
            <div
              className="flex items-start gap-3 p-4 rounded-2xl mb-6"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid var(--color-danger)",
              }}
            >
              <AlertTriangle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "var(--color-danger)" }}
              />
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "var(--color-danger)" }}>
                  安全提示
                </p>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  {lesson.safetyNote}
                </p>
                <button
                  onClick={() => setShowSafety(false)}
                  className="text-xs mt-2 underline underline-offset-2 active:opacity-75"
                  style={{ color: "var(--color-muted)" }}
                >
                  我知道了
                </button>
              </div>
            </div>
          )}

          {/* 练习指令 */}
          {state !== "done" && (
            <div
              className="p-5 rounded-2xl mb-8"
              style={{ background: "var(--color-surface)" }}
            >
              <h2 className="font-bold mb-3">练习指令</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {lesson.instruction}
              </p>
            </div>
          )}

          {/* 错误提示 */}
          {state === "error" && error && (
            <div
              className="flex items-start gap-3 p-4 rounded-2xl mb-6"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid var(--color-danger)",
              }}
            >
              <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-danger)" }} />
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: "var(--color-danger)" }}>
                  {error.type === "permission_denied"
                    ? "需要麦克风权限"
                    : error.type === "too_short"
                    ? "录音太短"
                    : "出现问题"}
                </p>
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  {error.message}
                </p>
                <button
                  onClick={reset}
                  className="text-xs mt-2 underline underline-offset-2 active:opacity-75"
                  style={{ color: "var(--color-accent)" }}
                >
                  重试
                </button>
              </div>
            </div>
          )}

          {/* 录音区 or 结果区 */}
          {state !== "done" ? (
            <div className="flex-1 flex items-center justify-center">
              <RecordButton
                state={state}
                countdown={countdown}
                onStart={() => startRecording(lesson.durationSeconds)}
                onStop={stopEarly}
              />
            </div>
          ) : result ? (
            <FeedbackPanel
              result={result}
              passScore={lesson.passScore}
              onNext={handleNext}
              onRetry={reset}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
