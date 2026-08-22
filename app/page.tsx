const beachWhatsapp =
  "https://wa.me/393762115726?text=Ciao%20Playa%20Luna%2C%20vorrei%20prenotare%20una%20giornata%20al%20mare.";
const eventWhatsapp =
  "https://wa.me/393505908393?text=Ciao%20Playa%20Luna%2C%20vorrei%20ricevere%20informazioni%20per%20un%20evento.";

const experiences = [
  {
    number: "01",
    title: "Beach Club",
    text: "Il mare davanti, l'isola all'orizzonte e tutto quello che serve per staccare davvero.",
    image: "/images/playa-luna/beach-day.webp",
    href: "#beach",
  },
  {
    number: "02",
    title: "Food & Drink",
    text: "Dalla colazione al pranzo vista mare, una cucina che segue il ritmo della giornata.",
    image: "/images/playa-luna/restaurant.webp",
    href: "#restaurant",
  },
  {
    number: "03",
    title: "Events",
    text: "Feste, cerimonie e ricorrenze da vivere a pochi passi dalla sabbia.",
    image: "/images/playa-luna/events-detail.webp",
    href: "#events",
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Beach", "Restaurant", "EventVenue", "LocalBusiness"],
    name: "Playa Luna",
    description:
      "Beach club, ristorante sul mare, piscina ed eventi a Marina di Varcaturo.",
    url: "https://playaluna.it/",
    telephone: "+39 376 211 5726",
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
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="site-header">
        <a className="brand-logo-link" href="#top" aria-label="Playa Luna, torna all'inizio">
          <img className="brand-logo" src="/playaluna-logo.svg" alt="" />
        </a>

        <nav className="desktop-nav" aria-label="Navigazione principale">
          <a href="#beach">Beach</a>
          <a href="#restaurant">Restaurant</a>
          <a href="#pool">Piscina</a>
          <a href="#events">Events</a>
          <a href="#contact">Contatti</a>
        </nav>

        <a className="header-cta" href={beachWhatsapp} target="_blank" rel="noreferrer">
          Prenota <span aria-hidden="true">↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="Apri il menu">Menu</summary>
          <nav aria-label="Navigazione mobile">
            <a href="#beach">Beach Club</a>
            <a href="#restaurant">Restaurant</a>
            <a href="#pool">Piscina</a>
            <a href="#events">Events</a>
            <a href="#contact">Contatti</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img
          className="hero-image"
          src="/images/playa-luna/hero-beach.webp"
          alt="La spiaggia di Playa Luna con il mare e l'isola all'orizzonte"
          fetchPriority="high"
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
          <a href={beachWhatsapp} target="_blank" rel="noreferrer">
            <span>01</span> Prenota la tua giornata <b aria-hidden="true">↗</b>
          </a>
          <a href="#restaurant">
            <span>02</span> Scopri il ristorante <b aria-hidden="true">↓</b>
          </a>
          <a href={eventWhatsapp} target="_blank" rel="noreferrer">
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
          <a className="experience-card" href={item.href} key={item.number}>
            <div className="experience-image-wrap">
              <img src={item.image} alt="" loading="lazy" />
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
            <a className="pill-button dark" href={beachWhatsapp} target="_blank" rel="noreferrer">
              Prenota il tuo posto <span aria-hidden="true">↗</span>
            </a>
          </div>
          <figure className="beach-main-image">
            <img src="/images/playa-luna/beach-day.webp" alt="Lettini e ombrelloni sulla spiaggia Playa Luna" loading="lazy" />
            <figcaption>Marina di Varcaturo · Golfo di Napoli</figcaption>
          </figure>
          <figure className="beach-detail-image">
            <img src="/images/playa-luna/sunset-view.webp" alt="Vista della spiaggia tra fiori e piante mediterranee" loading="lazy" />
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
          <figure className="food-large">
            <img src="/images/playa-luna/restaurant.webp" alt="Il ristorante Playa Luna con struttura in legno e tavoli all'aperto" loading="lazy" />
          </figure>
          <figure>
            <img src="/images/playa-luna/food-tartare.webp" alt="Tartare di mare servita al ristorante Playa Luna" loading="lazy" />
          </figure>
          <figure>
            <img src="/images/playa-luna/food-pasta.webp" alt="Pasta mediterranea servita in padella" loading="lazy" />
          </figure>
          <figure>
            <img src="/images/playa-luna/food-fish.webp" alt="Secondo piatto di pesce con verdure" loading="lazy" />
          </figure>
        </div>

        <div className="restaurant-bottom shell">
          <p>Pranzo sul mare · Cucina mediterranea · Cocktail & aperitivo</p>
          <a className="pill-button coral" href="tel:+393762115726">Prenota un tavolo <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="family" id="pool" aria-labelledby="pool-title">
        <div className="family-images">
          <img src="/images/playa-luna/pool-family.webp" alt="Famiglie e bambini nella piscina di Playa Luna" loading="lazy" />
          <img src="/images/playa-luna/pool-chair.webp" alt="Piscina Playa Luna con area relax e lettini" loading="lazy" />
        </div>
        <div className="family-copy">
          <p className="eyebrow light">Piscina · Playa Luna</p>
          <h2 id="pool-title">Un tuffo<br /><em>nell’estate.</em></h2>
          <p>
            La piscina interna a Playa Luna completa la giornata al mare: uno spazio dedicato
            al divertimento dei più piccoli e al relax di tutta la famiglia.
          </p>
          <a className="text-link light-link" href={beachWhatsapp} target="_blank" rel="noreferrer">
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
            <a className="pill-button dark" href={eventWhatsapp} target="_blank" rel="noreferrer">
              Richiedi informazioni <span aria-hidden="true">↗</span>
            </a>
          </div>
          <figure className="events-image">
            <img src="/images/playa-luna/events-detail.webp" alt="Dettagli bianchi di un allestimento per evento Playa Luna" loading="lazy" />
          </figure>
          <div className="event-types" aria-label="Tipologie di eventi">
            <div><span>01</span><h3>Private party</h3><p>Compleanni, lauree e feste su misura.</p></div>
            <div><span>02</span><h3>Wedding</h3><p>Ricevimenti e promesse a pochi passi dal mare.</p></div>
            <div><span>03</span><h3>Corporate</h3><p>Pranzi, meeting ed eventi aziendali.</p></div>
          </div>
        </div>
      </section>

      <section className="final-cta" aria-labelledby="final-title">
        <img src="/images/playa-luna/pool-chair.webp" alt="Postazione riservata accanto alla piscina Playa Luna" loading="lazy" />
        <div className="final-cta-shade" />
        <div className="final-cta-content">
          <p className="eyebrow light">La tua giornata comincia qui</p>
          <h2 id="final-title">Ci vediamo<br /><em>al mare?</em></h2>
          <a className="pill-button linen" href={beachWhatsapp} target="_blank" rel="noreferrer">
            Prenota su WhatsApp <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer id="contact">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <a className="brand-logo-link footer-logo-link" href="#top" aria-label="Playa Luna, torna all'inizio">
              <img className="brand-logo footer-brand-logo" src="/playaluna-logo.svg" alt="" />
            </a>
            <p>Beach club · Restaurant · Events</p>
          </div>
          <div>
            <p className="footer-label">Dove siamo</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Playa+Luna+Via+Marina+di+Varcaturo+42" target="_blank" rel="noreferrer">
              Via Marina di Varcaturo, 42<br />Giugliano in Campania (NA)
            </a>
          </div>
          <div>
            <p className="footer-label">Contatti</p>
            <a href="tel:+393762115726">+39 376 211 5726</a>
            <a href="mailto:info@playaluna.it">info@playaluna.it</a>
          </div>
          <div>
            <p className="footer-label">Seguici</p>
            <a href="https://www.instagram.com/lidoplayaluna/" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href="https://www.facebook.com/Complesso.Playa.Luna/" target="_blank" rel="noreferrer">Facebook ↗</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>© {new Date().getFullYear()} Playa Luna</p>
          <div><span>Privacy</span><span>Cookie</span></div>
          <p>Made with the Mediterranean in mind.</p>
        </div>
      </footer>

      <a className="whatsapp-float" href={beachWhatsapp} target="_blank" rel="noreferrer" aria-label="Prenota Playa Luna su WhatsApp">
        <span aria-hidden="true">✦</span> Prenota
      </a>
    </main>
  );
}
