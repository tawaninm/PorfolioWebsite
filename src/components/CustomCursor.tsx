"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — neon dot + trailing ring that follows the cursor.
 * Desktop (fine pointer) only; auto-hidden on touch devices.
 * Uses mix-blend-difference so it stays visible on any background.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-on");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Core dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[300] pointer-events-none w-2.5 h-2.5 rounded-full bg-neon-magenta mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[299] pointer-events-none w-9 h-9 rounded-full border-2 border-electric-blue mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
