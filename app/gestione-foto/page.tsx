import { HOME_MEDIA_SLOTS, getHomeBlobMedia, getHomeBlobVideos, homeMediaVideoPath } from "@/app/lib/site-media";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { HOME_MEDIA_PRESENTATION } from "@/app/lib/site-media-presentation";
import { getMediaDocument, mediaUrl, type ManagedImage } from "@/app/lib/sanity";
import { mediaFileUrl, type ManagedFile } from "@/app/lib/sanity-file";
import { SITE_MEDIA_PAGES, getPageBlobMedia, getPageBlobVideos, siteMediaPath, type SiteMediaPage } from "@/app/lib/site-media-pages";
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

  const extraPages = authenticated ? await Promise.all(
    (Object.keys(SITE_MEDIA_PAGES) as SiteMediaPage[]).map(async (id) => {
      const config = SITE_MEDIA_PAGES[id];
      const [blobImages, blobVideos, document] = await Promise.all([
        getPageBlobMedia(id), getPageBlobVideos(id), getMediaDocument<Record<string, unknown>>(config.documentType),
      ]);
      const cards = Object.entries(config.slots).map(([slot, item]) => {
        const image = document[slot] as ManagedImage | undefined;
        const video = mediaFileUrl(document[`${slot}Video`] as ManagedFile | undefined);
        const blobVideo = blobVideos[slot];
        const blobImage = blobImages[slot];
        const active = blobVideo
          ? { src: blobVideo, kind: "video" as const, source: "Vercel Blob" }
          : blobImage
            ? { src: blobImage, kind: "image" as const, source: "Vercel Blob" }
            : video
              ? { src: video, kind: "video" as const, source: "Sanity" }
              : { src: mediaUrl(image, item.fallback), kind: "image" as const, source: image?.asset ? "Sanity" : "Immagine standard" };
        return { id: slot, label: item.label, location: item.location, videoPath: siteMediaPath(id, slot, "video"), ...active };
      });
      return { id, title: config.title, href: config.href, cards };
    }),
  ) : [];

  const sections = [{
    id: "home", title: "Home", href: "/", cards: (Object.entries(HOME_MEDIA_SLOTS) as [keyof typeof HOME_MEDIA_SLOTS, (typeof HOME_MEDIA_SLOTS)[keyof typeof HOME_MEDIA_SLOTS]][]).map(([id, item]) => ({
      id, label: item.label, location: HOME_MEDIA_PRESENTATION[id].location, area: `${HOME_MEDIA_PRESENTATION[id].area} · ${HOME_MEDIA_PRESENTATION[id].format}`, videoPath: homeMediaVideoPath(id), ...previews[id],
    })),
  }, ...extraPages.map((page) => ({ ...page, cards: page.cards.map((card) => ({ ...card, area: page.title })) }))];

  return <PhotoManager authenticated={authenticated} sections={sections} />;
}
