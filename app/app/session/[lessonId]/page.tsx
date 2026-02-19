"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, BookOpen } from "lucide-react";
import { useAudioEngine } from "../../../../hooks/useAudioEngine";
import { RecordButton } from "../../../../components/audio/RecordButton";
import { FeedbackPanel } from "../../../../components/lesson/FeedbackPanel";
import { ShareModal } from "../../../../components/share/ShareModal";
import { useProgressStore } from "../../../../store/progress";
import { getExerciseById, getLessonById } from "../../../../content";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export default function SessionPage({ params }: Props) {
  const { lessonId } = use(params);
  const router = useRouter();
  const [showSafety, setShowSafety] = useState(true);
  const [showShare, setShowShare] = useState(false);

  const { state, countdown, result, error, startRecording, stopEarly, reset } =
    useAudioEngine();

  const completeLesson = useProgressStore((s) => s.completeLesson);
  const selectedTrack = useProgressStore((s) => s.selectedTrack);

  // 查找关卡数据
  const exercise = getExerciseById(lessonId);

  // 查找属于哪个 DayLesson，以便找到下一关
  const parentLesson = exercise
    ? (() => {
        for (const l of [
          ...Array.from({ length: 7 }, (_, i) =>
            getLessonById(`track-${selectedTrack}-day-0${i + 1}`)
          ),
        ].filter(Boolean)) {
          if (l!.exercises.find((e) => e.id === lessonId)) return l!;
        }
        return undefined;
      })()
    : undefined;

  // 找到当前关卡在 exercises 中的位置，以便导航到下一关
  const exerciseIndex = parentLesson?.exercises.findIndex((e) => e.id === lessonId) ?? -1;
  const nextExercise =
    exerciseIndex >= 0 && exerciseIndex < 2
      ? parentLesson?.exercises[exerciseIndex + 1]
      : undefined;

  // 完成关卡
  const handleNext = () => {
    if (result && exercise && result.scores.overall >= exercise.passScore) {
      completeLesson(lessonId, exercise.xpReward);
    }
    if (nextExercise) {
      router.push(`/app/session/${nextExercise.id}`);
    } else {
      router.push(`/app?track=${selectedTrack}`);
    }
  };

  // 分享卡数据
  const shareData = result && exercise
    ? {
        voiceScore: result.scores.overall,
        depth: result.scores.depth,
        stability: result.scores.stability,
        pace: result.scores.pace,
        streakDays: useProgressStore.getState().streakDays,
        xpToday: useProgressStore.getState().xpToday,
        improvement: result.improvement,
        trackId: selectedTrack,
      }
    : null;

  if (!exercise) {
    return (
      <main className="app-container">
        <div className="flex flex-col min-h-dvh px-6 py-8 items-center justify-center">
          <p style={{ color: "var(--color-muted)" }}>找不到关卡：{lessonId}</p>
          <Link
            href="/app"
            className="mt-4 text-sm underline"
            style={{ color: "var(--color-accent)" }}
          >
            返回训练
          </Link>
        </div>
      </main>
    );
  }

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
          <div className="flex-1">
            <div className="font-bold text-sm">{exercise.title}</div>
            <div className="text-xs" style={{ color: "var(--color-muted)" }}>
              录音 {exercise.durationSeconds}秒 · 及格 {exercise.passScore}分 · +{exercise.xpReward} XP
            </div>
          </div>
          <Link
            href="/coach"
            className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-75"
            style={{ background: "var(--color-surface)" }}
          >
            <BookOpen className="w-4 h-4" style={{ color: "var(--color-muted)" }} />
          </Link>
        </header>

        <div className="flex-1 flex flex-col">
          {/* 安全提示 */}
          {showSafety && state === "idle" && exercise.safetyNote && (
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
                  {exercise.safetyNote}
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

          {/* 练习指令 + 台词 */}
          {state !== "done" && (
            <div
              className="p-5 rounded-2xl mb-8"
              style={{ background: "var(--color-surface)" }}
            >
              <h2 className="font-bold mb-3">练习指令</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-muted)" }}>
                {exercise.instruction}
              </p>

              {exercise.prompt && (
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "var(--color-surface-2)" }}
                >
                  <p className="text-xs mb-2 font-medium" style={{ color: "var(--color-accent)" }}>
                    台词
                  </p>
                  <p className="text-base leading-relaxed font-medium">{exercise.prompt}</p>
                </div>
              )}

              {exercise.tips.length > 0 && (
                <div className="mt-4 flex flex-col gap-1.5">
                  {exercise.tips.map((tip, i) => (
                    <p key={i} className="text-xs flex items-start gap-1.5" style={{ color: "var(--color-muted)" }}>
                      <span style={{ color: "var(--color-accent)" }}>•</span>
                      {tip}
                    </p>
                  ))}
                </div>
              )}
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
                onStart={() => startRecording(exercise.durationSeconds)}
                onStop={stopEarly}
              />
            </div>
          ) : result ? (
            <FeedbackPanel
              result={result}
              passScore={exercise.passScore}
              onNext={handleNext}
              onRetry={reset}
              onShare={() => setShowShare(true)}
            />
          ) : null}
        </div>
      </div>

      {/* 分享卡 Modal */}
      {showShare && shareData && (
        <ShareModal data={shareData} onClose={() => setShowShare(false)} />
      )}
    </main>
  );
}
