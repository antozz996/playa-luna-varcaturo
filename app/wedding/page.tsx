import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { eventWhatsapp } from "../lib/site";

export const metadata: Metadata = {
  title: "Matrimonio sul mare a Napoli",
  description: "Ricevimento e matrimonio sul mare al Playa Luna di Marina di Varcaturo, con spazi vista mare, cucina e allestimenti personalizzati.",
  alternates: { canonical: "/wedding/" },
  openGraph: { title: "Wedding sul mare · Playa Luna", description: "Ricevimenti e promesse sul mare a Marina di Varcaturo.", url: "/wedding/", images: ["/og.png"] },
};

export default function WeddingPage() {
  return <ServicePage slug="wedding" eyebrow="Wedding" title="Promesse" emphasis="a pochi passi dal mare." intro="Una cornice mediterranea per ricevimenti e momenti da vivere tra luce naturale, cucina e dettagli personalizzati." body="La proposta wedding nasce dagli spazi reali di Playa Luna e viene costruita insieme alla coppia. Il mare accompagna il ricevimento, mentre allestimento, servizio e cucina vengono coordinati intorno al tipo di celebrazione." image="/images/playa-luna/events-detail.webp" imageAlt="Dettaglio elegante di un allestimento wedding al Playa Luna" detailImage="/images/playa-luna/sunset-view.webp" detailAlt="Vista sul mare e atmosfera mediterranea al tramonto" features={["Ricevimenti sul mare", "Spazi interni ed esterni", "Cucina e servizio coordinati", "Allestimenti definiti con la coppia"]} ctaLabel="Parliamo del tuo matrimonio" ctaHref={eventWhatsapp} ctaEvent="whatsapp_wedding" schemaType="EventVenue" />;
}
