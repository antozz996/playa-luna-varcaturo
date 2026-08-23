import { createClient } from "next-sanity";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-08-23",
  useCdn: false,
});

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN || "",
  }),
});
