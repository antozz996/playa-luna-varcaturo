"use client";

import { clearConsent } from "../lib/consent";

export function CookiePreferencesButton({ locale = "it" }: { locale?: "it" | "en" }) {
  const reopenPreferences = () => {
    clearConsent();
    window.location.reload();
  };

  return (
    <button className="pill-button" type="button" onClick={reopenPreferences}>
      {locale === "en" ? "Review cookie preferences" : "Rivedi le preferenze cookie"}
    </button>
  );
}
