import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { eventWhatsapp } from "../lib/site";

export const metadata: Metadata = {
  title: "Eventi sul mare a Varcaturo",
  description: "Compleanni, lauree, cerimonie ed eventi aziendali sul mare al Playa Luna di Marina di Varcaturo. Richiedi informazioni.",
  alternates: { canonical: "/eventi/" },
  openGraph: { title: "Eventi sul mare · Playa Luna", description: "Feste private, cerimonie ed eventi aziendali a Varcaturo.", url: "/eventi/", images: ["/og.png"] },
};

export default function EventsPage() {
  return <ServicePage slug="eventi" eyebrow="Events" title="Il tuo evento" emphasis="davanti al mare." intro="Feste private, ricorrenze, cerimonie e appuntamenti aziendali costruiti intorno alle persone." body="Gli spazi di Playa Luna permettono di organizzare occasioni differenti mantenendo un’identità riconoscibile: il mare come scenografia, cucina interna, allestimenti curati e una gestione pensata sulle esigenze dell’evento." image="/images/playa-luna/events-detail.webp" imageAlt="Allestimento per un evento negli spazi di Playa Luna" detailImage="/images/playa-luna/restaurant.webp" detailAlt="Spazio coperto in legno utilizzabile per eventi al Playa Luna" features={["Compleanni e feste private", "Lauree e ricorrenze", "Cerimonie", "Pranzi ed eventi aziendali"]} ctaLabel="Richiedi informazioni" ctaHref={eventWhatsapp} ctaEvent="whatsapp_events" schemaType="EventVenue" />;
}
