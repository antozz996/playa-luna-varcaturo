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
  /** Text alternative read by screen readers (the video itself stays decorative). */
  label?: string;
  /** Show the pause/play button. Off for videos inside links (a button can't sit inside <a>). */
  controls?: boolean;
};

/* ---- prefers-reduced-motion ---- */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
}

/* ---- Page-wide pause (WCAG 2.2.2): any pause button stops every video on the page ---- */
let allPaused = false;
const pauseListeners = new Set<() => void>();

function setAllPaused(value: boolean) {
  allPaused = value;
  pauseListeners.forEach((listener) => listener());
}

function subscribePause(onChange: () => void) {
  pauseListeners.add(onChange);
  return () => pauseListeners.delete(onChange);
}

function useAllPaused() {
  return useSyncExternalStore(subscribePause, () => allPaused, () => false);
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
  controls = true,
}: ExperienceVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const paused = useAllPaused();
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

  // Load once when it comes into view.
  useEffect(() => {
    const video = videoRef.current;
    if (!shouldLoad || !video) return;
    video.load();
  }, [shouldLoad, src]);

  // Play or stop following the page-wide pause and the reduced-motion preference.
  // The hero is server-rendered with autoplay, so it must be stopped explicitly too.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion || paused || !shouldLoad) {
      video.pause();
      return;
    }
    void video.play().catch(() => {
      // Autoplay can occasionally be deferred by the browser.
    });
  }, [reducedMotion, paused, shouldLoad, isReady]);

  // With a poster the element is visible immediately; without one it fades in on first frame.
  const visible = Boolean(poster) || isReady;

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
        autoPlay={!reducedMotion && !paused}
        preload={shouldLoad ? "metadata" : "none"}
        onLoadedData={() => setIsReady(true)}
        aria-hidden="true"
        tabIndex={-1}
      />
      {label ? <span className="sr-only">{label}</span> : null}
      {controls && shouldLoad ? (
        <button
          type="button"
          className="video-toggle"
          onClick={() => setAllPaused(!paused)}
          aria-label={paused ? "Riproduci i video" : "Metti in pausa i video"}
        >
          <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
        </button>
      ) : null}
    </>
  );
}
