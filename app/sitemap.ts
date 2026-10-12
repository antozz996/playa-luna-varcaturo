import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "beach-club", priority: 0.9 },
    { path: "ristorante-sul-mare", priority: 0.9 },
    { path: "piscina", priority: 0.8 },
    { path: "eventi", priority: 0.9 },
    { path: "wedding", priority: 0.9 },
    { path: "contatti", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: path ? `https://playaluna.it/${path}` : "https://playaluna.it/",
    changeFrequency: "weekly" as const,
    priority,
  }));
}
