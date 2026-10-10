import { timingSafeEqual } from "node:crypto";
import { setMediaAdminSession } from "@/app/lib/media-admin";

function matchesPassword(provided: string, expected: string) {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return providedBuffer.length === expectedBuffer.length && timingSafeEqual(providedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const configuredPassword = process.env.MEDIA_ADMIN_PASSWORD;
  if (!configuredPassword) {
    return Response.json({ ok: false, error: "Pannello non ancora configurato." }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as { password?: string } | null;
  if (!body?.password || !matchesPassword(body.password, configuredPassword)) {
    return Response.json({ ok: false, error: "Password non corretta." }, { status: 401 });
  }

  await setMediaAdminSession();
  return Response.json({ ok: true });
}
