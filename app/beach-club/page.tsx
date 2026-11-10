import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { beachFaqs } from "../lib/faqs";
import { beachPhoneNumber, hoursLabel, openingHours, pageOpenGraph, seasonState } from "../lib/site";

// Rebuild daily so the seasonal notice switches on its own.
export const revalidate = 86400;

const title = "Lido e beach club a Marina di Varcaturo";
const description =
  `Spiaggia attrezzata con ombrelloni e lettini, bar e servizi family al Playa Luna di Marina di Varcaturo. Aperto tutti i giorni ${hoursLabel.lido} da maggio a settembre.`;

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
      notice={seasonState().notice}
      facts={[
        { label: "Stagione", value: "1 maggio – 30 settembre" },
        { label: "Orari", value: `Tutti i giorni ${Number(season.opens.slice(0, 2))}–${Number(season.closes.slice(0, 2))}` },
        { label: "In spiaggia", value: "Ombrelloni, lettini, docce, spogliatoi, Wi-Fi, bagnino" },
        { label: "Prezzi e disponibilità", value: "Chiedili su WhatsApp" },
        { label: "Parcheggio", value: "Gratuito" },
        { label: "Animali", value: "Ammessi" },
      ]}
      eyebrow="Beach Club"
      heading="Lido e spiaggia attrezzata a Marina di Varcaturo"
      title="La tua estate,"
      emphasis="con Ischia e Procida di fronte."
      infoHeading={["Il mare,", "con calma."]}
      ctaHeading={["Ti teniamo", "un ombrellone?"]}
      intro="Una giornata sul litorale di Varcaturo con spiaggia attrezzata, servizi e il mare sempre davanti."
      body={`Playa Luna è pensato per chi vuole vivere il mare con semplicità, senza rinunciare ai servizi. Puoi prenotare la tua postazione, fermarti per pranzo e alternare la spiaggia agli altri spazi della struttura. Il lido è aperto tutti i giorni dalle ${Number(season.opens.slice(0, 2))} alle ${Number(season.closes.slice(0, 2))}, da ${season.months.replace(" – ", " a ")}.`}
      image="/images/playa-luna/beach-day.webp"
      imageAlt="Spiaggia attrezzata del beach club Playa Luna a Varcaturo"
      heroObjectPosition="50% 55%"
      detailImage="/images/playa-luna/beachclub/detail-dsc00166.webp"
      detailAlt="Vista del mare dagli spazi mediterranei di Playa Luna"
      features={[
        "Spiaggia attrezzata con ombrelloni e lettini",
        "Bagnino, docce, spogliatoi e Wi-Fi",
        "Bar e ristorante per il pranzo",
        "Parcheggio gratuito, animali ammessi, struttura accessibile",
      ]}
      faqs={beachFaqs}
      ctaLabel="Prenota il tuo posto su WhatsApp"
      telephone={beachPhoneNumber}
      schemaType="Beach"
    />
  );
}
