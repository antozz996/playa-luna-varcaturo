import "server-only";

import { head } from "@vercel/blob";

export const HOME_MEDIA_SLOTS = {
  hero: {
    label: "Hero principale",
    description: "La grande immagine di apertura della homepage.",
    pathname: "playa-luna/home/hero.webp",
  },
  experienceRestaurant: {
    label: "Card Food & Drink",
    description: "La prima card sotto il manifesto della homepage.",
    pathname: "playa-luna/home/experience-restaurant.webp",
  },
  experienceBeach: {
    label: "Card Beach Club",
    description: "La card centrale delle esperienze.",
    pathname: "playa-luna/home/experience-beach.webp",
  },
  experienceEvents: {
    label: "Card Eventi",
    description: "La terza card delle esperienze.",
    pathname: "playa-luna/home/experience-events.webp",
  },
  beachMain: {
    label: "Beach Club — foto grande",
    description: "La foto verticale grande della sezione “La tua estate”.",
    pathname: "playa-luna/home/beach-main.webp",
  },
  beachDetail: {
    label: "Beach Club — foto piccola",
    description: "Il riquadro verticale piccolo a destra: è quello richiesto ora.",
    pathname: "playa-luna/home/beach-detail.webp",
  },
  restaurantMain: {
    label: "Ristorante — foto grande",
    description: "La foto principale della sezione ristorante.",
    pathname: "playa-luna/home/restaurant-main.webp",
  },
  foodOne: {
    label: "Ristorante — piatto 1",
    description: "Il primo dettaglio della gallery food.",
    pathname: "playa-luna/home/food-one.webp",
  },
  foodTwo: {
    label: "Ristorante — piatto 2",
    description: "Il secondo dettaglio della gallery food.",
    pathname: "playa-luna/home/food-two.webp",
  },
  foodThree: {
    label: "Ristorante — piatto 3",
    description: "Il terzo dettaglio della gallery food.",
    pathname: "playa-luna/home/food-three.webp",
  },
  poolMain: {
    label: "Piscina — foto grande",
    description: "La foto principale della sezione piscina.",
    pathname: "playa-luna/home/pool-main.webp",
  },
  poolDetail: {
    label: "Piscina — foto dettaglio",
    description: "La seconda foto della sezione piscina.",
    pathname: "playa-luna/home/pool-detail.webp",
  },
  eventsFeature: {
    label: "Eventi — foto principale",
    description: "La foto dell’allestimento della sezione eventi.",
    pathname: "playa-luna/home/events-feature.webp",
  },
  finalCta: {
    label: "CTA finale",
    description: "Lo sfondo della sezione finale “Ci vediamo al mare?”.",
    pathname: "playa-luna/home/final-cta.webp",
  },
} as const;

export type HomeMediaSlot = keyof typeof HOME_MEDIA_SLOTS;

/**
 * This is intentionally separate from the storage configuration: it is the
 * plain-language map shown in the private media desk, so nobody has to guess
 * where a card appears on the homepage.
 */
export const HOME_MEDIA_PRESENTATION: Record<HomeMediaSlot, { area: string; location: string; fallback: string; format: string }> = {
  hero: { area: "Apertura", location: "Immagine a tutto schermo dietro il titolo iniziale.", fallback: "/images/playa-luna/hero-beach.webp", format: "Orizzontale · full screen" },
  experienceRestaurant: { area: "Esperienze", location: "Prima card: Food & Drink.", fallback: "/images/playa-luna/restaurant.webp", format: "Verticale · card 01" },
  experienceBeach: { area: "Esperienze", location: "Card centrale: Beach Club.", fallback: "/images/playa-luna/beach-day.webp", format: "Verticale · card 02" },
  experienceEvents: { area: "Esperienze", location: "Terza card: Events.", fallback: "/images/playa-luna/events/home-card.webp", format: "Verticale · card 03" },
  beachMain: { area: "Beach Club", location: "Foto grande accanto al testo “La tua estate”.", fallback: "/images/playa-luna/beach-day.webp", format: "Verticale · grande" },
  beachDetail: { area: "Beach Club", location: "Riquadro piccolo a destra della foto grande.", fallback: "/images/playa-luna/beach-detail-2f8a3953.jpg", format: "Verticale · piccolo" },
  restaurantMain: { area: "Ristorante", location: "Foto grande a sinistra nella gallery del ristorante.", fallback: "/images/playa-luna/restaurant.webp", format: "Verticale · grande" },
  foodOne: { area: "Ristorante", location: "Primo riquadro piccolo della gallery food.", fallback: "/images/playa-luna/food-tartare.webp", format: "Verticale · piatto 01" },
  foodTwo: { area: "Ristorante", location: "Secondo riquadro piccolo della gallery food.", fallback: "/images/playa-luna/food-pasta.webp", format: "Verticale · piatto 02" },
  foodThree: { area: "Ristorante", location: "Terzo riquadro piccolo della gallery food.", fallback: "/images/playa-luna/food-fish.webp", format: "Verticale · piatto 03" },
  poolMain: { area: "Piscina", location: "Foto grande a sinistra della sezione piscina.", fallback: "/images/playa-luna/pool-family.webp", format: "Orizzontale · grande" },
  poolDetail: { area: "Piscina", location: "Foto più stretta a destra della sezione piscina.", fallback: "/images/playa-luna/pool-chair.webp", format: "Verticale · dettaglio" },
  eventsFeature: { area: "Eventi", location: "Foto grande dell’allestimento nella sezione Events.", fallback: "/images/playa-luna/events/home-feature.webp", format: "Orizzontale · grande" },
  finalCta: { area: "Chiusura", location: "Sfondo a tutto schermo della CTA “Ci vediamo al mare?”.", fallback: "/images/playa-luna/pool-chair.webp", format: "Orizzontale · full screen" },
};

export function homeMediaVideoPath(slot: HomeMediaSlot) {
  return HOME_MEDIA_SLOTS[slot].pathname.replace(/\.webp$/, ".mp4");
}

export function isHomeMediaSlot(value: string): value is HomeMediaSlot {
  return Object.hasOwn(HOME_MEDIA_SLOTS, value);
}

export async function getHomeBlobMedia(): Promise<Partial<Record<HomeMediaSlot, string>>> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return {};

  const entries = await Promise.all(
    Object.entries(HOME_MEDIA_SLOTS).map(async ([slot, config]) => {
      try {
        const blob = await head(config.pathname);
        return [slot as HomeMediaSlot, blob.url] as const;
      } catch {
        return null;
      }
    }),
  );

  return Object.fromEntries(entries.filter((entry): entry is readonly [HomeMediaSlot, string] => entry !== null));
}

export async function getHomeBlobVideos(): Promise<Partial<Record<HomeMediaSlot, string>>> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return {};

  const entries = await Promise.all(
    (Object.keys(HOME_MEDIA_SLOTS) as HomeMediaSlot[]).map(async (slot) => {
      try {
        const blob = await head(homeMediaVideoPath(slot));
        return [slot, blob.url] as const;
      } catch {
        return null;
      }
    }),
  );

  return Object.fromEntries(entries.filter((entry): entry is readonly [HomeMediaSlot, string] => entry !== null));
}
