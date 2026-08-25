import "server-only";

import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { createClient } from "next-sanity";
import { draftMode } from "next/headers";

const configuredProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "";
const configuredDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const readToken =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN || "";

export const isSanityConfigured = Boolean(configuredProjectId);

const publishedClient = createClient({
  projectId: configuredProjectId || "00000000",
  dataset: configuredDataset,
  apiVersion: "2026-08-23",
  useCdn: true,
  perspective: "published",
});

const previewClient = publishedClient.withConfig({
  useCdn: false,
  token: readToken || undefined,
  perspective: "drafts",
});

const builder = createImageUrlBuilder(publishedClient);

export type ManagedImage = {
  asset?: SanityImageSource;
  alt?: string;
  caption?: string;
  focusX?: number;
  focusY?: number;
  crop?: { top: number; right: number; bottom: number; left: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export async function getMediaDocument<T extends Record<string, unknown>>(
  type: string,
): Promise<Partial<T>> {
  if (!isSanityConfigured) return {};

  try {
    const { isEnabled } = await draftMode();
    const canPreviewDrafts = isEnabled && Boolean(readToken);
    const activeClient = canPreviewDrafts ? previewClient : publishedClient;

    const result = await activeClient.fetch<Partial<T> | null>(
      "*[_type == $type][0]",
      { type },
      canPreviewDrafts
        ? { cache: "no-store" }
        : { next: { revalidate: 30, tags: [`sanity:${type}`] } },
    );

    return result || {};
  } catch {
    return {};
  }
}

export function mediaUrl(image: ManagedImage | undefined, fallback: string) {
  if (!image?.asset) return fallback;

  return builder
    .image(image)
    .width(1920)
    .fit("max")
    .auto("format")
    .quality(84)
    .url();
}

export function mediaObjectPosition(
  image: ManagedImage | undefined,
  fallback = "50% 50%",
) {
  const explicitX = image?.focusX;
  const explicitY = image?.focusY;

  if (typeof explicitX === "number" || typeof explicitY === "number") {
    const x = Math.min(100, Math.max(0, explicitX ?? 50));
    const y = Math.min(100, Math.max(0, explicitY ?? 50));
    return `${x}% ${y}%`;
  }

  if (!image?.hotspot) return fallback;

  const x = Math.round(image.hotspot.x * 1000) / 10;
  const y = Math.round(image.hotspot.y * 1000) / 10;
  return `${x}% ${y}%`;
}

export function mediaAlt(image: ManagedImage | undefined, fallback: string) {
  return image?.alt?.trim() || fallback;
}

export function mediaCaption(image: ManagedImage | undefined, fallback: string) {
  return image?.caption?.trim() || fallback;
}
