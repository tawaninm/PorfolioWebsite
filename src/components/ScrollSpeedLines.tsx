"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const LINE_COUNT = 8;

/** Thin diagonal speed-line SVGs shown at screen edges when scrolling fast */
export default function ScrollSpeedLines() {
  const prefersReduced = useReducedMotion();
  const [opacity, setOpacity] = useState(0);
  const lastY = useRef(0);
  const rafRef = useRef<number | null>(null);
  const fadeOutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const onScroll = () => {
      const currentY = window.scrollY;
      const velocity = Math.abs(currentY - lastY.current);
      lastY.current = currentY;

      // Show lines when velocity > 8px/frame
      if (velocity > 8) {
        const strength = Math.min((velocity - 8) / 40, 1); // 0→1
        setOpacity(strength * 0.12);

        if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
        fadeOutTimer.current = setTimeout(() => {
          setOpacity(0);
        }, 120);
      }
    };

    const loop = () => {
      onScroll();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fadeOutTimer.current) clearTimeout(fadeOutTimer.current);
    };
  }, [prefersReduced]);

  if (prefersReduced || opacity === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[90] select-none"
      style={{ opacity, transition: "opacity 0.15s ease-out" }}
      aria-hidden="true"
    >
      {/* Left edge lines */}
      <svg className="absolute left-0 top-0 h-full w-24" preserveAspectRatio="none" viewBox="0 0 96 800">
        {Array.from({ length: LINE_COUNT }).map((_, i) => {
          const y = (800 / LINE_COUNT) * i + 30;
          return (
            <line
              key={i}
              x1={0} y1={y - 20}
              x2={96} y2={y + 60}
              stroke="#FF2D78"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
              strokeOpacity={0.6 - i * 0.05}
            />
          );
        })}
      </svg>
      {/* Right edge lines */}
      <svg className="absolute right-0 top-0 h-full w-24" preserveAspectRatio="none" viewBox="0 0 96 800">
        {Array.from({ length: LINE_COUNT }).map((_, i) => {
          const y = (800 / LINE_COUNT) * i + 30;
          return (
            <line
              key={i}
              x1={96} y1={y - 20}
              x2={0}  y2={y + 60}
              stroke="#5080F0"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
              strokeOpacity={0.6 - i * 0.05}
            />
          );
        })}
      </svg>
    </div>
  );
}
