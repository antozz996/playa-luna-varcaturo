import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { whatsappLinks, type Locale } from "../lib/i18n";
import {
  allergens,
  allergensEn,
  drinks,
  formatPrice,
  kitchen,
  menuNotes,
  menuNotesEn,
  menuPdf,
  translateSections,
  type MenuSection,
} from "../lib/menu";
import { breadcrumbSchema, businessId, jsonLd } from "../lib/schema";
import { openingHours, restaurantPhoneHref, restaurantPhoneNumber, siteUrl } from "../lib/site";
import styles from "./menu.module.css";

const copy = {
  it: {
    path: "/menu-ristorante",
    home: "/",
    restaurantPath: "/ristorante-sul-mare",
    breadcrumb: "Percorso",
    restaurant: "Ristorante",
    heading: "Menu del ristorante Playa Luna a Varcaturo",
    title: ["Il nostro", "menu."],
    lead: (wa: string) => (
      <>
        Cucina di mare e piatti mediterranei, a pranzo tutti i giorni dalle {openingHours.restaurant.opens} alle{" "}
        {openingHours.restaurant.closes}. Per prenotare un tavolo{" "}
        <a href={wa} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant_menu">scrivici su WhatsApp</a> o chiama il{" "}
        <a href={restaurantPhoneHref} data-event="phone_restaurant_menu">{restaurantPhoneNumber}</a>.
      </>
    ),
    openPdf: "Apri il PDF",
    downloadPdf: "Scarica il menu",
    sectionsNav: "Sezioni del menu",
    kitchen: "Cucina",
    drinks: "Vini, bollicine e drink",
    notesTitle: "Allergeni e servizio",
    allergensLabel: "Allergeni",
    frozen: " (può contenere ingredienti surgelati o abbattuti)",
    schemaName: "Menu del ristorante Playa Luna 2026",
    allergens,
    notes: menuNotes,
  },
  en: {
    path: "/en/menu",
    home: "/en",
    restaurantPath: "/en/restaurant",
    breadcrumb: "Breadcrumb",
    restaurant: "Restaurant",
    heading: "Playa Luna restaurant menu, Marina di Varcaturo",
    title: ["Our", "menu."],
    lead: (wa: string) => (
      <>
        Seafood and Mediterranean dishes, served for lunch every day from {openingHours.restaurant.opens} to{" "}
        {openingHours.restaurant.closes}. To book a table{" "}
        <a href={wa} target="_blank" rel="noreferrer" data-event="whatsapp_restaurant_menu">message us on WhatsApp</a> or call{" "}
        <a href={restaurantPhoneHref} data-event="phone_restaurant_menu">{restaurantPhoneNumber}</a>.
      </>
    ),
    openPdf: "Open the PDF (Italian)",
    downloadPdf: "Download the menu (Italian)",
    sectionsNav: "Menu sections",
    kitchen: "Food",
    drinks: "Wines, sparkling wines and drinks",
    notesTitle: "Allergens and service",
    allergensLabel: "Allergens",
    frozen: " (may contain frozen or blast-chilled ingredients)",
    schemaName: "Playa Luna restaurant menu 2026",
    allergens: allergensEn,
    notes: menuNotesEn,
  },
};

export function MenuView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const kitchenSections = locale === "en" ? translateSections(kitchen) : kitchen;
  const drinkSections = locale === "en" ? translateSections(drinks) : drinks;
  const all = [...kitchenSections, ...drinkSections];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${siteUrl}${c.path}#menu`,
    name: c.schemaName,
    inLanguage: locale,
    url: `${siteUrl}${c.path}`,
    mainEntityOfPage: `${siteUrl}${c.path}`,
    provider: { "@id": businessId },
    hasMenuSection: all.map((section) => ({
      "@type": "MenuSection",
      name: section.title,
      hasMenuItem: section.items
        .filter((item) => item.price !== undefined)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          offers: { "@type": "Offer", price: item.price!.toFixed(2), priceCurrency: "EUR" },
        })),
    })),
  };

  const Section = ({ section }: { section: MenuSection }) => (
    <section className={styles.section} id={section.id} aria-labelledby={`${section.id}-title`}>
      <h3 id={`${section.id}-title`}>{section.title}</h3>
      <ul>
        {section.items.map((item) => (
          <li key={item.name}>
            <span className={styles.name}>
              {item.name}
              {item.frozen ? <span aria-label={c.frozen}>*</span> : null}
              {item.allergens?.length ? (
                <small className={styles.allergens}>
                  {`${c.allergensLabel}: ${item.allergens.map((n) => c.allergens[n]).join(", ")}`}
                </small>
              ) : null}
            </span>
            <span className={styles.price}>{formatPrice(item.price, locale)}</span>
          </li>
        ))}
      </ul>
    </section>
  );

  return (
    <div className={`page-shell ${styles.page}`}>
      <SiteHeader locale={locale} path={c.path} />
      <main id="main">
      <section className={styles.menu} aria-labelledby="menu-title">
        <div className="shell">
          <nav className="breadcrumbs" aria-label={c.breadcrumb}>
            <Link href={c.home}>Home</Link><span>/</span>
            <Link href={c.restaurantPath}>{c.restaurant}</Link><span>/</span><span>Menu</span>
          </nav>
          <h1 id="menu-title" className="eyebrow">{c.heading}</h1>
          <p className={`display-title ${styles.title}`}>{c.title[0]} <em>{c.title[1]}</em></p>
          <p className={styles.lead}>{c.lead(whatsappLinks[locale].restaurant)}</p>
          <div className={styles.actions}>
            <a className="pill-button dark" href={menuPdf} target="_blank" rel="noopener noreferrer" data-event="menu_pdf_open" hrefLang="it">
              {c.openPdf} <span aria-hidden="true">↗</span>
            </a>
            <a className="pill-button dark" href={menuPdf} download data-event="menu_pdf_download" hrefLang="it">
              {c.downloadPdf} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <nav className={styles.index} aria-label={c.sectionsNav}>
            {all.map((section) => (
              <a key={section.id} href={`#${section.id}`}>{section.title}</a>
            ))}
          </nav>

          <h2 className={styles.group}>{c.kitchen}</h2>
          <div className={styles.grid}>
            {kitchenSections.map((section) => <Section key={section.id} section={section} />)}
          </div>

          <h2 className={styles.group}>{c.drinks}</h2>
          <div className={styles.grid}>
            {drinkSections.map((section) => <Section key={section.id} section={section} />)}
          </div>

          <aside className={styles.notes} aria-labelledby="menu-notes-title">
            <h2 id="menu-notes-title">{c.notesTitle}</h2>
            <ul>
              {c.notes.map((note) => <li key={note}>{note}</li>)}
            </ul>
          </aside>
        </div>
      </section>
      </main>
      <SiteFooter locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          schema,
          breadcrumbSchema([
            { name: "Home", path: c.home },
            { name: c.restaurant, path: c.restaurantPath },
            { name: "Menu", path: c.path },
          ]),
        ])}
      />
    </div>
  );
}
