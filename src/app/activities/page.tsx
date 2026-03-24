"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { activities, typeBadge, typeLabel } from "@/data/activities";
import type { Activity, ActivityType } from "@/data/activities";

/* ─────────────────────────────────────────
   FILTER CONFIG
───────────────────────────────────────── */
const filters = [
  { key: "all",       label: "All" },
  { key: "camp",      label: "Camps" },
  { key: "workshop",  label: "Workshops" },
  { key: "hackathon", label: "Hackathons" },
  { key: "training",  label: "Training" },
  { key: "volunteer", label: "Volunteer" },
  { key: "work",      label: "Work" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

/* ─────────────────────────────────────────
   STATS
───────────────────────────────────────── */
const stats = [
  { number: "16",   label: "Activities",    from: "#FF2D78", to: "#F06848" },
  { number: "300+", label: "Hours",         from: "#5080F0", to: "#40C8A0" },
  { number: "15+",  label: "Tools & Skills", from: "#F0D040", to: "#F8A078" },
  { number: "2",    label: "Certificates",  from: "#F0B0D0", to: "#FF2D78" },
];

/* ─────────────────────────────────────────
   DECORATIVE STARBURST
───────────────────────────────────────── */
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
            x1={50 + 18 * Math.cos(r)}
            y1={50 + 18 * Math.sin(r)}
            x2={50 + 48 * Math.cos(r)}
            y2={50 + 48 * Math.sin(r)}
            stroke="#F5C842"
            strokeWidth="3"
            strokeOpacity="0.4"
          />
        );
      })}
      <circle cx="50" cy="50" r="14" fill="#F5C842" opacity="0.2" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   ACTIVITY CARD
───────────────────────────────────────── */
function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  const rotationClass =
    index % 3 === 0 ? "rotate-[-2deg]" :
    index % 3 === 1 ? "rotate-[1deg]" :
    "rotate-[2deg]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${rotationClass} hover:rotate-0 hover:-translate-y-2 transition-all duration-300 cursor-default`}
      style={{ willChange: "transform" }}
    >
      {/* Polaroid frame */}
      <div className="bg-soft-white dark:bg-vinyl-dark/90 p-3 rounded-lg shadow-lg hover:shadow-[0_12px_32px_rgba(255,45,120,0.25)] transition-shadow duration-300">

        {/* Photo area */}
        <div className={`relative aspect-video rounded-md overflow-hidden bg-gradient-to-br ${activity.gradient}`}>
          {activity.image ? (
            <Image
              src={activity.image}
              alt={activity.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-5xl text-dark-navy/20 select-none">
                {activity.name[0]}
              </span>
            </div>
          )}
          <div className="halftone-bg absolute inset-0 opacity-0 group-hover:opacity-[0.2] transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Text area */}
        <div className="pt-3 pb-1 px-1 flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-body font-bold text-base text-dark-navy dark:text-sakura-white leading-snug">
              {activity.name}
            </p>
            <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${typeBadge[activity.type]}`}>
              {typeLabel[activity.type]}
            </span>
          </div>
          <p className="font-mono text-xs text-muted-lilac">{activity.date}</p>
          <p className="font-body text-xs text-dark-navy/70 dark:text-soft-white/65 leading-relaxed line-clamp-3">
            {activity.description}
          </p>
          <p className="font-body text-[10px] text-muted-lilac/70 italic mt-0.5">{activity.organizer}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ActivitiesPage() {
  const [active, setActive] = useState<FilterKey>("all");

  const filtered =
    active === "all" ? activities : activities.filter((a) => a.type === (active as ActivityType));

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 overflow-hidden bg-soft-white dark:bg-dark-navy transition-colors duration-300">

      {/* Decorative starbursts */}
      <Starburst size={80}  className="top-20 right-[6%] opacity-70 rotate-12" />
      <Starburst size={55}  className="top-[38%] left-[3%] opacity-50 -rotate-6" />
      <Starburst size={65}  className="bottom-40 right-[12%] opacity-60 rotate-3" />

      {/* Floating bg blobs */}
      <motion.div className="absolute top-32 left-[8%] w-40 h-40 rounded-full bg-lavender/10 blur-3xl pointer-events-none"
        animate={{ y: [0, -14, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-32 right-[6%] w-48 h-48 rounded-full bg-sakura-pink/10 blur-3xl pointer-events-none"
        animate={{ y: [0, 16, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-5xl md:text-7xl tracking-widest text-dark-navy dark:text-soft-white">
            ALL ACTIVITIES
          </h1>
          <p className="font-zen text-base text-muted-lilac mt-1 tracking-widest">すべての活動</p>
          <p className="font-body text-sm text-muted-lilac/70 mt-2">
            Camps, Workshops &amp; Adventures
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-8 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative px-5 py-2 rounded-full font-body text-sm font-bold transition-all duration-300 ${
                active === f.key
                  ? "bg-neon-magenta text-white border-2 border-deep-black shadow-[0_0_18px_rgba(255,45,120,0.4)]"
                  : "bg-transparent text-dark-navy/60 dark:text-muted-lilac border-2 border-vinyl-dark/30 dark:border-muted-lilac/40 hover:border-neon-magenta/60 hover:shadow-[0_0_10px_rgba(255,45,120,0.15)]"
              }`}
            >
              {f.label}
              {active === f.key && (
                <motion.span
                  layoutId="activityFilter"
                  className="absolute inset-0 rounded-full bg-neon-magenta -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Count ── */}
        <motion.p
          key={`count-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center font-mono text-xs text-muted-lilac mb-8 tracking-widest"
        >
          Showing {filtered.length} of {activities.length} activities
        </motion.p>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((activity, idx) => (
              <ActivityCard key={activity.id} activity={activity} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* ── Achievements Unlocked ── */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-retro-yellow/50 to-transparent" />
            <div className="text-center shrink-0">
              <p className="font-mono text-[10px] text-muted-lilac uppercase tracking-[0.2em]">
                ★ ACHIEVEMENTS UNLOCKED ★
              </p>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-retro-yellow/50 to-transparent" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-vinyl-dark border-2 border-retro-yellow/50 rounded-lg p-5 text-center relative overflow-hidden"
                style={{ boxShadow: "3px 3px 0 rgba(240,208,64,0.25)" }}
              >
                <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-retro-yellow/60" />
                <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-retro-yellow/60" />
                <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-retro-yellow/60" />
                <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-retro-yellow/60" />

                <span
                  className="font-display text-4xl leading-none block"
                  style={{
                    background: `linear-gradient(135deg, ${s.from}, ${s.to})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.number}
                </span>
                <span className="font-body text-xs text-muted-lilac mt-2 block uppercase tracking-wider">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
