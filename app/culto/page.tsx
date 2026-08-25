import type { Metadata } from "next";
import Link from "next/link";
import { CmsMedia } from "../components/cms-media";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
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

function mediaPath(base: string, video?: ManagedFile) { return video?.asset?._ref ? `${base}Video` : base; }
function mediaAttr(base: string, video?: ManagedFile) { return sanityImageAttribute("cultoMedia", "cultoMedia", mediaPath(base, video)); }

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
    address: { "@type": "PostalAddress", streetAddress: "Via Marina di Varcaturo, 42", addressLocality: "Giugliano in Campania", addressRegion: "NA", addressCountry: "IT" },
    sameAs: [cultoInstagram],
    isPartOf: { "@type": "LocalBusiness", name: "Playa Luna", url: siteUrl },
  };

  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.hero} aria-labelledby="culto-title">
        <CmsMedia image={media.hero} video={media.heroVideo} fallback="/images/playa-luna/beach-day.webp" altFallback="Beach club CULTO a Playa Luna, Marina di Varcaturo" sizes="100vw" fill priority className={styles.coverMedia} imagePositionFallback="50% 62%" dataSanity={mediaAttr("hero", media.heroVideo)} />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Playa Luna presents</p>
          <h1 id="culto-title">CULTO</h1>
          <p className={styles.heroLine}>Beach · Dining · Club</p>
          <p className={styles.heroTagline}>From daylight to after dark.</p>
          <div className={styles.heroActions}>
            <a href="#day">Discover CULTO <span aria-hidden="true">↓</span></a>
            <a href={cultoInstagram} target="_blank" rel="noreferrer">Reservations <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <nav className={styles.breadcrumbs} aria-label="Percorso"><Link href="/">Playa Luna</Link><span>/</span><span>CULTO</span></nav>

      <section className={styles.manifesto}>
        <div><p className={styles.sectionLabel}>Inside Playa Luna</p><h2>Not just<br />a beach club.</h2></div>
        <div className={styles.manifestoCopy}>
          <p>CULTO vive dentro Playa Luna, ma segue un ritmo tutto suo. Di giorno è mare, selezione e beach culture. Durante la settimana incontra la cucina fusion. Il sabato, quando cala il sole, cambia completamente identità.</p>
          <p className={styles.manifestoSignature}>DAY → TASTE → SATURDAY → NIGHT</p>
        </div>
      </section>

      <section className={styles.day} id="day">
        <div className={styles.sectionHead}><p className={styles.sectionLabel}>01 / Day</p><h2>The day<br />starts here.</h2><p>Sole, mare, musica e un accesso selezionato. CULTO Beach è la dimensione più esclusiva della giornata: rilassata, mediterranea e riconoscibile.</p></div>
        <div className={styles.dayGrid}>
          <figure className={styles.dayLarge}><CmsMedia image={media.dayBeach} video={media.dayBeachVideo} fallback="/images/playa-luna/sunset-view.webp" altFallback="Atmosfera diurna del beach club CULTO" sizes="(max-width: 820px) 100vw, 62vw" fill dataSanity={mediaAttr("dayBeach", media.dayBeachVideo)} /><figcaption>SEA · DAYLIFE</figcaption></figure>
          <figure className={styles.dayTall}><CmsMedia image={media.dayDeck} video={media.dayDeckVideo} fallback="/images/playa-luna/pool-chair.webp" altFallback="Daylife CULTO tra piscina e relax" sizes="(max-width: 820px) 100vw, 34vw" fill dataSanity={mediaAttr("dayDeck", media.dayDeckVideo)} /><figcaption>POOL · SELECTED ACCESS</figcaption></figure>
        </div>
      </section>

      <section className={styles.loveMoment}>
        <CmsMedia image={media.love} video={media.loveVideo} fallback="/images/playa-luna/pool-family.webp" altFallback="Atmosfera piscina CULTO" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("love", media.loveVideo)} />
        <div className={styles.loveShade} /><p>Find your<br />place in the sun.</p>
      </section>

      <section className={styles.taste} id="taste">
        <div className={styles.tasteCopy}>
          <p className={styles.sectionLabel}>02 / Taste</p><h2>Contemporary<br />fusion sushi.</h2><p className={styles.subhead}>Available during the week.</p>
          <p>Una proposta fusion sushi contemporanea costruita intorno a materia prima, tecnica e presentazione. Un’esperienza gastronomica moderna e coerente con l’identità CULTO, da vivere durante la settimana.</p>
          <a className={styles.outlineButton} href={cultoInstagram} target="_blank" rel="noreferrer">Reserve a table <span aria-hidden="true">↗</span></a>
        </div>
        <figure className={styles.tasteMain}><CmsMedia image={media.sushiDetail} video={media.sushiDetailVideo} fallback="/images/playa-luna/food-tartare.webp" altFallback="Fusion food CULTO" sizes="(max-width: 820px) 100vw, 48vw" fill dataSanity={mediaAttr("sushiDetail", media.sushiDetailVideo)} /></figure>
        <div className={styles.tasteStrip}>
          <figure><CmsMedia image={media.sushiSpread} video={media.sushiSpreadVideo} fallback="/images/playa-luna/food-pasta.webp" altFallback="Proposta fusion contemporanea CULTO" sizes="(max-width: 820px) 50vw, 24vw" fill dataSanity={mediaAttr("sushiSpread", media.sushiSpreadVideo)} /></figure>
          <figure><CmsMedia image={media.sushiNight} video={media.sushiNightVideo} fallback="/images/playa-luna/food-fish.webp" altFallback="Dining CULTO" sizes="(max-width: 820px) 50vw, 24vw" fill dataSanity={mediaAttr("sushiNight", media.sushiNightVideo)} /></figure>
        </div>
      </section>

      <section className={styles.twilight}><div><p className={styles.sectionLabel}>Golden hour</p><h2>Day fades.<br />CULTO doesn’t.</h2></div></section>

      <section className={styles.saturday} id="saturday">
        <div className={styles.saturdayIntro}>
          <p className={styles.sectionLabel}>03 / Saturday</p><p className={styles.micro}>Dinner · Music · Club</p><h2>Saturday<br />is a ritual.</h2>
          <p>Il sabato CULTO cambia ritmo. La notte inizia con il dinner pre-serata, disponibile esclusivamente il sabato, e continua con club, selezione all’ingresso e una programmazione costruita intorno al sound contemporaneo.</p>
        </div>
        <div className={styles.ritualSteps} aria-label="Saturday ritual"><span>01</span><strong>Dinner</strong><span>02</span><strong>Music</strong><span>03</span><strong>Night</strong></div>
        <div className={styles.saturdayDinner}><p className={styles.badge}>Saturday only</p><h3>Dinner<br />before dark.</h3><p>Un dinner pensato come primo momento della notte, prima che le luci si abbassino e il club prenda vita.</p><a className={styles.darkButton} href={cultoInstagram} target="_blank" rel="noreferrer">Book Saturday <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className={styles.switchSection}>
        <figure><CmsMedia image={media.nightCrowd} video={media.nightCrowdVideo} fallback="/images/playa-luna/events/night-01.webp" altFallback="Nightlife CULTO" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("nightCrowd", media.nightCrowdVideo)} /><div className={styles.switchShade} /></figure>
        <h2>After dark<br />everything changes.</h2>
      </section>

      <section className={styles.night} id="night">
        <div className={styles.nightHead}><p className={styles.sectionLabel}>04 / Night</p><h2>CULTO<br />after dark.</h2><p>Selected crowd. International sounds. Saturday nights.</p></div>
        <div className={styles.nightGrid}>
          <figure className={styles.nightWide}><CmsMedia image={media.nightEnergy} video={media.nightEnergyVideo} fallback="/images/playa-luna/events/night-02.webp" altFallback="Crowd e atmosfera CULTO" sizes="(max-width: 820px) 100vw, 58vw" fill dataSanity={mediaAttr("nightEnergy", media.nightEnergyVideo)} /></figure>
          <figure className={styles.nightPortrait}><CmsMedia image={media.nightFashion} video={media.nightFashionVideo} fallback="/images/playa-luna/events/night-03.webp" altFallback="Lifestyle CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("nightFashion", media.nightFashionVideo)} /></figure>
          <figure className={styles.nightPortrait}><CmsMedia image={media.nightDj} video={media.nightDjVideo} fallback="/images/playa-luna/events/night-04.webp" altFallback="DJ set CULTO" sizes="(max-width: 820px) 50vw, 28vw" fill dataSanity={mediaAttr("nightDj", media.nightDjVideo)} /></figure>
          <figure className={styles.nightWide}><CmsMedia image={media.nightPeople} video={media.nightPeopleVideo} fallback="/images/playa-luna/events/night-05.webp" altFallback="People of CULTO" sizes="(max-width: 820px) 100vw, 58vw" fill dataSanity={mediaAttr("nightPeople", media.nightPeopleVideo)} /></figure>
        </div>
      </section>

      <section className={styles.sound}><p className={styles.sectionLabel}>Sound without borders</p><h2>Guest, sound<br />and international energy.</h2><p>Il sabato la programmazione CULTO vive tra guest, DJ set e contaminazioni internazionali. Per lineup, date e accessi, il canale aggiornato resta CULTO.</p><a href={cultoInstagram} target="_blank" rel="noreferrer">Discover next Saturday <span aria-hidden="true">↗</span></a></section>

      <section className={styles.selector}>
        <p className={styles.sectionLabel}>Choose your CULTO</p><h2>How do you<br />want to live it?</h2>
        <div className={styles.selectorGrid}>
          <a href="#day"><span>01</span><strong>Beach</strong><small>Day experience</small><b>Explore →</b></a>
          <a href="#taste"><span>02</span><strong>Sushi</strong><small>Contemporary fusion</small><b>Explore →</b></a>
          <a href="#saturday"><span>03</span><strong>Saturday</strong><small>Dinner & club</small><b>Explore →</b></a>
        </div>
      </section>

      <section className={styles.finalCta}>
        <CmsMedia image={media.closing} video={media.closingVideo} fallback="/images/playa-luna/events/home-feature.webp" altFallback="CULTO at Playa Luna" sizes="100vw" fill className={styles.coverMedia} dataSanity={mediaAttr("closing", media.closingVideo)} />
        <div className={styles.finalShade} /><div><p className={styles.sectionLabel}>Inside Playa Luna · Varcaturo</p><h2>Enter<br />CULTO.</h2><a href={cultoInstagram} target="_blank" rel="noreferrer">Reservations & info <span aria-hidden="true">↗</span></a></div>
      </section>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
