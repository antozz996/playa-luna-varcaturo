import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { createClient } from "next-sanity";

const configuredProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "";
const configuredDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";

export const isSanityConfigured = Boolean(configuredProjectId);

const client = createClient({
  projectId: configuredProjectId || "00000000",
  dataset: configuredDataset,
  apiVersion: "2026-08-23",
  useCdn: !process.env.SANITY_API_TOKEN,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published",
});

const builder = createImageUrlBuilder(client);

export type ManagedImage = {
  asset?: SanityImageSource;
  alt?: string;
  caption?: string;
  crop?: { top: number; right: number; bottom: number; left: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export async function getMediaDocument<T extends Record<string, unknown>>(
  type: string,
): Promise<Partial<T>> {
  if (!isSanityConfigured) return {};

  try {
    const result = await client.fetch<Partial<T> | null>(
      "*[_type == $type][0]",
      { type },
      { next: { revalidate: 30, tags: [`sanity:${type}`] } },
    );
    return result || {};
  } catch {
    return {};
  }
}

export function mediaUrl(image: ManagedImage | undefined, fallback: string) {
  if (!image?.asset) return fallback;
  return builder.image(image).auto("format").quality(88).url();
}

export function mediaAlt(image: ManagedImage | undefined, fallback: string) {
  return image?.alt?.trim() || fallback;
}

export function mediaCaption(image: ManagedImage | undefined, fallback: string) {
  return image?.caption?.trim() || fallback;
}
