import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Informazioni sui cookie utilizzati dal sito Playa Luna.",
  alternates: { canonical: "/cookie/" },
  robots: { index: false, follow: true },
};

export default function CookiePage() {
  return (
    <main>
      <div className="legal-header"><SiteHeader /></div>
      <article className="legal-page shell">
        <p className="eyebrow">Preferenze</p>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Ultimo aggiornamento: 22 agosto 2026</p>
        <h2>Cookie necessari</h2>
        <p>Il sito utilizza strumenti tecnici indispensabili al funzionamento e memorizza sul dispositivo la scelta espressa nel banner privacy. Questi elementi non richiedono consenso.</p>
        <h2>Misurazione anonima</h2>
        <p>Gli strumenti di analytics vengono attivati solo dopo l’accettazione. Servono a comprendere quali pagine vengono visitate e quali azioni, come click su WhatsApp, telefono, email e indicazioni stradali, aiutano maggiormente gli utenti.</p>
        <h2>Come cambiare scelta</h2>
        <p>Puoi cancellare la voce “playaluna-analytics-consent” dalla memoria locale del browser per visualizzare nuovamente il banner e scegliere una preferenza diversa.</p>
        <h2>Servizi esterni</h2>
        <p>I collegamenti verso WhatsApp, Google Maps, Instagram e Facebook portano a servizi esterni che applicano cookie e informative proprie dopo l’apertura del relativo sito o applicazione.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
