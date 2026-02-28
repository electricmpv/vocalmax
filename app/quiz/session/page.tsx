"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Mic, Download, Link2, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";
import { useAudioEngine } from "../../../hooks/useAudioEngine";
import { detectForcedVoice } from "../../../lib/score-calculator";
import { calcScores } from "../../../lib/score-calculator";
import {
  getMemeType,
  renderQuizCard,
  buildQuizShareUrl,
  type QuizCardParams,
} from "../../../lib/share-card-renderer";
import {
  getRandomSentence,
  type QuizType,
  type QuizSentence,
} from "../../../content/quiz-sentences";

type Step = "intro" | "recording" | "analyzing" | "result";

function QuizSession() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawType = searchParams.get("type");
  const quizType: QuizType = rawType === "work" ? "work" : "dating";

  const [step, setStep] = useState<Step>("intro");
  const [sentence, setSentence] = useState<QuizSentence | null>(null);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blobRef, setBlobRef] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);
  const [cardParams, setCardParams] = useState<QuizCardParams | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const { state, countdown, result, error, startRecording, reset } = useAudioEngine();

  // 初始化随机例句
  useEffect(() => {
    const { sentence: s, index } = getRandomSentence(quizType);
    setSentence(s);
    setSentenceIndex(index);
  }, [quizType]);

  // 监听音频状态变化驱动页面状态机
  useEffect(() => {
    if (state === "recording") {
      setStep("recording");
    } else if (state === "analyzing") {
      setStep("analyzing");
    } else if (state === "done" && result) {
      setStep("result");
    }
  }, [state, result]);

  // 当结果出来时生成 MEME 卡
  useEffect(() => {
    if (step !== "result" || !result) return;

    const metrics = result.metrics;
    const scores = calcScores(metrics);
    const forced = detectForcedVoice(metrics);
    const memeType = getMemeType(metrics.f0_median, forced.isForced, quizType);

    const params: QuizCardParams = {
      scores: { s: scores.overall, d: scores.depth, st: scores.stability, p: scores.pace },
      quizType,
      sentenceIndex,
      forced: forced.isForced,
      memeType,
      copyLine1: "",
      copyLine2: "",
      tagline: "",
    };
    setCardParams(params);

    renderQuizCard(params).then((blob) => {
      const url = URL.createObjectURL(blob);
      previewUrlRef.current = url;
      setPreviewUrl(url);
      setBlobRef(blob);
    });

    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const handleStart = useCallback(async () => {
    await startRecording(10);
  }, [startRecording]);

  const handleDownload = useCallback(() => {
    if (!blobRef) return;
    const url = URL.createObjectURL(blobRef);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vocalmax-quiz-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [blobRef]);

  const handleCopyLink = useCallback(async () => {
    if (!cardParams) return;
    const appUrl = typeof window !== "undefined" ? window.location.origin : "";
    const link = buildQuizShareUrl(cardParams, appUrl);
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [cardParams]);

  const handleRetry = useCallback(() => {
    reset();
    const { sentence: s, index } = getRandomSentence(quizType);
    setSentence(s);
    setSentenceIndex(index);
    setPreviewUrl(null);
    setBlobRef(null);
    setCopied(false);
    setCardParams(null);
    setStep("intro");
  }, [reset, quizType]);

  const trackForTraining = quizType === "dating" ? "a" : "b";

  // ── Step: Intro ──────────────────────────────────────────────
  if (step === "intro") {
    return (
      <main className="app-container">
        <div className="flex flex-col min-h-dvh px-6 py-8">
          <header className="mb-8">
            <Link href="/quiz" className="text-sm active:opacity-75" style={{ color: "var(--color-muted)" }}>
              ← 返回
            </Link>
          </header>

          <div className="flex-1 flex flex-col justify-center gap-6">
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: "var(--color-surface)", color: "var(--color-accent)" }}
              >
                {quizType === "dating" ? "约会场景" : "职场场景"}
              </div>
              <h2 className="text-xl font-bold mb-2">朗读下面这句话</h2>
              <p className="text-xs mb-4" style={{ color: "var(--color-muted)" }}>
                提示：{sentence?.hint}
              </p>
            </div>

            {sentence && (
              <div
                className="p-6 rounded-2xl"
                style={{ background: "var(--color-surface)", borderLeft: "3px solid var(--color-accent)" }}
              >
                <p className="text-lg font-medium leading-relaxed">{sentence.text}</p>
              </div>
            )}

            <div
              className="p-4 rounded-xl text-sm leading-relaxed"
              style={{ background: "var(--color-surface-2)", color: "var(--color-muted)" }}
            >
              按下按钮后开始录音，系统会录制 10 秒，然后自动分析你的声音特征。
            </div>

            {error && (
              <div
                className="p-4 rounded-xl text-sm"
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
              >
                {error.type === "permission_denied"
                  ? "未授权麦克风，请在浏览器设置中允许访问"
                  : error.type === "not_supported"
                  ? "当前浏览器不支持麦克风录音"
                  : error.message}
              </div>
            )}

            <button
              onClick={handleStart}
              className="flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg active:opacity-75"
              style={{ background: "var(--color-accent)", color: "black" }}
            >
              <Mic className="w-6 h-6" />
              开始录音
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Step: Recording ──────────────────────────────────────────
  if (step === "recording") {
    const progress = (10 - countdown) / 10;
    const r = 52;
    const circumference = 2 * Math.PI * r;
    const dashOffset = circumference * (1 - progress);

    return (
      <main className="app-container">
        <div className="flex flex-col min-h-dvh px-6 py-8 items-center justify-center gap-8">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-surface)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r={r}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.5s linear" }}
              />
            </svg>
            <div className="text-4xl font-bold">{countdown}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm font-medium" style={{ color: "var(--color-accent)" }}>录音中</span>
            </div>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              请自然朗读例句，无需刻意
            </p>
          </div>

          {sentence && (
            <div
              className="w-full p-5 rounded-2xl"
              style={{ background: "var(--color-surface)" }}
            >
              <p className="text-base font-medium leading-relaxed text-center">{sentence.text}</p>
            </div>
          )}
        </div>
      </main>
    );
  }

  // ── Step: Analyzing ──────────────────────────────────────────
  if (step === "analyzing") {
    return (
      <main className="app-container">
        <div className="flex flex-col min-h-dvh px-6 py-8 items-center justify-center gap-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "var(--color-surface)" }}
          >
            <Mic className="w-8 h-8 animate-pulse" style={{ color: "var(--color-accent)" }} />
          </div>
          <div className="text-center">
            <p className="font-bold text-lg mb-1">分析中…</p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>正在解析声音特征</p>
          </div>
        </div>
      </main>
    );
  }

  // ── Step: Result ─────────────────────────────────────────────
  if (!result || !cardParams) {
    return (
      <main className="app-container">
        <div className="flex flex-col min-h-dvh px-6 py-8 items-center justify-center">
          <p style={{ color: "var(--color-muted)" }}>加载中…</p>
        </div>
      </main>
    );
  }

  const scores = calcScores(result.metrics);
  const forcedResult = detectForcedVoice(result.metrics);

  return (
    <main className="app-container">
      <div className="flex flex-col min-h-dvh px-6 py-8">
        <header className="flex items-center justify-between mb-6">
          <Link href="/quiz" className="text-sm active:opacity-75" style={{ color: "var(--color-muted)" }}>
            ← 返回
          </Link>
          <button
            onClick={handleRetry}
            className="flex items-center gap-1.5 text-sm active:opacity-75"
            style={{ color: "var(--color-muted)" }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            再测一次
          </button>
        </header>

        {/* MEME 卡预览 */}
        <div
          className="rounded-3xl overflow-hidden mb-5 flex items-center justify-center"
          style={{
            background: "var(--color-surface-2)",
            aspectRatio: "9/16",
            maxHeight: "52vh",
          }}
        >
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="测评卡" className="w-full h-full object-contain" />
          ) : (
            <Mic className="w-10 h-10 animate-pulse" style={{ color: "var(--color-muted)" }} />
          )}
        </div>

        {/* 刻意压低提示 */}
        {forcedResult.isForced && (
          <div
            className="flex items-center gap-2 p-3 rounded-xl mb-4 text-sm"
            style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}
          >
            <span>⚠</span>
            <span>检测到刻意压低声音——放松说话，真实的你更好听</span>
          </div>
        )}

        {/* 分数条 */}
        <div className="flex flex-col gap-2 mb-5">
          {[
            { label: "综合评分", value: scores.overall },
            { label: "深沉感", value: scores.depth },
            { label: "稳定性", value: scores.stability },
            { label: "节奏感", value: scores.pace },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-xs w-14 flex-shrink-0" style={{ color: "var(--color-muted)" }}>
                {item.label}
              </span>
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ background: "var(--color-surface)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.value}%`,
                    background:
                      item.value >= 80
                        ? "var(--color-success)"
                        : item.value >= 60
                        ? "var(--color-accent)"
                        : "#ef4444",
                  }}
                />
              </div>
              <span className="text-xs font-bold w-8 text-right">{item.value}</span>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={handleDownload}
            disabled={!previewUrl}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm disabled:opacity-40 active:opacity-75"
            style={{ background: "var(--color-accent)", color: "black" }}
          >
            <Download className="w-5 h-5" />
            下载图片
          </button>
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm border active:opacity-75"
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

        {/* 训练 CTA */}
        <button
          onClick={() => router.push(`/app?track=${trackForTraining}`)}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm border active:opacity-75"
          style={{ borderColor: "var(--color-border)" }}
        >
          开始 7 天声音训练
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}

export default function QuizSessionPage() {
  return (
    <Suspense>
      <QuizSession />
    </Suspense>
  );
}
