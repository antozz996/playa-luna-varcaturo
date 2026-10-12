import { handleUpload } from "@vercel/blob/client";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { HOME_MEDIA_SLOTS, homeMediaVideoPath, isHomeMediaSlot } from "@/app/lib/site-media";

export async function POST(request: Request): Promise<Response> {
  if (!(await isMediaAdminAuthenticated())) {
    return Response.json({ error: "Non autorizzato." }, { status: 401 });
  }

  const body = await request.json();

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = JSON.parse(clientPayload || "{}") as { slot?: string; type?: "image" | "video" };
        if (!payload.slot || !isHomeMediaSlot(payload.slot)) {
          throw new Error("Slot contenuto non valido.");
        }

        const isVideo = payload.type === "video";
        const expectedPathname = isVideo ? homeMediaVideoPath(payload.slot) : HOME_MEDIA_SLOTS[payload.slot].pathname;
        if (pathname !== expectedPathname) {
          throw new Error("Percorso contenuto non valido.");
        }

        return {
          allowedContentTypes: isVideo ? ["video/mp4"] : ["image/webp"],
          maximumSizeInBytes: isVideo ? 75 * 1024 * 1024 : 10 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: true,
          cacheControlMaxAge: 60,
        };
      },
    });

    return Response.json(response);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Impossibile preparare il caricamento." },
      { status: 400 },
    );
  }
}
