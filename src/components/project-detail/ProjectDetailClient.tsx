"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projects, categoryLabels } from "@/data/projects";
import ParallaxShapes from "./ParallaxShapes";
import ImageLightbox from "./ImageLightbox";
import ProjectNav from "./ProjectNav";

/* ---- Category tag color map ---- */
const categoryBg: Record<Project["category"], string> = {
  uxui: "bg-sakura-pink/20 text-sakura-pink border-sakura-pink/30",
  programming: "bg-sky-cyan/20 text-sky-cyan border-sky-cyan/30",
  "ci-art": "bg-mint/20 text-mint border-mint/30",
};

/* ---- Fade-in wrapper ---- */
function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---- Manga section number ---- */
function SectionNumber({ n, extra }: { n: string; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-display text-6xl md:text-7xl leading-none text-soft-white/10 select-none">
        {n}
      </span>
      {extra}
    </div>
  );
}

/* ---- "!?" speech bubble ---- */
function ImpactBubble() {
  return (
    <svg viewBox="0 0 52 32" width={52} height={32} aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="50" height="26" rx="6" fill="#FF2D78" opacity="0.18" stroke="#FF2D78" strokeWidth="1.5" strokeOpacity="0.6" />
      <text x="26" y="19" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="14" fill="#FF2D78" opacity="0.9">!?</text>
      {/* tail */}
      <polygon points="10,27 18,27 12,32" fill="#FF2D78" opacity="0.6" />
    </svg>
  );
}

/* ---- Content section block ---- */
function ContentSection({
  title,
  content,
  number,
  delay = 0,
  extra,
}: {
  title: string;
  content: string;
  number: string;
  delay?: number;
  extra?: React.ReactNode;
}) {
  return (
    <FadeSection delay={delay} className="py-14">
      <div className="mx-auto max-w-3xl">
        <SectionNumber n={number} extra={extra} />
        <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
          {title}
        </h2>
        <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed">
          {content}
        </p>
      </div>
    </FadeSection>
  );
}

/* ---- Main Component ---- */
export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);

  const galleryImages =
    project.gallery.length > 0
      ? project.gallery
      : [
          "/placeholder-1.webp",
          "/placeholder-2.webp",
          "/placeholder-3.webp",
          "/placeholder-4.webp",
        ];

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <main className="relative min-h-screen bg-dark-navy overflow-hidden">
      <ParallaxShapes />

      {/* ── Back to Works link ── */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-soft-white/5 border border-soft-white/10 font-body text-sm text-soft-white/70 hover:text-soft-white hover:bg-soft-white/10 hover:border-soft-white/20 transition-all duration-300"
        >
          <span>←</span>
          <span>Back to Works</span>
        </Link>
      </div>

      {/* ── Hero Banner ── */}
      <section
        className="relative w-full mt-6 overflow-hidden md:rounded-3xl md:mx-auto md:max-w-6xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" }}
      >
        <div className="aspect-[21/9] md:aspect-[21/7] relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-sakura-pink/20 to-sky-cyan/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-8xl md:text-9xl text-soft-white/10 select-none">
                {project.title[0]}
              </span>
            </div>
          </div>

          {/* Manga gradient overlay: vinyl-dark/70 → transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-vinyl-dark/70 via-vinyl-dark/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 via-dark-navy/20 to-transparent" />

          {/* Title overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Japanese decorative text */}
            <p className="font-zen text-xs text-neon-magenta/60 tracking-[0.25em] mb-2 uppercase">
              プロジェクト
            </p>
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-soft-white leading-tight drop-shadow-lg"
              style={{
                WebkitTextStroke: "0.5px rgba(255,255,255,0.15)",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}
            >
              {project.title}
            </h1>
          </motion.div>
        </div>

        {/* Comic diagonal cut SVG at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-12" aria-hidden="true">
            <path d="M0 48 L1440 12 L1440 48 Z" fill="#0D0D1A" />
            <path d="M0 48 L1440 20 L1440 48 Z" fill="#1A1A2E" opacity="0.5" />
          </svg>
        </div>
      </section>

      {/* ── Project Info Header ── */}
      <FadeSection delay={0.1} className="relative z-10 mx-auto max-w-5xl px-6 mt-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4">
          <span className="font-body text-sm text-muted-lilac font-bold">{project.date}</span>
          <span
            className={`inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border ${categoryBg[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* 3D-style tech stack pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full bg-deep-purple/60 text-soft-white/80 border border-soft-white/10 font-body text-xs font-medium transition-all duration-200 hover:bg-deep-purple/80 hover:text-soft-white hover:-translate-y-0.5"
              style={{
                filter: "drop-shadow(2px 2px 0 rgba(0,0,0,0.4))",
                transform: "perspective(300px) rotateX(-4deg)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLSpanElement).style.transform = "perspective(300px) rotateX(0deg) translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLSpanElement).style.transform = "perspective(300px) rotateX(-4deg)";
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </FadeSection>

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-6 mt-8">
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
      </div>

      {/* ── Content Sections ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <ContentSection title="Overview"     content={project.summary} number="01" delay={0} />
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
        <ContentSection title="The Problem"  content={project.problem} number="02" delay={0.05} extra={<ImpactBubble />} />
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
        <ContentSection title="The Process"  content={project.process} number="03" delay={0.05} />
      </div>

      {/* ── Image Gallery ── */}
      <FadeSection className="relative z-10 py-16">
        <div className="mx-auto max-w-5xl px-6 mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-soft-white">Gallery</h2>
        </div>
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {galleryImages.map((_img, idx) => (
            <motion.button
              key={idx}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-hot-pink/50 focus:ring-offset-2 focus:ring-offset-dark-navy"
              onClick={() => openLightbox(idx)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lavender/15 to-sakura-pink/10 group-hover:from-lavender/25 group-hover:to-sakura-pink/20 transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-display text-4xl text-soft-white/20 block mb-1">✦</span>
                    <span className="font-body text-xs text-soft-white/30">Screenshot {idx + 1}</span>
                  </div>
                </div>
              </div>
              {/* Halftone overlay on hover */}
              <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none" />
              {/* Pink tint hover */}
              <div className="absolute inset-0 bg-hot-pink/0 group-hover:bg-hot-pink/10 transition-colors duration-300 flex items-center justify-center">
                <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  View Full Size
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </FadeSection>

      {/* ── The Result ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
        <ContentSection title="The Solution" content={project.result} number="04" delay={0.05} />
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16">
        <ProjectNav projects={projects} currentIndex={currentIndex} />
      </div>

      <ImageLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}
