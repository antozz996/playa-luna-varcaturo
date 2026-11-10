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

/**
 * WhatsApp link with a pre-filled message. Messages carry empty fields to fill in, so the
 * staff gets date and party size in the first message. A source code (e.g. "[IG]") is
 * appended on click by components/whatsapp-source.tsx.
 */
function whatsapp(number: string, lines: string[]) {
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export const beachPhoneNumber = "+39 327 191 5427";
export const beachPhoneHref = "tel:+393271915427";
export const beachWhatsapp = whatsapp("393271915427", [
  "Ciao Playa Luna, vorrei prenotare in spiaggia.",
  "Data: ",
  "Persone: ",
  "Ombrellone o lettini: ",
]);

export const poolWhatsapp = whatsapp("393271915427", [
  "Ciao Playa Luna, vorrei informazioni sulla piscina per bambini.",
  "Data: ",
  "Adulti e bambini: ",
]);

export const restaurantPhoneNumber = "+39 392 405 3169";
export const restaurantPhoneHref = "tel:+393924053169";
export const restaurantWhatsapp = whatsapp("393924053169", [
  "Ciao Playa Luna, vorrei prenotare un tavolo a pranzo.",
  "Data: ",
  "Orario: ",
  "Persone: ",
]);

export const eventPhoneNumber = "+39 350 590 8393";
export const eventPhoneHref = "tel:+393505908393";
export const eventWhatsapp = whatsapp("393505908393", [
  "Ciao Playa Luna, vorrei informazioni per un evento.",
  "Tipo di evento: ",
  "Data o periodo: ",
  "Ospiti: ",
]);
export const weddingWhatsapp = whatsapp("393505908393", [
  "Ciao Playa Luna, stiamo organizzando il nostro matrimonio.",
  "Data o periodo: ",
  "Invitati: ",
  "Budget indicativo: ",
]);

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

/**
 * Site seasons (Europe/Rome dates):
 * - summer: from 15 April to 30 September the site promotes the beach (bookings for May open early);
 * - lidoOpen: the beach is actually open from 1 May to 30 September.
 * Pages using this must revalidate daily so the switch happens on its own.
 */
export function seasonState(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome", month: "numeric", day: "numeric" }).formatToParts(now);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  const lidoOpen = month >= 5 && month <= 9;
  const summer = lidoOpen || (month === 4 && day >= 15);
  const notice = lidoOpen
    ? undefined
    : summer
      ? "Il lido apre il 1° maggio · Prenota già ora il tuo posto"
      : "Il lido riapre a maggio · Bar e ristorante aperti tutti i giorni";
  return { summer, lidoOpen, notice };
}

/** Confirmed facts for weddings and private events (pages, FAQ and structured data). */
export const eventFacts = {
  maxGuestsSeated: 250,
  spaces: ["Spiaggia", "Terrazza con pergola sul mare", "Sala interna", "Area piscina"],
  ceremony: "Rito civile e simbolico in struttura",
  partyUntil: "01:00",
  rainPlan: "Piano B al coperto nella sala interna",
  catering: "Cucina interna, menu costruiti con voi",
  exclusive: "Un solo evento per sera: la location è tutta vostra",
  period: "Tutto l'anno",
  music: "DJ e musica dal vivo",
  styling: "Allestimenti floreali e mise en place curati da noi",
  partners: "Rete di partner: fotografi, video maker, fioristi, fuochisti, angoli profumo, tattoo e bracciale infinito, collaborazioni con grandi brand",
  parking: "Parcheggio gratuito per gli ospiti",
};

/** Children's pool: outdoor, open with the lido, separate entrance fee. */
export const poolFacts = {
  type: "Piscina all'aperto per bambini",
  season: "1 maggio – 30 settembre",
  hours: "Tutti i giorni 8–19, con il lido",
  entrance: "Ingresso separato dalla spiaggia",
};

/** The island on the horizon. */
export const islandOnHorizon = "Ischia";

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
