import type { Metadata } from "next";
import Link from "next/link";
import { PageMedia } from "../components/page-media";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { breadcrumbSchema, eventVenueSchema, jsonLd } from "../lib/schema";
import { eventWhatsapp, pageOpenGraph, siteUrl } from "../lib/site";

const title = "Matrimonio sul mare a Varcaturo, Napoli";
const description =
  "Ricevimenti di matrimonio sul mare al Playa Luna di Marina di Varcaturo, a pochi minuti da Napoli e Pozzuoli: luce naturale, cucina e allestimenti personalizzati.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/wedding" },
  openGraph: pageOpenGraph({ path: "/wedding", title: `${title} | Playa Luna`, description, image: "/images/playa-luna/wedding/hero.webp" }),
};

const weddingDetails = [
  { number: "01", title: "Il luogo", text: "Spazi sul mare da vivere con naturalezza, dal benvenuto fino alla festa." },
  { number: "02", title: "La tavola", text: "Palette, fiori e mise en place costruiscono una scena che vi assomiglia." },
  { number: "03", title: "La cucina", text: "Un percorso pensato insieme, capace di accompagnare ogni momento del ricevimento." },
  { number: "04", title: "Il momento", text: "Tempi, luci e dettagli coordinati per lasciare spazio alle emozioni vere." },
];

type GalleryItem = { src?: string; video?: string; alt: string; caption: string };

const weddingGallery: GalleryItem[] = [
  { src: "/images/playa-luna/wedding/place-setting.webp", alt: "Dettaglio della mise en place bianca e azzurra", caption: "Una tavola che parla di voi" },
  { src: "/images/playa-luna/wedding/flowers.webp", alt: "Composizione floreale per un ricevimento al Playa Luna", caption: "Fiori, luce, materia" },
  { video: "/videos/playa-luna/wedding-gallery-03.mp4", alt: "Tavola elegante allestita davanti al mare", caption: "Il mare come scenografia" },
  { src: "/images/playa-luna/wedding/white-table.webp", alt: "Tavola nuziale bianca con composizioni floreali", caption: "Eleganza, senza distanza" },
];

const schema = [
  eventVenueSchema(`${siteUrl}/images/playa-luna/wedding/hero.webp`),
  breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Wedding", path: "/wedding" }]),
];

export default function WeddingPage() {
  return (
    <div className="page-shell wedding-editorial-v2">
      <SiteHeader />
      <main id="main">

      <section className="wedding-hero-v2">
        <PageMedia
          src="/images/playa-luna/wedding/hero.webp"
          alt="Tavola wedding bianca e azzurra allestita al Playa Luna"
          sizes="100vw"
          fill
          priority
          className="wedding-hero-image-v2"
        />
        <div className="wedding-hero-shade-v2" />
        <div className="shell wedding-hero-copy-v2">
          <h1 className="eyebrow">Matrimoni e ricevimenti sul mare a Varcaturo, Napoli</h1>
          <p className="display-title">Il vostro sì,<br /><em>con il mare davanti.</em></p>
          <p>Un ricevimento mediterraneo, intimo e personale. Creato intorno a voi.</p>
          <a className="pill-button light" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_wedding">
            Raccontateci il vostro giorno <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <nav className="shell breadcrumbs wedding-breadcrumbs-v2" aria-label="Percorso">
        <Link href="/">Home</Link><span>/</span><span>Wedding</span>
      </nav>

      <section className="shell wedding-intro-v2">
        <p className="eyebrow">La vostra storia</p>
        <h2>Non un formato.<br /><em>La vostra atmosfera.</em></h2>
        <p>La luce, il mare, i fiori, la tavola. Ogni scelta trova il suo posto senza perdere spontaneità, per un ricevimento elegante ma mai distante.</p>
      </section>

      <section className="shell wedding-gallery-v3" aria-label="Dettagli wedding Playa Luna">
        <div className="wedding-gallery-copy-v3">
          <p className="eyebrow">Mediterraneo contemporaneo</p>
          <h2>La bellezza<br /><em>dei dettagli.</em></h2>
          <p>Materiali naturali, colori morbidi e composizioni leggere dialogano con il paesaggio. La scenografia non copre il luogo: lo rende vostro.</p>
        </div>
        {weddingGallery.map((item, index) => (
          <figure
            className={`wedding-gallery-item-v3 wedding-gallery-item-${index + 1}-v3`}
            key={item.caption}
            style={{ position: "relative", overflow: "hidden" }}
          >
            <PageMedia
              src={item.src}
              video={item.video}
              alt={item.alt}
              fill
              sizes={index < 2 ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 33vw"}
            />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="wedding-details-v2">
        <div className="shell">
          <p className="eyebrow">Un racconto completo</p>
          <div className="wedding-detail-grid-v2">
            {weddingDetails.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wedding-moment-v2">
        <div className="wedding-moment-image-v2" style={{ position: "relative", overflow: "hidden" }}>
          <PageMedia
            src="/images/playa-luna/wedding/closing-2f8a6584.webp"
            alt="Dettagli e cadeaux preparati per un ricevimento al Playa Luna"
            fill
            sizes="(max-width: 800px) 100vw, 52vw"
          />
        </div>
        <div className="wedding-moment-copy-v2">
          <p className="eyebrow">Cominciamo da voi</p>
          <h2>Immaginiamolo<br /><em>insieme.</em></h2>
          <p>Raccontateci la data, il numero di invitati e la sensazione che desiderate per il vostro ricevimento.</p>
          <a className="pill-button light" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_wedding_bottom">
            Parliamo del vostro matrimonio <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      </main>
      <SiteFooter />
      <a className="whatsapp-float" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_wedding_float"><span aria-hidden="true">✦</span> WhatsApp</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
    </div>
  );
}
