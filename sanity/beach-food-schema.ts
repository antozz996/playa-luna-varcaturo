import { defineField, defineType } from "sanity";

const imageField = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "managedImage",
    description,
  });

const videoField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "file",
    description:
      "Carica un video verticale MP4/WebM. Consigliato: breve, leggero e senza audio indispensabile.",
    options: {
      accept: "video/mp4,video/webm",
      storeOriginalFilename: false,
    },
    fields: [
      defineField({
        name: "focusX",
        title: "Inquadratura video · orizzontale",
        type: "number",
        initialValue: 50,
        validation: (Rule) => Rule.min(0).max(100),
      }),
      defineField({
        name: "focusY",
        title: "Inquadratura video · verticale",
        type: "number",
        initialValue: 50,
        validation: (Rule) => Rule.min(0).max(100),
      }),
    ],
  });

export const beachFoodMedia = defineType({
  name: "beachFoodMedia",
  title: "Beach Food · Tavola calda e fredda",
  type: "document",
  groups: [
    { name: "photos", title: "Foto" },
    { name: "videos", title: "Video" },
  ],
  fields: [
    {
      ...imageField(
        "buffet",
        "01 · Banco completo",
        "Foto principale del banco con primi, verdure, contorni e proposte fredde.",
      ),
      group: "photos",
    },
    {
      ...imageField(
        "pasta",
        "02 · Primi e insalate di pasta",
        "Dettaglio ravvicinato delle proposte fredde e delle insalate di pasta.",
      ),
      group: "photos",
    },
    {
      ...imageField(
        "counter",
        "03 · Banco interno",
        "Vista più ampia dell'area tavola calda e fredda all'interno del Playa Luna.",
      ),
      group: "photos",
    },
    {
      ...imageField(
        "service",
        "04 · Servizio al banco",
        "Foto del personale mentre prepara o serve una porzione al banco.",
      ),
      group: "photos",
    },
    { ...videoField("serviceVideo", "01 · Video servizio al banco"), group: "videos" },
    { ...videoField("detailVideo", "02 · Video dettaglio piatto caldo"), group: "videos" },
  ],
  preview: {
    prepare: () => ({ title: "Beach Food · Tavola calda e fredda" }),
  },
});
