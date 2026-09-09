"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMapPin, FiMail, FiPhone, FiGlobe, FiDownload, FiLinkedin, FiGithub } from "react-icons/fi";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const RESUME_DRIVE_URL = "https://drive.google.com/file/d/1oht2wjo-ojsd8lqC1lw3AzNgE6sb2uI8/view?usp=sharing";

const stats = [
  { label: "AI & Auto", pct: 85, from: "#FF2D78", to: "#F06848" },
  { label: "Software", pct: 80, from: "#5080F0", to: "#40C8A0" },
  { label: "Product/UX", pct: 75, from: "#F0D040", to: "#F8A078" },
];

const education = [
  {
    school: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    degree: "Bachelor of Science Program in Information Technology",
    module: "Module: Multimedia & Game Development",
    year: "Aug 2024 – Now",
    notes: [
      "TAWAN-OS Personal Agentic AI Harness (Antigravity CLI, MCP, Multi-Agent)",
      "Disney Lorcana PlayLab (AWS Serverless, Real-time WebSockets, Playwright E2E)",
      "UX/UI Prototype EasyDom \"Chao-dom\" (Full 5-phase User Research & Usability Testing)",
      "Java OOP Teaching Assistant & IT Openhouse Project Head",
    ],
  },
];

const workExperience = [
  {
    company: "Gumon Technology",
    role: "User Experience Designer Intern",
    dates: "Jun 1 – Aug 30, 2026",
    achievements: [
      "Managed and improved the centralized design system for Gumon Technology by organizing UI foundations, reusable components, style tokens, and design documentation.",
      "Established clear component guidelines to enforce product design consistency and facilitate smoother collaboration between designers and engineering teams.",
    ],
    tech: "Figma, Design Systems, UI Foundations, Tokens, Cross-Functional Workflow",
  },
  {
    company: "School of Information Technology, KMITL",
    role: "Teaching Assistant — Object-Oriented Programming (Java)",
    dates: "Nov 2025 – Present",
    achievements: [
      "Assisting course instructors for Object-Oriented Programming (OOP) by evaluating weekly lab assignments and conducting code reviews for 100+ 1st-year students.",
      "Facilitating conceptual Q&A sessions to reinforce core OOP principles (polymorphism, encapsulation, inheritance) and systematic debugging.",
      "Bridging technical communication between professors and students to resolve lab blockers effectively.",
    ],
    tech: "Java, OOP, Git, Systematic Debugging, Mentorship",
  },
  {
    company: "School of Information Technology — KMITL IT Openhouse 2025",
    role: "Project Head — Multimedia Roblox Journey Workshop",
    dates: "Nov 28 – 29, 2025",
    achievements: [
      "Served as Project Head for the Roblox Training Program, leading curriculum development and pitching the training syllabus to faculty executives for sponsorship.",
      "Recruited and supervised Teaching Assistants (TAs) and Technical Directors (TDs), overseeing live classroom instruction for 100+ attendees.",
      "Managed workshop technical operations, lab machine environments, and hands-on Lua game prototyping sessions.",
    ],
    tech: "Roblox Studio, Lua, Curriculum Design, Team Management",
  },
  {
    company: "School of Information Technology, KMITL — ITCAMP 22: The Auspicious Jamboree",
    role: "Head of Game Workshop (Unreal Engine)",
    dates: "Apr 29 – May 2, 2026",
    achievements: [
      "Designed and structured the comprehensive Unreal Engine game development curriculum for high school campers, establishing interactive learning milestones.",
      "Trained and mentored the cohort of TAs and TDs, managing classroom pacing, technical guidance, and operational coordination throughout the camp.",
    ],
    tech: "Unreal Engine 5, Blueprints, Curriculum Architecture, Staff Mentorship",
  },
  {
    company: "Code Genius EmQuartier & Login-Engineering Academy",
    role: "Part-time Technical Instructor & Mentor",
    dates: "Sep 2024 – Present",
    achievements: [
      "Instructing primary school students in coding through block-based programming (Scratch, Micro:bit) and foundational Python.",
      "Providing individualized learning feedback and adapting lesson pacing to fit student progress in both Thai and English.",
      "Coached students in engineering competition-ready software projects submitted to national contests and university portfolios.",
    ],
    tech: "Scratch, Micro:bit, Python, Godot Engine",
  },
];

const featuredProjects = [
  {
    name: "TAWAN-OS — Autonomous Agentic Automation & Trend Intelligence",
    category: "AI & Automation",
    period: "2025 – Present",
    points: [
      "Architected a Markdown-first AI agent harness with multi-agent orchestration, CLI proxy, and custom Model Context Protocol (MCP) bridges to eliminate repetitive manual workflows.",
      "Designed structured LLM ingestion pipelines that extract, categorize, and cross-reference signals from heterogeneous transcripts and documentation into searchable knowledge repositories.",
      "Implemented deterministic verification checks and doctor diagnostics to guarantee hallucination-free outputs and persistent state tracking.",
    ],
    tech: "TypeScript, Python, MCP, Antigravity CLI, Multi-Agent Architecture, LLM Evals",
  },
  {
    name: "NOSE TEA 'Sip to Scale' — Corporate Strategy & O2O Redesign",
    category: "Business Strategy & Modeling",
    period: "2026",
    points: [
      "Formulated an intensive 30-day celebrity-free O2O growth strategy under a strict ฿500k budget constraint for a premium cheese tea brand in a red ocean market.",
      "Built a financial feasibility model forecasting ฿1.8M revenue, ROI of 260%, and 55% store GP margin, with break-even verified at 7,576 cups (Week 3).",
      "Redesigned customer journeys with smart e-Queues and LINE OA loyalty rituals, turning wait-time congestion into interactive engagement stations and onboarding 15,000+ digital members.",
    ],
    tech: "SCQ Framework, Financial Break-Even Modeling, Booku POS, LINE OA, Customer Journey Mapping",
  },
  {
    name: "HybriCareer AI (BridgeAI) — AI Labor Market Intelligence & SaaS",
    category: "Market Discovery & Hackathon",
    period: "2026",
    points: [
      "Analyzed NSO labor data highlighting a 34% youth unemployment rate; conducted qualitative interviews with career switchers and HR managers to isolate screening friction in legacy ATS software.",
      "Conceptualized and prototyped an interactive AI Skill-Proof Benchmark Radar, pitching the solution to earn selection as a Top 10 Finalist Proposal (5th Reserve) at Generation Thailand Hackathon 2026.",
    ],
    tech: "User Research, Labor Analytics, AI Benchmark Prototyping, Lovable, Pitching",
  },
  {
    name: "Disney Lorcana PlayLab — Cloud Serverless Real-Time Platform",
    category: "Cloud Architecture & Scalability",
    period: "2025 – 2026",
    points: [
      "Designed a full-stack real-time multiplayer platform on AWS Serverless architecture with <100ms WebSocket synchronization and DynamoDB Single-Table Design ($0.00 cost under Free Tier).",
      "Engineered automated Playwright E2E regression test suites and verified security integrity under the OWASP Top 10 framework.",
    ],
    tech: "AWS Lambda, API Gateway WebSockets, Amazon DynamoDB, Next.js, Playwright E2E, OWASP",
  },
  {
    name: "EasyDom (Chao-dom) — 0-to-1 UX Case Study",
    category: "Product & UX Strategy",
    period: "2024",
    points: [
      "Executed end-to-end UX research solving university dorm vacancy matching through in-depth qualitative interviews with students and dorm owners.",
      "Developed personas, experience maps, interactive Figma prototypes, and conducted usability tests yielding 15+ actionable design insights.",
    ],
    tech: "Figma, User Research, Usability Testing, Persona Mapping, Pitching",
  },
];

const skillGroups = [
  {
    label: "Strategy & Problem Framing",
    items: [
      "Business Case Structuring (SCQ)",
      "Financial Break-Even & ROI Modeling",
      "Customer Journey Mapping (O2O)",
      "Market & Labor Data Analytics",
      "Agile Sprint & Task Decomposition",
      "Executive Stakeholder Pitching",
    ],
  },
  {
    label: "AI & Automation Engineering",
    items: [
      "Multi-Agent Orchestration",
      "Antigravity CLI & agy",
      "Model Context Protocol (MCP)",
      "LINE Messaging API & Dialogflow",
      "Python Scripting & Automation",
      "Prompt Engineering & Evals",
    ],
  },
  {
    label: "Software Architecture & Dev",
    items: [
      "Next.js / React / TypeScript",
      "AWS Serverless (Lambda, API Gateway, DynamoDB)",
      "Automated Testing (Playwright E2E)",
      "Java OOP & C#",
      "REST APIs & WebSockets",
      "Git / GitHub CI & Docker",
    ],
  },
  {
    label: "Human-Centered UX / UI",
    items: [
      "Figma Prototyping & Design Systems",
      "User Research & Interviews",
      "Information Architecture",
      "Interaction & Motion Design",
      "WCAG 2.2 Accessibility",
      "Adobe Illustrator & Canva",
    ],
  },
];

const languages = [
  { lang: "Thai", pct: 100, level: "Native" },
  { lang: "English", pct: 85, level: "Professional Working Proficiency / Fluent" },
  { lang: "Japanese", pct: 25, level: "Beginner" },
];

const awards = [
  {
    name: "Top 10 Finalist Proposal — Generation Thailand Hackathon 2026",
    detail: "Nationwide hackathon finalist for HybriCareer AI (BridgeAI) — labor market analytics & AI skill verification radar",
    year: "2026",
  },
  {
    name: "Business Case Competitor — NOSE TEA 'Sip to Scale' 2026",
    detail: "Formulated 30-day celebrity-free O2O growth strategy and ฿1.8M financial feasibility model for premium tea brand",
    year: "2026",
  },
  {
    name: "LINE Developers University Workshop 2025",
    detail: "Hands-on conversational AI development using Dialogflow and LINE Messaging API by LINE Developers Thailand",
    year: "2025",
  },
  {
    name: "Game Business Workshop (เล่น..ให้เป็นเรื่อง ธุรกิจ)",
    detail: "Intensive 4-day workshop applying game mechanics and gamification frameworks to corporate business strategy",
    year: "2025",
  },
  {
    name: "NSC 2022 — Final Round Finalist",
    detail: "National Software Contest — Learning Mobile Application \"Detectcheat\" made with Unity engine learning how to respond to online fraud",
    year: "2022",
  },
  {
    name: "NSC 2023 — Second Round Finalist",
    detail: "National Software Contest — Computer game \"CriminalMind\" made with Unity engine",
    year: "2023",
  },
];

/* ─────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────── */

function StatBar({ label, pct, from, to }: { label: string; pct: number; from: string; to: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const blocks = 10;
  const filled = Math.round((pct / 100) * blocks);
  return (
    <div ref={ref} className="flex items-center gap-3 print:gap-2">
      <span className="font-mono text-xs text-muted-lilac w-20 shrink-0">{label}</span>
      <span className="font-mono text-xs text-muted-lilac/90 tracking-tight w-24 shrink-0">
        {"█".repeat(filled)}
        <span className="opacity-20">{"█".repeat(blocks - filled)}</span>
      </span>
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

function LangBar({ lang, pct, level }: { lang: string; pct: number; level: string }) {
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
      <span className="font-mono text-[10px] text-retro-yellow border border-retro-yellow/40 rounded px-1.5 py-0.5 shrink-0 w-16 text-center">
        {level}
      </span>
    </div>
  );
}

function PanelDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 border-t-2 border-muted-lilac/20 pt-6 mb-6 print:border-gray-200">
      <span className="font-display text-lg text-sakura-white print:text-black whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-neon-magenta/40 via-electric-blue/20 to-transparent" />
      <span className="text-neon-magenta/50 text-xs select-none">✦</span>
    </div>
  );
}

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

      {/* Download button — links to Google Drive */}
      <a
        href={RESUME_DRIVE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Resume from Google Drive"
        className="print:hidden fixed bottom-28 md:bottom-32 right-6 md:right-8 z-50 w-14 h-14 rounded-full bg-hot-pink flex items-center justify-center text-soft-white shadow-[0_0_24px_rgba(255,96,144,0.6)] hover:shadow-[0_0_36px_rgba(255,96,144,0.8)] hover:-translate-y-1 transition-all duration-300"
      >
        <FiDownload size={22} />
      </a>

      <div className="mx-auto max-w-4xl">

        {/* ── Page header ── */}
        <motion.div
          className="text-center mb-10 print:mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block border-2 border-neon-magenta/50 rounded-2xl px-10 py-5 relative print:border-gray-300">
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
              <div className="w-[150px] h-[150px] rounded-full border-4 border-neon-magenta/60 p-1.5 overflow-hidden">
                <img
                  src="/images/gallery/Profile.jpg"
                  alt="Thanatpat Promthong"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    t.parentElement!.innerHTML += '<div class="w-full h-full rounded-full border-2 border-muted-lilac/40 bg-gradient-to-br from-lavender/40 to-sakura-pink/40 flex items-center justify-center text-5xl">👤</div>';
                  }}
                />
              </div>
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <span key={i} className={`absolute ${cls} border-retro-yellow/70 w-4 h-4`} style={{ margin: -6 }} />
              ))}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-display text-3xl text-sakura-white print:text-black">THANATPAT PROMTHONG</h2>
                <p className="font-body font-bold text-neon-magenta text-base mt-0.5 print:text-pink-600">
                  Strategic Builder · AI & Automation Engineer · Product Designer
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                {[
                  { icon: <FiMapPin size={13} />, text: "451/1 Chalongkrung Rd, Lat Krabang, Bangkok 10520" },
                  { icon: <FiPhone size={13} />, text: "096-876-5392" },
                  { icon: <FiMail size={13} />, text: "tawaninm13@gmail.com" },
                  { icon: <FiGlobe size={13} />, text: "porfolio-website-five-inky.vercel.app" },
                  { icon: <FiLinkedin size={13} />, text: "linkedin.com/in/thanatpat-promthong-9084a4212" },
                  { icon: <FiGithub size={13} />, text: "github.com/tawaninm" },
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

          {/* ── Summary ── */}
          <div className="px-8 md:px-10 pt-8 print:pt-4">
            <FadePanel>
              <PanelDivider title="Summary" />
              <p className="font-body text-sm text-soft-white/70 leading-relaxed print:text-gray-600">
                Third-year IT student at KMITL specializing in AI automation systems, software architecture, and product strategy. Proven track record leading technical workshops (Project Head for IT Openhouse Roblox Training), mentoring university peers as a Java OOP Teaching Assistant, and architecting multi-agent AI harnesses (TAWAN-OS) and cloud platforms (Disney Lorcana PlayLab on AWS Serverless). Grounded in structured problem-solving, stakeholder communication, and end-to-end product delivery from user research to production code.
              </p>
            </FadePanel>
          </div>

          {/* ── Content body ── */}
          <div className="p-8 md:p-10 flex flex-col gap-10 print:gap-6">

            {/* Work Experience */}
            <FadePanel delay={0.05}>
              <PanelDivider title="Work Experience" />
              <div className="flex flex-col gap-5">
                {workExperience.map((w) => (
                  <div
                    key={w.company + w.dates}
                    className="grid grid-cols-1 md:grid-cols-[130px_1fr] gap-x-4 gap-y-0.5 items-start border-l-2 border-neon-magenta/30 pl-4 print:border-gray-300"
                  >
                    <span className="font-mono text-xs text-retro-yellow shrink-0">{w.dates}</span>
                    <div>
                      <span className="font-body font-bold text-sm text-neon-magenta print:text-pink-600">{w.role}</span>
                      <span className="font-display text-sm text-sakura-white print:text-black ml-2">@ {w.company}</span>
                      <ul className="mt-0.5 flex flex-col gap-0.5">
                        {w.achievements.map((a) => (
                          <li key={a} className="font-body text-xs text-soft-white/55 print:text-gray-500 before:content-['·'] before:mr-1.5">{a}</li>
                        ))}
                      </ul>
                      {w.tech && (
                        <p className="font-mono text-[10px] text-muted-lilac/90 mt-1">Tech: {w.tech}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </FadePanel>

            {/* Featured Systems & Projects */}
            <FadePanel delay={0.08}>
              <PanelDivider title="Featured Systems & Projects" />
              <div className="flex flex-col gap-5">
                {featuredProjects.map((p) => (
                  <div
                    key={p.name}
                    className="border-l-2 border-electric-blue/40 pl-4 print:border-gray-300"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-body font-bold text-sm text-sakura-white print:text-black">
                        {p.name}
                      </span>
                      <span className="font-mono text-xs text-retro-yellow shrink-0">
                        {p.period}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-sky-cyan uppercase tracking-wider">
                      {p.category}
                    </span>
                    <ul className="mt-1 flex flex-col gap-0.5">
                      {p.points.map((pt) => (
                        <li
                          key={pt}
                          className="font-body text-xs text-soft-white/60 print:text-gray-600 before:content-['·'] before:mr-1.5"
                        >
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <p className="font-mono text-[10px] text-muted-lilac/90 mt-1">
                      Stack: {p.tech}
                    </p>
                  </div>
                ))}
              </div>
            </FadePanel>

            {/* Education */}
            <FadePanel delay={0.1}>
              <PanelDivider title="Education" />
              <div className="flex flex-col gap-5">
                {education.map((e) => (
                  <div key={e.school} className="flex flex-col md:flex-row md:items-start gap-1 md:gap-6">
                    <span className="font-mono text-xs text-retro-yellow shrink-0 w-28">{e.year}</span>
                    <div>
                      <p className="font-body font-bold text-sakura-white text-sm print:text-black">{e.degree}</p>
                      {e.module && <p className="font-body text-xs text-neon-magenta/80 print:text-pink-500">{e.module}</p>}
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

            {/* Awards & Achievements */}
            <FadePanel delay={0.15}>
              <PanelDivider title="Award / Achievement" />
              <div className="flex flex-wrap gap-3">
                {awards.map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-col gap-0.5 px-5 py-3.5 rounded-xl border-2 border-muted-lilac/20 bg-soft-white/5 hover:border-neon-magenta/40 transition-colors duration-300 print:border-gray-200"
                  >
                    <span className="font-body font-bold text-sm text-sakura-white print:text-black">{c.name}</span>
                    <span className="font-body text-xs text-muted-lilac print:text-gray-500">{c.detail}</span>
                    <span className="font-mono text-[10px] text-retro-yellow/80 print:text-gray-400">{c.year}</span>
                  </div>
                ))}
              </div>
            </FadePanel>

            {/* Skills */}
            <FadePanel delay={0.2}>
              <PanelDivider title="Skills" />
              <div className="flex flex-col gap-5">
                {skillGroups.map((g) => (
                  <div key={g.label}>
                    <p className="font-mono text-[10px] text-muted-lilac/90 uppercase tracking-widest mb-2">
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
            <FadePanel delay={0.25}>
              <PanelDivider title="Languages" />
              <div className="flex flex-col gap-3 max-w-sm">
                {languages.map((l) => (
                  <LangBar key={l.lang} {...l} />
                ))}
              </div>
            </FadePanel>

          </div>
        </motion.div>
      </div>

      <style>{`
        @media print {
          nav, footer, button, a[aria-label="Download Resume from Google Drive"] { display: none !important; }
          body { background: white !important; color: black !important; }
          * { animation: none !important; transition: none !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </main>
  );
}
