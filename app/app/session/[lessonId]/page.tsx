"use client";

import { use } from "react";
import Link from "next/link";
import { Mic, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ lessonId: string }>;
}

export default function SessionPage({ params }: Props) {
  const { lessonId } = use(params);

  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        <header className="flex items-center gap-3 mb-8">
          <Link
            href="/app"
            className="w-10 h-10 rounded-xl flex items-center justify-center active:opacity-75"
            style={{ background: "var(--color-surface)" }}
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="font-bold text-sm">训练关卡</div>
            <div className="text-xs" style={{ color: "var(--color-muted)" }}>
              {lessonId}
            </div>
          </div>
        </header>

        {/* Phase 2 时替换为真实训练组件 */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "var(--color-surface)" }}
          >
            <Mic className="w-10 h-10" style={{ color: "var(--color-accent)" }} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">训练关卡</h2>
            <p style={{ color: "var(--color-muted)" }}>
              音频引擎将在 Phase 2 实现
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
