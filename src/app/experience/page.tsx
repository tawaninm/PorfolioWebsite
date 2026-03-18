"use client";

import { motion } from "framer-motion";

/* ── Experience data ── */
const experiences = [
  {
    year: "2024",
    role: "Senior UX Designer",
    company: "Company A",
    description:
      "Led end-to-end product design for three flagship products. Established a cross-platform design system used by 10+ engineers. Conducted usability studies and drove a 35% improvement in task completion.",
    tech: ["Figma", "FigJam", "Maze", "Notion", "Lottie"],
  },
  {
    year: "2023",
    role: "Frontend Developer",
    company: "Company B",
    description:
      "Built responsive, accessible interfaces with React and TypeScript. Collaborated closely with design teams to translate pixel-perfect specs into production-ready components.",
    tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    year: "2022",
    role: "CI Artist & Designer",
    company: "Company C",
    description:
      "Created corporate identity materials, illustration assets, and print collateral. Developed brand guidelines and mascot characters that became central to the company's visual identity.",
    tech: ["Procreate", "Adobe Illustrator", "Photoshop", "InDesign"],
  },
  {
    year: "2021",
    role: "Junior Designer",
    company: "Company D",
    description:
      "Designed marketing visuals, social media assets, and UI wireframes. Gained foundational skills in user research, prototyping, and design handoff.",
    tech: ["Figma", "Photoshop", "Illustrator", "Notion"],
  },
];

/* ── Speed lines SVG flanking chapter header ── */
function SpeedLines({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 24"
      width={80}
      height={24}
      aria-hidden="true"
      className="shrink-0"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {[2, 7, 13, 19].map((y, i) => (
        <line
          key={i}
          x1={i % 2 === 0 ? 0 : 8}
          y1={y}
          x2={80}
          y2={y}
          stroke="#FF2D78"
          strokeWidth={i === 1 ? 2 : 1}
          strokeOpacity={0.35 + i * 0.1}
        />
      ))}
    </svg>
  );
}

/* ── Timeline node (circle on the center line) ── */
function TimelineNode() {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-magenta z-10 shrink-0"
      style={{
        boxShadow: "0 0 0 3px #1C1C2E, 0 0 12px rgba(255,45,120,0.7)",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

/* ── Mobile timeline node (on left rail) ── */
function MobileTimelineNode() {
  return (
    <div
      className="absolute left-0 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-neon-magenta z-10 shrink-0"
      style={{
        boxShadow: "0 0 0 2px #1C1C2E, 0 0 10px rgba(255,45,120,0.7)",
        top: "2.5rem",
      }}
    />
  );
}

/* ── Single timeline entry ── */
function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof experiences)[0];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  const rotation = isLeft ? "rotate-[0.5deg]" : "rotate-[-0.5deg]";

  return (
    <>
      {/* ── DESKTOP layout (md+): alternate left/right ── */}
      <div className="hidden md:grid grid-cols-[1fr_32px_1fr] items-center gap-0 relative">
        {/* Left slot */}
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`pr-8 flex justify-end`}
          >
            <EntryCard entry={entry} rotation={rotation} side="left" />
          </motion.div>
        ) : (
          <div />
        )}

        {/* Center node */}
        <div className="flex justify-center items-center">
          <TimelineNode />
        </div>

        {/* Right slot */}
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="pl-8"
          >
            <EntryCard entry={entry} rotation={rotation} side="right" />
          </motion.div>
        ) : (
          <div />
        )}
      </div>

      {/* ── MOBILE layout: single column, line on left ── */}
      <motion.div
        className="md:hidden relative pl-8"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <MobileTimelineNode />
        <EntryCard entry={entry} rotation={rotation} side="right" />
      </motion.div>
    </>
  );
}

/* ── Entry card ── */
function EntryCard({
  entry,
  rotation,
  side,
}: {
  entry: (typeof experiences)[0];
  rotation: string;
  side: "left" | "right";
}) {
  return (
    <div className={`relative ${rotation}`}>
      {/* Dotted connector line */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-neon-magenta/40 ${
          side === "left" ? "-right-8" : "-left-8"
        }`}
      />

      {/* Year badge */}
      <div className="mb-3">
        <span className="inline-block px-4 py-1 rounded-full bg-vinyl-dark text-retro-yellow font-bold font-mono text-sm border border-neon-magenta/30">
          {entry.year}
        </span>
      </div>

      {/* Card */}
      <div className="bg-soft-white/90 dark:bg-vinyl-dark/80 border-2 border-dark-navy/10 dark:border-muted-lilac/20 rounded-xl p-6 shadow-md hover:shadow-[0_8px_30px_rgba(255,45,120,0.15)] transition-all duration-300">
        <p className="font-body font-bold text-lg text-neon-magenta mb-0.5">{entry.role}</p>
        <p className="font-display text-xl text-dark-navy dark:text-soft-white mb-3">{entry.company}</p>
        <p className="font-body text-sm text-dark-navy/70 dark:text-soft-white/70 leading-relaxed mb-4">
          {entry.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {entry.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full bg-sky-cyan/20 text-dark-navy dark:text-sky-cyan font-body text-xs font-medium border border-sky-cyan/30"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen pt-28 pb-24 px-6 overflow-hidden bg-soft-white dark:bg-dark-navy transition-colors duration-300">
      {/* Halftone overlay */}
      <div className="halftone-bg absolute inset-0 pointer-events-none" style={{ opacity: 0.035 }} />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-24 left-[6%] w-28 h-28 rounded-full bg-lavender/15 blur-2xl pointer-events-none"
        animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[4%] w-36 h-36 rounded-full bg-neon-magenta/8 blur-3xl pointer-events-none"
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 left-[30%] w-24 h-24 bg-sky-cyan/10 blur-2xl pointer-events-none"
        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
        animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-5xl relative z-10">

        {/* ── Page heading ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-5xl md:text-7xl tracking-widest text-dark-navy dark:text-soft-white">
            EXPERIENCE
          </h1>
          <p className="font-zen text-lg text-muted-lilac mt-1 tracking-widest">経験</p>
        </motion.div>

        {/* ── Manga chapter header ── */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpeedLines />
          <div className="text-center shrink-0">
            <span className="font-mono text-xs text-neon-magenta uppercase tracking-[0.2em]">
              Chapter 01
            </span>
            <p className="font-display text-xl text-dark-navy dark:text-soft-white leading-tight">
              My Journey
            </p>
          </div>
          <SpeedLines flip />
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Center vertical gradient line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #FF2D78, #5080F0, #40C8A0)",
            }}
          />

          {/* Left rail — mobile only */}
          <div
            className="md:hidden absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #FF2D78, #5080F0, #40C8A0)",
            }}
          />

          {/* Entries */}
          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.year} entry={exp} index={i} />
            ))}
          </div>
        </div>

        {/* ── To be continued ── */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 border-2 border-neon-magenta/30 rounded-2xl px-8 py-4 bg-vinyl-dark/30 backdrop-blur-sm">
            <span className="font-display text-2xl text-dark-navy dark:text-soft-white">
              To be continued
            </span>
            <span className="font-display text-2xl text-neon-magenta tracking-widest">...</span>
            <span className="text-xl text-retro-yellow">→</span>
          </div>
          <p className="font-zen text-xs text-muted-lilac/60 mt-3 tracking-wider">
            続く
          </p>
        </motion.div>

      </div>
    </main>
  );
}
