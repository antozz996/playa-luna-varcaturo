import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
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
  keywords: [
    "lido Varcaturo",
    "beach club Napoli",
    "ristorante sul mare Varcaturo",
    "eventi sul mare Napoli",
    "Playa Luna",
  ],
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
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Playa Luna · Beach Club, Restaurant, Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Playa Luna | Tutto il mare in un giorno",
    description: "Beach club, cucina, piscina ed eventi a Marina di Varcaturo.",
    images: ["/og.png"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="it">
      <body>
        {children}
        <AnalyticsConsent />
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
