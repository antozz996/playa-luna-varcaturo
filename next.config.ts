import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy WordPress URLs kept in Google Search Console. These must stay as
      // permanent redirects so that historical authority is passed to the new
      // information architecture instead of ending in a 404.
      { source: "/beach/", destination: "/beach-club/", permanent: true },
      { source: "/lido/", destination: "/beach-club/", permanent: true },
      {
        source: "/fior-d-acqua-piscina-bambini-varcaturo/",
        destination: "/piscina/",
        permanent: true,
      },
      { source: "/piscina-fior-d-acqua/", destination: "/piscina/", permanent: true },
      { source: "/menu-ristorante/", destination: "/ristorante-sul-mare/", permanent: true },
      {
        source: "/menu-ristorante-playa-vecchio/",
        destination: "/ristorante-sul-mare/",
        permanent: true,
      },
      {
        source: "/menu-ristorante-playa-v2/",
        destination: "/ristorante-sul-mare/",
        permanent: true,
      },
      { source: "/ristorante/", destination: "/ristorante-sul-mare/", permanent: true },
      { source: "/eventi-privati/", destination: "/eventi/", permanent: true },
      { source: "/matrimoni/", destination: "/wedding/", permanent: true },
      { source: "/contatti-playa-luna/", destination: "/contatti/", permanent: true },
    ];
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
