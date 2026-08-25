"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./experience-video.module.css";

type ExperienceVideoProps = {
  src: string;
  poster?: string;
};

export function ExperienceVideo({ src }: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);

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
      { rootMargin: "600px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
      className={`${styles.video} ${isReady ? styles.ready : ""}`}
      src={shouldLoad ? src : undefined}
      muted
      loop
      playsInline
      autoPlay
      preload={shouldLoad ? "metadata" : "none"}
      onLoadedData={() => setIsReady(true)}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
