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
import { getPageBlobMedia, getPageBlobVideos } from "../lib/site-media-pages";

type PoolMedia = {
  hero?: ManagedImage;
  heroVideo?: ManagedFile;
  detail?: ManagedImage;
  detailVideo?: ManagedFile;
};

export const metadata: Metadata = {
  title: "Piscina Playa Luna a Varcaturo",
  description:
    "Scopri la piscina interna alla struttura Playa Luna a Marina di Varcaturo, pensata per il divertimento dei bambini e il relax delle famiglie.",
  alternates: { canonical: "/piscina" },
  openGraph: {
    title: "Piscina Playa Luna a Varcaturo",
    description: "La piscina interna alla struttura Playa Luna per famiglie e bambini.",
    url: "/piscina/",
    images: ["/og.png"],
  },
};

export default async function PoolPage() {
  const [media, blobMedia, blobVideos] = await Promise.all([getMediaDocument<PoolMedia & Record<string, unknown>>("poolMedia"), getPageBlobMedia("piscina"), getPageBlobVideos("piscina")]);
  const heroVideo = blobVideos.hero ?? (blobMedia.hero ? undefined : mediaFileUrl(media.heroVideo));
  const detailVideo = blobVideos.detail ?? (blobMedia.detail ? undefined : mediaFileUrl(media.detailVideo));

  return (
    <ServicePage
      slug="piscina"
      eyebrow="Piscina"
      title="Un tuffo"
      emphasis="nell’estate."
      intro="La piscina appartiene alla struttura Playa Luna e completa la giornata al mare con uno spazio dedicato alle famiglie."
      body="È un ambiente interno a Playa Luna, distinto da qualsiasi altra struttura, dove i bambini possono divertirsi e gli adulti rilassarsi restando all’interno della stessa esperienza."
      image={blobMedia.hero ?? mediaUrl(media.hero, "/images/playa-luna/pool-family.webp")}
      imageAlt={mediaAlt(media.hero, "Bambini e famiglie nella piscina interna di Playa Luna")}
      heroObjectPosition={mediaObjectPosition(media.hero, "50% 55%")}
      heroVideo={heroVideo}
      heroVideoObjectPosition={mediaFileObjectPosition(media.heroVideo)}
      detailImage={blobMedia.detail ?? mediaUrl(media.detail, "/images/playa-luna/pool-chair.webp")}
      detailAlt={mediaAlt(media.detail, "Lettino davanti alla piscina Playa Luna con il logo della struttura")}
      detailObjectPosition={mediaObjectPosition(media.detail)}
      detailVideo={detailVideo}
      detailVideoObjectPosition={mediaFileObjectPosition(media.detailVideo)}
      features={[
        "Piscina interna a Playa Luna",
        "Spazio dedicato alle famiglie",
        "Area per il divertimento dei bambini",
        "Collegata agli altri servizi del beach club",
      ]}
      telephone={beachPhoneNumber}
      sanityDocumentId="poolMedia"
      sanityDocumentType="poolMedia"
    />
  );
}
