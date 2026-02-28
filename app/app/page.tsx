"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { Mic, Briefcase, Flame, Star, ChevronRight, BookOpen, CheckCircle2, Lock } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";
import type { LessonExercise } from "../../content/schema";

const TYPE_LABELS: Record<string, string> = {
  resonance: "共鸣",
  stability: "稳定",
  pace: "节奏",
  "scene-reading": "场景",
};

function ExerciseRow({
  exercise,
  index,
  isDone,
  locked,
}: {
  exercise: LessonExercise;
  index: number;
  isDone: boolean;
  locked: boolean;
}) {
  const href = locked ? "#" : `/app/session/${exercise.id}`;

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-4 rounded-2xl border transition-opacity ${locked ? "opacity-40 pointer-events-none" : "active:opacity-75"}`}
      style={{
        background: isDone ? "rgba(34,197,94,0.05)" : "var(--color-surface)",
        borderColor: isDone ? "var(--color-success)" : "var(--color-border)",
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
        style={{
          background: isDone ? "var(--color-success)" : "var(--color-surface-2)",
          color: isDone ? "white" : "var(--color-accent)",
        }}
      >
        {isDone ? <CheckCircle2 className="w-4 h-4" /> : locked ? <Lock className="w-3.5 h-3.5" style={{ color: "var(--color-muted)" }} /> : index + 1}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{exercise.title}</div>
        <div className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "var(--color-muted)" }}>
          <span
            className="px-1.5 py-0.5 rounded"
            style={{ background: "var(--color-surface-2)", fontSize: "10px" }}
          >
            {TYPE_LABELS[exercise.type]}
          </span>
          <span>+{exercise.xpReward} XP</span>
          <span>·</span>
          <span>{exercise.durationSeconds}秒</span>
        </div>
      </div>
      {!locked && !isDone && (
        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
      )}
    </Link>
  );
}

function TrainingDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trackParam = searchParams.get("track") as "a" | "b" | null;

  const {
    selectedTrack,
    selectTrack,
    currentDay,
    currentLesson,
    totalXP,
    streakDays,
    xpToday,
    isExerciseDone,
    trackLessons,
  } = useProgress();

  // 同步 URL 中的 track 参数到 store
  useEffect(() => {
    if (trackParam && trackParam !== selectedTrack) {
      selectTrack(trackParam);
    }
  }, [trackParam, selectedTrack, selectTrack]);

  // 优先用 URL 参数决定当前赛道显示，避免 useEffect 延迟导致 tab 首帧高亮错误
  const activeTrack = (trackParam ?? selectedTrack) as "a" | "b";

  const trackLabel = activeTrack === "a" ? "约会自信" : "职场权威";
  const TrackIcon = activeTrack === "a" ? Mic : Briefcase;

  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        {/* 顶部状态栏 */}
        <header className="flex items-center justify-between mb-6">
          <Link href="/" className="text-sm active:opacity-75" style={{ color: "var(--color-muted)" }}>
            ← 首页
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold">{streakDays}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold">{totalXP} XP</span>
            </div>
          </div>
        </header>

        {/* 赛道标识 + 今日进度 */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-4"
          style={{ background: "var(--color-surface)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--color-accent)" }}
          >
            <TrackIcon className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <div className="font-bold">{trackLabel}</div>
            <div className="text-sm" style={{ color: "var(--color-muted)" }}>
              {currentLesson ? `第 ${currentDay} 天 · ${currentLesson.subtitle}` : "全部完成！"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold" style={{ color: "var(--color-accent)" }}>
              +{xpToday}
            </div>
            <div className="text-xs" style={{ color: "var(--color-muted)" }}>今日 XP</div>
          </div>
        </div>

        {/* 切换赛道 */}
        <div className="flex gap-2 mb-6">
          {(["a", "b"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                selectTrack(t);
                router.replace(`/app?track=${t}`);
              }}
              className="flex-1 py-2 rounded-xl text-sm font-medium transition-all active:opacity-75"
              style={{
                background: activeTrack === t ? "var(--color-accent)" : "var(--color-surface)",
                color: activeTrack === t ? "black" : "var(--color-muted)",
              }}
            >
              {t === "a" ? "约会自信" : "职场权威"}
            </button>
          ))}
        </div>

        {/* 今日关卡 */}
        {currentLesson && (
          <div className="mb-6">
            <h2 className="text-sm font-medium mb-3" style={{ color: "var(--color-muted)" }}>
              今日训练 · {currentLesson.title}
            </h2>
            <div className="flex flex-col gap-3">
              {currentLesson.exercises.map((ex, idx) => (
                <ExerciseRow
                  key={ex.id}
                  exercise={ex}
                  index={idx}
                  isDone={isExerciseDone(ex.id)}
                  locked={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* 课程进度预览（最多显示3天） */}
        <div className="mb-6">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--color-muted)" }}>
            课程进度
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {trackLessons.slice(0, 7).map((lesson) => {
              const allDone = lesson.exercises.every((ex) => isExerciseDone(ex.id));
              const isCurrent = lesson.day === currentDay;
              return (
                <div
                  key={lesson.id}
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center text-xs font-bold"
                  style={{
                    background: allDone
                      ? "var(--color-success)"
                      : isCurrent
                      ? "var(--color-accent)"
                      : "var(--color-surface)",
                    color: allDone || isCurrent ? (allDone ? "white" : "black") : "var(--color-muted)",
                    border: isCurrent ? "none" : `1px solid var(--color-border)`,
                  }}
                >
                  <span>{lesson.day}</span>
                  <span style={{ fontSize: "9px", opacity: 0.7 }}>天</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 教程入口 */}
        <Link
          href="/coach"
          className="flex items-center gap-3 p-4 rounded-2xl border active:opacity-75"
          style={{ borderColor: "var(--color-border)" }}
        >
          <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
          <span className="text-sm" style={{ color: "var(--color-muted)" }}>
            不确定怎么练？先看教练教程
          </span>
          <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: "var(--color-muted)" }} />
        </Link>
      </div>
    </main>
  );
}

export default function AppPage() {
  return (
    <Suspense>
      <TrainingDashboard />
    </Suspense>
  );
}
