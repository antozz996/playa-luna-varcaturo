import "server-only";

import { cookies } from "next/headers";

const COOKIE_NAME = "playa-luna-media-admin";
const COOKIE_VALUE = "authorized";

export async function isMediaAdminAuthenticated() {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

export async function setMediaAdminSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}
