import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import {
  beachPhoneNumber,
  beachWhatsapp,
  eventPhoneNumber,
  eventWhatsapp,
  mapsUrl,
  restaurantPhoneHref,
  restaurantPhoneNumber,
} from "../lib/site";

export const metadata: Metadata = {
  title: "Contatti e indicazioni",
  description: "Contatta Playa Luna a Marina di Varcaturo per prenotare la spiaggia, il ristorante o richiedere informazioni per un evento.",
  alternates: { canonical: "/contatti/" },
  openGraph: { title: "Contatti Playa Luna", description: "Prenotazioni beach, ristorante, eventi e indicazioni stradali.", url: "/contatti/", images: ["/og.png"] },
};

export default function ContactsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="contact-hero">
        <Image src="/images/playa-luna/sunset-view.webp" alt="Vista del mare da Playa Luna a Marina di Varcaturo" width={960} height={1200} priority unoptimized sizes="100vw" />
        <div className="service-hero-shade" />
        <div className="shell service-hero-copy">
          <p className="eyebrow light">Contatti · Marina di Varcaturo</p>
          <h1>Parliamo della tua<br /><em>giornata al mare.</em></h1>
          <p>Scegli il contatto più adatto: prenotazioni beach, tavoli, eventi o indicazioni stradali.</p>
        </div>
      </section>
      <section className="contact-options shell section-space" aria-label="Contatti Playa Luna">
        <a href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach"><span>01</span><h2>Beach Club</h2><p>{beachPhoneNumber} · Prenota o chiedi disponibilità su WhatsApp.</p><b>Apri WhatsApp ↗</b></a>
        <a href={restaurantPhoneHref} data-event="phone_restaurant"><span>02</span><h2>Ristorante</h2><p>Chiama {restaurantPhoneNumber} per prenotare un tavolo.</p><b>Chiama ora ↗</b></a>
        <a href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events"><span>03</span><h2>Eventi</h2><p>{eventPhoneNumber} · Raccontaci che tipo di occasione vuoi organizzare.</p><b>Richiedi informazioni ↗</b></a>
        <a href={mapsUrl} target="_blank" rel="noreferrer" data-event="directions_click"><span>04</span><h2>Come arrivare</h2><p>Via Marina di Varcaturo, 42 · Giugliano in Campania.</p><b>Apri la mappa ↗</b></a>
      </section>
      <SiteFooter />
    </main>
  );
}
