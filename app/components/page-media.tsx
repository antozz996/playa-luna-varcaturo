import Image from "next/image";
import { ExperienceVideo } from "./experience-video";

type PageMediaProps = {
  /** Image path under /public. Used when no video is given. */
  src?: string;
  /** Video path under /public. Takes precedence over src. */
  video?: string;
  alt: string;
  sizes: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  position?: string;
  videoZIndex?: number;
  /** Pause button on the video. Set false when the media sits inside a link. */
  videoControls?: boolean;
};

export function PageMedia({
  src,
  video,
  alt,
  sizes,
  width = 960,
  height = 1200,
  fill = false,
  priority = false,
  className,
  position = "50% 50%",
  videoZIndex,
  videoControls = true,
}: PageMediaProps) {
  if (video) {
    return (
      <ExperienceVideo
        src={video}
        poster={video.replace(/\.mp4$/, "-poster.webp")}
        objectPosition={position}
        fill={fill}
        priority={priority}
        className={className}
        zIndex={videoZIndex}
        label={alt}
        controls={videoControls}
      />
    );
  }

  if (!src) return null;

  const common = { src, sizes, priority, className, style: { objectPosition: position } };
  return fill
    ? <Image {...common} alt={alt} fill />
    : <Image {...common} alt={alt} width={width} height={height} />;
}
