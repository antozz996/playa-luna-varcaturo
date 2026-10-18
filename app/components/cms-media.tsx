import Image from "next/image";
import { ExperienceVideo } from "./experience-video";
import {
  mediaAlt,
  mediaObjectPosition,
  mediaUrl,
  type ManagedImage,
} from "../lib/sanity";
import {
  mediaFileObjectPosition,
  mediaFileUrl,
  type ManagedFile,
} from "../lib/sanity-file";

type CmsMediaProps = {
  image?: ManagedImage;
  video?: ManagedFile;
  fallback: string;
  altFallback: string;
  sizes: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  imagePositionFallback?: string;
  dataSanity?: string;
  videoZIndex?: number;
  srcOverride?: string;
  videoOverride?: string;
  localImage?: string;
  localVideo?: string;
};

export function CmsMedia({
  image,
  video,
  fallback,
  altFallback,
  sizes,
  width = 960,
  height = 1200,
  fill = false,
  priority = false,
  className,
  imagePositionFallback = "50% 50%",
  dataSanity,
  videoZIndex,
  srcOverride,
  videoOverride,
  localImage,
  localVideo,
}: CmsMediaProps) {
  const videoUrl = localVideo || mediaFileUrl(video);

  if (localVideo) {
    return (
      <ExperienceVideo
        src={localVideo}
        objectPosition={imagePositionFallback}
        fill={fill}
        priority={priority}
        className={className}
        dataSanity={dataSanity}
        zIndex={videoZIndex}
      />
    );
  }

  if (videoOverride) {
    return (
      <ExperienceVideo
        src={videoOverride}
        objectPosition={imagePositionFallback}
        fill={fill}
        priority={priority}
        className={className}
        dataSanity={dataSanity}
        zIndex={videoZIndex}
      />
    );
  }

  if (videoUrl && !srcOverride) {
    return (
      <ExperienceVideo
        src={videoUrl}
        objectPosition={mediaFileObjectPosition(video)}
        fill={fill}
        priority={priority}
        className={className}
        dataSanity={dataSanity}
        zIndex={videoZIndex}
      />
    );
  }

  const common = {
    src: localImage || srcOverride || mediaUrl(image, fallback),
    alt: mediaAlt(image, altFallback),
    sizes,
    priority,
    className,
    style: { objectPosition: mediaObjectPosition(image, imagePositionFallback) },
    "data-sanity": dataSanity,
  };

  if (fill) {
    return <Image {...common} fill />;
  }

  return <Image {...common} width={width} height={height} />;
}
