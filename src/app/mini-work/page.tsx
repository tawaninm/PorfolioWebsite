"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { miniWorks, MiniWorkCard } from "@/components/MiniWorkPreview";

const filters = [
  { key: "all",     label: "All" },
  { key: "graphic", label: "Graphic" },
  { key: "ui",      label: "UI Design" },
  { key: "code",    label: "Code" },
  { key: "other",   label: "Other" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const stats = [
  { number: "3",    label: "Mini Works",      from: "#FF2D78", to: "#F06848" },
  { number: "3",    label: "Design Challenges", from: "#5080F0", to: "#40C8A0" },
  { number: "1",    label: "Tool: Figma",     from: "#F0D040", to: "#F8A078" },
  { number: "UI",   label: "Focus Area",      from: "#F0B0D0", to: "#FF2D78" },
];

function Starburst({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`absolute pointer-events-none select-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 360) / 12;
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + 18 * Math.cos(r)}
            y1={50 + 18 * Math.sin(r)}
            x2={50 + 48 * Math.cos(r)}
            y2={50 + 48 * Math.sin(r)}
            stroke="#FFB6C1"
            strokeWidth="3"
            strokeOpacity="0.4"
          />
        );
      })}
      <circle cx="50" cy="50" r="14" fill="#FFB6C1" opacity="0.2" />
    </svg>
  );
}

export default function MiniWorkPage() {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all" ? miniWorks : miniWorks.filter((w) => w.type === active);

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 overflow-hidden bg-soft-white dark:bg-dark-navy transition-colors duration-300">

      <Starburst size={80}  className="top-20 right-[6%] opacity-70 rotate-12" />
      <Starburst size={55}  className="top-[38%] left-[3%] opacity-50 -rotate-6" />
      <Starburst size={65}  className="bottom-40 right-[12%] opacity-60 rotate-3" />

      <motion.div className="absolute top-32 left-[8%] w-40 h-40 rounded-full bg-hot-pink/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -14, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-32 right-[6%] w-48 h-48 rounded-full bg-peach/10 blur-3xl pointer-events-none"
        animate={{ y: [0, 16, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      <div className="mx-auto max-w-6xl relative z-10">

        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-5xl md:text-7xl tracking-widest text-dark-navy dark:text-soft-white">
            MINI WORK EXPLORATION
          </h1>
          <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest">ミニワーク探索</p>
          <p className="font-body text-sm text-muted-lilac/70 mt-2">
            Experiments, Designs &amp; Code Snippets
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative px-5 py-2 rounded-full font-body text-sm font-bold transition-all duration-300 ${
                active === f.key
                  ? "bg-hot-pink text-white border-2 border-deep-black shadow-[0_0_18px_rgba(255,45,120,0.4)]"
                  : "bg-transparent text-dark-navy/60 dark:text-muted-lilac border-2 border-vinyl-dark/30 dark:border-muted-lilac/40 hover:border-hot-pink/60 hover:shadow-[0_0_10px_rgba(255,45,120,0.15)]"
              }`}
            >
              {f.label}
              {active === f.key && (
                <motion.span
                  layoutId="miniWorkFilter"
                  className="absolute inset-0 rounded-full bg-hot-pink -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <motion.p
          key={`count-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center font-mono text-xs text-muted-lilac mb-8 tracking-widest"
        >
          Showing {filtered.length} of {miniWorks.length} works
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <AnimatePresence mode="popLayout">
            {filtered.map((work, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5 }}
                key={work.id}
              >
                <MiniWorkCard work={work} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-hot-pink/50 to-transparent" />
            <div className="text-center shrink-0">
              <p className="font-mono text-[10px] text-muted-lilac uppercase tracking-[0.2em]">
                ★ FUN FACTS ★
              </p>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-hot-pink/50 to-transparent" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-vinyl-dark border-2 border-hot-pink/50 rounded-lg p-5 text-center relative overflow-hidden"
                style={{
                  boxShadow: "3px 3px 0 rgba(255,45,120,0.25)",
                }}
              >
                <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-hot-pink/60" />
                <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-hot-pink/60" />
                <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-hot-pink/60" />
                <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-hot-pink/60" />

                <span
                  className="font-display text-4xl leading-none block"
                  style={{
                    background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.number}
                </span>
                <span className="font-body text-xs text-muted-lilac mt-2 block uppercase tracking-wider">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
