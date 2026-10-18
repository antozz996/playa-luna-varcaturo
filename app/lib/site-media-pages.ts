import "server-only";

import { head } from "@vercel/blob";

export const SITE_MEDIA_PAGES = {
  beachClub: {
    title: "Beach Club", href: "/beach-club/", documentType: "beachMedia",
    slots: {
      hero: { label: "Hero", location: "Immagine grande di apertura.", fallback: "/images/playa-luna/beach-day.webp" },
      detail: { label: "Foto dettaglio", location: "Foto verticale nella sezione informazioni.", fallback: "/images/playa-luna/beachclub/detail-dsc00166.webp" },
    },
  },
  ristorante: {
    title: "Ristorante", href: "/ristorante-sul-mare/", documentType: "restaurantMedia",
    slots: {
      hero: { label: "Hero", location: "Immagine grande di apertura.", fallback: "/images/playa-luna/restaurant/hero-2f8a7552.webp" },
      detail: { label: "Foto dettaglio", location: "Foto verticale nella sezione informazioni.", fallback: "/images/playa-luna/food-pasta.webp" },
    },
  },
  piscina: {
    title: "Piscina", href: "/piscina/", documentType: "poolMedia",
    slots: {
      hero: { label: "Hero", location: "Immagine grande di apertura.", fallback: "/images/playa-luna/pool-family.webp" },
      detail: { label: "Foto dettaglio", location: "Foto verticale nella sezione informazioni.", fallback: "/images/playa-luna/pool-detail-2f8a1100.webp" },
    },
  },
  eventi: {
    title: "Eventi", href: "/eventi/", documentType: "eventsMedia",
    slots: {
      hero: { label: "Hero", location: "Immagine grande di apertura.", fallback: "/images/playa-luna/events/hero.webp" },
      gallery01: { label: "Gallery 01", location: "Prima foto grande della gallery.", fallback: "/images/playa-luna/events/gathering.webp" },
      gallery02: { label: "Gallery 02", location: "Seconda foto della gallery.", fallback: "/images/playa-luna/events/night-01.webp" },
      gallery03: { label: "Gallery 03", location: "Terza foto della gallery.", fallback: "/images/playa-luna/events/night-02.webp" },
      gallery04: { label: "Gallery 04", location: "Quarta foto della gallery.", fallback: "/images/playa-luna/events/night-03.webp" },
      gallery05: { label: "Gallery 05", location: "Quinta foto della gallery.", fallback: "/images/playa-luna/events/night-04.webp" },
      gallery06: { label: "Gallery 06", location: "Sesta foto della gallery.", fallback: "/images/playa-luna/events/night-05.webp" },
      gallery07: { label: "Gallery 07", location: "Foto grande del buffet.", fallback: "/images/playa-luna/events/gallery-07-2f8a1650.webp" },
      gallery08: { label: "Gallery 08", location: "Ottava foto della gallery.", fallback: "/images/playa-luna/events/night-06.webp" },
      gallery09: { label: "Gallery 09", location: "Foto grande finale della gallery.", fallback: "/images/playa-luna/events/corporate.webp" },
    },
  },
  wedding: {
    title: "Wedding", href: "/wedding/", documentType: "weddingMedia",
    slots: {
      hero: { label: "Hero", location: "Immagine grande di apertura.", fallback: "/images/playa-luna/wedding/hero.webp" },
      gallery01: { label: "Gallery 01", location: "Primo dettaglio wedding.", fallback: "/images/playa-luna/wedding/place-setting.webp" },
      gallery02: { label: "Gallery 02", location: "Secondo dettaglio wedding.", fallback: "/images/playa-luna/wedding/flowers.webp" },
      gallery03: { label: "Gallery 03", location: "Terzo dettaglio wedding.", fallback: "/images/playa-luna/wedding/sea-table.webp" },
      gallery04: { label: "Gallery 04", location: "Quarto dettaglio wedding.", fallback: "/images/playa-luna/wedding/table-by-sea.webp" },
      gallery05: { label: "Gallery 05", location: "Quinto dettaglio wedding.", fallback: "/images/playa-luna/wedding/white-table.webp" },
      closing: { label: "Immagine finale", location: "Foto accanto alla CTA finale.", fallback: "/images/playa-luna/wedding/closing-2f8a6584.webp" },
    },
  },
} as const;

export type SiteMediaPage = keyof typeof SITE_MEDIA_PAGES;

// Cards intentionally removed from the public site. Keeping this list separate
// from the media assets makes the change reversible without deleting source files.
export const HIDDEN_SITE_MEDIA_SLOTS: Partial<Record<SiteMediaPage, readonly string[]>> = {
  eventi: ["gallery03", "gallery04", "gallery05"],
  wedding: ["gallery04"],
};

export function isSiteMediaPage(value: string): value is SiteMediaPage {
  return Object.hasOwn(SITE_MEDIA_PAGES, value);
}

export function isSiteMediaSlot(page: SiteMediaPage, slot: string) {
  return Object.hasOwn(SITE_MEDIA_PAGES[page].slots, slot);
}

export function isSiteMediaSlotHidden(page: SiteMediaPage, slot: string) {
  return HIDDEN_SITE_MEDIA_SLOTS[page]?.includes(slot) ?? false;
}

export function siteMediaPath(page: SiteMediaPage, slot: string, type: "image" | "video" = "image") {
  return `playa-luna/pages/${page}/${slot}.${type === "video" ? "mp4" : "webp"}`;
}

async function getPageAssets(page: SiteMediaPage, type: "image" | "video") {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return {};
  const entries = await Promise.all(Object.keys(SITE_MEDIA_PAGES[page].slots).map(async (slot) => {
    try { return [slot, (await head(siteMediaPath(page, slot, type))).url] as const; } catch { return null; }
  }));
  return Object.fromEntries(entries.filter((entry): entry is readonly [string, string] => entry !== null));
}

export const getPageBlobMedia = (page: SiteMediaPage) => getPageAssets(page, "image");
export const getPageBlobVideos = (page: SiteMediaPage) => getPageAssets(page, "video");
