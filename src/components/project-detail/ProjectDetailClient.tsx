"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projects, categoryLabels } from "@/data/projects";
import ParallaxShapes from "./ParallaxShapes";
import ImageLightbox from "./ImageLightbox";
import ProjectNav from "./ProjectNav";

/* ---- Category tag color map ---- */
const categoryBg: Record<Project["category"], string> = {
  uxui: "bg-sakura-pink/20 text-magenta-deep dark:text-sakura-pink border-sakura-pink/30",
  programming: "bg-sky-cyan/20 text-cyan-deep dark:text-sky-cyan border-sky-cyan/30",
  "ci-art": "bg-mint/20 text-mint-deep dark:text-mint border-mint/30",
  game: "bg-retro-yellow/20 text-yellow-deep dark:text-retro-yellow border-retro-yellow/30",
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
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
      <span
        className="font-display text-6xl md:text-7xl leading-none select-none"
        style={{
          background: "linear-gradient(135deg, #FF2D78 0%, #B026FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.25,
        }}
      >
        {n}
      </span>
      {extra}
    </div>
  );
}


/* ---- Gallery grid with lightbox ---- */
function GalleryGrid({
  images,
  onOpen,
}: {
  images: string[];
  onOpen: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((img, idx) => (
        <motion.button
          key={idx}
          className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-vinyl-dark/15 dark:border-soft-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-hot-pink/50"
          onClick={() => onOpen(idx)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={img}
            alt={`Image ${idx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none" />
          <div className="absolute inset-0 bg-hot-pink/0 group-hover:bg-hot-pink/10 transition-colors duration-300 flex items-center justify-center">
            <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/70 px-4 py-2 rounded-full backdrop-blur-sm">
              View Full Size ✦
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

/* ---- Main Component ---- */
export default function ProjectDetailClient({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const galleryImages = project.gallery ?? [];
  const sectionImages = (project.sections || []).map((s) => s.image).filter(Boolean) as string[];
  const allLightboxImages = Array.from(new Set([...galleryImages, ...sectionImages]));

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  // Parse result into Solution and Impact lines
  const resultLines = (project.result || "").split("\n").filter(Boolean);

  return (
    <main className="relative min-h-screen bg-soft-white dark:bg-dark-navy overflow-hidden">
      <ParallaxShapes />

      {/* ── Back navigation ── */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-24 flex items-center gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sakura-pink/10 border border-sakura-pink/30 font-body text-sm text-magenta-deep dark:text-sakura-pink hover:bg-sakura-pink/20 transition-all duration-300"
        >
          <span>←</span>
          <span>All Projects</span>
        </Link>
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-vinyl-dark/5 dark:bg-soft-white/5 border border-vinyl-dark/15 dark:border-soft-white/10 font-body text-sm text-deep-navy/70 dark:text-soft-white/70 hover:text-deep-navy dark:hover:text-soft-white hover:bg-vinyl-dark/10 dark:hover:bg-soft-white/10 transition-all duration-300"
        >
          <span>Home</span>
        </Link>
      </div>

      {/* ── Hero Banner ── */}
      <section
        className="relative w-full mt-6 overflow-hidden md:rounded-3xl md:mx-auto md:max-w-6xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" }}
      >
        <div className="aspect-[21/9] md:aspect-[21/7] relative">
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-sakura-pink/20 to-sky-cyan/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-8xl md:text-9xl text-deep-navy/10 dark:text-soft-white/10 select-none">
                  {project.title[0]}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-vinyl-dark/70 via-vinyl-dark/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 via-dark-navy/20 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-zen text-xs text-neon-magenta/80 tracking-[0.25em] mb-2 uppercase">
              プロジェクト ✦ CASE STUDY
            </p>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl text-soft-white leading-tight drop-shadow-lg"
              style={{
                WebkitTextStroke: "0.5px rgba(255,255,255,0.15)",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}
            >
              {project.title}
            </h1>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-12" aria-hidden="true">
            <path d="M0 48 L1440 12 L1440 48 Z" fill="#0D0D1A" />
            <path d="M0 48 L1440 20 L1440 48 Z" fill="#1A1A2E" opacity="0.5" />
          </svg>
        </div>
      </section>

      {/* ── Project Info & Action Links ── */}
      <FadeSection delay={0.1} className="relative z-10 mx-auto max-w-5xl px-6 mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="font-body text-sm text-lilac-bright font-bold">{project.date}</span>
            <span className={`inline-block px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border ${categoryBg[project.category]}`}>
              {categoryLabels[project.category]}
            </span>
          </div>

          {/* Action Links (Live demo / Video / GitHub) */}
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-neon-magenta to-electric-blue text-white font-body text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,45,120,0.3)]"
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>
            )}
            {project.videoUrl && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-retro-yellow text-dark-navy font-body text-xs font-bold uppercase tracking-wider hover:bg-retro-yellow/90 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(240,208,64,0.3)]"
              >
                <span>Video Demo</span>
                <span>▶</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-vinyl-dark text-soft-white border border-soft-white/20 font-body text-xs font-bold uppercase tracking-wider hover:border-neon-teal hover:scale-105 transition-all duration-300"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full bg-deep-purple/40 dark:bg-deep-purple/60 text-deep-navy/80 dark:text-soft-white/80 border border-vinyl-dark/15 dark:border-soft-white/10 font-body text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-hot-pink/40"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bento Metrics Bar */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {project.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-vinyl-dark/5 dark:bg-soft-white/5 border border-vinyl-dark/10 dark:border-soft-white/10 hover:border-hot-pink/30 transition-all duration-300"
              >
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-deep-navy/60 dark:text-soft-white/60 block mb-1">
                  {item.label}
                </span>
                <span className="font-display text-lg md:text-2xl text-neon-magenta font-bold block leading-tight">
                  {item.value}
                </span>
                {item.detail && (
                  <span className="font-body text-xs text-deep-navy/60 dark:text-soft-white/60 block mt-1">
                    {item.detail}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </FadeSection>

      <div className="mx-auto max-w-5xl px-6 mt-8">
        <div className="h-px bg-gradient-to-r from-transparent via-vinyl-dark/15 dark:via-soft-white/10 to-transparent" />
      </div>

      {/* ── MAIN CONTENT SECTIONS (DYNAMIC OR FALLBACK) ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {project.sections && project.sections.length > 0 ? (
          project.sections.map((section, sIdx) => {
            const badgeText = section.badge || String(sIdx + 1).padStart(2, "0");
            const numPart = badgeText.split(" ")[0];
            const restBadge = badgeText.includes(" ") ? badgeText.slice(badgeText.indexOf(" ") + 1) : null;
            return (
              <div key={sIdx}>
                <FadeSection delay={0.05} className="py-14">
                  <SectionNumber
                    n={numPart}
                    extra={
                      restBadge ? (
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-neon-magenta px-3 py-1 rounded-full bg-neon-magenta/10 border border-neon-magenta/30">
                          {restBadge}
                        </span>
                      ) : undefined
                    }
                  />
                  <h2 className="font-display text-3xl md:text-4xl text-deep-navy dark:text-soft-white mb-2 -mt-2">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="font-body text-sm md:text-base text-neon-magenta dark:text-lilac-bright font-medium mb-6">
                      {section.subtitle}
                    </p>
                  )}

                  {section.content && (
                    <div className="prose dark:prose-invert max-w-none mb-6 font-body text-base md:text-lg text-deep-navy/80 dark:text-soft-white/80 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  )}

                  {/* Embedded Context Image */}
                  {section.image && (
                    <div className="my-8 overflow-hidden rounded-2xl border border-vinyl-dark/15 dark:border-soft-white/10 bg-deep-purple/30 group">
                      <div
                        className="relative aspect-video md:aspect-[21/9] w-full cursor-pointer overflow-hidden"
                        onClick={() => {
                          const idx = allLightboxImages.indexOf(section.image!);
                          if (idx !== -1) openLightbox(idx);
                        }}
                      >
                        <Image
                          src={section.image}
                          alt={section.imageCaption || section.title}
                          fill
                          className="object-cover object-top hover:scale-[1.01] transition-transform duration-500"
                          sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-hot-pink/0 group-hover:bg-hot-pink/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                          <span className="font-body text-xs text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/70 px-4 py-2 rounded-full backdrop-blur-sm">
                            View Image ✦
                          </span>
                        </div>
                      </div>
                      {section.imageCaption && (
                        <div className="p-3 md:p-4 bg-vinyl-dark/5 dark:bg-soft-white/5 border-t border-vinyl-dark/10 dark:border-soft-white/10 flex items-center justify-between text-xs text-deep-navy/70 dark:text-soft-white/70">
                          <span>✦ {section.imageCaption}</span>
                          <span className="font-mono text-[10px] uppercase text-neon-magenta">Screenshot</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Items breakdown (grid or cards) */}
                  {section.items && section.items.length > 0 && (
                    <div
                      className={`grid gap-4 mt-6 ${
                        section.type === "cards"
                          ? "grid-cols-1 md:grid-cols-3"
                          : "grid-cols-1 md:grid-cols-2"
                      }`}
                    >
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-6 rounded-2xl bg-vinyl-dark/5 dark:bg-soft-white/5 border border-vinyl-dark/10 dark:border-soft-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-hot-pink/30 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              {item.tag && (
                                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neon-magenta px-2.5 py-0.5 rounded-full bg-neon-magenta/10 border border-neon-magenta/20">
                                  {item.tag}
                                </span>
                              )}
                              {item.metrics && (
                                <span className="font-mono text-xs font-bold text-electric-blue dark:text-sky-cyan">
                                  {item.metrics}
                                </span>
                              )}
                            </div>
                            <h3 className="font-display text-lg text-deep-navy dark:text-soft-white mb-1">
                              {item.title}
                            </h3>
                            {item.subtitle && (
                              <p className="font-body text-xs text-neon-magenta/80 dark:text-lilac-bright/80 font-medium mb-2">
                                {item.subtitle}
                              </p>
                            )}
                            <p className="font-body text-sm text-deep-navy/70 dark:text-soft-white/70 leading-relaxed whitespace-pre-line">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FadeSection>
                <div className="h-px bg-gradient-to-r from-transparent via-vinyl-dark/15 dark:via-soft-white/10 to-transparent" />
              </div>
            );
          })
        ) : (
          <>
            {/* ── 01 OVERVIEW ── */}
            <FadeSection delay={0} className="py-14">
              <SectionNumber n="01" />
              <h2 className="font-display text-3xl md:text-4xl text-deep-navy dark:text-soft-white mb-6 -mt-2">
                Project Overview
              </h2>
              <p className="font-body text-base md:text-lg text-deep-navy/80 dark:text-soft-white/80 leading-relaxed">
                {project.summary}
              </p>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-vinyl-dark/15 dark:via-soft-white/10 to-transparent" />

            {/* ── 02 THE PROBLEM ── */}
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="02" extra={<span className="font-display text-sm text-hot-pink font-bold">!?</span>} />
              <h2 className="font-display text-3xl md:text-4xl text-deep-navy dark:text-soft-white mb-6 -mt-2">
                The Problem & Challenge
              </h2>
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-soft-white/80 to-sakura-pink/10 dark:from-deep-purple/30 dark:to-vinyl-dark/50 border border-sakura-pink/20 dark:border-soft-white/10 shadow-sm">
                <p className="font-body text-base md:text-lg text-deep-navy/80 dark:text-soft-white/80 leading-relaxed">
                  {project.problem}
                </p>
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-vinyl-dark/15 dark:via-soft-white/10 to-transparent" />

            {/* ── 03 PROCESS & ARCHITECTURE ── */}
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="03" />
              <h2 className="font-display text-3xl md:text-4xl text-deep-navy dark:text-soft-white mb-6 -mt-2">
                Process & Architecture
              </h2>
              <p className="font-body text-base md:text-lg text-deep-navy/80 dark:text-soft-white/80 leading-relaxed mb-8">
                {project.process}
              </p>

              {/* Detailed Phases */}
              {project.phases && project.phases.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {project.phases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-vinyl-dark/5 dark:bg-soft-white/5 border border-vinyl-dark/10 dark:border-soft-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-hot-pink/30"
                    >
                      <span className="font-mono text-xs font-bold text-neon-magenta tracking-widest block mb-2">
                        PHASE {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg text-deep-navy dark:text-soft-white mb-2">
                        {phase.title}
                      </h3>
                      <p className="font-body text-sm text-deep-navy/70 dark:text-soft-white/70 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-vinyl-dark/15 dark:via-soft-white/10 to-transparent" />

            {/* ── 04 THE SOLUTION & RESULTS ── */}
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="04" />
              <h2 className="font-display text-3xl md:text-4xl text-deep-navy dark:text-soft-white mb-6 -mt-2">
                The Solution & Results
              </h2>
              <div className="space-y-4">
                {resultLines.map((line, idx) => {
                  const colonIndex = line.indexOf(":");
                  const hasColon = colonIndex !== -1;
                  const prefix = hasColon ? line.slice(0, colonIndex).trim() : "";
                  const rest = hasColon ? line.slice(colonIndex + 1).trim() : line.trim();
                  return (
                    <div
                      key={idx}
                      className="p-5 md:p-6 rounded-xl bg-vinyl-dark/5 dark:bg-soft-white/5 border-l-4 border-l-neon-magenta border-vinyl-dark/10 dark:border-soft-white/10"
                    >
                      {hasColon ? (
                        <>
                          <span className="font-display text-base text-neon-magenta block mb-1">
                            {prefix}
                          </span>
                          <p className="font-body text-base text-deep-navy/80 dark:text-soft-white/80 leading-relaxed">
                            {rest}
                          </p>
                        </>
                      ) : (
                        <p className="font-body text-base text-deep-navy/80 dark:text-soft-white/80 leading-relaxed">
                          {line}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-vinyl-dark/15 dark:via-soft-white/10 to-transparent" />
          </>
        )}

        {/* ── 05 FULL GALLERY ── */}
        {galleryImages.length > 0 && (
          <FadeSection delay={0.05} className="py-14">
            <SectionNumber n="05" />
            <h2 className="font-display text-3xl md:text-4xl text-deep-navy dark:text-soft-white mb-6 -mt-2">
              Visual Showcase & Gallery
            </h2>
            <GalleryGrid images={galleryImages} onOpen={openLightbox} />
          </FadeSection>
        )}

        {/* ── Prev / Next Navigation ── */}
        <ProjectNav projects={projects} currentIndex={currentIndex >= 0 ? currentIndex : 0} />
      </div>

      {/* ── Lightbox Modal ── */}
      <ImageLightbox
        images={allLightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}
