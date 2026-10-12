import { HOME_MEDIA_SLOTS, getHomeBlobMedia, getHomeBlobVideos } from "@/app/lib/site-media";
import { isMediaAdminAuthenticated } from "@/app/lib/media-admin";
import { PhotoManager } from "./photo-manager";

export const metadata = {
  title: "Gestione foto",
  robots: { index: false, follow: false },
};

export default async function PhotoManagerPage() {
  const authenticated = await isMediaAdminAuthenticated();
  const media = authenticated ? await getHomeBlobMedia() : {};
  const videos = authenticated ? await getHomeBlobVideos() : {};

  return <PhotoManager authenticated={authenticated} slots={HOME_MEDIA_SLOTS} media={media} videos={videos} />;
}
