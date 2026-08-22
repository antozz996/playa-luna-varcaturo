import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { eventWhatsapp, siteUrl } from "../lib/site";

export const metadata: Metadata = {
  title: "Eventi sul mare a Varcaturo",
  description:
    "Diciottesimi, feste private, cerimonie ed eventi aziendali sul mare al Playa Luna di Marina di Varcaturo.",
  alternates: { canonical: "/eventi/" },
  openGraph: {
    title: "Eventi sul mare · Playa Luna",
    description: "Una scenografia sul mare per feste, cerimonie ed eventi che hanno qualcosa da raccontare.",
    url: "/eventi/",
    images: ["/images/playa-luna/events/hero.webp"],
  },
};

const eventTypes = [
  {
    number: "01",
    title: "Diciottesimi",
    text: "Musica, luci e una regia capace di trasformare una festa in un ricordo condiviso.",
  },
  {
    number: "02",
    title: "Feste private",
    text: "Compleanni, lauree e ricorrenze costruite intorno al vostro modo di stare insieme.",
  },
  {
    number: "03",
    title: "Cerimonie",
    text: "Tavole curate, cucina e accoglienza in una cornice mediterranea, davanti al mare.",
  },
  {
    number: "04",
    title: "Corporate",
    text: "Pranzi, cene e appuntamenti aziendali con spazi flessibili e un’identità riconoscibile.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Playa Luna Events",
  url: `${siteUrl}/eventi/`,
  image: `${siteUrl}/images/playa-luna/events/hero.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Marina di Varcaturo, 42",
    addressLocality: "Giugliano in Campania",
    addressRegion: "NA",
    addressCountry: "IT",
  },
};

export default function EventsPage() {
  return (
    <main className="events-editorial-v2">
      <SiteHeader />

      <section className="events-hero-v2">
        <Image
          className="events-hero-image-v2"
          src="/images/playa-luna/events/hero.webp"
          alt="Tavola allestita per un evento serale al Playa Luna"
          fill
          priority
          unoptimized
          sizes="100vw"
        />
        <div className="events-hero-shade-v2" />
        <div className="shell events-hero-copy-v2">
          <p className="eyebrow">Playa Luna · Events</p>
          <h1>La tua storia<br /><em>prende vita.</em></h1>
          <p className="events-hero-lead-v2">
            Il mare come scenografia. Tutto il resto prende forma intorno a voi.
          </p>
          <a className="pill-button light" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events">
            Raccontaci il tuo evento <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <nav className="shell breadcrumbs events-breadcrumbs-v2" aria-label="Percorso">
        <Link href="/">Home</Link><span>/</span><span>Eventi</span>
      </nav>

      <section className="shell events-intro-v2">
        <p className="eyebrow">Un luogo, molte possibilità</p>
        <h2>Il mare è solo<br /><em>l’inizio.</em></h2>
        <div className="events-intro-copy-v2">
          <p>
            Ogni evento parte da una sensazione: quella che volete lasciare alle persone. Playa Luna unisce spazi aperti, cucina interna, allestimenti e atmosfera in un’unica esperienza.
          </p>
          <p>
            Dal primo brindisi all’ultima canzone, costruiamo un ritmo coerente con l’occasione e con chi la vive.
          </p>
        </div>
      </section>

      <section className="shell events-gallery-v2" aria-label="Atmosfere degli eventi Playa Luna">
        <figure className="events-gallery-main-v2">
          <Image src="/images/playa-luna/events/gathering.webp" alt="Ospiti durante un evento negli spazi del Playa Luna" fill unoptimized sizes="(max-width: 800px) 100vw, 62vw" />
          <figcaption>Persone, atmosfera, mare</figcaption>
        </figure>
        <figure>
          <Image src="/images/playa-luna/events/buffet.webp" alt="Buffet preparato per un evento al Playa Luna" fill unoptimized sizes="(max-width: 800px) 100vw, 38vw" />
          <figcaption>La cucina entra in scena</figcaption>
        </figure>
        <figure>
          <Image src="/images/playa-luna/events/corporate.webp" alt="Dettaglio di un’esperienza organizzata durante un evento" fill unoptimized sizes="(max-width: 800px) 100vw, 38vw" />
          <figcaption>Dettagli che danno carattere</figcaption>
        </figure>
      </section>

      <section className="events-formats-v2">
        <div className="shell">
          <div className="events-formats-heading-v2">
            <p className="eyebrow">Il tuo formato</p>
            <h2>Una serata che<br /><em>parla di te.</em></h2>
          </div>
          <div className="events-format-grid-v2">
            {eventTypes.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell events-brief-v2">
        <p className="eyebrow">Il prossimo evento</p>
        <h2>Partiamo dalla<br /><em>vostra idea.</em></h2>
        <p>Data, numero di ospiti, tipo di occasione e atmosfera desiderata: raccontateci da qui.</p>
        <a className="pill-button" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events_bottom">
          Richiedi informazioni <span aria-hidden="true">↗</span>
        </a>
      </section>

      <SiteFooter />
      <a className="whatsapp-float" href={eventWhatsapp} target="_blank" rel="noreferrer" aria-label="Scrivici su WhatsApp" data-event="whatsapp_events_float">WA</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
