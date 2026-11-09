import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/site";

// Update when a page's content changes meaningfully.
const lastModified = new Date("2026-11-09");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/beach-club", priority: 0.9 },
    { path: "/ristorante-sul-mare", priority: 0.9 },
    { path: "/menu-ristorante", priority: 0.7 },
    { path: "/piscina", priority: 0.8 },
    { path: "/eventi", priority: 0.9 },
    { path: "/wedding", priority: 0.9 },
    { path: "/contatti", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified,
    priority,
  }));
}
