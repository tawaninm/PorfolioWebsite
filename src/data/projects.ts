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

export const categoryLabels: Record<Project["category"], string> = {
  uxui: "UX/UI",
  programming: "Programming",
  "ci-art": "CI Art",
};

export const projects: Project[] = [
  {
    slug: "mobile-banking-redesign",
    title: "Mobile Banking Redesign",
    category: "uxui",
    thumbnail: "/images/works/banking-thumb.webp",
    heroImage: "/images/works/banking-hero.webp",
    date: "2024",
    tags: ["Figma", "User Research", "Prototyping", "Design System"],
    summary:
      "Complete UX/UI redesign of a mobile banking app — improving navigation, task flows, and visual consistency for 50k+ users.",
    problem:
      "Users struggled with complex navigation and low task completion rates.",
    process:
      "Conducted user interviews, created personas, built wireframes and high-fidelity prototypes in Figma.",
    result:
      "Increased task completion rate by 40% and reduced support tickets by 25%.",
    gallery: [],
  },
  {
    slug: "realtime-dashboard",
    title: "Real-time Dashboard",
    category: "programming",
    thumbnail: "/images/works/dashboard-thumb.webp",
    heroImage: "/images/works/dashboard-hero.webp",
    date: "2024",
    tags: ["Next.js", "TypeScript", "WebSocket", "Tailwind CSS"],
    summary:
      "Real-time analytics dashboard with live data streaming, interactive charts, and role-based access control.",
    problem: "Team needed a centralized view of KPIs with live updates.",
    process:
      "Built with Next.js App Router, WebSocket for real-time data, and Chart.js for visualizations.",
    result:
      "Deployed to production serving 200+ daily active users with sub-second data refresh.",
    gallery: [],
  },
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
      "The company needed a fun, memorable visual identity for their 2022 Mũi Né team trip.",
    process:
      "Designed original mascot characters inspired by Japanese city pop and kawaii aesthetics. Created a vibrant road trip scene with pastel gradients and retro typography.",
    result:
      "Final illustration was used on t-shirts, social media banners, and a printed poster. Received overwhelmingly positive feedback from 50+ team members.",
    gallery: [],
  },
  {
    slug: "ecommerce-app",
    title: "E-commerce Mobile App",
    category: "uxui",
    thumbnail: "/images/works/ecommerce-thumb.webp",
    heroImage: "/images/works/ecommerce-hero.webp",
    date: "2023",
    tags: ["Figma", "iOS", "Design System", "Motion Design"],
    summary:
      "End-to-end design of a fashion e-commerce app with playful micro-interactions and a custom design system.",
    problem:
      "The brand lacked a cohesive mobile shopping experience that matched their youthful identity.",
    process:
      "Ran discovery workshops, mapped user journeys, and built a component library with motion guidelines.",
    result:
      "Launched on the App Store with a 4.8-star rating in the first month.",
    gallery: [],
  },
  {
    slug: "brand-identity-cafe",
    title: "Sakura Café Brand Identity",
    category: "ci-art",
    thumbnail: "/images/works/cafe-thumb.webp",
    heroImage: "/images/works/cafe-hero.webp",
    date: "2023",
    tags: ["Branding", "Logo Design", "Illustrator", "Print"],
    summary:
      "Full brand identity for a Japanese-inspired café — logo, packaging, menu design, and environmental graphics.",
    problem:
      "New café needed a cohesive brand that blended Japanese aesthetics with modern minimalism.",
    process:
      "Developed mood boards, iterated on logo concepts, and designed a full brand guideline document with print-ready assets.",
    result:
      "Brand assets deployed across all touchpoints — signage, menus, packaging, and social media templates.",
    gallery: [],
  },
];
