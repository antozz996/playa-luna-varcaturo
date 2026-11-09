"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Mobile <details> menu that also closes with Escape and on outside tap. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    const menu = ref.current;
    if (!menu) return;

    const close = () => {
      if (menu.open) menu.open = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.open) {
        close();
        menu.querySelector("summary")?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menu.open && !menu.contains(event.target as Node)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <details className="mobile-menu" ref={ref}>
      {/* Visible text is the accessible name; <summary> exposes the open/closed state natively. */}
      <summary>Menu</summary>
      {children}
    </details>
  );
}
