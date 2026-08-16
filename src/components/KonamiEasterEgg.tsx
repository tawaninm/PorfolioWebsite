"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * Konami code easter egg (↑↑↓↓←→←→BA) — triggers a retro
 * "MIDNIGHT CITY POP MODE" CRT flash. Pure fun, harmless, respects
 * prefers-reduced-motion (flash becomes a simple fade).
 */
export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let idx = 0;

    const onKey = (e: KeyboardEvent) => {
      // Ignore key events originating from interactive text inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx]) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setActive(true);
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(
            () => setActive(false),
            reduced ? 900 : 2600
          );
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="konami"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.1 : 0.25 }}
          className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-deep-black/85 backdrop-blur-sm"
          aria-hidden="true"
        >
          {/* CRT scanlines */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.35) 2px 3px)",
            }}
          />
          {!reduced && (
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, transparent 40%, rgba(255,45,120,0.15) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          )}
          <motion.div
            className="relative text-center px-6"
            initial={reduced ? { opacity: 0 } : { scale: 0.7, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
          >
            <p className="font-mono text-xs tracking-[0.5em] text-neon-teal uppercase mb-3">
              ▚▚ Konami ▞▞
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta via-retro-yellow to-electric-blue">
              MIDNIGHT CITY POP MODE
            </h2>
            <p className="font-zen text-sm text-muted-lilac mt-4 tracking-widest">
              真夜中のシティポップ ✦ おやすみなさい
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

