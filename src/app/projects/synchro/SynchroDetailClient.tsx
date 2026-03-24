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
        className="font-display text-6xl md:text-7xl leading-none select-none transition-all"
        style={{
          background: "linear-gradient(135deg, #FF6090 0%, #88D8E8 100%)",
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

function ImpactBubble() {
  return (
    <svg viewBox="0 0 52 32" width={52} height={32} aria-hidden="true" className="shrink-0">
      <rect x="1" y="1" width="50" height="26" rx="6" fill="#FF6090" opacity="0.18" stroke="#FF6090" strokeWidth="1.5" strokeOpacity="0.6" />
      <text x="26" y="19" textAnchor="middle" fontFamily="inherit" fontWeight="700" fontSize="14" fill="#FF6090" opacity="0.9">!?</text>
      <polygon points="10,27 18,27 12,32" fill="#FF6090" opacity="0.6" />
    </svg>
  );
}

export default function SynchroDetailClient({ project }: { project: Project }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);

  function openLightbox(images: string[], index: number) {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  const galleryImages = [
    "/synchrobox.jpg",
    "/SYNCHROPoster.png",
    "/SynchroController/Teacher.png",
    "/images/Project/synchro-figma.png",
  ];

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

      {/* ── Hero Banner ── */}
      <section
        className="relative w-full mt-6 overflow-hidden md:rounded-3xl md:mx-auto md:max-w-6xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)" }}
      >
        <div className="aspect-[21/9] md:aspect-[21/7] relative">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/80 via-dark-navy/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-dark-navy/20 to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs text-sky-cyan tracking-[0.25em] mb-2 uppercase">
              Physical Computing + Interactive Product
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
          <span className="font-body text-sm text-sky-cyan font-bold">{project.date}</span>
          <span className={`inline-block w-fit px-4 py-1 rounded-full font-body text-xs font-bold uppercase tracking-widest border ${categoryBg[project.category]}`}>
            {categoryLabels[project.category]}
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
            01 PRODUCT GOAL
        ════════════════════════════════════════ */}
        <FadeSection delay={0} className="py-14">
          <SectionNumber n="01" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            Product Goal
          </h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed mb-8">
            {project.summary}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { src: "/SYNCHROPoster.png", label: "Project Poster" },
              { src: "/synchrobox.jpg", label: "Hardware Controller" },
            ].map(({ src, label }, i) => (
              <motion.button
                key={i}
                className="group relative aspect-video rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-cyan/50"
                onClick={() => openLightbox(["/SYNCHROPoster.png", "/synchrobox.jpg"], i)}
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

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            02 THE PROBLEM
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="02" extra={<ImpactBubble />} />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            The Problem
          </h2>
          <p className="font-body text-base md:text-lg text-soft-white/75 leading-relaxed mb-8">
            {project.problem}
          </p>

          <div className="relative bg-soft-white/5 border border-hot-pink/30 rounded-2xl p-6 md:p-8 overflow-hidden">
            <div className="absolute -top-4 -right-4 font-display text-9xl text-hot-pink/5 pointer-events-none select-none">!?</div>
            <div className="flex items-start gap-4">
              <ImpactBubble />
              <div>
                <p className="font-display text-lg text-hot-pink mb-2">Social Media Focus Loss</p>
                <p className="font-body text-sm text-soft-white/75 leading-relaxed">
                  เนื้อหาบนโซเชียลมีเดียถูกออกแบบมาให้ดึงความสนใจสั้น ๆ (Short attention span) เครื่องมือฝึกสมาธิเดิม ๆ มักจะน่าเบื่อเกินไปจนผู้เรียนไม่อยากหยิบมาใช้ การเปลี่ยนการฝึกสมาธิให้กลายเป็น "ริธึมเกม" จึงเป็นทางออกที่จะดึงผู้ใช้ให้อยู่กับกิจกรรมจดจ่อได้ต่อเนื่อง
                </p>
              </div>
            </div>
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            03 HARDWARE + SOFTWARE OVERVIEW
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="03" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            Hardware + Software
          </h2>
          <p className="font-body text-base text-soft-white/70 mb-8">
            โครงงานนี้ใช้แนวคิด Physical Computing ผสมกับ Web Development เพื่อมัดรวบโลก hardware และ software ให้ทำงานร่วมกันอย่างราบรื่น
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Hardware */}
            <div className="bg-soft-white/5 border border-retro-yellow/30 rounded-3xl p-6 hover:bg-soft-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-3xl text-retro-yellow">HW</span>
                <h3 className="font-display text-2xl text-soft-white">Hardware</h3>
              </div>
              <ul className="space-y-3 font-body text-sm text-soft-white/80 mb-6">
                <li className="flex items-start gap-2"><span className="text-retro-yellow">✦</span> ESP32 Development Board</li>
                <li className="flex items-start gap-2"><span className="text-retro-yellow">✦</span> TFT LCD Display</li>
                <li className="flex items-start gap-2"><span className="text-retro-yellow">✦</span> Physical Buttons for tactile feedback</li>
                <li className="flex items-start gap-2"><span className="text-retro-yellow">✦</span> SD Card Module for song storage</li>
              </ul>
              <motion.button
                className="w-full relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(["/synchrobox.jpg"], 0)}
              >
                <Image src="/synchrobox.jpg" alt="Hardware Controller" fill className="object-cover" />
                <div className="absolute inset-0 bg-dark-navy/0 hover:bg-dark-navy/20 transition-all flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 font-body text-sm rounded-full bg-dark-navy/80 px-4 py-2 text-soft-white border border-soft-white/20">Expand</span>
                </div>
              </motion.button>
            </div>

            {/* Right Column: Software */}
            <div className="bg-soft-white/5 border border-sky-cyan/30 rounded-3xl p-6 hover:bg-soft-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-3xl text-sky-cyan">SW</span>
                <h3 className="font-display text-2xl text-soft-white">Software</h3>
              </div>
              <ul className="space-y-3 font-body text-sm text-soft-white/80 mb-6">
                <li className="flex items-start gap-2"><span className="text-sky-cyan">✦</span> Web app: Song selection & Score summary</li>
                <li className="flex items-start gap-2"><span className="text-sky-cyan">✦</span> Song mapping tool (JSON generator)</li>
                <li className="flex items-start gap-2"><span className="text-sky-cyan">✦</span> Upload flow ↔ Web Server</li>
                <li className="flex items-start gap-2"><span className="text-sky-cyan">✦</span> Play history to track performance</li>
              </ul>
              <motion.button
                className="w-full relative aspect-video rounded-xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(["/images/Project/synchro-figma.png"], 0)}
              >
                <Image src="/images/Project/synchro-figma.png" alt="Web App Interface" fill className="object-cover" />
                <div className="absolute inset-0 bg-dark-navy/0 hover:bg-dark-navy/20 transition-all flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 font-body text-sm rounded-full bg-dark-navy/80 px-4 py-2 text-soft-white border border-soft-white/20">Expand</span>
                </div>
              </motion.button>
            </div>
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

          <div className="relative border-l-2 border-sakura-pink/20 ml-4 md:ml-6 space-y-8 mb-10">
            {[
              { title: "Planning + UI/CI Design", desc: "วางแปลนของระบบทั้งหมดและออกแบบ CI รวมถึงหน้าเว็บใน Figma" },
              { title: "Frontend Development", desc: "พัฒนาหน้าเว็บด้วย HTML/CSS/JS หรือ Framework" },
              { title: "Hardware Wiring", desc: "เชื่อมต่อวงจรระหว่าง ESP32, TFT LCD, SD Card Reader และปุ่มกด" },
              { title: "Game Control Programming", desc: "เขียนโค้ดภาษา C++ คุมการวาดกราฟิก การรับอินพุต และคำนวณคะแนน" },
              { title: "Song Mapping Tool", desc: "สร้างเครื่องมือเว็บสำหรับอำนวยความสะดวกในการกดสร้างจังหวะ แล้วส่งออกเป็น JSON" },
              { title: "Web Server Integration", desc: "ร้อยรัดระบบ ESP32 Web Server ให้สื่อสาร ส่งเพลง และสรุปผลคะแนนไปยังเว็บบราวเซอร์ได้" },
            ].map((step, i) => (
              <div key={i} className="relative pl-8">
                <span className="absolute -left-[17px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-dark-navy border-2 border-sakura-pink text-sakura-pink font-display text-sm">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl text-sakura-pink mb-2">{step.title}</h3>
                <p className="font-body text-sm text-soft-white/70">{step.desc}</p>
              </div>
            ))}
          </div>

          <motion.div
            className="w-full relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer border border-soft-white/10"
            onClick={() => openLightbox(["/SynchroController/Teacher.png"], 0)}
          >
            <Image src="/SynchroController/Teacher.png" alt="Development Documentation" fill className="object-cover" />
            <div className="absolute inset-0 bg-dark-navy/0 hover:bg-dark-navy/30 transition-all flex justify-center items-center pointer-events-none">
                <span className="opacity-0 font-body text-sm rounded-full bg-dark-navy/80 px-4 py-2 text-soft-white border border-soft-white/20">Expand Image</span>
            </div>
          </motion.div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            05 CHALLENGES
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="05" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-8 -mt-2">
            Challenges &amp; Problem Solving
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                prob: "Arduino UNO R4 → ESP32",
                sol: "บอร์ดดั้งเดิม library ไม่รองรับจอสี TFT ได้ดีพอ หรือมีข้อจำกัดด้านความเร็ว จึงอพยพมาใช้ ESP32 ที่มีพลังประมวลผลวาดภาพได้ลื่นไหลและเชื่อม WiFi ได้ในตัว",
              },
              {
                prob: "Breadboard Power Issues",
                sol: "พลังงานจ่ายผ่าน Breadboard ไม่เสถียรเมื่อต่อจอและ SD Card พร้อมกัน ทำให้ต่อยอดสู่การเชื่อมบัดกรีให้เกิดความเสถียรยิ่งขึ้น",
              },
              {
                prob: "SD Card Adapter 3V → 5V",
                sol: "ตัวรับ SD Card ต้องการแรงดันที่ต่างจากจอ หรือเกิดชนกันของคุณสมบัติ SPI ต้องจัดสรรพินและการใช้วงจรลดแรงดันให้ถูกต้อง",
              },
              {
                prob: "Web ↔ Board Handshaking",
                sol: "ความเสถียรในการส่งข้อมูล JSON ขนาดใหญ่ข้ามไปมาระหว่างหน้าเว็บ React/JS และ ESP32 Async Web Server แก้ไขโดยใช้การแบ่ง chunk หรือปรับ timeout",
              },
            ].map((card, i) => (
              <div key={i} className="bg-soft-white/5 border border-soft-white/10 hover:border-mint/30 rounded-2xl p-5 transition-colors">
                <div className="flex gap-2 items-center mb-3">
                  <span className="text-coral-red">⚠</span>
                  <p className="font-display text-coral-red">{card.prob}</p>
                </div>
                <div className="pl-6 border-l border-soft-white/10 ml-2">
                  <p className="font-display text-mint text-xs mb-1 bg-mint/10 w-fit px-2 py-0.5 rounded-full mt-2">SOLUTION</p>
                  <p className="font-body text-sm text-soft-white/80 leading-relaxed italic">
                    {card.sol}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />

        {/* ════════════════════════════════════════
            06 SOLUTION & IMPACT
        ════════════════════════════════════════ */}
        <FadeSection delay={0.05} className="py-14">
          <SectionNumber n="06" />
          <h2 className="font-display text-3xl md:text-4xl text-soft-white mb-6 -mt-2">
            Solution &amp; Impact
          </h2>
          <div className="bg-soft-white/5 border border-sky-cyan/20 rounded-3xl p-6 md:p-8 mb-8" style={{ boxShadow: "0 0 40px rgba(136,216,232,0.05)" }}>
            <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed mb-6">
              <strong className="text-sky-cyan">The Solution:</strong> พัฒนาอุปกรณ์ฝึกสมาธิในรูปแบบเกมจังหวะที่ผู้ใช้สามารถอัปโหลดเพลงผ่านหน้าเว็บ สร้างแมปโน้ตได้เอง และดูประวัติการเล่น (History) เพื่อติดตามพัฒนาการการจดจ่อของตนเองได้แบบจับต้องได้
            </p>
            <p className="font-body text-base md:text-lg text-soft-white/80 leading-relaxed">
              <strong className="text-sakura-pink">Impact:</strong> ช่วยให้นักเรียนนักศึกษามีเครื่องมือในการฝึกฝนการจดจ่อที่สนุกสนาน และสามารถถ่ายทอดทักษะการโฟกัสไปใช้กับการเรียนหรือการทำงานจริงได้ดีขึ้น (Deep Work)
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center py-6">
            <a
              href="https://ganksterphy.github.io/Synchro/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-hot-pink font-body text-soft-white font-bold hover:shadow-[0_0_20px_rgba(255,96,144,0.5)] hover:-translate-y-1 transition-all"
            >
              Visit Website ↗
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border border-sky-cyan font-body text-sky-cyan font-bold hover:bg-sky-cyan/10 hover:shadow-[0_0_20px_rgba(136,216,232,0.3)] hover:-translate-y-1 transition-all"
              onClick={(e) => {
                // If there's an actual video link, it can be updated later. User requested a button but didn't provide a URL.
                e.preventDefault();
                alert("Video link pending!"); 
              }}
            >
              Watch Video (External) ↗
            </a>
          </div>
        </FadeSection>

        {/* ── Project Info Footer ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-soft-white/10 to-transparent" />
        <FadeSection delay={0.05} className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-body text-xs text-soft-white/40 uppercase tracking-widest mb-2">Role</p>
              <p className="font-body text-sm text-soft-white/80">Hardware Integration & Web Dev</p>
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

          <div className="mt-12">
            <h3 className="font-display text-xl text-soft-white/50 uppercase tracking-widest mb-6 border-b border-soft-white/10 pb-4">Gallery Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <motion.button
                  key={i}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-deep-purple/30 border border-soft-white/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-hot-pink/50"
                  onClick={() => openLightbox(galleryImages, i)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src={img} alt={`Gallery image ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-hot-pink/0 group-hover:bg-hot-pink/20 transition-colors duration-300" />
                </motion.button>
              ))}
            </div>
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
