import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaDribbble } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-navy text-soft-white overflow-hidden">
      {/* ── Subtle Gradient Border Top ── */}
      <div className="h-1 w-full bg-gradient-to-r from-lavender via-sakura-pink to-sky-cyan" />

      {/* ── Decorative Static Stars ── */}
      <div className="absolute top-8 left-[15%] text-retro-yellow/40 text-sm select-none" aria-hidden="true">✦</div>
      <div className="absolute top-16 right-[20%] text-retro-yellow/30 text-xs select-none" aria-hidden="true">✦</div>
      <div className="absolute bottom-10 left-[40%] text-retro-yellow/20 text-lg select-none" aria-hidden="true">✦</div>

      <div className="mx-auto max-w-4xl px-6 py-12 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* ── Social Icons (Smaller) ── */}
        <div className="flex items-center gap-4 mb-6">
          <SocialIcon href="https://github.com" icon={<FiGithub size={18} />} label="GitHub" />
          <SocialIcon href="https://linkedin.com" icon={<FiLinkedin size={18} />} label="LinkedIn" />
          <SocialIcon href="https://dribbble.com" icon={<FaDribbble size={18} />} label="Dribbble" />
          <SocialIcon href="mailto:hello@example.com" icon={<FiMail size={18} />} label="Email" />
        </div>

        {/* ── Tagline & Copyright ── */}
        <p className="font-body text-sm md:text-base text-soft-white/80 mb-2">
          Built with pixels, passion, and city pop playlists on repeat
        </p>
        <p className="font-mono text-xs text-soft-white/50">
          © {year} [Your Name]. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ---- Small Social Icon ---- */
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
