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
          background: "linear-gradient(135deg, #FFD166 0%, #FF6090 100%)",
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

function AlertBubble() {
  return (
    <svg viewBox="0 0 52 32" width={52} height={32} aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="50" height="26" rx="6" fill="#FFD166" opacity="0.18" stroke="#FFD166" strokeWidth="1.5" strokeOpacity="0.6" />
      <text x="26" y="19" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="14" fill="#FFD166" opacity="0.9">!</text>
      <polygon points="10,27 18,27 12,32" fill="#FFD166" opacity="0.6" />
    </svg>
  );
}

const DC_DIR = "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)";

const galleryImages = [
  `${DC_DIR}/previewDetectcheat.png`,
  `${DC_DIR}/19.png`,
  `${DC_DIR}/20.png`,
  `${DC_DIR}/21.png`,
  `${DC_DIR}/22.png`,
  `${DC_DIR}/23.png`,
  `${DC_DIR}/24.png`,
  `${DC_DIR}/25.png`,
  `${DC_DIR}/26.png`,
];

const cases = [
  {
    num: "01",
    title: "การซื้อขายออนไลน์",
    desc: "สินค้าปลอม การโอนเงินแล้วหาย หลักฐานจากการสนทนา",
    color: "border-retro-yellow/40 hover:border-retro-yellow/70",
    accent: "text-retro-yellow",
    bg: "bg-retro-yellow/5",
  },
  {
    num: "02",
    title: "เว็บหาคู่",
    desc: "มิจฉาชีพแอบอ้างตัวตน สร้างความสัมพันธ์เพื่อหลอกเอาเงิน",
    color: "border-sakura-pink/40 hover:border-sakura-pink/70",
    accent: "text-sakura-pink",
    bg: "bg-sakura-pink/5",
  },
  {
    num: "03",
    title: "การแอบอ้างรางวัล",
    desc: "อ้างว่าได้รับรางวัลจากกิจกรรม ต้องชำระค่าดำเนินการก่อน",
    color: "border-mint/40 hover:border-mint/70",
    accent: "text-mint",
    bg: "bg-mint/5",
  },
];

const keyFeatures = [
  { icon: "💬", label: "Chat-based interaction", desc: "ผู้เล่นโต้ตอบกับมิจฉาชีพผ่านบทสนทนาจำลอง" },
  { icon: "🔍", label: "Evidence collection", desc: "เลือกเก็บข้อความและหลักฐานสำคัญจากการสนทนา" },
  { icon: "⚖️", label: "Legal knowledge", desc: "เรียนรู้ พ.ร.บ. คอมพิวเตอร์ ปี 60 และกฎหมายฉ้อโกง" },
  { icon: "📱", label: "Android App", desc: "ออกแบบมาให้ใช้งานได้บนโทรศัพท์มือถือ" },
];

const processSteps = [
  {
    num: 1,
    title: "Research",
    desc: "ค้นคว้าข้อมูลกฎหมายคอมพิวเตอร์และรูปแบบกลโกงออนไลน์ที่พบบ่อยในชีวิตจริง",
    color: "border-retro-yellow text-retro-yellow",
  },
  {
    num: 2,
    title: "Design",
    desc: "ออกแบบตัวละคร 2D และ flow การสนทนาสำหรับแต่ละคดี ให้มีความสมจริงและน่าสนใจ",
    color: "border-sakura-pink text-sakura-pink",
  },
  {
    num: 3,
    title: "Development",
    desc: "พัฒนาเกมใน Unity ในรูปแบบ interactive visual novel พร้อมระบบเลือกบทสนทนา",
    color: "border-sky-cyan text-sky-cyan",
  },
  {
    num: 4,
    title: "Testing",
    desc: "ทดสอบการใช้งานกับกลุ่มเป้าหมายและประเมินความพึงพอใจ",
    color: "border-mint text-mint",
  },
];

const challenges = [
  {
    title: "COVID-19 Communication Limitations",
    lesson: "การระบาดของโควิดทำให้ทีมต้องพัฒนาแบบ Remote ทั้งหมด เรียนรู้การประสานงานและส่งงานในสภาพแวดล้อมที่จำกัด",
    icon: "🌐",
  },
  {
    title: "Limited Coding Experience",
    lesson: "ทีมยังมีประสบการณ์ด้านการโค้ด Unity ไม่มาก จึงต้องเรียนรู้ควบคู่กับการพัฒนา ทำให้ได้ทักษะจริงจากการลงมือทำ",
    icon: "💡",
  },
  {
    title: "Making Law Feel Accessible",
    lesson: "กฎหมายมักรู้สึกแห้งและเป็นทางการ การเปลี่ยนเป็นสถานการณ์จำลองทำให้ผู้เรียนเข้าถึงได้โดยไม่รู้สึกว่ากำลังเรียน",
    icon: "📖",
  },
];

export default function DetectCheatClient({ project }: { project: Project }) {
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
          01 WHY THIS MATTERS — Banner Hero
      ════════════════════════════════════════ */}
      <section
        className="relative w-full mt-6 overflow-hidden md:rounded-3xl md:mx-auto md:max-w-6xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" }}
      >
        <div className="aspect-[21/9] md:aspect-[21/7] relative">
          <Image
            src={`${DC_DIR}/previewDetectcheat.png`}
            alt="DETEC-CHEAT Preview"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/85 via-dark-navy/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-dark-navy/20 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs text-retro-yellow tracking-[0.25em] mb-2 uppercase">
              Educational Game · Law & Online Fraud
            </p>
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-soft-white leading-tight drop-shadow-lg"
              style={{
                WebkitTextStroke: "0.5px rgba(255,255,255,0.15)",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}
            >
              สืบ-ล่า-โกง
            </h1>
            <p className="font-display text-xl md:text-2xl text-retro-yellow/80 mt-1">DETEC-CHEAT</p>
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
          <span className="font-body text-sm text-retro-yellow font-bold">{project.date}</span>
          <span className={`inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border ${categoryBg[project.category]}`}>
            {categoryLabels[project.category]}
          </span>
          <span className="inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border border-retro-yellow/40 bg-retro-yellow/10 text-retro-yellow">
            Educational Game
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-full bg-deep-purple/60 text-soft-white/80 border border-soft-white/10 font-body text-xs font-medium transition-all duration-200 hover:bg-retro-yellow/20 hover:text-retro-yellow hover:border-retro-yellow/30"
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
            01 WHY THIS MATTERS
        ════════════════════════════════════════ */}
        <FadeSection delay={0} className="py-14">
          <SectionNumber n="01" extra={<AlertBubble />} />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            Why This Topic Matters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed mb-4">
                การโกงออนไลน์ไม่ใช่เรื่องไกลตัว ตั้งแต่การซื้อสินค้าแล้วไม่ได้รับของ ไปจนถึงการถูกหลอกจากเว็บหาคู่ — เหตุการณ์เหล่านี้เกิดขึ้นจริงในชีวิตประจำวัน
              </p>
              <p className="font-body text-base text-soft-white/70 leading-relaxed">
                แต่สื่อการเรียนรู้ด้านกฎหมายมักแห้งและน่าเบื่อ ทำให้ผู้เรียนไม่เข้าถึงเนื้อหา ทั้งที่การรู้เท่าทันกลโกงออนไลน์เป็นเรื่องใกล้ตัวมากสำหรับเยาวชนในยุคดิจิทัล
              </p>
            </div>
            <div className="relative bg-soft-white/5 border border-retro-yellow/30 rounded-2xl p-6 overflow-hidden">
              <div className="absolute -top-4 -right-4 font-display text-9xl text-retro-yellow/5 pointer-events-none select-none">!</div>
              <div className="flex items-start gap-4">
                <AlertBubble />
                <div>
                  <p className="font-display text-base text-retro-yellow mb-2">ปัญหาที่แท้จริง</p>
                  <p className="font-body text-sm text-soft-white/75 leading-relaxed">
                    เปลี่ยนเรื่องกฎหมายคอมพิวเตอร์และการฉ้อโกงออนไลน์ให้กลายเป็นสถานการณ์จำลองที่ผู้เล่นต้องตั้งสติ เก็บหลักฐาน และเลือกตอบอย่างมีวิจารณญาณ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            02 THE GAME CONCEPT
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="02" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            Game Concept: DETEC-CHEAT
          </h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed mb-8">
            DETEC-CHEAT เป็นโปรแกรมเพื่อการศึกษาในรูปแบบ 2D chat visual novel ที่พาผู้เล่นเรียนรู้เรื่องการโกงออนไลน์ การเก็บหลักฐาน และการดำเนินการทางกฎหมายผ่านสถานการณ์โต้ตอบกับมิจฉาชีพ ใน 3 คดีที่แตกต่างกัน
          </p>

          <motion.button
            className="group w-full relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden border border-soft-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-retro-yellow/50"
            onClick={() => openLightbox(galleryImages, 1)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={`${DC_DIR}/previewDetectcheat.png`}
              alt="DETEC-CHEAT Home Screen"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-dark-navy/0 group-hover:bg-dark-navy/30 transition-all flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 font-body text-sm rounded-full bg-dark-navy/80 px-4 py-2 text-soft-white border border-soft-white/20 transition-opacity duration-300">
                Expand Image
              </span>
            </div>
          </motion.button>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            03 CASES & LEARNING MECHANICS
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="03" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-8 -mt-2">
            Cases &amp; Learning Mechanics
          </h2>

          {/* Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {cases.map((c) => (
              <div
                key={c.num}
                className={`rounded-2xl border p-5 transition-colors ${c.color} ${c.bg}`}
              >
                <span className={`font-display text-2xl ${c.accent} opacity-50 block mb-3`}>{c.num}</span>
                <h3 className={`font-display text-lg ${c.accent} mb-2`}>{c.title}</h3>
                <p className="font-body text-sm text-soft-white/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Mechanic highlight */}
          <div className="bg-soft-white/5 border border-sky-cyan/20 rounded-2xl p-5 mb-8 flex items-start gap-4">
            <span className="text-2xl">💬</span>
            <div>
              <p className="font-display text-sky-cyan mb-1">Core Mechanic: Chat-based Evidence Collection</p>
              <p className="font-body text-sm text-soft-white/70">ผู้เล่นต้องโต้ตอบกับมิจฉาชีพในบทสนทนา แล้วเลือกเก็บหลักฐานที่สำคัญเพื่อนำไปดำเนินคดีในขั้นตอนถัดไป</p>
            </div>
          </div>

          {/* Key Features */}
          <h3 className="font-display text-xl text-soft-white/60 uppercase tracking-widest mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {keyFeatures.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-soft-white/5 border border-soft-white/10 rounded-xl p-4 hover:border-retro-yellow/30 transition-colors">
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p className="font-display text-sm text-retro-yellow mb-0.5">{f.label}</p>
                  <p className="font-body text-xs text-soft-white/65">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat + Evidence images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { src: `${DC_DIR}/20.png`, label: "Chat Interface" },
              { src: `${DC_DIR}/25.png`, label: "Evidence Collection" },
            ].map(({ src, label }, i) => (
              <motion.button
                key={i}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-retro-yellow/50"
                onClick={() => openLightbox([`${DC_DIR}/20.png`, `${DC_DIR}/25.png`], i)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-retro-yellow/0 group-hover:bg-retro-yellow/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="font-body text-sm text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-navy/60 px-4 py-2 rounded-full backdrop-blur-sm">
                    {label}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            04 DEVELOPMENT PROCESS
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="04" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-10 -mt-2">
            Development Process
          </h2>

          <div className="relative border-l-2 border-retro-yellow/20 ml-4 md:ml-6 space-y-8 mb-10">
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
            className="w-full relative aspect-[9/16] max-w-sm mx-auto block rounded-2xl overflow-hidden cursor-pointer border border-soft-white/10 focus:outline-none"
            onClick={() => openLightbox(galleryImages, 1)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={`${DC_DIR}/19.png`}
              alt="DETEC-CHEAT Cover"
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

          <div className="bg-soft-white/5 border border-retro-yellow/20 rounded-3xl p-6 md:p-8 mb-8" style={{ boxShadow: "0 0 40px rgba(255,209,102,0.05)" }}>
            <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed mb-6">
              <strong className="text-retro-yellow">The Solution:</strong> เกมการเรียนรู้ที่เปลี่ยนผู้เล่นจากคนอ่านข้อมูลเฉย ๆ ให้กลายเป็นคนที่ต้องตัดสินใจ ตอบโต้ และฝึกเก็บหลักฐานด้วยตนเอง — ผ่านสถานการณ์ที่สมจริงจาก 3 คดีออนไลน์ที่ใกล้ตัว
            </p>
            <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">
              <strong className="text-sakura-pink">Impact:</strong> ผู้ใช้งานสามารถเรียนรู้เนื้อหาและนำไปประยุกต์ใช้ป้องกันตนเองจากมิจฉาชีพออนไลน์ได้ โดยผลทดสอบสะท้อนความพึงพอใจในระดับมาก
            </p>
          </div>

          {/* Target Users callout */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 bg-soft-white/5 border border-mint/30 rounded-2xl p-5">
              <p className="font-body text-xs text-mint uppercase tracking-widest mb-2">Target Users</p>
              <p className="font-display text-lg text-soft-white">มัธยมต้น + ผู้สนใจ</p>
              <p className="font-body text-xs text-soft-white/60 mt-1">นักเรียนระดับมัธยมศึกษาตอนต้นและผู้ที่สนใจเรื่องการโกงบนโลกออนไลน์</p>
            </div>
            <div className="flex-1 bg-soft-white/5 border border-retro-yellow/30 rounded-2xl p-5">
              <p className="font-body text-xs text-retro-yellow uppercase tracking-widest mb-2">Competition</p>
              <p className="font-display text-lg text-soft-white">NSC ครั้งที่ 24</p>
              <p className="font-body text-xs text-soft-white/60 mt-1 font-mono">24p21e0061</p>
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
              <div key={i} className="bg-soft-white/5 border border-soft-white/10 hover:border-sakura-pink/30 rounded-2xl p-5 transition-colors">
                <span className="text-3xl block mb-4">{c.icon}</span>
                <p className="font-display text-base text-sakura-pink mb-3">{c.title}</p>
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
              <p className="font-body text-sm text-soft-white/80">Developer / Interactive Flow Support</p>
            </div>
            <div>
              <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Team</p>
              <p className="font-body text-sm text-soft-white/80">3 members</p>
              <p className="font-body text-xs text-soft-white/40 mt-1">ธนัทภัทร · กุลปรียา · พิชชาภา</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                className={`group relative ${i === 0 ? "aspect-video md:col-span-2 lg:col-span-2" : "aspect-[9/16]"} rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-retro-yellow/50`}
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
                <div className="absolute inset-0 bg-retro-yellow/0 group-hover:bg-retro-yellow/20 transition-colors duration-300" />
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
