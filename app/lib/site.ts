import type { Metadata } from "next";

export const siteUrl = "https://playaluna.it";

/** Complete Open Graph block for a page (Next replaces, not merges, the parent's openGraph). */
export function pageOpenGraph(options: { path: string; title: string; description: string; image?: string }): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "it_IT",
    siteName: "Playa Luna",
    url: options.path,
    title: options.title,
    description: options.description,
    images: [{ url: options.image ?? "/og.jpg", width: 1200, height: 630, alt: options.title }],
  };
}

export const beachPhoneNumber = "+39 327 191 5427";
export const beachPhoneHref = "tel:+393271915427";
export const beachWhatsapp =
  "https://wa.me/393271915427?text=Ciao%20Playa%20Luna%2C%20vorrei%20prenotare%20una%20giornata%20al%20mare.";

export const poolWhatsapp =
  "https://wa.me/393271915427?text=Ciao%20Playa%20Luna%2C%20vorrei%20conoscere%20la%20disponibilita%20della%20piscina.";

export const restaurantPhoneNumber = "+39 392 405 3169";
export const restaurantPhoneHref = "tel:+393924053169";

export const eventPhoneNumber = "+39 350 590 8393";
export const eventPhoneHref = "tel:+393505908393";
export const eventWhatsapp =
  "https://wa.me/393505908393?text=Ciao%20Playa%20Luna%2C%20vorrei%20ricevere%20informazioni%20per%20un%20evento.";

export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Playa+Luna+Via+Marina+di+Varcaturo+42";

/**
 * Legal entity (titolare del trattamento / dati societari, art. 13 GDPR e art. 2250 c.c.).
 * Fill in every field: privacy page and footer show them automatically when complete.
 */
export const legalEntity = {
  name: "Lido Playaluna S.r.l.",
  vatNumber: "09146931218",
  registeredOffice: "Via Epitaffio 15, 80014 Giugliano in Campania (NA)",
  pec: "lidoplayaluna@pec.it",
  email: "info@playaluna.it",
};

export const hasLegalEntity = Boolean(legalEntity.name && legalEntity.vatNumber && legalEntity.registeredOffice);

export const address = {
  streetAddress: "Via Marina di Varcaturo, 42",
  postalCode: "80014",
  locality: "Giugliano in Campania",
  area: "Marina di Varcaturo",
  region: "NA",
  country: "IT",
};

/** Opening hours shown on the site and in structured data. Every day of the week. */
export const openingHours = {
  beachSeason: { label: "Lido", months: "maggio – settembre", from: "1 maggio", to: "30 settembre", opens: "08:00", closes: "19:00", validFrom: "05-01", validThrough: "09-30" },
  bar: { label: "Bar", months: "tutto l'anno", opens: "09:00", closes: "18:30" },
  restaurant: { label: "Ristorante (pranzo)", months: "tutto l'anno", opens: "12:30", closes: "16:00" },
  evening: "La sera la struttura è disponibile solo per eventi privati.",
};

/** Confirmed amenities (used in page copy, FAQ and structured data). */
export const amenities = {
  freeParking: true,
  petsAllowed: true,
  showersAndChangingRooms: true,
  wifi: true,
  wheelchairAccessible: true,
  lifeguard: true,
  /** The children's pool has a separate entrance fee. */
  poolSeparateFee: true,
};

export const mainNavigation = [
  { href: "/beach-club", label: "Spiaggia" },
  { href: "/ristorante-sul-mare", label: "Ristorante" },
  { href: "/piscina", label: "Piscina" },
  { href: "/eventi", label: "Eventi" },
  { href: "/wedding", label: "Wedding" },
  { href: "/contatti", label: "Contatti" },
];
