// Activities data — Thanatpat Promthong

export type ActivityType = "camp" | "workshop" | "hackathon" | "training" | "volunteer" | "work";

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  date: string;
  description: string;
  organizer: string;
  image?: string;
  imagePosition?: string;
  gradient: string;
  featured?: boolean;
}

export const activities: Activity[] = [
  // ── Camps ────────────────────────────────────────────────
  {
    id: "itcamp22",
    name: "ITCAMP 22 | The Auspicious Jamboree",
    type: "camp",
    date: "29 เม.ย. – 2 พ.ค. 2569",
    description: "เข้าร่วม ITCAMP ครั้งที่ 22 ในธีม The Auspicious Jamboree ค่ายพัฒนาทักษะด้าน IT สำหรับนักศึกษาคณะ IT สจล. พร้อมทำกิจกรรมและ workshop ร่วมกับรุ่นพี่และเพื่อนนักศึกษา",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/ITCAMP 22 The Auspicious Jamboree.jpg",
    gradient: "from-retro-yellow/40 to-sunset-gold/30",
    featured: true,
  },
  {
    id: "itcamp21",
    name: "ITCAMP 21 | The Glacial Horizon",
    type: "camp",
    date: "28 เม.ย. – 1 พ.ค. 2568",
    description: "เข้าร่วม ITCAMP ครั้งที่ 21 ในธีม The Glacial Horizon ค่าย IT 4 วัน 3 คืน ฝึกทักษะการทำงานเป็นทีม การออกแบบ และพัฒนาโปรเจกต์เทคโนโลยีภายใต้การดูแลของรุ่นพี่",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/ITCAMP 21 The Glacial Horizon.jpg",
    gradient: "from-mint/40 to-sky-cyan/30",
    featured: true,
  },
  {
    id: "tobelt68",
    name: "TobelT'68 | The Golden Mist",
    type: "camp",
    date: "9, 10, 16, 17 พฤศจิกายน 2567",
    description: "เข้าร่วมกิจกรรม TobelT'68 งานรับน้องใหม่คณะ IT สจล. ในธีม The Golden Mist จัดขึ้น 4 วัน เพื่อสร้างความสัมพันธ์และปรับตัวเข้าสู่ชีวิตมหาวิทยาลัยร่วมกับเพื่อนนักศึกษาปีหนึ่ง",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/TobelT68 The Golden Mist.jpg",
    gradient: "from-sunset-gold/40 to-peach/30",
    featured: true,
  },
  {
    id: "altv-camp",
    name: "รายการภารกิจพิชิตฝัน ALTV",
    type: "camp",
    date: "2566",
    description: "เข้าร่วมรายการภารกิจพิชิตฝัน ออกอากาศทาง ALTV ร่วมทำกิจกรรม workshop ด้านการออกแบบและเทคโนโลยีกับ Daydev ณ มหาวิทยาลัย DPU",
    organizer: "DPU University & Daydev",
    image: "/images/ACTIVITIES/รายการภารกิตพิชิตฝัน ALTV.png",
    gradient: "from-electric-blue/35 to-lavender/30",
  },

  // ── Workshops ─────────────────────────────────────────────
  {
    id: "openhouse2025",
    name: "IT Openhouse 2025 — Roblox Journey Workshop",
    type: "workshop",
    date: "28-29 พ.ย. 2568",
    description: "รับหน้าที่ Project Head ของโปรแกรม Roblox Training ในงาน IT Openhouse 2025 ออกแบบหลักสูตร คัดเลือก TA/TD และนำทีมจัดสอน workshop แบบ hands-on ให้กับนักเรียนที่สนใจด้านเกมและการเขียนโค้ด",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/IT Openhouse 2025 — Roblox Journey Workshop.jpg",
    gradient: "from-sky-cyan/40 to-lavender/30",
    featured: true,
  },
  {
    id: "game-biz-workshop",
    name: "Game Business Workshop : เล่น..ให้เป็นเรื่อง (ธุรกิจ)",
    type: "workshop",
    date: "6, 13, 20, 21 ธ.ค. 2568",
    description: "เข้าร่วม workshop 4 วัน ในหัวข้อการนำเกมมาประยุกต์ใช้กับธุรกิจจริง เรียนรู้แนวคิด gamification, game design สำหรับองค์กร และฝึกออกแบบ game mechanic ที่ตอบโจทย์ธุรกิจ",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/Game Business Workshop  เล่น..ให้เป็นเรื่อง (ธุรกิจ).jpg",
    gradient: "from-neon-magenta/30 to-deep-purple/25",
  },
  {
    id: "line-dev-workshop",
    name: "LINE Developers University Workshop 2025",
    type: "workshop",
    date: "20 กันยายน 2568",
    description: "เข้าร่วม workshop พัฒนา LINE Chatbot ด้วย Dialogflow โดยทีม LINE Developers Thailand เรียนรู้การสร้าง conversational AI เชื่อมต่อกับ LINE Messaging API แบบลงมือทำจริง",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/LINE Developers University Workshop 2025.jpg",
    gradient: "from-mint/35 to-electric-blue/25",
  },

  // ── Training / TA ─────────────────────────────────────────
  {
    id: "java-ta",
    name: "Java OOP Teaching Assistant",
    type: "training",
    date: "28 พ.ย. 68 – 13 มี.ค. 69",
    description: "ทำหน้าที่ Teaching Assistant วิชา Object-Oriented Programming ด้วย Java ช่วยอาจารย์ตรวจ lab ตั้งคำถามเชิงแนวคิด และช่วยนักศึกษาทำความเข้าใจหลักการ OOP ในชั้นเรียน",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/Java OOP Teaching Assistant.jpeg",
    gradient: "from-retro-yellow/30 to-mint/20",
  },

  // ── Volunteer ─────────────────────────────────────────────
  {
    id: "itgg2024",
    name: "Infotech GateGame ITGG 2024",
    type: "volunteer",
    date: "25 ก.ค. – 9 ส.ค. 2567",
    description: "เป็นอาสาสมัครในงาน Infotech GateGame 2024 กิจกรรมรับน้องผ่านเกมและกิจกรรมสันทนาการของคณะ IT สจล. ช่วยดูแลฐานกิจกรรมและประสานงานในงาน",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/Infotech GateGame ITGG 2024.jpg",
    gradient: "from-sakura-pink/35 to-hot-pink/25",
  },
  {
    id: "openhouse2024",
    name: "IT Ladkrabang Open House 2024",
    type: "volunteer",
    date: "13-14 ธันวาคม 2567",
    description: "เป็นอาสาสมัครในงาน Open House คณะ IT สจล. ช่วยแนะนำคณะและหลักสูตรให้นักเรียนมัธยมที่สนใจเข้าศึกษาต่อ ดูแลบูธและพาชมสิ่งอำนวยความสะดวกภายในคณะ",
    organizer: "School of Information Technology, KMITL",
    image: "/images/ACTIVITIES/IT Ladkrabang Open House 2024.jpg",
    gradient: "from-lavender/35 to-sky-cyan/25",
  },
  {
    id: "kmitl-openhouse2025",
    name: "KMITL Open House 2024 — Dek-D's TCAS Fair",
    type: "volunteer",
    date: "27-28 เมษายน 2568",
    description: "เป็นอาสาสมัครประจำบูธคณะ IT สจล. ในงาน KMITL Open House ร่วมกับ Dek-D's TCAS Fair ให้ข้อมูลหลักสูตร รับฟังคำถาม และแนะแนวทางการเข้าศึกษาให้กับนักเรียนและผู้ปกครอง",
    organizer: "ไบเทค บางนา",
    image: "/images/ACTIVITIES/KMITL Open House 2024 Dek-D's TCAS Fair.jpg",
    gradient: "from-sky-cyan/35 to-mint/25",
  },

  // ── Work ──────────────────────────────────────────────────
  {
    id: "login-tutor",
    name: "IT & Math Tutor — Login Learning",
    type: "work",
    date: "กันยายน 68 – มีนาคม 69",
    description: "สอน Godot game engine และคณิตศาสตร์ให้กับนักเรียนมัธยมต้น-ปลาย ดูแลทีมแข่งขันที่ต้องการสร้าง portfolio สมัครมหาวิทยาลัย และแนะแนวด้านเทคโนโลยีสำหรับการเรียนต่อ",
    organizer: "Login Learning",
    image: "/images/ACTIVITIES/IT & Math Tutor Login learning.jpg",
    gradient: "from-sakura-pink/30 to-lavender/25",
  },
  {
    id: "code-genius-tutor",
    name: "Coding Tutor — Code Genius",
    type: "work",
    date: "กุมภาพันธ์ 69 – ปัจจุบัน",
    description: "สอนทักษะคอมพิวเตอร์เบื้องต้นให้กับนักเรียนระดับประถมในรูปแบบ group class ทั้งภาษาไทยและอังกฤษ ครอบคลุม Scratch, Python และ Microbit",
    organizer: "Code Genius Emquartier",
    image: "/images/ACTIVITIES/Coding Tutor — code genius.jpg",
    gradient: "from-electric-blue/30 to-mint/25",
  },
  {
    id: "phoenix-bibf2025",
    name: "Phoenix Next — Bangkok International Book Fair 2025",
    type: "work",
    date: "27 มี.ค. – 7 เม.ย. 2025",
    description: "ทำงานเป็น staff ประจำบูธ Phoenix Next ในงาน Bangkok International Book Fair 2025 ดูแลการจัดวางหนังสือ รับชำระเงิน และช่วยเก็บบูธหลังจบงาน",
    organizer: "Queen Sirikit National Convention Center",
    image: "/images/ACTIVITIES/Phoenix Next Bangkok International Book Fair 2025  Staff.jpg",
    imagePosition: "center 15%",
    gradient: "from-sunset-gold/30 to-peach/25",
  },
  {
    id: "phoenix-bookfair2025",
    name: "งานมหกรรมหนังสือระดับชาติ ครั้งที่ 30 2025",
    type: "work",
    date: "9-19 ตุลาคม 2025",
    description: "ทำงานเป็น staff ประจำบูธ Phoenix Next ในงานมหกรรมหนังสือระดับชาติ ครั้งที่ 30 ดูแลการจัดวางสินค้า รับชำระเงิน และให้บริการลูกค้าตลอดระยะเวลาการจัดงาน",
    organizer: "Queen Sirikit National Convention Center",
    image: "/images/ACTIVITIES/Phoenix Next Book งานมหกรรมหนังสือระดับชาติ ครั้งที่ 30 2025.jpg",
    imagePosition: "center 10%",
    gradient: "from-peach/30 to-retro-yellow/20",
  },
  {
    id: "luckpim-bookfair",
    name: "Luckpim Book Fair Staff",
    type: "work",
    date: "28 มี.ค. – 8 เม.ย. 2024",
    description: "ทำงานเป็น staff ประจำบูธ Luckpim ในงาน Book Fair ดูแลการจัดวางหนังสือ รับชำระเงิน ให้คำแนะนำกับลูกค้า และช่วยเก็บบูธเมื่อสิ้นสุดงาน",
    organizer: "Queen Sirikit National Convention Center",
    image: "/images/ACTIVITIES/Luckpim Book Fair Staff.jpg",
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
