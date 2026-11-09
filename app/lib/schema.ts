import {
  address,
  beachPhoneNumber,
  eventPhoneNumber,
  mapsUrl,
  openingHours,
  restaurantPhoneNumber,
  siteUrl,
} from "./site";

/** Stable identifier of the main business entity, referenced by every page. */
export const businessId = `${siteUrl}/#business`;

export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: address.streetAddress,
  postalCode: address.postalCode,
  addressLocality: address.locality,
  addressRegion: address.region,
  addressCountry: address.country,
};

const everyDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const year = new Date().getFullYear();

function seasonal(opens: string, closes: string, validFrom: string, validThrough: string, crossesYear = false) {
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: everyDay,
    opens,
    closes,
    validFrom: `${year}-${validFrom}`,
    validThrough: `${crossesYear ? year + 1 : year}-${validThrough}`,
  };
}

export const businessOpeningHours = [
  seasonal(openingHours.beachSeason.opens, openingHours.beachSeason.closes, openingHours.beachSeason.validFrom, openingHours.beachSeason.validThrough),
  seasonal(openingHours.offSeason.opens, openingHours.offSeason.closes, openingHours.offSeason.validFrom, openingHours.offSeason.validThrough, true),
];

export const restaurantOpeningHours = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: everyDay, opens: openingHours.restaurant.opens, closes: openingHours.restaurant.closes },
];

/** The main entity: one business, described once, with @id. */
export function businessSchema(image: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Restaurant"],
    "@id": businessId,
    name: "Playa Luna",
    description: "Beach club, ristorante sul mare, piscina ed eventi a Marina di Varcaturo.",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/playaluna-logo.svg`,
    image,
    telephone: beachPhoneNumber,
    priceRange: "€€",
    address: postalAddress,
    hasMap: mapsUrl,
    areaServed: ["Varcaturo", "Giugliano in Campania", "Pozzuoli", "Napoli"],
    servesCuisine: ["Mediterranea", "Pesce"],
    hasMenu: `${siteUrl}/menu-ristorante`,
    acceptsReservations: true,
    openingHoursSpecification: businessOpeningHours,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "Beach Club", telephone: beachPhoneNumber, availableLanguage: "it" },
      { "@type": "ContactPoint", contactType: "Ristorante", telephone: restaurantPhoneNumber, availableLanguage: "it" },
      { "@type": "ContactPoint", contactType: "Eventi", telephone: eventPhoneNumber, availableLanguage: "it" },
    ],
    sameAs: [
      "https://www.instagram.com/lidoplayaluna/",
      "https://www.facebook.com/Complesso.Playa.Luna/",
    ],
  };
}

/** A department page (beach, pool, events…) as part of the main business. */
export function departmentSchema(options: {
  type: string;
  name: string;
  path: string;
  image: string;
  telephone?: string;
  extra?: Record<string, unknown>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": options.type,
    "@id": `${siteUrl}${options.path}#place`,
    name: options.name,
    url: `${siteUrl}${options.path}`,
    image: options.image,
    telephone: options.telephone,
    address: postalAddress,
    parentOrganization: { "@id": businessId },
    ...options.extra,
  };
}

/** One event venue entity shared by /eventi and /wedding (same @id, no duplicates). */
export function eventVenueSchema(image: string) {
  return departmentSchema({
    type: "EventVenue",
    name: "Playa Luna · Eventi e matrimoni sul mare",
    path: "/eventi",
    image,
    telephone: eventPhoneNumber,
    extra: {
      description: "Feste private, diciottesimi, eventi aziendali e ricevimenti di matrimonio sul mare a Marina di Varcaturo.",
      subjectOf: [`${siteUrl}/eventi`, `${siteUrl}/wedding`],
    },
  });
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path || "/"}`,
    })),
  };
}

/** Serialize JSON-LD safely for a <script> tag (escapes "<" to prevent breaking out). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
