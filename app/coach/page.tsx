"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, Play, Square } from "lucide-react";
import { TUTORIALS, type Tutorial } from "../../content/tutorials";

function CountdownTimer({
  seconds,
  onDone,
}: {
  seconds: number;
  onDone: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setRemaining(seconds);
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setRemaining(seconds);
  };

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setRunning(false);
          onDone();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, onDone]);

  return (
    <div className="flex items-center gap-3 mt-3">
      <button
        onClick={running ? stop : start}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium active:opacity-75"
        style={{
          background: running ? "var(--color-danger)" : "var(--color-surface-2)",
          color: running ? "white" : "var(--color-accent)",
        }}
      >
        {running ? (
          <>
            <Square className="w-3.5 h-3.5" />
            停止
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5" />
            开始计时
          </>
        )}
      </button>
      {running && (
        <span className="text-2xl font-bold tabular-nums" style={{ color: "var(--color-danger)" }}>
          {remaining}s
        </span>
      )}
    </div>
  );
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const [open, setOpen] = useState(false);
  const [practiced, setPracticed] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        borderColor: open ? "var(--color-accent)" : "var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      {/* 折叠头部 */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left active:opacity-75"
      >
        <span className="text-2xl flex-shrink-0">{tutorial.icon}</span>
        <div className="flex-1">
          <div className="font-bold text-sm leading-snug">{tutorial.title}</div>
          {!open && (
            <div className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
              点击展开教程
            </div>
          )}
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
        ) : (
          <ChevronDown className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-5">
          {/* 核心要点 */}
          <div>
            <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
              核心要点
            </h3>
            <div className="flex flex-col gap-2">
              {tutorial.corePoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--color-surface-2)", color: "var(--color-accent)" }}>
                    {i + 1}
                  </span>
                  <span style={{ color: "var(--color-muted)" }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 10 秒练习 */}
          <div
            className="p-4 rounded-xl"
            style={{ background: "var(--color-surface-2)" }}
          >
            <h3 className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "var(--color-success)" }}>
              10 秒练习
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {tutorial.practicePrompt}
            </p>
            <CountdownTimer
              seconds={10}
              onDone={() => setPracticed(true)}
            />
            {practiced && (
              <p className="mt-2 text-xs" style={{ color: "var(--color-success)" }}>
                ✓ 完成！感受到了吗？
              </p>
            )}
          </div>

          {/* 常见错误 */}
          <div>
            <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--color-warning)" }}>
              常见错误
            </h3>
            <div className="flex flex-col gap-2">
              {tutorial.commonMistakes.map((mistake, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-warning)" }}>×</span>
                  <span style={{ color: "var(--color-muted)" }}>{mistake}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 安全提示 */}
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid var(--color-danger)",
            }}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--color-danger)" }} />
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {tutorial.safetyTip}
            </p>
          </div>

          {/* 立即练习按钮 */}
          <Link
            href={`/app/session/${tutorial.linkedExerciseId}`}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm active:opacity-75"
            style={{ background: "var(--color-accent)", color: "black" }}
          >
            立即练习 →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CoachPage() {
  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        {/* 顶部 */}
        <header className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-75"
            style={{ background: "var(--color-surface)" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="font-bold">教练教程</div>
            <div className="text-xs" style={{ color: "var(--color-muted)" }}>
              先学会，再练习
            </div>
          </div>
        </header>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>
          这里是声音训练的「原理」。理解背后的逻辑，你的练习效率会提升 3 倍。
        </p>

        <div className="flex flex-col gap-4">
          {TUTORIALS.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/app"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold active:opacity-75"
            style={{ background: "var(--color-accent)", color: "black" }}
          >
            开始今日训练 →
          </Link>
        </div>
      </div>
    </main>
  );
}
