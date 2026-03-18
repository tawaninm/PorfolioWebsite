"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPOKES = 16;
const SESSION_KEY = "portfolio_welcomed";

function StarBurstSVG() {
  return (
    <svg viewBox="0 0 300 300" width={300} height={300} aria-hidden="true">
      {/* Outer spokes */}
      {Array.from({ length: SPOKES }).map((_, i) => {
        const angle = (i * 360) / SPOKES;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={150 + 55 * Math.cos(rad)}
            y1={150 + 55 * Math.sin(rad)}
            x2={150 + 145 * Math.cos(rad)}
            y2={150 + 145 * Math.sin(rad)}
            stroke={i % 2 === 0 ? "#FF2D78" : "#F0D040"}
            strokeWidth={i % 4 === 0 ? 4 : 2}
            strokeOpacity={0.9}
          />
        );
      })}
      {/* Inner rings */}
      <circle cx="150" cy="150" r="52"  fill="none" stroke="#FF2D78" strokeWidth="2"  strokeOpacity="0.5" />
      <circle cx="150" cy="150" r="38"  fill="none" stroke="#F0D040" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="150" cy="150" r="50"  fill="#FF2D78" opacity="0.15" />
      <circle cx="150" cy="150" r="34"  fill="#F0D040" opacity="0.2" />
      <circle cx="150" cy="150" r="22"  fill="#FF2D78" opacity="0.35" />
      {/* Center dot */}
      <circle cx="150" cy="150" r="10"  fill="#FF2D78" />
      <circle cx="150" cy="150" r="4"   fill="white"   opacity="0.8" />
    </svg>
  );
}

export default function WelcomeBurst() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show on first visit per browser session
    if (!sessionStorage.getItem(SESSION_KEY)) {
      setShow(true);
      sessionStorage.setItem(SESSION_KEY, "1");
      // Auto-hide after 1.2s
      const t = setTimeout(() => setShow(false), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, exit: { duration: 0.4 } } as never}
          aria-hidden="true"
        >
          {/* Dark backdrop — very brief */}
          <motion.div
            className="absolute inset-0 bg-vinyl-dark"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          />
          {/* Starburst */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: [0, 1.15, 1], rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <StarBurstSVG />
            {/* "Welcome" text */}
            <motion.p
              className="absolute inset-0 flex items-center justify-center font-display text-xl text-soft-white tracking-widest"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              Welcome ✦
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
