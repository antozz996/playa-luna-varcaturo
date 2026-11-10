import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { Faq } from "@/app/components/faq";
import { contactFaqs } from "@/app/lib/faqs";
import { breadcrumbSchema, businessSchema, jsonLd } from "@/app/lib/schema";
import {
  address,
  beachPhoneNumber,
  beachWhatsapp,
  eventPhoneNumber,
  eventWhatsapp,
  hoursLabel,
  mapsUrl,
  openingHours,
  pageOpenGraph,
  restaurantPhoneNumber,
  restaurantWhatsapp,
  siteUrl,
} from "@/app/lib/site";

// Rebuild weekly so the seasonal opening-hours dates in structured data stay current.
export const revalidate = 604800;

const title = "Contatti, orari e come arrivare";
const description =
  `Orari, telefono e indicazioni per Playa Luna a Marina di Varcaturo: lido ${hoursLabel.lido} e bar ${hoursLabel.barSummer} da maggio a settembre, bar ${hoursLabel.barWinter} da ottobre ad aprile, pranzo ${hoursLabel.lunch} tutto l'anno.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contatti" },
  openGraph: pageOpenGraph({ path: "/contatti", title: `${title} | Playa Luna`, description }),
};

export default function ContactsPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main id="main">
      <section className="contact-hero">
        <Image src="/images/playa-luna/sunset-view.webp" alt="Vista del mare da Playa Luna a Marina di Varcaturo" width={960} height={1200} priority sizes="100vw" />
        <div className="service-hero-shade" />
        <div className="shell service-hero-copy">
          <h1 className="eyebrow light">Contatti e orari · Playa Luna Marina di Varcaturo</h1>
          <p className="display-title">Parliamo della tua<br /><em>giornata al mare.</em></p>
          <p>Scegli il contatto più adatto: prenotazioni beach, tavoli, eventi o indicazioni stradali.</p>
        </div>
      </section>
      <section className="contact-options shell section-space" aria-label="Contatti Playa Luna">
        <a href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach"><span>01</span><h2>Beach Club</h2><p>{beachPhoneNumber} · Prenota o chiedi disponibilità su WhatsApp.</p><b>Apri WhatsApp <span aria-hidden="true">↗</span></b></a>
        <a href={restaurantWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant"><span>02</span><h2>Ristorante</h2><p>{restaurantPhoneNumber} · Prenota un tavolo su WhatsApp o chiamaci.</p><b>Apri WhatsApp <span aria-hidden="true">↗</span></b></a>
        <a href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events"><span>03</span><h2>Eventi</h2><p>{eventPhoneNumber} · Raccontaci che tipo di occasione vuoi organizzare.</p><b>Richiedi informazioni <span aria-hidden="true">↗</span></b></a>
        <a href={mapsUrl} target="_blank" rel="noreferrer" data-event="directions_click"><span>04</span><h2>Come arrivare</h2><p>{address.streetAddress} · {address.postalCode} {address.locality} ({address.region}), {address.area}.</p><b>Apri la mappa <span aria-hidden="true">↗</span></b></a>
      </section>
      <section className="contact-hours shell" aria-labelledby="hours-title">
        <p className="eyebrow">Tutti i giorni</p>
        <h2 id="hours-title">Orari di <em>apertura.</em></h2>
        <dl>
          <div><dt>{openingHours.barSummer.label}</dt><dd>{openingHours.barSummer.opens} – {openingHours.barSummer.closes}<span>{openingHours.barSummer.months}</span></dd></div>
          <div><dt>{openingHours.barWinter.label}</dt><dd>{openingHours.barWinter.opens} – {openingHours.barWinter.closes}<span>{openingHours.barWinter.months}</span></dd></div>
          <div><dt>{openingHours.beachSeason.label}</dt><dd>{openingHours.beachSeason.opens} – {openingHours.beachSeason.closes}<span>{openingHours.beachSeason.months}</span></dd></div>
          <div><dt>{openingHours.restaurant.label}</dt><dd>{openingHours.restaurant.opens} – {openingHours.restaurant.closes}<span>{openingHours.restaurant.months}</span></dd></div>
        </dl>
        <p>{openingHours.evening}</p>
      </section>
      <Faq items={contactFaqs} />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([businessSchema(`${siteUrl}/images/playa-luna/sunset-view.webp`), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contatti", path: "/contatti" }])])} />
    </div>
  );
}
