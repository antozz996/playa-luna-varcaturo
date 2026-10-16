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
    if (consent !== "accepted") return;

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
    analyticsWindow.gtag =
      analyticsWindow.gtag ??
      function gtag(...args: unknown[]) {
        analyticsWindow.dataLayer?.push(arguments as unknown as unknown[]);
      };

    const isProductionHost =
      window.location.hostname === "playaluna.it" ||
      window.location.hostname === "www.playaluna.it";

    if (isProductionHost && gaId && !document.querySelector(`script[data-ga-id="${gaId}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      script.dataset.gaId = gaId;
      document.head.appendChild(script);
      analyticsWindow.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      analyticsWindow.gtag("js", new Date());
      analyticsWindow.gtag("config", gaId, {
        anonymize_ip: true,
        send_page_view: false,
      });
    }

    if (isProductionHost && clarityId && !document.querySelector(`script[data-clarity-id="${clarityId}"]`)) {
      if (!analyticsWindow.clarity) {
        const queue = ((...args: unknown[]) => {
          queue.q = queue.q ?? [];
          queue.q.push(args);
        }) as NonNullable<AnalyticsWindow["clarity"]>;
        analyticsWindow.clarity = queue;
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
      script.dataset.clarityId = clarityId;
      document.head.appendChild(script);
    }

    analyticsWindow.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });

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
        analyticsWindow.gtag?.("event", normalizedEventName, { contact_type: contactType });
      } else {
        analyticsWindow.gtag?.("event", normalizedEventName);
      }
      analyticsWindow.clarity?.("event", eventName);
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [consent, pathname]);

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
          Usiamo strumenti di analisi, inclusi Google Analytics e Microsoft Clarity, solo con il tuo
          consenso. Puoi proseguire con i soli cookie necessari.
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
