import type { Metadata } from "next";
import Image from "next/image";
import { ExperienceVideo } from "../components/experience-video";
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
              <Image
                src="/images/playa-luna/beach-food/buffet.webp"
                alt="Banco della tavola calda e fredda del Playa Luna con primi, verdure e contorni"
                fill
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 50vw, 58vw"
              />
              <figcaption className={styles.caption}><span>Beach Food</span><span>Playa Luna</span></figcaption>
            </figure>

            <figure className={`${styles.tile} ${styles.video}`}>
              <ExperienceVideo
                src="/videos/playa-luna/beach-food-service.mp4"
                fill
                objectPosition="50% 50%"
              />
              <figcaption className={styles.caption}><span>Servizio</span><span>Ogni giorno</span></figcaption>
            </figure>

            <figure className={`${styles.tile} ${styles.secondary}`}>
              <Image
                src="/images/playa-luna/beach-food/pasta.webp"
                alt="Selezione di insalate di pasta e primi freddi disponibili durante il servizio Beach"
                fill
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 50vw, 42vw"
              />
            </figure>

            <figure className={`${styles.tile} ${styles.small}`}>
              <Image
                src="/images/playa-luna/beach-food/counter.webp"
                alt="Banco interno del Playa Luna con esposizione della tavola fredda"
                fill
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 50vw, 33vw"
              />
            </figure>

            <figure className={`${styles.tile} ${styles.service}`}>
              <Image
                src="/images/playa-luna/beach-food/service.webp"
                alt="Servizio al banco della tavola fredda del Playa Luna durante la giornata in spiaggia"
                fill
                sizes="(max-width: 620px) 82vw, (max-width: 900px) 100vw, 67vw"
              />
              <figcaption className={styles.caption}><span>Scegli al banco</span><span>Torna al mare</span></figcaption>
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
