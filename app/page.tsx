import type { Metadata } from "next";
import { FloatAfterHero } from "./components/float-after-hero";
import { PageMedia } from "./components/page-media";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { businessSchema, jsonLd } from "./lib/schema";
import {
  beachWhatsapp,
  eventWhatsapp,
  poolWhatsapp,
  restaurantPhoneHref,
  restaurantWhatsapp,
  seasonState,
  siteUrl,
} from "./lib/site";

const HERO_IMAGE = "/images/playa-luna/hero-beach.webp";

// Rebuild daily: the hero switches between summer and off-season on its own (see seasonState).
export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: "Playa Luna | Beach club e ristorante sul mare a Varcaturo" },
  description: "Beach club, ristorante sul mare, piscina per bambini ed eventi a Marina di Varcaturo. Lido aperto da maggio a settembre, ristorante tutto l'anno. Prenota su WhatsApp.",
  alternates: { canonical: "/" },
};

const experienceDefaults = [
  {
    number: "01",
    title: "Ristorante & Bar",
    text: "Dalla colazione all'aperitivo vista mare, una cucina che segue il ritmo della giornata.",
    image: "/images/playa-luna/restaurant.webp",
    video: "/videos/home-experience-restaurant.mp4",
    href: "/ristorante-sul-mare",
  },
  {
    number: "02",
    title: "Beach Club",
    text: "Il mare davanti, l'isola all'orizzonte e tutto quello che serve per staccare davvero.",
    image: "/images/playa-luna/beach-card-2f8a3359.webp",
    video: undefined,
    href: "/beach-club",
  },
  {
    number: "03",
    title: "Eventi",
    text: "Feste, cerimonie e ricorrenze da vivere a pochi passi dalla sabbia.",
    image: "/images/playa-luna/events/home-card.webp",
    video: "/videos/home-experience-events.mp4",
    href: "/eventi",
  },
] as const;

export default function Home() {
  const season = seasonState();
  const structuredData = {
    ...businessSchema(`${siteUrl}${HERO_IMAGE}`),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servizi Playa Luna",
      itemListElement: ["Beach Club", "Ristorante sul mare", "Piscina per bambini", "Eventi privati", "Matrimoni"].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />

      <SiteHeader />
      <main id="main">

      <section className="hero" id="top" aria-labelledby="hero-title">
        <PageMedia
          video="/videos/home-hero.mp4"
          src={HERO_IMAGE}
          alt="La spiaggia di Playa Luna con il mare e l'isola all'orizzonte"
          sizes="100vw"
          fill
          priority
          className="hero-image"
          position="50% 50%"
        />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <h1 id="hero-title" className="eyebrow light">Beach club e ristorante a Marina di Varcaturo</h1>
          <p className="display-title">Tutto il mare<br /><em>in un giorno.</em></p>
          <p className="hero-copy">Dal primo caffè al tramonto. Spiaggia, cucina, piscina e momenti da ricordare.</p>
          {season.notice ? <p className="season-notice">{season.notice}</p> : null}
        </div>
        {season.summer ? (
          <div className="hero-actions shell" role="group" aria-label="Azioni principali">
            <a href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach_hero"><span>01</span> Prenota la tua giornata <b aria-hidden="true">↗</b></a>
            <a href="/ristorante-sul-mare" data-event="restaurant_page_click"><span>02</span> Scopri il ristorante <b aria-hidden="true">→</b></a>
            <a href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events_hero"><span>03</span> Organizza un evento <b aria-hidden="true">↗</b></a>
          </div>
        ) : (
          <div className="hero-actions shell" role="group" aria-label="Azioni principali">
            <a href={restaurantWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant_hero"><span>01</span> Prenota un tavolo <b aria-hidden="true">↗</b></a>
            <a href="/eventi" data-event="events_page_click"><span>02</span> Eventi e matrimoni 2027 <b aria-hidden="true">→</b></a>
            <a href="/ristorante-sul-mare" data-event="restaurant_page_click"><span>03</span> Scopri il ristorante <b aria-hidden="true">→</b></a>
          </div>
        )}
      </section>

      <section className="manifesto shell section-space" aria-labelledby="manifesto-title">
        <div>
          <p className="eyebrow">Un luogo, tutta la giornata</p>
          <h2 id="manifesto-title">Il mare non è solo<br /><em>una destinazione.</em></h2>
        </div>
        <div className="manifesto-copy">
          <p>
            Playa Luna è la libertà di arrivare al mattino senza decidere quando andare via.
            Il profumo del mare, un tavolo all’ombra, un piatto da condividere, la musica che
            cambia insieme alla luce.
          </p>
          <a className="text-link" href="#experience">Vivi Playa Luna <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="experience-grid shell" id="experience" aria-label="Esperienze Playa Luna">
        {experienceDefaults.map((item) => (
          <a className="experience-card" href={item.href} key={item.number} data-event="service_page_click">
            <div className="experience-image-wrap">
              <PageMedia
                video={item.video}
                src={item.image}
                alt=""
                sizes="(max-width: 800px) 82vw, 33vw"
                fill
              />
              <span className="card-number">{item.number}</span>
            </div>
            <div className="experience-card-copy">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="round-arrow" aria-hidden="true">↗</span>
            </div>
          </a>
        ))}
      </section>

      <section className="beach-story section-space" id="beach" aria-labelledby="beach-title">
        <div className="shell beach-grid">
          <div className="beach-copy">
            <p className="eyebrow">Beach Club</p>
            <h2 id="beach-title">La tua estate,<br /><em>senza orari.</em></h2>
            <p>Ombrelloni, lettini e un tratto di costa da vivere con calma. Spazi curati, servizi per tutta la famiglia e il mare sempre davanti agli occhi.</p>
            <ul className="feature-list" aria-label="Servizi beach club">
              <li><span>01</span> Spiaggia attrezzata</li>
              <li><span>02</span> Bar & light lunch</li>
              <li><span>03</span> Docce e servizi</li>
              <li><span>04</span> Area family</li>
            </ul>
            <a className="pill-button dark" href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach">Prenota il tuo posto <span aria-hidden="true">↗</span></a>
          </div>
          <figure className="beach-main-image">
            <PageMedia
              src="/images/playa-luna/home/beach-main.webp"
              alt="Relax in spiaggia al Playa Luna di Varcaturo, tra lettini, ombrelloni e mare per una giornata di estate e benessere."
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <figcaption>Marina di Varcaturo · Golfo di Napoli</figcaption>
          </figure>
          <figure className="beach-detail-image">
            <PageMedia
              src="/images/playa-luna/beach-detail-2f8a3953.webp"
              alt="Spiaggia attrezzata del Playa Luna a Marina di Varcaturo"
              sizes="18vw"
            />
          </figure>
        </div>
      </section>

      <section className="restaurant section-space" id="restaurant" aria-labelledby="restaurant-title">
        <div className="shell restaurant-heading">
          <p className="eyebrow">Ristorante · Cucina di mare</p>
          <h2 id="restaurant-title">Il sapore della<br /><em>giornata perfetta.</em></h2>
          <p>Ingredienti mediterranei, piatti da condividere e una sala aperta sulla luce del mare. Qui il pranzo è parte dell’esperienza, non una pausa dalla spiaggia.</p>
        </div>

        <div className="food-gallery shell" tabIndex={0} role="region" aria-label="Galleria piatti del ristorante">
          <figure className="food-large" style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/home/restaurant-main.webp" alt="Paella all’astice servita al ristorante Playa Luna di Varcaturo, ideale da condividere in una location sul mare." sizes="(max-width: 800px) 78vw, 46vw" fill />
          </figure>
          <figure style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/home/food-one.webp" alt="Carpaccio gourmet servito al ristorante Playa Luna di Varcaturo, con ingredienti selezionati e impiattamento curato." sizes="(max-width: 800px) 78vw, 18vw" fill />
          </figure>
          <figure style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/food-pasta.webp" alt="Pasta mediterranea servita in padella" sizes="(max-width: 800px) 78vw, 18vw" fill />
          </figure>
          <figure style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/food-three-2f8a7368.webp" alt="Esperienza gastronomica al Playa Luna di Varcaturo tra cucina mediterranea, piatti di mare e atmosfera sulla spiaggia" sizes="(max-width: 800px) 78vw, 18vw" fill />
          </figure>
        </div>

        <div className="restaurant-bottom shell">
          <p>Pranzo sul mare · Cucina mediterranea · Cocktail & aperitivo</p>
          <div className="cta-pair">
            <a className="pill-button coral" href={restaurantWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant">Prenota su WhatsApp <span aria-hidden="true">↗</span></a>
            <a className="pill-button linen" href={restaurantPhoneHref} data-event="phone_restaurant">Chiama il ristorante</a>
          </div>
        </div>
      </section>

      <section className="family" id="pool" aria-labelledby="pool-title">
        <div className="family-images">
          <div style={{ position: "relative", minWidth: 0 }}>
            <PageMedia src="/images/playa-luna/pool-family.webp" alt="Famiglie e bambini nella piscina di Playa Luna" sizes="(max-width: 800px) 100vw, 45vw" fill />
          </div>
          <div style={{ position: "relative", minWidth: 0 }}>
            <PageMedia video="/videos/home-pool-detail.mp4" alt="Piscina Playa Luna con area relax e lettini" sizes="28vw" fill />
          </div>
        </div>
        <div className="family-copy">
          <p className="eyebrow light">Piscina · Playa Luna</p>
          <h2 id="pool-title">Un tuffo<br /><em>nell’estate.</em></h2>
          <p>La piscina interna a Playa Luna completa la giornata al mare: uno spazio dedicato al divertimento dei più piccoli e al relax di tutta la famiglia.</p>
          <a className="text-link light-link" href={poolWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_pool">Chiedi disponibilità <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="events section-space" id="events" aria-labelledby="events-title">
        <div className="shell events-grid">
          <div className="events-title-wrap">
            <p className="eyebrow">Eventi & Wedding</p>
            <h2 id="events-title">Momenti da<br /><em>a(mare).</em></h2>
          </div>
          <div className="events-copy">
            <p>Diciottesimi, compleanni, cerimonie, matrimoni ed eventi aziendali. Costruiamo ogni occasione intorno alle persone, con il mare come scenografia naturale.</p>
            <a className="pill-button dark" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events">Richiedi informazioni <span aria-hidden="true">↗</span></a>
          </div>
          <figure className="events-image" style={{ position: "relative", overflow: "hidden" }}>
            <PageMedia video="/videos/playa-luna/pvt-playa.mp4" alt="Allestimento elegante per un evento al Playa Luna" sizes="(max-width: 800px) 100vw, 52vw" fill />
          </figure>
          <div className="event-types" role="group" aria-label="Tipologie di eventi">
            <div><span>01</span><h3>Private party</h3><p>Compleanni, lauree e feste su misura.</p></div>
            <div><span>02</span><h3>Wedding</h3><p>Ricevimenti e promesse a pochi passi dal mare.</p></div>
            <div><span>03</span><h3>Corporate</h3><p>Pranzi, meeting ed eventi aziendali.</p></div>
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <PageMedia src="/images/playa-luna/final-cta-2f8a5852.webp" alt="Postazione riservata accanto alla piscina Playa Luna" sizes="100vw" fill position="50% 58%" />
        <div className="final-cta-shade" />
        <div className="final-cta-content">
          <p className="eyebrow light">La tua giornata comincia qui</p>
          <h2 id="final-title">Ci vediamo<br /><em>al mare?</em></h2>
          <a className="pill-button linen" href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach">Prenota su WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      </main>

      <SiteFooter />

      <FloatAfterHero>
        {season.summer ? (
          <a className="whatsapp-float" href={beachWhatsapp} target="_blank" rel="noreferrer" aria-label="Prenota su WhatsApp" data-event="whatsapp_beach_float">
            <span aria-hidden="true">✦</span> Prenota
          </a>
        ) : (
          <a className="whatsapp-float" href={restaurantWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant_float">
            <span aria-hidden="true">✦</span> Prenota un tavolo
          </a>
        )}
      </FloatAfterHero>
    </div>
  );
}
