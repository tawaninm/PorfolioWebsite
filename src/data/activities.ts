// Activities data — Thanatpat Promthong

export type ActivityType = "camp" | "workshop" | "hackathon" | "training" | "volunteer" | "work";

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  date: string;
  description: string;
  organizer: string;
  gradient: string;
  featured?: boolean;
}

export const activities: Activity[] = [
  {
    id: "itcamp21",
    name: "ITCAMP21 — Unreal Engine TD",
    type: "camp",
    date: "Apr 28 – May 1, 2025",
    description:
      "Served as Technical Director for the Unreal Engine track. Supported student teams building competition-grade games and interactive experiences over a 4-day intensive camp.",
    organizer: "School of Information Technology, KMITL",
    gradient: "from-mint/40 to-sky-cyan/30",
    featured: true,
  },
  {
    id: "openhouse2025",
    name: "IT Openhouse 2025 — Roblox Journey Workshop",
    type: "workshop",
    date: "Nov 28 – 29, 2025",
    description:
      "Acted as Project Head for the Roblox Training Program. Designed the curriculum, sourced TAs and TDs, and led two days of hands-on workshops for incoming students.",
    organizer: "School of Information Technology, KMITL",
    gradient: "from-sky-cyan/40 to-lavender/30",
    featured: true,
  },
  {
    id: "nsc2023",
    name: "National Software Contest 2023",
    type: "hackathon",
    date: "2023",
    description:
      "Reached the second round with \"CriminalMind\", a Unity-based computer game. Competed against university teams nationwide in the game development category.",
    organizer: "NECTEC / National Science and Technology Development Agency",
    gradient: "from-neon-magenta/25 to-deep-purple/30",
    featured: true,
  },
  {
    id: "nsc2022",
    name: "National Software Contest 2022",
    type: "hackathon",
    date: "2022",
    description:
      "Reached the final round with \"Detectcheat\", a Unity mobile app teaching users how to recognise and respond to online fraud. One of few high-school finalists.",
    organizer: "NECTEC / National Science and Technology Development Agency",
    gradient: "from-retro-yellow/25 to-peach/30",
    featured: true,
  },
  {
    id: "java-ta",
    name: "Java OOP Teaching Assistant",
    type: "training",
    date: "Nov 2025 – Present",
    description:
      "Assist the course instructor for the Object-Oriented Programming course — evaluating lab work, posing conceptual questions, and facilitating further learning.",
    organizer: "School of Information Technology, KMITL",
    gradient: "from-retro-yellow/30 to-mint/20",
  },
  {
    id: "login-tutor",
    name: "IT & Math Tutor",
    type: "volunteer",
    date: "Sep 2026 – 2026",
    description:
      "Teach Godot game engine fundamentals and mathematics to junior- and senior-high students. Guide competition teams building portfolio projects for university applications.",
    organizer: "Login-Engineering Academy",
    gradient: "from-sakura-pink/30 to-lavender/25",
  },
  {
    id: "code-genius-tutor",
    name: "Coding Tutor — Primary School",
    type: "work",
    date: "2026 – Present",
    description:
      "Instructed group classes of primary school students in basic computer skills, delivering lessons in both Thai and English. Topics include Scratch, Python, and Microbit.",
    organizer: "Code Genius Emquartier",
    gradient: "from-electric-blue/30 to-mint/25",
  },
  {
    id: "phoenix-bookfair",
    name: "Phoenix Next Book Fair Staff",
    type: "work",
    date: "2025",
    description:
      "Worked as booth staff responsible for preparing and arranging book displays. Managed cashier duties, processed payments, and assisted with booth teardown at the end of the event.",
    organizer: "Phoenix Next",
    gradient: "from-sunset-gold/30 to-peach/25",
  },
  {
    id: "luckpim-bookfair",
    name: "Luckpim Book Fair Staff",
    type: "work",
    date: "2026",
    description:
      "Worked as booth staff responsible for preparing and arranging book displays. Managed cashier duties, processed payments, and assisted with booth teardown at the end of the event.",
    organizer: "Luckpim",
    gradient: "from-coral-red/25 to-retro-yellow/20",
  },
];

export const featuredActivities = activities.filter((a) => a.featured);

export const typeBadge: Record<ActivityType, string> = {
  camp: "bg-mint text-dark-navy",
  workshop: "bg-sky-cyan text-dark-navy",
  hackathon: "bg-neon-magenta text-white",
  training: "bg-retro-yellow text-deep-black",
  volunteer: "bg-sakura-pink text-deep-purple",
  work: "bg-lavender text-dark-navy",
};

export const typeLabel: Record<ActivityType, string> = {
  camp: "Camp",
  workshop: "Workshop",
  hackathon: "Hackathon",
  training: "Training",
  volunteer: "Volunteer",
  work: "Work",
};
