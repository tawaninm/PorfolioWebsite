"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categoryLabels } from "@/data/projects";
import type { Project } from "@/data/projects";

/* ── Filter config ── */
const filters = [
  { key: "all",         label: "All" },
  { key: "uxui",        label: "UX/UI" },
  { key: "programming", label: "Programming" },
  { key: "game",        label: "Game Dev" },
  { key: "ci-art",      label: "CI Art" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const categoryColor: Record<Project["category"], string> = {
  uxui:        "text-sakura-pink",
  programming: "text-sky-cyan",
  "ci-art":    "text-mint",
  game:        "text-retro-yellow",
};

const ease = [0.16, 1, 0.3, 1] as const;

/* ── Speed lines flanking chapter header ── */
function SpeedLines({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 24" width={80} height={24} aria-hidden="true" className="shrink-0"
      style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {[2, 7, 13, 19].map((y, i) => (
        <line key={i} x1={i % 2 === 0 ? 0 : 8} y1={y} x2={80} y2={y}
          stroke="#FF2D78" strokeWidth={i === 1 ? 2 : 1} strokeOpacity={0.35 + i * 0.1} />
      ))}
    </svg>
  );
}

/* ── Single project card ── */
function ProjectCard({
  project,
  index,
  reverse,
  isFirst,
}: {
  project: Project;
  index: number;
  reverse: boolean;
  isFirst: boolean;
}) {
  const number   = String(index + 1).padStart(2, "0");
  const rotation = index % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[1deg]";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease }}
      className={`relative ${rotation}`}
    >
      {/* Number watermark */}
      <span className={`absolute -top-6 ${reverse ? "right-0 md:right-8" : "left-0 md:left-8"} font-display text-[120px] md:text-[180px] leading-none text-lavender/15 select-none pointer-events-none z-0`}>
        {number}
      </span>

      {/* Card */}
      <div
        className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-2 border-vinyl-dark/40 dark:border-soft-white/10 rounded-2xl p-6 bg-soft-white/40 dark:bg-dark-navy/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_12px_40px_rgba(255,45,120,0.25)] group`}
        style={reverse ? { direction: "rtl" } : undefined}
      >
        {/* "NEW!" badge on first card */}
        {isFirst && (
          <div className="absolute -top-4 -right-4 z-20 rotate-[8deg]">
            <div className="relative bg-retro-yellow text-deep-black font-display text-xs px-3 py-1.5 rounded-xl border-2 border-deep-black shadow-md">
              NEW! ✦
              <div className="absolute -bottom-[9px] left-4 w-0 h-0"
                style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "9px solid #0A0A0A" }} />
              <div className="absolute -bottom-[7px] left-[18px] w-0 h-0"
                style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "7px solid #F5C842" }} />
            </div>
          </div>
        )}

        {/* Image side */}
        <div className="group/thumb relative rounded-xl overflow-hidden bg-deep-purple/30 aspect-[4/3]"
          style={reverse ? { direction: "ltr" } : undefined}>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lavender/30 to-sakura-pink/20">
            <span className="font-display text-6xl text-soft-white/30">{project.title[0]}</span>
          </div>
          <div className="absolute inset-0 bg-hot-pink/0 group-hover/thumb:bg-hot-pink/10 transition-all duration-500" />
          <div className="halftone-bg absolute inset-0 opacity-0 group-hover/thumb:opacity-30 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute inset-0 transition-transform duration-500 group-hover/thumb:scale-105" />
          <div className="absolute bottom-3 left-3 z-10">
            <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-dark-navy/70 backdrop-blur-sm text-soft-white px-2 py-1 rounded-full">
              {categoryLabels[project.category]}
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col gap-3" style={reverse ? { direction: "ltr" } : undefined}>
          <span className={`font-body text-xs font-bold uppercase tracking-widest ${categoryColor[project.category]}`}>
            {categoryLabels[project.category]}
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-dark-navy dark:text-soft-white leading-tight transition-colors duration-300">
            {project.title}
          </h3>
          <p className="font-body text-dark-navy/70 dark:text-soft-white/70 leading-relaxed transition-colors duration-300">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-soft-white/10 text-soft-white/60 font-body text-xs border border-soft-white/10">
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="group/cta inline-flex items-center gap-2 mt-3 w-fit px-6 py-2.5 rounded-full bg-hot-pink text-soft-white font-body font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,96,144,0.5)] relative overflow-hidden"
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200 pointer-events-none" aria-hidden="true">
              {[10, 6, 4].map((w, i) => (
                <span key={i} className="block bg-soft-white/40 rounded-full" style={{ width: w, height: 1.5 }} />
              ))}
            </span>
            View Case Study
            <span className="transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Page ── */
export default function ProjectsPage() {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 overflow-hidden bg-soft-white dark:bg-dark-navy transition-colors duration-300">
      {/* Halftone bg */}
      <div className="halftone-bg absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }} />

      {/* Floating blobs */}
      <motion.div className="absolute top-32 right-[5%] w-36 h-36 rounded-full bg-lavender/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -18, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-40 left-[8%] w-28 h-28 rounded-full bg-sakura-pink/10 blur-3xl pointer-events-none"
        animate={{ y: [0, 14, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* Heading */}
        <motion.div className="text-center mb-4"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}>
          <h1 className="font-display text-5xl md:text-7xl tracking-widest text-dark-navy dark:text-soft-white">
            ALL PROJECTS
          </h1>
          <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest">全プロジェクト</p>
        </motion.div>

        {/* Chapter header */}
        <motion.div className="flex items-center justify-center gap-4 mt-8 mb-4"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}>
          <SpeedLines />
          <div className="text-center shrink-0">
            <span className="font-mono text-xs text-neon-magenta uppercase tracking-[0.2em]">Portfolio</span>
            <p className="font-display text-xl text-dark-navy dark:text-soft-white leading-tight">Full Collection</p>
          </div>
          <SpeedLines flip />
        </motion.div>

        {/* Filter tabs */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative px-5 py-2 rounded-full font-body text-sm font-bold transition-all duration-300 ${
                active === f.key
                  ? "bg-neon-magenta text-white border-2 border-deep-black shadow-[0_0_20px_rgba(255,45,120,0.4)]"
                  : "bg-transparent text-dark-navy/60 dark:text-muted-lilac border-2 border-vinyl-dark/30 dark:border-muted-lilac/40 hover:border-neon-magenta/60 hover:text-dark-navy dark:hover:text-soft-white hover:shadow-[0_0_12px_rgba(255,45,120,0.2)]"
              }`}
            >
              {f.label}
              {active === f.key && (
                <motion.span layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-neon-magenta -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project count */}
        <motion.p
          key={`count-${active}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center font-mono text-xs text-muted-lilac mb-14 tracking-widest"
        >
          Showing {filtered.length} of {projects.length} projects
        </motion.p>

        {/* Cards */}
        <div className="flex flex-col gap-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={idx}
                reverse={idx % 2 !== 0}
                isFirst={idx === 0}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Back to home */}
        <motion.div className="flex justify-center mt-24"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease }}>
          <Link href="/#works"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-lilac hover:text-hot-pink transition-colors duration-200">
            ← Back to home
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
