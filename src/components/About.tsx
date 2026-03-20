"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const cardBase =
  "bg-soft-white/70 dark:bg-dark-navy/70 backdrop-blur-md rounded-2xl border-2 border-vinyl-dark/30 dark:border-soft-white/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(240,176,208,0.35)] relative overflow-hidden";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const skillCategories = [
  { label: "Figma", color: "bg-sakura-pink text-dark-navy" },
  { label: "Adobe Illustrator", color: "bg-lavender text-dark-navy" },
  { label: "Canva", color: "bg-sky-cyan text-dark-navy" },
  { label: "Godot Engine", color: "bg-mint text-dark-navy" },
  { label: "Unity", color: "bg-mint text-dark-navy" },
  { label: "Unreal Engine", color: "bg-sunset-gold text-dark-navy" },
  { label: "C#", color: "bg-sakura-pink text-dark-navy" },
  { label: "GDScript", color: "bg-lavender text-dark-navy" },
  { label: "Java", color: "bg-coral-red text-soft-white" },
  { label: "JavaScript", color: "bg-retro-yellow text-dark-navy" },
  { label: "Python", color: "bg-sky-cyan text-dark-navy" },
  { label: "HTML", color: "bg-coral-red text-soft-white" },
  { label: "CSS", color: "bg-electric-blue text-soft-white" },
];

/* Anime sparkle shape */
function Sparkle({ size, style }: { size: number; style: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className="absolute pointer-events-none select-none"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 2 L22.5 17.5 L38 20 L22.5 22.5 L20 38 L17.5 22.5 L2 20 L17.5 17.5 Z"
        fill="#F0B0D0"
        opacity={0.8}
      />
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      {/* Comic panel divider at top */}
      <div className="absolute top-0 left-0 w-full pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-dark-navy/40 dark:via-soft-white/20 to-transparent" />
        <div className="halftone-bg w-full h-8 opacity-[0.08]" />
      </div>

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-24 h-24 rounded-full bg-sakura-pink/20 blur-2xl"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60%] right-[8%] w-32 h-32 rounded-full bg-sky-cyan/20 blur-2xl"
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-[30%] w-20 h-20 rounded-full bg-lavender/20 blur-2xl"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-dark-navy dark:text-soft-white transition-colors duration-300">
            About Me ✦
          </h2>
          <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest">
            私について
          </p>
        </motion.div>

        {/* Bento Grid — 3 cards only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* 1. Bio Card — col-span-2 */}
          <motion.div
            className={`${cardBase} md:col-span-2`}
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="absolute inset-0 halftone-bg opacity-[0.04] pointer-events-none rounded-2xl" />

            <div className="flex flex-col sm:flex-row gap-5 items-start relative z-10">
              {/* Avatar with sparkles */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-lavender to-sakura-pink flex items-center justify-center text-3xl shadow-md">
                  <span>👤</span>
                </div>
                <Sparkle size={14} style={{ top: -8, right: -6, transform: "rotate(15deg)" }} />
                <Sparkle size={10} style={{ top: 4, right: -14, transform: "rotate(-20deg)", opacity: 0.6 }} />
                <Sparkle size={12} style={{ bottom: -4, left: -8, transform: "rotate(40deg)" }} />
                <Sparkle size={8}  style={{ bottom: 8, right: -10, transform: "rotate(-10deg)", opacity: 0.7 }} />
              </div>

              <div className="flex-1">
                <p className="font-body text-dark-navy/90 dark:text-soft-white/90 leading-relaxed transition-colors duration-300">
                  A programmer and game developer deeply focused on UX. I blend an observant eye for user needs with diverse inspirations from manga, anime, medicine, and science to craft engaging digital experiences.
                </p>

                {/* Manga speech bubble quote */}
                <div className="relative inline-block mt-4">
                  <div className="bg-soft-white dark:bg-vinyl-dark border-2 border-dark-navy/20 dark:border-soft-white/20 rounded-2xl px-4 py-2 max-w-xs">
                    <p className="font-body text-xs italic text-dark-navy/70 dark:text-soft-white/70 leading-relaxed">
                      &ldquo;take care of your work, and your work will take care of you.&rdquo;
                    </p>
                  </div>
                  <div
                    className="absolute -bottom-[9px] left-6 w-0 h-0"
                    style={{
                      borderLeft: "7px solid transparent",
                      borderRight: "7px solid transparent",
                      borderTop: "9px solid rgba(26,28,46,0.2)",
                    }}
                  />
                  <div
                    className="absolute -bottom-[7px] left-[26px] w-0 h-0"
                    style={{
                      borderLeft: "5px solid transparent",
                      borderRight: "5px solid transparent",
                      borderTop: "7px solid #F4ECE4",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Experience Card */}
          <motion.div
            className={`${cardBase} md:col-span-1 flex flex-col items-center justify-center text-center bg-sunset-gold/20`}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span
              className="font-display text-6xl leading-none"
              style={{
                background: "linear-gradient(135deg, #FF2D78, #F06848)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              1+
            </span>
            <span className="font-body text-sm font-bold text-dark-navy/70 dark:text-soft-white/70 mt-2 uppercase tracking-wider transition-colors duration-300">
              Years Experience
            </span>
          </motion.div>

          {/* 3. Skills Card */}
          <motion.div
            className={`${cardBase} md:col-span-3`}
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="font-display text-lg text-dark-navy dark:text-soft-white mb-3 block transition-colors duration-300">
              Skills
            </span>
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <span
                  key={cat.label}
                  className={`${cat.color} px-4 py-1.5 rounded-full font-body text-sm font-bold`}
                >
                  {cat.label}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* "Learn More" CTA */}
        <motion.div
          className="flex flex-col items-center mt-14 gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-hot-pink text-soft-white font-display text-lg font-bold tracking-wide shadow-[0_0_20px_rgba(255,96,144,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,96,144,0.75)] hover:scale-105 hover:[animation:comic-shake_0.3s_ease_3]"
          >
            Learn More About Me
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
          <span className="font-zen text-xs text-muted-lilac tracking-widest mt-1">
            もっと詳しく
          </span>
        </motion.div>

      </div>
    </section>
  );
}
