"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./experience-video.module.css";

type ExperienceVideoProps = {
  src: string;
  objectPosition?: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  dataSanity?: string;
  zIndex?: number;
};

export function ExperienceVideo({
  src,
  objectPosition = "50% 50%",
  fill = false,
  priority = false,
  className = "",
  dataSanity,
  zIndex,
}: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (priority) return;

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
      { rootMargin: "600px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;

    const video = videoRef.current;
    video.load();
    void video.play().catch(() => {
      // Autoplay can occasionally be deferred by the browser.
    });
  }, [shouldLoad, src]);

  return (
    <video
      ref={videoRef}
      className={`${styles.video} ${fill ? styles.fill : ""} ${isReady ? styles.ready : ""} ${className}`}
      src={shouldLoad ? src : undefined}
      style={{ objectPosition, zIndex }}
      muted
      loop
      playsInline
      autoPlay
      preload={priority ? "auto" : shouldLoad ? "metadata" : "none"}
      onLoadedData={() => setIsReady(true)}
      aria-hidden="true"
      tabIndex={-1}
      data-sanity={dataSanity}
    />
  );
}
