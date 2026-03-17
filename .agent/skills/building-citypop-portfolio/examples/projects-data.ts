// Example project data structure for the portfolio
// Copy this to src/data/projects.ts and fill in your real content

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
  {
    slug: "mui-ne-company-trip",
    title: "Mũi Né Company Trip 2022",
    category: "ci-art",
    thumbnail: "/images/works/muine-thumb.webp",
    heroImage: "/images/works/muine-hero.webp",
    date: "2022",
    tags: ["Illustration", "Character Design", "Procreate"],
    summary:
      "City pop style illustration for annual company trip — featuring original mascot characters on a retro road trip adventure.",
    problem:
      "The company needed a fun, memorable visual identity for their 2022 Mũi Né team trip that would work across social media, merchandise, and event materials.",
    process:
      "Designed original mascot characters inspired by Japanese city pop and kawaii aesthetics. Created a vibrant road trip scene with pastel gradients and retro typography. Iterated through 3 rounds of feedback with the team.",
    result:
      "Final illustration was used on t-shirts, social media banners, and a printed poster. Received overwhelmingly positive feedback from the 50+ team members.",
    gallery: [
      "/images/works/muine-gallery-01.webp",
      "/images/works/muine-gallery-02.webp",
    ],
  },
  {
    slug: "example-uxui-project",
    title: "Mobile Banking Redesign",
    category: "uxui",
    thumbnail: "/images/works/banking-thumb.webp",
    heroImage: "/images/works/banking-hero.webp",
    date: "2024",
    tags: ["Figma", "User Research", "Prototyping", "Design System"],
    summary: "Complete UX/UI redesign of a mobile banking app.",
    problem: "Users struggled with complex navigation and low task completion rates.",
    process: "Conducted user interviews, created personas, built wireframes and high-fidelity prototypes in Figma.",
    result: "Increased task completion rate by 40% and reduced support tickets by 25%.",
    gallery: [],
  },
  {
    slug: "example-programming-project",
    title: "Real-time Dashboard",
    category: "programming",
    thumbnail: "/images/works/dashboard-thumb.webp",
    heroImage: "/images/works/dashboard-hero.webp",
    date: "2024",
    tags: ["Next.js", "TypeScript", "WebSocket", "Tailwind CSS"],
    summary: "Real-time analytics dashboard with live data streaming.",
    problem: "Team needed a centralized view of KPIs with live updates.",
    process: "Built with Next.js App Router, WebSocket for real-time data, and Chart.js for visualizations.",
    result: "Deployed to production serving 200+ daily active users with sub-second data refresh.",
    gallery: [],
  },
];
