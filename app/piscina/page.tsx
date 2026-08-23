import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { beachPhoneNumber } from "../lib/site";
import { getMediaDocument, mediaAlt, mediaUrl, type ManagedImage } from "../lib/sanity";

export const metadata: Metadata = {
  title: "Piscina Playa Luna a Varcaturo",
  description: "Scopri la piscina interna alla struttura Playa Luna a Marina di Varcaturo, pensata per il divertimento dei bambini e il relax delle famiglie.",
  alternates: { canonical: "/piscina/" },
  openGraph: { title: "Piscina Playa Luna a Varcaturo", description: "La piscina interna alla struttura Playa Luna per famiglie e bambini.", url: "/piscina/", images: ["/og.png"] },
};

export default async function PoolPage() {
  const media = await getMediaDocument<Record<string, ManagedImage>>("poolMedia");
  return <ServicePage slug="piscina" eyebrow="Piscina" title="Un tuffo" emphasis="nell’estate." intro="La piscina appartiene alla struttura Playa Luna e completa la giornata al mare con uno spazio dedicato alle famiglie." body="È un ambiente interno a Playa Luna, distinto da qualsiasi altra struttura, dove i bambini possono divertirsi e gli adulti rilassarsi restando all’interno della stessa esperienza." image={mediaUrl(media.hero, "/images/playa-luna/pool-family.webp")} imageAlt={mediaAlt(media.hero, "Bambini e famiglie nella piscina interna di Playa Luna")} detailImage={mediaUrl(media.detail, "/images/playa-luna/pool-chair.webp")} detailAlt={mediaAlt(media.detail, "Lettino davanti alla piscina Playa Luna con il logo della struttura")} features={["Piscina interna a Playa Luna", "Spazio dedicato alle famiglie", "Area per il divertimento dei bambini", "Collegata agli altri servizi del beach club"]} telephone={beachPhoneNumber} />;
}
