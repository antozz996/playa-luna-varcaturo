import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const legacyRoutes = [
      ["/beach", "/beach-club"],
      ["/lido", "/beach-club"],
      ["/fior-d-acqua-piscina-bambini-varcaturo", "/piscina"],
      ["/piscina-fior-d-acqua", "/piscina"],
      ["/menu-ristorante", "/ristorante-sul-mare"],
      ["/menu-ristorante-playa-vecchio", "/ristorante-sul-mare"],
      ["/menu-ristorante-playa-v2", "/ristorante-sul-mare"],
      ["/ristorante", "/ristorante-sul-mare"],
      ["/eventi-privati", "/eventi"],
      ["/matrimoni", "/wedding"],
      ["/contatti-playa-luna", "/contatti"],
      ["/privacy-policy", "/privacy"],
    ];

    return legacyRoutes.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `${source}/`, destination, permanent: true },
    ]);
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
