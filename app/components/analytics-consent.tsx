"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Consent = "accepted" | "rejected" | null;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
};

const consentKey = "playaluna-analytics-consent";
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
    function gtag(...args: unknown[]) {
      target.dataLayer?.push(args);
    };
  return target as AnalyticsWindow & { gtag: (...args: unknown[]) => void };
}

const deniedConsent = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const pathname = usePathname();

  useEffect(() => {
    const stored = window.localStorage.getItem(consentKey);
    if (stored !== "accepted" && stored !== "rejected") return;
    const update = window.setTimeout(() => setConsent(stored), 0);
    return () => window.clearTimeout(update);
  }, []);

  useEffect(() => {
    if (!gaId || !isProductionHost()) return;
    const ga = analyticsWindow();

    ga.gtag("consent", "default", { ...deniedConsent, wait_for_update: 500 });

    if (!document.querySelector(`script[data-ga-id="${gaId}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      script.dataset.gaId = gaId;
      document.head.appendChild(script);
    }

    ga.gtag("js", new Date());
    ga.gtag("config", gaId, {
      cookie_flags: "SameSite=Lax;Secure",
      send_page_view: false,
    });
  }, []);

  useEffect(() => {
    if (!isProductionHost()) return;
    const ga = analyticsWindow();

    if (consent === "accepted" && gaId) {
      ga.gtag("consent", "update", {
        ...deniedConsent,
        analytics_storage: "granted",
      });
    }

    if (consent === "rejected") clearAnalyticsCookies();

    if (
      consent === "accepted" &&
      clarityId &&
      !document.querySelector(`script[data-clarity-id="${clarityId}"]`)
    ) {
      if (!ga.clarity) {
        const queue = ((...args: unknown[]) => {
          queue.q = queue.q ?? [];
          queue.q.push(args);
        }) as NonNullable<AnalyticsWindow["clarity"]>;
        ga.clarity = queue;
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
      script.dataset.clarityId = clarityId;
      document.head.appendChild(script);
    }
  }, [consent]);

  useEffect(() => {
    if (!gaId || !isProductionHost()) return;
    const ga = analyticsWindow();
    ga.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    if (!isProductionHost()) return;
    const ga = analyticsWindow();

    const trackClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-event]");
      const eventName = target?.dataset.event;
      if (!eventName) return;

      const isWhatsapp = eventName.startsWith("whatsapp_");
      const isPhone = eventName.startsWith("phone_");
      const normalizedEventName = isWhatsapp
        ? "whatsapp_click"
        : isPhone
          ? "phone_click"
          : eventName;

      if (isWhatsapp || isPhone) {
        const contactType = eventName.slice(eventName.indexOf("_") + 1);
        ga.gtag?.("event", normalizedEventName, { contact_type: contactType });
      } else {
        ga.gtag?.("event", normalizedEventName);
      }
      ga.clarity?.("event", eventName);
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(consentKey, value);
    setConsent(value);
  };

  if (consent !== null) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferenze cookie" aria-live="polite">
      <div>
        <p className="cookie-title">La tua privacy</p>
        <p>
          Usiamo Google Analytics in modalità anonima, senza cookie, per statistiche aggregate sul
          funzionamento del sito. Solo con il tuo consenso attiviamo cookie di misurazione e
          Microsoft Clarity per capire come migliorare la navigazione.
        </p>
        <a href="/cookie/">Scopri di più</a>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose("rejected")}>Solo necessari</button>
        <button className="accept" type="button" onClick={() => choose("accepted")}>Accetta</button>
      </div>
    </aside>
  );
}
