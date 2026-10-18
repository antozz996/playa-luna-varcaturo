import type { HomeMediaSlot } from "./site-media";

export const HOME_MEDIA_PRESENTATION: Record<HomeMediaSlot, { area: string; location: string; fallback: string; format: string }> = {
  hero: { area: "Apertura", location: "Immagine a tutto schermo dietro il titolo iniziale.", fallback: "/images/playa-luna/hero-beach.webp", format: "Orizzontale · full screen" },
  experienceRestaurant: { area: "Esperienze", location: "Prima card: Food & Drink.", fallback: "/images/playa-luna/restaurant.webp", format: "Verticale · card 01" },
  experienceBeach: { area: "Esperienze", location: "Card centrale: Beach Club.", fallback: "/images/playa-luna/beach-card-2f8a3359.webp", format: "Verticale · card 02" },
  experienceEvents: { area: "Esperienze", location: "Terza card: Events.", fallback: "/images/playa-luna/events/home-card.webp", format: "Verticale · card 03" },
  beachMain: { area: "Beach Club", location: "Foto grande accanto al testo “La tua estate”.", fallback: "/images/playa-luna/beach-day.webp", format: "Verticale · grande" },
  beachDetail: { area: "Beach Club", location: "Riquadro piccolo a destra della foto grande.", fallback: "/images/playa-luna/beach-detail-2f8a3953.webp", format: "Verticale · piccolo" },
  restaurantMain: { area: "Ristorante", location: "Foto grande a sinistra nella gallery del ristorante.", fallback: "/images/playa-luna/restaurant.webp", format: "Verticale · grande" },
  foodOne: { area: "Ristorante", location: "Primo riquadro piccolo della gallery food.", fallback: "/images/playa-luna/food-tartare.webp", format: "Verticale · piatto 01" },
  foodTwo: { area: "Ristorante", location: "Secondo riquadro piccolo della gallery food.", fallback: "/images/playa-luna/food-pasta.webp", format: "Verticale · piatto 02" },
  foodThree: { area: "Ristorante", location: "Terzo riquadro piccolo della gallery food.", fallback: "/images/playa-luna/food-three-2f8a7368.webp", format: "Verticale · piatto 03" },
  poolMain: { area: "Piscina", location: "Foto grande a sinistra della sezione piscina.", fallback: "/images/playa-luna/pool-family.webp", format: "Orizzontale · grande" },
  poolDetail: { area: "Piscina", location: "Foto più stretta a destra della sezione piscina.", fallback: "/images/playa-luna/pool-detail-2f8a5583.webp", format: "Verticale · dettaglio" },
  eventsFeature: { area: "Eventi", location: "Foto grande dell’allestimento nella sezione Events.", fallback: "/images/playa-luna/events/home-feature.webp", format: "Orizzontale · grande" },
  finalCta: { area: "Chiusura", location: "Sfondo a tutto schermo della CTA “Ci vediamo al mare?”.", fallback: "/images/playa-luna/final-cta-2f8a5852.webp", format: "Orizzontale · full screen" },
};
