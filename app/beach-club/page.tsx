import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { beachPhoneNumber, openingHours, pageOpenGraph } from "../lib/site";

const title = "Lido e beach club a Marina di Varcaturo";
const description =
  "Spiaggia attrezzata con ombrelloni e lettini, bar e servizi family al Playa Luna di Marina di Varcaturo. Aperto tutti i giorni 8–19 da maggio a settembre.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/beach-club" },
  openGraph: pageOpenGraph({ path: "/beach-club", title: `${title} | Playa Luna`, description }),
};

export default function BeachClubPage() {
  const season = openingHours.beachSeason;
  return (
    <ServicePage
      slug="beach-club"
      eyebrow="Beach Club"
      heading="Lido e spiaggia attrezzata a Marina di Varcaturo"
      title="La tua estate,"
      emphasis="senza orari."
      intro="Una giornata sul litorale di Varcaturo con spiaggia attrezzata, servizi e il mare sempre davanti."
      body={`Playa Luna è pensato per chi vuole vivere il mare con semplicità, senza rinunciare ai servizi. Puoi prenotare la tua postazione, fermarti per pranzo e alternare la spiaggia agli altri spazi della struttura. Il lido è aperto tutti i giorni dalle ${Number(season.opens.slice(0, 2))} alle ${Number(season.closes.slice(0, 2))}, da ${season.months.replace(" – ", " a ")}.`}
      image="/images/playa-luna/beach-day.webp"
      imageAlt="Spiaggia attrezzata del beach club Playa Luna a Varcaturo"
      heroObjectPosition="50% 55%"
      detailImage="/images/playa-luna/beachclub/detail-dsc00166.webp"
      detailAlt="Vista del mare dagli spazi mediterranei di Playa Luna"
      features={[
        "Spiaggia attrezzata con ombrelloni e lettini",
        "Bar e proposte per il pranzo",
        "Docce e servizi per gli ospiti",
        "Spazi adatti anche alle famiglie",
      ]}
      telephone={beachPhoneNumber}
      schemaType="Beach"
    />
  );
}
