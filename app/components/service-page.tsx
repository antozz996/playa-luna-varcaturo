import Image from "next/image";
import Link from "next/link";
import { createDataAttribute } from "next-sanity";
import { ExperienceVideo } from "./experience-video";
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
  heroObjectPosition?: string;
  detailObjectPosition?: string;
  heroVideo?: string;
  heroVideoObjectPosition?: string;
  detailVideo?: string;
  detailVideoObjectPosition?: string;
  sanityDocumentId?: string;
  sanityDocumentType?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const studioUrl = "https://playa-luna-varcaturo-delta.vercel.app/studio";

function imageDataAttribute(
  id: string | undefined,
  type: string | undefined,
  path: string,
) {
  if (!id || !type || !projectId) return undefined;

  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
    id,
    type,
    path,
  }).toString();
}

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
  heroObjectPosition = "center 55%",
  detailObjectPosition = "50% 50%",
  heroVideo,
  heroVideoObjectPosition = "50% 50%",
  detailVideo,
  detailVideoObjectPosition = "50% 50%",
  sanityDocumentId,
  sanityDocumentType,
}: ServicePageProps) {
  const structuredImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: `Playa Luna · ${eyebrow}`,
      url: `${siteUrl}/${slug}/`,
      telephone,
      isPartOf: { "@type": "LocalBusiness", name: "Playa Luna", url: siteUrl },
      image: structuredImage,
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

  const heroSanity = imageDataAttribute(
    sanityDocumentId,
    sanityDocumentType,
    heroVideo ? "heroVideo" : "hero",
  );
  const detailSanity = imageDataAttribute(
    sanityDocumentId,
    sanityDocumentType,
    detailVideo ? "detailVideo" : "detail",
  );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />

      <section className="service-hero" aria-labelledby="service-title" data-sanity={heroSanity}>
        {heroVideo ? (
          <ExperienceVideo
            src={heroVideo}
            objectPosition={heroVideoObjectPosition}
            fill
            priority
            zIndex={-2}
          />
        ) : (
          <Image
            src={image}
            alt={imageAlt}
            width={960}
            height={1200}
            priority
            sizes="100vw"
            style={{ objectPosition: heroObjectPosition }}
          />
        )}

        <div className="service-hero-shade" />

        <div className="shell service-hero-copy">
          <nav className="breadcrumbs" aria-label="Percorso">
            <Link href="/">Home</Link><span>/</span><span>{eyebrow}</span>
          </nav>
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
            <div key={feature}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{feature}</p>
            </div>
          ))}
        </div>

        <figure
          className="service-detail-image"
          data-sanity={detailSanity}
          style={detailVideo ? { position: "relative", minHeight: 680, overflow: "hidden" } : undefined}
        >
          {detailVideo ? (
            <ExperienceVideo src={detailVideo} objectPosition={detailVideoObjectPosition} fill />
          ) : (
            <Image
              src={detailImage}
              alt={detailAlt}
              width={960}
              height={1200}
              sizes="(max-width: 800px) 100vw, 36vw"
              style={{ objectPosition: detailObjectPosition }}
            />
          )}
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
