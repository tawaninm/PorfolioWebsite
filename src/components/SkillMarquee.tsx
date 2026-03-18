"use client";

const row1 = [
  { name: "Figma", color: "bg-sakura-pink/20 text-sakura-pink", dot: "bg-sakura-pink" },
  { name: "Adobe XD", color: "bg-lavender/20 text-lavender", dot: "bg-lavender" },
  { name: "Photoshop", color: "bg-sky-cyan/20 text-sky-cyan", dot: "bg-sky-cyan" },
  { name: "Illustrator", color: "bg-sunset-gold/20 text-sunset-gold", dot: "bg-sunset-gold" },
  { name: "Procreate", color: "bg-mint/20 text-mint", dot: "bg-mint" },
  { name: "Framer", color: "bg-hot-pink/20 text-hot-pink", dot: "bg-hot-pink" },
];

const row2 = [
  { name: "React", color: "bg-sky-cyan/20 text-sky-cyan", dot: "bg-sky-cyan" },
  { name: "Next.js", color: "bg-soft-white/20 text-soft-white", dot: "bg-soft-white" },
  { name: "TypeScript", color: "bg-electric-blue/20 text-electric-blue", dot: "bg-electric-blue" },
  { name: "Tailwind CSS", color: "bg-neon-teal/20 text-neon-teal", dot: "bg-neon-teal" },
  { name: "Node.js", color: "bg-mint/20 text-mint", dot: "bg-mint" },
  { name: "Python", color: "bg-retro-yellow/20 text-retro-yellow", dot: "bg-retro-yellow" },
];

export default function SkillMarquee() {
  return (
    <section className="w-full py-16 overflow-hidden bg-dark-navy relative z-20 border-y border-soft-white/5">
      {/* 
        Mask image for gradient fade on left and right edges. 
        It fades from transparent at 0% to black (visible) at 10%, 
        stays visible until 90%, then fades to transparent at 100%. 
      */}
      <div 
        className="w-full flex flex-col gap-6"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
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
            <div 
              key={`r1-${i}`} 
              className={`flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap border border-soft-white/10 glass ${skill.color.split(' ')[0]}`}
            >
              {/* Placeholder for tool icon, e.g. <Image src={...} /> */}
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${skill.dot}`} />
              <span className="font-body text-sm font-medium text-soft-white tracking-wide">
                {skill.name}
              </span>
            </div>
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
            <div 
              key={`r2-${i}`} 
              className={`flex items-center gap-3 px-6 py-3 rounded-full whitespace-nowrap border border-soft-white/10 glass ${skill.color.split(' ')[0]}`}
            >
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${skill.dot}`} />
              <span className="font-body text-sm font-medium text-soft-white tracking-wide">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
