import type { Metadata } from "next";
import Link from "next/link";
import { CmsMedia } from "../components/cms-media";
import { SiteFooter } from "../components/site-footer";
import { siteUrl } from "../lib/site";
import { getMediaDocument, mediaUrl, type ManagedImage } from "../lib/sanity";
import { type ManagedFile } from "../lib/sanity-file";
import { sanityImageAttribute } from "../lib/sanity-visual";
import styles from "./culto.module.css";

const cultoInstagram = "https://www.instagram.com/culto.ent/";

type CultoMedia = {
  hero?: ManagedImage; heroVideo?: ManagedFile;
  dayBeach?: ManagedImage; dayBeachVideo?: ManagedFile;
  dayDeck?: ManagedImage; dayDeckVideo?: ManagedFile;
  love?: ManagedImage; loveVideo?: ManagedFile;
  sushiDetail?: ManagedImage; sushiDetailVideo?: ManagedFile;
  sushiSpread?: ManagedImage; sushiSpreadVideo?: ManagedFile;
  sushiNight?: ManagedImage; sushiNightVideo?: ManagedFile;
  nightCrowd?: ManagedImage; nightCrowdVideo?: ManagedFile;
  nightEnergy?: ManagedImage; nightEnergyVideo?: ManagedFile;
  nightFashion?: ManagedImage; nightFashionVideo?: ManagedFile;
  nightDj?: ManagedImage; nightDjVideo?: ManagedFile;
  nightPeople?: ManagedImage; nightPeopleVideo?: ManagedFile;
  closing?: ManagedImage; closingVideo?: ManagedFile;
};

export const metadata: Metadata = {
  title: "CULTO Beach Club Varcaturo | Sushi & Saturday Club",
  description: "Scopri CULTO a Playa Luna: beach club selezionato, fusion sushi contemporanea durante la settimana e Saturday club con dinner pre-serata e DJ set.",
  alternates: { canonical: "/culto/" },
  openGraph: {
    title: "CULTO · Beach. Dining. Club.",
    description: "Daylife, contemporary fusion sushi e Saturday nightlife dentro Playa Luna, a Marina di Varcaturo.",
    url: "/culto/",
    images: ["/images/playa-luna/beach-day.webp"],
  },
};

function mediaPath(base: string, video?: ManagedFile) {
  return video?.asset?._ref ? `${base}Video` : base;
}

function mediaAttr(base: string, video?: ManagedFile) {
  return sanityImageAttribute("cultoMedia", "cultoMedia", mediaPath(base, video));
}

export default async function CultoPage() {
  const media = await getMediaDocument<CultoMedia & Record<string, unknown>>("cultoMedia");
  const hero = mediaUrl(media.hero, "/images/playa-luna/beach-day.webp");

  const schema = {
    "@context": "https://schema.org",
    "@type": ["NightClub", "Restaurant"],
    name: "CULTO",
    description: "Beach club selezionato, fusion sushi contemporanea e Saturday nightlife all'interno di Playa Luna.",
    url: `${siteUrl}/culto/`,
    image: hero.startsWith("http") ? hero : `${siteUrl}${hero}`,
    servesCuisine: ["Fusion", "Sushi", "Contemporary"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Marina di Varcaturo, 42",
      addressLocality: "Giugliano in Campania",
      addressRegion: "NA",
      addressCountry: "IT",
    },
    sameAs: [cultoInstagram],
    isPartOf: { "@type": "LocalBusiness", name: "Playa Luna", url: siteUrl },
  };

  return (
    <main className={styles.page}>
      <header className={styles.cultoHeader}>
        <Link className={styles.wordmark} href="/" aria-label="Torna a Playa Luna">
          CULT<span>O</span>
        </Link>
        <details className={styles.menu}>
          <summary aria-label="Apri menu CULTO"><i /><i /><i /></summary>
          <nav aria-label="Navigazione CULTO">
            <a href="#day">Day</a>
            <a href="#taste">Dining</a>
            <a href="#saturday">Saturday</a>
            <a href="#night">Night</a>
            <Link href="/">Playa Luna</Link>
          </nav>
        </details>
      </header>

      <a className={styles.floatingCta} href={cultoInstagram} target="_blank" rel="noreferrer" aria-label="Apri Instagram CULTO">@</a>

      <section className={styles.hero} aria-labelledby="culto-title">
        <CmsMedia
          image={media.hero}
          video={media.heroVideo}
          fallback="/images/playa-luna/beach-day.webp"
          altFallback="Beach club CULTO a Playa Luna, Marina di Varcaturo"
          sizes="100vw"
          fill
          priority
          className={styles.coverMedia}
          imagePositionFallback="50% 62%"
          dataSanity={mediaAttr("hero", media.heroVideo)}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Inside Playa Luna · Varcaturo</p>
          <h1 id="culto-title">CULTO</h1>
          <p className={styles.heroCopy}>Dalla luce piena del giorno alla tensione della notte. Beach culture, cucina fusion e un sabato che cambia il volto del luogo.</p>
          <div className={styles.heroActions}>
            <a className={styles.limeButton} href="#day">Scopri CULTO <span>↓</span></a>
            <a className={styles.ghostButton} href={cultoInstagram} target="_blank" rel="noreferrer">Prenotazioni <span>↗</span></a>
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div>DAY · DINING · SATURDAY · NIGHT · DAY · DINING · SATURDAY · NIGHT ·</div>
      </div>

      <section className={styles.intro}>
        <span className={styles.star}>✦</span>
        <p>Non è una seconda identità di Playa Luna. È un altro modo di viverla. CULTO nasce nello stesso luogo, ma cambia linguaggio, pubblico e ritmo con il passare delle ore.</p>
      </section>

      <section className={styles.stage} id="day">
        <article className={`${styles.brandCard} ${styles.dayCard}`}>
          <div className={styles.cardTopline}><span>01 / Day</span><b>Beach Club</b></div>
          <h2>Il lusso di non avere fretta.</h2>
          <p className={styles.cardLead}>Di giorno CULTO è luce, spazio e servizio. Un beach club selezionato, pensato per chi cerca un’atmosfera più intima senza rinunciare all’energia del mare.</p>
          <figure className={styles.heroImageCard}>
            <CmsMedia image={media.dayBeach} video={media.dayBeachVideo} fallback="/images/playa-luna/sunset-view.webp" altFallback="Daylife CULTO sul mare" sizes="(max-width: 820px) 100vw, 72vw" fill dataSanity={mediaAttr("dayBeach", media.dayBeachVideo)} />
          </figure>
          <div className={styles.cardSplit}>
            <figure><CmsMedia image={media.dayDeck} video={media.dayDeckVideo} fallback="/images/playa-luna/pool-chair.webp" altFallback="Relax e piscina CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("dayDeck", media.dayDeckVideo)} /></figure>
            <div><span className={styles.neonTitle}>Selected by day.</span><p>Piscina, mare, musica e dettagli curati. Qui la giornata non ha bisogno di essere riempita: basta il posto giusto.</p></div>
          </div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Richiedi accesso <span>↗</span></a>
        </article>
      </section>

      <section className={styles.iconMoment}>
        <CmsMedia image={media.love} video={media.loveVideo} fallback="/images/playa-luna/pool-family.webp" altFallback="Momento iconico CULTO in piscina" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("love", media.loveVideo)} />
        <div className={styles.iconShade} />
        <div><span>Daylight</span><h2>La luce resta un po’ di più.</h2></div>
      </section>

      <section className={styles.stage} id="taste">
        <article className={`${styles.brandCard} ${styles.tasteCard}`}>
          <div className={styles.cardTopline}><span>02 / Dining</span><b>Weekdays</b></div>
          <h2>La cucina segue lo stesso linguaggio.</h2>
          <p className={styles.cardLead}>Durante la settimana la proposta diventa fusion sushi contemporanea: pulita, precisa, costruita su materia prima e presentazione. Senza eccessi, senza rumore.</p>
          <div className={styles.foodGrid}>
            <figure className={styles.foodMain}><CmsMedia image={media.sushiDetail} video={media.sushiDetailVideo} fallback="/images/playa-luna/food-tartare.webp" altFallback="Fusion sushi CULTO" sizes="(max-width: 820px) 100vw, 56vw" fill dataSanity={mediaAttr("sushiDetail", media.sushiDetailVideo)} /></figure>
            <figure><CmsMedia image={media.sushiSpread} video={media.sushiSpreadVideo} fallback="/images/playa-luna/food-pasta.webp" altFallback="Proposta fusion CULTO" sizes="(max-width: 820px) 50vw, 24vw" fill dataSanity={mediaAttr("sushiSpread", media.sushiSpreadVideo)} /></figure>
            <figure><CmsMedia image={media.sushiNight} video={media.sushiNightVideo} fallback="/images/playa-luna/food-fish.webp" altFallback="Dining CULTO" sizes="(max-width: 820px) 50vw, 24vw" fill dataSanity={mediaAttr("sushiNight", media.sushiNightVideo)} /></figure>
          </div>
          <div className={styles.neonBanner}>Materia · tecnica · equilibrio <span>· CULTO</span></div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Prenota il tavolo <span>↗</span></a>
        </article>
      </section>

      <section className={styles.twilight}>
        <span>Golden hour</span>
        <h2>Quando cambia la luce, cambia il ritmo.</h2>
      </section>

      <section className={`${styles.stage} ${styles.saturdayStage}`} id="saturday">
        <article className={`${styles.brandCard} ${styles.saturdayCard}`}>
          <div className={styles.cardTopline}><span>03 / Saturday</span><b>Dinner · Music · Club</b></div>
          <h2>Il sabato ha un altro codice.</h2>
          <p className={styles.cardLead}>La serata inizia a tavola e si trasforma senza interruzioni. Dinner pre-party, selezione all’ingresso, musica e clubbing nello stesso spazio.</p>
          <div className={styles.ritualPanel}>
            <span>01</span><strong>DINNER</strong>
            <span>02</span><strong>SHIFT</strong>
            <span>03</span><strong>CLUB</strong>
          </div>
          <figure className={styles.ritualImage}>
            <CmsMedia image={media.nightCrowd} video={media.nightCrowdVideo} fallback="/images/playa-luna/events/night-01.webp" altFallback="Saturday night CULTO" sizes="(max-width: 820px) 100vw, 72vw" fill dataSanity={mediaAttr("nightCrowd", media.nightCrowdVideo)} />
          </figure>
          <div className={styles.saturdayOnly}><span>Solo il sabato</span><h3>La notte comincia a tavola.</h3><p>Il dinner è il primo atto della serata. Poi le luci si abbassano, il volume sale e lo spazio cambia funzione.</p></div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Prenota il sabato <span>↗</span></a>
        </article>
      </section>

      <section className={styles.switchSection}>
        <CmsMedia image={media.nightEnergy} video={media.nightEnergyVideo} fallback="/images/playa-luna/events/night-02.webp" altFallback="Nightlife CULTO" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("nightEnergy", media.nightEnergyVideo)} />
        <div className={styles.switchShade} />
        <h2>Poi arriva il buio.</h2>
      </section>

      <section className={`${styles.stage} ${styles.nightStage}`} id="night">
        <article className={`${styles.brandCard} ${styles.nightCard}`}>
          <div className={styles.cardTopline}><span>04 / Night</span><b>Saturday Club</b></div>
          <h2>Dopo il tramonto, cambia il linguaggio.</h2>
          <p className={styles.cardLead}>Luci, sound, guest e crowd selezionata. CULTO di notte non cerca di assomigliare a un beach club: diventa un club, con una propria atmosfera e una propria identità.</p>
          <div className={styles.nightGrid}>
            <figure className={styles.nightWide}><CmsMedia image={media.nightFashion} video={media.nightFashionVideo} fallback="/images/playa-luna/events/night-03.webp" altFallback="People e fashion CULTO" sizes="(max-width: 820px) 100vw, 58vw" fill dataSanity={mediaAttr("nightFashion", media.nightFashionVideo)} /></figure>
            <figure><CmsMedia image={media.nightDj} video={media.nightDjVideo} fallback="/images/playa-luna/events/night-04.webp" altFallback="DJ set CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("nightDj", media.nightDjVideo)} /></figure>
            <figure><CmsMedia image={media.nightPeople} video={media.nightPeopleVideo} fallback="/images/playa-luna/events/night-05.webp" altFallback="Crowd CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("nightPeople", media.nightPeopleVideo)} /></figure>
          </div>
          <div className={styles.neonBanner}>Guest · sound · crowd <span>· Saturday</span></div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Scopri il prossimo sabato <span>↗</span></a>
        </article>
      </section>

      <section className={styles.selector}>
        <p className={styles.eyebrow}>CULTO, a modo tuo</p>
        <h2>Scegli il tuo momento.</h2>
        <div className={styles.selectorGrid}>
          <a href="#day"><span>01</span><strong>Beach</strong><small>Day experience</small></a>
          <a href="#taste"><span>02</span><strong>Dining</strong><small>Fusion sushi</small></a>
          <a href="#saturday"><span>03</span><strong>Saturday</strong><small>Dinner & club</small></a>
        </div>
      </section>

      <section className={styles.finalCta}>
        <CmsMedia image={media.closing} video={media.closingVideo} fallback="/images/playa-luna/events/home-feature.webp" altFallback="CULTO at Playa Luna" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("closing", media.closingVideo)} />
        <div className={styles.finalShade} />
        <div className={styles.finalContent}>
          <p className={styles.eyebrow}>Inside Playa Luna</p>
          <h2>Ci vediamo qui.</h2>
          <p>Per accessi, tavoli, dinner e prossimi appuntamenti, contatta direttamente CULTO.</p>
          <div className={styles.heroActions}>
            <a className={styles.ghostButton} href={cultoInstagram} target="_blank" rel="noreferrer">@culto.ent <span>↗</span></a>
            <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Richiedi informazioni <span>↗</span></a>
          </div>
        </div>
      </section>

      <div className={styles.endMarquee} aria-hidden="true"><span>CULTO · DAY · DINING · SATURDAY · NIGHT ·</span></div>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
