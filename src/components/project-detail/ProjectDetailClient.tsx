"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  game: "bg-retro-yellow/20 text-retro-yellow border-retro-yellow/30",
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

/* ---- "!?" speech bubble ---- */
function ImpactBubble() {
  return (
    <svg viewBox="0 0 52 32" width={52} height={32} aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="50" height="26" rx="6" fill="#FF2D78" opacity="0.18" stroke="#FF2D78" strokeWidth="1.5" strokeOpacity="0.6" />
      <text x="26" y="19" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="14" fill="#FF2D78" opacity="0.9">!?</text>
      <polygon points="10,27 18,27 12,32" fill="#FF2D78" opacity="0.6" />
    </svg>
  );
}

/* ---- Image placeholder (for missing images) ---- */
function ImgPlaceholder({ filename, className = "" }: { filename: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-deep-purple/30 border border-dashed border-soft-white/20 rounded-xl ${className}`}>
      <span className="font-display text-3xl text-soft-white/10 mb-2">?</span>
      <span className="font-body text-xs text-soft-white/30 text-center px-2 break-all">{filename}</span>
    </div>
  );
}

/* ---- Gallery grid with lightbox ---- */
function GalleryGrid({
  images,
  onOpen,
  indexOffset = 0,
}: {
  images: string[];
  onOpen: (i: number) => void;
  indexOffset?: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {images.map((img, idx) => (
        <motion.button
          key={idx}
          className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-hot-pink/50"
          onClick={() => onOpen(indexOffset + idx)}
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
            <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">
              View Full Size
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

/* ---- Sub-section heading ---- */
function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-xl md:text-2xl text-neon-magenta mb-4 mt-10">
      {children}
    </h3>
  );
}

/* ---- Main Component ---- */
export default function ProjectDetailClient({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);

  const isChaodom = project.slug === "chao-dom";

  function openLightbox(images: string[], index: number) {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  /* ---- Chaodom-specific image sets ---- */
  const galleryImages = project.gallery;

  // Placeholder helper — renders placeholder if no real images defined
  const placeholderSet = (prefix: string, count: number) =>
    Array.from({ length: count }, (_, i) => `${prefix}-${i + 1}.png`);

  return (
    <main className="relative min-h-screen bg-dark-navy overflow-hidden">
      <ParallaxShapes />

      {/* ── Back navigation ── */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-24 flex items-center gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sakura-pink/10 border border-sakura-pink/30 font-body text-sm text-sakura-pink hover:bg-sakura-pink/20 transition-all duration-300"
        >
          <span>←</span>
          <span>All Projects</span>
        </Link>
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-soft-white/5 border border-soft-white/10 font-body text-sm text-soft-white/70 hover:text-soft-white hover:bg-soft-white/10 hover:border-soft-white/20 transition-all duration-300"
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
                <span className="font-display text-8xl md:text-9xl text-soft-white/10 select-none">{project.title[0]}</span>
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
          <span className={`inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border ${categoryBg[project.category]}`}>
            {categoryLabels[project.category]}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full bg-deep-purple/60 text-soft-white/80 border border-soft-white/10 font-body text-xs font-medium transition-all duration-200 hover:bg-deep-purple/80 hover:text-soft-white hover:-translate-y-0.5"
              style={{ filter: "drop-shadow(2px 2px 0 rgba(0,0,0,0.4))", transform: "perspective(300px) rotateX(-4deg)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.transform = "perspective(300px) rotateX(0deg) translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.transform = "perspective(300px) rotateX(-4deg)"; }}
            >
              {tech}
            </span>
          ))}
        </div>
      </FadeSection>

      <div className="mx-auto max-w-5xl px-6 mt-8">
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
      </div>

      {/* ════════════════════════════════════════
          01 OVERVIEW
      ════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <FadeSection delay={0} className="py-14">
          <SectionNumber n="01" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">Overview</h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed">{project.summary}</p>

          {isChaodom && (
            <>
              <SubHeading>App Screens Overview</SubHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {placeholderSet("/images/Project/Chaodom/preview-overview", 4).map((src, i) => (
                  <ImgPlaceholder key={i} filename={src} className="aspect-[9/16] min-h-[160px]" />
                ))}
              </div>
            </>
          )}
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            02 THE PROBLEM
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="02" extra={<ImpactBubble />} />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">The Problem</h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed">{project.problem}</p>

          {isChaodom && (
            <>
              <SubHeading>Pain Points</SubHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "ข้อมูลออนไลน์ไม่อัปเดต ราคาและสถานะห้องไม่ตรงความจริง",
                  "ติดต่อเจ้าของหอออนไลน์แล้วถูกปฏิเสธ",
                  "ต้องลงพื้นที่สำรวจเองเพราะข้อมูลไม่น่าเชื่อถือ",
                  "ระบบจองหอในสถาบันไม่โปร่งใส",
                  "รูปภาพประกาศไม่ตรงกับสภาพจริง",
                  "ข้อมูลการเดินทาง/ขนส่งสาธารณะไม่ครบ",
                  "ใช้เวลาหาหอนานถึง 1 วัน – 3 เดือน",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-soft-white/5 border border-soft-white/10 rounded-xl p-4">
                    <span className="font-display text-neon-magenta text-lg shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <p className="font-body text-sm text-soft-white/80 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              <SubHeading>Real User Story</SubHeading>
              <div className="relative bg-soft-white/5 border border-sakura-pink/30 rounded-2xl p-6 md:p-8">
                <div className="absolute -top-3 left-6 bg-sakura-pink text-dark-navy font-body text-xs font-bold px-3 py-1 rounded-full">
                  User Story
                </div>
                <p className="font-body text-base text-soft-white/80 leading-relaxed italic">
                  &ldquo;นางสาวภัชรธนสรณ์ — นักศึกษาใหม่ สจล. ใช้เวลากว่า 3 เดือนหาหอพัก เปิด RentHub, Google Maps, Facebook ทุกวัน แต่ข้อมูลไม่ตรงความจริง โทรหาเจ้าของหอถูกปฏิเสธซ้ำๆ สุดท้ายต้องนั่งรถไปดูพื้นที่จริงด้วยตัวเอง&rdquo;
                </p>
              </div>

              <SubHeading>Observation Photos</SubHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {placeholderSet("/images/Project/Chaodom/problem", 3).map((src, i) => (
                  <ImgPlaceholder key={i} filename={src} className="aspect-video" />
                ))}
              </div>
            </>
          )}
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            03 THE PROCESS
        ════════════════════════════════════════ */}
        <div className="py-14">
          <FadeSection delay={0.05}>
            <SectionNumber n="03" />
            <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">The Process</h2>
            <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed">{project.process}</p>
          </FadeSection>

          {project.phases && project.phases.length > 0 && (
            <div className="mt-12 space-y-8 mx-auto max-w-4xl">

              {/* Phase 1 */}
              {project.phases[0] && (
                <FadeSection delay={0.1} className="bg-soft-white/5 border border-soft-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-sakura-pink/30 hover:bg-soft-white/10 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-6 opacity-5 font-display text-8xl pointer-events-none group-hover:opacity-10 transition-all text-sakura-pink">1</div>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl md:text-3xl text-sakura-pink mb-3 group-hover:text-neon-magenta transition-colors duration-300">{project.phases[0].title}</h3>
                    <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">{project.phases[0].description}</p>
                    {isChaodom && (
                      <>
                        <p className="font-body text-sm text-soft-white/50 mt-6 mb-3">Preliminary Interview &amp; Observation</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {placeholderSet("/images/Project/Chaodom/phase1", 3).map((src, i) => (
                            <ImgPlaceholder key={i} filename={src} className="aspect-video" />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </FadeSection>
              )}

              {/* Phase 2 */}
              {project.phases[1] && (
                <FadeSection delay={0.15} className="bg-soft-white/5 border border-soft-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-sakura-pink/30 hover:bg-soft-white/10 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-6 opacity-5 font-display text-8xl pointer-events-none group-hover:opacity-10 transition-all text-sakura-pink">2</div>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl md:text-3xl text-sakura-pink mb-3 group-hover:text-neon-magenta transition-colors duration-300">{project.phases[1].title}</h3>
                    <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">{project.phases[1].description}</p>
                    {isChaodom && (
                      <>
                        <p className="font-body text-sm text-soft-white/50 mt-6 mb-3">Participant Profiles</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                          {[
                            { name: "โปเต้", age: "18", quote: "โทรหาหอหลายเจ้า แต่ถูกปฏิเสธตลอด" },
                            { name: "ฟ้าใส", age: "18", quote: "ข้อมูลออนไลน์ไม่ตรงกับสภาพจริง" },
                            { name: "ทัก", age: "19", quote: "หาหออยู่นาน 3 เดือนกว่าจะได้" },
                          ].map((u, i) => (
                            <div key={i} className="bg-soft-white/5 border border-soft-white/10 rounded-xl p-4 text-center">
                              <div className="w-12 h-12 rounded-full bg-neon-magenta/20 border border-neon-magenta/30 mx-auto mb-2 flex items-center justify-center font-display text-neon-magenta text-lg">{u.name[0]}</div>
                              <p className="font-display text-soft-white text-sm mb-1">{u.name} <span className="text-soft-white/40 font-body text-xs">อายุ {u.age}</span></p>
                              <p className="font-body text-xs text-soft-white/60 italic">&ldquo;{u.quote}&rdquo;</p>
                            </div>
                          ))}
                        </div>
                        <p className="font-body text-sm text-soft-white/50 mb-3">Interview Highlights</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                          {placeholderSet("/images/Project/Chaodom/phase2-interview", 3).map((src, i) => (
                            <ImgPlaceholder key={i} filename={src} className="aspect-video" />
                          ))}
                        </div>
                        <p className="font-body text-sm text-soft-white/50 mb-3">Observation Photos</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {placeholderSet("/images/Project/Chaodom/phase2-observation", 4).map((src, i) => (
                            <ImgPlaceholder key={i} filename={src} className="aspect-video" />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </FadeSection>
              )}

              {/* Phase 3 */}
              {project.phases[2] && (
                <FadeSection delay={0.2} className="bg-soft-white/5 border border-soft-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-sakura-pink/30 hover:bg-soft-white/10 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-6 opacity-5 font-display text-8xl pointer-events-none group-hover:opacity-10 transition-all text-sakura-pink">3</div>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl md:text-3xl text-sakura-pink mb-3 group-hover:text-neon-magenta transition-colors duration-300">Phase 3: Analysis &amp; Conceptual Design</h3>
                    <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">{project.phases[2].description}</p>
                    {isChaodom && (
                      <>
                        <p className="font-display text-soft-white/80 text-lg mt-8 mb-2">Persona: น้องเฟรช (The Dorm Seeker)</p>
                        <ImgPlaceholder filename="/images/Project/Chaodom/persona.png" className="w-full aspect-[4/3] mb-4" />
                        <div className="bg-soft-white/5 rounded-xl p-4 mb-6 font-body text-sm text-soft-white/70 leading-relaxed">
                          <strong className="text-soft-white">น้องเฟรช</strong> — นักศึกษาใหม่ สจล. อายุ 18 ปี มาจากต่างจังหวัด<br />
                          <em>&ldquo;อยากได้ข้อมูลหอที่ถูกต้อง ไม่ต้องเสียเวลาลงพื้นที่เองทุกครั้ง&rdquo;</em><br />
                          Goals: หาหอที่ปลอดภัย ราคาสมเหตุสมผล ใกล้สถาบัน | Pain: ข้อมูลไม่อัปเดต ติดต่อยาก
                        </div>
                        <p className="font-display text-soft-white/80 text-lg mb-2">Experience Map</p>
                        <ImgPlaceholder filename="/images/Project/Chaodom/experience-map.png" className="w-full aspect-[3/1] mb-3" />
                        <a
                          href="https://www.figma.com/board/JuVCLNLk0p9hTIH800cNDg/Experience-Map"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 font-body text-sm text-neon-magenta hover:bg-neon-magenta/20 transition-colors duration-200 mb-6"
                        >
                          View Full Experience Map →
                        </a>
                        <p className="font-display text-soft-white/80 text-lg mb-2">Pain &amp; Gain Analysis</p>
                        <p className="font-body text-sm text-soft-white/60 mb-3">กำหนด Pain and Gain Statements จากข้อมูลสัมภาษณ์ โหวต Priority เพื่อกำหนด Functional และ Usability Requirements</p>
                        <ImgPlaceholder filename="/images/Project/Chaodom/pain-gain.png" className="w-full aspect-video" />
                      </>
                    )}
                  </div>
                </FadeSection>
              )}

              {/* Phase 4 */}
              {project.phases[3] && (
                <FadeSection delay={0.25} className="bg-soft-white/5 border border-soft-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-sakura-pink/30 hover:bg-soft-white/10 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-6 opacity-5 font-display text-8xl pointer-events-none group-hover:opacity-10 transition-all text-sakura-pink">4</div>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl md:text-3xl text-sakura-pink mb-3 group-hover:text-neon-magenta transition-colors duration-300">Phase 4: Detailed Design &amp; Prototype</h3>
                    <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">{project.phases[3].description}</p>
                    {isChaodom && (
                      <>
                        <p className="font-display text-soft-white/80 text-lg mt-8 mb-2">UI Component Map</p>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {placeholderSet("/images/Project/Chaodom/ui-components", 4).map((src, i) => (
                            <ImgPlaceholder key={i} filename={src} className="aspect-video" />
                          ))}
                        </div>
                        <p className="font-display text-soft-white/80 text-lg mb-2">iOS Prototype Screens</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {placeholderSet("/images/Project/Chaodom/prototype", 8).map((src, i) => (
                            <ImgPlaceholder key={i} filename={src} className="aspect-[9/16]" />
                          ))}
                        </div>
                        <a
                          href="https://www.figma.com/proto/2nTtYi87yFHnPVftJ8BNt6/EasyDom"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sakura-pink/10 border border-sakura-pink/30 font-body text-sm text-sakura-pink hover:bg-sakura-pink/20 transition-colors duration-200"
                        >
                          Try Prototype in Figma →
                        </a>
                      </>
                    )}
                  </div>
                </FadeSection>
              )}

              {/* Phase 5 */}
              {project.phases[4] && (
                <FadeSection delay={0.3} className="bg-soft-white/5 border border-soft-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-sakura-pink/30 hover:bg-soft-white/10 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-6 opacity-5 font-display text-8xl pointer-events-none group-hover:opacity-10 transition-all text-sakura-pink">5</div>
                  <div className="relative z-10">
                    <h3 className="font-display text-2xl md:text-3xl text-sakura-pink mb-3 group-hover:text-neon-magenta transition-colors duration-300">{project.phases[4].title}</h3>
                    <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">{project.phases[4].description}</p>
                    {isChaodom && (
                      <>
                        <p className="font-body text-sm text-soft-white/60 mt-6 mb-4">Guerilla Usability Testing กับ 3 ผู้เข้าร่วม ใช้ 5 Task Cards, Thinking Aloud + Post-session Discussion</p>
                        <p className="font-display text-soft-white/80 text-lg mb-3">Task Cards</p>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                          {[
                            { n: "01", title: "รวบรวมหอพักที่ถูกใจ", sub: "Search + Filter + Wishlist" },
                            { n: "02", title: "เลือกหอพัก", sub: "Compare + Decision" },
                            { n: "03", title: "ติดต่อเจ้าของหอ", sub: "Verified Contact" },
                            { n: "04", title: "แจ้งปัญหาข้อมูลไม่อัปเดต", sub: "Report Issue" },
                            { n: "05", title: "เขียนรีวิวหอพัก", sub: "Write Review" },
                          ].map((card) => (
                            <div key={card.n} className="bg-soft-white/5 border border-soft-white/10 rounded-xl p-3 text-center">
                              <span className="font-display text-2xl text-neon-magenta/40">{card.n}</span>
                              <p className="font-body text-xs text-soft-white font-bold mt-1 mb-1">{card.title}</p>
                              <p className="font-body text-xs text-soft-white/50">{card.sub}</p>
                            </div>
                          ))}
                        </div>
                        <p className="font-display text-soft-white/80 text-lg mb-3">Testing Results — พบ 15+ จุดที่ต้องปรับปรุง</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "ปุ่มย้อนกลับพากลับหน้าหลักแทนหน้าค้นหา",
                            "ผลค้นหาบางหอไม่มีรูปภาพ",
                            "กดถูกใจตอบสนองช้า",
                            "แผนที่มี Bug",
                            "หา Tab Wishlist ไม่เจอ",
                            "ปุ่มติดต่อดูคล้ายไอคอนเมนูทั่วไป",
                            "ข้อมูลขนส่งสาธารณะไม่ชัดในแผนที่",
                          ].map((finding, i) => (
                            <div key={i} className="flex items-start gap-2 bg-retro-yellow/5 border border-retro-yellow/20 rounded-lg p-3">
                              <span className="text-retro-yellow text-sm shrink-0">⚠</span>
                              <p className="font-body text-sm text-soft-white/80">{finding}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </FadeSection>
              )}
            </div>
          )}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
      </div>

      {/* ════════════════════════════════════════
          04 VISUAL DESIGN PRINCIPLES (gallery)
      ════════════════════════════════════════ */}
      {galleryImages.length > 0 && (
        <FadeSection className="relative z-10 py-16">
          <div className="mx-auto max-w-5xl px-6 mb-8">
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
                04
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-soft-white -mt-2">
              Visual principles detail
            </h2>
            {isChaodom && (
              <p className="font-body text-sm text-soft-white/50 mt-2">UI Design Principles &amp; Visual Design Analysis</p>
            )}
          </div>
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <GalleryGrid
              images={galleryImages}
              onOpen={(i) => openLightbox(galleryImages, i)}
            />
          </div>
        </FadeSection>
      )}

      {/* ════════════════════════════════════════
          05 THE SOLUTION
      ════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="05" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">The Solution</h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed whitespace-pre-line">{project.result}</p>

          {isChaodom && (
            <>
              <SubHeading>Key Features</SubHeading>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {[
                  { icon: "🟢", label: "Real-time room availability" },
                  { icon: "🔍", label: "Advanced search & filters" },
                  { icon: "🗺", label: "Interactive map with transport" },
                  { icon: "⚖️", label: "Side-by-side comparison" },
                  { icon: "❤️", label: "Wishlist with notifications" },
                  { icon: "✅", label: "Verified owner contact" },
                  { icon: "⭐", label: "User reviews & ratings" },
                  { icon: "💬", label: "Customer support chat" },
                ].map((f, i) => (
                  <div key={i} className="bg-soft-white/5 border border-soft-white/10 rounded-xl p-3 text-center">
                    <span className="text-2xl">{f.icon}</span>
                    <p className="font-body text-xs text-soft-white/70 mt-2 leading-relaxed">{f.label}</p>
                  </div>
                ))}
              </div>
              <SubHeading>Final Prototype Showcase</SubHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {placeholderSet("/images/Project/Chaodom/solution", 5).map((src, i) => (
                  <ImgPlaceholder key={i} filename={src} className="aspect-[9/16]" />
                ))}
              </div>
            </>
          )}
        </FadeSection>

        {/* ════════════════════════════════════════
            06 IMPACT & RESULTS
        ════════════════════════════════════════ */}
        {isChaodom && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="06" />
              <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-8 -mt-2">Impact &amp; Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { stat: "3", label: "In-depth Interviews" },
                  { stat: "10+", label: "Prototype Screens" },
                  { stat: "15+", label: "Improvement Points" },
                  { stat: "5", label: "Weeks Full UX Process" },
                  { stat: "25+", label: "iOS UI Components" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-soft-white/5 border border-neon-magenta/20 rounded-2xl p-4 text-center"
                    style={{ boxShadow: "0 0 24px rgba(176,38,255,0.08)" }}
                  >
                    <p
                      className="font-display text-4xl md:text-5xl mb-1"
                      style={{
                        background: "linear-gradient(135deg, #FF2D78 0%, #B026FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.stat}
                    </p>
                    <p className="font-body text-xs text-soft-white/60 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="font-body text-base text-soft-white/70 leading-relaxed max-w-2xl">
                ผ่านกระบวนการ UX ครบวงจรใน 5 สัปดาห์ ตั้งแต่การวิจัยผู้ใช้จริง จนถึง Prototype iOS ที่ผ่าน Usability Testing พร้อมสรุปผลและข้อเสนอแนะการพัฒนาต่อ
              </p>
            </FadeSection>
          </>
        )}

        {/* ── Project Info Footer ── */}
        {isChaodom && (
          <>
            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
            <FadeSection delay={0.05} className="py-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Role</p>
                  <p className="font-body text-sm text-soft-white/80">Head Figma Design, Usability Testing, Documentation</p>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Team</p>
                  <p className="font-body text-sm text-soft-white/80">4 members</p>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-soft-white/5 border border-soft-white/10 font-body text-xs text-soft-white/60">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="https://www.figma.com/proto/2nTtYi87yFHnPVftJ8BNt6/EasyDom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sakura-pink/10 border border-sakura-pink/30 font-body text-sm text-sakura-pink hover:bg-sakura-pink/20 transition-colors duration-200"
                >
                  Figma Prototype →
                </a>
                <a
                  href="https://www.figma.com/board/JuVCLNLk0p9hTIH800cNDg/Experience-Map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 font-body text-sm text-neon-magenta hover:bg-neon-magenta/20 transition-colors duration-200"
                >
                  Experience Map →
                </a>
              </div>
            </FadeSection>
          </>
        )}
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16">
        <ProjectNav projects={projects} currentIndex={currentIndex} />
      </div>

      <ImageLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}
