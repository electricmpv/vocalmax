"use client";

import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";

export default function CoachPage() {
  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
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

        {/* Phase 4 时替换为真实教程内容 */}
        <div className="flex flex-col gap-3">
          {[
            { id: "resonance", title: "别硬压音高：深沉来自共鸣", icon: "🎵" },
            { id: "jaw-relax", title: "放松下巴与喉部：避免挤嗓子", icon: "😌" },
            { id: "breath-pause", title: "换气与停顿：让你听起来更自信", icon: "🫁" },
            { id: "pace-control", title: "节奏控制：慢半拍更有掌控感", icon: "⏱️" },
          ].map((tutorial) => (
            <div
              key={tutorial.id}
              className="flex items-center gap-4 p-4 rounded-2xl border"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <span className="text-2xl flex-shrink-0">{tutorial.icon}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{tutorial.title}</div>
                <div className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                  Phase 4 实现完整教程
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/app"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold active:opacity-75"
            style={{ background: "var(--color-accent)", color: "black" }}
          >
            <Mic className="w-5 h-5" />
            开始训练
          </Link>
        </div>
      </div>
    </main>
  );
}
