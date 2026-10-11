"use client";

import { useState } from "react";

export default function ShareButton({ root }: { root: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/dictionary/${encodeURIComponent(root)}`;

    // Native share sheet on touch devices (phones/tablets)
    if (navigator.share && navigator.maxTouchPoints > 0) {
      try {
        await navigator.share({ title: `${root} | Bahasa Builder`, url });
        return;
      } catch (e) {
        // User closed the share sheet: do nothing
        if (e instanceof DOMException && e.name === "AbortError") return;
        // Any other failure: fall through to copying the link
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="text-xs font-mono uppercase tracking-widest border border-current px-3 py-1.5 hover:opacity-70"
    >
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
