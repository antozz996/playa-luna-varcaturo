// Languages: Italian (default, full site) and English (/en, reduced version).
import type { Metadata } from "next";
import {
  beachWhatsapp,
  eventWhatsapp,
  restaurantWhatsapp,
  siteUrl,
  weddingWhatsapp,
} from "./site";

export type Locale = "it" | "en";

/** Italian path → English path, for the pages that exist in both languages. */
export const pathPairs: Record<string, string> = {
  "/": "/en",
  "/beach-club": "/en/beach-club",
  "/ristorante-sul-mare": "/en/restaurant",
  "/menu-ristorante": "/en/menu",
  "/contatti": "/en/contact",
  "/privacy": "/en/privacy",
  "/cookie": "/en/cookie",
};

const englishToItalian = Object.fromEntries(Object.entries(pathPairs).map(([it, en]) => [en, it]));

/** The same page in the other language (falls back to the other language's home). */
export function otherLanguagePath(locale: Locale, path: string) {
  return locale === "it" ? pathPairs[path] ?? "/en" : englishToItalian[path] ?? "/";
}

/** canonical + hreflang alternates for a page available in both languages. */
export function languageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const it = locale === "it" ? path : englishToItalian[path];
  const en = locale === "en" ? path : pathPairs[path];
  if (!it || !en) return { canonical: path };
  const absolute = (p: string) => (p === "/" ? siteUrl : `${siteUrl}${p}`);
  return {
    canonical: path,
    languages: { it: absolute(it), en: absolute(en), "x-default": absolute(it) },
  };
}

function whatsapp(number: string, lines: string[]) {
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/** WhatsApp links with pre-filled messages in the visitor's language. */
export const whatsappLinks: Record<Locale, { beach: string; restaurant: string; events: string; wedding: string }> = {
  it: { beach: beachWhatsapp, restaurant: restaurantWhatsapp, events: eventWhatsapp, wedding: weddingWhatsapp },
  en: {
    beach: whatsapp("393271915427", ["Hi Playa Luna, I'd like to book at the beach.", "Date: ", "People: ", "Umbrella or sunbeds: "]),
    restaurant: whatsapp("393924053169", ["Hi Playa Luna, I'd like to book a table for lunch.", "Date: ", "Time: ", "People: "]),
    events: whatsapp("393505908393", ["Hi Playa Luna, I'd like information about an event.", "Type of event: ", "Date or period: ", "Guests: "]),
    wedding: whatsapp("393505908393", ["Hi Playa Luna, we are planning our wedding.", "Date or period: ", "Guests: ", "Indicative budget: "]),
  },
};

type NavItem = { href: string; label: string; note?: string };

/** Interface strings shared by header, footer, dialog, banner and page components. */
export const ui = {
  it: {
    skipLink: "Vai al contenuto",
    homeLabel: "Playa Luna, torna alla homepage",
    mainNav: "Navigazione principale",
    mobileNav: "Navigazione mobile",
    menu: "Menu",
    book: "Prenota",
    languageSwitch: { label: "EN", aria: "English version" },
    nav: [
      { href: "/beach-club", label: "Spiaggia" },
      { href: "/ristorante-sul-mare", label: "Ristorante" },
      { href: "/piscina", label: "Piscina" },
      { href: "/eventi", label: "Eventi" },
      { href: "/wedding", label: "Wedding" },
      { href: "/contatti", label: "Contatti" },
    ] as NavItem[],
    dialog: {
      eyebrow: "Playa Luna / Prenotazioni",
      close: "Chiudi il popup",
      title: "Cosa vuoi prenotare?",
      intro: "Scegli il reparto da contattare.",
      beach: "Spiaggia",
      restaurant: "Ristorante",
      events: "Eventi e matrimoni",
      call: "Chiama",
    },
    footer: {
      tagline: "Beach club · Ristorante · Eventi",
      where: "Dove siamo",
      contacts: "Contatti",
      follow: "Seguici",
      beach: "Spiaggia",
      restaurant: "Ristorante",
      events: "Eventi",
      vat: "P.IVA",
      privacy: "/privacy",
      cookie: "/cookie",
      motto: "Pensato con il Mediterraneo nel cuore.",
    },
    breadcrumbHome: "Home",
    info: "Informazioni",
    quickInfo: "Info rapide",
    seeMenu: "Consulta il menu",
    faqEyebrow: "Informazioni utili",
    faqTitle: "Domande frequenti",
    featuresOf: "Caratteristiche",
    floatBook: "Prenota",
    defaultCta: "Chiedi informazioni",
  },
  en: {
    skipLink: "Skip to content",
    homeLabel: "Playa Luna, back to the home page",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    menu: "Menu",
    book: "Book",
    languageSwitch: { label: "IT", aria: "Versione italiana" },
    nav: [
      { href: "/en/beach-club", label: "Beach club" },
      { href: "/en/restaurant", label: "Restaurant" },
      { href: "/en/menu", label: "Menu" },
      { href: "/piscina", label: "Pool", note: "in Italian" },
      { href: "/eventi", label: "Events", note: "in Italian" },
      { href: "/wedding", label: "Weddings", note: "in Italian" },
      { href: "/en/contact", label: "Contact" },
    ] as NavItem[],
    dialog: {
      eyebrow: "Playa Luna / Bookings",
      close: "Close",
      title: "What would you like to book?",
      intro: "Choose who to contact.",
      beach: "Beach",
      restaurant: "Restaurant",
      events: "Events and weddings",
      call: "Call",
    },
    footer: {
      tagline: "Beach club · Restaurant · Events",
      where: "Find us",
      contacts: "Contacts",
      follow: "Follow us",
      beach: "Beach",
      restaurant: "Restaurant",
      events: "Events",
      vat: "VAT",
      privacy: "/en/privacy",
      cookie: "/en/cookie",
      motto: "Made with the Mediterranean at heart.",
    },
    breadcrumbHome: "Home",
    info: "Good to know",
    quickInfo: "Quick info",
    seeMenu: "See the menu",
    faqEyebrow: "Good to know",
    faqTitle: "Frequently asked questions",
    featuresOf: "Features of",
    floatBook: "Book",
    defaultCta: "Ask us",
  },
} as const;
