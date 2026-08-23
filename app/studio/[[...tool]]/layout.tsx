import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playa Luna Manager",
  description: "Area riservata per gestire le fotografie del sito Playa Luna.",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
