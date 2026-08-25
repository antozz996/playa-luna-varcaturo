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
            <a href="#taste">Taste</a>
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
          <p className={styles.eyebrow}>Playa Luna presents</p>
          <h1 id="culto-title">CULTO</h1>
          <p className={styles.heroCopy}>Beach. Dining. Club. Dal daylight al nightfall, CULTO cambia ritmo senza cambiare identità.</p>
          <div className={styles.heroActions}>
            <a className={styles.limeButton} href="#day">Discover CULTO <span>↓</span></a>
            <a className={styles.ghostButton} href={cultoInstagram} target="_blank" rel="noreferrer">Reservations <span>↗</span></a>
          </div>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div>DAY · TASTE · SATURDAY · NIGHT · DAY · TASTE · SATURDAY · NIGHT ·</div>
      </div>

      <section className={styles.intro}>
        <span className={styles.star}>✦</span>
        <p>CULTO vive dentro Playa Luna, ma segue un ritmo tutto suo. Di giorno è mare, selezione e beach culture. Durante la settimana incontra la cucina fusion. Il sabato, quando cala il sole, cambia completamente identità.</p>
      </section>

      <section className={styles.stage} id="day">
        <article className={`${styles.brandCard} ${styles.dayCard}`}>
          <div className={styles.cardTopline}><span>01 / DAY</span><b>BEACH CLUB</b></div>
          <h2>The day<br />starts here.</h2>
          <p className={styles.cardLead}>Mare, sole, musica, piscina e accesso selezionato. CULTO Beach è la parte più esclusiva della giornata Playa Luna.</p>
          <figure className={styles.heroImageCard}>
            <CmsMedia image={media.dayBeach} video={media.dayBeachVideo} fallback="/images/playa-luna/sunset-view.webp" altFallback="Daylife CULTO sul mare" sizes="(max-width: 820px) 100vw, 72vw" fill dataSanity={mediaAttr("dayBeach", media.dayBeachVideo)} />
          </figure>
          <div className={styles.cardSplit}>
            <figure><CmsMedia image={media.dayDeck} video={media.dayDeckVideo} fallback="/images/playa-luna/pool-chair.webp" altFallback="Relax e piscina CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("dayDeck", media.dayDeckVideo)} /></figure>
            <div><span className={styles.neonTitle}>SUN<br />SEA<br />SELECTED</span><p>Una dimensione premium dentro Playa Luna, pensata per chi vuole vivere il mare con un ritmo diverso.</p></div>
          </div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Join the community <span>↗</span></a>
        </article>
      </section>

      <section className={styles.iconMoment}>
        <CmsMedia image={media.love} video={media.loveVideo} fallback="/images/playa-luna/pool-family.webp" altFallback="Momento iconico CULTO in piscina" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("love", media.loveVideo)} />
        <div className={styles.iconShade} />
        <div><span>DAYLIGHT</span><h2>Find your<br />place in the sun.</h2></div>
      </section>

      <section className={styles.stage} id="taste">
        <article className={`${styles.brandCard} ${styles.tasteCard}`}>
          <div className={styles.cardTopline}><span>02 / TASTE</span><b>WEEKDAYS</b></div>
          <h2>Contemporary<br /><em>fusion sushi.</em></h2>
          <p className={styles.cardLead}>Durante la settimana CULTO incontra una cucina fusion sushi contemporanea: tecnica, materia prima e presentazione in una proposta coerente con il mood del club.</p>
          <div className={styles.foodGrid}>
            <figure className={styles.foodMain}><CmsMedia image={media.sushiDetail} video={media.sushiDetailVideo} fallback="/images/playa-luna/food-tartare.webp" altFallback="Fusion sushi CULTO" sizes="(max-width: 820px) 100vw, 56vw" fill dataSanity={mediaAttr("sushiDetail", media.sushiDetailVideo)} /></figure>
            <figure><CmsMedia image={media.sushiSpread} video={media.sushiSpreadVideo} fallback="/images/playa-luna/food-pasta.webp" altFallback="Proposta fusion CULTO" sizes="(max-width: 820px) 50vw, 24vw" fill dataSanity={mediaAttr("sushiSpread", media.sushiSpreadVideo)} /></figure>
            <figure><CmsMedia image={media.sushiNight} video={media.sushiNightVideo} fallback="/images/playa-luna/food-fish.webp" altFallback="Dining CULTO" sizes="(max-width: 820px) 50vw, 24vw" fill dataSanity={mediaAttr("sushiNight", media.sushiNightVideo)} /></figure>
          </div>
          <div className={styles.neonBanner}>TASTE THE <span>DIFFERENCE</span></div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Reserve a table <span>↗</span></a>
        </article>
      </section>

      <section className={styles.twilight}>
        <span>GOLDEN HOUR</span>
        <h2>Day fades.<br />CULTO doesn’t.</h2>
      </section>

      <section className={`${styles.stage} ${styles.saturdayStage}`} id="saturday">
        <article className={`${styles.brandCard} ${styles.saturdayCard}`}>
          <div className={styles.cardTopline}><span>03 / SATURDAY</span><b>DINNER · MUSIC · CLUB</b></div>
          <h2>Saturday<br /><em>is a ritual.</em></h2>
          <p className={styles.cardLead}>Il sabato la serata comincia con il dinner pre-party, disponibile esclusivamente il sabato. Poi cambia il ritmo: club, selezione all’ingresso e DJ set.</p>
          <div className={styles.ritualPanel}>
            <span>01</span><strong>DINNER</strong>
            <span>02</span><strong>MUSIC</strong>
            <span>03</span><strong>NIGHT</strong>
          </div>
          <figure className={styles.ritualImage}>
            <CmsMedia image={media.nightCrowd} video={media.nightCrowdVideo} fallback="/images/playa-luna/events/night-01.webp" altFallback="Saturday night CULTO" sizes="(max-width: 820px) 100vw, 72vw" fill dataSanity={mediaAttr("nightCrowd", media.nightCrowdVideo)} />
          </figure>
          <div className={styles.saturdayOnly}><span>Saturday only</span><h3>Dinner before dark.</h3><p>Il primo momento della notte, prima che le luci si abbassino e il club prenda vita.</p></div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Book Saturday <span>↗</span></a>
        </article>
      </section>

      <section className={styles.switchSection}>
        <CmsMedia image={media.nightEnergy} video={media.nightEnergyVideo} fallback="/images/playa-luna/events/night-02.webp" altFallback="Nightlife CULTO" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("nightEnergy", media.nightEnergyVideo)} />
        <div className={styles.switchShade} />
        <h2>After dark<br />everything<br />changes.</h2>
      </section>

      <section className={`${styles.stage} ${styles.nightStage}`} id="night">
        <article className={`${styles.brandCard} ${styles.nightCard}`}>
          <div className={styles.cardTopline}><span>04 / NIGHT</span><b>SATURDAY CLUB</b></div>
          <h2>CULTO<br /><em>after dark.</em></h2>
          <p className={styles.cardLead}>Selected crowd. International sounds. Saturday nights. La parte più intensa dell’esperienza CULTO.</p>
          <div className={styles.nightGrid}>
            <figure className={styles.nightWide}><CmsMedia image={media.nightFashion} video={media.nightFashionVideo} fallback="/images/playa-luna/events/night-03.webp" altFallback="People e fashion CULTO" sizes="(max-width: 820px) 100vw, 58vw" fill dataSanity={mediaAttr("nightFashion", media.nightFashionVideo)} /></figure>
            <figure><CmsMedia image={media.nightDj} video={media.nightDjVideo} fallback="/images/playa-luna/events/night-04.webp" altFallback="DJ set CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("nightDj", media.nightDjVideo)} /></figure>
            <figure><CmsMedia image={media.nightPeople} video={media.nightPeopleVideo} fallback="/images/playa-luna/events/night-05.webp" altFallback="Crowd CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("nightPeople", media.nightPeopleVideo)} /></figure>
          </div>
          <div className={styles.neonBanner}>SOUND WITHOUT <span>BORDERS</span></div>
          <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Discover next Saturday <span>↗</span></a>
        </article>
      </section>

      <section className={styles.selector}>
        <p className={styles.eyebrow}>Choose your CULTO</p>
        <h2>How do you<br />want to live it?</h2>
        <div className={styles.selectorGrid}>
          <a href="#day"><span>01</span><strong>BEACH</strong><small>Day experience</small></a>
          <a href="#taste"><span>02</span><strong>SUSHI</strong><small>Weekday fusion</small></a>
          <a href="#saturday"><span>03</span><strong>SATURDAY</strong><small>Dinner & club</small></a>
        </div>
      </section>

      <section className={styles.finalCta}>
        <CmsMedia image={media.closing} video={media.closingVideo} fallback="/images/playa-luna/events/home-feature.webp" altFallback="CULTO at Playa Luna" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("closing", media.closingVideo)} />
        <div className={styles.finalShade} />
        <div className={styles.finalContent}>
          <p className={styles.eyebrow}>Experience the feeling</p>
          <h2>Enter<br />CULTO.</h2>
          <p>Unisciti alla community e scopri i prossimi appuntamenti.</p>
          <div className={styles.heroActions}>
            <a className={styles.ghostButton} href={cultoInstagram} target="_blank" rel="noreferrer">@culto.ent <span>↗</span></a>
            <a className={styles.limeButton} href={cultoInstagram} target="_blank" rel="noreferrer">Request info <span>↗</span></a>
          </div>
        </div>
      </section>

      <div className={styles.endMarquee} aria-hidden="true"><span>DAYCORE · SUNSET · TASTE · SOUND · SATURDAY · CULTO ·</span></div>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
