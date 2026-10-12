import { HOME_MEDIA_SLOTS, getHomeBlobMedia, getHomeBlobVideos } from "@/app/lib/site-media";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { HOME_MEDIA_PRESENTATION } from "@/app/lib/site-media-presentation";
import { getMediaDocument, mediaUrl, type ManagedImage } from "@/app/lib/sanity";
import { mediaFileUrl, type ManagedFile } from "@/app/lib/sanity-file";
import { PhotoManager } from "./photo-manager";

type HomeMedia = Partial<Record<keyof typeof HOME_MEDIA_SLOTS, ManagedImage>> & Record<string, unknown>;

export const metadata = {
  title: "Gestione foto",
  robots: { index: false, follow: false },
};

export default async function PhotoManagerPage() {
  const authenticated = await isMediaAdminAuthenticated();
  const [media, videos, cmsMedia] = authenticated
    ? await Promise.all([getHomeBlobMedia(), getHomeBlobVideos(), getMediaDocument<HomeMedia>("homeMedia")])
    : [{}, {}, {}];

  const previews = Object.fromEntries(
    (Object.keys(HOME_MEDIA_SLOTS) as (keyof typeof HOME_MEDIA_SLOTS)[]).map((slot) => {
      const presentation = HOME_MEDIA_PRESENTATION[slot];
      const cmsImage = cmsMedia[slot] as ManagedImage | undefined;
      const cmsVideo = cmsMedia[`${slot}Video`] as ManagedFile | undefined;
      const blobVideo = videos[slot];
      const blobImage = media[slot];
      const sanityVideo = mediaFileUrl(cmsVideo);

      if (blobVideo) return [slot, { src: blobVideo, kind: "video" as const, source: "Vercel Blob" }];
      if (blobImage) return [slot, { src: blobImage, kind: "image" as const, source: "Vercel Blob" }];
      if (sanityVideo) return [slot, { src: sanityVideo, kind: "video" as const, source: "Sanity" }];
      return [slot, {
        src: mediaUrl(cmsImage, presentation.fallback),
        kind: "image" as const,
        source: cmsImage?.asset ? "Sanity" : "Immagine standard",
      }];
    }),
  ) as Record<keyof typeof HOME_MEDIA_SLOTS, { src: string; kind: "image" | "video"; source: string }>;

  return <PhotoManager authenticated={authenticated} slots={HOME_MEDIA_SLOTS} previews={previews} />;
}
