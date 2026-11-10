import type { Metadata } from "next";
import { FloatAfterHero } from "@/app/components/float-after-hero";
import { PageMedia } from "@/app/components/page-media";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { languageAlternates, whatsappLinks } from "@/app/lib/i18n";
import { businessSchema, jsonLd } from "@/app/lib/schema";
import { eventFacts, restaurantPhoneHref, seasonState, siteUrl } from "@/app/lib/site";

const HERO_IMAGE = "/images/playa-luna/hero-beach.webp";

// Rebuild daily: the hero switches between summer and off-season on its own (see seasonState).
export const revalidate = 86400;

const description =
  "Beach club, seafood restaurant, children's pool and private events in Marina di Varcaturo, near Naples. Beach open May to September, restaurant all year round. Book on WhatsApp.";

export const metadata: Metadata = {
  title: { absolute: "Playa Luna | Beach club and seafood restaurant near Naples" },
  description,
  alternates: languageAlternates("en", "/en"),
};

const experiences = [
  {
    number: "01",
    title: "Restaurant & Bar",
    text: "From breakfast to aperitivo with a sea view, food that follows the rhythm of the day.",
    image: "/images/playa-luna/restaurant.webp",
    video: "/videos/home-experience-restaurant.mp4",
    href: "/en/restaurant",
    hrefLang: undefined,
  },
  {
    number: "02",
    title: "Beach Club",
    text: "The sea in front of you, Ischia and Procida on the horizon, and everything you need to truly unwind.",
    image: "/images/playa-luna/beach-card-2f8a3359.webp",
    video: undefined,
    href: "/en/beach-club",
    hrefLang: undefined,
  },
  {
    number: "03",
    title: "Events",
    text: "Parties, ceremonies and celebrations a few steps from the sand. Page in Italian.",
    image: "/images/playa-luna/events/home-card.webp",
    video: "/videos/home-experience-events.mp4",
    href: "/eventi",
    hrefLang: "it",
  },
] as const;

export default function HomeEn() {
  const season = seasonState(new Date(), "en");
  const wa = whatsappLinks.en;
  const structuredData = {
    ...businessSchema(`${siteUrl}${HERO_IMAGE}`),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Playa Luna services",
      itemListElement: ["Beach club", "Seafood restaurant", "Children's pool", "Private events", "Weddings"].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <div className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />

      <SiteHeader locale="en" path="/en" />
      <main id="main">

      <section className="hero" id="top" aria-labelledby="hero-title">
        <PageMedia
          video="/videos/home-hero.mp4"
          src={HERO_IMAGE}
          alt="The beach at Playa Luna with the sea and Ischia and Procida on the horizon"
          sizes="100vw"
          fill
          priority
          className="hero-image"
          position="50% 50%"
          locale="en"
        />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <h1 id="hero-title" className="eyebrow light">Beach club and restaurant in Marina di Varcaturo, near Naples</h1>
          <p className="display-title">The whole sea<br /><em>in one day.</em></p>
          <p className="hero-copy">From the first coffee to aperitivo. Beach, food, pool, with Ischia and Procida across the water.</p>
          {season.notice ? <p className="season-notice">{season.notice}</p> : null}
        </div>
        {season.summer ? (
          <div className="hero-actions shell" role="group" aria-label="Main actions">
            <a href={wa.beach} target="_blank" rel="noreferrer" data-event="whatsapp_beach_hero"><span>01</span> Book your beach day <b aria-hidden="true">↗</b></a>
            <a href="/en/restaurant" data-event="restaurant_page_click"><span>02</span> Discover the restaurant <b aria-hidden="true">→</b></a>
            <a href={wa.events} target="_blank" rel="noreferrer" data-event="whatsapp_events_hero"><span>03</span> Plan an event <b aria-hidden="true">↗</b></a>
          </div>
        ) : (
          <div className="hero-actions shell" role="group" aria-label="Main actions">
            <a href={wa.restaurant} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant_hero"><span>01</span> Book a table <b aria-hidden="true">↗</b></a>
            <a href={wa.events} target="_blank" rel="noreferrer" data-event="whatsapp_events_hero"><span>02</span> Events and weddings 2027 <b aria-hidden="true">↗</b></a>
            <a href="/en/restaurant" data-event="restaurant_page_click"><span>03</span> Discover the restaurant <b aria-hidden="true">→</b></a>
          </div>
        )}
      </section>

      <section className="manifesto shell section-space" aria-labelledby="manifesto-title">
        <div>
          <p className="eyebrow">One place, all day long</p>
          <h2 id="manifesto-title">The sea is more than<br /><em>a destination.</em></h2>
        </div>
        <div className="manifesto-copy">
          <p>
            Playa Luna is the freedom to arrive in the morning and stay until evening.
            The scent of the sea, a table in the shade, a dish to share, music that
            changes with the light.
          </p>
          <a className="text-link" href="#experience">Discover Playa Luna <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="experience-grid shell" id="experience" aria-label="Playa Luna experiences">
        {experiences.map((item) => (
          <a className="experience-card" href={item.href} hrefLang={item.hrefLang} key={item.number} data-event="service_page_click">
            <div className="experience-image-wrap">
              <PageMedia
                video={item.video}
                src={item.image}
                alt=""
                sizes="(max-width: 800px) 82vw, 33vw"
                videoControls={false}
                fill
                locale="en"
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
            <h2 id="beach-title">Your summer,{" "}<br /><em>facing Ischia and Procida.</em></h2>
            <p>Umbrellas, sunbeds and a stretch of coast to enjoy at your own pace. Well-kept spaces, facilities for the whole family and the sea always in sight.</p>
            <ul className="feature-list" aria-label="Beach club facilities">
              <li><span>01</span> Private beach</li>
              <li><span>02</span> Bar & light lunch</li>
              <li><span>03</span> Showers and facilities</li>
              <li><span>04</span> Family area</li>
            </ul>
            <a className="pill-button dark" href={wa.beach} target="_blank" rel="noreferrer" data-event="whatsapp_beach">Book your spot <span aria-hidden="true">↗</span></a>
          </div>
          <figure className="beach-main-image">
            <PageMedia
              src="/images/playa-luna/home/beach-main.webp"
              alt="Relaxing on the beach at Playa Luna in Varcaturo, among sunbeds, umbrellas and the sea"
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <figcaption>Marina di Varcaturo · Gulf of Naples</figcaption>
          </figure>
          <figure className="beach-detail-image">
            <PageMedia
              src="/images/playa-luna/beach-detail-2f8a3953.webp"
              alt="The private beach of Playa Luna in Marina di Varcaturo"
              sizes="18vw"
            />
          </figure>
        </div>
      </section>

      <section className="restaurant section-space" id="restaurant" aria-labelledby="restaurant-title">
        <div className="shell restaurant-heading">
          <p className="eyebrow">Restaurant · Seafood</p>
          <h2 id="restaurant-title">The taste of the<br /><em>perfect day.</em></h2>
          <p>Mediterranean ingredients, dishes to share and a dining room open to the light of the sea. Here lunch is part of the experience, not a break from the beach.</p>
        </div>

        <div className="food-gallery shell" tabIndex={0} role="region" aria-label="Gallery of restaurant dishes">
          <figure className="food-large" style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/home/restaurant-main.webp" alt="Lobster paella served at Playa Luna restaurant in Varcaturo, perfect for sharing by the sea" sizes="(max-width: 800px) 78vw, 46vw" fill />
          </figure>
          <figure style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/home/food-one.webp" alt="Gourmet carpaccio served at Playa Luna restaurant in Varcaturo" sizes="(max-width: 800px) 78vw, 18vw" fill />
          </figure>
          <figure style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/food-pasta.webp" alt="Mediterranean pasta served in the pan" sizes="(max-width: 800px) 78vw, 18vw" fill />
          </figure>
          <figure style={{ position: "relative" }}>
            <PageMedia src="/images/playa-luna/food-three-2f8a7368.webp" alt="Mediterranean seafood dish at Playa Luna in Varcaturo" sizes="(max-width: 800px) 78vw, 18vw" fill />
          </figure>
        </div>

        <div className="restaurant-bottom shell">
          <p>Lunch by the sea · Mediterranean cooking · Cocktails & aperitivo</p>
          <div className="cta-pair">
            <a className="pill-button coral" href={wa.restaurant} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant">Book on WhatsApp <span aria-hidden="true">↗</span></a>
            <a className="pill-button linen" href={restaurantPhoneHref} data-event="phone_restaurant">Call the restaurant</a>
            <a className="pill-button linen" href="/en/menu" data-event="menu_view_home">See the menu</a>
          </div>
        </div>
      </section>

      <section className="family" id="pool" aria-labelledby="pool-title">
        <div className="family-images">
          <div style={{ position: "relative", minWidth: 0 }}>
            <PageMedia src="/images/playa-luna/pool-family.webp" alt="Families and children in the Playa Luna pool" sizes="(max-width: 800px) 100vw, 45vw" fill />
          </div>
          <div style={{ position: "relative", minWidth: 0 }}>
            <PageMedia video="/videos/home-pool-detail.mp4" alt="Playa Luna pool with relaxation area and sunbeds" sizes="28vw" fill locale="en" />
          </div>
        </div>
        <div className="family-copy">
          <p className="eyebrow light">Pool · Playa Luna</p>
          <h2 id="pool-title">A dip<br /><em>into summer.</em></h2>
          <p>Playa Luna’s outdoor pool completes your day at the sea: a space for children to have fun and for the whole family to relax, from May to September. Separate entrance from the beach.</p>
          <a className="text-link light-link" href={wa.beach} target="_blank" rel="noreferrer" data-event="whatsapp_pool">Check availability <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="events section-space" id="events" aria-labelledby="events-title">
        <div className="shell events-grid">
          <div className="events-title-wrap">
            <p className="eyebrow">Events & Weddings</p>
            <h2 id="events-title">Moments<br /><em>by the sea.</em></h2>
          </div>
          <div className="events-copy">
            <p>Birthdays, graduations, ceremonies, weddings and corporate events. Up to {eventFacts.maxGuestsSeated} guests, one party per evening and our own kitchen: we build every occasion around the people.</p>
            <a className="pill-button dark" href={wa.events} target="_blank" rel="noreferrer" data-event="whatsapp_events">Ask for information <span aria-hidden="true">↗</span></a>
          </div>
          <figure className="events-image" style={{ position: "relative", overflow: "hidden" }}>
            <PageMedia video="/videos/playa-luna/pvt-playa.mp4" alt="Elegant setting for an event at Playa Luna" sizes="(max-width: 800px) 100vw, 52vw" fill locale="en" />
          </figure>
          <div className="event-types" role="group" aria-label="Types of events">
            <div><span>01</span><h3>Private party</h3><p>Birthdays, graduations and tailor-made parties.</p></div>
            <div><span>02</span><h3>Wedding</h3><p>Receptions and vows a few steps from the sea.</p></div>
            <div><span>03</span><h3>Corporate</h3><p>Lunches, meetings and company events.</p></div>
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <PageMedia src="/images/playa-luna/final-cta-2f8a5852.webp" alt="Reserved spot next to the Playa Luna pool" sizes="100vw" fill position="50% 58%" />
        <div className="final-cta-shade" />
        <div className="final-cta-content">
          <p className="eyebrow light">Your day starts here</p>
          <h2 id="final-title">See you<br /><em>by the sea?</em></h2>
          <a className="pill-button linen" href={wa.beach} target="_blank" rel="noreferrer" data-event="whatsapp_beach">Book on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      </main>

      <SiteFooter locale="en" />

      <FloatAfterHero>
        {season.summer ? (
          <a className="whatsapp-float" href={wa.beach} target="_blank" rel="noreferrer" aria-label="Book on WhatsApp" data-event="whatsapp_beach_float">
            <span aria-hidden="true">✦</span> Book
          </a>
        ) : (
          <a className="whatsapp-float" href={wa.restaurant} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant_float">
            <span aria-hidden="true">✦</span> Book a table
          </a>
        )}
      </FloatAfterHero>
    </div>
  );
}
