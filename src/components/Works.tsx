"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categoryLabels } from "@/data/projects";
import type { Project } from "@/data/projects";

const categoryColor: Record<Project["category"], string> = {
  uxui: "text-sakura-pink",
  programming: "text-sky-cyan",
  "ci-art": "text-mint",
  game: "text-retro-yellow",
};

/* Retro starburst SVG behind heading */
function Starburst() {
  return (
    <svg
      viewBox="0 0 120 120"
      width={120}
      height={120}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 -z-10 pointer-events-none select-none"
      aria-hidden="true"
    >
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x1 = 60 + 20 * Math.cos(rad);
        const y1 = 60 + 20 * Math.sin(rad);
        const x2 = 60 + 58 * Math.cos(rad);
        const y2 = 60 + 58 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F5C842" strokeWidth="3" strokeOpacity="0.35" />;
      })}
      <circle cx="60" cy="60" r="18" fill="#F5C842" opacity="0.18" />
    </svg>
  );
}

const featuredSlugs = ["chao-dom", "drive-kmitl", "vps-tycoon", "criminal-mind"];
const previewProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean) as typeof projects;

export default function Works() {
  return (
    <section id="works" className="relative py-24 px-6 overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-32 right-[5%] w-36 h-36 rounded-full bg-lavender/10 blur-3xl"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-[8%] w-28 h-28 rounded-full bg-sakura-pink/10 blur-3xl"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section heading with starburst */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="relative inline-block">
            <Starburst />
            <h2 className="font-display text-4xl md:text-5xl text-dark-navy dark:text-soft-white transition-colors duration-300 relative">
              Projects I&apos;m Proud Of
            </h2>
          </div>
          <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest">
            作品集
          </p>
        </motion.div>

        {/* Project cards — first 3 only */}
        <div className="flex flex-col gap-20">
          <AnimatePresence mode="popLayout">
            {previewProjects.map((project, idx) => (
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

        {/* "See More Projects" CTA */}
        <motion.div
          className="flex flex-col items-center mt-20 gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neon-magenta text-white font-display text-lg font-bold tracking-wide shadow-[0_0_20px_rgba(255,45,120,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(255,45,120,0.75)] hover:scale-105"
          >
            See More Projects
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
          <span className="font-zen text-xs text-muted-lilac tracking-widest mt-1">
            すべてのプロジェクト
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ---- Project Card ---- */

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
  const number = String(index + 1).padStart(2, "0");
  const rotation = index % 2 === 0 ? "md:rotate-[-1deg]" : "md:rotate-[1deg]";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      className={`relative ${rotation}`}
    >
      {/* Large number watermark */}
      <span
        className={`absolute -top-6 ${
          reverse ? "right-0 md:right-8" : "left-0 md:left-8"
        } font-display text-[120px] md:text-[180px] leading-none text-lavender/15 select-none pointer-events-none z-0`}
      >
        {number}
      </span>

      {/* Card content grid */}
      <div
        className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-2 border-vinyl-dark/40 dark:border-soft-white/10 rounded-2xl p-6 bg-soft-white/40 dark:bg-dark-navy/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_12px_40px_rgba(255,45,120,0.25)] group ${
          reverse ? "" : ""
        }`}
        style={reverse ? { direction: "rtl" } : undefined}
      >
        {/* "NEW!" speech bubble on first card */}
        {isFirst && (
          <div className="absolute -top-4 -right-4 z-20 rotate-[8deg]">
            <div className="relative bg-retro-yellow text-deep-black font-display text-xs px-3 py-1.5 rounded-xl border-2 border-deep-black shadow-md">
              NEW! ✦
              {/* bubble tail */}
              <div
                className="absolute -bottom-[9px] left-4 w-0 h-0"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "9px solid #0A0A0A",
                }}
              />
              <div
                className="absolute -bottom-[7px] left-[18px] w-0 h-0"
                style={{
                  borderLeft: "4px solid transparent",
                  borderRight: "4px solid transparent",
                  borderTop: "7px solid #F5C842",
                }}
              />
            </div>
          </div>
        )}

        {/* Image side */}
        <div
          className="group/thumb relative rounded-xl overflow-hidden bg-deep-purple/30 aspect-[4/3]"
          style={reverse ? { direction: "ltr" } : undefined}
        >
          {/* Thumbnail */}
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lavender/30 to-sakura-pink/20">
              <span className="font-display text-6xl text-soft-white/30">{project.title[0]}</span>
            </div>
          )}

          {/* Hover tint */}
          <div className="absolute inset-0 bg-hot-pink/0 group-hover/thumb:bg-hot-pink/10 transition-all duration-500" />

          {/* Halftone overlay on hover */}
          <div className="halftone-bg absolute inset-0 opacity-0 group-hover/thumb:opacity-30 transition-opacity duration-500 pointer-events-none" />

          {/* Category badge on image */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="font-body text-[10px] font-bold uppercase tracking-widest bg-dark-navy/70 backdrop-blur-sm text-soft-white px-2 py-1 rounded-full">
              {categoryLabels[project.category]}
            </span>
          </div>
        </div>

        {/* Content side */}
        <div
          className="flex flex-col gap-3"
          style={reverse ? { direction: "ltr" } : undefined}
        >
          {/* Category label */}
          <span
            className={`font-body text-xs font-bold uppercase tracking-widest ${categoryColor[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>

          {/* Title */}
          <h3 className="font-display text-2xl md:text-3xl text-dark-navy dark:text-soft-white leading-tight transition-colors duration-300">
            {project.title}
          </h3>

          {/* Summary */}
          <p className="font-body text-dark-navy/70 dark:text-soft-white/70 leading-relaxed transition-colors duration-300">
            {project.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-soft-white/10 text-soft-white/60 font-body text-xs border border-soft-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA button — with speed lines on hover */}
          <Link
            href={`/projects/${project.slug}`}
            className="group/cta inline-flex items-center gap-2 mt-3 w-fit px-6 py-2.5 rounded-full bg-hot-pink text-soft-white font-body font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,96,144,0.5)] relative overflow-hidden"
          >
            {/* Speed lines — hidden until hover */}
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-[3px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-200 pointer-events-none"
              aria-hidden="true"
            >
              {[10, 6, 4].map((w, i) => (
                <span
                  key={i}
                  className="block bg-soft-white/40 rounded-full"
                  style={{ width: w, height: 1.5 }}
                />
              ))}
            </span>
            View Case Study
            <span
              className="transition-transform duration-200 group-hover/cta:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
