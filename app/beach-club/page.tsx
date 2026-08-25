import type { Metadata } from "next";
import { ServicePage } from "../components/service-page";
import { beachPhoneNumber } from "../lib/site";
import {
  getMediaDocument,
  mediaAlt,
  mediaObjectPosition,
  mediaUrl,
  type ManagedImage,
} from "../lib/sanity";
import {
  mediaFileObjectPosition,
  mediaFileUrl,
  type ManagedFile,
} from "../lib/sanity-file";

type BeachMedia = {
  hero?: ManagedImage;
  heroVideo?: ManagedFile;
  detail?: ManagedImage;
  detailVideo?: ManagedFile;
};

export const metadata: Metadata = {
  title: "Beach Club a Varcaturo",
  description:
    "Spiaggia attrezzata, lettini, ombrelloni, bar e servizi family al Playa Luna di Marina di Varcaturo. Contattaci per disponibilità e prenotazioni.",
  alternates: { canonical: "/beach-club/" },
  openGraph: {
    title: "Beach Club Playa Luna a Varcaturo",
    description: "Vivi la spiaggia di Playa Luna sul litorale di Varcaturo.",
    url: "/beach-club/",
    images: ["/og.png"],
  },
};

export default async function BeachClubPage() {
  const media = await getMediaDocument<BeachMedia & Record<string, unknown>>(
    "beachMedia",
  );
  const heroVideo = mediaFileUrl(media.heroVideo);
  const detailVideo = mediaFileUrl(media.detailVideo);

  return (
    <ServicePage
      slug="beach-club"
      eyebrow="Beach Club"
      title="La tua estate,"
      emphasis="senza orari."
      intro="Una giornata sul litorale di Varcaturo con spiaggia attrezzata, servizi e il mare sempre davanti."
      body="Playa Luna è pensato per chi vuole vivere il mare con semplicità, senza rinunciare ai servizi. Puoi prenotare la tua postazione, fermarti per pranzo e alternare la spiaggia agli altri spazi della struttura."
      image={mediaUrl(media.hero, "/images/playa-luna/beach-day.webp")}
      imageAlt={mediaAlt(media.hero, "Spiaggia attrezzata del beach club Playa Luna a Varcaturo")}
      heroObjectPosition={mediaObjectPosition(media.hero, "50% 55%")}
      heroVideo={heroVideo}
      heroVideoObjectPosition={mediaFileObjectPosition(media.heroVideo)}
      detailImage={mediaUrl(media.detail, "/images/playa-luna/sunset-view.webp")}
      detailAlt={mediaAlt(media.detail, "Vista del mare dagli spazi mediterranei di Playa Luna")}
      detailObjectPosition={mediaObjectPosition(media.detail)}
      detailVideo={detailVideo}
      detailVideoObjectPosition={mediaFileObjectPosition(media.detailVideo)}
      features={[
        "Spiaggia attrezzata con ombrelloni e lettini",
        "Bar e proposte per il pranzo",
        "Docce e servizi per gli ospiti",
        "Spazi adatti anche alle famiglie",
      ]}
      telephone={beachPhoneNumber}
      schemaType="Beach"
      sanityDocumentId="beachMedia"
      sanityDocumentType="beachMedia"
    />
  );
}
