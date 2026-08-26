import { createClient } from "next-sanity";
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import type { NextRequest } from "next/server";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

export async function GET(request: NextRequest) {
  if (!projectId) {
    return Response.json(
      {
        ok: false,
        error: "Sanity projectId is not configured for this deployment environment",
      },
      { status: 503 },
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-08-23",
    useCdn: false,
  }).withConfig({ token });

  const { GET: enableDraftMode } = defineEnableDraftMode({ client });
  return enableDraftMode(request);
}
