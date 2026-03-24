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
    thumbnail: "/images/Project/Chaodom/Preview.chaodom.png",
    heroImage: "/images/Project/Chaodom/Preview.chaodom.png",
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
      "/images/Project/Chaodom/Visual principle/1.png",
      "/images/Project/Chaodom/Visual principle/2.png",
      "/images/Project/Chaodom/Visual principle/3.png",
      "/images/Project/Chaodom/Visual principle/4.png",
      "/images/Project/Chaodom/Visual principle/5.png",
      "/images/Project/Chaodom/Visual principle/6.png",
      "/images/Project/Chaodom/Visual principle/7.png",
      "/images/Project/Chaodom/Visual principle/8.png",
      "/images/Project/Chaodom/Visual principle/9.png",
      "/images/Project/Chaodom/Visual principle/10.png",
      "/images/Project/Chaodom/Visual principle/11.png",
      "/images/Project/Chaodom/Visual principle/12.png",
      "/images/Project/Chaodom/Visual principle/13.png",
      "/images/Project/Chaodom/Visual principle/14.png",
      "/images/Project/Chaodom/Visual principle/15.png",
      "/images/Project/Chaodom/Visual principle/16.png",
      "/images/Project/Chaodom/Visual principle/17.png",
      "/images/Project/Chaodom/Visual principle/18.png"
    ],
  },
  {
    slug: "vps-tycoon",
    title: "VPS-Tycoon",
    category: "programming",
    thumbnail: "/images/Project/vps-tycoon/1.png",
    heroImage: "/images/Project/vps-tycoon/1.png",
    date: "2025",
    tags: ["Java", "JavaFX", "OOP", "Game Dev", "GitHub"],
    techStack: ["Java", "JavaFX", "GitHub", "Aseprite", "Canva"],
    summary: "เกมจำลองธุรกิจเช่าเซิร์ฟเวอร์ VPS Hosting ผู้เล่นสวมบทบาทเจ้าของบริษัท จัดการ VM แก้ปัญหาเทคนิคผ่านมินิเกม พัฒนาด้วย Java/JavaFX สถาปัตยกรรม OOP ทีม 11 คน 1 ภาคเรียน",
    problem: "การจำลองระบบธุรกิจซับซ้อน (จัดสรร CPU, RAM, Storage, ลูกค้า, เรตติ้ง) ให้เป็นเกมที่เข้าใจง่าย นำหลักการ OOP มาประยุกต์ในโครงสร้างซับซ้อน",
    process: "การพัฒนาเกม VPS-Tycoon แบ่งออกเป็น 5 เฟส โดยเริ่มจากการศึกษาเทคโนโลยีไปจนถึงการพัฒนา UI และระบบบันทึกเกม",
    phases: [
      {
        title: "Phase 1: ศึกษา Java + JavaFX",
        description: "ศึกษาโครงสร้างและแนวคิดสถาปัตยกรรม"
      },
      {
        title: "Phase 2: ออกแบบ Class Diagram",
        description: "ออกแบบระบบ (Server, Customer, Game Economy)"
      },
      {
        title: "Phase 3: พัฒนา Game Loop + ระบบจัดการทรัพยากร",
        description: "พัฒนาระบบหลังบ้านในการจัดสรรทรัพยากรผู้ให้บริการ"
      },
      {
        title: "Phase 4: สร้างมินิเกม",
        description: "สร้างมินิเกม Firewall Defense, File Recovery, Task System"
      },
      {
        title: "Phase 5: ออกแบบ UI Cyberpunk + ระบบ Save/Load",
        description: "ปรับกราฟิกสไตล์ Cyberpunk และการเซฟเกม"
      }
    ],
    result: "The Solution: เกม OOP ยืดหยุ่น เริ่มปี 2000 จัดการเงิน+เรตติ้ง Messenger ลูกค้า อัปเกรด Network/Security/Marketing กราฟิก Cyberpunk\nImpact: พัฒนา Java ขั้นสูง ทำงานเป็นทีม 11 คน\nChallenges: จัดการโครงสร้างข้อมูล/อัลกอริทึมซับซ้อนเพื่อจัดสรรทรัพยากรแม่นยำ",
    gallery: [
      "/images/Project/vps-tycoon/1.png",
      "/images/Project/vps-tycoon/2.png",
      "/images/Project/vps-tycoon/3.png",
      "/images/Project/vps-tycoon/4.png"
    ],
  },
  {
    slug: "drive-kmitl",
    title: "DriveChat@KMITL",
    category: "programming",
    thumbnail: "",
    heroImage: "",
    date: "2024",
    tags: ["Next.js", "FastAPI", "WebSocket", "Tailwind"],
    techStack: ["Next.js", "FastAPI (Python)", "WebSockets", "Tailwind CSS"],
    summary: "เว็บไซต์แชทสำหรับพูดคุยกับคนแปลกหน้าแบบสุ่ม โดยเปลี่ยนบรรยากาศตามสถานที่ต่าง ๆ ในมหาวิทยาลัยเสมือนการเดินทางด้วยพาหนะ",
    problem: "ผู้คนส่วนใหญ่มีความเครียดสะสมและต้องการพื้นที่ระบายความในใจกับคนที่ไม่รู้จักเพื่อความสบายใจ",
    process: "ออกแบบ UI ใน Figma -> พัฒนา Backend API ด้วย FastAPI -> เชื่อมต่อ WebSocket -> พัฒนา Frontend ด้วย Next.js",
    result: "The Solution: เว็บไซต์ที่รองรับการแชทหลายประเภท (Bicycle, Taxi, Songthaew) พร้อมพื้นหลังวิดีโอสถานที่จริงในมหาลัย\nImpact: สร้างสังคมออนไลน์ที่ปลอดภัยสำหรับการพูดคุยและช่วยลดความเครียดให้กับนักศึกษา",
    gallery: [
      "/images/Project/drive-kmitl/1.png",
      "/images/Project/drive-kmitl/2.png",
      "/images/Project/drive-kmitl/3.png",
      "/images/Project/drive-kmitl/4.png"
    ],
  },
  {
    slug: "synchro",
    title: "Synchro",
    category: "programming",
    thumbnail: "/synchrobox.jpg",
    heroImage: "/SYNCHROPoster.png",
    date: "2025",
    tags: ["ESP32", "Arduino", "JavaScript", "Physical Computing"],
    techStack: ["ESP32", "Arduino IDE", "JavaScript", "HTML/CSS", "WiFi.h", "WebServer", "TFT_eSPI", "SD.h"],
    summary: "ระบบเกมจังหวะที่ทำงานบนบอร์ด ESP32 เชื่อมต่อกับเว็บไซต์ เพื่อใช้เป็นสื่อฝึกสมาธิ ลดอาการหลุดโฟกัส และช่วยดึงผู้ใช้งานให้กลับมาจดจ่อกับกิจกรรมตรงหน้า (Deep Work) ผ่านเสียงดนตรีและการตอบสนองที่แม่นยำ",
    problem: "ปัญหาการขาดสมาธิและหลุดโฟกัสจากการเรียนหรือกิจกรรมหลักเนื่องจากการเสพสื่อสังคมออนไลน์มากเกินไป ซึ่งส่งผลต่อสุขภาพจิตและประสิทธิภาพการทำงานในระยะยาว",
    process: "วางแผนอุปกรณ์ -> ออกแบบ UI/CI ด้วย Figma -> พัฒนา Frontend -> ต่อวงจร Hardware (LCD, ESP32, Buttons) -> เขียนโปรแกรมควบคุมเกม -> สร้างเครื่องมือ Mapping เพลงแบบ JSON -> เชื่อมต่อ Web Server เพื่อสรุปผลคะแนน",
    result: "The Solution: พัฒนาอุปกรณ์ฝึกสมาธิในรูปแบบเกมจังหวะที่ผู้ใช้สามารถอัปโหลดเพลงผ่านหน้าเว็บ สร้างแมปโน้ตได้เอง และดูประวัติการเล่น (History) เพื่อติดตามพัฒนาการการจดจ่อของตนเองได้\nImpact: ช่วยให้นักเรียนนักศึกษามีเครื่องมือในการฝึกฝนการจดจ่อที่สนุกสนาน และสามารถถ่ายทอดทักษะการโฟกัสไปใช้กับการเรียนหรือการทำงานจริงได้ดีขึ้น",
    gallery: [
      "/synchrobox.jpg",
      "/SYNCHROPoster.png",
      "/SynchroController/Teacher.png"
    ],
  },
  {
    slug: "polygon-mesh",
    title: "Multimedia Learning Polygon Mesh",
    category: "uxui",
    thumbnail: "/images/Project/preview-polygon-mesh.png",
    heroImage: "/images/Project/preview-polygon-mesh.png",
    date: "2025",
    tags: ["Figma", "Interactive Media", "Educational Design", "Game-Based Learning"],
    techStack: ["Figma", "Figma Prototype", "Figma Site", "Pen Tool", "Image Cutter (Plugin)", "Property Randomizer (Plugin)"],
    summary: "โปรเจกต์นี้เป็นสื่อการเรียนรู้ที่พาผู้ใช้เข้าใจตั้งแต่ vertices, edges, faces ไปจนถึงการเกิด polygon mesh และ 3D object representation พร้อมต่อยอดด้วย jigsaw game ที่ให้ผู้เรียนประกอบ face ของโมเดลด้วยตัวเอง",
    problem: "หัวข้อ polygon mesh ยากต่อการจินตนาการจาก text-only หรือ slide แบบนิ่ง จึงจำเป็นต้องมีสื่อที่แสดงลำดับการเกิดรูปทรงอย่างเป็นภาพและมี interaction ช่วยให้ผู้เรียนเชื่อมโยงแนวคิดได้ง่ายขึ้น",
    process: "ออกแบบ home และ topic navigation → แยกเนื้อหา 2D และ 3D พร้อมลูกศร next/back และ dropdown config → ใช้ hover / prototype linking / while hovering เพื่อทำให้เนื้อหามีความเคลื่อนไหว → สร้าง jigsaw game ด้วย Pen Tool, Image Cutter และ Property Randomizer",
    result: "The Solution: สื่อการเรียนรู้ที่ผู้ใช้สามารถเห็นการเปลี่ยนแปลงของ object ทีละส่วน กดสำรวจหัวข้อเชิงลึก และลงมือเล่นผ่าน jigsaw เพื่อ reinforce ความเข้าใจ\nImpact: ช่วยเปลี่ยนเนื้อหาพื้นฐาน 3D modeling ให้เข้าใจง่าย สนุก และจดจำได้ดีขึ้นผ่านการมีส่วนร่วมของผู้เรียน\nChallenges: ทำให้เรื่อง polygon mesh และ 3D object representation ซึ่งค่อนข้าง abstract เข้าใจง่ายขึ้นผ่าน interaction, animation, hover states, draggable pieces และ content flow ที่ผู้เรียนกดสำรวจได้เอง",
    gallery: [
      "/images/Project/polygon-home.png",
      "/images/Project/polygon-2d.png",
      "/images/Project/polygon-2d-process.png",
      "/images/Project/polygon-2d-config.png",
      "/images/Project/polygon-3d.png",
      "/images/Project/polygon-3d-process.png",
      "/images/Project/polygon-3d-config.png",
      "/images/Project/polygon-study.png",
      "/images/Project/polygon-3d-object.png",
      "/images/Project/polygon-finalizing.png",
      "/images/Project/polygon-creating-mesh.png",
      "/images/Project/polygon-jigsaw-menu.png",
      "/images/Project/polygon-jigsaw-game.png",
    ],
  },
  {
    slug: "detect-cheat",
    title: "สืบ-ล่า-โกง (DETEC-CHEAT)",
    category: "programming",
    thumbnail: "",
    heroImage: "",
    date: "2022",
    tags: ["Unity", "Illustrator", "NSC 24"],
    techStack: ["Unity", "Adobe Illustrator", "Adobe Photoshop", "Procreate"],
    summary: "โปรแกรมส่งเสริมทักษะการเรียนรู้เรื่อง พ.ร.บ. คอมพิวเตอร์ ปี 60 และกฎหมายการฉ้อโกงในรูปแบบเกม Chat Visual Novel 2D",
    problem: "สื่อการเรียนรู้กฎหมายมักมีความน่าเบื่อ ทำให้เยาวชนไม่สนใจศึกษาจนตกเป็นเหยื่อของมิจฉาชีพ",
    process: "ค้นคว้าข้อมูลกฎหมาย -> ออกแบบตัวละคร -> พัฒนาระบบแชทสืบคดี -> ทดสอบและประเมินผล",
    result: "The Solution: เกม Interactive ที่ผู้เล่นต้องเลือกรวบรวมหลักฐานให้ครบเพื่อจับกุมมิจฉาชีพ\nImpact: กลุ่มตัวอย่างมีความรู้ความเข้าใจด้านกฎหมายเพิ่มขึ้นและมีความพึงพอใจในระดับมากที่สุด",
    gallery: [],
  },
  {
    slug: "criminal-mind",
    title: "ห้วงลึกภายในจิตใจ (Criminal Minds)",
    category: "programming",
    thumbnail: "",
    heroImage: "",
    date: "2023",
    tags: ["Unity", "Procreate", "NSC 25"],
    techStack: ["Unity", "Procreate"],
    summary: "โปรแกรมสวมบทบาทการทำงานของตำรวจพิสูจน์หลักฐานและสืบสวน เพื่อสอบสวนหาความจริงโดยยึดหลักนิติธรรมและความเป็นธรรมแก่ผู้ต้องหา",
    problem: "ปัญหามิจฉาทิฐิหรือการปฏิบัติที่ไม่เหมาะสมของเจ้าหน้าที่ต่อผู้ต้องหาในชีวิตจริง",
    process: "เขียนบทคดีธุรกิจ -> ออกแบบตัวละคร 2D -> พัฒนามินิเกม (ตรวจรอยนิ้วมือ, ตรวจเลือด) -> สรุปคดี",
    result: "The Solution: สร้างเกมที่จำลองสถานการณ์ความกดดันในการทำคดี แต่เน้นให้ผู้เล่นยึดหลักจริยธรรม\nImpact: สร้างแรงบันดาลใจและให้ความรู้เกี่ยวกับการทำงานที่ถูกต้องในสายงานตำรวจแก่เยาวชน",
    gallery: [],
  }
];
