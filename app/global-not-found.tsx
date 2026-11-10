// Global 404 for unmatched URLs (the app has two root layouts: (it) and (en)).
// It bypasses every layout, so it imports the global styles itself.
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina non trovata · Page not found | Playa Luna",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="it">
      <body>
        <main id="main" className="legal-page shell">
          <p className="eyebrow">Errore 404</p>
          <h1>Pagina non trovata</h1>
          <p style={{ marginTop: 24 }}>La pagina che cerchi non esiste o è stata spostata.</p>
          <p style={{ marginTop: 16 }}>
            <Link href="/">Torna alla home</Link> · <Link href="/contatti">Contatti e orari</Link> ·{" "}
            <Link href="/menu-ristorante">Menu del ristorante</Link>
          </p>
          <p lang="en" style={{ marginTop: 40 }}>
            Page not found. <Link href="/en">Go to the English home page</Link>.
          </p>
        </main>
      </body>
    </html>
  );
}
