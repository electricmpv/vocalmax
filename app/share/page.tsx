"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Download, Link2, CheckCircle2, Loader2, Mic } from "lucide-react";
import { useShareCard } from "../../hooks/useShareCard";
import { getMemeCaption } from "../../lib/share-card-renderer";
import type { ShareCardData } from "../../lib/share-card-renderer";
import type { TrackId } from "../../store/progress";

function ShareCardView() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const voiceScore = Number(searchParams.get("s") ?? 0);
  const depth = Number(searchParams.get("d") ?? 0);
  const stability = Number(searchParams.get("st") ?? 0);
  const pace = Number(searchParams.get("p") ?? 0);
  const streakDays = Number(searchParams.get("streak") ?? 0);
  const trackId = (searchParams.get("track") ?? "a") as TrackId;

  const hasData = voiceScore > 0;

  const data: ShareCardData = {
    voiceScore,
    depth,
    stability,
    pace,
    streakDays,
    xpToday: 0,
    improvement: "",
    trackId,
  };

  const { isGenerating, previewUrl, generate, download, copyLink, cleanup } =
    useShareCard();

  useEffect(() => {
    if (hasData) generate(data);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasData]);

  const handleCopy = async () => {
    const ok = await copyLink(data);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const trackLabel = trackId === "a" ? "约会自信" : "职场权威";

  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        <header className="mb-6">
          <Link
            href="/app"
            className="text-sm active:opacity-75"
            style={{ color: "var(--color-muted)" }}
          >
            ← 返回训练
          </Link>
        </header>

        {hasData ? (
          <>
            {/* 分享卡预览 */}
            <div
              className="rounded-3xl overflow-hidden mb-6 flex items-center justify-center"
              style={{
                background: "var(--color-surface-2)",
                aspectRatio: "9/16",
                maxHeight: "55vh",
              }}
            >
              {isGenerating ? (
                <Loader2
                  className="w-10 h-10 animate-spin"
                  style={{ color: "var(--color-accent)" }}
                />
              ) : previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="分享卡"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>

            {/* 梗化文案 */}
            {!isGenerating && (
              <p
                className="text-center text-sm mb-6 font-medium"
                style={{ color: "var(--color-accent)" }}
              >
                {getMemeCaption(voiceScore, trackId)}
              </p>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={download}
                disabled={isGenerating || !previewUrl}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm disabled:opacity-40 active:opacity-75"
                style={{ background: "var(--color-accent)", color: "black" }}
              >
                <Download className="w-5 h-5" />
                下载图片
              </button>
              <button
                onClick={handleCopy}
                disabled={isGenerating}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm border disabled:opacity-40 active:opacity-75"
                style={{ borderColor: "var(--color-border)" }}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" style={{ color: "var(--color-success)" }} />
                    已复制
                  </>
                ) : (
                  <>
                    <Link2 className="w-5 h-5" />
                    复制链接
                  </>
                )}
              </button>
            </div>

            {/* 邀请 CTA */}
            <div
              className="p-5 rounded-2xl text-center"
              style={{ background: "var(--color-surface)" }}
            >
              <p className="text-sm font-bold mb-1">挑战 {trackLabel}</p>
              <p className="text-xs mb-4" style={{ color: "var(--color-muted)" }}>
                声音评分 {voiceScore}分 · {streakDays} 天连胜
              </p>
              <Link
                href={`/app?track=${trackId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm active:opacity-75"
                style={{ background: "var(--color-accent)", color: "black" }}
              >
                开始你的声音训练 →
              </Link>
            </div>
          </>
        ) : (
          /* 无数据状态 */
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "var(--color-surface)" }}
            >
              <Mic className="w-10 h-10" style={{ color: "var(--color-muted)" }} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">完成训练后生成分享卡</h2>
              <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
                完成一次训练关卡，就可以生成专属分享卡
              </p>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm active:opacity-75"
                style={{ background: "var(--color-accent)", color: "black" }}
              >
                开始训练 →
              </Link>
            </div>
          </div>
        )}
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
