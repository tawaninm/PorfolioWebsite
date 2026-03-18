"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Decorative parallax shapes for the project detail page.
 * Circles, stars, and dots drift at 0.3× scroll speed.
 */
export default function ParallaxShapes() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Each shape gets a slightly different parallax range
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Large lavender circle — top-right */}
      <motion.div
        className="absolute top-[10%] right-[6%] w-40 h-40 rounded-full bg-lavender/10 blur-3xl motion-reduce:transform-none"
        style={{ y: y1 }}
      />

      {/* Sakura pink circle — bottom-left */}
      <motion.div
        className="absolute top-[45%] left-[4%] w-32 h-32 rounded-full bg-sakura-pink/10 blur-3xl motion-reduce:transform-none"
        style={{ y: y2 }}
      />

      {/* Sky cyan circle — mid-right */}
      <motion.div
        className="absolute top-[65%] right-[10%] w-24 h-24 rounded-full bg-sky-cyan/10 blur-2xl motion-reduce:transform-none"
        style={{ y: y3 }}
      />

      {/* 4-point star — top-left */}
      <motion.div
        className="absolute top-[20%] left-[12%] text-retro-yellow/20 text-5xl select-none motion-reduce:transform-none"
        style={{ y: y4 }}
      >
        ✦
      </motion.div>

      {/* 4-point star — bottom-right */}
      <motion.div
        className="absolute top-[75%] right-[18%] text-hot-pink/15 text-4xl select-none motion-reduce:transform-none"
        style={{ y: y5 }}
      >
        ✦
      </motion.div>

      {/* Small dot — mid-left */}
      <motion.div
        className="absolute top-[55%] left-[20%] w-3 h-3 rounded-full bg-sunset-gold/20 motion-reduce:transform-none"
        style={{ y: y2 }}
      />

      {/* Small dot — top-center */}
      <motion.div
        className="absolute top-[30%] left-[50%] w-2 h-2 rounded-full bg-mint/20 motion-reduce:transform-none"
        style={{ y: y1 }}
      />
    </div>
  );
}
