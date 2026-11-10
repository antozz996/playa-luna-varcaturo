import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { poolFaqs } from "../lib/faqs";
import { beachPhoneNumber, hoursLabel, pageOpenGraph, poolFacts, poolWhatsapp, seasonState } from "../lib/site";

// Rebuild daily so the seasonal notice switches on its own.
export const revalidate = 86400;

const title = "Piscina per bambini a Varcaturo";
const description =
  `Piscina all'aperto per bambini al Playa Luna di Marina di Varcaturo, aperta tutti i giorni ${hoursLabel.lido} da maggio a settembre, accanto a spiaggia e ristorante.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/piscina" },
  openGraph: pageOpenGraph({ path: "/piscina", title: `${title} | Playa Luna`, description }),
};

export default function PoolPage() {
  const season = seasonState();
  return (
    <ServicePage
      slug="piscina"
      notice={season.lidoOpen ? undefined : season.summer ? "La piscina apre il 1° maggio, con il lido" : "La piscina riapre a maggio, con il lido"}
      facts={[
        { label: "Cos'è", value: poolFacts.type },
        { label: "Stagione", value: poolFacts.season },
        { label: "Orari", value: poolFacts.hours },
        { label: "Ingresso", value: poolFacts.entrance },
        { label: "Prezzi e disponibilità", value: "Chiedili su WhatsApp" },
        { label: "Servizi", value: "Docce, spogliatoi, parcheggio gratuito" },
      ]}
      eyebrow="Piscina"
      heading="Piscina per bambini e famiglie a Varcaturo"
      title="Un tuffo"
      emphasis="nell’estate."
      intro="La piscina all'aperto di Playa Luna completa la giornata al mare con uno spazio dedicato ai bambini e alle famiglie."
      body="Una piscina tutta per i più piccoli, a due passi dalla spiaggia e dal ristorante: loro giocano in acqua, voi vi godete il lettino senza perderli di vista. È all'aperto, aperta con il lido da maggio a settembre, con ingresso separato: chiedici disponibilità e tariffe su WhatsApp."
      infoHeading={["Acqua bassa,", "giochi lunghi."]}
      ctaHeading={["Una giornata", "per i più piccoli."]}
      image="/images/playa-luna/pool-family.webp"
      imageAlt="Bambini e famiglie nella piscina all'aperto di Playa Luna"
      heroObjectPosition="50% 55%"
      detailImage="/images/playa-luna/pool-detail-2f8a1100.webp"
      detailAlt="Lettino davanti alla piscina Playa Luna con il logo della struttura"
      features={[
        "Piscina all'aperto dentro la struttura Playa Luna",
        "Spazio pensato per bambini e famiglie",
        "Ingresso separato dalla spiaggia",
        "Docce, spogliatoi e parcheggio gratuito",
      ]}
      faqs={poolFaqs}
      ctaLabel="Chiedi disponibilità della piscina"
      ctaHref={poolWhatsapp}
      ctaEvent="whatsapp_pool"
      telephone={beachPhoneNumber}
      schemaType="PublicSwimmingPool"
    />
  );
}
