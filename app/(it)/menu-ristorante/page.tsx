import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { allergens, drinks, formatPrice, kitchen, menuNotes, menuPdf, type MenuSection } from "@/app/lib/menu";
import { breadcrumbSchema, businessId, jsonLd } from "@/app/lib/schema";
import { hoursLabel, openingHours, pageOpenGraph, restaurantPhoneHref, restaurantPhoneNumber, restaurantWhatsapp, siteUrl } from "@/app/lib/site";
import styles from "./menu.module.css";

const title = "Menu del ristorante sul mare";
const description =
  `Il menu 2026 del ristorante Playa Luna a Marina di Varcaturo: antipasti di mare, primi, secondi di pesce, dessert, vini e drink, con prezzi e allergeni. Pranzo tutti i giorni ${hoursLabel.lunch}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/menu-ristorante" },
  openGraph: pageOpenGraph({ path: "/menu-ristorante", title: `${title} | Playa Luna`, description }),
};

function menuSchema() {
  const toSection = (section: MenuSection) => ({
    "@type": "MenuSection",
    name: section.title,
    hasMenuItem: section.items
      .filter((item) => item.price !== undefined)
      .map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        offers: { "@type": "Offer", price: item.price!.toFixed(2), priceCurrency: "EUR" },
      })),
  });
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}/menu-ristorante#menu`,
    name: "Menu del ristorante Playa Luna 2026",
    inLanguage: "it",
    url: `${siteUrl}/menu-ristorante`,
    mainEntityOfPage: `${siteUrl}/menu-ristorante`,
    provider: { "@id": businessId },
    hasMenuSection: [...kitchen, ...drinks].map(toSection),
  };
}

function Section({ section }: { section: MenuSection }) {
  return (
    <section className={styles.section} id={section.id} aria-labelledby={`${section.id}-title`}>
      <h3 id={`${section.id}-title`}>{section.title}</h3>
      <ul>
        {section.items.map((item) => (
          <li key={item.name}>
            <span className={styles.name}>
              {item.name}
              {item.frozen ? <span aria-label=" (può contenere ingredienti surgelati o abbattuti)">*</span> : null}
              {item.allergens?.length ? (
                <small className={styles.allergens}>
                  Allergeni: {item.allergens.map((n) => allergens[n]).join(", ")}
                </small>
              ) : null}
            </span>
            <span className={styles.price}>{formatPrice(item.price)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function RestaurantMenuPage() {
  const all = [...kitchen, ...drinks];
  return (
    <div className={`page-shell ${styles.page}`}>
      <SiteHeader />
      <main id="main">
      <section className={styles.menu} aria-labelledby="menu-title">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Percorso">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/ristorante-sul-mare">Ristorante</Link><span>/</span><span>Menu</span>
          </nav>
          <h1 id="menu-title" className="eyebrow">Menu del ristorante Playa Luna a Varcaturo</h1>
          <p className={`display-title ${styles.title}`}>Il nostro <em>menu.</em></p>
          <p className={styles.lead}>
            Cucina di mare e piatti mediterranei, a pranzo tutti i giorni dalle {openingHours.restaurant.opens} alle{" "}
            {openingHours.restaurant.closes}. Per prenotare un tavolo{" "}
            <a href={restaurantWhatsapp} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant_menu">scrivici su WhatsApp</a> o chiama il{" "}
            <a href={restaurantPhoneHref} data-event="phone_restaurant_menu">{restaurantPhoneNumber}</a>.
          </p>
          <div className={styles.actions}>
            <a className="pill-button dark" href={menuPdf} target="_blank" rel="noopener noreferrer" data-event="menu_pdf_open">
              Apri il PDF <span aria-hidden="true">↗</span>
            </a>
            <a className="pill-button dark" href={menuPdf} download data-event="menu_pdf_download">
              Scarica il menu <span aria-hidden="true">↓</span>
            </a>
          </div>

          <nav className={styles.index} aria-label="Sezioni del menu">
            {all.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.title}</a>
            ))}
          </nav>

          <h2 className={styles.group}>Cucina</h2>
          <div className={styles.grid}>
            {kitchen.map((section) => <Section key={section.id} section={section} />)}
          </div>

          <h2 className={styles.group}>Vini, bollicine e drink</h2>
          <div className={styles.grid}>
            {drinks.map((section) => <Section key={section.id} section={section} />)}
          </div>

          <aside className={styles.notes} aria-labelledby="menu-notes-title">
            <h2 id="menu-notes-title">Allergeni e servizio</h2>
            <ul>
              {menuNotes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </aside>
        </div>
      </section>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          menuSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Ristorante", path: "/ristorante-sul-mare" },
            { name: "Menu", path: "/menu-ristorante" },
          ]),
        ])}
      />
    </div>
  );
}
