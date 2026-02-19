"use client";

import { useState, useCallback } from "react";
import { renderShareCard, buildShareUrl, type ShareCardData } from "../lib/share-card-renderer";

export function useShareCard() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blobRef, setBlobRef] = useState<Blob | null>(null);

  const generate = useCallback(async (data: ShareCardData) => {
    setIsGenerating(true);
    try {
      const blob = await renderShareCard(data);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setBlobRef(blob);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const download = useCallback(() => {
    if (!blobRef) return;
    const url = URL.createObjectURL(blobRef);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vocalmax-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [blobRef]);

  const copyLink = useCallback(async (data: ShareCardData) => {
    const appUrl =
      typeof window !== "undefined" ? window.location.origin : "";
    const link = buildShareUrl(data, appUrl);
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch {
      return false;
    }
  }, []);

  const cleanup = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setBlobRef(null);
  }, [previewUrl]);

  return { isGenerating, previewUrl, generate, download, copyLink, cleanup };
}
