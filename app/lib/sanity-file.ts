import "server-only";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || "";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || "production";

export type ManagedFile = {
  asset?: {
    _ref?: string;
  };
};

export function mediaFileUrl(file: ManagedFile | undefined) {
  const ref = file?.asset?._ref;
  if (!ref || !projectId) return undefined;

  const match = ref.match(/^file-([^-]+)-([a-zA-Z0-9]+)$/);
  if (!match) return undefined;

  const [, assetId, extension] = match;
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.${extension}`;
}
