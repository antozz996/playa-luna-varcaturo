import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Third parties: Google Analytics (gtag) and Microsoft Clarity, loaded by analytics-consent.tsx.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "object-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

// Files in /public are not content-hashed: cache for a week, then revalidate.
// Rename a file (e.g. add a suffix) when replacing it to bust caches immediately.
const staticAssetCache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/images/:path*", headers: staticAssetCache },
      { source: "/videos/:path*", headers: staticAssetCache },
      { source: "/menus/:path*", headers: staticAssetCache },
      { source: "/:file*.svg", headers: staticAssetCache },
    ];
  },
  async redirects() {
    const legacyRoutes = [
      ["/beach", "/beach-club"],
      ["/lido", "/beach-club"],
      ["/fior-d-acqua-piscina-bambini-varcaturo", "/piscina"],
      ["/piscina-fior-d-acqua", "/piscina"],
      ["/menu-ristorante-playa-vecchio", "/ristorante-sul-mare"],
      ["/menu-ristorante-playa-v2", "/ristorante-sul-mare"],
      ["/ristorante", "/ristorante-sul-mare"],
      ["/eventi-privati", "/eventi"],
      ["/sala-eventi", "/eventi"],
      ["/en/event", "/eventi"],
      ["/en/menuplaya-ristorante", "/ristorante-sul-mare"],
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
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;
