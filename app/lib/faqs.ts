// FAQ content, built only from confirmed facts (site.ts). Rendered by <Faq> with FAQPage schema.
import {
  address,
  beachPhoneNumber,
  eventPhoneNumber,
  openingHours,
  restaurantPhoneNumber,
} from "./site";

export type FaqItem = { question: string; answer: string };

const h = openingHours;
const fullAddress = `${address.streetAddress}, ${address.postalCode} ${address.locality} (${address.region}), a ${address.area}`;

const hours: FaqItem = {
  question: "Quali sono gli orari di Playa Luna?",
  answer: `Siamo aperti tutti i giorni. Il bar è aperto dalle ${h.bar.opens} alle ${h.bar.closes} tutto l'anno e il pranzo si serve dalle ${h.restaurant.opens} alle ${h.restaurant.closes}. Da maggio a settembre il lido è aperto dalle ${h.beachSeason.opens} alle ${h.beachSeason.closes}. La sera la struttura è disponibile solo per eventi privati.`,
};

const where: FaqItem = {
  question: "Dove si trova Playa Luna?",
  answer: `Siamo in ${fullAddress}, sul litorale a nord di Napoli.`,
};

const parking: FaqItem = {
  question: "C'è un parcheggio?",
  answer: "Sì, il parcheggio è gratuito per i clienti.",
};

const pets: FaqItem = {
  question: "Si possono portare animali?",
  answer: "Sì, gli animali domestici sono ammessi.",
};

const accessibility: FaqItem = {
  question: "La struttura è accessibile alle persone con disabilità?",
  answer: "Sì, la struttura è accessibile alle persone con disabilità. Per esigenze particolari scrivici prima dell'arrivo e ci organizziamo.",
};

export const beachFaqs: FaqItem[] = [
  {
    question: "Come si prenota ombrellone e lettini?",
    answer: `Scrivici su WhatsApp o chiama il ${beachPhoneNumber} indicando data e numero di persone: ti confermiamo disponibilità e prezzo.`,
  },
  {
    question: "Quanto costa una giornata in spiaggia?",
    answer: "I prezzi cambiano in base al periodo, al giorno della settimana e alla postazione: chiedili su WhatsApp e ti rispondiamo con la tariffa aggiornata.",
  },
  {
    question: "Quando è aperto il lido?",
    answer: `Il lido è aperto tutti i giorni dalle ${h.beachSeason.opens} alle ${h.beachSeason.closes}, da maggio a settembre.`,
  },
  {
    question: "Quali servizi ci sono in spiaggia?",
    answer: "Ombrelloni e lettini, docce e spogliatoi, Wi-Fi, servizio di salvataggio con bagnino, bar e ristorante sul mare. La struttura è accessibile alle persone con disabilità.",
  },
  parking,
  pets,
];

export const poolFaqs: FaqItem[] = [
  {
    question: "La piscina è inclusa con l'ombrellone?",
    answer: "No, la piscina ha un ingresso separato. Scrivici su WhatsApp per disponibilità, tariffe e condizioni.",
  },
  {
    question: "A chi è dedicata la piscina?",
    answer: "È uno spazio pensato soprattutto per i bambini e per le famiglie, all'interno della struttura Playa Luna.",
  },
  {
    question: "Quali altri servizi ci sono?",
    answer: "Nella stessa struttura trovi la spiaggia attrezzata, il bar e il ristorante, docce e spogliatoi, Wi-Fi e il parcheggio gratuito.",
  },
  accessibility,
];

export const restaurantFaqs: FaqItem[] = [
  {
    question: "Quando è aperto il ristorante?",
    answer: `Il pranzo si serve tutti i giorni dalle ${h.restaurant.opens} alle ${h.restaurant.closes}, tutto l'anno. Il bar è aperto tutti i giorni dalle ${h.bar.opens} alle ${h.bar.closes}, dalla colazione all'aperitivo. La sera il ristorante apre solo per eventi privati.`,
  },
  {
    question: "Come si prenota un tavolo?",
    answer: `Scrivici su WhatsApp o chiama il ristorante al ${restaurantPhoneNumber}, indicando data, orario e numero di persone.`,
  },
  {
    question: "Dove posso vedere il menu?",
    answer: "Il menu completo con prezzi e allergeni è nella pagina Menu del sito, ed è anche scaricabile in PDF.",
  },
  {
    question: "Ci sono opzioni per chi ha allergie o intolleranze?",
    answer: "Nel menu sono indicati gli allergeni di ogni piatto. In caso di allergie, intolleranze o dieta vegetariana avvisa il personale prima di ordinare.",
  },
  {
    question: "Il servizio è incluso nei prezzi?",
    answer: "No, il servizio del 10% non è incluso.",
  },
  parking,
];

export const eventFaqs: FaqItem[] = [
  {
    question: "Che tipo di eventi organizzate?",
    answer: "Diciottesimi, compleanni, lauree, feste private, cerimonie, matrimoni ed eventi aziendali.",
  },
  {
    question: "Si possono organizzare eventi di sera?",
    answer: "Sì: la sera la struttura è riservata proprio agli eventi privati.",
  },
  {
    question: "Come si richiede un preventivo?",
    answer: `Scrivici su WhatsApp o chiama il ${eventPhoneNumber} indicando data, numero di ospiti e tipo di occasione.`,
  },
  parking,
  accessibility,
];

export const contactFaqs: FaqItem[] = [hours, where, parking, pets, accessibility];
