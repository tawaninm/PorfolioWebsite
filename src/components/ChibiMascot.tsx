"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * ChibiMascot — a kawaii blob (Doro-style chibi)
 * that floats in the corner, wiggles on scroll, and its eyes track the cursor.
 * Pure DOM/framer-motion — no external assets.
 */
export default function ChibiMascot() {
  const [show, setShow] = useState(false);
  const [wave, setWave] = useState(false);
  const [wiggle, setWiggle] = useState(0);
  const [reduced, setReduced] = useState(false);

  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const sEyeX = useSpring(eyeX, { stiffness: 300, damping: 20 });
  const sEyeY = useSpring(eyeY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMqChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMqChange);

    if (!window.matchMedia("(pointer: fine)").matches) {
      return () => mq.removeEventListener("change", onMqChange);
    }
    setShow(true);

    const onMove = (e: MouseEvent) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const nx = (e.clientX / vw) * 2 - 1;
      const ny = (e.clientY / vh) * 2 - 1;
      eyeX.set(nx * 3.5);
      eyeY.set(ny * 3.5);
    };

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        setWiggle((w) => w + 1);
        scrollTimeout = null;
      }, 200);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", onMqChange);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [eyeX, eyeY]);

  if (!show) return null;

  return (
    <motion.button
      type="button"
      aria-label="Chibi mascot (easter egg: click to wave)"
      onClick={() => setWave((w) => !w)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-[90] w-16 h-16 md:w-20 md:h-20 cursor-pointer select-none group"
    >
      <motion.span
        className="absolute inset-0 rounded-[45%] bg-gradient-to-br from-sakura-pink via-hot-pink/70 to-lavender shadow-[0_8px_24px_rgba(255,45,120,0.35)]"
        animate={
          reduced
            ? { y: 0, rotate: 0 }
            : {
                y: [0, -4, 0],
                rotate: wiggle % 2 === 0 ? [-2, 2, -2] : [2, -2, 2],
              }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 0.6, repeat: Infinity } }
        }
        whileHover={reduced ? {} : { scale: 1.08 }}
      >
        {/* Eyes (track cursor) */}
        <motion.span className="absolute top-[38%] left-[26%] w-2.5 h-3.5 rounded-full bg-deep-navy" style={{ x: sEyeX, y: sEyeY }}>
          <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
        </motion.span>
        <motion.span className="absolute top-[38%] right-[26%] w-2.5 h-3.5 rounded-full bg-deep-navy" style={{ x: sEyeX, y: sEyeY }}>
          <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
        </motion.span>
        {/* Blush */}
        <span className="absolute top-[55%] left-[18%] w-2.5 h-1.5 rounded-full bg-hot-pink/40" />
        <span className="absolute top-[55%] right-[18%] w-2.5 h-1.5 rounded-full bg-hot-pink/40" />
        {/* Mouth */}
        <span className="absolute top-[58%] left-1/2 -translate-x-1/2 w-3 h-1.5 rounded-b-full border-b-2 border-deep-navy" />
      </motion.span>
      {/* Waving arm */}
      {wave && (
        <motion.span
          className="absolute -top-1 -right-2 text-xl origin-bottom-left"
          initial={{ rotate: 0 }}
          animate={{ rotate: reduced ? 0 : [-20, 25, -20, 25, 0] }}
          transition={{ duration: reduced ? 0 : 1.2 }}
        >
          👋
        </motion.span>
      )}
    </motion.button>
  );
}

