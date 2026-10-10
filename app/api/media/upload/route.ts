import { handleUpload } from "@vercel/blob/client";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { HOME_MEDIA_SLOTS, isHomeMediaSlot } from "@/app/lib/site-media";

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
        const payload = JSON.parse(clientPayload || "{}") as { slot?: string };
        if (!payload.slot || !isHomeMediaSlot(payload.slot)) {
          throw new Error("Slot immagine non valido.");
        }

        const expectedPathname = HOME_MEDIA_SLOTS[payload.slot].pathname;
        if (pathname !== expectedPathname) {
          throw new Error("Percorso immagine non valido.");
        }

        return {
          allowedContentTypes: ["image/webp"],
          maximumSizeInBytes: 10 * 1024 * 1024,
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
