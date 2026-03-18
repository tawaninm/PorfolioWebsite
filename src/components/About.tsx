"use client";

import { motion } from "framer-motion";

const cardBase =
  "bg-soft-white/70 dark:bg-dark-navy/70 backdrop-blur-md rounded-2xl border border-lavender/30 dark:border-soft-white/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(240,176,208,0.35)] relative overflow-hidden";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const skillCategories = [
  { label: "UX/UI", color: "bg-sakura-pink text-dark-navy" },
  { label: "Programming", color: "bg-sky-cyan text-dark-navy" },
  { label: "CI Art", color: "bg-mint text-dark-navy" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
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
        <motion.div
          className="absolute top-[40%] left-[60%] w-16 h-16 rounded-full bg-mint/15 blur-xl"
          animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Section Heading */}
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center mb-14 text-dark-navy dark:text-soft-white transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          About Me ✦
        </motion.h2>

        {/* Bento Grid */}
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
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* Avatar placeholder */}
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-lavender to-sakura-pink flex items-center justify-center text-3xl shadow-md">
                <span>👤</span>
              </div>
              <div>
                <p className="font-body text-dark-navy/90 dark:text-soft-white/90 leading-relaxed mb-4 transition-colors duration-300">
                  I&apos;m a multidisciplinary designer and developer who loves blending
                  thoughtful UX, clean code, and city pop aesthetics. I build digital
                  products that feel alive — from concept to pixel-perfect delivery.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-body font-bold text-sm text-hot-pink hover:text-electric-blue transition-colors"
                >
                  View Resume
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* 2. Experience Card — col-span-1 */}
          <motion.div
            className={`${cardBase} md:col-span-1 flex flex-col items-center justify-center text-center bg-sunset-gold/20`}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="font-display text-6xl text-dark-navy dark:text-soft-white leading-none transition-colors duration-300">
              X+
            </span>
            <span className="font-body text-sm font-bold text-dark-navy/70 dark:text-soft-white/70 mt-2 uppercase tracking-wider transition-colors duration-300">
              Years Experience
            </span>
          </motion.div>

          {/* 3. Location Card — col-span-1 */}
          <motion.div
            className={`${cardBase} md:col-span-1 flex flex-col items-center justify-center text-center`}
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="text-2xl mb-1" aria-hidden="true">
              📍
            </span>
            <span className="font-display text-xl text-dark-navy dark:text-soft-white transition-colors duration-300">
              Your City
            </span>
            <span className="font-body text-sm text-dark-navy/60 dark:text-soft-white/60 mt-1 transition-colors duration-300">
              Country
            </span>
            {/* Decorative corner shape */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-sky-cyan/25 blur-lg" />
          </motion.div>

          {/* 4. Skills Card — col-span-1 */}
          <motion.div
            className={`${cardBase} md:col-span-1`}
            custom={3}
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

          {/* 5. Fun Fact Card — col-span-1 */}
          <motion.div
            className={`${cardBase} md:col-span-1 flex flex-col justify-center`}
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <span className="font-mono text-xs text-muted-lilac mb-2 uppercase tracking-widest">
              Fun Fact
            </span>
            <p className="font-body text-dark-navy/90 dark:text-soft-white/90 italic leading-relaxed transition-colors duration-300">
              &ldquo;I listen to city pop playlists on repeat while I design — it
              keeps the pixels dancing.&rdquo;
            </p>
            {/* Retro decorative line */}
            <div className="mt-3 h-0.5 w-12 bg-gradient-to-r from-hot-pink to-electric-blue rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
