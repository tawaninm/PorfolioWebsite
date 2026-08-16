"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_STYLE: Record<string, string> = {
  "ux/ui": "bg-sakura-pink text-deep-purple",
  programming: "bg-electric-blue text-white",
  "game dev": "bg-hot-pink text-white",
  "ci art": "bg-retro-yellow text-deep-navy",
};

/**
 * HorizontalProjects — GSAP ScrollTrigger pinned "showreel".
 * The section pins while the project cards glide horizontally.
 * Falls back to a plain grid under prefers-reduced-motion.
 */
export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + distance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill(true);
      tween.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-vinyl-dark text-soft-white py-20"
      aria-label="Project showreel"
    >
      {/* Diagonal comic cut on top */}
      <div
        className="absolute -top-10 left-0 w-full h-10 bg-vinyl-dark"
        style={{ clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0% 100%)" }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 mb-10">
          <p className="font-mono text-xs text-neon-teal uppercase tracking-[0.3em] mb-2">
            ✦ Showreel ✦
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-widest">
            Projects on the Move
          </h2>
          <p className="font-zen text-base text-lilac-bright mt-1 tracking-widest">作品をスライド ✦ scroll</p>
        </div>

        <div
          ref={trackRef}
          className={
            reduced
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6"
              : "flex gap-6 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] w-max will-change-transform"
          }
        >
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={
                reduced
                  ? "group relative w-full h-[240px] md:h-[280px] rounded-2xl overflow-hidden border border-soft-white/10 hover:border-neon-magenta/60 transition-colors block"
                  : "group relative w-[72vw] sm:w-[380px] md:w-[440px] h-[240px] md:h-[280px] rounded-2xl overflow-hidden border border-soft-white/10 hover:border-neon-magenta/60 transition-colors shrink-0 block"
              }
            >
              <Image
                src={p.thumbnail}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 72vw, 440px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent" />
              {/* Number */}
              <span className="absolute top-3 left-4 font-display text-3xl text-soft-white/25 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Category chip */}
              <span
                className={`absolute top-3 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  CATEGORY_STYLE[p.category] ?? "bg-soft-white/20 text-soft-white"
                }`}
              >
                {p.category}
              </span>
              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div>
                  <p className="font-display text-xl md:text-2xl leading-tight text-soft-white">
                    {p.title}
                  </p>
                  <span className="font-zen text-[10px] text-lilac-bright tracking-widest">
                    view case study
                  </span>
                </div>
                <span
                  className="shrink-0 w-10 h-10 rounded-full border-2 border-neon-magenta/60 flex items-center justify-center text-neon-magenta transition-all duration-300 group-hover:bg-neon-magenta group-hover:text-white group-hover:rotate-45"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Edge fade masks — only shown during horizontal scroll mode */}
      {!reduced && (
        <>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-vinyl-dark to-transparent pointer-events-none z-10" aria-hidden="true" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-vinyl-dark to-transparent pointer-events-none z-10" aria-hidden="true" />
        </>
      )}
    </section>
  );
}

