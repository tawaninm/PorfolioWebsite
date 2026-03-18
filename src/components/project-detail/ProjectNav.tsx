"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectNavProps {
  projects: Project[];
  currentIndex: number;
}

export default function ProjectNav({ projects, currentIndex }: ProjectNavProps) {
  const total = projects.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const prev = projects[prevIndex];
  const next = projects[nextIndex];

  return (
    <motion.nav
      className="border-t border-soft-white/10 mt-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-5xl grid grid-cols-2 gap-4">
        {/* Previous project */}
        <Link
          href={`/projects/${prev.slug}`}
          className="group flex flex-col items-start gap-1 py-8 px-4 md:px-8 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-soft-white/5"
        >
          <span className="font-body text-xs font-bold uppercase tracking-widest text-muted-lilac group-hover:text-hot-pink transition-colors">
            ← Previous
          </span>
          <span className="font-display text-lg md:text-xl text-soft-white group-hover:text-hot-pink transition-colors line-clamp-1">
            {prev.title}
          </span>
        </Link>

        {/* Next project */}
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col items-end gap-1 py-8 px-4 md:px-8 rounded-xl text-right transition-all duration-300 hover:-translate-y-0.5 hover:bg-soft-white/5"
        >
          <span className="font-body text-xs font-bold uppercase tracking-widest text-muted-lilac group-hover:text-hot-pink transition-colors">
            Next →
          </span>
          <span className="font-display text-lg md:text-xl text-soft-white group-hover:text-hot-pink transition-colors line-clamp-1">
            {next.title}
          </span>
        </Link>
      </div>
    </motion.nav>
  );
}
