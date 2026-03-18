"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categoryLabels } from "@/data/projects";
import type { Project } from "@/data/projects";

const filters = [
  { key: "all", label: "All" },
  { key: "uxui", label: "UX/UI" },
  { key: "programming", label: "Programming" },
  { key: "ci-art", label: "CI Art" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

/* Category pill color map */
const categoryColor: Record<Project["category"], string> = {
  uxui: "text-sakura-pink",
  programming: "text-sky-cyan",
  "ci-art": "text-mint",
};

export default function Works() {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

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
        {/* Section heading */}
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center mb-4 text-soft-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          Projects I&apos;m Proud Of
        </motion.h2>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16 mt-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative px-5 py-2 rounded-full font-body text-sm font-bold transition-all duration-300 ${
                active === f.key
                  ? "bg-hot-pink text-soft-white shadow-[0_0_20px_rgba(255,96,144,0.4)]"
                  : "bg-transparent text-muted-lilac border border-muted-lilac/40 hover:border-soft-white/60 hover:text-soft-white"
              }`}
            >
              {f.label}
              {active === f.key && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full bg-hot-pink -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={idx}
                reverse={idx % 2 !== 0}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---- Project Card ---- */

function ProjectCard({
  project,
  index,
  reverse,
}: {
  project: Project;
  index: number;
  reverse: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative"
    >
      {/* Large number watermark */}
      <span
        className={`absolute -top-6 ${
          reverse ? "right-0 md:right-8" : "left-0 md:left-8"
        } font-display text-[120px] md:text-[180px] leading-none text-lavender/20 select-none pointer-events-none z-0`}
      >
        {number}
      </span>

      {/* Card content grid */}
      <div
        className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
          reverse ? "md:direction-rtl" : ""
        }`}
        style={reverse ? { direction: "rtl" } : undefined}
      >
        {/* Image side */}
        <div
          className="group relative rounded-2xl overflow-hidden bg-deep-purple/30 aspect-[4/3]"
          style={reverse ? { direction: "ltr" } : undefined}
        >
          {/* Placeholder with project initial */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lavender/30 to-sakura-pink/20">
            <span className="font-display text-6xl text-soft-white/30">
              {project.title[0]}
            </span>
          </div>
          {/* Hover scale overlay */}
          <div className="absolute inset-0 bg-hot-pink/0 group-hover:bg-hot-pink/10 transition-all duration-500" />
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />

          {/* Comic starburst on hover */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-50">
            <span className="inline-block bg-retro-yellow text-dark-navy font-display text-xs px-3 py-1 rounded-full shadow-md rotate-[-6deg]">
              NEW! ✦
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
          <h3 className="font-display text-2xl md:text-3xl text-soft-white leading-tight">
            {project.title}
          </h3>

          {/* Summary */}
          <p className="font-body text-soft-white/70 leading-relaxed">
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

          {/* CTA button */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 mt-3 w-fit px-6 py-2.5 rounded-full bg-hot-pink text-soft-white font-body font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,96,144,0.5)]"
          >
            View Case Study
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
