"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Download, Link2, Mic } from "lucide-react";

function ShareCardView() {
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("s") ?? 0);
  const depth = Number(searchParams.get("d") ?? 0);
  const stability = Number(searchParams.get("st") ?? 0);
  const pace = Number(searchParams.get("p") ?? 0);
  const streak = Number(searchParams.get("streak") ?? 0);
  const track = searchParams.get("track") ?? "a";

  const hasData = score > 0;

  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        <header className="mb-8">
          <Link
            href="/app"
            className="text-sm active:opacity-75"
            style={{ color: "var(--color-muted)" }}
          >
            ← 返回训练
          </Link>
        </header>

        {/* 分享卡预览占位（Phase 5 实现 Canvas 渲染） */}
        <div
          className="rounded-3xl overflow-hidden mb-6 aspect-[9/16] flex flex-col items-center justify-center gap-4"
          style={{ background: "var(--color-surface)" }}
        >
          {hasData ? (
            <div className="text-center px-8">
              <div className="text-5xl font-bold mb-2" style={{ color: "var(--color-accent)" }}>
                {score}
              </div>
              <div className="text-sm" style={{ color: "var(--color-muted)" }}>
                Voice Score
              </div>
              <div className="mt-4 flex flex-col gap-2 text-left w-full">
                {[
                  { label: "深沉感", value: depth },
                  { label: "稳定性", value: stability },
                  { label: "节奏感", value: pace },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-2">
                    <span className="text-xs w-16" style={{ color: "var(--color-muted)" }}>
                      {m.label}
                    </span>
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ background: "var(--color-surface-2)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${m.value}%`,
                          background: "var(--color-accent)",
                        }}
                      />
                    </div>
                    <span className="text-xs w-6 text-right">{m.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm" style={{ color: "var(--color-muted)" }}>
                🔥 {streak} 天连胜 · {track === "a" ? "约会自信" : "职场权威"}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Mic className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--color-muted)" }} />
              <p style={{ color: "var(--color-muted)" }}>完成训练后生成分享卡</p>
            </div>
          )}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3">
          <button
            disabled={!hasData}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold disabled:opacity-40 active:opacity-75"
            style={{ background: "var(--color-accent)", color: "black" }}
          >
            <Download className="w-5 h-5" />
            下载图片
          </button>
          <button
            disabled={!hasData}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold border disabled:opacity-40 active:opacity-75"
            style={{ borderColor: "var(--color-border)" }}
          >
            <Link2 className="w-5 h-5" />
            复制链接
          </button>
        </div>
      </div>
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense>
      <ShareCardView />
    </Suspense>
  );
}
