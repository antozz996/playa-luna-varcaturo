import type { Metadata } from "next";
import { MenuView } from "@/app/components/menu-view";
import { languageAlternates } from "@/app/lib/i18n";
import { hoursLabel, pageOpenGraph } from "@/app/lib/site";

const title = "Restaurant menu";
const description =
  `The 2026 menu of Playa Luna restaurant in Marina di Varcaturo, near Naples: seafood starters, pasta, fish mains, desserts, wines and drinks, with prices and allergens. Lunch every day ${hoursLabel.lunch}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("en", "/en/menu"),
  openGraph: pageOpenGraph({ path: "/en/menu", title: `${title} | Playa Luna`, description, locale: "en" }),
};

export default function RestaurantMenuPageEn() {
  return <MenuView locale="en" />;
}
