import { createHash, timingSafeEqual } from "node:crypto";
import { clearMediaAdminSession, setMediaAdminSession } from "@/app/lib/media-admin";

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;

// Best-effort, per-instance limiter. On serverless it resets on cold start;
// a shared store (e.g. Upstash) would make it global.
const failures = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isLocked(ip: string) {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (entry.resetAt < Date.now()) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const now = Date.now();
  const entry = failures.get(ip);
  if (!entry || entry.resetAt < now) {
    failures.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function matchesPassword(provided: string, expected: string) {
  // Hash both sides so the comparison is constant-time regardless of length.
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(provided), digest(expected));
}

export async function POST(request: Request) {
  const configuredPassword = process.env.MEDIA_ADMIN_PASSWORD;
  if (!configuredPassword) {
    return Response.json({ ok: false, error: "Pannello non ancora configurato." }, { status: 503 });
  }

  const ip = clientIp(request);
  if (isLocked(ip)) {
    return Response.json(
      { ok: false, error: "Troppi tentativi. Riprova tra 15 minuti." },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } },
    );
  }

  const body = await request.json().catch(() => null) as { password?: string } | null;
  if (!body?.password || !matchesPassword(body.password, configuredPassword)) {
    recordFailure(ip);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Response.json({ ok: false, error: "Password non corretta." }, { status: 401 });
  }

  failures.delete(ip);
  await setMediaAdminSession();
  return Response.json({ ok: true });
}

export async function DELETE() {
  await clearMediaAdminSession();
  return Response.json({ ok: true });
}
