import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Faq } from "@/app/components/faq";
import { contactFaqsEn } from "@/app/lib/faqs";
import { languageAlternates, whatsappLinks } from "@/app/lib/i18n";
import { breadcrumbSchema, businessSchema, jsonLd } from "@/app/lib/schema";
import {
  address,
  beachPhoneNumber,
  eventPhoneNumber,
  hoursLabel,
  mapsUrl,
  openingHours,
  pageOpenGraph,
  restaurantPhoneNumber,
  siteUrl,
} from "@/app/lib/site";

// Rebuild weekly so the seasonal opening-hours dates in structured data stay current.
export const revalidate = 604800;

const title = "Contact, opening hours and directions";
const description =
  `Opening hours, phone numbers and directions for Playa Luna in Marina di Varcaturo, near Naples: beach ${hoursLabel.lido} and bar ${hoursLabel.barSummer} from May to September, bar ${hoursLabel.barWinter} from October to April, lunch ${hoursLabel.lunch} all year round.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("en", "/en/contact"),
  openGraph: pageOpenGraph({ path: "/en/contact", title: `${title} | Playa Luna`, description, locale: "en" }),
};

const h = openingHours;
const hours = [
  { label: "Bar (summer)", opens: h.barSummer.opens, closes: h.barSummer.closes, months: "May – September" },
  { label: "Bar (winter)", opens: h.barWinter.opens, closes: h.barWinter.closes, months: "October – April" },
  { label: "Beach", opens: h.beachSeason.opens, closes: h.beachSeason.closes, months: "May – September" },
  { label: "Restaurant (lunch)", opens: h.restaurant.opens, closes: h.restaurant.closes, months: "All year round" },
];

export default function ContactPageEn() {
  const wa = whatsappLinks.en;
  return (
    <div className="page-shell">
      <SiteHeader locale="en" path="/en/contact" />
      <main id="main">
      <section className="contact-hero">
        <Image src="/images/playa-luna/sunset-view.webp" alt="Sea view from Playa Luna in Marina di Varcaturo" width={960} height={1200} priority sizes="100vw" />
        <div className="service-hero-shade" />
        <div className="shell service-hero-copy">
          <h1 className="eyebrow light">Contact and opening hours · Playa Luna, Marina di Varcaturo</h1>
          <p className="display-title">Let’s plan your<br /><em>day by the sea.</em></p>
          <p>Choose the right contact: beach bookings, tables, events or directions.</p>
        </div>
      </section>
      <section className="contact-options shell section-space" aria-label="Contact Playa Luna">
        <a href={wa.beach} target="_blank" rel="noreferrer" data-event="whatsapp_beach"><span>01</span><h2>Beach Club</h2><p>{beachPhoneNumber} · Book or check availability on WhatsApp.</p><b>Open WhatsApp <span aria-hidden="true">↗</span></b></a>
        <a href={wa.restaurant} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant"><span>02</span><h2>Restaurant</h2><p>{restaurantPhoneNumber} · Book a table on WhatsApp or give us a call.</p><b>Open WhatsApp <span aria-hidden="true">↗</span></b></a>
        <a href={wa.events} target="_blank" rel="noreferrer" data-event="whatsapp_events"><span>03</span><h2>Events</h2><p>{eventPhoneNumber} · Tell us what kind of occasion you are planning.</p><b>Ask for information <span aria-hidden="true">↗</span></b></a>
        <a href={mapsUrl} target="_blank" rel="noreferrer" data-event="directions_click"><span>04</span><h2>Getting here</h2><p>{address.streetAddress} · {address.postalCode} {address.locality} ({address.region}), {address.area}, Italy.</p><b>Open the map <span aria-hidden="true">↗</span></b></a>
      </section>
      <section className="contact-hours shell" aria-labelledby="hours-title">
        <p className="eyebrow">Every day</p>
        <h2 id="hours-title">Opening <em>hours.</em></h2>
        <dl>
          {hours.map((row) => (
            <div key={row.label}><dt>{row.label}</dt><dd>{row.opens} – {row.closes}<span>{row.months}</span></dd></div>
          ))}
        </dl>
        <p>In the evening the venue is open for private events only.</p>
      </section>
      <Faq items={contactFaqsEn} locale="en" />
      </main>
      <SiteFooter locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([businessSchema(`${siteUrl}/images/playa-luna/sunset-view.webp`), breadcrumbSchema([{ name: "Home", path: "/en" }, { name: "Contact", path: "/en/contact" }])])} />
    </div>
  );
}
