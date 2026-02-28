"use client";

import Link from "next/link";
import { Heart, Briefcase, ChevronRight } from "lucide-react";

export default function QuizPage() {
  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        <header className="mb-8">
          <Link href="/" className="text-sm active:opacity-75" style={{ color: "var(--color-muted)" }}>
            ← 首页
          </Link>
        </header>

        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-tight mb-3">
              测一测你的<br />
              <span style={{ color: "var(--color-accent)" }}>声音现状</span>
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              读一句例句，录音 10 秒，AI 立即分析并生成专属 MEME 测评卡。
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/quiz/session?type=dating"
              className="flex items-center gap-4 p-5 rounded-2xl active:opacity-75"
              style={{ background: "var(--color-accent)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-black" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-black text-base">约会常用语</div>
                <div className="text-sm text-black/60 mt-0.5">日常搭话 · 氛围感测试</div>
              </div>
              <ChevronRight className="w-5 h-5 text-black/60 flex-shrink-0" />
            </Link>

            <Link
              href="/quiz/session?type=work"
              className="flex items-center gap-4 p-5 rounded-2xl border active:opacity-75"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--color-surface-2)" }}
              >
                <Briefcase className="w-6 h-6" style={{ color: "var(--color-accent)" }} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-base">职场常用语</div>
                <div className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
                  会议发言 · 权威感测试
                </div>
              </div>
              <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: "var(--color-muted)" }} />
            </Link>
          </div>

          <p className="text-xs text-center mt-6" style={{ color: "var(--color-muted)" }}>
            音频本地分析，不上传云端
          </p>
        </div>
      </div>
    </main>
  );
}
