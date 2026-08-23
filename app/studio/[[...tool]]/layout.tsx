import type { Metadata } from "next";
import { preloadModule } from "react-dom";

const bridgeScript = "https://core.sanity-cdn.com/bridge.js";

export const metadata: Metadata = {
  title: "Playa Luna Manager",
  description: "Area riservata per gestire i contenuti del sito Playa Luna.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  preloadModule(bridgeScript, { as: "script" });

  return (
    <>
      <script src={bridgeScript} async type="module" />
      {children}
    </>
  );
}
