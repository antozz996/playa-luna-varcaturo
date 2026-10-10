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
