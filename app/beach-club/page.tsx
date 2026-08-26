import type { Metadata } from "next";
import { CmsMedia } from "../components/cms-media";
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
import styles from "./beach-food.module.css";

type BeachMedia = {
  hero?: ManagedImage;
  heroVideo?: ManagedFile;
  detail?: ManagedImage;
  detailVideo?: ManagedFile;
};

type BeachFoodMedia = {
  buffet?: ManagedImage;
  pasta?: ManagedImage;
  counter?: ManagedImage;
  service?: ManagedImage;
  serviceVideo?: ManagedFile;
  detailVideo?: ManagedFile;
};

export const metadata: Metadata = {
  title: "Beach Club a Varcaturo",
  description:
    "Spiaggia attrezzata, tavola calda e fredda, bar e servizi family al Playa Luna di Marina di Varcaturo. Contattaci per disponibilità e prenotazioni.",
  alternates: { canonical: "/beach-club/" },
  openGraph: {
    title: "Beach Club Playa Luna a Varcaturo",
    description:
      "Vivi la spiaggia di Playa Luna con servizi, bar e tavola calda e fredda durante la giornata.",
    url: "/beach-club/",
    images: ["/og.png"],
  },
};

export default async function BeachClubPage() {
  const [media, foodMedia] = await Promise.all([
    getMediaDocument<BeachMedia & Record<string, unknown>>("beachMedia"),
    getMediaDocument<BeachFoodMedia & Record<string, unknown>>("beachFoodMedia"),
  ]);

  const heroVideo = mediaFileUrl(media.heroVideo);
  const detailVideo = mediaFileUrl(media.detailVideo);

  return (
    <ServicePage
      slug="beach-club"
      eyebrow="Beach Club"
      title="La tua estate,"
      emphasis="senza orari."
      intro="Una giornata sul litorale di Varcaturo con spiaggia attrezzata, servizi e il mare sempre davanti."
      body="Playa Luna è pensato per chi vuole vivere il mare con semplicità, senza rinunciare ai servizi. Puoi prenotare la tua postazione, fermarti per pranzo scegliendo tra proposte calde e fredde e alternare la spiaggia agli altri spazi della struttura."
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
        "Tavola calda e fredda durante il servizio Beach",
        "Bar e proposte per accompagnare la giornata",
        "Docce, servizi e spazi adatti anche alle famiglie",
      ]}
      telephone={beachPhoneNumber}
      schemaType="Beach"
      sanityDocumentId="beachMedia"
      sanityDocumentType="beachMedia"
    >
      <section className={styles.section} aria-labelledby="beach-food-title">
        <div className="shell">
          <div className={styles.intro}>
            <div>
              <p className={styles.kicker}>Beach Food · Tavola calda e fredda</p>
              <h2 className={styles.title} id="beach-food-title">
                Il pranzo,<br /><em>senza lasciare il mare.</em>
              </h2>
            </div>

            <div className={styles.copy}>
              <p>
                Durante il servizio Beach puoi fermarti per pranzo senza interrompere la tua giornata.
                Al banco trovi una selezione di piatti caldi e freddi, primi, insalate, contorni e
                proposte che seguono la disponibilità del giorno.
              </p>

              <div className={styles.facts} aria-label="Servizi Beach Food">
                <div className={styles.fact}><span>01</span><p>Piatti caldi e freddi</p></div>
                <div className={styles.fact}><span>02</span><p>Primi, insalate e contorni</p></div>
                <div className={styles.fact}><span>03</span><p>Servizio informale durante il Beach</p></div>
              </div>
            </div>
          </div>

          <div className={styles.gallery} aria-label="Tavola calda e fredda Playa Luna">
            <figure className={`${styles.tile} ${styles.main}`}>
              <CmsMedia
                image={foodMedia.buffet}
                fallback="/images/playa-luna/food-pasta.webp"
                altFallback="Banco della tavola calda e fredda del Playa Luna con primi, verdure e contorni"
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 100vw, 58vw"
                fill
              />
              <figcaption className={styles.caption}><span>Beach Food</span><span>Playa Luna</span></figcaption>
            </figure>

            <figure className={`${styles.tile} ${styles.video}`}>
              <CmsMedia
                video={foodMedia.serviceVideo}
                fallback="/images/playa-luna/food-fish.webp"
                altFallback="Servizio al banco della tavola calda e fredda Playa Luna"
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 50vw, 42vw"
                fill
              />
              <figcaption className={styles.caption}><span>Servizio</span><span>Durante il Beach</span></figcaption>
            </figure>

            <figure className={`${styles.tile} ${styles.secondary}`}>
              <CmsMedia
                image={foodMedia.pasta}
                fallback="/images/playa-luna/food-pasta.webp"
                altFallback="Selezione di insalate di pasta e primi freddi disponibili durante il servizio Beach"
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 50vw, 42vw"
                fill
              />
            </figure>

            <figure className={`${styles.tile} ${styles.small}`}>
              <CmsMedia
                image={foodMedia.counter}
                fallback="/images/playa-luna/restaurant.webp"
                altFallback="Banco interno del Playa Luna con esposizione della tavola calda e fredda"
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 50vw, 33vw"
                fill
              />
            </figure>

            <figure className={`${styles.tile} ${styles.service}`}>
              <CmsMedia
                image={foodMedia.service}
                fallback="/images/playa-luna/food-tartare.webp"
                altFallback="Servizio al banco della tavola fredda del Playa Luna durante la giornata in spiaggia"
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 100vw, 67vw"
                fill
              />
              <figcaption className={styles.caption}><span>Scegli al banco</span><span>Torna al mare</span></figcaption>
            </figure>

            <figure className={`${styles.tile} ${styles.videoDetail}`}>
              <CmsMedia
                video={foodMedia.detailVideo}
                fallback="/images/playa-luna/food-pasta.webp"
                altFallback="Dettaglio di una proposta calda servita al banco del Playa Luna"
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 50vw, 33vw"
                fill
              />
              <figcaption className={styles.caption}><span>Caldo & freddo</span><span>Ogni giornata</span></figcaption>
            </figure>
          </div>

          <div className={styles.note}>
            <p><strong>Una giornata completa:</strong> spiaggia, pausa pranzo e relax senza cambiare posto.</p>
            <p>Le proposte possono variare in base alla giornata e alla disponibilità.</p>
          </div>
        </div>
      </section>
    </ServicePage>
  );
}
