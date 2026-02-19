"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Mic, Briefcase, Flame, Star, ChevronRight, BookOpen } from "lucide-react";

function TrainingDashboard() {
  const searchParams = useSearchParams();
  const track = searchParams.get("track") ?? "a";
  const trackLabel = track === "a" ? "约会自信" : "职场权威";
  const TrackIcon = track === "a" ? Mic : Briefcase;

  // 今日课程示例数据（Phase 3 时换成真实数据）
  const todayLessons = [
    { id: `track-${track}-day-01-ex-1`, title: "胸腔共鸣热身", type: "共鸣", xp: 15, locked: false },
    { id: `track-${track}-day-01-ex-2`, title: "低沉元音延伸", type: "稳定", xp: 20, locked: false },
    { id: `track-${track}-day-01-ex-3`, title: "场景跟读", type: "节奏", xp: 25, locked: false },
  ];

  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        {/* 顶部状态栏 */}
        <header className="flex items-center justify-between mb-8">
          <Link href="/" className="text-sm active:opacity-75" style={{ color: "var(--color-muted)" }}>
            ← 首页
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold">0</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4" style={{ color: "var(--color-accent)" }} />
              <span className="text-sm font-bold">0 XP</span>
            </div>
          </div>
        </header>

        {/* 赛道标识 */}
        <div
          className="flex items-center gap-3 p-4 rounded-2xl mb-6"
          style={{ background: "var(--color-surface)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--color-accent)" }}
          >
            <TrackIcon className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="font-bold">{trackLabel}</div>
            <div className="text-sm" style={{ color: "var(--color-muted)" }}>
              第 1 天 · 感受共鸣腔
            </div>
          </div>
        </div>

        {/* 今日关卡 */}
        <div className="mb-6">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--color-muted)" }}>
            今日训练
          </h2>
          <div className="flex flex-col gap-3">
            {todayLessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/app/session/${lesson.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl border active:opacity-75"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ background: "var(--color-surface-2)", color: "var(--color-accent)" }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{lesson.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                    {lesson.type} · +{lesson.xp} XP
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
              </Link>
            ))}
          </div>
        </div>

        {/* 跳转教程 */}
        <Link
          href="/coach"
          className="flex items-center gap-3 p-4 rounded-2xl border active:opacity-75"
          style={{ borderColor: "var(--color-border)" }}
        >
          <BookOpen className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
          <span className="text-sm" style={{ color: "var(--color-muted)" }}>
            不确定怎么练？先看教练教程
          </span>
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
