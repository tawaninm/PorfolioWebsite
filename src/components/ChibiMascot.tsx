"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * ChibiMascot — a kawaii blob (Doro-style chibi, per workspace avatar rule)
 * that floats in the corner, wiggles on scroll, and its eyes track the cursor.
 * Pure DOM/framer-motion — no external assets. Swap for a Rive .riv later.
 */
export default function ChibiMascot() {
  const [show, setShow] = useState(false);
  const [wave, setWave] = useState(false);
  const [wiggle, setWiggle] = useState(0);

  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const sEyeX = useSpring(eyeX, { stiffness: 300, damping: 20 });
  const sEyeY = useSpring(eyeY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setShow(true);

    const onMove = (e: MouseEvent) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const nx = (e.clientX / vw) * 2 - 1;
      const ny = (e.clientY / vh) * 2 - 1;
      eyeX.set(nx * 3.5);
      eyeY.set(ny * 3.5);
    };
    const onScroll = () => {
      setWiggle((w) => w + 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
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
        animate={{
          y: [0, -4, 0],
          rotate: wiggle % 2 === 0 ? [-2, 2, -2] : [2, -2, 2],
        }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 0.6, repeat: Infinity } }}
        whileHover={{ scale: 1.08 }}
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
          animate={{ rotate: [-20, 25, -20, 25, 0] }}
          transition={{ duration: 1.2 }}
        >
          👋
        </motion.span>
      )}
    </motion.button>
  );
}
