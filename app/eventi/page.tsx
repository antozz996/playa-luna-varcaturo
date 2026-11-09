import type { Metadata } from "next";
import Link from "next/link";
import { PageMedia } from "../components/page-media";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { breadcrumbSchema, eventVenueSchema, jsonLd } from "../lib/schema";
import { eventWhatsapp, pageOpenGraph, siteUrl } from "../lib/site";

const title = "Eventi e feste private sul mare a Varcaturo";
const description =
  "Diciottesimi, compleanni, feste private ed eventi aziendali sul mare al Playa Luna di Marina di Varcaturo. La sera la struttura è riservata agli eventi privati.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/eventi" },
  openGraph: pageOpenGraph({ path: "/eventi", title: `${title} | Playa Luna`, description, image: "/images/playa-luna/events/hero.webp" }),
};

const eventTypes = [
  { number: "01", title: "Diciottesimi", text: "Musica, luci e una regia capace di trasformare una festa in un ricordo condiviso." },
  { number: "02", title: "Feste private", text: "Compleanni, lauree e ricorrenze costruite intorno al vostro modo di stare insieme." },
  { number: "03", title: "Cerimonie", text: "Tavole curate, cucina e accoglienza in una cornice mediterranea, davanti al mare." },
  { number: "04", title: "Corporate", text: "Pranzi, cene e appuntamenti aziendali con spazi flessibili e un’identità riconoscibile." },
];

type GalleryItem = { src?: string; video?: string; alt: string; caption: string; wide?: boolean };

const eventGallery: GalleryItem[] = [
  { src: "/images/playa-luna/events/gathering.webp", alt: "Ospiti durante un evento negli spazi del Playa Luna", caption: "Persone, atmosfera, mare", wide: true },
  { src: "/images/playa-luna/events/night-01.webp", alt: "La sala e la pista illuminate durante una festa serale al Playa Luna", caption: "Quando la notte prende vita" },
  { src: "/images/playa-luna/events/night-05.webp", alt: "Bottiglia celebrativa con luci da festa", caption: "Brindisi che restano" },
  { src: "/images/playa-luna/events/gallery-07-2f8a1650.webp", alt: "Buffet preparato per un evento al Playa Luna", caption: "La cucina entra in scena", wide: true },
  { video: "/videos/playa-luna/events-gallery-08.mp4", alt: "Torta con scintille durante una festa al Playa Luna", caption: "Il momento più atteso" },
  { src: "/images/playa-luna/events/corporate.webp", alt: "Dettaglio di un’esperienza organizzata durante un evento", caption: "Dettagli che danno carattere", wide: true },
];

const schema = [
  eventVenueSchema(`${siteUrl}/images/playa-luna/events/hero.webp`),
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Eventi", path: "/eventi" }]),
];

export default function EventsPage() {
  return (
    <div className="page-shell events-editorial-v2">
      <SiteHeader />
      <main id="main">

      <section className="events-hero-v2">
        <PageMedia
          video="/videos/playa-luna/pvt-playa.mp4"
          alt="Tavola allestita per un evento serale al Playa Luna"
          sizes="100vw"
          fill
          priority
          className="events-hero-image-v2"
        />
        <div className="events-hero-shade-v2" />
        <div className="shell events-hero-copy-v2">
          <h1 className="eyebrow">Eventi e feste private sul mare a Varcaturo</h1>
          <p className="display-title">La tua storia<br /><em>prende vita.</em></p>
          <p className="events-hero-lead-v2">Il mare come scenografia. Tutto il resto prende forma intorno a voi.</p>
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
          <p>Ogni evento parte da una sensazione: quella che volete lasciare alle persone. Playa Luna unisce spazi aperti, cucina interna, allestimenti e atmosfera in un’unica esperienza.</p>
          <p>Dal primo brindisi all’ultima canzone, costruiamo un ritmo coerente con l’occasione e con chi la vive.</p>
        </div>
      </section>

      <section className="shell events-gallery-v2" aria-label="Atmosfere degli eventi Playa Luna">
        {eventGallery.map((item) => (
          <figure
            className={item.wide ? "events-gallery-wide-v2" : undefined}
            key={item.caption}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <PageMedia
              src={item.src}
              video={item.video}
              alt={item.alt}
              fill
              sizes={item.wide ? "(max-width: 800px) 100vw, 66vw" : "(max-width: 800px) 100vw, 33vw"}
            />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
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

      </main>
      <SiteFooter />
      <a className="whatsapp-float" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events_float"><span aria-hidden="true">✦</span> WhatsApp</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </div>
  );
}
