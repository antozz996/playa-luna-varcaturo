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
  /** Text alternative: exposed as role="img" when the video carries meaning. Empty = decorative. */
  label?: string;
  /** Show a pause/play button (WCAG 2.2.2), used on hero videos. */
  pausable?: boolean;
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
  label,
  pausable = false,
}: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(priority);
  const [isReady, setIsReady] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const shouldLoad = inView && !reducedMotion;

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (userPaused) {
      setUserPaused(false);
      void video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

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
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };

  return (
    <>
    <video
      ref={videoRef}
      className={`${styles.video} ${fill ? styles.fill : ""} ${visible ? styles.ready : ""} ${className}`}
      src={shouldLoad ? src : undefined}
      poster={poster}
      style={{ objectPosition, zIndex }}
      muted
      loop
      playsInline
      autoPlay={!reducedMotion && !userPaused}
      preload={shouldLoad ? "metadata" : "none"}
      onLoadedData={() => setIsReady(true)}
      tabIndex={-1}
      {...a11y}
    />
    {pausable && shouldLoad ? (
      <button
        type="button"
        className="video-toggle"
        onClick={togglePlayback}
        aria-label={userPaused ? "Riproduci il video" : "Metti in pausa il video"}
        aria-pressed={userPaused}
      >
        <span aria-hidden="true">{userPaused ? "▶" : "❚❚"}</span>
      </button>
    ) : null}
    </>
  );
}
