"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./experience-video.module.css";

type ExperienceVideoProps = {
  src: string;
  poster: string;
};

export function ExperienceVideo({ src, poster }: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      src={shouldLoad ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={shouldLoad}
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
