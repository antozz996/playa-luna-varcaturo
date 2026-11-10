import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { FaqItem } from "../lib/faqs";
import { breadcrumbSchema, departmentSchema, jsonLd } from "../lib/schema";
import { Faq } from "./faq";
import { beachWhatsapp, siteUrl } from "../lib/site";

type ServicePageProps = {
  slug: string;
  eyebrow: string;
  /** Visible H1 with the page's main keyword, styled as an eyebrow. */
  heading: string;
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
  /** Short text of the floating mobile button (visible text = accessible name). */
  floatLabel?: string;
  ctaHref?: string;
  ctaEvent?: string;
  menuHref?: string;
  telephone?: string;
  schemaType?: "Beach" | "Restaurant" | "EventVenue" | "LocalBusiness" | "PublicSwimmingPool";
  /** Extra schema.org properties for this department (e.g. opening hours). */
  schemaExtra?: Record<string, unknown>;
  faqs?: FaqItem[];
  heroObjectPosition?: string;
  detailObjectPosition?: string;
};

export function ServicePage({
  slug,
  eyebrow,
  heading,
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
  floatLabel = "Prenota",
  ctaHref = beachWhatsapp,
  ctaEvent = "whatsapp_beach",
  menuHref,
  telephone,
  schemaType = "LocalBusiness",
  schemaExtra,
  faqs,
  heroObjectPosition = "center 55%",
  detailObjectPosition = "50% 50%",
}: ServicePageProps) {
  const structuredImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const structuredData = [
    departmentSchema({
      type: schemaType,
      name: `Playa Luna · ${eyebrow}`,
      path: `/${slug}`,
      image: structuredImage,
      telephone,
      extra: schemaExtra,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: eyebrow, path: `/${slug}` },
    ]),
  ];

  // tel: links must not open a new tab (it leaves an empty tab on desktop).
  const ctaTarget = ctaHref.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <SiteHeader />
      <main id="main">

      <section className="service-hero" aria-labelledby="service-title">
        <Image
          src={image}
          alt={imageAlt}
          width={960}
          height={1200}
          priority
          sizes="100vw"
          style={{ objectPosition: heroObjectPosition }}
        />

        <div className="service-hero-shade" />

        <div className="shell service-hero-copy">
          <nav className="breadcrumbs" aria-label="Percorso">
            <Link href="/">Home</Link><span>/</span><span>{eyebrow}</span>
          </nav>
          <h1 id="service-title" className="eyebrow light">{heading}</h1>
          <p className="display-title">{title}<br /><em>{emphasis}</em></p>
          <p>{intro}</p>
        </div>
      </section>

      <section className="service-content shell section-space">
        <div className="service-main-copy">
          <p className="eyebrow">Informazioni</p>
          <h2>Quello che<br /><em>trovi qui.</em></h2>
          <p>{body}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a className="pill-button dark" href={ctaHref} {...ctaTarget} data-event={ctaEvent}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </a>
            {menuHref ? (
              <Link className="pill-button dark" href={menuHref} data-event="menu_view">
                Consulta il menu <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="service-facts" role="group" aria-label={`Caratteristiche ${eyebrow}`}>
          {features.map((feature, index) => (
            <div key={feature}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{feature}</p>
            </div>
          ))}
        </div>

        <figure className="service-detail-image">
          <Image
            src={detailImage}
            alt={detailAlt}
            width={960}
            height={1200}
            sizes="(max-width: 800px) 100vw, 36vw"
            style={{ objectPosition: detailObjectPosition }}
          />
        </figure>
      </section>

      {faqs?.length ? <Faq items={faqs} /> : null}

      <section className="service-cta">
        <div className="shell">
          <p className="eyebrow light">Playa Luna · Marina di Varcaturo</p>
          <h2>Organizza la tua<br /><em>giornata sul mare.</em></h2>
          <a className="pill-button linen" href={ctaHref} {...ctaTarget} data-event={ctaEvent}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      </main>

      <SiteFooter />
      <a className="whatsapp-float" href={ctaHref} {...ctaTarget} data-event={ctaEvent}>
        <span aria-hidden="true">✦</span> {floatLabel}
      </a>
    </div>
  );
}
