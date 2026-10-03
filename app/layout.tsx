import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./food-gallery-three.css";
import { AnalyticsConsent } from "./components/analytics-consent";

export const metadata: Metadata = {
  title: "Lead OS",
  description: "Piattaforma interna multi-workspace per lead e integrazioni Meta.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#25221d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        {children}
        <AnalyticsConsent />
      </body>
    </html>
  );
}
