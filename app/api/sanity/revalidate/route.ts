import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

const pathsByType: Record<string, string[]> = {
  homeMedia: ["/"],
  beachMedia: ["/beach-club"],
  restaurantMedia: ["/ristorante-sul-mare"],
  poolMedia: ["/piscina"],
  eventsMedia: ["/eventi"],
  weddingMedia: ["/wedding"],
};

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;
  const providedSecret = request.nextUrl.searchParams.get("secret");

  if (!configuredSecret) {
    return Response.json(
      { ok: false, error: "Revalidation secret is not configured" },
      { status: 503 },
    );
  }

  if (!providedSecret || providedSecret !== configuredSecret) {
    return Response.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  let body: { _type?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON payload" },
      { status: 400 },
    );
  }

  const type = body?._type;
  const paths = type ? pathsByType[type] : undefined;

  if (!type || !paths) {
    return Response.json(
      { ok: false, error: "Unsupported Sanity document type" },
      { status: 400 },
    );
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return Response.json({ ok: true, type, paths });
}
