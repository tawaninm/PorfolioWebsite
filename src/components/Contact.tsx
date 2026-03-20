"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

/* ---- Fade-in wrapper ---- */
function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---- Sakura petal SVG ---- */
function SakuraPetal({
  size,
  style,
}: {
  size: number;
  style: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 30 30"
      width={size}
      height={size}
      className="absolute pointer-events-none select-none"
      style={{ ...style, animationName: "sakura-fall", animationTimingFunction: "linear", animationIterationCount: "infinite" }}
      aria-hidden="true"
    >
      <ellipse cx="15" cy="15" rx="8" ry="13" fill="#F0B0D0" opacity="0.7" transform="rotate(-20 15 15)" />
    </svg>
  );
}

/* ---- Manga happy face ---- */
function MangaFace() {
  return (
    <svg viewBox="0 0 28 28" width={24} height={24} aria-hidden="true" className="shrink-0">
      <circle cx="14" cy="14" r="13" fill="#FFE8F0" stroke="#FF2D78" strokeWidth="1.5" />
      {/* eyes */}
      <ellipse cx="9.5" cy="12" rx="1.8" ry="2.2" fill="#1A1A2E" />
      <ellipse cx="18.5" cy="12" rx="1.8" ry="2.2" fill="#1A1A2E" />
      {/* shine dots */}
      <circle cx="10.3" cy="11" r="0.7" fill="white" />
      <circle cx="19.3" cy="11" r="0.7" fill="white" />
      {/* smile */}
      <path d="M9 17 Q14 22 19 17" stroke="#FF2D78" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---- Sakura petals config ---- */
const petals = [
  { size: 18, style: { top: "8%",  left: "4%",  animationDuration: "7s",  animationDelay: "0s"   } },
  { size: 14, style: { top: "15%", left: "18%", animationDuration: "9s",  animationDelay: "1.5s" } },
  { size: 20, style: { top: "5%",  left: "40%", animationDuration: "8s",  animationDelay: "0.7s" } },
  { size: 12, style: { top: "10%", left: "60%", animationDuration: "10s", animationDelay: "2s"   } },
  { size: 16, style: { top: "3%",  left: "75%", animationDuration: "7.5s",animationDelay: "0.3s" } },
  { size: 22, style: { top: "20%", left: "85%", animationDuration: "11s", animationDelay: "1s"   } },
  { size: 13, style: { top: "0%",  left: "92%", animationDuration: "6.5s",animationDelay: "2.5s" } },
  { size: 17, style: { top: "12%", left: "50%", animationDuration: "9.5s",animationDelay: "0.5s" } },
  { size: 15, style: { top: "6%",  left: "30%", animationDuration: "8.5s",animationDelay: "3s"   } },
  { size: 11, style: { top: "18%", left: "70%", animationDuration: "10.5s",animationDelay:"1.8s" } },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 overflow-hidden gradient-contact"
    >
      {/* Halftone overlay */}
      <div className="halftone-bg absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }} />

      {/* CSS sakura petals */}
      {petals.map((p, i) => (
        <SakuraPetal key={i} size={p.size} style={p.style as React.CSSProperties} />
      ))}

      {/* Background blur shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-[10%] w-48 h-48 rounded-full bg-neon-magenta/10 blur-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-[10%] w-56 h-56 rounded-full bg-ocean-blue/40 blur-[100px]"
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        {/* ---- Left Column: Text & Socials ---- */}
        <FadeSection className="flex flex-col text-center lg:text-left">

          {/* Comic speech bubble frame around heading */}
          <div className="relative inline-block mb-6">
            {/* Bubble frame */}
            <div className="relative border-2 border-neon-magenta/60 rounded-2xl px-6 py-5 bg-vinyl-dark/40 backdrop-blur-sm">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
                <span
                  style={{
                    background: "linear-gradient(90deg, #FF2D78, #F0D040)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Let&apos;s Create Something
                </span>
                <br className="hidden md:block" />
                <span className="text-sakura-white drop-shadow-md"> Amazing Together!</span>
              </h2>

              {/* Japanese subtitle */}
              <p className="font-zen text-base text-muted-lilac mt-2 tracking-widest">
                連絡してね！
              </p>
            </div>
            {/* Bubble tail pointing down-left */}
            <div
              className="absolute -bottom-[11px] left-10 w-0 h-0"
              style={{
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "11px solid rgba(255,45,120,0.6)",
              }}
            />
            <div
              className="absolute -bottom-[8px] left-[42px] w-0 h-0"
              style={{
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "8px solid rgba(28,28,46,0.6)",
              }}
            />
          </div>

          <p className="font-body text-soft-white/70 text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
            Whether you have a wild idea, need a fresh redesign, or just want to chat about retro aesthetics, my inbox is always open.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <SocialLink href="https://github.com/tawaninm"                                          icon={<FiGithub size={22} />}   label="GitHub"   color="hover:shadow-[0_0_20px_rgba(200,168,232,0.7)]" />
            <SocialLink href="https://www.linkedin.com/in/thanatpat-promthong-9084a4212"           icon={<FiLinkedin size={22} />} label="LinkedIn" color="hover:shadow-[0_0_20px_rgba(80,128,240,0.7)]" />
            <SocialLink href="mailto:tawaninm13@gmail.com"                                         icon={<FiMail size={22} />}     label="Email"    color="hover:shadow-[0_0_20px_rgba(255,45,120,0.7)]" />
          </div>
        </FadeSection>

        {/* ---- Right Column: Form ---- */}
        <FadeSection delay={0.2} className="w-full max-w-md mx-auto lg:ml-auto">
          {/* Speech bubble tail pointing left toward heading */}
          <div className="hidden lg:block absolute -left-5 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderRight: "14px solid rgba(28,28,46,0.9)",
            }}
          />

          <div className="relative border-2 border-vinyl-dark dark:border-muted-lilac/30 p-8 md:p-10 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transform rotate-1 hover:rotate-0 transition-all duration-500 bg-vinyl-dark/90 backdrop-blur-xl">
            {/* Postmark / Stamp */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-40 pointer-events-none select-none flex flex-col items-center">
              <div className="w-12 h-16 border-2 border-dashed border-muted-lilac/50 rounded flex items-center justify-center p-1">
                <span className="text-[10px] uppercase font-bold text-center text-muted-lilac/70 leading-tight">Place<br/>Stamp<br/>Here</span>
              </div>
              <div className="mt-2 w-16 h-16 border-4 border-double border-neon-magenta/30 rounded-full flex items-center justify-center rotate-[-15deg]">
                <span className="text-[10px] font-bold text-neon-magenta/40 uppercase whitespace-nowrap">City Pop Mail</span>
              </div>
            </div>

            <form className="flex flex-col gap-5 mt-4 md:mt-0 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-5 py-3 rounded-full bg-soft-white/5 border border-muted-lilac/30 text-soft-white placeholder:text-soft-white/40 font-body outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-3 rounded-full bg-soft-white/5 border border-muted-lilac/30 text-soft-white placeholder:text-soft-white/40 font-body outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full px-5 py-4 rounded-3xl bg-soft-white/5 border border-muted-lilac/30 text-soft-white placeholder:text-soft-white/40 font-body outline-none focus:ring-2 focus:ring-neon-magenta/50 focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button
                  type="submit"
                  className="hover-comic-shake flex-1 py-3.5 bg-neon-magenta text-soft-white font-body font-bold text-lg rounded-full shadow-lg transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,45,120,0.6)] focus:outline-none focus:ring-4 focus:ring-neon-magenta/30 flex items-center justify-center gap-2"
                >
                  Send Message
                  <span className="text-xl leading-none mb-[2px]">✉</span>
                </button>
                <MangaFace />
              </div>
            </form>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

/* ---- Social Link Component — 3D style ---- */
function SocialLink({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`w-14 h-14 rounded-full bg-vinyl-dark border border-muted-lilac/30 flex items-center justify-center text-soft-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-[4px] hover:bg-neon-magenta/20 hover:border-neon-magenta/60 ${color}`}
      style={{
        filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.35))",
        transform: "perspective(400px) rotateY(-6deg)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "perspective(400px) rotateY(0deg) translateY(-4px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "perspective(400px) rotateY(-6deg)";
      }}
    >
      {icon}
    </a>
  );
}
