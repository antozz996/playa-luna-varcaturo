import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { beachPhoneNumber, pageOpenGraph } from "../lib/site";

const title = "Piscina per bambini a Varcaturo";
const description =
  "La piscina all'interno del Playa Luna a Marina di Varcaturo: uno spazio per il divertimento dei bambini e il relax delle famiglie, insieme a spiaggia e ristorante.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/piscina" },
  openGraph: pageOpenGraph({ path: "/piscina", title: `${title} | Playa Luna`, description }),
};

export default function PoolPage() {
  return (
    <ServicePage
      slug="piscina"
      eyebrow="Piscina"
      heading="Piscina per bambini e famiglie a Varcaturo"
      title="Un tuffo"
      emphasis="nell’estate."
      intro="La piscina appartiene alla struttura Playa Luna e completa la giornata al mare con uno spazio dedicato alle famiglie."
      body="È un ambiente interno a Playa Luna, distinto da qualsiasi altra struttura, dove i bambini possono divertirsi e gli adulti rilassarsi restando all’interno della stessa esperienza."
      image="/images/playa-luna/pool-family.webp"
      imageAlt="Bambini e famiglie nella piscina interna di Playa Luna"
      heroObjectPosition="50% 55%"
      detailImage="/images/playa-luna/pool-detail-2f8a1100.webp"
      detailAlt="Lettino davanti alla piscina Playa Luna con il logo della struttura"
      features={[
        "Piscina interna a Playa Luna",
        "Spazio dedicato alle famiglie",
        "Area per il divertimento dei bambini",
        "Collegata agli altri servizi del beach club",
      ]}
      telephone={beachPhoneNumber}
      schemaType="PublicSwimmingPool"
    />
  );
}
