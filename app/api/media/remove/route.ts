import { del } from "@vercel/blob";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { HOME_MEDIA_SLOTS, homeMediaVideoPath, isHomeMediaSlot } from "@/app/lib/site-media";
import { isSiteMediaPage, isSiteMediaSlot, siteMediaPath } from "@/app/lib/site-media-pages";

function pathsFor(page: string, slot: string) {
  if (!page || page === "home") {
    if (!isHomeMediaSlot(slot)) return undefined;
    return [HOME_MEDIA_SLOTS[slot].pathname, homeMediaVideoPath(slot)];
  }
  if (!isSiteMediaPage(page) || !isSiteMediaSlot(page, slot)) return undefined;
  return [siteMediaPath(page, slot, "image"), siteMediaPath(page, slot, "video")];
}

export async function POST(request: Request) {
  if (!(await isMediaAdminAuthenticated())) return Response.json({ error: "Non autorizzato." }, { status: 401 });

  try {
    const body = await request.json() as { page?: unknown; slot?: unknown };
    if (typeof body.page !== "string" || typeof body.slot !== "string") throw new Error("Dati della rimozione non validi.");
    const paths = pathsFor(body.page, body.slot);
    if (!paths) throw new Error("Destinazione non valida.");
    const results = await Promise.allSettled(paths.map((path) => del(path)));
    if (results.every((result) => result.status === "rejected")) {
      const firstFailure = results[0];
      throw firstFailure.status === "rejected" ? firstFailure.reason : new Error("Rimozione non riuscita.");
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Media removal error", error);
    return Response.json({ error: error instanceof Error ? error.message : "Rimozione non riuscita." }, { status: 400 });
  }
}
