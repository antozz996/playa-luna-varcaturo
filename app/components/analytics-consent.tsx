"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { readConsent, writeConsent, type ConsentValue } from "../lib/consent";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
};

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

const analyticsCookieNames = [
  "_ga",
  gaId ? `_ga_${gaId.replace(/^G-/, "")}` : null,
  "_gid",
  "_clck",
  "_clsk",
].filter((name): name is string => Boolean(name));

function deleteCookie(name: string) {
  const base = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  document.cookie = base;
  document.cookie = `${base}; domain=.playaluna.it`;
  document.cookie = `${base}; domain=playaluna.it`;
}

function clearAnalyticsCookies() {
  for (const name of analyticsCookieNames) deleteCookie(name);
}

function isProductionHost() {
  return (
    window.location.hostname === "playaluna.it" ||
    window.location.hostname === "www.playaluna.it"
  );
}

function analyticsWindow() {
  const target = window as AnalyticsWindow;
  target.dataLayer = target.dataLayer ?? [];
  target.gtag =
    target.gtag ??
    function gtag() {
      // gtag.js only processes the `arguments` object (as in Google's official snippet):
      // pushing a plain array is silently ignored and no data is ever sent.
      // eslint-disable-next-line prefer-rest-params
      target.dataLayer?.push(arguments as unknown as unknown[]);
    };
  return target as AnalyticsWindow & { gtag: (...args: unknown[]) => void };
}

function injectScript(src: string, dataKey: string, dataValue: string) {
  if (document.querySelector(`script[data-${dataKey}="${dataValue}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.setAttribute(`data-${dataKey}`, dataValue);
  document.head.appendChild(script);
}

/**
 * Google Analytics: loaded ONLY after consent (Consent Mode "basic").
 * Nothing is sent to Google before the visitor accepts.
 */
function startGoogleAnalytics() {
  if (!gaId) return;
  const ga = analyticsWindow();
  ga.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  ga.gtag("js", new Date());
  ga.gtag("config", gaId, { cookie_flags: "SameSite=Lax;Secure", send_page_view: false });
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`, "ga-id", gaId);
}

/** Microsoft Clarity: loaded only after consent, with the consentv2 signal required for EEA visitors. */
function startClarity() {
  if (!clarityId) return;
  const ga = analyticsWindow();
  if (!ga.clarity) {
    const queue = ((...args: unknown[]) => {
      queue.q = queue.q ?? [];
      queue.q.push(args);
    }) as NonNullable<AnalyticsWindow["clarity"]>;
    ga.clarity = queue;
  }
  ga.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
  injectScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`, "clarity-id", clarityId);
}

function stopAnalytics() {
  const ga = window as AnalyticsWindow;
  ga.gtag?.("consent", "update", { analytics_storage: "denied" });
  ga.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
  clearAnalyticsCookies();
}

/**
 * data-event naming: <channel>_<department>[_<placement>], e.g. whatsapp_events_float.
 * Sent as one event per channel with department and placement as separate parameters.
 */
function describeClick(eventName: string) {
  const [channel, rawDepartment, rawPlacement] = eventName.split("_");
  if (channel !== "whatsapp" && channel !== "phone") return { name: eventName, params: {} };
  // Legacy name: whatsapp_sticky = beach booking from the floating button.
  const department = rawDepartment === "sticky" ? "beach" : rawDepartment;
  const placement = rawDepartment === "sticky" ? "float" : rawPlacement ?? "inline";
  return {
    name: channel === "whatsapp" ? "whatsapp_click" : "phone_click",
    params: { department, placement, link_id: eventName },
  };
}

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  // The stored choice is only readable in the browser: render nothing until it has been read,
  // so visitors who already chose never see the banner flash.
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = readConsent();
    const update = window.setTimeout(() => {
      setConsent(stored);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(update);
  }, []);

  useEffect(() => {
    if (!isProductionHost()) return;
    if (consent === "accepted") {
      startGoogleAnalytics();
      startClarity();
    } else if (consent === "rejected") {
      stopAnalytics();
    }
  }, [consent]);

  useEffect(() => {
    if (consent !== "accepted" || !gaId || !isProductionHost()) return;
    analyticsWindow().gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, consent]);

  useEffect(() => {
    if (consent !== "accepted" || !isProductionHost()) return;
    const ga = analyticsWindow();

    const trackClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-event]");
      const eventName = target?.dataset.event;
      if (!eventName) return;
      const { name, params } = describeClick(eventName);
      ga.gtag("event", name, params);
      ga.clarity?.("event", eventName);
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [consent]);

  const choose = (value: ConsentValue) => {
    writeConsent(value);
    setConsent(value);
  };

  if (!hydrated || consent !== null) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferenze cookie">
      <button
        type="button"
        className="cookie-close"
        onClick={() => choose("rejected")}
        aria-label="Chiudi: continua senza cookie di analisi"
      >
        <span aria-hidden="true">×</span>
      </button>
      <div>
        <p className="cookie-title">La tua privacy</p>
        <p>
          Con il tuo consenso usiamo Google Analytics e Microsoft Clarity per capire come viene
          usato il sito. Senza consenso nessuno dei due viene attivato.
        </p>
        <p className="cookie-links">
          <a href="/cookie">Cookie policy</a>
          <a href="/privacy">Privacy</a>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose("rejected")}>Rifiuta</button>
        <button className="accept" type="button" onClick={() => choose("accepted")}>Accetta</button>
      </div>
    </aside>
  );
}
