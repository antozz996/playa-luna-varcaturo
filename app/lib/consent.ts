// Analytics consent storage, shared by the banner and the "review preferences" button.
// Browser-only helpers: call them from effects or event handlers.

export type ConsentValue = "accepted" | "rejected";

const STORAGE_KEY = "playaluna-analytics-consent";
/** Bump when the purposes or the third parties change: everyone is asked again. */
export const CONSENT_VERSION = 3; // 3: Meta Pixel added (2026-11-10)
/** Garante linee guida 2021: do not ask again before 6 months. */
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;

type StoredConsent = { value: ConsentValue; ts: number; version: number };

export function readConsent(): ConsentValue | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<StoredConsent>;
    const valid =
      (stored.value === "accepted" || stored.value === "rejected") &&
      stored.version === CONSENT_VERSION &&
      typeof stored.ts === "number" &&
      Date.now() - stored.ts < MAX_AGE_MS;
    return valid ? (stored.value as ConsentValue) : null;
  } catch {
    // Old plain-string format, corrupted value or blocked storage: ask again.
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    const record: StoredConsent = { value, ts: Date.now(), version: CONSENT_VERSION };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable (private mode): the choice lasts for this page view only.
  }
}

export function clearConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
