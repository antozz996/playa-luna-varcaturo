"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./experience-video.module.css";

type ExperienceVideoProps = {
  src: string;
  poster?: string;
  objectPosition?: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  zIndex?: number;
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function ExperienceVideo({
  src,
  poster,
  objectPosition = "50% 50%",
  fill = false,
  priority = false,
  className = "",
  zIndex,
}: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(priority);
  const [isReady, setIsReady] = useState(false);
  const shouldLoad = inView && !reducedMotion;

  useEffect(() => {
    if (priority) return;
    const node = videoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!shouldLoad || !video) return;
    video.load();
    void video.play().catch(() => {
      // Autoplay can occasionally be deferred by the browser.
    });
  }, [shouldLoad, src]);

  // With a poster the element is visible immediately; without one it fades in on first frame.
  const visible = Boolean(poster) || isReady;

  return (
    <video
      ref={videoRef}
      className={`${styles.video} ${fill ? styles.fill : ""} ${visible ? styles.ready : ""} ${className}`}
      src={shouldLoad ? src : undefined}
      poster={poster}
      style={{ objectPosition, zIndex }}
      muted
      loop
      playsInline
      autoPlay={!reducedMotion}
      preload={shouldLoad ? "metadata" : "none"}
      onLoadedData={() => setIsReady(true)}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
