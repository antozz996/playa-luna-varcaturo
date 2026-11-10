import type { Metadata } from "next";
import { ServicePage } from "@/app/components/service-page";
import { beachFaqsEn } from "@/app/lib/faqs";
import { languageAlternates } from "@/app/lib/i18n";
import { beachPhoneNumber, hoursLabel, openingHours, pageOpenGraph, seasonState } from "@/app/lib/site";

// Rebuild daily so the seasonal notice switches on its own.
export const revalidate = 86400;

const title = "Beach club in Marina di Varcaturo, near Naples";
const description =
  `Private beach with umbrellas and sunbeds, bar and family facilities at Playa Luna, Marina di Varcaturo near Naples. Open every day ${hoursLabel.lido} from May to September.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: languageAlternates("en", "/en/beach-club"),
  openGraph: pageOpenGraph({ path: "/en/beach-club", title: `${title} | Playa Luna`, description, locale: "en" }),
};

export default function BeachClubPageEn() {
  const season = openingHours.beachSeason;
  const hours = `${Number(season.opens.slice(0, 2))}am–${Number(season.closes.slice(0, 2)) - 12}pm`;
  return (
    <ServicePage
      locale="en"
      slug="beach-club"
      notice={seasonState(new Date(), "en").notice}
      facts={[
        { label: "Season", value: "1 May – 30 September" },
        { label: "Hours", value: `Every day ${hours}` },
        { label: "On the beach", value: "Umbrellas, sunbeds, showers, changing rooms, Wi-Fi, lifeguard" },
        { label: "Prices and availability", value: "Ask us on WhatsApp" },
        { label: "Parking", value: "Free" },
        { label: "Pets", value: "Welcome" },
      ]}
      eyebrow="Beach Club"
      heading="Beach club and private beach in Marina di Varcaturo"
      title="Your summer,"
      emphasis="facing Ischia and Procida."
      infoHeading={["The sea,", "at your own pace."]}
      ctaHeading={["Shall we save you", "an umbrella?"]}
      intro="A day on the Varcaturo coast, north of Naples, with a fully equipped beach, good facilities and the sea always in front of you."
      body={`Playa Luna is for people who want to enjoy the sea simply, without giving up comfort. Book your spot, stay for lunch and move between the beach and the rest of the venue. The beach is open every day from ${hours}, May to September.`}
      image="/images/playa-luna/beach-day.webp"
      imageAlt="The private beach of Playa Luna beach club in Varcaturo"
      heroObjectPosition="50% 55%"
      detailImage="/images/playa-luna/beachclub/detail-dsc00166.webp"
      detailAlt="Sea view from the Mediterranean spaces of Playa Luna"
      features={[
        "Private beach with umbrellas and sunbeds",
        "Lifeguard, showers, changing rooms and Wi-Fi",
        "Bar and restaurant for lunch",
        "Free parking, pets welcome, accessible venue",
      ]}
      faqs={beachFaqsEn}
      ctaLabel="Book your spot on WhatsApp"
      telephone={beachPhoneNumber}
      schemaType="Beach"
    />
  );
}
