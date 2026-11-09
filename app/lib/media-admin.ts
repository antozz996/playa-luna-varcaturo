import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "playa-luna-media-admin";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

// Signing key: dedicated secret if set, otherwise the admin password itself,
// so changing the password invalidates every existing session.
function sessionKey() {
  return process.env.MEDIA_SESSION_SECRET || process.env.MEDIA_ADMIN_PASSWORD || "";
}

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function createToken(key: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${expiresAt}.${randomBytes(16).toString("base64url")}`;
  return `${payload}.${sign(payload, key)}`;
}

function verifyToken(token: string | undefined, key: string) {
  if (!token || !key) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload, key))) return false;
  const expiresAt = Number(payload.split(".")[0]);
  return Number.isFinite(expiresAt) && expiresAt > Date.now() / 1000;
}

export async function isMediaAdminAuthenticated() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value, sessionKey());
}

export async function setMediaAdminSession() {
  const key = sessionKey();
  if (!key) throw new Error("Media admin session key is not configured");
  const store = await cookies();
  store.set(COOKIE_NAME, createToken(key), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearMediaAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
