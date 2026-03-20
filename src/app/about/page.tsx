"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════
   DATA  (edit src/data/my-profile.md to update)
═══════════════════════════════════════════ */

const profile = {
  name: "Your Name",
  tagline: "Designer · Developer · Creator",
  location: "Bangkok, Thailand",
  bio: [
    "I'm a multidisciplinary designer and developer who loves blending thoughtful UX, clean code, and city pop aesthetics. I build digital products that feel alive — from concept to pixel-perfect delivery.",
    "Currently studying at the School of Information Technology, KMITL. I spend my days designing interfaces, writing TypeScript, and daydreaming about vaporwave sunsets.",
    "When I'm not at my desk, you'll find me rewatching anime, exploring game mechanics, or hunting for the perfect lo-fi playlist to code to.",
  ],
  quotes: [
    { text: "Design is music you can see.", bg: "bg-lavender/20", rotate: "-rotate-1" },
    { text: "Every pixel is a decision. Make it count.", bg: "bg-sky-cyan/20", rotate: "rotate-1" },
    { text: "The best interface is the one that disappears.", bg: "bg-sakura-pink/20", rotate: "-rotate-[0.5deg]" },
  ],
  gallery: [
    { caption: "At the studio",   gradient: "from-lavender/40 to-sakura-pink/30" },
    { caption: "Workshop day",    gradient: "from-sky-cyan/40 to-mint/30" },
    { caption: "Hackathon night", gradient: "from-neon-magenta/25 to-deep-purple/30" },
    { caption: "Team vibes",      gradient: "from-retro-yellow/25 to-peach/30" },
    { caption: "Sunset coding",   gradient: "from-mint/35 to-sky-cyan/25" },
    { caption: "Campus life",     gradient: "from-sakura-pink/30 to-lavender/25" },
  ],
  education: [
    {
      year: "2023 – Present",
      school: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
      degree: "B.Sc. Information Technology",
      desc: "Majoring in IT with focus on software engineering, UX design, and game development. Maintaining strong GPA while leading extracurricular tech events.",
    },
    {
      year: "2020 – 2023",
      school: "Your High School",
      degree: "Science-Math Program",
      desc: "Participated in national software contests and developed a passion for programming and design.",
    },
  ],
  experience: [
    {
      year: "2024",
      role: "Senior UX Designer",
      company: "Company A",
      desc: "Led end-to-end product design for three flagship products. Established a cross-platform design system used by 10+ engineers.",
      tech: ["Figma", "FigJam", "Maze", "Notion", "Lottie"],
    },
    {
      year: "2023",
      role: "Frontend Developer",
      company: "Company B",
      desc: "Built responsive, accessible interfaces with React and TypeScript. Collaborated closely with design teams to translate pixel-perfect specs into production-ready components.",
      tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
      year: "2022",
      role: "CI Artist & Designer",
      company: "Company C",
      desc: "Created corporate identity materials, illustration assets, and print collateral. Developed brand guidelines and mascot characters.",
      tech: ["Procreate", "Adobe Illustrator", "Photoshop", "InDesign"],
    },
    {
      year: "2021",
      role: "Junior Designer",
      company: "Company D",
      desc: "Designed marketing visuals, social media assets, and UI wireframes. Gained foundational skills in user research, prototyping, and design handoff.",
      tech: ["Figma", "Photoshop", "Illustrator", "Notion"],
    },
  ],
  anime: [
    { title: "Bocchi the Rock!", genre: "Slice of Life / Music",  gradient: "from-sakura-pink/40 to-lavender/30" },
    { title: "Yuru Camp",        genre: "Slice of Life",           gradient: "from-mint/40 to-sky-cyan/30" },
    { title: "Cyberpunk Edgerunners", genre: "Sci-Fi / Action",   gradient: "from-neon-magenta/30 to-deep-purple/40" },
    { title: "K-On!",            genre: "Slice of Life / Music",  gradient: "from-retro-yellow/30 to-peach/30" },
    { title: "Made in Abyss",    genre: "Adventure / Fantasy",    gradient: "from-sky-cyan/30 to-ocean-blue/40" },
    { title: "Vinland Saga",     genre: "Historical / Action",    gradient: "from-sunset-gold/30 to-peach/40" },
  ],
  games: [
    { title: "Hollow Knight",   genre: "Metroidvania",     gradient: "from-deep-purple/50 to-lavender/20" },
    { title: "Stardew Valley",  genre: "Simulation / RPG", gradient: "from-mint/40 to-retro-yellow/25" },
    { title: "Celeste",         genre: "Platformer",       gradient: "from-sakura-pink/35 to-sky-cyan/30" },
    { title: "Hades",           genre: "Roguelite",        gradient: "from-coral-red/30 to-neon-magenta/25" },
    { title: "Disco Elysium",   genre: "RPG / Detective",  gradient: "from-ocean-blue/40 to-muted-lilac/30" },
    { title: "Unreal Engine Dev", genre: "Game Dev",       gradient: "from-electric-blue/30 to-sky-cyan/25" },
  ],
  otherHobbies: [
    { title: "City Pop & Music",     emoji: "🎵", desc: "Curating playlists of 80s Japanese city pop and vaporwave. Mariya Takeuchi is a permanent resident of my Spotify.", gradient: "from-lavender/30 to-sakura-pink/25" },
    { title: "Digital Illustration", emoji: "🎨", desc: "Drawing character art and UI concepts in Procreate. Blending anime aesthetics with product design.", gradient: "from-sky-cyan/30 to-mint/25" },
    { title: "Coffee & Cafés",       emoji: "☕", desc: "Hunting for Bangkok's best specialty coffee shops. A good café doubles as a perfect remote office.", gradient: "from-sunset-gold/30 to-peach/25" },
  ],
  contact: {
    email: "your@email.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
};

/* ═══════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" as const },
    transition: { duration: 0.7, delay, ease },
  };
}

function Sparkle({ size, style }: { size: number; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size}
      className="absolute pointer-events-none select-none" style={style} aria-hidden="true">
      <path d="M20 2 L22.5 17.5 L38 20 L22.5 22.5 L20 38 L17.5 22.5 L2 20 L17.5 17.5 Z"
        fill="#F0B0D0" opacity={0.85} />
    </svg>
  );
}

function SectionLabel({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="text-center mb-14">
      <h2 className="font-display text-4xl md:text-5xl tracking-widest text-dark-navy dark:text-soft-white transition-colors duration-300">
        {en}
      </h2>
      <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest">{ja}</p>
    </div>
  );
}

function SpeedLines({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 24" width={80} height={24} aria-hidden="true" className="shrink-0"
      style={flip ? { transform: "scaleX(-1)" } : undefined}>
      {[2, 7, 13, 19].map((y, i) => (
        <line key={i} x1={i % 2 === 0 ? 0 : 8} y1={y} x2={80} y2={y}
          stroke="#FF2D78" strokeWidth={i === 1 ? 2 : 1} strokeOpacity={0.35 + i * 0.1} />
      ))}
    </svg>
  );
}

function ChapterHeader({ chapter, title }: { chapter: string; title: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-16">
      <SpeedLines />
      <div className="text-center shrink-0">
        <span className="font-mono text-xs text-neon-magenta uppercase tracking-[0.2em]">{chapter}</span>
        <p className="font-display text-xl text-dark-navy dark:text-soft-white leading-tight">{title}</p>
      </div>
      <SpeedLines flip />
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO BANNER
═══════════════════════════════════════════ */
function HeroBanner() {
  return (
    <section className="relative overflow-hidden min-h-[55vh] flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1A3A5C 0%, #1C1C2E 60%, #0A0A0A 100%)" }}>
      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone-bg opacity-[0.06] pointer-events-none" />

      {/* Floating blobs */}
      <motion.div className="absolute top-12 left-[8%] w-48 h-48 rounded-full bg-electric-blue/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-8 right-[10%] w-56 h-56 rounded-full bg-lavender/10 blur-3xl pointer-events-none"
        animate={{ y: [0, 16, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[40%] right-[20%] w-32 h-32 rounded-full bg-neon-magenta/8 blur-2xl pointer-events-none"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

      {/* Corner manga panel lines */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-electric-blue/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-electric-blue/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-electric-blue/20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-electric-blue/20 pointer-events-none" />

      <div className="relative z-10 text-center px-6 pt-28 pb-16">
        {/* Avatar frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          className="relative inline-block mb-8"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 0 3px rgba(80,128,240,0.5), 0 0 40px rgba(80,128,240,0.25)" }} />
            {/* Avatar placeholder */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-ocean-blue via-electric-blue to-lavender flex items-center justify-center border-2 border-electric-blue/50">
              <span className="font-display text-4xl md:text-5xl text-soft-white/30 select-none">
                {profile.name[0]}
              </span>
            </div>
            {/* Anime decorative border dots */}
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const r = (deg * Math.PI) / 180;
              const x = 50 + 52 * Math.cos(r);
              const y = 50 + 52 * Math.sin(r);
              return (
                <div key={deg} className="absolute w-2 h-2 rounded-full bg-electric-blue/60"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }} />
              );
            })}
            {/* Sparkles */}
            <Sparkle size={16} style={{ top: -10, right: -8, transform: "rotate(15deg)" }} />
            <Sparkle size={11} style={{ bottom: -6, left: -10, transform: "rotate(40deg)" }} />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-widest text-soft-white leading-none mb-2">
            ABOUT ME
          </h1>
          <p className="font-zen text-lg text-muted-lilac tracking-widest mb-3">私について</p>
          <p className="font-body text-soft-white/50 text-sm tracking-wider">
            {profile.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — PERSONAL INTRODUCTION
═══════════════════════════════════════════ */
function IntroSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute top-20 left-[5%] w-32 h-32 rounded-full bg-sakura-pink/15 blur-3xl"
          animate={{ y: [0, -16, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-16 right-[8%] w-40 h-40 rounded-full bg-lavender/15 blur-3xl"
          animate={{ y: [0, 12, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div {...fadeUp(0)}>
          <SectionLabel en="INTRODUCTION ✦" ja="自己紹介" />
        </motion.div>

        {/* Name + location */}
        <motion.div {...fadeUp(0.05)} className="text-center mb-12">
          <p className="font-display text-2xl md:text-3xl text-dark-navy dark:text-soft-white mb-1">
            {profile.name}
          </p>
          <p className="font-mono text-sm text-muted-lilac tracking-wider">📍 {profile.location}</p>
        </motion.div>

        {/* Bio paragraphs as manga panels */}
        <div className="flex flex-col gap-8">
          {profile.bio.map((para, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className={`relative bg-soft-white/60 dark:bg-dark-navy/60 backdrop-blur-md border-2 border-vinyl-dark/20 dark:border-soft-white/10 rounded-2xl p-6 md:p-8 ${i % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"}`}
            >
              {/* Halftone corner */}
              <div className="absolute inset-0 halftone-bg opacity-[0.04] pointer-events-none rounded-2xl" />
              {/* Panel number */}
              <span className="absolute -top-3 -left-2 font-display text-[80px] leading-none text-lavender/10 select-none pointer-events-none z-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-body text-dark-navy/85 dark:text-soft-white/85 leading-relaxed text-lg relative z-10">
                {para}
              </p>
              {/* Decorative bottom line */}
              <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-hot-pink to-electric-blue rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Speech bubble quote */}
        <motion.div {...fadeUp(0.35)} className="mt-12 flex justify-center">
          <div className="relative max-w-sm">
            <div className="bg-vinyl-dark border-2 border-neon-magenta/40 rounded-2xl px-6 py-4 shadow-[0_0_20px_rgba(255,45,120,0.15)]">
              <p className="font-body text-soft-white italic text-center leading-relaxed">
                &ldquo;{profile.quotes[0].text}&rdquo;
              </p>
            </div>
            {/* Bubble tail */}
            <div className="absolute -bottom-[11px] left-10 w-0 h-0"
              style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "11px solid rgba(255,45,120,0.4)" }} />
            <div className="absolute -bottom-[8px] left-[34px] w-0 h-0"
              style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "8px solid #1C1C2E" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — PHOTO GALLERY
═══════════════════════════════════════════ */
function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (i: number) => { setLightboxIdx(i); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);
  const navigate = useCallback((i: number) => setLightboxIdx(i), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") setLightboxIdx((p) => Math.max(0, p - 1));
      if (e.key === "ArrowRight") setLightboxIdx((p) => Math.min(profile.gallery.length - 1, p + 1));
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-soft-white/30 dark:bg-dark-navy/30">
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div {...fadeUp(0)}>
          <SectionLabel en="GALLERY ✦" ja="ギャラリー" />
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {profile.gallery.map((photo, i) => (
            <motion.button
              key={i}
              {...fadeUp(i * 0.08)}
              onClick={() => openLightbox(i)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer focus:outline-none focus:ring-2 focus:ring-electric-blue"
            >
              {/* Gradient placeholder (replace with next/image when real photos available) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-5xl text-dark-navy/20 select-none">{String(i + 1).padStart(2,"0")}</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark-navy/0 group-hover:bg-dark-navy/40 transition-all duration-400" />
              <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none" />
              {/* Scale on hover */}
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-dark-navy/80 to-transparent">
                <p className="font-body text-sm text-soft-white font-medium">{photo.caption}</p>
              </div>
              {/* Neon glow on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 2px rgba(80,128,240,0.5), 0 0 30px rgba(80,128,240,0.25)" }} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="absolute inset-0 bg-dark-navy/92 backdrop-blur-md" onClick={closeLightbox} />

            <button onClick={closeLightbox} aria-label="Close"
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-soft-white/10 border border-soft-white/20 flex items-center justify-center text-soft-white hover:bg-hot-pink/30 transition-colors duration-200">
              ✕
            </button>
            <span className="absolute top-6 left-6 z-10 font-body text-sm text-soft-white/60">
              {lightboxIdx + 1} / {profile.gallery.length}
            </span>

            {lightboxIdx > 0 && (
              <button onClick={() => navigate(lightboxIdx - 1)} aria-label="Previous"
                className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-soft-white/10 border border-soft-white/20 flex items-center justify-center text-soft-white text-xl hover:bg-electric-blue/40 transition-all duration-200">
                ←
              </button>
            )}
            {lightboxIdx < profile.gallery.length - 1 && (
              <button onClick={() => navigate(lightboxIdx + 1)} aria-label="Next"
                className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-soft-white/10 border border-soft-white/20 flex items-center justify-center text-soft-white text-xl hover:bg-electric-blue/40 transition-all duration-200">
                →
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div key={lightboxIdx}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease }}
                className="relative z-10 w-[90vw] max-w-3xl aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${profile.gallery[lightboxIdx].gradient}`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="font-display text-6xl text-dark-navy/20 select-none">
                    {String(lightboxIdx + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-sm text-dark-navy/50">{profile.gallery[lightboxIdx].caption}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — QUOTES
═══════════════════════════════════════════ */
function QuotesSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div {...fadeUp(0)}>
          <SectionLabel en="MOTTOS ✦" ja="モットー" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.quotes.map((q, i) => (
            <motion.div
              key={i}
              {...fadeUp(i * 0.1)}
              className={`relative rounded-2xl border-2 border-vinyl-dark/20 dark:border-soft-white/10 p-8 ${q.bg} ${q.rotate} hover:rotate-0 transition-transform duration-300 backdrop-blur-sm`}
            >
              {/* Quote mark */}
              <span className="font-display text-6xl leading-none text-dark-navy/10 dark:text-soft-white/10 absolute top-3 left-4 select-none">
                &ldquo;
              </span>
              <p className="font-body text-lg text-dark-navy/80 dark:text-soft-white/80 leading-relaxed italic relative z-10 mt-4">
                {q.text}
              </p>
              <div className="mt-4 h-0.5 w-10 bg-gradient-to-r from-hot-pink to-electric-blue rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — EDUCATION TIMELINE
═══════════════════════════════════════════ */
function EducationSection() {
  return (
    <section id="education" className="relative py-24 px-6 overflow-hidden bg-soft-white/30 dark:bg-dark-navy/30">
      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div {...fadeUp(0)}>
          <SectionLabel en="EDUCATION ✦" ja="学歴" />
        </motion.div>
        <ChapterHeader chapter="Chapter 00" title="Academic Journey" />

        <div className="relative">
          {/* Center line desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #5080F0, #40C8A0)" }} />
          {/* Left rail mobile */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #5080F0, #40C8A0)" }} />

          <div className="flex flex-col gap-12 md:gap-16">
            {profile.education.map((edu, i) => {
              const isLeft = i % 2 === 0;
              const rotation = isLeft ? "rotate-[0.5deg]" : "rotate-[-0.5deg]";
              return (
                <div key={i}>
                  {/* Desktop */}
                  <div className="hidden md:grid grid-cols-[1fr_32px_1fr] items-center gap-0 relative">
                    {isLeft ? (
                      <motion.div {...fadeUp(i * 0.15)} className="pr-8 flex justify-end">
                        <EduCard edu={edu} rotation={rotation} side="left" />
                      </motion.div>
                    ) : <div />}
                    <div className="flex justify-center items-center">
                      <div className="w-4 h-4 rounded-full bg-electric-blue z-10"
                        style={{ boxShadow: "0 0 0 3px #1C1C2E, 0 0 12px rgba(80,128,240,0.7)" }} />
                    </div>
                    {!isLeft ? (
                      <motion.div {...fadeUp(i * 0.15)} className="pl-8">
                        <EduCard edu={edu} rotation={rotation} side="right" />
                      </motion.div>
                    ) : <div />}
                  </div>
                  {/* Mobile */}
                  <motion.div className="md:hidden relative pl-8" {...fadeUp(i * 0.1)}>
                    <div className="absolute left-0 -translate-x-1/2 top-8 w-3.5 h-3.5 rounded-full bg-electric-blue z-10"
                      style={{ boxShadow: "0 0 0 2px #1C1C2E, 0 0 10px rgba(80,128,240,0.7)" }} />
                    <EduCard edu={edu} rotation={rotation} side="right" />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EduCard({ edu, rotation, side }: { edu: typeof profile.education[0]; rotation: string; side: "left" | "right" }) {
  return (
    <div className={`relative ${rotation}`}>
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-electric-blue/40 ${side === "left" ? "-right-8" : "-left-8"}`} />
      <div className="mb-3">
        <span className="inline-block px-4 py-1 rounded-full bg-vinyl-dark text-sky-cyan font-bold font-mono text-sm border border-electric-blue/30">
          {edu.year}
        </span>
      </div>
      <div className="bg-soft-white/90 dark:bg-vinyl-dark/80 border-2 border-dark-navy/10 dark:border-muted-lilac/20 rounded-xl p-6 shadow-md hover:shadow-[0_8px_30px_rgba(80,128,240,0.2)] transition-all duration-300">
        <p className="font-body font-bold text-lg text-electric-blue mb-0.5">{edu.degree}</p>
        <p className="font-display text-xl text-dark-navy dark:text-soft-white mb-3">{edu.school}</p>
        <p className="font-body text-sm text-dark-navy/70 dark:text-soft-white/70 leading-relaxed">{edu.desc}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 6 — EXPERIENCE TIMELINE
═══════════════════════════════════════════ */
function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl relative z-10">
        <motion.div {...fadeUp(0)}>
          <SectionLabel en="EXPERIENCE ✦" ja="経験" />
        </motion.div>
        <ChapterHeader chapter="Chapter 01" title="My Journey" />

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #FF2D78, #5080F0, #40C8A0)" }} />
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #FF2D78, #5080F0, #40C8A0)" }} />

          <div className="flex flex-col gap-12 md:gap-16">
            {profile.experience.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const rotation = isLeft ? "rotate-[0.5deg]" : "rotate-[-0.5deg]";
              return (
                <div key={i}>
                  <div className="hidden md:grid grid-cols-[1fr_32px_1fr] items-center gap-0 relative">
                    {isLeft ? (
                      <motion.div {...fadeUp(i * 0.12)} className="pr-8 flex justify-end">
                        <ExpCard exp={exp} rotation={rotation} side="left" />
                      </motion.div>
                    ) : <div />}
                    <div className="flex justify-center items-center">
                      <div className="w-4 h-4 rounded-full bg-neon-magenta z-10"
                        style={{ boxShadow: "0 0 0 3px #1C1C2E, 0 0 12px rgba(255,45,120,0.7)" }} />
                    </div>
                    {!isLeft ? (
                      <motion.div {...fadeUp(i * 0.12)} className="pl-8">
                        <ExpCard exp={exp} rotation={rotation} side="right" />
                      </motion.div>
                    ) : <div />}
                  </div>
                  <motion.div className="md:hidden relative pl-8" {...fadeUp(i * 0.1)}>
                    <div className="absolute left-0 -translate-x-1/2 top-8 w-3.5 h-3.5 rounded-full bg-neon-magenta z-10"
                      style={{ boxShadow: "0 0 0 2px #1C1C2E, 0 0 10px rgba(255,45,120,0.7)" }} />
                    <ExpCard exp={exp} rotation={rotation} side="right" />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* To be continued */}
        <motion.div {...fadeUp(0.3)} className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 border-2 border-neon-magenta/30 rounded-2xl px-8 py-4 bg-vinyl-dark/30 backdrop-blur-sm">
            <span className="font-display text-2xl text-dark-navy dark:text-soft-white">To be continued</span>
            <span className="font-display text-2xl text-neon-magenta tracking-widest">...</span>
            <span className="text-xl text-retro-yellow">→</span>
          </div>
          <p className="font-zen text-xs text-muted-lilac/60 mt-3 tracking-wider">続く</p>
        </motion.div>
      </div>
    </section>
  );
}

function ExpCard({ exp, rotation, side }: { exp: typeof profile.experience[0]; rotation: string; side: "left" | "right" }) {
  return (
    <div className={`relative ${rotation}`}>
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-neon-magenta/40 ${side === "left" ? "-right-8" : "-left-8"}`} />
      <div className="mb-3">
        <span className="inline-block px-4 py-1 rounded-full bg-vinyl-dark text-retro-yellow font-bold font-mono text-sm border border-neon-magenta/30">
          {exp.year}
        </span>
      </div>
      <div className="bg-soft-white/90 dark:bg-vinyl-dark/80 border-2 border-dark-navy/10 dark:border-muted-lilac/20 rounded-xl p-6 shadow-md hover:shadow-[0_8px_30px_rgba(255,45,120,0.15)] transition-all duration-300">
        <p className="font-body font-bold text-lg text-neon-magenta mb-0.5">{exp.role}</p>
        <p className="font-display text-xl text-dark-navy dark:text-soft-white mb-3">{exp.company}</p>
        <p className="font-body text-sm text-dark-navy/70 dark:text-soft-white/70 leading-relaxed mb-4">{exp.desc}</p>
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-sky-cyan/20 text-dark-navy dark:text-sky-cyan font-body text-xs font-medium border border-sky-cyan/30">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 7 — HOBBIES
═══════════════════════════════════════════ */
type HobbyTab = "anime" | "games" | "other";

function HobbiesSection() {
  const [tab, setTab] = useState<HobbyTab>("anime");

  const tabs: { key: HobbyTab; label: string; ja: string }[] = [
    { key: "anime", label: "Anime I Love", ja: "アニメ" },
    { key: "games", label: "Games I Play", ja: "ゲーム" },
    { key: "other", label: "Other Hobbies", ja: "趣味" },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-soft-white/30 dark:bg-dark-navy/30">
      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div {...fadeUp(0)}>
          <SectionLabel en="HOBBIES & INTERESTS ✦" ja="趣味" />
        </motion.div>

        {/* Tabs */}
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-5 py-2.5 rounded-full font-body text-sm font-bold transition-all duration-300 ${
                tab === t.key
                  ? "bg-electric-blue text-white border-2 border-deep-black shadow-[0_0_20px_rgba(80,128,240,0.45)]"
                  : "bg-transparent text-dark-navy/60 dark:text-muted-lilac border-2 border-vinyl-dark/30 dark:border-muted-lilac/40 hover:border-electric-blue/60"
              }`}
            >
              <span>{t.label}</span>
              <span className="font-zen text-[10px] block opacity-60">{t.ja}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === "anime" && (
            <motion.div key="anime" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {profile.anime.map((a, i) => (
                <motion.div key={a.title} {...fadeUp(i * 0.06)}
                  className="group relative rounded-xl overflow-hidden aspect-[3/4] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(255,45,120,0.3)] transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${a.gradient}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                    <span className="font-display text-3xl text-dark-navy/20 mb-2">{a.title[0]}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-dark-navy/80 to-transparent">
                    <p className="font-body text-xs text-soft-white font-bold leading-tight">{a.title}</p>
                    <p className="font-mono text-[9px] text-muted-lilac mt-0.5">{a.genre}</p>
                  </div>
                  <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === "games" && (
            <motion.div key="games" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {profile.games.map((g, i) => (
                <motion.div key={g.title} {...fadeUp(i * 0.06)}
                  className="group relative rounded-xl overflow-hidden aspect-[3/4] hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(80,128,240,0.3)] transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                    <span className="font-display text-3xl text-dark-navy/20 mb-2">{g.title[0]}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-dark-navy/80 to-transparent">
                    <p className="font-body text-xs text-soft-white font-bold leading-tight">{g.title}</p>
                    <p className="font-mono text-[9px] text-muted-lilac mt-0.5">{g.genre}</p>
                  </div>
                  <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === "other" && (
            <motion.div key="other" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {profile.otherHobbies.map((h, i) => (
                <motion.div key={h.title} {...fadeUp(i * 0.1)}
                  className={`group relative rounded-2xl border-2 border-vinyl-dark/20 dark:border-soft-white/10 p-6 bg-gradient-to-br ${h.gradient} hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(80,128,240,0.2)] transition-all duration-300`}>
                  <span className="text-3xl mb-3 block">{h.emoji}</span>
                  <p className="font-display text-lg text-dark-navy dark:text-soft-white mb-2">{h.title}</p>
                  <p className="font-body text-sm text-dark-navy/70 dark:text-soft-white/70 leading-relaxed">{h.desc}</p>
                  <div className="mt-4 h-0.5 w-10 bg-gradient-to-r from-electric-blue to-mint rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 8 — CONTACT CTA
═══════════════════════════════════════════ */
function ContactCTA() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute top-8 left-[15%] w-40 h-40 rounded-full bg-hot-pink/10 blur-3xl"
          animate={{ y: [0, -18, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-8 right-[15%] w-48 h-48 rounded-full bg-electric-blue/10 blur-3xl"
          animate={{ y: [0, 14, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="mx-auto max-w-2xl text-center relative z-10">
        <motion.div {...fadeUp(0)}>
          <h2 className="font-display text-4xl md:text-5xl text-dark-navy dark:text-soft-white mb-3 tracking-wide">
            Want to work together?
          </h2>
          <p className="font-zen text-sm text-muted-lilac tracking-widest mb-6">一緒に働きましょう</p>
          <p className="font-body text-dark-navy/70 dark:text-soft-white/60 leading-relaxed mb-10">
            I&apos;m always open to interesting projects, collabs, and conversations. Drop me a line — I reply fast.
          </p>
        </motion.div>

        {/* Email CTA */}
        <motion.div {...fadeUp(0.1)} className="flex flex-col items-center gap-4">
          <a
            href={`mailto:${profile.contact.email}`}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-hot-pink text-soft-white font-display text-lg font-bold tracking-wide shadow-[0_0_20px_rgba(255,96,144,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(255,96,144,0.75)] hover:scale-105"
          >
            Send Me a Message
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <p className="font-mono text-xs text-muted-lilac">{profile.contact.email}</p>
        </motion.div>

        {/* Social links */}
        <motion.div {...fadeUp(0.2)} className="flex justify-center gap-4 mt-8">
          <a href={profile.contact.github} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border-2 border-vinyl-dark/30 dark:border-muted-lilac/30 font-body text-sm text-dark-navy/70 dark:text-muted-lilac hover:border-electric-blue/60 hover:text-electric-blue hover:shadow-[0_0_14px_rgba(80,128,240,0.25)] transition-all duration-300">
            GitHub
          </a>
          <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border-2 border-vinyl-dark/30 dark:border-muted-lilac/30 font-body text-sm text-dark-navy/70 dark:text-muted-lilac hover:border-sky-cyan/60 hover:text-sky-cyan hover:shadow-[0_0_14px_rgba(136,216,232,0.25)] transition-all duration-300">
            LinkedIn
          </a>
        </motion.div>

        {/* Link back to home contact section */}
        <motion.div {...fadeUp(0.25)} className="mt-6">
          <Link href="/#contact"
            className="font-body text-sm text-muted-lilac hover:text-hot-pink transition-colors duration-200 underline underline-offset-4">
            Or fill out the contact form ↓
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main className="bg-soft-white dark:bg-dark-navy transition-colors duration-300 overflow-hidden">
      <HeroBanner />
      <IntroSection />
      <GallerySection />
      <QuotesSection />
      <EducationSection />
      <ExperienceSection />
      <HobbiesSection />
      <ContactCTA />
    </main>
  );
}
