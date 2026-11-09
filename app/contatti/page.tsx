import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { breadcrumbSchema, businessSchema, jsonLd } from "../lib/schema";
import {
  address,
  beachPhoneNumber,
  beachWhatsapp,
  eventPhoneNumber,
  eventWhatsapp,
  mapsUrl,
  openingHours,
  pageOpenGraph,
  restaurantPhoneHref,
  restaurantPhoneNumber,
  siteUrl,
} from "../lib/site";

// Rebuild weekly so the seasonal opening-hours dates in structured data stay current.
export const revalidate = 604800;

const title = "Contatti, orari e come arrivare";
const description =
  "Orari, telefono e indicazioni per Playa Luna a Marina di Varcaturo: lido 8–19 da maggio a settembre, bar e ristorante 9–19 da ottobre ad aprile, pranzo 12:30–16 tutto l'anno.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contatti" },
  openGraph: pageOpenGraph({ path: "/contatti", title: `${title} | Playa Luna`, description }),
};

export default function ContactsPage() {
  return (
    <main>
      <SiteHeader />
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
        <a href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach"><span>01</span><h2>Beach Club</h2><p>{beachPhoneNumber} · Prenota o chiedi disponibilità su WhatsApp.</p><b>Apri WhatsApp ↗</b></a>
        <a href={restaurantPhoneHref} data-event="phone_restaurant"><span>02</span><h2>Ristorante</h2><p>Chiama {restaurantPhoneNumber} per prenotare un tavolo.</p><b>Chiama ora ↗</b></a>
        <a href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events"><span>03</span><h2>Eventi</h2><p>{eventPhoneNumber} · Raccontaci che tipo di occasione vuoi organizzare.</p><b>Richiedi informazioni ↗</b></a>
        <a href={mapsUrl} target="_blank" rel="noreferrer" data-event="directions_click"><span>04</span><h2>Come arrivare</h2><p>{address.streetAddress} · {address.postalCode} {address.locality} ({address.region}), {address.area}.</p><b>Apri la mappa ↗</b></a>
      </section>
      <section className="contact-hours shell" aria-labelledby="hours-title">
        <p className="eyebrow">Tutti i giorni</p>
        <h2 id="hours-title">Orari di <em>apertura.</em></h2>
        <dl>
          <div><dt>{openingHours.beachSeason.label}</dt><dd>{openingHours.beachSeason.opens} – {openingHours.beachSeason.closes}<span>{openingHours.beachSeason.months}</span></dd></div>
          <div><dt>{openingHours.offSeason.label}</dt><dd>{openingHours.offSeason.opens} – {openingHours.offSeason.closes}<span>{openingHours.offSeason.months}</span></dd></div>
          <div><dt>{openingHours.restaurant.label}</dt><dd>{openingHours.restaurant.opens} – {openingHours.restaurant.closes}<span>{openingHours.restaurant.months}</span></dd></div>
        </dl>
        <p>{openingHours.evening}</p>
      </section>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([businessSchema(`${siteUrl}/images/playa-luna/sunset-view.webp`), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contatti", path: "/contatti" }])])} />
    </main>
  );
}
