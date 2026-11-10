"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { readConsent, writeConsent, type ConsentValue } from "../lib/consent";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  fbq?: MetaPixel;
  _fbq?: MetaPixel;
};

type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: MetaPixel;
  loaded: boolean;
  version: string;
};

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();
/** Meta Pixel (dataset "Playa Luna – sito", portfolio Playa Luna Beach & Wedding). Public ID. */
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1431239211986258";

const analyticsCookieNames = [
  "_ga",
  gaId ? `_ga_${gaId.replace(/^G-/, "")}` : null,
  "_gid",
  "_clck",
  "_clsk",
  "_fbp",
  "_fbc",
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

/**
 * Meta Pixel: loaded only after consent (official snippet, rewritten without document.write).
 * PageView is sent by the page-view effect, so client-side navigations are counted too.
 */
function startMetaPixel() {
  if (!metaPixelId) return;
  const w = window as AnalyticsWindow;
  if (!w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as MetaPixel;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    w.fbq = fbq;
    w._fbq = w._fbq ?? fbq;
    w.fbq("init", metaPixelId);
  }
  w.fbq("consent", "grant");
  injectScript("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel", metaPixelId);
}

/** Pages whose visit is a ViewContent for Meta (interest in the restaurant). */
const metaViewContentPages: Record<string, string> = {
  "/menu-ristorante": "menu",
  "/en/menu": "menu",
};

/**
 * WhatsApp/phone clicks: Lead for events and weddings (quote requests), Contact otherwise.
 * The department travels as content_category to build audiences per area.
 */
function trackMetaClick(eventName: string) {
  const w = window as AnalyticsWindow;
  if (!w.fbq) return;
  const { name, params } = describeClick(eventName);
  if (name !== "whatsapp_click" && name !== "phone_click") return;
  const department = (params as { department?: string }).department ?? "general";
  const channel = name === "whatsapp_click" ? "whatsapp" : "phone";
  const isLead = department === "events" || department === "wedding";
  w.fbq("track", isLead ? "Lead" : "Contact", { content_category: department, content_name: channel });
}

function stopAnalytics() {
  const ga = window as AnalyticsWindow;
  ga.gtag?.("consent", "update", { analytics_storage: "denied" });
  ga.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
  ga.fbq?.("consent", "revoke");
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

const bannerText = {
  it: {
    aria: "Preferenze cookie",
    close: "Chiudi: continua senza cookie facoltativi",
    title: "La tua privacy",
    body: "Con il tuo consenso usiamo Google Analytics e Microsoft Clarity per capire come viene usato il sito, e il Pixel di Meta per misurare e mostrare le nostre inserzioni su Facebook e Instagram. Senza consenso nessuno di questi strumenti viene attivato.",
    cookie: { href: "/cookie", label: "Cookie policy" },
    privacy: { href: "/privacy", label: "Privacy" },
    reject: "Rifiuta",
    accept: "Accetta",
  },
  en: {
    aria: "Cookie preferences",
    close: "Close: continue without optional cookies",
    title: "Your privacy",
    body: "With your consent we use Google Analytics and Microsoft Clarity to understand how the site is used, and the Meta Pixel to measure and show our ads on Facebook and Instagram. Without consent none of these tools is turned on.",
    cookie: { href: "/en/cookie", label: "Cookie policy" },
    privacy: { href: "/en/privacy", label: "Privacy" },
    reject: "Reject",
    accept: "Accept",
  },
};

export function AnalyticsConsent({ locale = "it" }: { locale?: "it" | "en" }) {
  const text = bannerText[locale];
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
      startMetaPixel();
    } else if (consent === "rejected") {
      stopAnalytics();
    }
  }, [consent]);

  useEffect(() => {
    if (consent !== "accepted" || !isProductionHost()) return;
    if (gaId) {
      analyticsWindow().gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    const fbq = (window as AnalyticsWindow).fbq;
    if (fbq) {
      fbq("track", "PageView");
      const content = metaViewContentPages[pathname];
      if (content) fbq("track", "ViewContent", { content_name: content, content_category: "restaurant" });
    }
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
      trackMetaClick(eventName);
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
    <aside className="cookie-banner" aria-label={text.aria}>
      <button
        type="button"
        className="cookie-close"
        onClick={() => choose("rejected")}
        aria-label={text.close}
      >
        <span aria-hidden="true">×</span>
      </button>
      <div>
        <p className="cookie-title">{text.title}</p>
        <p>{text.body}</p>
        <p className="cookie-links">
          <a href={text.cookie.href}>{text.cookie.label}</a>
          <a href={text.privacy.href}>{text.privacy.label}</a>
        </p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose("rejected")}>{text.reject}</button>
        <button className="accept" type="button" onClick={() => choose("accepted")}>{text.accept}</button>
      </div>
    </aside>
  );
}
