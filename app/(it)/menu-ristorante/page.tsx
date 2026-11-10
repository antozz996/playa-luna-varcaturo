import type { Metadata } from "next";
import { MenuView } from "@/app/components/menu-view";
import { languageAlternates } from "@/app/lib/i18n";
import { hoursLabel, pageOpenGraph } from "@/app/lib/site";

const title = "Menu del ristorante sul mare";
const description =
  `Il menu 2026 del ristorante Playa Luna a Marina di Varcaturo: antipasti di mare, primi, secondi di pesce, dessert, vini e drink, con prezzi e allergeni. Pranzo tutti i giorni ${hoursLabel.lunch}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("it", "/menu-ristorante"),
  openGraph: pageOpenGraph({ path: "/menu-ristorante", title: `${title} | Playa Luna`, description }),
};

export default function RestaurantMenuPage() {
  return <MenuView locale="it" />;
}
