import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./food-gallery-three.css";
import { AnalyticsConsent } from "./components/analytics-consent";

export const metadata: Metadata = {
  metadataBase: new URL("https://playaluna.it"),
  title: {
    default: "Playa Luna | Beach Club, Ristorante ed Eventi a Varcaturo",
    template: "%s | Playa Luna",
  },
  description:
    "Vivi Playa Luna a Marina di Varcaturo: spiaggia attrezzata, ristorante sul mare, piscina family ed eventi. Prenota la tua giornata.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: "Playa Luna",
    title: "Playa Luna | Tutto il mare in un giorno",
    description: "Beach club, cucina, piscina ed eventi a Marina di Varcaturo.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Playa Luna · Beach club, ristorante ed eventi a Marina di Varcaturo",
      },
    ],
  },
  // Only the card type: title, description and image fall back to each page's Open Graph tags.
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#27251f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <a className="skip-link" href="#main">Vai al contenuto</a>
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
