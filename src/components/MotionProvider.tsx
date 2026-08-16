"use client";

import { useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    let isMounted = true;
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

    // If GSAP ScrollTrigger is used anywhere on the page (lazy loaded),
    // drive Lenis from GSAP's ticker so pinned/scrubbed sections stay in sync.
    let cleanupGsap: (() => void) | undefined;
    import("gsap").then((gsapMod) =>
      import("gsap/ScrollTrigger").then((stMod) => {
        if (!isMounted || !lenisRef.current) return;
        const gsap = gsapMod.default;
        const ScrollTrigger = stMod.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        cancelAnimationFrame(rafId);
        lenis.on("scroll", ScrollTrigger.update);
        const updateLenis = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);
        cleanupGsap = () => {
          gsap.ticker.remove(updateLenis);
        };
      })
    );

    return () => {
      isMounted = false;
      cancelAnimationFrame(rafId);
      cleanupGsap?.();
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
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}

