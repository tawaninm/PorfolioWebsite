"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

/* ═══════════════════════════════════════════
   DATA  (edit src/data/my-profile.md to update)
═══════════════════════════════════════════ */

const profile = {
  name: "Thanatpat Promthong",
  tagline: "Coding Tutor · Game Developer · UX/UI Designer",
  location: "Bangkok, Thailand",
  bio: [
    "By bridging the gap between the user's needs and the developer's architecture, I channel my technical skills into creating impactful programs and games.",
    "Currently 2nd year student at the School of Information Technology, KMITL. Major in Multimedia and Game Technology.",
    "I am constantly eager to learn new skills and love participating in campus activities. While pursuing my degree, I actively seek hands-on experience—balancing my time between tutoring and study.",
  ],
  quotes: [
    { text: "stay hungry stay foolish  —Steve Jobs", bg: "bg-lavender/20", rotate: "-rotate-1" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever. —Mahatma Gandhi", bg: "bg-sky-cyan/20", rotate: "rotate-1" },
    { text: "What is not started today is never finished tomorrow. —Johann Wolfgang von Goethe", bg: "bg-sakura-pink/20", rotate: "-rotate-[0.5deg]" },
  ],
  gallery: [
    { src: "/images/gallery/Profile.jpg", caption: "Profile", gradient: "from-lavender/40 to-sakura-pink/30" },
    { src: "/images/gallery/ITKMITL-OpenHouse.jpg", caption: "2567 Open house IT KMITL", gradient: "from-sky-cyan/40 to-mint/30" },
    { src: "/images/gallery/ITCamp21_Day02_staff.jpg", caption: "ITCamp21 staff", gradient: "from-neon-magenta/25 to-deep-purple/30" },
    { src: "/images/gallery/Life style.jpg", caption: "2568 Open house IT KMITL", gradient: "from-retro-yellow/25 to-peach/30" },
    { src: "/images/gallery/catTorawaheng.jpg", caption: "Cat Tora wanHeng", gradient: "from-mint/35 to-sky-cyan/25" },
    { src: "/images/gallery/Acane.jpg", caption: "Acane world", gradient: "from-sakura-pink/30 to-lavender/25" },
    { src: "/images/gallery/Japanpro.jpg", caption: "Japan lover", gradient: "from-sunset-gold/30 to-peach/25" },
  ],
  education: [
    {
      year: "2024 – Present",
      school: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
      degree: "Bachelor of Science Program in Information Technology",
      desc: "Module: Multimedia & Game Development. Majoring in IT with focus on UX/UI design, and game development.",
    },
    {
      year: "2017 – 2023",
      school: "Rayongwittayakom School",
      degree: "Computer Math and Science Program (Wit-com)",
      desc: "Participated in national software contests and developed a passion for programming and game development.",
    },
  ],
  experience: [
    {
      year: "2026 – Present",
      role: "Part-time Tutor — Coding",
      company: "Code Genius Emquartier",
      desc: "Instructed group classes of primary school students in basic computer skills, delivering lessons in both Thai and English.",
      tech: ["Scratch", "Python", "Microbit"],
    },
    {
      year: "2026",
      role: "Part-time TA — Java OOP",
      company: "School of Information Technology, KMITL",
      desc: "Assisting the course instructor for Object-Oriented Programming (OOP) by evaluating weekly laboratory assignments and posing conceptual questions to students to reinforce their understanding and facilitate further learning.",
      tech: ["OOP Java"],
    },
    {
      year: "2024 – 2026",
      role: "Part-time Tutor — Math, Physics & Coding",
      company: "Login Learning",
      desc: "Managed student projects for competitions such as national software contests and portfolio projects for university applications. Taught the Godot game engine and mathematics to junior and senior high school students.",
      tech: ["Godot Engine", "Math", "Physics"],
    },
    {
      year: "2025",
      role: "Part-time Book Fair Staff",
      company: "Phoenix Next",
      desc: "Worked as booth staff responsible for preparing and arranging book displays. Managed cashier duties, processed payments, and assisted with booth teardown at the end of the event.",
      tech: [],
    },
    {
      year: "2024",
      role: "Part-time Book Fair Staff",
      company: "Luckpim",
      desc: "Worked as booth staff responsible for preparing and arranging book displays. Managed cashier duties, processed payments, and assisted with booth teardown at the end of the event.",
      tech: [],
    },
  ],
  anime: [
    { title: "Full Metal Alchemist", genre: "Adventure / Fantasy", gradient: "from-sakura-pink/40 to-lavender/30", src: "/images/gallery/fullmetal.jpg" },
    { title: "Frieren: Beyond Journey's End", genre: "Adventure / Fantasy", gradient: "from-mint/40 to-sky-cyan/30", src: "/images/gallery/Frieren Beyond Journeys End.jpg" },
    { title: "Demon Slayer: Kimetsu no Yaiba", genre: "Action / Adventure", gradient: "from-neon-magenta/30 to-deep-purple/40", src: "/images/gallery/Demon SlayerKimetsu no Yaiba.jpg" },
    { title: "Delicious in Dungeon", genre: "Adventure / Fantasy", gradient: "from-retro-yellow/30 to-peach/30", src: "/images/gallery/Delicious in Dungeon.jpg" },
    { title: "86 EIGHTY-SIX", genre: "Sci-Fi / Drama", gradient: "from-sky-cyan/30 to-ocean-blue/40", src: "/images/gallery/86 EIGHTY-SIX.jpg" },
    { title: "The Apothecary Diaries", genre: "Mystery / Historical", gradient: "from-sunset-gold/30 to-peach/40", src: "/images/gallery/The Apothecary Diaries.jpg" },
  ],
  games: [
    { title: "Goddess of Victory: Nikke", genre: "Action RPG", gradient: "from-deep-purple/50 to-lavender/20", src: "/images/gallery/nikke.jpg" },
    { title: "League of Legends Wild Rift", genre: "MOBA", gradient: "from-mint/40 to-retro-yellow/25", src: "/images/gallery/league of legends wild rift.jpg" },
    { title: "Wuthering Waves", genre: "Action RPG", gradient: "from-sakura-pink/35 to-sky-cyan/30", src: "/images/gallery/wuthering waves.png" },
    { title: "Stardew Valley", genre: "Simulation / RPG", gradient: "from-coral-red/30 to-neon-magenta/25", src: "/images/gallery/Stardew Valley.jpg" },
    { title: "Golden Spatula", genre: "Auto Battler", gradient: "from-ocean-blue/40 to-muted-lilac/30", src: "/images/gallery/Goden spatula.jpg" },
    { title: "Zenless Zone Zero", genre: "Action RPG", gradient: "from-electric-blue/30 to-sky-cyan/25", src: "/images/gallery/Zenless zone zero.jpg" },
  ],
  otherHobbies: [
    { title: "J-pop & K-pop Music", emoji: "🎵", desc: "I listen to anime opening and ending songs and K-pop. Always finding new tracks from anime and artist playlists.", gradient: "from-lavender/30 to-sakura-pink/25" },
    { title: "Read Manga & Novels", emoji: "📖", desc: "I read Japanese manga, Korean manhwa, comic novels, productive books, and crime novels.", gradient: "from-sky-cyan/30 to-mint/25" },
    { title: "Coffee & Cafés", emoji: "☕", desc: "Hunting for Bangkok's best specialty coffee shops. A good café doubles as a perfect remote office.", gradient: "from-sunset-gold/30 to-peach/25" },
  ],
  contact: {
    email: "tawaninm13@gmail.com",
    github: "https://github.com/tawaninm",
    linkedin: "https://www.linkedin.com/in/thanatpat-promthong-9084a4212",
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
            {/* Avatar */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-ocean-blue via-electric-blue to-lavender border-2 border-electric-blue/50 overflow-hidden">
              <img
                src="/images/gallery/Profile.jpg"
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  el.parentElement!.innerHTML += `<span class="font-display text-4xl md:text-5xl text-soft-white/30 select-none flex items-center justify-center w-full h-full">${profile.name[0]}</span>`;
                }}
              />
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
              {/* Gradient fallback */}
              <div className={`absolute inset-0 bg-gradient-to-br ${photo.gradient}`} />
              {/* Real photo */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark-navy/0 group-hover:bg-dark-navy/40 transition-all duration-400" />
              <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none" />
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
                className="relative z-10 w-[90vw] max-w-3xl rounded-2xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${profile.gallery[lightboxIdx].gradient}`} />
                <img
                  src={profile.gallery[lightboxIdx].src}
                  alt={profile.gallery[lightboxIdx].caption}
                  className="relative w-full max-h-[80vh] object-contain"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark-navy/80 to-transparent">
                  <p className="font-body text-sm text-soft-white font-medium text-center">{profile.gallery[lightboxIdx].caption}</p>
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
              className={`relative px-5 py-2.5 rounded-full font-body text-sm font-bold transition-all duration-300 ${tab === t.key
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
                  <img
                    src={a.src}
                    alt={a.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-dark-navy/90 to-transparent">
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
                  <img
                    src={g.src}
                    alt={g.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-dark-navy/90 to-transparent">
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

/* Sakura petal — same as home Contact */
function SakuraPetal({ size, style }: { size: number; style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 30 30" width={size} height={size}
      className="absolute pointer-events-none select-none"
      style={{ ...style, animationName: "sakura-fall", animationTimingFunction: "linear", animationIterationCount: "infinite" }}
      aria-hidden="true">
      <ellipse cx="15" cy="15" rx="8" ry="13" fill="#F0B0D0" opacity="0.7" transform="rotate(-20 15 15)" />
    </svg>
  );
}

/* Manga happy face */
function MangaFace() {
  return (
    <svg viewBox="0 0 28 28" width={24} height={24} aria-hidden="true" className="shrink-0">
      <circle cx="14" cy="14" r="13" fill="#FFE8F0" stroke="#FF2D78" strokeWidth="1.5" />
      <ellipse cx="9.5" cy="12" rx="1.8" ry="2.2" fill="#1A1A2E" />
      <ellipse cx="18.5" cy="12" rx="1.8" ry="2.2" fill="#1A1A2E" />
      <circle cx="10.3" cy="11" r="0.7" fill="white" />
      <circle cx="19.3" cy="11" r="0.7" fill="white" />
      <path d="M9 17 Q14 22 19 17" stroke="#FF2D78" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* 3D social icon — same as home Contact */
function SocialLink({ href, icon, label, color }: { href: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className={`w-14 h-14 rounded-full bg-vinyl-dark border border-muted-lilac/30 flex items-center justify-center text-soft-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-[4px] hover:bg-neon-magenta/20 hover:border-neon-magenta/60 ${color}`}
      style={{ filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.35))", transform: "perspective(400px) rotateY(-6deg)" }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "perspective(400px) rotateY(0deg) translateY(-4px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "perspective(400px) rotateY(-6deg)"; }}
    >
      {icon}
    </a>
  );
}

const aboutPetals = [
  { size: 18, style: { top: "8%", left: "4%", animationDuration: "7s", animationDelay: "0s" } },
  { size: 14, style: { top: "15%", left: "18%", animationDuration: "9s", animationDelay: "1.5s" } },
  { size: 20, style: { top: "5%", left: "40%", animationDuration: "8s", animationDelay: "0.7s" } },
  { size: 12, style: { top: "10%", left: "60%", animationDuration: "10s", animationDelay: "2s" } },
  { size: 16, style: { top: "3%", left: "75%", animationDuration: "7.5s", animationDelay: "0.3s" } },
  { size: 22, style: { top: "20%", left: "85%", animationDuration: "11s", animationDelay: "1s" } },
];

function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 overflow-hidden gradient-contact"
    >
      {/* Halftone overlay */}
      <div className="halftone-bg absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }} />

      {/* Sakura petals */}
      {aboutPetals.map((p, i) => (
        <SakuraPetal key={i} size={p.size} style={p.style as React.CSSProperties} />
      ))}

      {/* Background blur shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute top-10 left-[10%] w-48 h-48 rounded-full bg-neon-magenta/10 blur-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-10 right-[10%] w-56 h-56 rounded-full bg-ocean-blue/40 blur-[100px]"
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

        {/* Left — heading + socials */}
        <motion.div {...fadeUp(0)} className="flex flex-col text-center lg:text-left">

          {/* Speech bubble heading */}
          <div className="relative inline-block mb-6">
            <div className="relative border-2 border-neon-magenta/60 rounded-2xl px-6 py-5 bg-vinyl-dark/40 backdrop-blur-sm">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
                <span style={{
                  background: "linear-gradient(90deg, #FF2D78, #F0D040)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Want to Work Together?
                </span>
              </h2>
              <p className="font-zen text-base text-muted-lilac mt-2 tracking-widest">一緒に働きましょう</p>
            </div>
            {/* Bubble tail */}
            <div className="absolute -bottom-[11px] left-10 w-0 h-0"
              style={{ borderLeft: "10px solid transparent", borderRight: "10px solid transparent", borderTop: "11px solid rgba(255,45,120,0.6)" }} />
            <div className="absolute -bottom-[8px] left-[42px] w-0 h-0"
              style={{ borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: "8px solid rgba(28,28,46,0.6)" }} />
          </div>

          <p className="font-body text-soft-white/70 text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
            Whether you have a wild idea, need a fresh redesign, or just want to chat — my inbox is always open.
          </p>

          {/* 3D social icons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <SocialLink href={profile.contact.github} icon={<FiGithub size={22} />} label="GitHub" color="hover:shadow-[0_0_20px_rgba(200,168,232,0.7)]" />
            <SocialLink href={profile.contact.linkedin} icon={<FiLinkedin size={22} />} label="LinkedIn" color="hover:shadow-[0_0_20px_rgba(80,128,240,0.7)]" />
            <SocialLink href={`mailto:${profile.contact.email}`} icon={<FiMail size={22} />} label="Email" color="hover:shadow-[0_0_20px_rgba(255,45,120,0.7)]" />
          </div>
        </motion.div>

        {/* Right — manga panel form */}
        <motion.div {...fadeUp(0.2)} className="w-full max-w-md mx-auto lg:ml-auto">
          <div className="relative border-2 border-vinyl-dark dark:border-muted-lilac/30 p-8 md:p-10 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transform rotate-1 hover:rotate-0 transition-all duration-500 bg-vinyl-dark/90 backdrop-blur-xl">
            {/* Postmark stamp */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-40 pointer-events-none select-none flex flex-col items-center">
              <div className="w-12 h-16 border-2 border-dashed border-muted-lilac/50 rounded flex items-center justify-center p-1">
                <span className="text-[10px] uppercase font-bold text-center text-muted-lilac/70 leading-tight">Place<br />Stamp<br />Here</span>
              </div>
              <div className="mt-2 w-16 h-16 border-4 border-double border-neon-magenta/30 rounded-full flex items-center justify-center rotate-[-15deg]">
                <span className="text-[10px] font-bold text-neon-magenta/40 uppercase whitespace-nowrap">City Pop Mail</span>
              </div>
            </div>

            <form className="flex flex-col gap-5 mt-4 md:mt-0 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="about-name" className="sr-only">Name</label>
                <input type="text" id="about-name" placeholder="Your Name"
                  className="w-full px-5 py-3 rounded-full bg-soft-white/5 border border-muted-lilac/30 text-soft-white placeholder:text-soft-white/40 font-body outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent transition-all duration-300"
                  required />
              </div>
              <div>
                <label htmlFor="about-email" className="sr-only">Email</label>
                <input type="email" id="about-email" placeholder="Your Email"
                  className="w-full px-5 py-3 rounded-full bg-soft-white/5 border border-muted-lilac/30 text-soft-white placeholder:text-soft-white/40 font-body outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent transition-all duration-300"
                  required />
              </div>
              <div>
                <label htmlFor="about-message" className="sr-only">Message</label>
                <textarea id="about-message" placeholder="What's on your mind?" rows={4}
                  className="w-full px-5 py-4 rounded-3xl bg-soft-white/5 border border-muted-lilac/30 text-soft-white placeholder:text-soft-white/40 font-body outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent transition-all duration-300 resize-none"
                  required />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button type="submit"
                  className="hover-comic-shake flex-1 py-3.5 bg-neon-magenta text-soft-white font-body font-bold text-lg rounded-full shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,45,120,0.6)] focus:outline-none focus:ring-4 focus:ring-neon-magenta/30 flex items-center justify-center gap-2">
                  Send Message
                  <span className="text-xl leading-none mb-[2px]">✉</span>
                </button>
                <MangaFace />
              </div>
            </form>
          </div>
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
