import { defineField, defineType } from "sanity";

const mediaField = (name: string, title: string, fallback: string, group: string) =>
  defineField({
    name,
    title,
    type: "managedImage",
    group,
    description: `Foto attuale: ${fallback}. Puoi sostituirla e regolare l'inquadratura con Focus o Hotspot/Crop.`,
  });

const videoField = (name: string, title: string, group: string) =>
  defineField({
    name,
    title: `${title} · Video (opzionale)`,
    type: "file",
    group,
    description: "Se carichi un video, sostituisce la foto in questa posizione. Consigliato: MP4 H.264 breve e leggero.",
    options: { accept: "video/mp4,video/webm", storeOriginalFilename: false },
    fields: [
      defineField({ name: "focusX", title: "Inquadratura video · orizzontale", type: "number", initialValue: 50, validation: (Rule) => Rule.min(0).max(100) }),
      defineField({ name: "focusY", title: "Inquadratura video · verticale", type: "number", initialValue: 50, validation: (Rule) => Rule.min(0).max(100) }),
    ],
  });

const slot = (name: string, title: string, fallback: string, group: string) => [
  mediaField(name, title, fallback, group),
  videoField(`${name}Video`, title, group),
];

export const cultoMedia = defineType({
  name: "cultoMedia",
  title: "Foto CULTO",
  type: "document",
  groups: [
    { name: "hero", title: "Copertina" },
    { name: "day", title: "Day / Beach" },
    { name: "taste", title: "Fusion Sushi" },
    { name: "night", title: "Saturday / Night" },
    { name: "closing", title: "Chiusura" },
  ],
  fields: [
    ...slot("hero", "Copertina CULTO", "/images/playa-luna/beach-day.webp", "hero"),
    ...slot("dayBeach", "Day · Spiaggia", "/images/playa-luna/sunset-view.webp", "day"),
    ...slot("dayDeck", "Day · Deck / lettini", "/images/playa-luna/pool-chair.webp", "day"),
    ...slot("love", "Day · Momento iconico / piscina", "/images/playa-luna/pool-family.webp", "day"),
    ...slot("sushiDetail", "Sushi · Dettaglio preparazione", "/images/playa-luna/food-tartare.webp", "taste"),
    ...slot("sushiSpread", "Sushi · Selezione", "/images/playa-luna/food-pasta.webp", "taste"),
    ...slot("sushiNight", "Sushi · Mood serale", "/images/playa-luna/food-fish.webp", "taste"),
    ...slot("nightCrowd", "Night · Crowd / transizione", "/images/playa-luna/events/night-01.webp", "night"),
    ...slot("nightEnergy", "Night · Energy", "/images/playa-luna/events/night-02.webp", "night"),
    ...slot("nightFashion", "Night · Fashion / people", "/images/playa-luna/events/night-03.webp", "night"),
    ...slot("nightDj", "Night · DJ", "/images/playa-luna/events/night-04.webp", "night"),
    ...slot("nightPeople", "Night · People", "/images/playa-luna/events/night-05.webp", "night"),
    ...slot("closing", "Foto conclusiva", "/images/playa-luna/events/home-feature.webp", "closing"),
  ],
  preview: { prepare: () => ({ title: "CULTO" }) },
});
