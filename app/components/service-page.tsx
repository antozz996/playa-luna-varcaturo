import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { beachWhatsapp, siteUrl } from "../lib/site";

type ServicePageProps = {
  slug: string;
  eyebrow: string;
  title: string;
  emphasis: string;
  intro: string;
  body: string;
  image: string;
  imageAlt: string;
  detailImage: string;
  detailAlt: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaEvent?: string;
  telephone?: string;
  schemaType?: "Beach" | "Restaurant" | "EventVenue" | "LocalBusiness";
};

export function ServicePage({
  slug,
  eyebrow,
  title,
  emphasis,
  intro,
  body,
  image,
  imageAlt,
  detailImage,
  detailAlt,
  features,
  ctaLabel = "Chiedi informazioni",
  ctaHref = beachWhatsapp,
  ctaEvent = "whatsapp_beach",
  telephone,
  schemaType = "LocalBusiness",
}: ServicePageProps) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: `Playa Luna · ${eyebrow}`,
      url: `${siteUrl}/${slug}/`,
      telephone,
      isPartOf: { "@type": "LocalBusiness", name: "Playa Luna", url: siteUrl },
      image: `${siteUrl}${image}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Marina di Varcaturo, 42",
        addressLocality: "Giugliano in Campania",
        addressRegion: "NA",
        addressCountry: "IT",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: eyebrow, item: `${siteUrl}/${slug}/` },
      ],
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <section className="service-hero" aria-labelledby="service-title">
        <Image src={image} alt={imageAlt} width={960} height={1200} priority unoptimized sizes="100vw" />
        <div className="service-hero-shade" />
        <div className="shell service-hero-copy">
          <nav className="breadcrumbs" aria-label="Percorso"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></nav>
          <p className="eyebrow light">{eyebrow} · Playa Luna</p>
          <h1 id="service-title">{title}<br /><em>{emphasis}</em></h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="service-content shell section-space">
        <div className="service-main-copy">
          <p className="eyebrow">Informazioni</p>
          <h2>Quello che<br /><em>trovi qui.</em></h2>
          <p>{body}</p>
          <a className="pill-button dark" href={ctaHref} target="_blank" rel="noreferrer" data-event={ctaEvent}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="service-facts" aria-label={`Caratteristiche ${eyebrow}`}>
          {features.map((feature, index) => (
            <div key={feature}><span>{String(index + 1).padStart(2, "0")}</span><p>{feature}</p></div>
          ))}
        </div>
        <figure className="service-detail-image">
          <Image src={detailImage} alt={detailAlt} width={960} height={1200} unoptimized sizes="(max-width: 800px) 100vw, 36vw" />
        </figure>
      </section>

      <section className="service-cta">
        <div className="shell">
          <p className="eyebrow light">Playa Luna · Marina di Varcaturo</p>
          <h2>Organizza la tua<br /><em>giornata sul mare.</em></h2>
          <a className="pill-button linen" href={ctaHref} target="_blank" rel="noreferrer" data-event={ctaEvent}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <SiteFooter />
      <a className="whatsapp-float" href={ctaHref} target="_blank" rel="noreferrer" aria-label={ctaLabel} data-event={ctaEvent}>
        <span aria-hidden="true">✦</span> Contattaci
      </a>
    </main>
  );
}
