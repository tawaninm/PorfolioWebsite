"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "next-view-transitions";
import { FiMapPin, FiMail, FiPhone, FiGlobe, FiDownload, FiLinkedin, FiGithub } from "react-icons/fi";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
// Content mirrors TAWAN-OS/09_WORK/Internships/Resume/Resume_Thanatpat_Promthong_Bluebik.html
const RESUME_PDF_URL = "/Resume_Thanatpat_Promthong_Bluebik_2Page.pdf";
const AVAILABILITY = "Full-time internship, 5 days/week, 1 Apr – 30 Jun 2027";

const education = [
  {
    school: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    degree: "Bachelor of Science in Information Technology (Third-year)",
    module: "Module: Multimedia & Game Development",
    year: "Aug 2024 – Now",
    notes: [
      "Relevant coursework: Human Interface Design, Web Development, Computer Graphics, Object-Oriented Programming (Java), Cloud Computing, Database Systems",
      "Academic projects: Drive@KMITL (FastAPI/Next.js WebSocket chat), VPS-Tycoon (JavaFX OOP simulation), Synchro (ESP32 rhythm controller)",
    ],
  },
];

const workExperience = [
  {
    company: "Gumon Technology",
    role: "User Experience Designer Intern",
    dates: "Jun 1 – Aug 30, 2026",
    achievements: [
      "Redesigned the UI of MonsTask, a productivity workspace app, together with my mentor, and wrote the UX/UI requirement document (V1 to V2) for the Business Analyst.",
      "Proposed user flows, user journeys and a phased work plan in review sessions with the BA and developers.",
      "Set up the base of Gumon's first design system: a 4-tier token structure (Brand, Alias, Mapped, Responsive) with 121 tokens, a 22-component MVP roadmap and a 16-page Figma file structure.",
      "Discussed with developers which tech stack to use for exporting design tokens from Figma into code.",
    ],
    tech: "Figma, User Flow, User Journey, UI Redesign, UX/UI Requirements, Design Tokens",
    link: "/projects/gumon-monstask",
  },
  {
    company: "School of Information Technology, KMITL",
    role: "Teaching Assistant — Object-Oriented Programming (Java)",
    dates: "Nov 2025 – Present",
    achievements: [
      "Review weekly code submissions and give 1-on-1 feedback to 100+ first-year IT students on OOP principles and debugging.",
      "Run weekly Q&A sessions that explain software design patterns with simple mental models.",
    ],
    tech: "Java, OOP, Git, Mentoring",
  },
  {
    company: "KMITL IT Openhouse 2025",
    role: "Project Head — Multimedia Roblox Journey Workshop",
    dates: "Nov 28 – 29, 2025",
    achievements: [
      "Designed the curriculum for a 2-day Lua coding workshop and presented the syllabus to faculty to get approval and lab resources.",
      "Recruited, trained and led 10+ Teaching Assistants and Technical Directors for 100+ high school participants.",
    ],
    tech: "Roblox Studio, Lua, Curriculum Design, Team Leadership",
  },
  {
    company: "ITCAMP 22, School of IT, KMITL",
    role: "Head of Game Workshop (Unreal Engine)",
    dates: "Apr 29 – May 2, 2026",
    achievements: [
      "Designed the Unreal Engine game development curriculum for high school participants and trained the TA and TD team who ran it.",
    ],
    tech: "Unreal Engine 5, Blueprints, Curriculum Design",
  },
  {
    company: "Code Genius EmQuartier & Login-Engineering Academy",
    role: "Part-time Technical Instructor",
    dates: "Sep 2024 – Present",
    achievements: [
      "Teach students from primary to high school level, adjusting lesson pace and explanations to each student in Thai and English.",
    ],
    tech: "Scratch, Micro:bit, Python, Godot Engine",
  },
];

const featuredProjects = [
  {
    name: "HybriCareer AI (BridgeAI) — Career Transition Platform Proposal",
    category: "User Research & Prototype",
    period: "Generation Thailand 2026",
    points: [
      "Reviewed National Statistical Office (NSO) labor data (34% youth unemployment) and interviewed 5 career switchers and 2 HR managers to find where applicant screening breaks down in current ATS software.",
      "Designed and prototyped a Skill-Proof Radar that scores transferable skills from portfolio work; the proposal was selected as a Top 10 Finalist (5th Reserve) nationwide.",
    ],
    tech: "User Interviews, Problem Framing, Figma, Prototype (Lovable)",
  },
  {
    name: "NOSE TEA 'Sip to Scale' — Customer Journey Redesign & Business Case",
    category: "Customer Journey",
    period: "Business Case Comp 2026",
    points: [
      "Mapped the in-store queue journey of a cheese tea brand and redesigned it with an e-Queue and LINE OA loyalty steps so waiting time becomes in-store engagement; the plan targeted 15,000+ new digital members.",
      "Built a 30-day growth plan within a ฿500,000 budget, with a financial model projecting ฿1.8M revenue and break-even at 7,576 cups (week 3).",
    ],
    tech: "Customer Journey Mapping, SCQ Framework, Break-Even Modeling, LINE OA",
  },
  {
    name: "EasyDom (Chao-dom) — 0-to-1 UX Case Study",
    category: "User Research & Usability Testing",
    period: "2024",
    points: [
      "Interviewed students and dorm owners to understand how dorm vacancies are found and matched.",
      "Built personas, experience maps and interactive Figma prototypes, then ran usability tests that produced 15+ design insights.",
    ],
    tech: "Figma, User Research, Usability Testing, Personas",
  },
  {
    name: "Red Bull Racing F1 — Interactive 3D Web Experience",
    category: "Interactive Experience",
    period: "Personal Project",
    points: ["Designed and built a scroll-driven 3D showcase with an exploded view of the car and parallax camera movement."],
    tech: "Three.js, GSAP ScrollTrigger, Google Veo, HTML/CSS/JavaScript",
  },
  {
    name: "Technical Projects — TAWAN-OS & Disney Lorcana PlayLab",
    category: "Engineering",
    period: "2025 – Present",
    points: [
      "TAWAN-OS: personal multi-agent AI workspace that connects CLI agents and MCP servers (including Figma) for research, documentation and verification tasks.",
      "Disney Lorcana PlayLab: real-time multiplayer card game on AWS Serverless (WebSockets, Lambda, DynamoDB) with Playwright E2E tests that include OWASP Top 10 checks.",
    ],
    tech: "Python, TypeScript, MCP, AWS Serverless, Playwright",
  },
];

const skillGroups = [
  {
    label: "Experience Design",
    items: [
      "User Flow",
      "User Journey",
      "Information Architecture",
      "Wireframing",
      "Interactive Prototyping",
      "User Interviews",
      "Usability Testing",
      "UX Writing",
      "WCAG Accessibility",
      "Apple HIG",
    ],
  },
  {
    label: "Design Tools",
    items: ["Figma (Auto Layout, Variables, Components)", "FigJam", "Adobe Photoshop", "Adobe Illustrator", "Canva"],
  },
  {
    label: "Design Systems & Front-end",
    items: ["Design Tokens", "Component Guidelines", "HTML/CSS", "Tailwind CSS", "React", "Next.js", "TypeScript", "Git/GitHub"],
  },
  {
    label: "Collaboration & Strategy",
    items: [
      "Stakeholder Presentation",
      "Requirement Discussions with BA and Developers",
      "Customer Journey Mapping (O2O)",
      "SCQ Problem Framing",
      "Agile Sprint Planning",
    ],
  },
  {
    label: "AI & Automation",
    items: ["Claude Code", "Model Context Protocol (MCP)", "Prompt Engineering", "Python Scripting"],
  },
];

const languages = [
  { lang: "Thai", pct: 100, level: "Native" },
  { lang: "English", pct: 85, level: "Professional Working Proficiency / Fluent" },
  { lang: "Japanese", pct: 25, level: "Beginner" },
];

const awards = [
  {
    name: "Google Student Ambassador Thailand",
    detail: "Google Student Ambassador program, Thailand",
    year: "2026",
  },
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

      {/* Download button — Bluebik resume PDF served from /public */}
      <a
        href={RESUME_PDF_URL}
        download
        aria-label="Download Resume (PDF)"
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
                <p className="font-body text-sm text-muted-lilac print:text-gray-500">ธนัทภัทร พรหมทอง</p>
                <p className="font-body font-bold text-neon-magenta text-base mt-0.5 print:text-pink-600">
                  Experience / UX-UI Designer · Third-year IT, KMITL
                </p>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                {[
                  { icon: <FiMapPin size={13} />, text: "Lat Krabang, Bangkok 10520" },
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

              {/* Availability */}
              <p className="mt-2 inline-flex flex-wrap items-center gap-2 font-body text-sm text-sakura-white print:text-black">
                <span className="font-mono text-[10px] uppercase tracking-widest text-retro-yellow border border-retro-yellow/40 rounded px-2 py-0.5">
                  Availability
                </span>
                {AVAILABILITY}
              </p>
            </div>
          </div>

          {/* ── Summary ── */}
          <div className="px-8 md:px-10 pt-8 print:pt-4">
            <FadePanel>
              <PanelDivider title="Summary" />
              <p className="font-body text-sm text-soft-white/70 leading-relaxed print:text-gray-600">
                Third-year Information Technology student at King Mongkut&apos;s Institute of Technology Ladkrabang (KMITL), focused on experience design, design systems and design-to-development handoff. During my UX internship at Gumon Technology, I worked with my mentor on the UI redesign of MonsTask, a productivity workspace app, wrote the UX/UI requirement document for the Business Analyst, and set up the token structure for the company&apos;s first design system. I present user flows, user journeys and phased work plans to BA and development teams, and I know enough front-end code (React, Next.js, CSS) to discuss how design tokens move from Figma into code. Leading workshops for 100+ participants and working as a teaching assistant taught me to explain ideas clearly to different audiences.
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
                      {"link" in w && w.link && (
                        <Link
                          href={w.link}
                          className="inline-block mt-1.5 font-body text-xs font-bold text-sky-cyan underline underline-offset-2 hover:text-neon-magenta print:hidden"
                        >
                          View case study →
                        </Link>
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
          nav, footer, button, a[aria-label="Download Resume (PDF)"] { display: none !important; }
          body { background: white !important; color: black !important; }
          * { animation: none !important; transition: none !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </main>
  );
}
