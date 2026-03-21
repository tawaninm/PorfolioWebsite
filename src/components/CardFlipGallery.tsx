"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cards } from "@/data/cards";
import { artworkMap } from "./CardArtwork";

/* ── Manga sparkle decoration ────────────────────────────── */
function MangaStar({
  size, top, left, right, bottom, delay,
}: {
  size: number; top?: string; left?: string; right?: string; bottom?: string; delay: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className="absolute pointer-events-none select-none z-20"
      style={{ top, left, right, bottom }}
      animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {/* 4-point star */}
      <polygon points="20,2 23,17 38,20 23,23 20,38 17,23 2,20 17,17" fill="#F0D040" />
      {/* Small diamond in center */}
      <polygon points="20,13 24,20 20,27 16,20" fill="#FF2D78" opacity={0.7} />
    </motion.svg>
  );
}

/* ── Card back face ──────────────────────────────────────── */
function CardBack() {
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center"
      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
    >
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C084FC] via-[#F472B6] to-[#818CF8]" />

      {/* Geometric pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {/* Grid circles */}
        {[...Array(5)].map((_, row) =>
          [...Array(4)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 70 + 35}
              cy={row * 85 + 42}
              r={22}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            />
          ))
        )}
        {/* Diamond accents */}
        {[...Array(3)].map((_, i) => (
          <polygon
            key={i}
            points={`${80 + i * 80},10 ${100 + i * 80},40 ${80 + i * 80},70 ${60 + i * 80},40`}
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Inner border */}
      <div className="absolute inset-3 rounded-xl border border-white/30" />
      <div className="absolute inset-5 rounded-lg border border-white/15" />

      {/* Center motif */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <svg viewBox="0 0 60 60" width={60} height={60}>
          <polygon
            points="30,4 36,22 56,22 40,34 46,52 30,40 14,52 20,34 4,22 24,22"
            fill="white"
            opacity={0.9}
          />
        </svg>
        <span
          className="text-white font-bold text-xs tracking-[0.3em] uppercase opacity-80"
          style={{ fontFamily: "sans-serif" }}
        >
          TW Portfolio
        </span>
      </div>
    </div>
  );
}

/* ── Card front face ─────────────────────────────────────── */
function CardFront({ card }: { card: (typeof cards)[0] }) {
  const ArtworkComponent = artworkMap[card.artworkId];
  return (
    <div
      className="absolute inset-0 rounded-2xl overflow-hidden"
      style={{ backfaceVisibility: "hidden" }}
    >
      {ArtworkComponent ? <ArtworkComponent /> : null}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function CardFlipGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const controls = useAnimation();

  // Hide hint after 4s even without click
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const handleFlip = async () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setShowHint(false);

    // Flip to back (0 → 180)
    await controls.start({
      rotateY: 180,
      transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    });

    // Swap card data while back is visible, then jump to -180 (same visual)
    setCurrentIndex((i) => (i + 1) % cards.length);
    controls.set({ rotateY: -180 });

    // Flip to new front (-180 → 0)
    await controls.start({
      rotateY: 0,
      transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    });

    setIsFlipping(false);
  };

  return (
    <div className="flex flex-col items-center gap-5 select-none">
      {/* Card + sparkles container */}
      <div className="relative" style={{ perspective: "1000px" }}>

        {/* Experience badge */}
        <motion.div
          className="absolute -top-10 -left-14 z-30 px-4 py-2 bg-retro-yellow text-deep-black font-body font-bold text-sm rounded-lg border-2 border-dark-navy shadow-md pointer-events-none select-none"
          style={{ rotate: "-3deg" }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          1+ Years Experience
        </motion.div>

        {/* Speech bubble */}
        <motion.div
          className="absolute -top-10 -right-14 z-30 select-none pointer-events-none"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative bg-soft-white border-2 border-dark-navy rounded-2xl px-4 py-2 shadow-md">
            <span className="font-display text-sm text-dark-navy tracking-wide">Welcome! ✦</span>
            <div
              className="absolute -bottom-[10px] left-5 w-0 h-0"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "10px solid #1A1A2E",
              }}
            />
            <div
              className="absolute -bottom-[8px] left-[22px] w-0 h-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "8px solid #F4ECE4",
              }}
            />
          </div>
        </motion.div>

        {/* Manga sparkles */}
        <MangaStar size={20} top="-16px" left="-12px" delay={0} />
        <MangaStar size={14} top="-8px" right="-8px" delay={0.7} />
        <MangaStar size={16} bottom="-10px" right="-14px" delay={1.2} />
        <MangaStar size={12} bottom="-12px" left="20%" delay={0.4} />

        {/* Neon glow ring */}
        <div
          className="absolute -inset-3 rounded-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,45,120,0.18) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Flippable card */}
        <motion.div
          animate={controls}
          onClick={handleFlip}
          className="relative cursor-pointer"
          style={{
            width: "320px",
            aspectRatio: "3/4",
            transformStyle: "preserve-3d",
          }}
          whileHover={isFlipping ? {} : { scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          {/* Manga double-border wrapper */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow:
                "0 0 0 2px #FF2D78, 0 0 0 5px #1C1C2E, 0 0 0 7px rgba(192,132,252,0.5), 0 8px 40px rgba(255,45,120,0.25)",
            }}
          />

          <CardFront card={cards[currentIndex]} />
          <CardBack />
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {cards.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === currentIndex ? 1.3 : 1,
              backgroundColor: i === currentIndex ? "#FF2D78" : "rgba(192,132,252,0.35)",
            }}
            transition={{ duration: 0.3 }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 1 }}
        animate={{ opacity: showHint ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="font-body text-[11px] text-muted-lilac/60 tracking-widest uppercase pointer-events-none"
      >
        Click to flip ✦
      </motion.p>
    </div>
  );
}
