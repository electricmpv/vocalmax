"use client";

import { useEffect, useState } from "react";
import { Download, Link2, X, Loader2, CheckCircle2 } from "lucide-react";
import { useShareCard } from "../../hooks/useShareCard";
import type { ShareCardData } from "../../lib/share-card-renderer";

interface Props {
  data: ShareCardData;
  onClose: () => void;
}

export function ShareModal({ data, onClose }: Props) {
  const { isGenerating, previewUrl, generate, download, copyLink, cleanup } =
    useShareCard();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generate(data);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    const ok = await copyLink(data);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl p-6 pb-10"
        style={{ background: "var(--color-surface)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 拖动指示条 */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold text-base">分享你的成绩</h2>
          <button onClick={onClose} className="active:opacity-75">
            <X className="w-5 h-5" style={{ color: "var(--color-muted)" }} />
          </button>
        </div>

        {/* 分享卡预览 */}
        <div
          className="rounded-2xl overflow-hidden mb-5 flex items-center justify-center"
          style={{
            background: "var(--color-surface-2)",
            aspectRatio: "9/16",
            maxHeight: "45vh",
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
              alt="分享卡预览"
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3">
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
      </div>
    </div>
  );
}
