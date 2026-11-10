import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { FaqItem } from "../lib/faqs";
import { breadcrumbSchema, departmentSchema, jsonLd } from "../lib/schema";
import { Faq } from "./faq";
import { KeyFacts, type KeyFact } from "./key-facts";
import { ui, whatsappLinks, type Locale } from "../lib/i18n";
import { siteUrl } from "../lib/site";

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
  locale?: Locale;
  /** Short seasonal notice shown under the hero intro (e.g. "Il lido riapre a maggio"). */
  notice?: string;
  /** Optional second contact next to the main CTA (e.g. a phone call). */
  secondaryCta?: { href: string; label: string; event: string };
  /** "Info rapide" block shown right after the hero. */
  facts?: KeyFact[];
  /** Two-line headings (second line in italics) for the info and closing CTA sections. */
  infoHeading?: [string, string];
  ctaHeading?: [string, string];
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
  locale = "it",
  ctaLabel = ui[locale].defaultCta,
  floatLabel = ui[locale].floatBook,
  ctaHref = whatsappLinks[locale].beach,
  ctaEvent = "whatsapp_beach",
  menuHref,
  telephone,
  schemaType = "LocalBusiness",
  schemaExtra,
  faqs,
  notice,
  secondaryCta,
  facts,
  infoHeading = ["Quello che", "trovi qui."],
  ctaHeading = ["Organizza la tua", "giornata sul mare."],
  heroObjectPosition = "center 55%",
  detailObjectPosition = "50% 50%",
}: ServicePageProps) {
  const t = ui[locale];
  const home = locale === "en" ? "/en" : "/";
  const path = locale === "en" ? `/en/${slug}` : `/${slug}`;
  const structuredImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  const structuredData = [
    departmentSchema({
      type: schemaType,
      name: `Playa Luna · ${eyebrow}`,
      path,
      image: structuredImage,
      telephone,
      extra: { ...schemaExtra, ...(locale === "en" ? { inLanguage: "en" } : {}) },
    }),
    breadcrumbSchema([
      { name: t.breadcrumbHome, path: home },
      { name: eyebrow, path },
    ]),
  ];

  // tel: links must not open a new tab (it leaves an empty tab on desktop).
  const ctaTarget = ctaHref.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <SiteHeader locale={locale} path={path} />
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
          <nav className="breadcrumbs" aria-label={locale === "en" ? "Breadcrumb" : "Percorso"}>
            <Link href={home}>{t.breadcrumbHome}</Link><span>/</span><span>{eyebrow}</span>
          </nav>
          <h1 id="service-title" className="eyebrow light">{heading}</h1>
          <p className="display-title">{title}<br /><em>{emphasis}</em></p>
          <p>{intro}</p>
          {notice ? <p className="season-notice">{notice}</p> : null}
        </div>
      </section>

      {facts?.length ? <KeyFacts id="info-rapide" title={t.quickInfo} facts={facts} /> : null}

      <section className="service-content shell section-space">
        <div className="service-main-copy">
          <p className="eyebrow">{t.info}</p>
          <h2>{infoHeading[0]}{" "}<br /><em>{infoHeading[1]}</em></h2>
          <p>{body}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a className="pill-button dark" href={ctaHref} {...ctaTarget} data-event={ctaEvent}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </a>
            {secondaryCta ? (
              <a className="pill-button dark" href={secondaryCta.href} data-event={secondaryCta.event}>
                {secondaryCta.label}
              </a>
            ) : null}
            {menuHref ? (
              <Link className="pill-button dark" href={menuHref} data-event="menu_view">
                {t.seeMenu} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="service-facts" role="group" aria-label={`${t.featuresOf} ${eyebrow}`}>
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

      {faqs?.length ? <Faq items={faqs} locale={locale} /> : null}

      <section className="service-cta">
        <div className="shell">
          <p className="eyebrow light">Playa Luna · Marina di Varcaturo</p>
          <h2>{ctaHeading[0]}{" "}<br /><em>{ctaHeading[1]}</em></h2>
          <a className="pill-button linen" href={ctaHref} {...ctaTarget} data-event={ctaEvent}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      </main>

      <SiteFooter locale={locale} />
      <a className="whatsapp-float" href={ctaHref} {...ctaTarget} data-event={ctaEvent}>
        <span aria-hidden="true">✦</span> {floatLabel}
      </a>
    </div>
  );
}
