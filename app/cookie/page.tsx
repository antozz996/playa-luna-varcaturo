import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { CookiePreferencesButton } from "../components/cookie-preferences-button";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Informazioni sui cookie utilizzati dal sito Playa Luna.",
  alternates: { canonical: "/cookie" },
  robots: { index: false, follow: true },
};

export default function CookiePage() {
  return (
    <main>
      <div className="legal-header"><SiteHeader /></div>
      <article className="legal-page shell">
        <p className="eyebrow">Preferenze</p>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Ultimo aggiornamento: 12 ottobre 2026</p>
        <h2>Cookie necessari</h2>
        <p>Il sito utilizza strumenti tecnici indispensabili al funzionamento e memorizza sul dispositivo la scelta espressa nel banner privacy. Questi elementi non richiedono consenso.</p>
        <h2>Strumenti di analisi</h2>
        <p>Dopo il consenso, il sito può caricare Google Analytics 4 e Microsoft Clarity per misurare le visite e le interazioni con le pagine e i collegamenti. Questi servizi sono forniti da terze parti e trattano i dati secondo le rispettive informative.</p>
        <h2>Come cambiare scelta</h2>
        <p>Puoi rivedere la scelta in qualsiasi momento usando il pulsante qui sotto. La pagina ricaricherà il banner e gli strumenti di analisi resteranno disattivati finché non darai nuovamente il consenso.</p>
        <CookiePreferencesButton />
        <h2>Servizi esterni</h2>
        <p>I collegamenti verso WhatsApp, Google Maps, Instagram e Facebook portano a servizi esterni che applicano cookie e informative proprie dopo l’apertura del relativo sito o applicazione.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
