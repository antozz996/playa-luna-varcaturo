import type { MetadataRoute } from "next";
import { pathPairs } from "./lib/i18n";
import { siteUrl } from "./lib/site";

// Update when a page's content changes meaningfully.
const lastModified = new Date("2026-11-10");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1 },
    { path: "/beach-club", priority: 0.9 },
    { path: "/ristorante-sul-mare", priority: 0.9 },
    { path: "/menu-ristorante", priority: 0.7 },
    { path: "/piscina", priority: 0.8 },
    { path: "/eventi", priority: 0.9 },
    { path: "/wedding", priority: 0.9 },
    { path: "/contatti", priority: 0.8 },
  ];

  return routes.flatMap(({ path, priority }) => {
    const en = pathPairs[path as keyof typeof pathPairs];
    if (!en) return [{ url: `${siteUrl}${path}`, lastModified, priority }];
    // Paired pages: both URLs listed, each with the hreflang alternates.
    const alternates = { languages: { it: `${siteUrl}${path}`, en: `${siteUrl}${en}` } };
    return [
      { url: `${siteUrl}${path}`, lastModified, priority, alternates },
      { url: `${siteUrl}${en}`, lastModified, priority: Math.round(priority * 8) / 10, alternates },
    ];
  });
}
