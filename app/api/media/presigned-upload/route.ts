import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned } from "@vercel/blob/client";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { HOME_MEDIA_SLOTS, homeMediaVideoPath, isHomeMediaSlot } from "@/app/lib/site-media";
import { isSiteMediaPage, isSiteMediaSlot, siteMediaPath } from "@/app/lib/site-media-pages";

function expectedVideoPath(page: string, slot: string) {
  if (!page || page === "home") return isHomeMediaSlot(slot) ? homeMediaVideoPath(slot) : undefined;
  return isSiteMediaPage(page) && isSiteMediaSlot(page, slot) ? siteMediaPath(page, slot, "video") : undefined;
}

export async function POST(request: Request): Promise<Response> {
  if (!(await isMediaAdminAuthenticated())) return Response.json({ error: "Non autorizzato." }, { status: 401 });

  try {
    const body = await request.json();
    const response = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname, clientPayload) => {
        const payload = JSON.parse(clientPayload || "{}") as { page?: string; slot?: string; type?: string };
        if (payload.type !== "video" || !payload.slot || pathname !== expectedVideoPath(payload.page || "home", payload.slot)) {
          throw new Error("Destinazione del video non valida.");
        }
        const maximumSizeInBytes = 100 * 1024 * 1024;
        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          validUntil: Date.now() + 15 * 60 * 1000,
          allowedContentTypes: ["video/mp4"],
          maximumSizeInBytes,
        });
        return {
          token,
          urlOptions: {
            access: "public",
            allowedContentTypes: ["video/mp4"],
            maximumSizeInBytes,
            addRandomSuffix: false,
            allowOverwrite: true,
            cacheControlMaxAge: 60,
          },
        };
      },
    });
    return Response.json(response);
  } catch (error) {
    console.error("Presigned video upload error", error);
    return Response.json({ error: error instanceof Error ? error.message : "Impossibile preparare il caricamento del video." }, { status: 400 });
  }
}
