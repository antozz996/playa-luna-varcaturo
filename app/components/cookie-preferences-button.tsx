"use client";

const consentKey = "playaluna-analytics-consent";

export function CookiePreferencesButton() {
  const reopenPreferences = () => {
    window.localStorage.removeItem(consentKey);
    window.location.reload();
  };

  return (
    <button className="pill-button" type="button" onClick={reopenPreferences}>
      Rivedi le preferenze cookie
    </button>
  );
}
