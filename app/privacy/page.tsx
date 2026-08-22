import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sul trattamento dei dati personali del sito Playa Luna.",
  alternates: { canonical: "/privacy/" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <div className="legal-header"><SiteHeader /></div>
      <article className="legal-page shell">
        <p className="eyebrow">Informativa</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Ultimo aggiornamento: 22 agosto 2026</p>
        <h2>Titolare e contatti</h2>
        <p>Il titolare del trattamento è il gestore di Playa Luna, Via Marina di Varcaturo 42, Giugliano in Campania (NA). Per richieste relative ai dati personali puoi scrivere a <a href="mailto:info@playaluna.it">info@playaluna.it</a>.</p>
        <h2>Dati trattati</h2>
        <p>Il sito può trattare dati tecnici di navigazione, preferenze relative ai cookie e le informazioni che scegli volontariamente di inviare tramite telefono, email o WhatsApp. Non raccogliamo dati attraverso moduli proprietari presenti sul sito.</p>
        <h2>Finalità e basi giuridiche</h2>
        <p>I dati vengono utilizzati per rispondere alle richieste, gestire prenotazioni e informazioni commerciali, garantire sicurezza e funzionamento del sito e, solo con consenso, misurare in forma aggregata l’utilizzo delle pagine.</p>
        <h2>Conservazione e destinatari</h2>
        <p>I dati vengono conservati per il tempo necessario alla finalità per cui sono stati raccolti e agli eventuali obblighi di legge. Alcuni servizi esterni, come WhatsApp, Google Maps o gli strumenti di misurazione autorizzati, applicano le proprie informative.</p>
        <h2>I tuoi diritti</h2>
        <p>Puoi chiedere accesso, rettifica, cancellazione, limitazione o opposizione al trattamento e, quando applicabile, la portabilità dei dati. Puoi inoltre revocare il consenso in qualsiasi momento.</p>
      </article>
      <SiteFooter />
    </main>
  );
}
