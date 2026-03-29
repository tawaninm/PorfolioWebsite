"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projects, categoryLabels } from "@/data/projects";
import ParallaxShapes from "@/components/project-detail/ParallaxShapes";
import ImageLightbox from "@/components/project-detail/ImageLightbox";
import ProjectNav from "@/components/project-detail/ProjectNav";

const categoryBg: Record<Project["category"], string> = {
  uxui: "bg-sakura-pink/20 text-sakura-pink border-sakura-pink/30",
  programming: "bg-sky-cyan/20 text-sky-cyan border-sky-cyan/30",
  "ci-art": "bg-mint/20 text-mint border-mint/30",
  game: "bg-retro-yellow/20 text-retro-yellow border-retro-yellow/30",
};

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

function SectionNumber({ n, extra }: { n: string; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="font-display text-6xl md:text-7xl leading-none select-none"
        style={{
          background: "linear-gradient(135deg, #88D8E8 0%, #7B61FF 100%)",
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

const CM_DIR = "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)";

const galleryImages = [
  `${CM_DIR}/preview%20and%20galletry.png`,
  `${CM_DIR}/27.png`,
  `${CM_DIR}/29.png`,
  `${CM_DIR}/30.png`,
  `${CM_DIR}/31.png`,
  `${CM_DIR}/32.png`,
  `${CM_DIR}/33.png`,
  `${CM_DIR}/34.png`,
  `${CM_DIR}/35.png`,
  `${CM_DIR}/36.png`,
  `${CM_DIR}/37.png`,
];

const investigationStages = [
  {
    num: "01",
    label: "Crime Scene",
    title: "เก็บหลักฐาน ณ จุดเกิดเหตุ",
    desc: "ตรวจสอบและเก็บหลักฐานจากสถานที่เกิดเหตุอย่างละเอียด ก่อนจะถูกปนเปื้อนหรือสูญหาย",
    img: `${CM_DIR}/32.png`,
    color: "border-sky-cyan/40 hover:border-sky-cyan/70",
    accent: "text-sky-cyan",
    bg: "bg-sky-cyan/5",
    icon: "🔦",
  },
  {
    num: "02",
    label: "Forensic Lab",
    title: "ตรวจพิสูจน์หลักฐาน",
    desc: "นำหลักฐานเข้าห้องแล็บ ทำ mini-game ตรวจรอยนิ้วมือ ตรวจเลือด และวิเคราะห์ผล",
    img: `${CM_DIR}/33.png`,
    color: "border-mint/40 hover:border-mint/70",
    accent: "text-mint",
    bg: "bg-mint/5",
    icon: "🧪",
  },
  {
    num: "03",
    label: "Interrogation",
    title: "สอบสวนผู้ต้องสงสัย",
    desc: "ใช้หลักฐานที่รวบรวมมาสอบสวน โดยยึดหลัก empathy และความเป็นธรรม ไม่ใช่การข่มขู่",
    img: `${CM_DIR}/35.png`,
    color: "border-sakura-pink/40 hover:border-sakura-pink/70",
    accent: "text-sakura-pink",
    bg: "bg-sakura-pink/5",
    icon: "🗣️",
  },
];

const keyFeatures = [
  { icon: "📖", label: "Story-driven progression", desc: "เรื่องราวขับเคลื่อนประสบการณ์ เลือกบทสนทนาเพื่อค้นหาความจริง" },
  { icon: "🔬", label: "Forensic mini-games", desc: "ตรวจรอยนิ้วมือ ตรวจเลือด ในรูปแบบ interactive mini-game" },
  { icon: "⚖️", label: "Ethical decision-making", desc: "ทุกการตัดสินใจมีผลต่อคะแนนจริยธรรมและผลลัพธ์ของคดี" },
  { icon: "🎭", label: "2D visual novel", desc: "ตัวละคร 2D สไตล์การ์ตูนที่ออกแบบมาอย่างละเอียดใน Procreate" },
];

const processSteps = [
  {
    num: 1,
    title: "Script",
    desc: "ศึกษาแนวคิด investigative interview และบทบาทงานตำรวจ เขียนบทคดีธุรกิจที่มีความซับซ้อนและเชื่อมโยงกับชีวิตจริง",
    color: "border-sky-cyan text-sky-cyan",
  },
  {
    num: 2,
    title: "Art",
    desc: "ออกแบบตัวละครและงานภาพ 2D สไตล์การ์ตูนทั้งหมดใน Procreate — ปริมาณงานศิลป์จำนวนมากเพื่อให้ครอบคลุมทุกฉากและอารมณ์ของตัวละคร",
    color: "border-sakura-pink text-sakura-pink",
  },
  {
    num: 3,
    title: "Development",
    desc: "พัฒนา interactive visual novel ใน Unity พร้อม mini-games: ตรวจรอยนิ้วมือ, ตรวจเลือด, และระบบตรวจจับการโกหก",
    color: "border-mint text-mint",
  },
  {
    num: 4,
    title: "Conclusion",
    desc: "ระบบสรุปผลคดีที่คำนวณจากการตัดสินใจของผู้เล่นตลอดเกม — สะท้อนว่าการสืบสวนที่เป็นธรรมส่งผลอย่างไร",
    color: "border-retro-yellow text-retro-yellow",
  },
];

const challenges = [
  {
    title: "Forensic Accuracy vs. Accessibility",
    lesson: "ทำให้เนื้อหานิติวิทยาศาสตร์มีความถูกต้องเพียงพอแต่ยังสนุกและเข้าใจง่าย โดยไม่ทำให้ผู้เล่นรู้สึกว่ากำลังอ่านตำรา",
    icon: "🔬",
  },
  {
    title: "Volume of 2D Art Assets",
    lesson: "ปริมาณงานภาพ 2D ที่ต้องสร้างมีจำนวนมาก ทั้งตัวละคร background และ expression ต่าง ๆ เรียนรู้การวางแผนและจัดสรรเวลาการทำงานศิลป์",
    icon: "🎨",
  },
  {
    title: "Ethics Without Killing the Fun",
    lesson: "สื่อสารหลักจริยธรรมในการสอบสวนโดยไม่ทำให้เกมรู้สึกเทศนา — แก้โดยฝังแนวคิดไว้ในผลลัพธ์ของเกมแทนการบรรยายตรง ๆ",
    icon: "⚖️",
  },
];

export default function CriminalMindClient({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);

  function openLightbox(images: string[], index: number) {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <main className="relative min-h-screen bg-dark-navy overflow-hidden">
      <ParallaxShapes />

      {/* ── Back navigation ── */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-24 flex items-center gap-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-hot-pink/10 border border-hot-pink/30 font-body text-sm text-hot-pink hover:bg-hot-pink/20 transition-all duration-300"
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

      {/* ════════════════════════════════════════
          01 NARRATIVE PREMISE — Banner Hero
      ════════════════════════════════════════ */}
      <section
        className="relative w-full mt-6 overflow-hidden md:rounded-3xl md:mx-auto md:max-w-6xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" }}
      >
        <div className="aspect-[21/9] md:aspect-[21/7] relative">
          <Image
            src={`${CM_DIR}/preview%20and%20galletry.png`}
            alt="Criminal Minds Preview"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/90 via-dark-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-dark-navy/20 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs text-sky-cyan tracking-[0.25em] mb-2 uppercase">
              Narrative Investigation Game · Ethics & Forensics
            </p>
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-soft-white leading-tight drop-shadow-lg"
              style={{
                WebkitTextStroke: "0.5px rgba(255,255,255,0.15)",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}
            >
              ห้วงลึกภายในจิตใจ
            </h1>
            <p className="font-display text-xl md:text-2xl text-sky-cyan/80 mt-1">Criminal Minds</p>
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
          <span className="font-body text-sm text-sky-cyan font-bold">{project.date}</span>
          <span className={`inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border ${categoryBg[project.category]}`}>
            {categoryLabels[project.category]}
          </span>
          <span className="inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border border-sky-cyan/40 bg-sky-cyan/10 text-sky-cyan">
            Narrative Investigation
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full bg-deep-purple/60 text-soft-white/80 border border-soft-white/10 font-body text-xs font-medium transition-all duration-200 hover:bg-sky-cyan/20 hover:text-sky-cyan hover:border-sky-cyan/30"
              style={{ filter: "drop-shadow(2px 2px 0 rgba(0,0,0,0.4))" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </FadeSection>

      <div className="mx-auto max-w-5xl px-6 mt-8">
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        {/* ════════════════════════════════════════
            01 NARRATIVE PREMISE
        ════════════════════════════════════════ */}
        <FadeSection delay={0} className="py-14">
          <SectionNumber n="01" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            Narrative Premise
          </h2>

          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed mb-8">
            Criminal Minds เป็นเกม 2D visual novel ที่เล่าเส้นทางงานตำรวจตั้งแต่การเก็บหลักฐานในที่เกิดเหตุ การพิสูจน์หลักฐานด้วยหลักวิทยาศาสตร์ ไปจนถึงการสอบสวนผู้ต้องสงสัย โดยสอดแทรกแนวคิดด้านจริยธรรมและ empathy ในทุกขั้นตอน
          </p>

          {/* Manga-style story card */}
          <div className="relative bg-soft-white/5 border border-sky-cyan/20 rounded-3xl p-6 md:p-8 overflow-hidden">
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(136,216,232,0.3) 10px, rgba(136,216,232,0.3) 11px)",
              }}
            />
            <div className="relative flex items-start gap-5">
              <div className="shrink-0 w-12 h-16 bg-sky-cyan/10 border border-sky-cyan/30 rounded-lg flex items-center justify-center">
                <span className="font-display text-sky-cyan text-xl">★</span>
              </div>
              <div>
                <p className="font-mono text-xs text-sky-cyan uppercase tracking-widest mb-3">Story Introduction</p>
                <p className="font-body text-base text-soft-white/80 leading-relaxed italic">
                  "คุณคือนักสืบใหม่ที่เพิ่งได้รับมอบหมายคดีแรก คดีฉ้อโกงทางธุรกิจที่ซับซ้อน ทุกหลักฐานที่คุณเลือกเก็บ ทุกคำถามที่คุณถาม จะบอกว่าคุณเป็นนักสืบแบบไหน"
                </p>
                <p className="font-display text-sm text-sky-cyan mt-4">— 3 investigation stages to solve the case</p>
              </div>
            </div>
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            02 WHY THIS MATTERS — THE ETHICAL QUESTION
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="02" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            The Ethical Question
          </h2>

          {/* Dramatic manga panel */}
          <div className="relative rounded-3xl overflow-hidden mb-8" style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1a1a2e 100%)" }}>
            {/* Halftone accent */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(136,216,232,0.4) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative p-8 md:p-12 border border-sky-cyan/15 rounded-3xl">
              <p className="font-mono text-xs text-sky-cyan uppercase tracking-[0.3em] mb-6">The Problem</p>
              <blockquote className="border-l-4 border-sky-cyan pl-6 mb-8">
                <p className="font-display text-xl md:text-2xl text-soft-white leading-relaxed">
                  "ภาพจำของการสอบสวนในชีวิตจริงมักผูกกับการใช้อำนาจ ความกดดัน และอคติ"
                </p>
              </blockquote>
              <p className="font-body text-base text-soft-white/70 leading-relaxed mb-6">
                เราต้องการสื่อที่เล่าทางเลือกของการสอบสวนที่ยึดหลักนิติธรรมมากกว่าอคติ — ที่ผู้คนสามารถฝึกคิดอย่างเป็นระบบและเคารพศักดิ์ศรีของผู้ต้องสงสัย
              </p>

              {/* Ethical principle card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-sky-cyan/5 border border-sky-cyan/25 rounded-2xl p-5">
                  <p className="font-mono text-xs text-sky-cyan uppercase tracking-widest mb-2">Core Principle</p>
                  <p className="font-display text-lg text-soft-white mb-1">Presumed Innocent</p>
                  <p className="font-body text-sm text-soft-white/65">
                    "สันนิษฐานไว้ก่อนว่าผู้ถูกกล่าวหาเป็นผู้บริสุทธิ์" — หลักการที่ขับเคลื่อนการออกแบบทุกฉากในเกม
                  </p>
                </div>
                <div className="bg-sakura-pink/5 border border-sakura-pink/25 rounded-2xl p-5">
                  <p className="font-mono text-xs text-sakura-pink uppercase tracking-widest mb-2">Design Goal</p>
                  <p className="font-display text-lg text-soft-white mb-1">Empathy-driven Investigation</p>
                  <p className="font-body text-sm text-soft-white/65">
                    ผู้เล่นต้องเข้าใจมุมมองของทุกฝ่าย ก่อนจะตัดสินใจว่าใครคือผู้กระทำผิดจริง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            03 GAMEPLAY FLOW
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="03" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-8 -mt-2">
            Gameplay Flow
          </h2>

          {/* 3-stage flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {investigationStages.map((stage, i) => (
              <div key={stage.num} className="flex flex-col">
                {/* Stage card */}
                <div className={`flex-1 rounded-2xl border p-5 transition-colors ${stage.color} ${stage.bg} mb-3`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{stage.icon}</span>
                    <span className={`font-mono text-xs uppercase tracking-widest ${stage.accent}`}>{stage.label}</span>
                  </div>
                  <span className={`font-display text-2xl opacity-30 block mb-2 ${stage.accent}`}>{stage.num}</span>
                  <h3 className={`font-display text-base ${stage.accent} mb-2`}>{stage.title}</h3>
                  <p className="font-body text-xs text-soft-white/65 leading-relaxed">{stage.desc}</p>
                </div>
                {/* Connector arrow (not on last) */}
                {i < investigationStages.length - 1 && (
                  <div className="hidden md:flex justify-center items-center absolute" style={{ display: "none" }} />
                )}
              </div>
            ))}
          </div>

          {/* Stage images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
            {investigationStages.map((stage, i) => (
              <motion.button
                key={i}
                className="group relative aspect-video rounded-xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-cyan/50"
                onClick={() => openLightbox([stage.img], 0)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image src={stage.img} alt={stage.label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-dark-navy/0 group-hover:bg-dark-navy/40 transition-all flex items-end p-3">
                  <span className={`font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${stage.accent}`}>
                    {stage.label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Key Features */}
          <h3 className="font-display text-xl text-soft-white/60 uppercase tracking-widest mb-4">Gameplay Mechanics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {keyFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-soft-white/5 border border-soft-white/10 rounded-xl p-4 hover:border-sky-cyan/30 transition-colors">
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p className="font-display text-sm text-sky-cyan mb-0.5">{f.label}</p>
                  <p className="font-body text-xs text-soft-white/65">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            04 ART & DEVELOPMENT
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="04" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-10 -mt-2">
            Art &amp; Development
          </h2>

          <div className="relative border-l-2 border-sky-cyan/20 ml-4 md:ml-6 space-y-8 mb-10">
            {processSteps.map((step) => (
              <div key={step.num} className="relative pl-8">
                <span className={`absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-dark-navy border-2 font-display text-sm ${step.color}`}>
                  {step.num}
                </span>
                <h3 className={`font-display text-xl mb-2 ${step.color.split(" ")[1]}`}>{step.title}</h3>
                <p className="font-body text-sm text-soft-white/70">{step.desc}</p>
              </div>
            ))}
          </div>

          <motion.button
            className="w-full relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-soft-white/10 focus:outline-none"
            onClick={() => openLightbox(galleryImages, 0)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={`${CM_DIR}/27.png`}
              alt="Criminal Minds Cover"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-dark-navy/0 hover:bg-dark-navy/30 transition-all flex justify-center items-center pointer-events-none">
              <span className="opacity-0 font-body text-sm rounded-full bg-dark-navy/80 px-4 py-2 text-soft-white border border-soft-white/20">
                Expand Image
              </span>
            </div>
          </motion.button>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            05 SOLUTION & IMPACT
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="05" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            Solution &amp; Impact
          </h2>

          <div className="bg-soft-white/5 border border-sky-cyan/20 rounded-3xl p-6 md:p-8 mb-8" style={{ boxShadow: "0 0 40px rgba(136,216,232,0.05)" }}>
            <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed mb-6">
              <strong className="text-sky-cyan">The Solution:</strong> เกมเล่าเรื่องที่ทำให้ผู้เล่นได้ฝึกคิดแบบนักสืบ ฝึกจัดการหลักฐาน และเข้าใจความสำคัญของจริยธรรมในการสอบสวนมากขึ้น ผ่านสถานการณ์จำลองที่มีแรงกดดันจริง
            </p>
            <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">
              <strong className="text-sakura-pink">Impact:</strong> ผู้ใช้งานเพลิดเพลินกับเรื่องราว เข้าใจบทบาทงานสายตำรวจและแนวคิดการสอบสวนที่เป็นธรรมมากขึ้น โดยผลทดสอบสะท้อนความพึงพอใจในระดับมาก
            </p>
          </div>

          {/* Target Users + Competition */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 bg-soft-white/5 border border-sakura-pink/30 rounded-2xl p-5">
              <p className="font-body text-xs text-sakura-pink uppercase tracking-widest mb-2">Target Users</p>
              <p className="font-display text-lg text-soft-white">มัธยมปลาย · 15+</p>
              <p className="font-body text-xs text-soft-white/60 mt-1">
                เนื้อหาเชิงจิตวิทยาและคดีอาจมีความรุนแรง — เหมาะสำหรับผู้สนใจอายุ 15 ปีขึ้นไป
              </p>
            </div>
            <div className="flex-1 bg-soft-white/5 border border-sky-cyan/30 rounded-2xl p-5">
              <p className="font-body text-xs text-sky-cyan uppercase tracking-widest mb-2">Competition</p>
              <p className="font-display text-lg text-soft-white">NSC ครั้งที่ 25</p>
              <p className="font-body text-xs text-soft-white/60 mt-1 font-mono">25p21e0082</p>
            </div>
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            06 CHALLENGES
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="06" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-8 -mt-2">
            Lessons Learned
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((c, i) => (
              <div key={i} className="bg-soft-white/5 border border-soft-white/10 hover:border-sky-cyan/30 rounded-2xl p-5 transition-colors">
                <span className="text-3xl block mb-4">{c.icon}</span>
                <p className="font-display text-base text-sky-cyan mb-3">{c.title}</p>
                <div className="border-t border-soft-white/10 pt-3 mt-2">
                  <p className="font-body text-xs text-mint uppercase tracking-widest mb-1">Reflection</p>
                  <p className="font-body text-sm text-soft-white/75 leading-relaxed">{c.lesson}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* ── Project Info Footer ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
        <FadeSection delay={0.05} className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div>
              <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Role</p>
              <p className="font-body text-sm text-soft-white/80">Developer / Graphic &amp; Game Mechanics Support</p>
            </div>
            <div>
              <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Team</p>
              <p className="font-body text-sm text-soft-white/80">3 members</p>
              <p className="font-body text-xs text-soft-white/40 mt-1">ธนัทภัทร · ธนัชชา · พิชชาภา</p>
            </div>
            <div>
              <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-soft-white/5 border border-soft-white/10 font-body text-xs text-soft-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h3 className="font-display text-xl text-soft-white/50 uppercase tracking-widest mb-6 border-b border-soft-white/10 pb-4">
            Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-cyan/50"
                onClick={() => openLightbox(galleryImages, i)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-sky-cyan/0 group-hover:bg-sky-cyan/20 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        </FadeSection>
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
