import Image from "next/image";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import {
  beachPhoneNumber,
  beachWhatsapp,
  eventPhoneNumber,
  eventWhatsapp,
  restaurantPhoneHref,
  restaurantPhoneNumber,
} from "./lib/site";
import {
  getMediaDocument,
  mediaAlt,
  mediaUrl,
  type ManagedImage,
} from "./lib/sanity";
import { sanityImageAttribute } from "./lib/sanity-visual";

const experienceDefaults = [
  {
    number: "01",
    title: "Beach Club",
    text: "Il mare davanti, l'isola all'orizzonte e tutto quello che serve per staccare davvero.",
    image: "/images/playa-luna/beach-day.webp",
    slot: "experienceBeach",
    href: "/beach-club/",
  },
  {
    number: "02",
    title: "Food & Drink",
    text: "Dalla colazione al pranzo vista mare, una cucina che segue il ritmo della giornata.",
    image: "/images/playa-luna/restaurant.webp",
    slot: "experienceRestaurant",
    href: "/ristorante-sul-mare/",
  },
  {
    number: "03",
    title: "Events",
    text: "Feste, cerimonie e ricorrenze da vivere a pochi passi dalla sabbia.",
    image: "/images/playa-luna/events/home-card.webp",
    slot: "experienceEvents",
    href: "/eventi/",
  },
];

export default async function Home() {
  const media = await getMediaDocument<Record<string, ManagedImage>>("homeMedia");
  const experiences = experienceDefaults.map((item) => ({
    ...item,
    image: mediaUrl(media[item.slot], item.image),
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Beach", "Restaurant", "EventVenue", "LocalBusiness"],
    name: "Playa Luna",
    description:
      "Beach club, ristorante sul mare, piscina ed eventi a Marina di Varcaturo.",
    url: "https://playaluna.it/",
    telephone: beachPhoneNumber,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "Beach Club", telephone: beachPhoneNumber },
      { "@type": "ContactPoint", contactType: "Ristorante", telephone: restaurantPhoneNumber },
      { "@type": "ContactPoint", contactType: "Events", telephone: eventPhoneNumber },
    ],
    priceRange: "€€",
    image: "https://playaluna.it/images/playa-luna/hero-beach.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Marina di Varcaturo, 42",
      addressLocality: "Giugliano in Campania",
      addressRegion: "NA",
      addressCountry: "IT",
    },
    sameAs: [
      "https://www.instagram.com/lidoplayaluna/",
      "https://www.facebook.com/Complesso.Playa.Luna/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servizi Playa Luna",
      itemListElement: ["Beach Club", "Ristorante sul mare", "Piscina Playa Luna", "Eventi", "Wedding"].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <SiteHeader />

      <section
        className="hero"
        id="top"
        aria-labelledby="hero-title"
        data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "hero")}
      >
        <Image
          className="hero-image"
          src={mediaUrl(media.hero, "/images/playa-luna/hero-beach.webp")}
          alt={mediaAlt(media.hero, "La spiaggia di Playa Luna con il mare e l'isola all'orizzonte")}
          width={1080}
          height={1350}
          priority
          unoptimized
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <p className="eyebrow light">Beach club · Varcaturo</p>
          <h1 id="hero-title">
            Tutto il mare
            <br />
            <em>in un giorno.</em>
          </h1>
          <p className="hero-copy">
            Dal primo caffè al tramonto. Spiaggia, cucina, piscina e momenti da ricordare.
          </p>
        </div>
        <div className="hero-actions shell" aria-label="Azioni principali">
          <a href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach">
            <span>01</span> Prenota la tua giornata <b aria-hidden="true">↗</b>
          </a>
          <a href="/ristorante-sul-mare/" data-event="restaurant_page_click">
            <span>02</span> Scopri il ristorante <b aria-hidden="true">↓</b>
          </a>
          <a href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events">
            <span>03</span> Organizza un evento <b aria-hidden="true">↗</b>
          </a>
        </div>
      </section>

      <section className="manifesto shell section-space" aria-labelledby="manifesto-title">
        <div>
          <p className="eyebrow">Un luogo, tutta la giornata</p>
          <h2 id="manifesto-title">
            Il mare non è solo
            <br />
            <em>una destinazione.</em>
          </h2>
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
        {experiences.map((item) => (
          <a className="experience-card" href={item.href} key={item.number} data-event="service_page_click">
            <div
              className="experience-image-wrap"
              data-sanity={sanityImageAttribute("homeMedia", "homeMedia", item.slot)}
            >
              <Image src={item.image} alt="" width={960} height={1200} unoptimized sizes="(max-width: 800px) 82vw, 33vw" />
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
            <p>
              Ombrelloni, lettini e un tratto di costa da vivere con calma. Spazi curati,
              servizi per tutta la famiglia e il mare sempre davanti agli occhi.
            </p>
            <ul className="feature-list" aria-label="Servizi beach club">
              <li><span>01</span> Spiaggia attrezzata</li>
              <li><span>02</span> Bar & light lunch</li>
              <li><span>03</span> Docce e servizi</li>
              <li><span>04</span> Area family</li>
            </ul>
            <a className="pill-button dark" href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach">
              Prenota il tuo posto <span aria-hidden="true">↗</span>
            </a>
          </div>
          <figure
            className="beach-main-image"
            data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "beachMain")}
          >
            <Image src={mediaUrl(media.beachMain, "/images/playa-luna/beach-day.webp")} alt={mediaAlt(media.beachMain, "Lettini e ombrelloni sulla spiaggia Playa Luna")} width={960} height={1200} unoptimized sizes="(max-width: 800px) 100vw, 42vw" />
            <figcaption>Marina di Varcaturo · Golfo di Napoli</figcaption>
          </figure>
          <figure
            className="beach-detail-image"
            data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "beachDetail")}
          >
            <Image src={mediaUrl(media.beachDetail, "/images/playa-luna/sunset-view.webp")} alt={mediaAlt(media.beachDetail, "Vista della spiaggia tra fiori e piante mediterranee")} width={960} height={1200} unoptimized sizes="18vw" />
          </figure>
        </div>
      </section>

      <section className="restaurant section-space" id="restaurant" aria-labelledby="restaurant-title">
        <div className="shell restaurant-heading">
          <p className="eyebrow">Restaurant · Cucina di mare</p>
          <h2 id="restaurant-title">Il sapore della<br /><em>giornata perfetta.</em></h2>
          <p>
            Ingredienti mediterranei, piatti da condividere e una sala aperta sulla luce del mare.
            Qui il pranzo è parte dell’esperienza, non una pausa dalla spiaggia.
          </p>
        </div>

        <div className="food-gallery shell">
          <figure
            className="food-large"
            data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "restaurantMain")}
          >
            <Image src={mediaUrl(media.restaurantMain, "/images/playa-luna/restaurant.webp")} alt={mediaAlt(media.restaurantMain, "Il ristorante Playa Luna con struttura in legno e tavoli all'aperto")} width={960} height={1200} unoptimized sizes="(max-width: 800px) 78vw, 46vw" />
          </figure>
          <figure data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "foodOne")}>
            <Image src={mediaUrl(media.foodOne, "/images/playa-luna/food-tartare.webp")} alt={mediaAlt(media.foodOne, "Tartare di mare servita al ristorante Playa Luna")} width={800} height={1000} unoptimized sizes="(max-width: 800px) 78vw, 18vw" />
          </figure>
          <figure data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "foodTwo")}>
            <Image src={mediaUrl(media.foodTwo, "/images/playa-luna/food-pasta.webp")} alt={mediaAlt(media.foodTwo, "Pasta mediterranea servita in padella")} width={800} height={1000} unoptimized sizes="(max-width: 800px) 78vw, 18vw" />
          </figure>
          <figure data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "foodThree")}>
            <Image src={mediaUrl(media.foodThree, "/images/playa-luna/food-fish.webp")} alt={mediaAlt(media.foodThree, "Secondo piatto di pesce con verdure")} width={800} height={1000} unoptimized sizes="(max-width: 800px) 78vw, 18vw" />
          </figure>
        </div>

        <div className="restaurant-bottom shell">
          <p>Pranzo sul mare · Cucina mediterranea · Cocktail & aperitivo</p>
          <a className="pill-button coral" href={restaurantPhoneHref} data-event="phone_restaurant">Prenota un tavolo <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="family" id="pool" aria-labelledby="pool-title">
        <div className="family-images">
          <Image
            src={mediaUrl(media.poolMain, "/images/playa-luna/pool-family.webp")}
            alt={mediaAlt(media.poolMain, "Famiglie e bambini nella piscina di Playa Luna")}
            width={959}
            height={1200}
            unoptimized
            sizes="(max-width: 800px) 100vw, 45vw"
            data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "poolMain")}
          />
          <Image
            src={mediaUrl(media.poolDetail, "/images/playa-luna/pool-chair.webp")}
            alt={mediaAlt(media.poolDetail, "Piscina Playa Luna con area relax e lettini")}
            width={800}
            height={1000}
            unoptimized
            sizes="28vw"
            data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "poolDetail")}
          />
        </div>
        <div className="family-copy">
          <p className="eyebrow light">Piscina · Playa Luna</p>
          <h2 id="pool-title">Un tuffo<br /><em>nell’estate.</em></h2>
          <p>
            La piscina interna a Playa Luna completa la giornata al mare: uno spazio dedicato
            al divertimento dei più piccoli e al relax di tutta la famiglia.
          </p>
          <a className="text-link light-link" href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_pool">
            Chiedi disponibilità <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="events section-space" id="events" aria-labelledby="events-title">
        <div className="shell events-grid">
          <div className="events-title-wrap">
            <p className="eyebrow">Events & Wedding</p>
            <h2 id="events-title">Momenti da<br /><em>a(mare).</em></h2>
          </div>
          <div className="events-copy">
            <p>
              Diciottesimi, compleanni, cerimonie, matrimoni ed eventi aziendali. Costruiamo ogni
              occasione intorno alle persone, con il mare come scenografia naturale.
            </p>
            <a className="pill-button dark" href={eventWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_events">
              Richiedi informazioni <span aria-hidden="true">↗</span>
            </a>
          </div>
          <figure
            className="events-image"
            data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "eventsFeature")}
          >
            <Image src={mediaUrl(media.eventsFeature, "/images/playa-luna/events/home-feature.webp")} alt={mediaAlt(media.eventsFeature, "Allestimento elegante per un evento al Playa Luna")} width={960} height={1200} unoptimized sizes="(max-width: 800px) 100vw, 52vw" />
          </figure>
          <div className="event-types" aria-label="Tipologie di eventi">
            <div><span>01</span><h3>Private party</h3><p>Compleanni, lauree e feste su misura.</p></div>
            <div><span>02</span><h3>Wedding</h3><p>Ricevimenti e promesse a pochi passi dal mare.</p></div>
            <div><span>03</span><h3>Corporate</h3><p>Pranzi, meeting ed eventi aziendali.</p></div>
          </div>
        </div>
      </section>

      <section
        className="final-cta"
        aria-labelledby="final-title"
        data-sanity={sanityImageAttribute("homeMedia", "homeMedia", "finalCta")}
      >
        <Image src={mediaUrl(media.finalCta, "/images/playa-luna/pool-chair.webp")} alt={mediaAlt(media.finalCta, "Postazione riservata accanto alla piscina Playa Luna")} width={800} height={1000} unoptimized sizes="100vw" />
        <div className="final-cta-shade" />
        <div className="final-cta-content">
          <p className="eyebrow light">La tua giornata comincia qui</p>
          <h2 id="final-title">Ci vediamo<br /><em>al mare?</em></h2>
          <a className="pill-button linen" href={beachWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_beach">
            Prenota su WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <SiteFooter />

      <a className="whatsapp-float" href={beachWhatsapp} target="_blank" rel="noreferrer" aria-label="Prenota Playa Luna su WhatsApp" data-event="whatsapp_sticky">
        <span aria-hidden="true">✦</span> Prenota
      </a>
    </main>
  );
}
