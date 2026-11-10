import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/site";

// Every crawler is allowed, AI assistants and training bots included (owner's choice, 2026-11-10).
// The AI user agents are listed explicitly so the decision is documented and survives default changes.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
