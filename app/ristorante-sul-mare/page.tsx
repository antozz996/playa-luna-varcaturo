import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { restaurantPhoneHref, restaurantPhoneNumber } from "../lib/site";
import { getMediaDocument, mediaAlt, mediaUrl, type ManagedImage } from "../lib/sanity";

export const metadata: Metadata = {
  title: "Ristorante sul mare a Varcaturo",
  description: "Cucina mediterranea, piatti di mare e pranzo vista mare al ristorante Playa Luna di Marina di Varcaturo.",
  alternates: { canonical: "/ristorante-sul-mare/" },
  openGraph: { title: "Ristorante Playa Luna sul mare", description: "Cucina mediterranea e pranzo sul mare a Varcaturo.", url: "/ristorante-sul-mare/", images: ["/og.png"] },
};

export default async function RestaurantPage() {
  const media = await getMediaDocument<Record<string, ManagedImage>>("restaurantMedia");
  return <ServicePage slug="ristorante-sul-mare" eyebrow="Restaurant" title="Il sapore" emphasis="del mare." intro="Il ristorante è parte della giornata Playa Luna: una sala aperta sulla luce, cucina mediterranea e tavoli da condividere." body="La proposta accompagna il ritmo del lido, dal pranzo agli aperitivi. Il mare resta il filo conduttore, insieme a ingredienti mediterranei, piatti curati e un ambiente informale ma attento ai dettagli." image={mediaUrl(media.hero, "/images/playa-luna/restaurant/hero.webp")} imageAlt={mediaAlt(media.hero, "La sala luminosa del ristorante Playa Luna durante il servizio")} detailImage={mediaUrl(media.detail, "/images/playa-luna/food-pasta.webp")} detailAlt={mediaAlt(media.detail, "Piatto di pasta mediterranea preparato al ristorante Playa Luna")} features={["Pranzo nella struttura sul mare", "Cucina mediterranea e piatti di pesce", "Proposte da condividere", "Cocktail e aperitivo"]} ctaLabel="Prenota un tavolo" ctaHref={restaurantPhoneHref} ctaEvent="phone_restaurant" telephone={restaurantPhoneNumber} schemaType="Restaurant" />;
}
