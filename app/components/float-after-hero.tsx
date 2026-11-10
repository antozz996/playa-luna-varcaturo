"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Hides the floating booking button while the home hero (which already has the booking
 * actions) is on screen, so the button never covers them.
 */
export function FloatAfterHero({ children }: { children: ReactNode }) {
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) {
      const show = window.setTimeout(() => setHeroVisible(false), 0);
      return () => window.clearTimeout(show);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -35% 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="float-after-hero" data-hidden={heroVisible} inert={heroVisible ? true : undefined}>
      {children}
    </div>
  );
}
