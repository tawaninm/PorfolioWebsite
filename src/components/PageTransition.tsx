"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Page transition shell (template.tsx re-mounts on every route).
 *
 * The actual enter/exit animation is handled natively by the View Transitions
 * API (see ::view-transition-* rules in globals.css + <ViewTransitions> in
 * layout.tsx). This component only handles scroll-to-top on route change.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Scroll to top on route change (instant — Lenis handles smoothness)
  useEffect(() => {
    // Skip the first render (initial page load) to avoid a flash
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return <div className="min-h-screen">{children}</div>;
}
