import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { restaurantFaqs } from "../lib/faqs";
import { restaurantOpeningHours } from "../lib/schema";
import {
  openingHours,
  pageOpenGraph,
  restaurantPhoneHref,
  restaurantPhoneNumber,
  restaurantWhatsapp,
  siteUrl,
} from "../lib/site";

const title = "Ristorante sul mare a Varcaturo";
const description =
  "Cucina mediterranea e piatti di mare al ristorante Playa Luna di Marina di Varcaturo. Pranzo tutti i giorni 12:30–16, tutto l'anno. Prenota un tavolo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ristorante-sul-mare" },
  openGraph: pageOpenGraph({ path: "/ristorante-sul-mare", title: `${title} | Playa Luna`, description }),
};

export default function RestaurantPage() {
  return (
    <ServicePage
      slug="ristorante-sul-mare"
      eyebrow="Ristorante"
      heading="Ristorante sul mare a Marina di Varcaturo"
      title="Il sapore"
      emphasis="del mare."
      intro={`Sashimi di ricciola, polpo alla brace, linguina all’astice, spaghetti alle vongole: cucina di mare a pranzo tutti i giorni, dalle ${openingHours.restaurant.opens} alle ${openingHours.restaurant.closes}, tutto l’anno.`}
      body="La proposta accompagna il ritmo del lido, dalla colazione all'aperitivo al bar, fino al pranzo in sala. Il mare resta il filo conduttore, insieme a ingredienti mediterranei, piatti curati e un ambiente informale ma attento ai dettagli. La sera la struttura apre solo per eventi privati."
      image="/images/playa-luna/restaurant/hero-2f8a7552.webp"
      imageAlt="La sala luminosa del ristorante Playa Luna durante il servizio"
      heroObjectPosition="50% 35%"
      detailImage="/images/playa-luna/restaurant/detail-carpaccio.webp"
      detailAlt="Carpaccio gourmet servito al ristorante Playa Luna di Varcaturo, con ingredienti selezionati e impiattamento curato."
      features={[
        "Pranzo tutti i giorni, 12:30–16",
        "Cucina mediterranea e piatti di pesce",
        "Colazione, bar e aperitivo",
        "Cene solo per eventi privati",
      ]}
      infoHeading={["A tavola,", "vista mare."]}
      ctaHeading={["Ti teniamo", "un tavolo?"]}
      menuHref="/menu-ristorante"
      faqs={restaurantFaqs}
      ctaLabel="Prenota su WhatsApp"
      floatLabel="Prenota un tavolo"
      ctaHref={restaurantWhatsapp}
      ctaEvent="whatsapp_restaurant"
      secondaryCta={{ href: restaurantPhoneHref, label: `Chiama ${restaurantPhoneNumber}`, event: "phone_restaurant" }}
      telephone={restaurantPhoneNumber}
      schemaType="Restaurant"
      schemaExtra={{
        servesCuisine: ["Mediterranea", "Pesce"],
        hasMenu: `${siteUrl}/menu-ristorante`,
        acceptsReservations: true,
        openingHoursSpecification: restaurantOpeningHours,
      }}
    />
  );
}
