"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

/* ── Types & data ── */
export type MiniWorkType = "graphic" | "ui" | "code" | "other";

export interface MiniWork {
  id: string;
  name: string;
  type: MiniWorkType;
  date: string;
  gradient: string;
  image?: string;
  figmaLink?: string;
}

export const miniWorks: MiniWork[] = [
  {
    id: "dc01",
    name: "Design challenge01 Sign up",
    type: "ui",
    date: "2025",
    gradient: "from-neon-magenta/40 to-lavender/30",
    image: "/images/miniwork/Challenge1 SignUp.png",
    figmaLink: "https://www.figma.com/design/ygyd83HIavVHj9Id7i0tIz/Design-challenge01?node-id=0-1&t=ryqfAr87ZSCztAPL-1",
  },
  {
    id: "dc02",
    name: "Design challenge02 Onboarding (spotlight)",
    type: "ui",
    date: "2025",
    gradient: "from-sky-cyan/40 to-mint/30",
    image: "/images/miniwork/Challenge2 Onboarding spotlight.png",
    figmaLink: "https://www.figma.com/design/EhXJEMz5R40cT9YnEGa5Ki/Design-challenge02-Onboarding--spotlight-?node-id=0-1&t=bIXNKvHTyEmsWYgM-1",
  },
  {
    id: "dc03",
    name: "Design challenge03 Entering data",
    type: "ui",
    date: "2025",
    gradient: "from-retro-yellow/40 to-peach/30",
    image: "/images/miniwork/Design challenge03 Entering data.png",
    figmaLink: "https://www.figma.com/design/12kUTYNxw1FN7LTPdjKrnB/Design-challenge03-Entering-data?node-id=0-1&t=w6FsVXh2iIUP7Ic6-1",
  },
];

export const typeBadge: Record<MiniWorkType, string> = {
  graphic: "bg-hot-pink text-white",
  ui: "bg-neon-magenta text-white",
  code: "bg-electric-blue text-white",
  other: "bg-sakura-pink text-deep-purple",
};

export const typeLabel: Record<MiniWorkType, string> = {
  graphic: "Graphic",
  ui: "UI",
  code: "Code",
  other: "Other",
};

const rotations = ["rotate-[-2deg]", "rotate-[1deg]", "rotate-[2deg]", "rotate-[-1deg]"];

/* ── Polaroid card ── */
export function MiniWorkCard({ work, index }: { work: MiniWork; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${rotations[index % 4]} hover:rotate-0 hover:-translate-y-2 transition-all duration-300 shrink-0 w-56 md:w-auto`}
      style={{ willChange: "transform" }}
    >
      <div className="bg-soft-white dark:bg-vinyl-dark/90 p-3 rounded-lg shadow-lg hover:shadow-[0_12px_32px_rgba(255,45,120,0.3)] transition-shadow duration-300">
        <div className={`relative aspect-video rounded-md overflow-hidden bg-gradient-to-br ${work.gradient}`}>
          {work.image ? (
            <Image
              src={work.image}
              alt={work.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 224px, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-5xl text-dark-navy/20 select-none">
                {work.name[0]}
              </span>
            </div>
          )}
          <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none" />
        </div>

        <div className="pt-3 pb-1 px-1 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-body font-bold text-sm text-dark-navy dark:text-sakura-white leading-snug">
              {work.name}
            </p>
            <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${typeBadge[work.type]}`}>
              {typeLabel[work.type]}
            </span>
          </div>
          <p className="font-mono text-xs text-muted-lilac">{work.date}</p>

          {work.figmaLink && (
            <a
              href={work.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-magenta/10 border border-neon-magenta/40 text-neon-magenta font-body text-[11px] font-bold hover:bg-neon-magenta hover:text-white transition-all duration-200 w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zM12 10.5H8.5a3.5 3.5 0 100 7H12v-7zM12 10.5h3.5a3.5 3.5 0 010 7H12v-7zM8.5 19H12v2.5A2.5 2.5 0 018.5 19z"/>
              </svg>
              View in Figma
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Decorative starburst ── */
function Starburst({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`absolute pointer-events-none select-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 360) / 12;
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + 18 * Math.cos(r)} y1={50 + 18 * Math.sin(r)}
            x2={50 + 48 * Math.cos(r)} y2={50 + 48 * Math.sin(r)}
            stroke="#FF2D78" strokeWidth="3" strokeOpacity="0.35"
          />
        );
      })}
      <circle cx="50" cy="50" r="14" fill="#FF2D78" opacity="0.15" />
    </svg>
  );
}

export default function MiniWorkPreview() {
  return (
    <section id="mini-work-preview" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-hot-pink/30 to-transparent" />
        <div className="halftone-bg w-full h-8 opacity-[0.06]" />
      </div>

      <Starburst size={70} className="top-16 right-[7%] opacity-60 rotate-12" />
      <Starburst size={50} className="bottom-32 left-[4%] opacity-45 -rotate-6" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-24 left-[12%] w-28 h-28 rounded-full bg-hot-pink/10 blur-3xl"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-24 right-[10%] w-36 h-36 rounded-full bg-peach/10 blur-3xl"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl md:text-5xl tracking-widest text-dark-navy dark:text-soft-white transition-colors duration-300">
            MINI WORK ✦
          </h2>
          <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest">ミニワーク</p>
        </motion.div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0">
          {miniWorks.map((work, idx) => (
            <div key={work.id} className="snap-start">
              <MiniWorkCard work={work} index={idx} />
            </div>
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center mt-16 gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/mini-work"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-hot-pink text-white font-display text-lg font-bold tracking-wide shadow-[0_0_20px_rgba(255,45,120,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(255,45,120,0.75)] hover:scale-105"
          >
            See More Mini Work
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
          <span className="font-zen text-xs text-muted-lilac tracking-widest mt-1">
            すべてのミニワーク
          </span>
        </motion.div>

      </div>
    </section>
  );
}
