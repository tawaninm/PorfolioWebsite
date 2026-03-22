// Project data — Thanatpat Promthong
export interface ProjectPhase {
  title: string;
  description: string;
}

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
  phases?: ProjectPhase[];
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
    slug: "chao-dom",
    title: "Chao-dom",
    category: "uxui",
    thumbnail: "/images/Project/Preview.chaodom.png",
    heroImage: "/images/Project/Preview.chaodom.png",
    date: "2026",
    tags: ["UX/UI", "Figma", "Research", "iOS", "Human Interface Design"],
    techStack: ["Figma", "Microsoft Word", "Canva", "Adobe Premiere Pro", "Gemini", "NotebookLM"],
    summary: "EasyDom (Chao-dom) เป็น Term Project วิชา Human Interface Design คณะ IT สจล. หัวข้อ How to help freshy find rooms ดำเนินการ UX/UI ครบ 5 เฟส ตั้งแต่เก็บข้อมูล วิจัยผู้ใช้ วิเคราะห์ Persona/Experience Map ออกแบบ Conceptual Design ไปจนถึง Detailed Prototype iOS ตาม Apple HIG และ Guerilla Usability Testing ผลลัพธ์คือ Prototype แอป iOS ที่แก้ปัญหาข้อมูลล้าสมัย สถานะห้องไม่ชัดเจน และการติดต่อเจ้าของหอที่ยุ่งยาก",
    problem: "นักศึกษาใหม่ สจล. ประสบปัญหาหาหอพักนอกสถาบัน ข้อมูลบน RentHub Google Maps Facebook ไม่เป็นปัจจุบัน ราคา สถานะห้อง รูปภาพ เบอร์ติดต่อ ไม่ตรงความจริง ติดต่อแล้วถูกปฏิเสธ ต้องลงพื้นที่สำรวจเอง ระบบจองหอในไม่โปร่งใส ข้อมูลการเดินทาง ขนส่ง สภาพแวดล้อม นิสัยเจ้าของหอไม่มีแพลตฟอร์มใดให้ครบ สัมภาษณ์ผู้ใช้ 3 คน (โปเต้ ฟ้าใส ทัก) ทุกคนประสบปัญหาเดียวกัน ใช้เวลา 1 วัน ถึง 3 เดือนกว่าจะได้หอ",
    process: "กระบวนการ UX ครบวงจร 5 เฟส โดยเริ่มตั้งแต่การค้นคว้าปัญหาจริง การสัมภาษณ์ผู้ใช้ การวิเคราะห์ Persona/Experience Map ไปจนถึงการออกแบบ Prototype และทำ Usability Testing",
    phases: [
      {
        title: "Phase 1: Data Gathering",
        description: "ผลการค้นคว้าเบื้องต้น ทำการค้นคว้าในหัวข้อ EasyDom ไปหากลุ่มเป้าหมายที่มีปัญหาเกี่ยวกับการหาหอพักโดยอิงจากเรื่องจริง และพูดถึงปัญหาหลัก ได้ข้อมูล Pain Points สำคัญ เช่น ข้อมูลออนไลน์ไม่อัปเดต ติดต่อออนไลน์แล้วถูกปฏิเสธ สถานะห้องไม่แน่ชัด เข้าใจความลำบากในการหาหอพัก"
      },
      {
        title: "Phase 2: User and Task Analysis",
        description: "ศึกษา Background จากผลศึกษาเบื้องต้น กำหนด Research Scope เป็นนักศึกษา สจล. หมวด Accommodation ทำการสัมภาษณ์ User 3 คน ผ่าน Microsoft Teams ถอดคำพูดบทสัมภาษณ์ เก็บ Observation ภาพค้นหาหอพัก และลงพื้นที่ถ่ายสถานที่จริง"
      },
      {
        title: "Phase 3: Conceptual Design",
        description: "สรุป User Characteristics สร้าง Persona วิเคราะห์คุณลักษณะร่วม สร้าง Experience Map บน FigJam กำหนด Pain and Gain Statements โหวต Priority กำหนด Functional และ Usability Requirements"
      },
      {
        title: "Phase 4: Detailed Design",
        description: "วิเคราะห์ Task Lists 8 ข้อ ทำ Dialog Design วิเคราะห์ Essential และ Concrete Use Case กำหนด Task Objects 6 รายการ และออกแบบ Window Diagram พร้อม Container Specification"
      },
      {
        title: "Phase 5: Evaluation and Prototype",
        description: "Target Platform iOS (Apple HIG) ทำ UI Components 25+ รายการ ออกแบบ Detailed Screen ทุุกหน้า สร้าง Prototype ใน Figma ทำ Guerilla Usability Testing 3 คน โดยใช้ Thinking Aloud พบจุดที่ต้องปรับปรุงและแก้ไข"
      }
    ],
    result: "The Solution: iOS Prototype สำหรับนักศึกษา สจล. มีฟีเจอร์ สถานะห้องว่าง Real-time ค้นหาขั้นสูง แผนที่โต้ตอบ เปรียบเทียบ Side-by-side Wishlist แจ้งเตือนห้องว่าง ติดต่อเจ้าของยืนยันตัวตน รีวิวจากผู้พักจริง Customer Support Chat\nImpact: สัมภาษณ์เชิงลึก 3 คน Observation สถานที่จริง Persona/Experience Map จากข้อมูลจริง iOS Prototype 10+ หน้าจอ ตาม Apple HIG Usability Testing 3 คน พบ 15+ จุดปรับปรุง กระบวนการ UX ครบวงจรใน 5 สัปดาห์",
    gallery: [
      "/images/Project/1.png",
      "/images/Project/2.png",
      "/images/Project/3.png",
      "/images/Project/4.png",
      "/images/Project/5.png",
      "/images/Project/6.png",
      "/images/Project/7.png",
      "/images/Project/8.png",
      "/images/Project/9.png",
      "/images/Project/10.png",
      "/images/Project/11.png",
      "/images/Project/12.png",
      "/images/Project/13.png",
      "/images/Project/14.png",
      "/images/Project/15.png",
      "/images/Project/16.png",
      "/images/Project/17.png",
      "/images/Project/18.png"
    ],
  },
  {
    slug: "drive-kmitl",
    title: "Drive@Kmitl",
    category: "programming",
    thumbnail: "",
    heroImage: "",
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
    thumbnail: "",
    heroImage: "",
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
    thumbnail: "",
    heroImage: "",
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
    thumbnail: "",
    heroImage: "",
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
    thumbnail: "",
    heroImage: "",
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
