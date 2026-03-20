// Project data — Thanatpat Promthong

export interface Project {
  slug: string;
  title: string;
  category: "uxui" | "programming" | "ci-art" | "game";
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
  game: "Game Dev",
};

export const projects: Project[] = [
  {
    slug: "drive-kmitl",
    title: "Drive@Kmitl",
    category: "programming",
    thumbnail: "/images/works/drive-kmitl-thumb.webp",
    heroImage: "/images/works/drive-kmitl-hero.webp",
    date: "2024",
    tags: ["Next.js", "Python", "Web App", "Chat"],
    techStack: ["Next.js", "Python", "HTML", "CSS", "JavaScript"],
    summary:
      "Freshman project — a Python Web / Next.js chat website built for KMITL internal communication.",
    problem:
      "KMITL students needed a dedicated platform for real-time communication and file sharing within the faculty network.",
    process:
      "Designed and developed the full-stack web application using Next.js for the frontend and Python for the backend. Implemented real-time chat functionality and a clean, user-friendly interface.",
    result:
      "Successfully delivered a functional chat platform as part of the freshman project requirements at the School of Information Technology, KMITL.",
    gallery: [],
  },
  {
    slug: "vpstycoon",
    title: "VPSTycoon",
    category: "game",
    thumbnail: "/images/works/vpstycoon-thumb.webp",
    heroImage: "/images/works/vpstycoon-hero.webp",
    date: "2024",
    tags: ["Java", "Game Development", "OOP"],
    techStack: ["Java"],
    summary:
      "Freshman project — a Java-based tycoon game developed as part of the Object-Oriented Programming coursework.",
    problem:
      "Required to build a fully functional game using Java OOP principles within the freshman project framework.",
    process:
      "Designed the game architecture using OOP concepts — inheritance, encapsulation, and polymorphism. Built game mechanics, UI, and progression systems entirely in Java.",
    result:
      "Completed and submitted as part of the Java Game freshman project, demonstrating solid OOP fundamentals.",
    gallery: [],
  },
  {
    slug: "synchro",
    title: "Synchro",
    category: "game",
    thumbnail: "/images/works/synchro-thumb.webp",
    heroImage: "/images/works/synchro-hero.webp",
    date: "2024",
    tags: ["Arduino", "Rhythm Game", "Hardware", "Game Development"],
    techStack: ["Arduino", "C++"],
    summary:
      "Freshman project — an Arduino-powered rhythm controller game combining hardware interaction with game design.",
    problem:
      "Tasked with creating an interactive physical computing project that merges hardware and software in an engaging experience.",
    process:
      "Built a custom rhythm game controller using Arduino, programming input detection and synchronisation with in-game events. Designed the game flow, timing system, and physical interface.",
    result:
      "Successfully delivered a playable rhythm game with a physical Arduino controller, praised for its creative hardware-software integration.",
    gallery: [],
  },
  {
    slug: "detectcheat",
    title: "Detectcheat",
    category: "game",
    thumbnail: "/images/works/detectcheat-thumb.webp",
    heroImage: "/images/works/detectcheat-hero.webp",
    date: "2022",
    tags: ["Unity", "Mobile App", "Education", "NSC 2022"],
    techStack: ["Unity", "C#"],
    summary:
      "NSC 2022 Final Round — A Unity mobile learning application teaching users how to recognise and respond to online fraud.",
    problem:
      "Online fraud and scams are increasingly targeting young and elderly users who lack the knowledge to identify threats in real time.",
    process:
      "Designed interactive scenarios simulating real fraud cases. Built the mobile app using Unity with scenario-based learning modules, quizzes, and feedback systems to reinforce fraud awareness.",
    result:
      "Reached the Final Round of the National Software Contest 2022 (NSC 2022) — one of few high-school finalists in the Learning Mobile Application category.",
    gallery: [],
  },
  {
    slug: "criminalmind",
    title: "CriminalMind",
    category: "game",
    thumbnail: "/images/works/criminalmind-thumb.webp",
    heroImage: "/images/works/criminalmind-hero.webp",
    date: "2023",
    tags: ["Unity", "Computer Game", "NSC 2023"],
    techStack: ["Unity", "C#"],
    summary:
      "NSC 2023 Second Round — A Unity computer game developed for the National Software Contest 2023.",
    problem:
      "Needed to design and build a complete, polished computer game within competition constraints for a national audience.",
    process:
      "Developed the game concept, mechanics, and visuals using Unity. Iterated rapidly through prototypes to meet competition deadlines while maintaining gameplay quality.",
    result:
      "Reached the Second Round of the National Software Contest 2023 (NSC 2023), competing against university-level teams nationwide.",
    gallery: [],
  },
];
