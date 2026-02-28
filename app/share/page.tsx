"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Download, Link2, CheckCircle2, Loader2, Mic } from "lucide-react";
import { useShareCard } from "../../hooks/useShareCard";
import {
  getMemeCaption,
  getMemeType,
  renderQuizCard,
  buildQuizShareUrl,
} from "../../lib/share-card-renderer";
import type { ShareCardData, QuizCardParams } from "../../lib/share-card-renderer";
import type { TrackId } from "../../store/progress";
import type { QuizType } from "../../content/quiz-sentences";

function ShareCardView() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [quizPreviewUrl, setQuizPreviewUrl] = useState<string | null>(null);
  const [quizBlob, setQuizBlob] = useState<Blob | null>(null);
  const [quizParams, setQuizParams] = useState<QuizCardParams | null>(null);

  const mode = searchParams.get("mode");
  const isQuizMode = mode === "quiz";

  const voiceScore = Number(searchParams.get("s") ?? 0);
  const depth = Number(searchParams.get("d") ?? 0);
  const stability = Number(searchParams.get("st") ?? 0);
  const pace = Number(searchParams.get("p") ?? 0);
  const streakDays = Number(searchParams.get("streak") ?? 0);
  const trackId = (searchParams.get("track") ?? "a") as TrackId;
  const quizType = (searchParams.get("qt") ?? "dating") as QuizType;
  const sentenceIndex = Number(searchParams.get("si") ?? 0);
  const forced = searchParams.get("forced") === "1";

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

  // Quiz 模式：生成 MEME 卡
  useEffect(() => {
    if (!isQuizMode || !hasData) return;
    const memeType = getMemeType(null, forced, quizType);
    const params: QuizCardParams = {
      scores: { s: voiceScore, d: depth, st: stability, p: pace },
      quizType,
      sentenceIndex,
      forced,
      memeType,
      copyLine1: "",
      copyLine2: "",
      tagline: "",
    };
    setQuizParams(params);
    renderQuizCard(params).then((blob) => {
      const url = URL.createObjectURL(blob);
      setQuizPreviewUrl(url);
      setQuizBlob(blob);
    });
    return () => {
      setQuizPreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return null; });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuizMode, hasData]);

  // 普通模式
  useEffect(() => {
    if (!isQuizMode && hasData) generate(data);
    if (!isQuizMode) return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQuizMode, hasData]);

  const handleCopy = async () => {
    if (isQuizMode && quizParams) {
      const appUrl = typeof window !== "undefined" ? window.location.origin : "";
      const link = buildQuizShareUrl(quizParams, appUrl);
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { /* ignore */ }
      return;
    }
    const ok = await copyLink(data);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = useCallback(() => {
    const blob = isQuizMode ? quizBlob : null;
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vocalmax-quiz-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } else {
      download();
    }
  }, [isQuizMode, quizBlob, download]);

  const activePreviewUrl = isQuizMode ? quizPreviewUrl : previewUrl;
  const isLoadingQuiz = isQuizMode && !quizPreviewUrl && hasData;
  const isLoadingNormal = !isQuizMode && isGenerating;
  const isLoadingCard = isLoadingQuiz || isLoadingNormal;

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
              {isLoadingCard ? (
                <Loader2
                  className="w-10 h-10 animate-spin"
                  style={{ color: "var(--color-accent)" }}
                />
              ) : activePreviewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activePreviewUrl}
                  alt="分享卡"
                  className="w-full h-full object-contain"
                />
              ) : null}
            </div>

            {/* 梗化文案（仅普通模式） */}
            {!isQuizMode && !isGenerating && (
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
                onClick={handleDownload}
                disabled={isLoadingCard || !activePreviewUrl}
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
