"use client";

const row1 = [
  { name: "Figma",        color: "bg-sakura-pink/20 text-sakura-pink", dot: "bg-sakura-pink" },
  { name: "Adobe XD",     color: "bg-lavender/20 text-lavender",       dot: "bg-lavender" },
  { name: "Photoshop",    color: "bg-sky-cyan/20 text-sky-cyan",       dot: "bg-sky-cyan" },
  { name: "Illustrator",  color: "bg-sunset-gold/20 text-sunset-gold", dot: "bg-sunset-gold" },
  { name: "Procreate",    color: "bg-mint/20 text-mint",               dot: "bg-mint" },
  { name: "Framer",       color: "bg-hot-pink/20 text-hot-pink",       dot: "bg-hot-pink" },
  { name: "After Effects",color: "bg-lavender/20 text-lavender",       dot: "bg-lavender" },
  { name: "Rive",         color: "bg-neon-magenta/20 text-neon-magenta", dot: "bg-neon-magenta" },
];

const row2 = [
  { name: "React",       color: "bg-sky-cyan/20 text-sky-cyan",           dot: "bg-sky-cyan" },
  { name: "Next.js",     color: "bg-soft-white/20 text-soft-white",       dot: "bg-soft-white" },
  { name: "TypeScript",  color: "bg-electric-blue/20 text-electric-blue", dot: "bg-electric-blue" },
  { name: "Tailwind CSS",color: "bg-neon-teal/20 text-neon-teal",         dot: "bg-neon-teal" },
  { name: "Node.js",     color: "bg-mint/20 text-mint",                   dot: "bg-mint" },
  { name: "Python",      color: "bg-retro-yellow/20 text-retro-yellow",   dot: "bg-retro-yellow" },
  { name: "Three.js",    color: "bg-sakura-pink/20 text-sakura-pink",     dot: "bg-sakura-pink" },
  { name: "Git",         color: "bg-coral-red/20 text-coral-red",         dot: "bg-coral-red" },
];

function SakuraPetal({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 20 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute pointer-events-none select-none text-sakura-pink/30"
      style={style}
      aria-hidden="true"
    >
      <path d="M10 0 C12 4, 18 6, 18 12 C18 18, 12 22, 10 24 C8 22, 2 18, 2 12 C2 6, 8 4, 10 0Z" />
    </svg>
  );
}

/* Pill card with 3D depth effect */
function SkillPill({ name, bgClass, dotClass }: { name: string; bgClass: string; dotClass: string }) {
  return (
    <div
      className={`flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap border border-soft-white/10 glass ${bgClass} cursor-default`}
      style={{
        transform: "perspective(500px) rotateY(-5deg)",
        filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.15))",
        transition: "transform 0.25s ease, filter 0.25s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "perspective(500px) rotateY(0deg) translateY(-4px)";
        el.style.filter = "drop-shadow(5px 6px 2px rgba(0,0,0,0.25))";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "perspective(500px) rotateY(-5deg)";
        el.style.filter = "drop-shadow(3px 3px 0 rgba(0,0,0,0.15))";
      }}
    >
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${dotClass}`} />
      <span className="font-body text-sm font-medium text-soft-white tracking-wide">{name}</span>
    </div>
  );
}

export default function SkillMarquee() {
  return (
    <section className="w-full overflow-visible bg-dark-navy relative z-20">
      {/* Diagonal comic panel cut — overlaps the Hero section above */}
      <div
        className="absolute -top-8 left-0 w-full h-10 bg-dark-navy pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0% 100%)" }}
      />

      <div className="pb-16 pt-6 relative">
        {/* Scattered sakura petals between rows */}
        <SakuraPetal style={{ width: 18, height: 22, top: "45%", left: "15%", transform: "rotate(25deg)" }} />
        <SakuraPetal style={{ width: 14, height: 17, top: "50%", left: "40%", transform: "rotate(-40deg)" }} />
        <SakuraPetal style={{ width: 20, height: 24, top: "42%", right: "20%", transform: "rotate(60deg)" }} />
        <SakuraPetal style={{ width: 12, height: 15, top: "55%", right: "45%", transform: "rotate(-15deg)" }} />

        {/* Mask wrapper */}
        <div
          className="w-full flex flex-col gap-6"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Row 1 — Scrolls left */}
          <div
            className="flex w-max gap-4"
            style={{ animation: "marquee 30s linear infinite" }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
          >
            {[...row1, ...row1, ...row1, ...row1, ...row1, ...row1, ...row1, ...row1].map((skill, i) => (
              <SkillPill
                key={`r1-${i}`}
                name={skill.name}
                bgClass={skill.color.split(" ")[0]}
                dotClass={skill.dot}
              />
            ))}
          </div>

          {/* Row 2 — Scrolls right (reverse) */}
          <div
            className="flex w-max gap-4"
            style={{ animation: "marquee-reverse 30s linear infinite" }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = "running")}
          >
            {[...row2, ...row2, ...row2, ...row2, ...row2, ...row2, ...row2, ...row2].map((skill, i) => (
              <SkillPill
                key={`r2-${i}`}
                name={skill.name}
                bgClass={skill.color.split(" ")[0]}
                dotClass={skill.dot}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
