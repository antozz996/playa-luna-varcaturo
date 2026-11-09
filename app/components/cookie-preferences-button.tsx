"use client";

import { clearConsent } from "../lib/consent";

export function CookiePreferencesButton() {
  const reopenPreferences = () => {
    clearConsent();
    window.location.reload();
  };

  return (
    <button className="pill-button" type="button" onClick={reopenPreferences}>
      Rivedi le preferenze cookie
    </button>
  );
}
