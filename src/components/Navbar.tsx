"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#works" },
  { label: "Activities", href: "/#activities" },
  { label: "Contact", href: "/#contact" },
];

/* Small sakura petal SVG for mobile menu decoration */
function SakuraPetal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 0 C12 4, 18 6, 18 12 C18 18, 12 22, 10 24 C8 22, 2 18, 2 12 C2 6, 8 4, 10 0Z" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("/#home");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();

  // Hide nav on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Track active section based on scroll position or pathname
  useEffect(() => {
    if (pathname && pathname.startsWith("/projects")) {
      setActiveSection("/#works");
      return;
    }

    const handleScroll = () => {
      if (pathname !== "/") return;

      const sections = navLinks.map((link) => link.href.substring(2));

      let current = "";
      for (const section of sections) {
        if (!section) continue;
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = `/#${section}`;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        setActiveSection("/#home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-vinyl-dark/40 border-b border-neon-magenta/20 overflow-hidden"
    >
      {/* Halftone overlay */}
      <div className="absolute inset-0 halftone-bg opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 relative z-10">
        {/* Logo */}
        <a
          href="/#home"
          className="flex flex-col items-start group"
        >
          <span className="font-display text-2xl text-dark-navy dark:text-soft-white tracking-widest leading-none">
            TW<span className="text-hot-pink transition-colors duration-300 group-hover:text-sky-cyan">.</span>
          </span>
          <span className="font-zen text-[10px] text-muted-lilac tracking-wider leading-none mt-0.5">
            ポートフォリオ
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative font-body text-sm font-medium transition-colors duration-300
                            ${activeSection === link.href ? "text-hot-pink" : "text-dark-navy/70 dark:text-soft-white/80 hover:text-dark-navy dark:hover:text-soft-white"}`}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-neon-magenta"
                    style={{ transform: "skewX(-12deg)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle & Mobile Menu container */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-soft-white/10 dark:bg-dark-navy/10 border border-soft-white/20 text-soft-white dark:text-dark-navy hover:text-hot-pink dark:hover:text-hot-pink transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
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
              className={`block w-6 h-0.5 rounded-full transition-colors duration-300 ${mobileOpen ? "bg-dark-navy" : "bg-soft-white dark:bg-dark-navy"}`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-soft-white dark:bg-dark-navy rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 rounded-full transition-colors duration-300 ${mobileOpen ? "bg-dark-navy" : "bg-soft-white dark:bg-dark-navy"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-vinyl-dark flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Scattered sakura petals */}
            <SakuraPetal className="absolute top-[8%] left-[12%] w-5 h-6 text-sakura-pink/20 rotate-[20deg]" />
            <SakuraPetal className="absolute top-[15%] right-[18%] w-4 h-5 text-lavender/25 rotate-[-35deg]" />
            <SakuraPetal className="absolute top-[40%] left-[6%] w-3 h-4 text-hot-pink/15 rotate-[55deg]" />
            <SakuraPetal className="absolute bottom-[30%] right-[10%] w-5 h-6 text-sakura-pink/20 rotate-[-15deg]" />
            <SakuraPetal className="absolute bottom-[12%] left-[22%] w-4 h-5 text-lavender/20 rotate-[40deg]" />
            <SakuraPetal className="absolute top-[60%] right-[25%] w-3 h-4 text-hot-pink/20 rotate-[-60deg]" />
            <SakuraPetal className="absolute top-[25%] left-[35%] w-2 h-3 text-sakura-pink/15 rotate-[10deg]" />
            <SakuraPetal className="absolute bottom-[20%] right-[40%] w-4 h-5 text-muted-lilac/20 rotate-[70deg]" />

            <ul className="flex flex-col gap-10 text-center relative z-10">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display tracking-wide text-4xl transition-colors duration-300
                               ${activeSection === link.href ? "text-hot-pink" : "text-soft-white/80 hover:text-soft-white"}`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
