// /llms.txt — plain-text summary for AI assistants, generated from the same data as the site.
import {
  address,
  amenities,
  beachPhoneNumber,
  eventFacts,
  eventPhoneNumber,
  hoursLabel,
  islandOnHorizon,
  legalEntity,
  poolFacts,
  restaurantPhoneNumber,
  siteUrl,
} from "../lib/site";

export const dynamic = "force-static";

export function GET() {
  const services = [
    amenities.freeParking && "parcheggio gratuito",
    amenities.petsAllowed && "animali ammessi",
    amenities.showersAndChangingRooms && "docce e spogliatoi",
    amenities.wifi && "Wi-Fi",
    amenities.wheelchairAccessible && "struttura accessibile alle persone con disabilità",
    amenities.lifeguard && "bagnino",
  ].filter(Boolean);

  const text = `# Playa Luna

> Beach club, ristorante sul mare, piscina per bambini, eventi privati e matrimoni a ${address.area}, ${address.locality} (Napoli), con ${islandOnHorizon} di fronte.

Indirizzo: ${address.streetAddress}, ${address.postalCode} ${address.locality} (${address.region}), Italia.
Società: ${legalEntity.name}, P.IVA ${legalEntity.vatNumber}.

## Orari (tutti i giorni)
- Lido: ${hoursLabel.lido}, dal 1 maggio al 30 settembre.
- Bar: ${hoursLabel.barSummer} da maggio a settembre, ${hoursLabel.barWinter} da ottobre ad aprile.
- Ristorante: pranzo ${hoursLabel.lunch}, tutto l'anno.
- La sera la struttura apre solo per eventi privati.

## Prenotazioni
- Spiaggia e piscina: WhatsApp o telefono ${beachPhoneNumber}.
- Ristorante: WhatsApp o telefono ${restaurantPhoneNumber}.
- Eventi e matrimoni: WhatsApp o telefono ${eventPhoneNumber}.
- I prezzi non sono pubblicati: si chiedono su WhatsApp.

## Servizi
- ${services.join(", ")}.
- ${poolFacts.type}, ${poolFacts.season}, ${poolFacts.entrance.toLowerCase()}.

## Eventi e matrimoni
- Fino a ${eventFacts.maxGuestsSeated} ospiti con cena seduta; spazi: ${eventFacts.spaces.join(", ").toLowerCase()}.
- ${eventFacts.ceremony}; festa fino all'1:00; ${eventFacts.rainPlan.toLowerCase()}.
- ${eventFacts.catering}; un solo evento per sera; ${eventFacts.period.toLowerCase()}.

## Pagine
- [Spiaggia](${siteUrl}/beach-club): lido, servizi e FAQ.
- [Ristorante](${siteUrl}/ristorante-sul-mare): cucina di mare e FAQ.
- [Menu](${siteUrl}/menu-ristorante): menu completo con prezzi e allergeni.
- [Piscina](${siteUrl}/piscina): piscina per bambini e FAQ.
- [Eventi](${siteUrl}/eventi): feste private, aziendali e FAQ.
- [Matrimoni](${siteUrl}/wedding): ricevimenti, rito civile e simbolico, FAQ.
- [Contatti](${siteUrl}/contatti): orari, telefoni e indicazioni.
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
