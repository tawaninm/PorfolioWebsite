"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Page transition using Next.js template.tsx (re-mounts on every route).
 *
 * Because template.tsx unmounts the old page immediately, AnimatePresence
 * mode="wait" can never fire exit animations reliably in App Router.
 *
 * Instead we use a simple **enter-only** wipe: two overlay panels that
 * start fully covering the viewport and then slide away, revealing the new page.
 * This gives a snappy, reliable comic-panel reveal without blocking navigation.
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

  return (
    <div className="min-h-screen">
      {children}

      {/* ── Comic Panel Reveal (Enter-only) ──
          Two panels start scale-Y=1 (covering viewport) and shrink to 0,
          revealing the new page underneath like a manga panel opening.  */}
      <motion.div
        key={`wipe-blue-${pathname}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[101] bg-electric-blue origin-top pointer-events-none"
      />
      <motion.div
        key={`wipe-pink-${pathname}`}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-hot-pink origin-top pointer-events-none"
      />
    </div>
  );
}
