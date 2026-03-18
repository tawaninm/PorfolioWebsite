"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold to detect when section reaches upper part of viewport
          if (rect.top <= 200) {
            current = `#${section}`;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        // Fallback to home at the very top
        setActiveSection("#home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-soft-white/80 dark:bg-lavender/10 border-b border-dark-navy/10 dark:border-soft-white/10"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4 relative z-50">
        {/* Logo */}
        <a href="#home" className="font-display text-2xl text-dark-navy dark:text-soft-white tracking-widest flex items-center group">
          TW<span className="text-hot-pink transition-colors duration-300 group-hover:text-sky-cyan">.</span>
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
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-hot-pink"
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
              className={`block w-6 h-0.5 rounded-full transition-colors duration-300 ${mobileOpen ? 'bg-dark-navy' : 'bg-soft-white dark:bg-dark-navy'}`}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-soft-white dark:bg-dark-navy rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-0.5 rounded-full transition-colors duration-300 ${mobileOpen ? 'bg-dark-navy' : 'bg-soft-white dark:bg-dark-navy'}`}
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
            className="fixed inset-0 z-40 bg-gradient-to-b from-lavender to-sakura-pink flex flex-col justify-center items-center"
          >
            <ul className="flex flex-col gap-10 text-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-display tracking-wide text-5xl transition-colors duration-300
                               ${activeSection === link.href ? "text-hot-pink" : "text-dark-navy hover:text-soft-white"}`}
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
