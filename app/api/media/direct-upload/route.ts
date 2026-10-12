import { put } from "@vercel/blob";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { HOME_MEDIA_SLOTS, homeMediaVideoPath, isHomeMediaSlot } from "@/app/lib/site-media";
import { isSiteMediaPage, isSiteMediaSlot, siteMediaPath } from "@/app/lib/site-media-pages";

function pathnameFor(page: string, slot: string, type: "image" | "video") {
  if (!page || page === "home") {
    if (!isHomeMediaSlot(slot)) return undefined;
    return type === "video" ? homeMediaVideoPath(slot) : HOME_MEDIA_SLOTS[slot].pathname;
  }
  if (!isSiteMediaPage(page) || !isSiteMediaSlot(page, slot)) return undefined;
  return siteMediaPath(page, slot, type);
}

export async function POST(request: Request) {
  if (!(await isMediaAdminAuthenticated())) return Response.json({ error: "Non autorizzato." }, { status: 401 });

  try {
    const form = await request.formData();
    const file = form.get("file");
    const slot = form.get("slot");
    const page = form.get("page");
    const type = form.get("type") === "video" ? "video" : "image";
    if (!(file instanceof File) || typeof slot !== "string" || typeof page !== "string") throw new Error("Dati del caricamento non validi.");

    const pathname = pathnameFor(page, slot, type);
    if (!pathname) throw new Error("Destinazione non valida.");
    if (type === "image" && file.type !== "image/webp") throw new Error("La foto non è stata ottimizzata correttamente.");
    if (type === "video" && file.type !== "video/mp4") throw new Error("Il video deve essere in formato MP4.");
    if (file.size > (type === "video" ? 75 : 10) * 1024 * 1024) throw new Error(type === "video" ? "Il video supera 75 MB." : "La foto supera 10 MB.");

    const blob = await put(pathname, file, { access: "public", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 });
    return Response.json({ url: blob.url });
  } catch (error) {
    console.error("Direct media upload error", error);
    return Response.json({ error: error instanceof Error ? error.message : "Caricamento non riuscito." }, { status: 400 });
  }
}
