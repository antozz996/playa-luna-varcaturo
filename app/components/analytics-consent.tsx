"use client";

import { useEffect, useState } from "react";

type Consent = "accepted" | "rejected" | null;
type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
};

const consentKey = "playaluna-analytics-consent";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(consentKey);
    if (stored !== "accepted" && stored !== "rejected") return;
    const update = window.setTimeout(() => setConsent(stored), 0);
    return () => window.clearTimeout(update);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
    analyticsWindow.gtag = (...args: unknown[]) => {
      analyticsWindow.dataLayer?.push({ event: "gtag", arguments: args });
    };

    if (gaId && !document.querySelector(`script[data-ga-id="${gaId}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.dataset.gaId = gaId;
      document.head.appendChild(script);
      analyticsWindow.gtag("js", new Date());
      analyticsWindow.gtag("config", gaId, { anonymize_ip: true });
    }

    const trackClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-event]");
      if (!target?.dataset.event) return;
      analyticsWindow.gtag?.("event", target.dataset.event, {
        link_url: target instanceof HTMLAnchorElement ? target.href : undefined,
      });
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [consent]);

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
  };

  if (consent !== null) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferenze cookie" aria-live="polite">
      <div>
        <p className="cookie-title">La tua privacy</p>
        <p>Usiamo cookie tecnici e, solo con il tuo consenso, dati anonimi per capire come migliorare il sito.</p>
        <a href="/cookie/">Scopri di più</a>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose("rejected")}>Solo necessari</button>
        <button className="accept" type="button" onClick={() => choose("accepted")}>Accetta</button>
      </div>
    </aside>
  );
}
