import { defineField, defineType } from "sanity";

const mediaField = (
  name: string,
  title: string,
  fallback: string,
  options: { caption?: boolean } = {},
) =>
  defineField({
    name,
    title,
    type: "managedImage",
    description: `Immagine attuale: ${fallback}. Carica una nuova foto solo quando vuoi sostituirla.`,
    options: { caption: options.caption },
  });

const managedImage = defineType({
  name: "managedImage",
  title: "Foto",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Descrizione accessibile",
      type: "string",
      description: "Descrivi brevemente ciò che si vede nella foto.",
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: "caption",
      title: "Didascalia",
      type: "string",
      description: "Facoltativa. Usata nelle gallerie Eventi e Wedding.",
      validation: (Rule) => Rule.max(80),
    }),
  ],
});

const homeMedia = defineType({
  name: "homeMedia",
  title: "Foto Home",
  type: "document",
  groups: [
    { name: "hero", title: "Copertina" },
    { name: "cards", title: "Card esperienze" },
    { name: "beach", title: "Beach" },
    { name: "restaurant", title: "Ristorante" },
    { name: "pool", title: "Piscina" },
    { name: "events", title: "Eventi" },
  ],
  fields: [
    { ...mediaField("hero", "Copertina principale", "/images/playa-luna/hero-beach.webp"), group: "hero" },
    { ...mediaField("experienceBeach", "Card Beach Club", "/images/playa-luna/beach-day.webp"), group: "cards" },
    { ...mediaField("experienceRestaurant", "Card Food & Drink", "/images/playa-luna/restaurant.webp"), group: "cards" },
    { ...mediaField("experienceEvents", "Card Events", "/images/playa-luna/events/home-card.webp"), group: "cards" },
    { ...mediaField("beachMain", "Beach · Foto principale", "/images/playa-luna/beach-day.webp"), group: "beach" },
    { ...mediaField("beachDetail", "Beach · Dettaglio", "/images/playa-luna/sunset-view.webp"), group: "beach" },
    { ...mediaField("restaurantMain", "Ristorante · Ambiente", "/images/playa-luna/restaurant.webp"), group: "restaurant" },
    { ...mediaField("foodOne", "Food · Piatto 1", "/images/playa-luna/food-tartare.webp"), group: "restaurant" },
    { ...mediaField("foodTwo", "Food · Piatto 2", "/images/playa-luna/food-pasta.webp"), group: "restaurant" },
    { ...mediaField("foodThree", "Food · Piatto 3", "/images/playa-luna/food-fish.webp"), group: "restaurant" },
    { ...mediaField("poolMain", "Piscina · Foto principale", "/images/playa-luna/pool-family.webp"), group: "pool" },
    { ...mediaField("poolDetail", "Piscina · Dettaglio", "/images/playa-luna/pool-chair.webp"), group: "pool" },
    { ...mediaField("eventsFeature", "Eventi · Foto principale", "/images/playa-luna/events/home-feature.webp"), group: "events" },
    { ...mediaField("finalCta", "Foto conclusiva", "/images/playa-luna/pool-chair.webp"), group: "hero" },
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

const beachMedia = defineType({
  name: "beachMedia",
  title: "Foto Beach Club",
  type: "document",
  fields: [
    mediaField("hero", "Copertina Beach Club", "/images/playa-luna/beach-day.webp"),
    mediaField("detail", "Dettaglio Beach Club", "/images/playa-luna/sunset-view.webp"),
  ],
  preview: { prepare: () => ({ title: "Beach Club" }) },
});

const restaurantMedia = defineType({
  name: "restaurantMedia",
  title: "Foto Ristorante",
  type: "document",
  fields: [
    mediaField("hero", "Copertina Ristorante", "/images/playa-luna/restaurant/hero.webp"),
    mediaField("detail", "Dettaglio food", "/images/playa-luna/food-pasta.webp"),
  ],
  preview: { prepare: () => ({ title: "Ristorante" }) },
});

const poolMedia = defineType({
  name: "poolMedia",
  title: "Foto Piscina Playa Luna",
  type: "document",
  fields: [
    mediaField("hero", "Copertina Piscina", "/images/playa-luna/pool-family.webp"),
    mediaField("detail", "Dettaglio Piscina", "/images/playa-luna/pool-chair.webp"),
  ],
  preview: { prepare: () => ({ title: "Piscina Playa Luna" }) },
});

const eventsFallbacks = [
  "/images/playa-luna/events/gathering.webp",
  "/images/playa-luna/events/night-01.webp",
  "/images/playa-luna/events/night-02.webp",
  "/images/playa-luna/events/night-03.webp",
  "/images/playa-luna/events/night-04.webp",
  "/images/playa-luna/events/night-05.webp",
  "/images/playa-luna/events/buffet.webp",
  "/images/playa-luna/events/night-06.webp",
  "/images/playa-luna/events/corporate.webp",
];

const eventsMedia = defineType({
  name: "eventsMedia",
  title: "Foto Eventi",
  type: "document",
  groups: [
    { name: "hero", title: "Copertina" },
    { name: "gallery", title: "Gallery · 9 foto" },
  ],
  fields: [
    { ...mediaField("hero", "Copertina Eventi", "/images/playa-luna/events/hero.webp"), group: "hero" },
    ...eventsFallbacks.map((fallback, index) => ({
      ...mediaField(`gallery${String(index + 1).padStart(2, "0")}`, `Gallery · Foto ${index + 1}`, fallback, { caption: true }),
      group: "gallery",
    })),
  ],
  preview: { prepare: () => ({ title: "Eventi" }) },
});

const weddingFallbacks = [
  "/images/playa-luna/wedding/place-setting.webp",
  "/images/playa-luna/wedding/flowers.webp",
  "/images/playa-luna/wedding/sea-table.webp",
  "/images/playa-luna/wedding/table-by-sea.webp",
  "/images/playa-luna/wedding/white-table.webp",
];

const weddingMedia = defineType({
  name: "weddingMedia",
  title: "Foto Wedding",
  type: "document",
  groups: [
    { name: "hero", title: "Copertina" },
    { name: "gallery", title: "Gallery · 5 foto" },
    { name: "closing", title: "Chiusura" },
  ],
  fields: [
    { ...mediaField("hero", "Copertina Wedding", "/images/playa-luna/wedding/hero.webp"), group: "hero" },
    ...weddingFallbacks.map((fallback, index) => ({
      ...mediaField(`gallery${String(index + 1).padStart(2, "0")}`, `Gallery · Foto ${index + 1}`, fallback, { caption: true }),
      group: "gallery",
    })),
    { ...mediaField("closing", "Foto conclusiva", "/images/playa-luna/wedding/favors.webp"), group: "closing" },
  ],
  preview: { prepare: () => ({ title: "Wedding" }) },
});

export const schemaTypes = [
  managedImage,
  homeMedia,
  beachMedia,
  restaurantMedia,
  poolMedia,
  eventsMedia,
  weddingMedia,
];
