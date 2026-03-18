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

/* ---- Content section block ---- */
function ContentSection({
  title,
  content,
  delay = 0,
}: {
  title: string;
  content: string;
  delay?: number;
}) {
  return (
    <FadeSection delay={delay} className="py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6">
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

  // Use gallery images if available, otherwise create placeholder entries
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
      {/* Parallax decorative shapes */}
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
      <section className="relative w-full mt-6 aspect-[21/9] md:aspect-[21/7] overflow-hidden rounded-none md:rounded-3xl md:mx-auto md:max-w-6xl md:px-0">
        {/* Placeholder hero background */}
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-sakura-pink/20 to-sky-cyan/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-8xl md:text-9xl text-soft-white/10 select-none">
              {project.title[0]}
            </span>
          </div>
        </div>

        {/* Gradient overlay — dark-navy/60 to transparent */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 via-dark-navy/30 to-transparent" />

        {/* Title overlay at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-soft-white leading-tight drop-shadow-lg">
            {project.title}
          </h1>
        </motion.div>
      </section>

      {/* ── Project Info Header ── */}
      <FadeSection delay={0.1} className="relative z-10 mx-auto max-w-5xl px-6 mt-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-4">
          {/* Date */}
          <span className="font-body text-sm text-muted-lilac font-bold">
            {project.date}
          </span>

          {/* Category tag */}
          <span
            className={`inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border ${categoryBg[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full bg-deep-purple/60 text-soft-white/80 border border-soft-white/10 font-body text-xs font-medium hover:bg-deep-purple/80 hover:text-soft-white transition-colors duration-200"
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
        <ContentSection
          title="Overview"
          content={project.summary}
          delay={0}
        />

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        <ContentSection
          title="The Problem"
          content={project.problem}
          delay={0.05}
        />

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        <ContentSection
          title="The Process"
          content={project.process}
          delay={0.05}
        />
      </div>

      {/* ── Image Gallery (full-bleed) ── */}
      <FadeSection className="relative z-10 py-16">
        <div className="mx-auto max-w-5xl px-6 mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-soft-white">
            Gallery
          </h2>
        </div>
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {galleryImages.map((img, idx) => (
            <motion.button
              key={idx}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-hot-pink/50 focus:ring-offset-2 focus:ring-offset-dark-navy"
              onClick={() => openLightbox(idx)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Placeholder gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-lavender/15 to-sakura-pink/10 group-hover:from-lavender/25 group-hover:to-sakura-pink/20 transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-display text-4xl text-soft-white/20 block mb-1">
                      ✦
                    </span>
                    <span className="font-body text-xs text-soft-white/30">
                      Screenshot {idx + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-hot-pink/0 group-hover:bg-hot-pink/10 transition-colors duration-300 flex items-center justify-center">
                <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  View Full Size
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </FadeSection>

      {/* ── The Solution / Result ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        <ContentSection
          title="The Solution"
          content={project.result}
          delay={0.05}
        />
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16">
        <ProjectNav projects={projects} currentIndex={currentIndex} />
      </div>

      {/* ── Image Lightbox ── */}
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
