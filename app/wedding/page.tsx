import type { Metadata } from "next";
import Link from "next/link";
import { CmsMedia } from "../components/cms-media";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { eventPhoneNumber, eventWhatsapp, siteUrl } from "../lib/site";
import {
  getMediaDocument,
  mediaCaption,
  mediaUrl,
  type ManagedImage,
} from "../lib/sanity";
import { type ManagedFile } from "../lib/sanity-file";
import { sanityImageAttribute } from "../lib/sanity-visual";

export const metadata: Metadata = {
  title: "Ricevimento di matrimonio sul mare a Napoli",
  description:
    "Ricevimenti di matrimonio sul mare al Playa Luna di Marina di Varcaturo, tra luce naturale, cucina e allestimenti personalizzati.",
  alternates: { canonical: "/wedding/" },
  openGraph: {
    title: "Wedding sul mare · Playa Luna",
    description: "Un ricevimento mediterraneo, intimo e personale, davanti al mare.",
    url: "/wedding/",
    images: ["/images/playa-luna/wedding/hero.webp"],
  },
};

const weddingDetails = [
  { number: "01", title: "Il luogo", text: "Spazi sul mare da vivere con naturalezza, dal benvenuto fino alla festa." },
  { number: "02", title: "La tavola", text: "Palette, fiori e mise en place costruiscono una scena che vi assomiglia." },
  { number: "03", title: "La cucina", text: "Un percorso pensato insieme, capace di accompagnare ogni momento del ricevimento." },
  { number: "04", title: "Il momento", text: "Tempi, luci e dettagli coordinati per lasciare spazio alle emozioni vere." },
];

const weddingGallery = [
  { src: "/images/playa-luna/wedding/place-setting.webp", alt: "Dettaglio della mise en place bianca e azzurra", caption: "Una tavola che parla di voi", slot: "gallery01" },
  { src: "/images/playa-luna/wedding/flowers.webp", alt: "Composizione floreale per un ricevimento al Playa Luna", caption: "Fiori, luce, materia", slot: "gallery02" },
  { src: "/images/playa-luna/wedding/sea-table.webp", alt: "Tavola elegante allestita davanti al mare", caption: "Il mare come scenografia", slot: "gallery03" },
  { src: "/images/playa-luna/wedding/table-by-sea.webp", alt: "Ricevimento con tavoli apparecchiati sulla terrazza sul mare", caption: "Il ricevimento all’aperto", slot: "gallery04" },
  { src: "/images/playa-luna/wedding/white-table.webp", alt: "Tavola nuziale bianca con composizioni floreali", caption: "Eleganza, senza distanza", slot: "gallery05" },
];

const baseSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Playa Luna Wedding",
  url: `${siteUrl}/wedding/`,
  telephone: eventPhoneNumber,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Marina di Varcaturo, 42",
    addressLocality: "Giugliano in Campania",
    addressRegion: "NA",
    addressCountry: "IT",
  },
};

function mediaPath(slot: string, video?: ManagedFile) {
  return video?.asset?._ref ? `${slot}Video` : slot;
}

export default async function WeddingPage() {
  const media = await getMediaDocument<Record<string, unknown>>("weddingMedia");
  const heroImage = media.hero as ManagedImage | undefined;
  const heroVideo = media.heroVideo as ManagedFile | undefined;
  const closingImage = media.closing as ManagedImage | undefined;
  const closingVideo = media.closingVideo as ManagedFile | undefined;
  const hero = mediaUrl(heroImage, "/images/playa-luna/wedding/hero.webp");
  const schema = { ...baseSchema, image: hero.startsWith("http") ? hero : `${siteUrl}${hero}` };

  return (
    <main className="wedding-editorial-v2">
      <SiteHeader />

      <section className="wedding-hero-v2">
        <CmsMedia
          image={heroImage}
          video={heroVideo}
          fallback="/images/playa-luna/wedding/hero.webp"
          altFallback="Tavola wedding bianca e azzurra allestita al Playa Luna"
          sizes="100vw"
          fill
          priority
          className="wedding-hero-image-v2"
          dataSanity={sanityImageAttribute("weddingMedia", "weddingMedia", mediaPath("hero", heroVideo))}
        />
        <div className="wedding-hero-shade-v2" />
        <div className="shell wedding-hero-copy-v2">
          <p className="eyebrow">Playa Luna · Wedding</p>
          <h1>Il vostro sì,<br /><em>con il mare davanti.</em></h1>
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
        {weddingGallery.map((item, index) => {
          const image = media[item.slot] as ManagedImage | undefined;
          const video = media[`${item.slot}Video`] as ManagedFile | undefined;
          return (
            <figure
              className={`wedding-gallery-item-v3 wedding-gallery-item-${index + 1}-v3`}
              key={item.slot}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <CmsMedia
                image={image}
                video={video}
                fallback={item.src}
                altFallback={item.alt}
                fill
                sizes={index < 2 ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 33vw"}
                dataSanity={sanityImageAttribute("weddingMedia", "weddingMedia", mediaPath(item.slot, video))}
              />
              <figcaption>{mediaCaption(image, item.caption)}</figcaption>
            </figure>
          );
        })}
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
          <CmsMedia
            image={closingImage}
            video={closingVideo}
            fallback="/images/playa-luna/wedding/favors.webp"
            altFallback="Dettagli e cadeaux preparati per un ricevimento al Playa Luna"
            fill
            sizes="(max-width: 800px) 100vw, 52vw"
            dataSanity={sanityImageAttribute("weddingMedia", "weddingMedia", mediaPath("closing", closingVideo))}
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

      <SiteFooter />
      <a className="whatsapp-float" href={eventWhatsapp} target="_blank" rel="noreferrer" aria-label="Scrivici su WhatsApp" data-event="whatsapp_wedding_float">WA</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
