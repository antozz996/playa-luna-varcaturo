import type { Metadata } from "next";
import { languageAlternates } from "@/app/lib/i18n";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { CookiePreferencesButton } from "@/app/components/cookie-preferences-button";
import { pageOpenGraph } from "@/app/lib/site";

const description = "Cookie e strumenti di memorizzazione usati dal sito Playa Luna, con fornitore, finalità e durata.";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description,
  alternates: languageAlternates("it", "/cookie"),
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

const marketing = [
  { name: "_fbp", provider: "Meta (Pixel di Meta)", purpose: "Riconosce il browser per misurare le visite arrivate dalle inserzioni e i contatti (WhatsApp, telefono)", duration: "3 mesi" },
  { name: "_fbc", provider: "Meta (Pixel di Meta)", purpose: "Ricorda il clic su un’inserzione Facebook o Instagram che ti ha portato sul sito", duration: "3 mesi" },
  { name: "fr", provider: "Meta (facebook.com)", purpose: "Pubblicità: mostrare e misurare le inserzioni a chi ha visitato il sito. È impostato da Meta sul proprio dominio se hai un account o hai usato i suoi servizi", duration: "3 mesi" },
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
      <div className="legal-header"><SiteHeader path="/cookie" /></div>
      <main id="main">
      <article className="legal-page shell">
        <p className="eyebrow">Preferenze</p>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Ultimo aggiornamento: 10 novembre 2026</p>

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

        <h2>Cookie di marketing (solo con consenso)</h2>
        <p>
          Con lo stesso consenso (“Accetta”) attiviamo il <strong>Pixel di Meta</strong>, che comunica a Meta le pagine
          visitate e i clic su WhatsApp e telefono. Lo usiamo per misurare i risultati delle nostre inserzioni su Facebook e
          Instagram e per mostrarle a chi ha già visitato il sito. Prima del consenso il sito non invia dati a Meta. Per la
          raccolta e la trasmissione dei dati Playa Luna e Meta sono contitolari del trattamento: i dettagli sono nella{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>
        <CookieTable caption="Cookie di marketing" rows={marketing} />

        <h2>Come cambiare scelta</h2>
        <p>Puoi rivedere o revocare il consenso in qualsiasi momento con il pulsante qui sotto: il banner verrà mostrato di nuovo. Se rifiuti, i cookie di analisi e di marketing impostati dal sito vengono cancellati (il cookie “fr” è sul dominio di Meta e si gestisce dalle impostazioni del tuo account Facebook o del browser). La scelta viene comunque richiesta di nuovo dopo 6 mesi o se cambiano gli strumenti utilizzati.</p>
        <CookiePreferencesButton />

        <h2>Servizi esterni</h2>
        <p>I collegamenti verso WhatsApp, Google Maps, Instagram e Facebook portano a servizi esterni, che applicano cookie e informative proprie solo dopo che li apri.</p>
      </article>
      </main>
      <SiteFooter />
    </div>
  );
}
