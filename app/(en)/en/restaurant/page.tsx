import type { Metadata } from "next";
import { ServicePage } from "@/app/components/service-page";
import { restaurantFaqsEn } from "@/app/lib/faqs";
import { languageAlternates, whatsappLinks } from "@/app/lib/i18n";
import { restaurantOpeningHours } from "@/app/lib/schema";
import { hoursLabel, openingHours, pageOpenGraph, restaurantPhoneHref, restaurantPhoneNumber, siteUrl } from "@/app/lib/site";

const title = "Seafood restaurant on the beach near Naples";
const description =
  `Mediterranean cooking and seafood at Playa Luna restaurant in Marina di Varcaturo, near Naples. Lunch every day ${hoursLabel.lunch}, all year round. Book a table.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("en", "/en/restaurant"),
  openGraph: pageOpenGraph({ path: "/en/restaurant", title: `${title} | Playa Luna`, description, locale: "en" }),
};

export default function RestaurantPageEn() {
  return (
    <ServicePage
      locale="en"
      slug="restaurant"
      eyebrow="Restaurant"
      heading="Seafood restaurant on the beach in Marina di Varcaturo"
      title="The taste"
      emphasis="of the sea."
      intro={`Amberjack sashimi, grilled octopus, lobster linguine, spaghetti with clams: seafood for lunch every day, from ${openingHours.restaurant.opens} to ${openingHours.restaurant.closes}, all year round.`}
      body="Our food follows the rhythm of the beach, from breakfast and aperitivo at the bar to lunch in the dining room. The sea is the common thread, together with Mediterranean ingredients, carefully made dishes and a relaxed setting with attention to detail. In the evening the venue opens for private events only."
      image="/images/playa-luna/restaurant/hero-2f8a7552.webp"
      imageAlt="The bright dining room of Playa Luna restaurant during service"
      heroObjectPosition="50% 35%"
      detailImage="/images/playa-luna/restaurant/detail-carpaccio.webp"
      detailAlt="Gourmet carpaccio served at Playa Luna restaurant in Varcaturo"
      features={[
        `Lunch every day, ${hoursLabel.lunch}`,
        "Mediterranean cooking and seafood",
        "Breakfast, bar and aperitivo",
        "Dinners for private events only",
      ]}
      infoHeading={["Lunch,", "with a sea view."]}
      ctaHeading={["Shall we save you", "a table?"]}
      menuHref="/en/menu"
      faqs={restaurantFaqsEn}
      ctaLabel="Book on WhatsApp"
      floatLabel="Book a table"
      ctaHref={whatsappLinks.en.restaurant}
      ctaEvent="whatsapp_restaurant"
      secondaryCta={{ href: restaurantPhoneHref, label: `Call ${restaurantPhoneNumber}`, event: "phone_restaurant" }}
      telephone={restaurantPhoneNumber}
      schemaType="Restaurant"
      schemaExtra={{
        servesCuisine: ["Mediterranean", "Seafood"],
        hasMenu: `${siteUrl}/en/menu`,
        acceptsReservations: true,
        openingHoursSpecification: restaurantOpeningHours,
      }}
    />
  );
}
