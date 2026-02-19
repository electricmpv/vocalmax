"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import type { AudioMetrics, AnalysisResult, RecordState, AudioError } from "../core/types";
import { AudioEngine } from "../core/audio-engine";
import { buildAnalysisResult } from "../lib/score-calculator";

export interface UseAudioEngineReturn {
  state: RecordState;
  countdown: number;       // 录音剩余秒数
  result: AnalysisResult | null;
  error: AudioError | null;
  startRecording: (durationSeconds?: number) => Promise<void>;
  stopEarly: () => Promise<void>;  // 提前停止
  reset: () => void;
}

/** 录音 + 分析的 React Hook */
export function useAudioEngine(): UseAudioEngineReturn {
  const [state, setState] = useState<RecordState>("idle");
  const [countdown, setCountdown] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<AudioError | null>(null);

  const engineRef = useRef<AudioEngine | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef(0);

  // 清理计时器
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 停止录音并分析
  const doStopAndAnalyze = useCallback(async () => {
    clearTimer();
    if (!engineRef.current) return;

    setState("analyzing");
    try {
      const metrics: AudioMetrics = await engineRef.current.stopAndAnalyze();
      const analysis = buildAnalysisResult(metrics);
      setResult(analysis);
      setState("done");
    } catch (err) {
      const audioErr = err as AudioError;
      setError(audioErr);
      setState("error");
    }
  }, [clearTimer]);

  // 开始录音
  const startRecording = useCallback(
    async (durationSeconds = 8) => {
      if (state === "recording" || state === "analyzing") return;

      setResult(null);
      setError(null);
      setState("requesting");

      if (!engineRef.current) {
        engineRef.current = new AudioEngine();
      }

      try {
        // iOS Safari：必须在此 onClick 调用链中初始化 AudioContext
        await engineRef.current.startRecording();
      } catch (err) {
        const audioErr = err as AudioError;
        setError(audioErr);
        setState("error");
        return;
      }

      setState("recording");
      countdownRef.current = durationSeconds;
      setCountdown(durationSeconds);

      timerRef.current = setInterval(() => {
        countdownRef.current -= 1;
        setCountdown(countdownRef.current);

        if (countdownRef.current <= 0) {
          clearTimer();
          doStopAndAnalyze();
        }
      }, 1000);
    },
    [state, clearTimer, doStopAndAnalyze]
  );

  // 提前停止
  const stopEarly = useCallback(async () => {
    if (state !== "recording") return;
    await doStopAndAnalyze();
  }, [state, doStopAndAnalyze]);

  // 重置
  const reset = useCallback(() => {
    clearTimer();
    if (engineRef.current) {
      engineRef.current.dispose();
      engineRef.current = null;
    }
    setState("idle");
    setCountdown(0);
    setResult(null);
    setError(null);
  }, [clearTimer]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      clearTimer();
      engineRef.current?.dispose();
    };
  }, [clearTimer]);

  return {
    state,
    countdown,
    result,
    error,
    startRecording,
    stopEarly,
    reset,
  };
}
