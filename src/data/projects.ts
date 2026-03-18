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
  techStack: string[];
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
    techStack: ["Figma", "FigJam", "Maze", "Notion"],
    summary:
      "Complete UX/UI redesign of a mobile banking app — improving navigation, task flows, and visual consistency for 50k+ users.",
    problem:
      "Users struggled with complex navigation and low task completion rates. The existing app had inconsistent patterns across different banking features, leading to confusion and frequent support calls. Onboarding new users was particularly challenging with a 60% drop-off rate during account setup.",
    process:
      "Conducted 20+ user interviews and contextual inquiries to understand pain points. Created user personas and journey maps to identify critical friction points. Built wireframes iterating through 3 major design rounds, then developed high-fidelity prototypes in Figma with a comprehensive design system of 120+ components.",
    result:
      "Increased task completion rate by 40% and reduced support tickets by 25%. The new onboarding flow cut drop-off rates in half. The design system reduced design-to-development handoff time by 60%.",
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
    techStack: ["Next.js", "TypeScript", "WebSocket", "Chart.js", "Tailwind CSS", "PostgreSQL"],
    summary:
      "Real-time analytics dashboard with live data streaming, interactive charts, and role-based access control.",
    problem:
      "The team lacked a centralized view of KPIs with live updates. Data was scattered across multiple tools, requiring manual compilation for weekly reports. Decision-makers needed real-time insights but were working with data that was hours — sometimes days — old.",
    process:
      "Built with Next.js App Router for the frontend, WebSocket connections for real-time data streaming, and Chart.js for interactive visualizations. Implemented role-based access control with three permission tiers. Designed a modular widget system so teams could customize their dashboard layout.",
    result:
      "Deployed to production serving 200+ daily active users with sub-second data refresh. Eliminated 8+ hours of manual reporting per week. The modular architecture allowed 5 new widget types to be added in the first month post-launch.",
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
    techStack: ["Procreate", "Adobe Illustrator", "Photoshop"],
    summary:
      "City pop style illustration for annual company trip — featuring original mascot characters on a retro road trip adventure.",
    problem:
      "The company needed a fun, memorable visual identity for their 2022 Mũi Né team trip. Previous trip materials used generic stock graphics that failed to build excitement or team spirit. They wanted something unique that employees would actually want to wear and share.",
    process:
      "Designed original mascot characters inspired by Japanese city pop and kawaii aesthetics. Created a vibrant road trip scene with pastel gradients and retro typography. Went through 4 rounds of sketches, refining character expressions and the overall composition. Adapted the final illustration for multiple formats and print specifications.",
    result:
      "Final illustration was used on t-shirts, social media banners, and a printed poster. Received overwhelmingly positive feedback from 50+ team members. The mascot characters became an ongoing part of the company's internal culture.",
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
    techStack: ["Figma", "Principle", "After Effects", "Zeplin"],
    summary:
      "End-to-end design of a fashion e-commerce app with playful micro-interactions and a custom design system.",
    problem:
      "The brand lacked a cohesive mobile shopping experience that matched their youthful identity. Their existing web-only store had poor mobile conversion rates, and competitors were capturing the Gen-Z market with polished native app experiences.",
    process:
      "Ran discovery workshops with stakeholders and target users. Mapped complete user journeys from browsing to checkout. Built a component library with motion guidelines covering 80+ components. Designed and prototyped playful micro-interactions for add-to-cart, wishlist, and size selection flows.",
    result:
      "Launched on the App Store with a 4.8-star rating in the first month. Mobile conversion rate increased 3x compared to the mobile web experience. The design system was adopted company-wide for all future digital products.",
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
    techStack: ["Adobe Illustrator", "Photoshop", "InDesign"],
    summary:
      "Full brand identity for a Japanese-inspired café — logo, packaging, menu design, and environmental graphics.",
    problem:
      "New café needed a cohesive brand that blended Japanese aesthetics with modern minimalism. The founders had a clear vision of a serene, cherry-blossom inspired atmosphere but needed professional design execution to bring it to life across all customer touchpoints.",
    process:
      "Developed mood boards exploring the intersection of traditional Japanese design and contemporary café culture. Iterated on 15+ logo concepts before arriving at the final mark. Designed a full brand guideline document with print-ready assets covering typography, color usage, photography style, and tone of voice.",
    result:
      "Brand assets deployed across all touchpoints — signage, menus, packaging, and social media templates. The café received press coverage specifically praising its design coherence. All assets were delivered in a brand book used to onboard new staff and vendors.",
    gallery: [],
  },
];
