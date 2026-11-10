import type { Metadata } from "next";
import { languageAlternates } from "@/app/lib/i18n";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { address, hasLegalEntity, legalEntity, pageOpenGraph } from "@/app/lib/site";

const description = "Informativa sul trattamento dei dati personali del sito Playa Luna (art. 13 Regolamento UE 2016/679).";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: languageAlternates("it", "/privacy"),
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({ path: "/privacy", title: "Privacy Policy | Playa Luna", description }),
};

export default function PrivacyPage() {
  const email = legalEntity.email;
  return (
    <div className="page-shell">
      <div className="legal-header"><SiteHeader path="/privacy" /></div>
      <main id="main">
      <article className="legal-page shell">
        <p className="eyebrow">Informativa ai sensi dell’art. 13 GDPR</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Ultimo aggiornamento: 9 novembre 2026</p>

        <h2>1. Titolare del trattamento</h2>
        {hasLegalEntity ? (
          <p>
            Il titolare del trattamento è {legalEntity.name}, P.IVA {legalEntity.vatNumber}, con sede legale in{" "}
            {legalEntity.registeredOffice}. Contatti: <a href={`mailto:${email}`}>{email}</a>
            {legalEntity.pec ? (
              <> · PEC <a href={`mailto:${legalEntity.pec}`}>{legalEntity.pec}</a></>
            ) : null}
            .
          </p>
        ) : (
          <p>
            Il titolare del trattamento è il gestore di Playa Luna, {address.streetAddress}, {address.postalCode}{" "}
            {address.locality} ({address.region}). Per qualsiasi richiesta relativa ai dati personali puoi scrivere a{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
        )}

        <h2>2. Quali dati trattiamo</h2>
        <p>
          <strong>Dati di navigazione:</strong> per mostrare le pagine, i server che ospitano il sito registrano dati
          tecnici come indirizzo IP, tipo di browser, pagina richiesta, data e ora.{" "}
          <strong>Preferenza sui cookie:</strong> la scelta fatta nel banner viene salvata sul tuo dispositivo.{" "}
          <strong>Statistiche di utilizzo:</strong> solo se acconsenti, Google Analytics e Microsoft Clarity raccolgono
          dati sull’uso del sito (pagine visitate, clic, dispositivo, posizione approssimativa).{" "}
          <strong>Dati che ci invii tu:</strong> quando ci contatti per telefono, WhatsApp o email trattiamo i dati che
          scegli di comunicarci (nome, numero, data e dettagli della prenotazione o dell’evento). Il sito non contiene
          moduli di raccolta dati.
        </p>

        <h2>3. Finalità e basi giuridiche</h2>
        <ul>
          <li><strong>Rispondere alle richieste e gestire prenotazioni ed eventi</strong> — misure precontrattuali e contrattuali richieste da te (art. 6.1.b GDPR).</li>
          <li><strong>Far funzionare il sito e proteggerlo da abusi</strong> — legittimo interesse del titolare (art. 6.1.f GDPR).</li>
          <li><strong>Statistiche e miglioramento del sito</strong> con Google Analytics e Microsoft Clarity — solo con il tuo consenso (art. 6.1.a GDPR), revocabile in qualsiasi momento.</li>
          <li><strong>Adempiere a obblighi di legge</strong> (ad esempio fiscali e contabili) — art. 6.1.c GDPR.</li>
        </ul>
        <p>Il conferimento dei dati è facoltativo, ma senza i dati di contatto non possiamo rispondere alle richieste o gestire le prenotazioni. Non effettuiamo decisioni automatizzate né profilazione.</p>

        <h2>4. Destinatari e responsabili</h2>
        <p>I dati possono essere trattati, per conto del titolare e nei limiti delle rispettive funzioni, da:</p>
        <ul>
          <li><strong>Vercel Inc.</strong> — hosting del sito;</li>
          <li><strong>Google Ireland Ltd / Google LLC</strong> — Google Analytics (solo con consenso);</li>
          <li><strong>Microsoft Ireland Operations Ltd / Microsoft Corporation</strong> — Microsoft Clarity (solo con consenso);</li>
          <li>consulenti e fornitori che supportano la gestione amministrativa e contabile.</li>
        </ul>
        <p>Quando usi i link a WhatsApp, Google Maps, Instagram o Facebook passi ai servizi di Meta e Google, che trattano i tuoi dati come titolari autonomi secondo le proprie informative.</p>

        <h2>5. Trasferimenti fuori dall’Unione europea</h2>
        <p>Alcuni fornitori (Vercel, Google, Microsoft) possono trattare dati negli Stati Uniti. I trasferimenti avvengono sulla base dell’EU-U.S. Data Privacy Framework, a cui questi fornitori aderiscono, e/o delle clausole contrattuali standard approvate dalla Commissione europea.</p>

        <h2>6. Per quanto tempo conserviamo i dati</h2>
        <ul>
          <li>Richieste e prenotazioni: per il tempo necessario a gestirle; i dati fiscali per i tempi previsti dalla legge (10 anni).</li>
          <li>Dati di navigazione tecnici: per il periodo strettamente necessario alla sicurezza del servizio.</li>
          <li>Google Analytics: fino a 14 mesi. Microsoft Clarity: fino a 13 mesi.</li>
          <li>Preferenza sui cookie: 6 mesi, poi ti verrà chiesta di nuovo.</li>
        </ul>

        <h2>7. I tuoi diritti</h2>
        <p>
          Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione, limitazione del trattamento, portabilità
          dei dati e opporti al trattamento basato sul legittimo interesse (artt. 15–22 GDPR), scrivendo a{" "}
          <a href={`mailto:${email}`}>{email}</a>. Puoi revocare il consenso alle statistiche dalla{" "}
          <Link href="/cookie">pagina cookie</Link>, senza conseguenze sui trattamenti già effettuati. Hai inoltre diritto
          di proporre reclamo al Garante per la protezione dei dati personali (
          <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">www.garanteprivacy.it</a>).
        </p>
      </article>
      </main>
      <SiteFooter />
    </div>
  );
}
