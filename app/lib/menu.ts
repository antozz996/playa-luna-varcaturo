// Ristorante Playa Luna — menu 2026, transcribed from public/menus/Playa_Menu_ITA_2026_v11.pdf.
// When the PDF changes, update this file too (prices in euro; allergen numbers per Reg. UE 1169/2011).

export type MenuItem = {
  name: string;
  price?: number;
  /** Allergen numbers, see `allergens`. */
  allergens?: number[];
  /** Some ingredients may be frozen at source or blast-chilled in-house. */
  frozen?: boolean;
};

export type MenuSection = { id: string; title: string; items: MenuItem[] };

export const menuPdf = "/menus/Playa_Menu_ITA_2026_v11.pdf";

export const allergens: Record<number, string> = {
  1: "Glutine",
  2: "Crostacei",
  3: "Uova",
  4: "Pesce",
  5: "Arachidi e derivati",
  6: "Soia",
  7: "Latte e derivati",
  8: "Frutta a guscio",
  9: "Sedano",
  10: "Senape",
  11: "Sesamo",
  12: "Anidride solforosa",
  13: "Molluschi",
  14: "Lupini",
};

export const kitchen: MenuSection[] = [
  {
    id: "antipasti",
    title: "Antipasti",
    items: [
      { name: "Polpo all’insalata con crema di patate viola e olive taggiasche", price: 16, allergens: [13, 12], frozen: true },
      { name: "Tiramisù di baccalà cotto a bassa temperatura con mascarpone, patate e cacao", price: 13, allergens: [4, 3, 7], frozen: true },
      { name: "Osmosi di seppia cotta a bassa temperatura con carciofini", price: 15, allergens: [13], frozen: true },
      { name: "Gambero in tempura in pane panko (5 pz)", price: 15, allergens: [1, 2], frozen: true },
      { name: "Sashimi di ricciola con leche de tigre (5 pz)", price: 15, allergens: [4], frozen: true },
      { name: "Lupini alla brace con timo, rosmarino e citronette", price: 13, allergens: [13] },
      { name: "Caprese di bufala", price: 12, allergens: [7] },
      { name: "Fiori di zucca in tempura ripieni di ricotta e salame (3 pz)", price: 9, allergens: [1, 7, 3] },
      { name: "Parmigiana 2.0 al forno", price: 9, allergens: [7, 1, 3] },
    ],
  },
  {
    id: "primi",
    title: "Primi",
    items: [
      { name: "Linguina all’astice con pomodorini", price: 30, allergens: [1, 2, 12], frozen: true },
      { name: "Spaghetti alle vongole", price: 24, allergens: [1, 13, 12], frozen: true },
      { name: "Pasta e fagioli con cozze e ’nduja", price: 16, allergens: [1, 13], frozen: true },
      { name: "Raviolo ripieno di gamberi con salsa ai crostacei", price: 16, allergens: [1, 2, 3, 7], frozen: true },
      { name: "Tagliolini con seppia e fiori di zucca", price: 23, allergens: [1, 13, 7, 3], frozen: true },
      { name: "Tagliatelle all’Alfredo con gambero rosso", price: 23, allergens: [1, 2, 7, 3], frozen: true },
      { name: "Spaghetti alla Nerano", price: 16, allergens: [1, 7] },
      { name: "Fuori menu del giorno" },
    ],
  },
  {
    id: "secondi",
    title: "Secondi",
    items: [
      { name: "Calamaro e gambero alla griglia", price: 24, allergens: [2, 13], frozen: true },
      { name: "Polpo alla brace con rosmarino, timo, patate erborizzate e maionese giapponese", price: 20, allergens: [3, 13], frozen: true },
      { name: "Ricciola scottata con burro salato francese e porro arrostito", price: 23, allergens: [4, 7], frozen: true },
      { name: "Frittura di gamberi e calamari", price: 18, allergens: [1, 2, 13], frozen: true },
      { name: "Cubo di salmone su letto di patate e salsa di porro", price: 18, allergens: [4, 7], frozen: true },
      { name: "Manzetta prussiana con patate al forno", price: 24 },
      { name: "Fuori menu del giorno" },
    ],
  },
  {
    id: "contorni",
    title: "Contorni",
    items: [
      { name: "Insalatina di spinacini con pera e ricotta salata", price: 13, allergens: [7] },
      { name: "Insalata di carciofini baby con avocado e scaglie di grana", price: 13, allergens: [7] },
      { name: "Patata al forno", price: 7 },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    items: [
      { name: "Tiramisù", price: 7, allergens: [1, 3, 7] },
      { name: "Brownie con caramello salato e gelato alla vaniglia", price: 8, allergens: [1, 3, 7, 8] },
      { name: "Namelaka", price: 8, allergens: [7, 3] },
    ],
  },
  {
    id: "frutta",
    title: "Frutta",
    items: [
      { name: "Tagliata di frutta per 2 persone", price: 14 },
      { name: "Dessert frutta e gelato", price: 25, allergens: [7] },
    ],
  },
];

export const drinks: MenuSection[] = [
  {
    id: "vini-bianchi",
    title: "Vini bianchi",
    items: [
      { name: "Falanghina Ambra – Casa D’Ambra", price: 30 },
      { name: "Gewürztraminer – Elena Walch", price: 40 },
      { name: "Müller Thurgau – Elena Walch", price: 40 },
      { name: "Chardonnay – Jermann", price: 40 },
      { name: "Fiano di Avellino – Benito Ferrara", price: 50 },
      { name: "Greco di Tufo – Benito Ferrara", price: 50 },
      { name: "Furore Bianco – Cantine Marisa Cuomo", price: 60 },
      { name: "Les Sélections de Tracy – Pouilly-Fumé", price: 60 },
      { name: "Fiorduva – Cantine Marisa Cuomo", price: 80 },
    ],
  },
  {
    id: "vini-rossi-rosati",
    title: "Vini rossi e rosati",
    items: [
      { name: "Lirica – Primitivo di Manduria", price: 30 },
      { name: "Falerno del Massico – Fattoria Pagano", price: 35 },
      { name: "Minuty M Rosé – Château Minuty", price: 45 },
    ],
  },
  {
    id: "bollicine",
    title: "Bollicine",
    items: [
      { name: "Prosecco Naonis – La Delizia", price: 30 },
      { name: "Ferrari Brut Trentodoc", price: 40 },
      { name: "Berlucchi ’61 – Berlucchi", price: 50 },
      { name: "Bellavista Alma Gran Cuvée Brut", price: 60 },
      { name: "Ca’ del Bosco Cuvée Prestige", price: 80 },
      { name: "Ca’ del Bosco Cuvée Prestige Rosé", price: 100 },
      { name: "Moët & Chandon Brut Impérial", price: 120 },
      { name: "Moët Ice Impérial", price: 150 },
      { name: "Moët Ice Impérial Rosé", price: 180 },
      { name: "Ruinart Blanc de Blancs", price: 200 },
      { name: "Ruinart Rosé", price: 200 },
    ],
  },
  {
    id: "drinklist",
    title: "Drinklist",
    items: [
      { name: "Negroni e i suoi twist", price: 12 },
      { name: "Aperol Spritz", price: 10 },
      { name: "Campari Spritz", price: 10 },
      { name: "Hugo Spritz", price: 10 },
      { name: "Moscow Mule", price: 12 },
      { name: "Paloma", price: 12 },
      { name: "Tanqueray No. Ten", price: 12 },
      { name: "Gin Mare", price: 12 },
      { name: "Hendrick’s", price: 12 },
      { name: "Roku Gin", price: 15 },
      { name: "Moskovskaya", price: 12 },
      { name: "Belvedere", price: 12 },
    ],
  },
  {
    id: "distillati",
    title: "Distillati e amari",
    items: [
      { name: "Zacapa 23", price: 9 },
      { name: "Kraken Black Spiced", price: 6 },
      { name: "Diplomático Reserva Exclusiva", price: 7 },
      { name: "Hennessy V.S.O.P. Privilege", price: 8 },
      { name: "François Peyrot Selection", price: 6 },
      { name: "Unicum", price: 4 },
      { name: "Fernet Branca", price: 4 },
      { name: "Amaro Amara", price: 5 },
      { name: "Amaro Montenegro", price: 4 },
      { name: "Vecchio Amaro del Capo", price: 4 },
      { name: "Jefferson", price: 6 },
      { name: "Jägermeister", price: 4 },
      { name: "Grappa bianca", price: 4 },
      { name: "Grappa barricata", price: 4 },
    ],
  },
];

export const menuNotes = [
  "I nostri piatti possono contenere allergeni (Reg. UE 1169/2011, D.Lgs. 231/2017): in caso di allergie, intolleranze o dieta vegetariana informa il nostro personale prima di ordinare.",
  "Tutti i piatti potrebbero presentare tracce di sesamo o soia. Vini e bevande possono contenere solfiti.",
  "* Alcuni ingredienti potrebbero essere surgelati all’origine oppure acquistati freschi e abbattuti da noi, nel rispetto della normativa sanitaria.",
  "I prodotti della pesca serviti crudi sono stati abbattuti a −20 °C per almeno 24 ore, come previsto dalla normativa.",
  "Il servizio del 10% non è incluso.",
];

export function formatPrice(price?: number) {
  return price === undefined ? "—" : `${price.toFixed(2).replace(".", ",")} €`;
}
