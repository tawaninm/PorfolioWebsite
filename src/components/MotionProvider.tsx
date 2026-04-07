"use client";

import { useEffect, useRef, useCallback } from "react";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ── Reset Lenis scroll position on route change ── */
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Give the new page a frame to mount, then reset Lenis
    requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
    });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="never">
      {children}
    </MotionConfig>
  );
}
