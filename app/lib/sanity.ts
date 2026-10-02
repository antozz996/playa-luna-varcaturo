import "server-only";

export const isSanityConfigured = false;

export type ManagedImage = {
  asset?: unknown;
  alt?: string;
  caption?: string;
  focusX?: number;
  focusY?: number;
  crop?: { top: number; right: number; bottom: number; left: number };
  hotspot?: { x: number; y: number; height: number; width: number };
};

export async function getMediaDocument<T extends Record<string, unknown>>(
  _type: string,
): Promise<Partial<T>> {
  return {};
}

export function mediaUrl(_image: ManagedImage | undefined, fallback: string) {
  return fallback;
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
  return fallback;
}

export function mediaAlt(image: ManagedImage | undefined, fallback: string) {
  return image?.alt?.trim() || fallback;
}

export function mediaCaption(image: ManagedImage | undefined, fallback: string) {
  return image?.caption?.trim() || fallback;
}
