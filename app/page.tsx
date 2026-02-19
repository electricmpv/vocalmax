"use client";

import Link from "next/link";
import { Mic, Briefcase, ChevronRight, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-10">
        {/* 顶部品牌 */}
        <header className="flex items-center gap-3 mb-12">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "var(--color-accent)" }}
          >
            <Mic className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">VocalMax</span>
        </header>

        {/* 主内容 */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-10">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              声音，是你
              <br />
              <span style={{ color: "var(--color-accent)" }}>最被忽视的</span>
              <br />
              竞争力
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              每天 3 个关卡，训练更深沉、更稳定、更有节奏感的声音。
              像多邻国一样——但训练你的声场。
            </p>
          </div>

          {/* 数据小标注 */}
          <div
            className="flex gap-6 mb-10 p-4 rounded-2xl"
            style={{ background: "var(--color-surface)" }}
          >
            <div className="text-center flex-1">
              <div className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>
                3
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                关卡 / 天
              </div>
            </div>
            <div className="w-px" style={{ background: "var(--color-border)" }} />
            <div className="text-center flex-1">
              <div className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>
                14
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                天课程
              </div>
            </div>
            <div className="w-px" style={{ background: "var(--color-border)" }} />
            <div className="text-center flex-1">
              <div className="text-2xl font-bold" style={{ color: "var(--color-accent)" }}>
                100%
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--color-muted)" }}>
                本地处理
              </div>
            </div>
          </div>

          {/* 两条赛道 CTA */}
          <div className="flex flex-col gap-4">
            <Link
              href="/app?track=a"
              className="flex items-center gap-4 p-5 rounded-2xl active:opacity-75"
              style={{ background: "var(--color-accent)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-black text-base">约会自信训练</div>
                <div className="text-sm text-black/60 mt-0.5">Voice-maxxing · 磁性低沉</div>
              </div>
              <ChevronRight className="w-5 h-5 text-black/60 flex-shrink-0" />
            </Link>

            <Link
              href="/app?track=b"
              className="flex items-center gap-4 p-5 rounded-2xl border active:opacity-75"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--color-surface-2)" }}
              >
                <Briefcase className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-base">职场权威训练</div>
                <div className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
                  会议发言 · 面试自信
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
            </Link>
          </div>
        </div>

        {/* 底部 */}
        <footer className="mt-8 flex flex-col gap-3">
          <Link
            href="/coach"
            className="text-center text-sm py-2 active:opacity-75"
            style={{ color: "var(--color-muted)" }}
          >
            先看教练教程 →
          </Link>
          <div
            className="flex items-center justify-center gap-2 text-xs"
            style={{ color: "var(--color-muted)" }}
          >
            <Shield className="w-3 h-3 flex-shrink-0" />
            <span>音频本地处理，不上传云端</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
