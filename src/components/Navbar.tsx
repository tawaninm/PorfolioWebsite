"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const navLinks = [
  { label: "Home",       href: "/#home" },
  { label: "About",      href: "/#about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects",   href: "/#works" },
  { label: "Activities", href: "/activities" },
  { label: "Resume",     href: "/resume" },
  { label: "Contact",    href: "/#contact" },
];

/** Maps a pathname to the matching navLink href so active underline works on every page */
function resolveActiveFromPath(pathname: string): string | null {
  if (pathname === "/experience") return "/experience";
  if (pathname === "/activities")  return "/activities";
  if (pathname === "/resume")      return "/resume";
  if (pathname.startsWith("/projects")) return "/#works";
  return null; // home — handled by scroll
}

/* Small sakura petal SVG for mobile menu decoration */
function SakuraPetal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
      className={className} aria-hidden="true">
      <path d="M10 0 C12 4, 18 6, 18 12 C18 18, 12 22, 10 24 C8 22, 2 18, 2 12 C2 6, 8 4, 10 0Z" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("/#home");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  /* Hide on scroll-down, reveal on scroll-up */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150);
  });

  /* Track active link */
  useEffect(() => {
    const fromPath = resolveActiveFromPath(pathname);
    if (fromPath) {
      setActiveSection(fromPath);
      return;
    }

    // Home page — track by scroll
    const handleScroll = () => {
      if (pathname !== "/") return;
      const sectionIds = navLinks
        .filter((l) => l.href.startsWith("/#"))
        .map((l) => l.href.slice(2));

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          current = `/#${id}`;
        }
      }
      setActiveSection(current || "/#home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isDark = theme === "dark";

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-vinyl-dark/60 border-b border-neon-magenta/20 overflow-hidden"
    >
      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone-bg opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 relative z-10">

        {/* Logo */}
        <Link href="/#home" className="flex flex-col items-start group shrink-0">
          <span className="font-display text-2xl text-soft-white tracking-widest leading-none">
            TW<span className="text-hot-pink transition-colors duration-300 group-hover:text-sky-cyan">.</span>
          </span>
          <span className="font-zen text-[10px] text-muted-lilac tracking-wider leading-none mt-0.5">
            ポートフォリオ
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative font-body text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-hot-pink"
                      : "text-soft-white/70 hover:text-soft-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-neon-magenta rounded-sm"
                      style={{ transform: "skewX(-12deg)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="relative w-16 h-8 rounded-full border border-muted-lilac/30 bg-vinyl-dark/80 flex items-center px-1 transition-all duration-300 hover:border-neon-magenta/60 hover:shadow-[0_0_12px_rgba(255,45,120,0.3)] group overflow-hidden"
            >
              {/* Track fill */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ backgroundColor: isDark ? "rgba(255,45,120,0.15)" : "rgba(240,208,64,0.15)" }}
                transition={{ duration: 0.3 }}
              />
              {/* Sliding knob */}
              <motion.div
                className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                animate={{
                  x: isDark ? 32 : 0,
                  backgroundColor: isDark ? "#FF2D78" : "#F0D040",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {isDark
                  ? <FiMoon size={13} className="text-soft-white" />
                  : <FiSun  size={13} className="text-deep-black" />
                }
              </motion.div>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 focus:outline-none"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 rounded-full bg-soft-white"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 rounded-full bg-soft-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 rounded-full bg-soft-white"
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-40">
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            {/* Side drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 h-full w-72 max-w-[80%] bg-vinyl-dark border-l border-neon-magenta/30 flex flex-col justify-center items-stretch overflow-hidden px-8"
            >
            {/* Scattered sakura petals */}
            <SakuraPetal className="absolute top-[8%]  left-[12%]  w-5 h-6 text-sakura-pink/20 rotate-[20deg]"  />
            <SakuraPetal className="absolute top-[15%] right-[18%] w-4 h-5 text-lavender/25  rotate-[-35deg]" />
            <SakuraPetal className="absolute top-[40%] left-[6%]   w-3 h-4 text-hot-pink/15  rotate-[55deg]"  />
            <SakuraPetal className="absolute bottom-[30%] right-[10%] w-5 h-6 text-sakura-pink/20 rotate-[-15deg]" />
            <SakuraPetal className="absolute bottom-[12%] left-[22%] w-4 h-5 text-lavender/20  rotate-[40deg]"  />
            <SakuraPetal className="absolute top-[60%]  right-[25%] w-3 h-4 text-hot-pink/20  rotate-[-60deg]" />
            <SakuraPetal className="absolute top-[25%]  left-[35%]  w-2 h-3 text-sakura-pink/15 rotate-[10deg]" />
            <SakuraPetal className="absolute bottom-[20%] right-[40%] w-4 h-5 text-muted-lilac/20 rotate-[70deg]" />

            {/* Mobile theme toggle inside menu */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-muted-lilac/30 bg-soft-white/5 flex items-center justify-center text-soft-white hover:border-neon-magenta/60 transition-all duration-300 z-20"
              >
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
            )}

            <ul className="flex flex-col gap-6 text-left relative z-10 mt-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display tracking-wide text-2xl transition-colors duration-300 ${
                      activeSection === link.href
                        ? "text-hot-pink"
                        : "text-soft-white/80 hover:text-soft-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
