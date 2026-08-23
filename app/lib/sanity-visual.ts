import { createDataAttribute } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const studioUrl = "https://playa-luna-varcaturo-delta.vercel.app/studio";

export function sanityImageAttribute(
  documentId: string,
  documentType: string,
  path: string,
) {
  if (!projectId) return undefined;

  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
    id: documentId,
    type: documentType,
    path,
  }).toString();
}
