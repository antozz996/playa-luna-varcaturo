"use client";

import { useEffect } from "react";

const STORAGE_KEY = "playaluna-source";

const utmCodes: Record<string, string> = {
  instagram: "IG",
  ig: "IG",
  facebook: "FB",
  fb: "FB",
  google: "GOOGLE",
  qr: "QR",
  tiktok: "TIKTOK",
  newsletter: "NEWS",
};

/** Short, non-personal code describing where this visit came from. */
function detectSource(): string {
  const params = new URLSearchParams(window.location.search);
  const utm = (params.get("utm_source") || "").toLowerCase().trim();
  if (utm) return utmCodes[utm] ?? utm.replace(/[^a-z0-9]/g, "").slice(0, 10).toUpperCase();

  let host = "";
  try {
    host = document.referrer ? new URL(document.referrer).hostname : "";
  } catch {
    host = "";
  }
  if (!host || host.endsWith("playaluna.it") || host === window.location.hostname) return "";
  if (/(^|\.)google\./.test(host)) return "GOOGLE";
  if (/instagram\.com$/.test(host)) return "IG";
  if (/(facebook\.com|fb\.com|fb\.me)$/.test(host)) return "FB";
  if (/(bing\.com|duckduckgo\.com|yahoo\.)/.test(host)) return "WEB";
  if (/(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com)$/.test(host)) return "AI";
  return "WEB";
}

function readStored() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function store(code: string) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Storage unavailable: the code is still used for this page.
  }
}

/**
 * Appends a source code (e.g. " [IG]") to pre-filled WhatsApp messages when a wa.me link
 * is clicked, so the staff can see where each booking request comes from.
 * The code stays on the visitor's device (sessionStorage) until they choose to send the message.
 */
export function WhatsappSource() {
  useEffect(() => {
    const detected = detectSource();
    const code = detected || readStored() || "SITO";
    if (detected || !readStored()) store(code);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="https://wa.me/"]');
      if (!link) return;
      try {
        const url = new URL(link.href);
        const text = url.searchParams.get("text") || "";
        if (/\[[A-Z0-9]+\]\s*$/.test(text)) return;
        url.searchParams.set("text", `${text}\n[${readStored() || code}]`);
        link.href = url.toString();
      } catch {
        // Leave the link untouched.
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
