import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { CookiePreferencesButton } from "../components/cookie-preferences-button";
import { pageOpenGraph } from "../lib/site";

const description = "Cookie e strumenti di memorizzazione usati dal sito Playa Luna, con fornitore, finalità e durata.";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description,
  alternates: { canonical: "/cookie" },
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({ path: "/cookie", title: "Cookie Policy | Playa Luna", description }),
};

const technical = [
  { name: "playaluna-analytics-consent", provider: "Playa Luna (localStorage)", purpose: "Ricorda la tua scelta sul banner cookie", duration: "6 mesi" },
  { name: "playaluna-source", provider: "Playa Luna (sessionStorage)", purpose: "Ricorda da dove sei arrivato (es. Instagram, Google) per indicarlo con un codice breve, come [IG], in fondo al messaggio WhatsApp che scegli di inviarci. Non viene inviato a nessuno finché non mandi tu il messaggio", duration: "Fino alla chiusura della scheda" },
];

const analytics = [
  { name: "_ga", provider: "Google (Google Analytics)", purpose: "Distingue i visitatori per statistiche aggregate", duration: "2 anni" },
  { name: "_ga_<ID>", provider: "Google (Google Analytics)", purpose: "Mantiene lo stato della sessione di misurazione", duration: "2 anni" },
  { name: "_clck", provider: "Microsoft (Clarity)", purpose: "Identificativo del visitatore per Clarity", duration: "1 anno" },
  { name: "_clsk", provider: "Microsoft (Clarity)", purpose: "Collega le pagine viste in una sessione", duration: "1 giorno" },
  { name: "CLID, MUID", provider: "Microsoft (clarity.ms, bing.com)", purpose: "Identificativi tecnici del servizio Clarity", duration: "1 anno" },
];

function CookieTable({ caption, rows }: { caption: string; rows: typeof analytics }) {
  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <caption>{caption}</caption>
        <thead>
          <tr><th scope="col">Nome</th><th scope="col">Fornitore</th><th scope="col">Finalità</th><th scope="col">Durata</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}><th scope="row">{row.name}</th><td>{row.provider}</td><td>{row.purpose}</td><td>{row.duration}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePage() {
  return (
    <div className="page-shell">
      <div className="legal-header"><SiteHeader /></div>
      <main id="main">
      <article className="legal-page shell">
        <p className="eyebrow">Preferenze</p>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Ultimo aggiornamento: 9 novembre 2026</p>

        <h2>Strumenti tecnici</h2>
        <p>Sono necessari al funzionamento del sito e non richiedono consenso. Il sito non usa cookie tecnici propri: salva nella memoria del browser solo la tua scelta sul banner e, per la durata della visita, un codice di provenienza che resta sul tuo dispositivo.</p>
        <CookieTable caption="Strumenti tecnici" rows={technical} />

        <h2>Cookie di analisi (solo con consenso)</h2>
        <p>
          Google Analytics e Microsoft Clarity vengono caricati <strong>solo dopo che hai premuto “Accetta”</strong>.
          Prima del consenso il sito non invia dati a Google né a Microsoft. Li usiamo per statistiche aggregate e per
          capire come migliorare le pagine; non li usiamo per pubblicità. I dati possono essere trasferiti negli Stati
          Uniti come descritto nella <Link href="/privacy">privacy policy</Link>.
        </p>
        <CookieTable caption="Cookie di analisi" rows={analytics} />

        <h2>Come cambiare scelta</h2>
        <p>Puoi rivedere o revocare il consenso in qualsiasi momento con il pulsante qui sotto: il banner verrà mostrato di nuovo. Se rifiuti, i cookie di analisi già presenti vengono cancellati. La scelta viene comunque richiesta di nuovo dopo 6 mesi o se cambiano gli strumenti utilizzati.</p>
        <CookiePreferencesButton />

        <h2>Servizi esterni</h2>
        <p>I collegamenti verso WhatsApp, Google Maps, Instagram e Facebook portano a servizi esterni, che applicano cookie e informative proprie solo dopo che li apri.</p>
      </article>
      </main>
      <SiteFooter />
    </div>
  );
}
