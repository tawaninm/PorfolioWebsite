"use client";

import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";

/* ── Vinyl Record ── */
function VinylRecord() {
  return (
    <div
      className="w-10 h-10 rounded-full border-2 border-muted-lilac/40 flex items-center justify-center relative overflow-hidden bg-vinyl-dark shrink-0"
      style={{ animation: "spin 20s linear infinite" }}
      aria-hidden="true"
    >
      {/* Concentric grooves */}
      {[16, 12, 8].map((r) => (
        <div
          key={r}
          className="absolute rounded-full border border-muted-lilac/20"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}
      {/* Label */}
      <div className="w-4 h-4 rounded-full bg-neon-magenta/80 z-10 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-vinyl-dark" />
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-vinyl-dark text-soft-white overflow-hidden">
      {/* ── Gradient Border Top ── */}
      <div className="h-[2px] w-full bg-gradient-to-r from-neon-magenta via-electric-blue via-neon-teal to-retro-yellow" />

      {/* ── Decorative Stars ── */}
      <div className="absolute top-8  left-[15%]  text-retro-yellow/40 text-sm select-none" aria-hidden="true">✦</div>
      <div className="absolute top-16 right-[20%] text-retro-yellow/30 text-xs select-none" aria-hidden="true">✦</div>
      <div className="absolute bottom-10 left-[40%] text-retro-yellow/20 text-lg select-none" aria-hidden="true">✦</div>

      {/* ── Back to top button ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="absolute top-6 right-6 w-10 h-10 rounded-full border-2 border-neon-magenta/60 bg-vinyl-dark flex items-center justify-center text-neon-magenta transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(255,45,120,0.6)] hover:border-neon-magenta"
      >
        <FiArrowUp size={16} />
      </button>

      <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col items-center justify-center text-center relative z-10">

        {/* ── NOW PLAYING row ── */}
        <div className="flex items-center gap-3 mb-5">
          <VinylRecord />
          <span className="font-mono text-xs text-muted-lilac tracking-widest uppercase">
            NOW PLAYING: Your Portfolio
          </span>
        </div>

        {/* ── Social Icons ── */}
        <div className="flex items-center gap-4 mb-6">
          <SocialIcon href="https://github.com/tawaninm"                                       icon={<FiGithub size={18} />}   label="GitHub" />
          <SocialIcon href="https://www.linkedin.com/in/thanatpat-promthong-9084a4212"     icon={<FiLinkedin size={18} />} label="LinkedIn" />
          <SocialIcon href="mailto:tawaninm13@gmail.com"                                   icon={<FiMail size={18} />}     label="Email" />
        </div>

        {/* ── Tagline & Copyright ── */}
        <p className="font-body text-sm md:text-base text-soft-white/80 mb-2">
          Built with ♥, city pop playlists &amp; sakura petals
        </p>
        <p className="font-mono text-xs text-soft-white/50 mb-3">
          © {year} [Your Name]. All rights reserved.
        </p>

        {/* ── Japanese sign-off ── */}
        <p className="font-zen text-xs text-muted-lilac/50 tracking-widest">
          ありがとう
        </p>
      </div>
    </footer>
  );
}

/* ── Small Social Icon ── */
function SocialIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-soft-white/5 border border-soft-white/10 flex items-center justify-center text-soft-white/80 transition-all duration-300 hover:-translate-y-1 hover:bg-electric-blue hover:text-soft-white hover:border-transparent hover:shadow-[0_0_15px_rgba(80,128,240,0.4)]"
    >
      {icon}
    </a>
  );
}
