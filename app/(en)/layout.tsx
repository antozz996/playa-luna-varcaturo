// Root layout for the English pages (/en/*): same styles and scripts as the Italian site, lang="en".
import type { Metadata, Viewport } from "next";
import "../globals.css";
import "../food-gallery-three.css";
import { AnalyticsConsent } from "@/app/components/analytics-consent";
import { WhatsappSource } from "@/app/components/whatsapp-source";
import { ui } from "@/app/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://playaluna.it"),
  title: {
    default: "Playa Luna | Beach club and seafood restaurant near Naples",
    template: "%s | Playa Luna",
  },
  description:
    "Playa Luna in Marina di Varcaturo, near Naples: beach club, seafood restaurant and private events, with Ischia and Procida across the sea.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["it_IT"],
    url: "/en",
    siteName: "Playa Luna",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Playa Luna · Beach club and restaurant in Marina di Varcaturo, Naples" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#27251f",
};

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">{ui.en.skipLink}</a>
        {children}
        <AnalyticsConsent locale="en" />
        <WhatsappSource />
      </body>
    </html>
  );
}
