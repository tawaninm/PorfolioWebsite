"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMapPin, FiMail, FiPhone, FiGlobe, FiDownload } from "react-icons/fi";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const stats = [
  { label: "UX/UI",     pct: 80, from: "#FF2D78", to: "#F06848" },
  { label: "Frontend",  pct: 65, from: "#5080F0", to: "#40C8A0" },
  { label: "Game Dev",  pct: 70, from: "#F0D040", to: "#F8A078" },
  { label: "CI Art",    pct: 75, from: "#F0B0D0", to: "#FF2D78" },
];

const education = [
  {
    school: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    degree: "Bachelor of Science Program in Information Technology — Multimedia & Game Development",
    year: "Aug 2024 – Now",
    notes: [
      "Freshman project on Python Web Next.js: Chat website \"Drive@Kmitl\"",
      "Freshman project on Java Game: \"VPSTYamaGames\"",
      "Freshman project on Arduino Rhythm Controller Game: \"Synchro\"",
    ],
  },
];

const workExperience = [
  {
    company: "Login-Engineering Academy",
    role: "Part-time Tutor — Information Technology",
    dates: "Sep 2024 – Now",
    achievements: [
      "Manage student projects for competitions (national software contests, university portfolio applications).",
      "Teach Godot game engine and mathematics to junior-high and senior-high students.",
    ],
  },
  {
    company: "School of Information Technology, KMITL",
    role: "Part-time TA — Java OOP",
    dates: "Nov 28 2025 – Now",
    achievements: [
      "Evaluate weekly laboratory assignments and pose conceptual questions to reinforce student understanding.",
    ],
  },
  {
    company: "School of Information Technology, KMITL — IT Openhouse 2025",
    role: "Head Workshop — Multimedia Roblox Journey",
    dates: "28 – 29 Nov 2025",
    achievements: [
      "Led curriculum development and training modules for the Roblox Training Program.",
      "Sourced TAs and TDs, overseeing classroom operations and lab equipment management.",
    ],
  },
  {
    company: "School of Information Technology, KMITL — ITCAMP21",
    role: "TD — Unreal Engine",
    dates: "28 Apr – 1 May 2025",
    achievements: [
      "Supported student teams building competition entries using Unreal Engine.",
    ],
  },
];

const skillGroups = [
  { label: "UX / UI Tools",      items: ["Figma", "Adobe Illustrator", "Canva", "NotebookLM", "ChatGPT", "Gemini"] },
  { label: "Game Development",   items: ["Godot Engine (Intermediate)", "Unity (Intermediate)", "Unreal Engine (Intermediate)", "Roblox Studio (Beginner)"] },
  { label: "Coding Languages",   items: ["C#", "GDScript", "Java", "HTML", "CSS", "JavaScript", "Lua", "SQL"] },
  { label: "Concepts & Methods", items: ["OOP", "Data Structures", "Algorithm", "UX Research", "Prototyping", "Wireframing"] },
];

const languages = [
  { lang: "Thai",    pct: 100, native: true },
  { lang: "English", pct: 70,  native: false },
];

const certs = [
  {
    name: "NSC 2022 — Final Round",
    issuer: "National Software Contest — Learning Mobile App \"Detectcheat\" (Unity)",
    year: "2022",
  },
  {
    name: "NSC 2023 — Second Round",
    issuer: "National Software Contest — Computer Game \"CriminalMind\" (Unity)",
    year: "2023",
  },
];

/* ─────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────── */

/** Animated stat bar */
function StatBar({ label, pct, from, to }: { label: string; pct: number; from: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const blocks = 10;
  const filled = Math.round((pct / 100) * blocks);

  return (
    <div ref={ref} className="flex items-center gap-3 print:gap-2">
      <span className="font-mono text-xs text-muted-lilac w-20 shrink-0">{label}</span>
      {/* Block-text meter */}
      <span className="font-mono text-xs text-muted-lilac/60 tracking-tight w-24 shrink-0">
        {"█".repeat(filled)}
        <span className="opacity-20">{"█".repeat(blocks - filled)}</span>
      </span>
      {/* Smooth bar */}
      <div className="flex-1 h-3 rounded-full bg-white/5 dark:bg-vinyl-dark/60 overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="font-mono text-xs text-muted-lilac w-8 text-right shrink-0">{pct}%</span>
    </div>
  );
}

/** Language bar */
function LangBar({ lang, pct, native }: { lang: string; pct: number; native: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="font-body text-sm text-sakura-white w-20 shrink-0">{lang}</span>
      <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon-magenta to-electric-blue"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      {native && (
        <span className="font-mono text-[10px] text-retro-yellow border border-retro-yellow/40 rounded px-1.5 py-0.5 shrink-0">
          Native
        </span>
      )}
    </div>
  );
}

/** Section divider with panel-break feel */
function PanelDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 border-t-2 border-muted-lilac/20 pt-6 mb-6 print:border-gray-200">
      <span
        className="font-display text-lg text-sakura-white print:text-black whitespace-nowrap"
      >
        {title}
      </span>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-neon-magenta/40 via-electric-blue/20 to-transparent" />
      {/* Manga break mark */}
      <span className="text-neon-magenta/50 text-xs select-none">✦</span>
    </div>
  );
}

/** Fade-in section */
function FadePanel({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ResumePage() {
  return (
    <main className="relative min-h-screen pt-28 pb-32 px-4 md:px-6 bg-soft-white dark:bg-dark-navy transition-colors duration-300 print:pt-6 print:pb-6 print:bg-white">

      {/* Download button — fixed bottom-right */}
      <button
        onClick={() => window.print()}
        aria-label="Download / Print Resume"
        className="print:hidden fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-hot-pink flex items-center justify-center text-soft-white shadow-[0_0_24px_rgba(255,96,144,0.6)] hover:shadow-[0_0_36px_rgba(255,96,144,0.8)] hover:-translate-y-1 transition-all duration-300"
      >
        <FiDownload size={22} />
      </button>

      <div className="mx-auto max-w-4xl">

        {/* ── Page header ── */}
        <motion.div
          className="text-center mb-10 print:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Comic panel frame */}
          <div className="inline-block border-2 border-neon-magenta/50 rounded-2xl px-10 py-5 relative print:border-gray-300">
            {/* Corner marks */}
            {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos, i) => (
              <span key={i} className={`absolute ${pos} w-2.5 h-2.5 border-t-2 border-l-2 border-neon-magenta/70 print:border-gray-400 ${i === 1 || i === 3 ? "rotate-90" : ""} ${i === 2 ? "-rotate-90" : ""} ${i === 3 ? "rotate-180" : ""}`} />
            ))}
            <h1 className="font-display text-5xl md:text-7xl tracking-widest text-dark-navy dark:text-soft-white print:text-black">
              RESUME
            </h1>
            <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest print:text-gray-500">
              履歴書
            </p>
          </div>
        </motion.div>

        {/* ── Main card ── */}
        <motion.div
          className="bg-vinyl-dark rounded-2xl border-2 border-muted-lilac/20 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] print:border-gray-200 print:shadow-none print:rounded-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* ── Profile top section ── */}
          <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start border-b-2 border-muted-lilac/10 print:border-gray-200">

            {/* Avatar */}
            <div className="relative mx-auto md:mx-0 shrink-0">
              {/* Double-border anime frame */}
              <div className="w-[150px] h-[150px] rounded-full border-4 border-neon-magenta/60 p-1.5">
                <div className="w-full h-full rounded-full border-2 border-muted-lilac/40 bg-gradient-to-br from-lavender/40 to-sakura-pink/40 flex items-center justify-center text-5xl">
                  👤
                </div>
              </div>
              {/* Anime corner marks */}
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <span
                  key={i}
                  className={`absolute ${cls} border-retro-yellow/70 w-4 h-4`}
                  style={{ margin: -6 }}
                />
              ))}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-display text-3xl text-sakura-white print:text-black">Your Name</h2>
                <p className="font-body font-bold text-neon-magenta text-lg mt-0.5 print:text-pink-600">
                  Senior UX Designer &amp; Frontend Developer
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                {[
                  { icon: <FiMapPin size={13}/>, text: "Your City, Country" },
                  { icon: <FiMail size={13}/>,   text: "hello@example.com" },
                  { icon: <FiPhone size={13}/>,  text: "+00 000 000 0000" },
                  { icon: <FiGlobe size={13}/>,  text: "yourportfolio.com" },
                ].map(({ icon, text }) => (
                  <span key={text} className="flex items-center gap-1.5 font-body text-xs text-muted-lilac print:text-gray-600">
                    <span className="text-neon-magenta/70">{icon}</span>
                    {text}
                  </span>
                ))}
              </div>

              {/* Stat bars */}
              <div className="flex flex-col gap-2.5 mt-2">
                {stats.map((s) => (
                  <StatBar key={s.label} {...s} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Content body ── */}
          <div className="p-8 md:p-10 flex flex-col gap-10 print:gap-6">

            {/* Education */}
            <FadePanel delay={0.05}>
              <PanelDivider title="Education" />
              <div className="flex flex-col gap-5">
                {education.map((e) => (
                  <div key={e.school} className="flex flex-col md:flex-row md:items-start gap-1 md:gap-6">
                    <span className="font-mono text-xs text-retro-yellow shrink-0 w-28">{e.year}</span>
                    <div>
                      <p className="font-body font-bold text-sakura-white text-sm print:text-black">{e.degree}</p>
                      <p className="font-display text-base text-muted-lilac print:text-gray-500">{e.school}</p>
                      <ul className="mt-1 flex flex-col gap-0.5">
                        {e.notes.map((n) => (
                          <li key={n} className="font-body text-xs text-soft-white/50 print:text-gray-400 before:content-['·'] before:mr-1.5">{n}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </FadePanel>

            {/* Work Experience */}
            <FadePanel delay={0.1}>
              <PanelDivider title="Work Experience" />
              <div className="flex flex-col gap-4">
                {workExperience.map((w) => (
                  <div
                    key={w.company}
                    className="grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-x-4 gap-y-0.5 items-start border-l-2 border-neon-magenta/30 pl-4 print:border-gray-300"
                  >
                    <span className="font-mono text-xs text-retro-yellow">{w.dates}</span>
                    <div>
                      <span className="font-body font-bold text-sm text-neon-magenta print:text-pink-600">{w.role}</span>
                      <span className="font-display text-sm text-sakura-white print:text-black ml-2">@ {w.company}</span>
                      <ul className="mt-0.5 flex flex-col gap-0.5">
                        {w.achievements.map((a) => (
                          <li key={a} className="font-body text-xs text-soft-white/55 print:text-gray-500 before:content-['·'] before:mr-1.5">{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </FadePanel>

            {/* Skills */}
            <FadePanel delay={0.15}>
              <PanelDivider title="Skills" />
              <div className="flex flex-col gap-5">
                {skillGroups.map((g) => (
                  <div key={g.label}>
                    <p className="font-mono text-[10px] text-muted-lilac/70 uppercase tracking-widest mb-2">
                      {g.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full text-xs font-body font-medium bg-sky-cyan/15 text-sky-cyan border border-sky-cyan/25 print:bg-gray-100 print:text-gray-700 print:border-gray-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadePanel>

            {/* Languages */}
            <FadePanel delay={0.2}>
              <PanelDivider title="Languages" />
              <div className="flex flex-col gap-3 max-w-sm">
                {languages.map((l) => (
                  <LangBar key={l.lang} {...l} />
                ))}
              </div>
            </FadePanel>

            {/* Certifications */}
            <FadePanel delay={0.25}>
              <PanelDivider title="Certifications" />
              <div className="flex flex-wrap gap-3">
                {certs.map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-col gap-0.5 px-5 py-3.5 rounded-xl border-2 border-muted-lilac/20 bg-soft-white/5 hover:border-neon-magenta/40 transition-colors duration-300 print:border-gray-200"
                  >
                    <span className="font-body font-bold text-sm text-sakura-white print:text-black">{c.name}</span>
                    <span className="font-body text-xs text-muted-lilac print:text-gray-500">{c.issuer}</span>
                    <span className="font-mono text-[10px] text-retro-yellow/80 print:text-gray-400">{c.year}</span>
                  </div>
                ))}
              </div>
            </FadePanel>

          </div>
        </motion.div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          nav, footer, button { display: none !important; }
          body { background: white !important; color: black !important; }
          * { animation: none !important; transition: none !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </main>
  );
}
