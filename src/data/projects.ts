// Project data structure for the portfolio
// Fill in your real content here

export interface Project {
  slug: string;
  title: string;
  category: "uxui" | "programming" | "ci-art";
  thumbnail: string;
  heroImage: string;
  date: string;
  tags: string[];
  summary: string;
  problem: string;
  process: string;
  result: string;
  gallery: string[];
}

export const projects: Project[] = [
  // Add your projects here — see .agent/skills/building-citypop-portfolio/examples/projects-data.ts
];
