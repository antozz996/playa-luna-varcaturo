import type { Metadata } from "next";
import "./leads-os.css";

export const metadata: Metadata = {
  title: "Leads OS",
  description: "Dashboard commerciale interna Playa Luna",
  robots: { index: false, follow: false },
};

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
