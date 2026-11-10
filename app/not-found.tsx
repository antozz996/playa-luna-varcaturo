import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false, follow: true },
  // Do not inherit the home page canonical from the root layout.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="page-shell">
      <div className="legal-header"><SiteHeader /></div>
      <main id="main">
        <article className="legal-page shell">
          <p className="eyebrow">Errore 404</p>
          <h1>Pagina non trovata</h1>
          <p style={{ marginTop: 24 }}>La pagina che cerchi non esiste o è stata spostata.</p>
          <p style={{ marginTop: 16 }}>
            <Link href="/">Torna alla home</Link> · <Link href="/contatti">Contatti e orari</Link> ·{" "}
            <Link href="/menu-ristorante">Menu del ristorante</Link>
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
