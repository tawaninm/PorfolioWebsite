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
  const isPolygonMesh = project.slug === "polygon-mesh";
  const isVpsTycoon = project.slug === "vps-tycoon";

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
          01 OVERVIEW / LEARNING GOAL
      ════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <FadeSection delay={0} className="py-14">
          <SectionNumber n="01" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            {isPolygonMesh ? "Learning Goal" : isVpsTycoon ? "Project Pitch" : "Overview"}
          </h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed">{project.summary}</p>

          {isVpsTycoon && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { src: "/images/Project/vps-cover.png", label: "Cover Art" },
                { src: "/images/Project/vps-abstract.png", label: "Abstract" },
              ].map(({ src, label }, i) => (
                <motion.button
                  key={i}
                  className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-cyan/50"
                  onClick={() => openLightbox(["/images/Project/vps-cover.png", "/images/Project/vps-abstract.png"], i)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-sky-cyan/0 group-hover:bg-sky-cyan/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">{label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {isPolygonMesh && (
            <div className="mt-8 relative w-full overflow-hidden rounded-2xl" style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 97% 100%, 0 100%)" }}>
              <div className="aspect-[21/9] relative">
                <Image
                  src="/images/Project/preview-polygon-mesh.png"
                  alt="Multimedia Learning Polygon Mesh Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/60 via-transparent to-transparent" />
              </div>
            </div>
          )}

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
            02 THE PROBLEM / WHY THIS TOPIC IS HARD
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="02" extra={<ImpactBubble />} />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            {isPolygonMesh ? "Why This Topic Is Hard" : isVpsTycoon ? "The Challenge" : "The Problem"}
          </h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed">{project.problem}</p>

          {isVpsTycoon && (
            <div className="mt-8 relative bg-soft-white/5 border border-sky-cyan/30 rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="absolute -top-4 -right-4 font-display text-9xl text-sky-cyan/5 pointer-events-none select-none">!?</div>
              <div className="flex items-start gap-4">
                <ImpactBubble />
                <div>
                  <p className="font-display text-lg text-sky-cyan mb-2">Technical Depth vs. Playability</p>
                  <p className="font-body text-sm text-soft-white/75 leading-relaxed">
                    VPS hosting, rack management, และ VM allocation เป็นแนวคิดที่ technical มาก — ความท้าทายคือออกแบบให้ผู้เล่นทั่วไปเข้าใจ mechanic เหล่านี้ได้ทันที โดยยังคงความลึกของระบบที่ทำให้เกมน่าสนใจในระยะยาว
                  </p>
                </div>
              </div>
            </div>
          )}

          {isPolygonMesh && (
            <div className="mt-8 relative bg-soft-white/5 border border-hot-pink/30 rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="absolute -top-4 -right-4 font-display text-9xl text-hot-pink/5 pointer-events-none select-none">!?</div>
              <div className="flex items-start gap-4">
                <ImpactBubble />
                <div>
                  <p className="font-display text-lg text-hot-pink mb-2">Abstract by Nature</p>
                  <p className="font-body text-sm text-soft-white/75 leading-relaxed">
                    Polygon mesh เป็นแนวคิดที่ต้องเห็น ไม่ใช่แค่อ่าน — การเข้าใจว่า vertices เชื่อมกันเป็น edges แล้วกลายเป็น faces และ faces รวมกันสร้างวัตถุ 3D นั้นต้องการ interaction และ visual step-by-step ที่ text หรือ slide นิ่ง ๆ ให้ไม่ได้
                  </p>
                </div>
              </div>
            </div>
          )}

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
            03 THE PROCESS / INTERACTION DESIGN HIGHLIGHTS
        ════════════════════════════════════════ */}
        <div className="py-14">
          <FadeSection delay={0.05}>
            <SectionNumber n="03" />
            <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
              {isPolygonMesh ? "Interaction Design Highlights" : isVpsTycoon ? "Core Game Loop" : "The Process"}
            </h2>
            {!isPolygonMesh && !isVpsTycoon && (
              <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed">{project.process}</p>
            )}
          </FadeSection>

          {isVpsTycoon && (
            <FadeSection delay={0.1}>
              {/* Loop flow diagram */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 mb-10">
                {[
                  { icon: "📨", step: "Receive Request", sub: "Customer via Messenger" },
                  { icon: "⚙", step: "Allocate VM", sub: "CPU / RAM / Storage" },
                  { icon: "🚀", step: "Deploy", sub: "Assign to Rack Slot" },
                  { icon: "💰", step: "Earn Revenue", sub: "Money + Rating" },
                  { icon: "⬆", step: "Upgrade Systems", sub: "6 Skill Trees" },
                ].map((node, i, arr) => (
                  <div key={i} className="flex flex-col md:flex-row items-center">
                    <div className="flex flex-col items-center bg-soft-white/5 border border-sky-cyan/20 rounded-2xl px-5 py-4 min-w-[120px] text-center hover:border-sky-cyan/50 hover:bg-soft-white/8 transition-all duration-300">
                      <span className="text-2xl mb-1">{node.icon}</span>
                      <p className="font-display text-xs text-soft-white font-bold leading-tight mb-1">{node.step}</p>
                      <p className="font-body text-xs text-soft-white/50 leading-tight">{node.sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <span
                        className="font-display text-sky-cyan/40 text-2xl mx-2 rotate-90 md:rotate-0 my-1 md:my-0"
                        aria-hidden="true"
                      >→</span>
                    )}
                  </div>
                ))}
              </div>
              {/* Time system callout */}
              <div className="flex items-start gap-4 bg-soft-white/5 border border-retro-yellow/30 rounded-2xl p-5 mb-8">
                <span className="font-display text-3xl text-retro-yellow/70 shrink-0">⏱</span>
                <div>
                  <p className="font-display text-sm text-retro-yellow font-bold mb-1">Time System</p>
                  <p className="font-body text-sm text-soft-white/70 leading-relaxed">
                    30 วินาทีจริง = 1 วันในเกม — สร้างแรงกดดันให้ผู้เล่นตัดสินใจเร็ว จัดลำดับ request และบริหาร resource ก่อนสัญญาเช่าหมดอายุ
                  </p>
                </div>
              </div>
              {/* Loop images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { src: "/images/Project/vps-gameloop-core.png", label: "Core Loop Diagram" },
                  { src: "/images/Project/vps-gameloop-time.png", label: "Time System" },
                ].map(({ src, label }, i) => (
                  <motion.button
                    key={i}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-cyan/50"
                    onClick={() => openLightbox(["/images/Project/vps-gameloop-core.png", "/images/Project/vps-gameloop-time.png"], i)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-sky-cyan/0 group-hover:bg-sky-cyan/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">{label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </FadeSection>
          )}

          {isPolygonMesh && (
            <FadeSection delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: "◻", name: "2D Process Polygon", desc: "เรียนรู้การเกิด polygon ทีละขั้นใน 2D พร้อมควบคุม step ด้วยลูกศร next/back" },
                  { icon: "⚙", name: "2D Modify / Config", desc: "ปรับแต่ง properties ของ polygon 2D ผ่าน dropdown config แบบ interactive" },
                  { icon: "◈", name: "3D Process Polygon", desc: "ดูกระบวนการสร้าง polygon mesh ใน 3D พร้อม step-by-step navigation" },
                  { icon: "✦", name: "3D Config", desc: "ตั้งค่าโครงสร้าง 3D object และสำรวจรูปทรงในมุมมองต่างๆ" },
                  { icon: "◉", name: "Polygon Study → 3D Object", desc: "เชื่อมโยง polygon study กับ 3D object representation อย่างชัดเจน" },
                  { icon: "⬡", name: "Creating Polygon Mesh", desc: "แสดง hover explanation ให้เห็นว่า mesh เกิดขึ้นได้อย่างไร ทีละ face" },
                  { icon: "🧩", name: "Jigsaw Polygonal", desc: "ภาพรวม jigsaw menu และการเลือกโมเดล" },
                  { icon: "⟳", name: "Jigsaw Polygonal Game", desc: "ลากและประกอบชิ้นส่วน polygon แบบ draggable real-time บน Figma Site" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-4 bg-soft-white/5 border border-soft-white/10 rounded-2xl p-5 hover:border-neon-magenta/30 hover:bg-soft-white/8 transition-all duration-300">
                    <span className="font-display text-2xl text-neon-magenta/70 shrink-0 mt-0.5">{f.icon}</span>
                    <div>
                      <p className="font-display text-sm text-soft-white font-bold mb-1">{f.name}</p>
                      <p className="font-body text-xs text-soft-white/60 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "/images/Project/polygon-2d.png",
                  "/images/Project/polygon-3d.png",
                  "/images/Project/polygon-study.png",
                  "/images/Project/polygon-creating-mesh.png",
                ].map((img, i) => (
                  <motion.button
                    key={i}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-hot-pink/50"
                    onClick={() => openLightbox([
                      "/images/Project/polygon-2d.png",
                      "/images/Project/polygon-3d.png",
                      "/images/Project/polygon-study.png",
                      "/images/Project/polygon-creating-mesh.png",
                    ], i)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={img} alt={`Feature ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-hot-pink/0 group-hover:bg-hot-pink/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">View Full Size</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </FadeSection>
          )}

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

        {/* ════════════════════════════════════════
            04 CONTENT FLOW & BUILD PROCESS (polygon-mesh only)
        ════════════════════════════════════════ */}
        {isPolygonMesh && (
          <>
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="04" />
              <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">Content Flow &amp; Build Process</h2>
              <div className="space-y-4 mb-10">
                {[
                  { step: "01", title: "Home & Topic Navigation Design", desc: "ออกแบบหน้า home และระบบ topic navigation ให้ผู้เรียนเลือกเส้นทางการเรียนได้ง่าย ไม่สับสน" },
                  { step: "02", title: "2D/3D Content with Step Controls", desc: "แยกเนื้อหา 2D และ 3D พร้อมลูกศร next/back และ dropdown config เพื่อควบคุมการเรียนแบบ step-by-step ในแต่ละหัวข้อ" },
                  { step: "03", title: "Hover / Animation / Prototype Linking", desc: "ใช้ hover states, prototype linking และ while-hovering triggers เพื่อทำให้เนื้อหานิ่ง ๆ มีความเคลื่อนไหวและตอบสนองต่อผู้เรียน" },
                  { step: "04", title: "Jigsaw Game — Pen Tool + Plugins", desc: "สร้าง jigsaw game ด้วย Pen Tool ตัดชิ้นส่วน, Image Cutter สร้าง asset, Property Randomizer สุ่มตำแหน่งชิ้นส่วน — ให้ลากประกอบได้จริงบน Figma Site" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-5 bg-soft-white/5 border border-soft-white/10 rounded-2xl p-5 hover:border-sky-cyan/30 transition-all duration-300">
                    <span
                      className="font-display text-4xl leading-none shrink-0 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #00C2FF 0%, #B026FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        opacity: 0.7,
                      }}
                    >
                      {s.step}
                    </span>
                    <div>
                      <p className="font-display text-base text-soft-white mb-1">{s.title}</p>
                      <p className="font-body text-sm text-soft-white/60 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "/images/Project/polygon-home.png",
                  "/images/Project/polygon-2d-process.png",
                  "/images/Project/polygon-3d-process.png",
                ].map((img, i) => (
                  <motion.button
                    key={i}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-cyan/50"
                    onClick={() => openLightbox([
                      "/images/Project/polygon-home.png",
                      "/images/Project/polygon-2d-process.png",
                      "/images/Project/polygon-3d-process.png",
                    ], i)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={img} alt={`Process step ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-sky-cyan/0 group-hover:bg-sky-cyan/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">View Full Size</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

            {/* ════════════════════════════════════════
                05 JIGSAW GAME SHOWCASE (polygon-mesh only)
            ════════════════════════════════════════ */}
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="05" />
              <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">Jigsaw Polygonal Game</h2>
              <div
                className="relative bg-soft-white/5 border rounded-3xl p-6 md:p-8 mb-8 overflow-hidden"
                style={{ borderColor: "rgba(176,38,255,0.4)", boxShadow: "0 0 40px rgba(176,38,255,0.12), inset 0 0 40px rgba(176,38,255,0.04)" }}
              >
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ boxShadow: "0 0 60px rgba(255,45,120,0.08)" }}
                />
                <p className="font-display text-neon-magenta text-sm tracking-widest uppercase mb-4">★ Feature Highlight</p>
                <p className="font-body text-base text-soft-white/80 leading-relaxed mb-4">
                  Jigsaw Polygonal Game คือ highlight ของสื่อชุดนี้ — ผู้เรียนต้องลากและประกอบชิ้นส่วน polygon faces เข้าด้วยกันเพื่อสร้างโมเดล 3D ด้วยตัวเอง บน Figma Site แบบ real-time
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-body text-sm">
                  <div className="bg-soft-white/5 border border-neon-magenta/20 rounded-xl p-4">
                    <p className="text-neon-magenta font-bold mb-1">Pen Tool Cutting</p>
                    <p className="text-soft-white/60 text-xs">ตัดรูปทรง polygon จากโมเดลจริงด้วย Pen Tool เพื่อสร้างชิ้นส่วน jigsaw ที่แม่นยำ</p>
                  </div>
                  <div className="bg-soft-white/5 border border-neon-magenta/20 rounded-xl p-4">
                    <p className="text-neon-magenta font-bold mb-1">Property Randomizer</p>
                    <p className="text-soft-white/60 text-xs">ใช้ plugin สุ่มตำแหน่งและ rotation ของชิ้นส่วนแต่ละครั้ง ให้การเล่นไม่ซ้ำกัน</p>
                  </div>
                  <div className="bg-soft-white/5 border border-neon-magenta/20 rounded-xl p-4">
                    <p className="text-neon-magenta font-bold mb-1">Draggable Assembly</p>
                    <p className="text-soft-white/60 text-xs">ผู้เรียนลากชิ้นส่วนประกอบกลับเป็นโมเดล 3D ผ่าน Figma Site interaction โดยตรง</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "/images/Project/polygon-jigsaw-menu.png",
                  "/images/Project/polygon-jigsaw-game.png",
                ].map((img, i) => (
                  <motion.button
                    key={i}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 cursor-pointer focus:outline-none"
                    style={{ border: "1px solid rgba(176,38,255,0.3)", boxShadow: "0 0 24px rgba(176,38,255,0.1)" }}
                    onClick={() => openLightbox([
                      "/images/Project/polygon-jigsaw-menu.png",
                      "/images/Project/polygon-jigsaw-game.png",
                    ], i)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={img} alt={`Jigsaw ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-neon-magenta/0 group-hover:bg-neon-magenta/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">View Full Size</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

            {/* ════════════════════════════════════════
                06 SOLUTION & IMPACT (polygon-mesh only)
            ════════════════════════════════════════ */}
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="06" />
              <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">Solution &amp; Impact</h2>
              <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed whitespace-pre-line">{project.result}</p>

              {/* Challenges aside */}
              <div className="mt-10 relative bg-soft-white/5 border border-retro-yellow/30 rounded-2xl px-6 pb-6 pt-7">
                <div className="absolute -top-3 left-6 bg-retro-yellow text-dark-navy font-body text-xs font-bold px-3 py-1 rounded-full">Challenges</div>
                <p className="font-body text-sm text-soft-white/75 leading-relaxed">
                  ทำให้เรื่อง polygon mesh และ 3D object representation ซึ่งค่อนข้าง abstract เข้าใจง่ายขึ้นผ่าน interaction, animation, hover states, draggable pieces และ content flow ที่ผู้เรียนกดสำรวจได้เอง
                </p>
              </div>

              {/* Project info sidebar */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-8">
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Role</p>
                  <p className="font-body text-sm text-soft-white/80">Head Figma Design / Interactive Flow Design</p>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Tech Stack</p>
                  <div className="flex flex-col gap-1">
                    {project.techStack.map((t) => (
                      <span key={t} className="font-body text-xs text-soft-white/70">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Timeline</p>
                  <p className="font-body text-sm text-soft-white/80">1 Month</p>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Team</p>
                  <p className="font-body text-sm text-soft-white/80">3 Members</p>
                  <p className="font-body text-xs text-soft-white/40 mt-1">จตุรภัทร กิติมาโภคิน, ณัฐวุฒิ ทิพย์รัตน์, ธนัทภัทร พรหมทอง</p>
                </div>
              </div>

              {/* Link buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.figma.com/design/Vm96Pu8bVEtEyFFNmL69Di/Creating-polygon-mesh?node-id=0-1&p=f&t=ukoom1RoA8INKIcZ-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 font-body text-sm text-neon-magenta hover:bg-neon-magenta/20 transition-colors duration-200"
                >
                  Figma Editor →
                </a>
                <a
                  href="https://www.figma.com/proto/Vm96Pu8bVEtEyFFNmL69Di/Creating-polygon-mesh?node-id=0-1&t=mIUyTzYXFmO7Nbu3-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sakura-pink/10 border border-sakura-pink/30 font-body text-sm text-sakura-pink hover:bg-sakura-pink/20 transition-colors duration-200"
                >
                  Figma Prototype →
                </a>
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
          </>
        )}

        {/* ════════════════════════════════════════
            04 KEY SYSTEMS (vps-tycoon only)
        ════════════════════════════════════════ */}
        {isVpsTycoon && (
          <>
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="04" />
              <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">Key Systems</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: "🖥", name: "Rack Management", desc: "ซื้อ server และติดตั้งบน rack slot เพื่อขยาย capacity ของบริษัท" },
                  { icon: "⚙", name: "VM Specification Matching", desc: "จัดสรร CPU, RAM, Storage ให้ตรงกับ request spec ของลูกค้าแต่ละราย" },
                  { icon: "💬", name: "Messenger Request System", desc: "รับ customer requests ผ่านระบบ messenger แบบ real-time" },
                  { icon: "📈", name: "6 Skill Trees", desc: "Deploy · Networks · Security · Marketing · Management · Rack Slot — อัปเกรดได้อิสระ" },
                  { icon: "⚡", name: "Event System", desc: "random events ระหว่างช่วง rental สร้างแรงกดดันและ decision points" },
                  { icon: "💾", name: "Save / Load System", desc: "บันทึกและโหลดสถานะเกมเพื่อเล่นต่อได้ทุกเวลา" },
                  { icon: "⭐", name: "Rating Progression", desc: "rating บริษัทเพิ่ม/ลดตามคุณภาพ service — ส่งผลต่อ request tier" },
                ].map((sys, i) => (
                  <div key={i} className="flex items-start gap-4 bg-soft-white/5 border border-soft-white/10 rounded-2xl p-5 hover:border-sky-cyan/30 hover:bg-soft-white/8 transition-all duration-300">
                    <span className="text-2xl shrink-0 mt-0.5">{sys.icon}</span>
                    <div>
                      <p className="font-display text-sm text-soft-white font-bold mb-1">{sys.name}</p>
                      <p className="font-body text-xs text-soft-white/60 leading-relaxed">{sys.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { src: "/images/Project/vps-messenger.png", label: "Messenger" },
                  { src: "/images/Project/vps-rack.png", label: "Rack Management" },
                  { src: "/images/Project/vps-events.png", label: "Event System" },
                  { src: "/images/Project/vps-save-load.png", label: "Save / Load" },
                ].map(({ src, label }, i) => {
                  const imgs = ["/images/Project/vps-messenger.png", "/images/Project/vps-rack.png", "/images/Project/vps-events.png", "/images/Project/vps-save-load.png"];
                  return (
                    <motion.button
                      key={i}
                      className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-cyan/50"
                      onClick={() => openLightbox(imgs, i)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                      <div className="absolute inset-0 bg-sky-cyan/0 group-hover:bg-sky-cyan/10 transition-colors duration-300 flex items-center justify-center">
                        <span className="font-body text-xs text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-3 py-1.5 rounded-full backdrop-blur-sm">{label}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

            {/* ════════════════════════════════════════
                05 DEVELOPMENT PROCESS (vps-tycoon only)
            ════════════════════════════════════════ */}
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="05" />
              <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">Development Process</h2>
              <div className="space-y-4 mb-10">
                {(project.phases ?? []).map((phase, i) => (
                  <div key={i} className="flex items-start gap-5 bg-soft-white/5 border border-soft-white/10 rounded-2xl p-5 hover:border-sky-cyan/30 transition-all duration-300">
                    <span
                      className="font-display text-4xl leading-none shrink-0 mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, #00C2FF 0%, #B026FF 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        opacity: 0.7,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-base text-soft-white mb-1">{phase.title}</p>
                      <p className="font-body text-sm text-soft-white/60 leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { src: "/images/Project/vps-tools.png", label: "Tools & Stack" },
                  { src: "/images/Project/vps-theme.png", label: "Cyberpunk Theme" },
                ].map(({ src, label }, i) => (
                  <motion.button
                    key={i}
                    className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-neon-magenta/50"
                    onClick={() => openLightbox(["/images/Project/vps-tools.png", "/images/Project/vps-theme.png"], i)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-neon-magenta/0 group-hover:bg-neon-magenta/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">{label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

            {/* ════════════════════════════════════════
                06 SOLUTION & IMPACT (vps-tycoon only)
            ════════════════════════════════════════ */}
            <FadeSection delay={0.05} className="py-14">
              <SectionNumber n="06" />
              <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">Solution &amp; Impact</h2>
              <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed whitespace-pre-line">{project.result}</p>

              {/* Challenges aside */}
              <div className="mt-10 relative bg-soft-white/5 border border-retro-yellow/30 rounded-2xl px-6 pb-6 pt-7">
                <div className="absolute -top-3 left-6 bg-retro-yellow text-dark-navy font-body text-xs font-bold px-3 py-1 rounded-full">Challenges</div>
                <p className="font-body text-sm text-soft-white/75 leading-relaxed">
                  จำลองระบบธุรกิจ VPS ที่มีทรัพยากรหลายชั้นให้เล่นสนุกและเข้าใจง่าย — ออกแบบความสัมพันธ์ระหว่าง rack / VM / requests / skill / events ในสถาปัตยกรรม OOP ที่ยืดหยุ่น และทำ UI ธีม cyberpunk ให้เข้ากับเนื้อหาเชิงเทคนิค
                </p>
              </div>

              {/* Ideation callout */}
              <div className="mt-8 relative bg-soft-white/5 border border-neon-magenta/20 rounded-2xl px-6 pb-6 pt-7">
                <div className="absolute -top-3 left-6 bg-neon-magenta/80 text-dark-navy font-body text-xs font-bold px-3 py-1 rounded-full">Ideation</div>
                <p className="font-body text-sm text-soft-white/70 leading-relaxed">
                  เปลี่ยนแนวคิดเรื่อง server management ซึ่งดู technical มาก ให้กลายเป็นเกมบริหารธุรกิจที่มีความก้าวหน้า มีการตัดสินใจชัดเจน และมีระบบอัปเกรดที่ผู้เล่นรู้สึกเติบโตได้จริง
                </p>
              </div>

              {/* Project info sidebar */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-8">
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Role</p>
                  <p className="font-body text-sm text-soft-white/80">Developer / Programmer</p>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Tech Stack</p>
                  <div className="flex flex-col gap-1">
                    {project.techStack.map((t) => (
                      <span key={t} className="font-body text-xs text-soft-white/70">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Timeline</p>
                  <p className="font-body text-sm text-soft-white/80">1 ภาคเรียน</p>
                </div>
                <div>
                  <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Team</p>
                  <p className="font-body text-sm text-soft-white/80">LoveJarnBank Group</p>
                </div>
              </div>
            </FadeSection>

            <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
          </>
        )}
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
              {isPolygonMesh ? "Full Gallery" : isVpsTycoon ? "Full Gallery" : "Visual principles detail"}
            </h2>
            {isChaodom && (
              <p className="font-body text-sm text-soft-white/50 mt-2">UI Design Principles &amp; Visual Design Analysis</p>
            )}
            {isPolygonMesh && (
              <p className="font-body text-sm text-soft-white/50 mt-2">All 13 screens — 2D, 3D, Polygon Study, Jigsaw &amp; more</p>
            )}
            {isVpsTycoon && (
              <p className="font-body text-sm text-soft-white/50 mt-2">All 10 images — Cover, Game Loop, Systems, Cyberpunk UI &amp; more</p>
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
          05 THE SOLUTION (non-polygon-mesh, non-vps-tycoon only)
      ════════════════════════════════════════ */}
      {!isPolygonMesh && !isVpsTycoon && (
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
      )}

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
