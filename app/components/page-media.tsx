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
}: PageMediaProps) {
  if (video) {
    return (
      <ExperienceVideo
        src={video}
        objectPosition={position}
        fill={fill}
        priority={priority}
        className={className}
        zIndex={videoZIndex}
      />
    );
  }

  if (!src) return null;

  const common = { src, alt, sizes, priority, className, style: { objectPosition: position } };
  return fill ? <Image {...common} fill /> : <Image {...common} width={width} height={height} />;
}
