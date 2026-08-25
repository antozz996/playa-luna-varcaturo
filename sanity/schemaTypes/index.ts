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
    description: `Foto attuale: ${fallback}. Puoi sostituirla e regolare l'inquadratura con i controlli Focus o con Hotspot/Crop.`,
    options: { caption: options.caption },
  });

const videoField = (name: string, title: string, group?: string) =>
  defineField({
    name,
    title: `${title} · Video (opzionale)`,
    type: "file",
    group,
    description:
      "Se carichi un video, sostituisce la foto in questa posizione. La foto resta come fallback. Consigliato: MP4 H.264, breve e leggero.",
    options: {
      accept: "video/mp4,video/webm",
      storeOriginalFilename: false,
    },
    fields: [
      defineField({
        name: "focusX",
        title: "Inquadratura video · orizzontale",
        type: "number",
        description: "0 = sinistra · 50 = centro · 100 = destra",
        initialValue: 50,
        validation: (Rule) => Rule.min(0).max(100),
      }),
      defineField({
        name: "focusY",
        title: "Inquadratura video · verticale",
        type: "number",
        description: "0 = alto · 50 = centro · 100 = basso",
        initialValue: 50,
        validation: (Rule) => Rule.min(0).max(100),
      }),
    ],
  });

const managedImage = defineType({
  name: "managedImage",
  title: "Foto",
  type: "image",
  options: {
    hotspot: {
      previews: [
        { title: "Orizzontale 16:9", aspectRatio: 16 / 9 },
        { title: "Verticale 4:5", aspectRatio: 4 / 5 },
        { title: "Quadrato", aspectRatio: 1 },
        { title: "Stories 9:16", aspectRatio: 9 / 16 },
      ],
    },
  },
  fields: [
    defineField({
      name: "focusX",
      title: "Inquadratura foto · orizzontale",
      type: "number",
      description: "Facoltativo. 0 = sinistra · 50 = centro · 100 = destra. Se lasci vuoto viene usato l'Hotspot Sanity.",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "focusY",
      title: "Inquadratura foto · verticale",
      type: "number",
      description: "Facoltativo. 0 = alto · 50 = centro · 100 = basso. Se lasci vuoto viene usato l'Hotspot Sanity.",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "alt",
      title: "Descrizione SEO / accessibilità",
      type: "string",
      description:
        "Descrivi in modo naturale ciò che si vede nella foto. Esempio: ‘Spiaggia attrezzata del Playa Luna a Marina di Varcaturo’. Evita elenchi di parole chiave.",
      validation: (Rule) =>
        Rule.max(140).custom((value, context) => {
          const parent = context.parent as { asset?: unknown } | undefined;
          if (parent?.asset && (!value || !value.trim())) {
            return "Inserisci una breve descrizione della foto prima di pubblicare.";
          }
          return true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Didascalia visibile",
      type: "string",
      description:
        "Facoltativa. Questo testo può comparire sotto la foto nelle gallery Eventi e Wedding.",
      hidden: ({ document, path }) => {
        const documentType = document?._type;
        const topLevelField = path?.[0];
        const isGalleryDocument =
          documentType === "eventsMedia" || documentType === "weddingMedia";
        const isGalleryField =
          typeof topLevelField === "string" && topLevelField.startsWith("gallery");

        return !(isGalleryDocument && isGalleryField);
      },
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
    videoField("heroVideo", "Copertina principale", "hero"),

    { ...mediaField("experienceBeach", "Card Beach Club · Foto / fallback", "/images/playa-luna/beach-day.webp"), group: "cards" },
    videoField("experienceBeachVideo", "Card Beach Club", "cards"),
    { ...mediaField("experienceRestaurant", "Card Food & Drink · Foto / fallback", "/images/playa-luna/restaurant.webp"), group: "cards" },
    videoField("experienceRestaurantVideo", "Card Food & Drink", "cards"),
    { ...mediaField("experienceEvents", "Card Events · Foto / fallback", "/images/playa-luna/events/home-card.webp"), group: "cards" },
    videoField("experienceEventsVideo", "Card Events", "cards"),

    { ...mediaField("beachMain", "Beach · Foto principale", "/images/playa-luna/beach-day.webp"), group: "beach" },
    videoField("beachMainVideo", "Beach · Media principale", "beach"),
    { ...mediaField("beachDetail", "Beach · Dettaglio", "/images/playa-luna/sunset-view.webp"), group: "beach" },
    videoField("beachDetailVideo", "Beach · Dettaglio", "beach"),

    { ...mediaField("restaurantMain", "Ristorante · Ambiente", "/images/playa-luna/restaurant.webp"), group: "restaurant" },
    videoField("restaurantMainVideo", "Ristorante · Ambiente", "restaurant"),
    { ...mediaField("foodOne", "Food · Piatto 1", "/images/playa-luna/food-tartare.webp"), group: "restaurant" },
    videoField("foodOneVideo", "Food · Media 1", "restaurant"),
    { ...mediaField("foodTwo", "Food · Piatto 2", "/images/playa-luna/food-pasta.webp"), group: "restaurant" },
    videoField("foodTwoVideo", "Food · Media 2", "restaurant"),
    { ...mediaField("foodThree", "Food · Piatto 3", "/images/playa-luna/food-fish.webp"), group: "restaurant" },
    videoField("foodThreeVideo", "Food · Media 3", "restaurant"),

    { ...mediaField("poolMain", "Piscina · Foto principale", "/images/playa-luna/pool-family.webp"), group: "pool" },
    videoField("poolMainVideo", "Piscina · Media principale", "pool"),
    { ...mediaField("poolDetail", "Piscina · Dettaglio", "/images/playa-luna/pool-chair.webp"), group: "pool" },
    videoField("poolDetailVideo", "Piscina · Dettaglio", "pool"),

    { ...mediaField("eventsFeature", "Eventi · Foto principale", "/images/playa-luna/events/home-feature.webp"), group: "events" },
    videoField("eventsFeatureVideo", "Eventi · Media principale", "events"),

    { ...mediaField("finalCta", "Foto conclusiva", "/images/playa-luna/pool-chair.webp"), group: "hero" },
    videoField("finalCtaVideo", "Media conclusivo", "hero"),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

const beachMedia = defineType({
  name: "beachMedia",
  title: "Foto Beach Club",
  type: "document",
  fields: [
    mediaField("hero", "Copertina Beach Club", "/images/playa-luna/beach-day.webp"),
    videoField("heroVideo", "Copertina Beach Club"),
    mediaField("detail", "Dettaglio Beach Club", "/images/playa-luna/sunset-view.webp"),
    videoField("detailVideo", "Dettaglio Beach Club"),
  ],
  preview: { prepare: () => ({ title: "Beach Club" }) },
});

const restaurantMedia = defineType({
  name: "restaurantMedia",
  title: "Foto Ristorante",
  type: "document",
  fields: [
    mediaField("hero", "Copertina Ristorante", "/images/playa-luna/restaurant/hero.webp"),
    videoField("heroVideo", "Copertina Ristorante"),
    mediaField("detail", "Dettaglio food", "/images/playa-luna/food-pasta.webp"),
    videoField("detailVideo", "Dettaglio food"),
  ],
  preview: { prepare: () => ({ title: "Ristorante" }) },
});

const poolMedia = defineType({
  name: "poolMedia",
  title: "Foto Piscina Playa Luna",
  type: "document",
  fields: [
    mediaField("hero", "Copertina Piscina", "/images/playa-luna/pool-family.webp"),
    videoField("heroVideo", "Copertina Piscina"),
    mediaField("detail", "Dettaglio Piscina", "/images/playa-luna/pool-chair.webp"),
    videoField("detailVideo", "Dettaglio Piscina"),
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
    { name: "gallery", title: "Gallery · 9 media" },
  ],
  fields: [
    { ...mediaField("hero", "Copertina Eventi", "/images/playa-luna/events/hero.webp"), group: "hero" },
    videoField("heroVideo", "Copertina Eventi", "hero"),
    ...eventsFallbacks.flatMap((fallback, index) => {
      const slot = `gallery${String(index + 1).padStart(2, "0")}`;
      return [
        { ...mediaField(slot, `Gallery · Foto ${index + 1}`, fallback, { caption: true }), group: "gallery" },
        videoField(`${slot}Video`, `Gallery · Media ${index + 1}`, "gallery"),
      ];
    }),
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
    { name: "gallery", title: "Gallery · 5 media" },
    { name: "closing", title: "Chiusura" },
  ],
  fields: [
    { ...mediaField("hero", "Copertina Wedding", "/images/playa-luna/wedding/hero.webp"), group: "hero" },
    videoField("heroVideo", "Copertina Wedding", "hero"),
    ...weddingFallbacks.flatMap((fallback, index) => {
      const slot = `gallery${String(index + 1).padStart(2, "0")}`;
      return [
        { ...mediaField(slot, `Gallery · Foto ${index + 1}`, fallback, { caption: true }), group: "gallery" },
        videoField(`${slot}Video`, `Gallery · Media ${index + 1}`, "gallery"),
      ];
    }),
    { ...mediaField("closing", "Foto conclusiva", "/images/playa-luna/wedding/favors.webp"), group: "closing" },
    videoField("closingVideo", "Media conclusivo", "closing"),
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
