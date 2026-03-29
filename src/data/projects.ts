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
    slug: "polygon-mesh",
    title: "Multimedia Learning Polygon Mesh",
    category: "uxui",
    thumbnail: "/images/Project/Multimedia Learning Polygon Mesh/44.png",
    heroImage: "/images/Project/Multimedia Learning Polygon Mesh/44.png",
    date: "2025",
    tags: ["Figma", "Interactive Media", "Educational Design", "Game-Based Learning"],
    techStack: ["Figma", "Figma Prototype", "Figma Site", "Pen Tool", "Image Cutter (Plugin)", "Property Randomizer (Plugin)"],
    summary: "โปรเจกต์นี้เป็นสื่อการเรียนรู้ที่พาผู้ใช้เข้าใจตั้งแต่ vertices, edges, faces ไปจนถึงการเกิด polygon mesh และ 3D object representation พร้อมต่อยอดด้วย jigsaw game ที่ให้ผู้เรียนประกอบ face ของโมเดลด้วยตัวเอง",
    problem: "หัวข้อ polygon mesh ยากต่อการจินตนาการจาก text-only หรือ slide แบบนิ่ง จึงจำเป็นต้องมีสื่อที่แสดงลำดับการเกิดรูปทรงอย่างเป็นภาพและมี interaction ช่วยให้ผู้เรียนเชื่อมโยงแนวคิดได้ง่ายขึ้น",
    process: "ออกแบบ home และ topic navigation → แยกเนื้อหา 2D และ 3D พร้อมลูกศร next/back และ dropdown config → ใช้ hover / prototype linking / while hovering เพื่อทำให้เนื้อหามีความเคลื่อนไหว → สร้าง jigsaw game ด้วย Pen Tool, Image Cutter และ Property Randomizer",
    result: "The Solution: สื่อการเรียนรู้ที่ผู้ใช้สามารถเห็นการเปลี่ยนแปลงของ object ทีละส่วน กดสำรวจหัวข้อเชิงลึก และลงมือเล่นผ่าน jigsaw เพื่อ reinforce ความเข้าใจ\nImpact: ช่วยเปลี่ยนเนื้อหาพื้นฐาน 3D modeling ให้เข้าใจง่าย สนุก และจดจำได้ดีขึ้นผ่านการมีส่วนร่วมของผู้เรียน\nChallenges: ทำให้เรื่อง polygon mesh และ 3D object representation ซึ่งค่อนข้าง abstract เข้าใจง่ายขึ้นผ่าน interaction, animation, hover states, draggable pieces และ content flow ที่ผู้เรียนกดสำรวจได้เอง",
    gallery: [
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/2.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/3.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/4.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/5.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/6.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/7.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/8.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/9.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/10.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/12.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/13.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/14.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/15.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/16.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/17.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/18.png",
      "/images/Project/Multimedia Learning Polygon Mesh/FUll galary/19.png",
    ],
  },
  {
    slug: "vps-tycoon",
    title: "VPS-Tycoon",
    category: "programming",
    thumbnail: "/images/Project/VPS-Tycoon/preview and gallery.png",
    heroImage: "/images/Project/VPS-Tycoon/preview and gallery.png",
    date: "2025",
    tags: ["Java", "JavaFX", "OOP", "Game Dev", "GitHub", "Cyberpunk"],
    techStack: ["Java", "JavaFX", "IntelliJ IDEA", "GitHub", "Aseprite", "Canva", "Discord"],
    summary: "ผู้เล่นเริ่มต้นในปี 2000 บริหารบริษัท VPS hosting ด้วยทรัพยากรหลักคือ money และ rating ซื้อ server ติดตั้งบน rack รับ requests จากลูกค้าผ่าน messenger ปรับสเปก VM จัดการเวลา deploy รับมือ event ระหว่างเช่า และอัปเกรด skill 6 ด้านเพื่อขยายกิจการ",
    problem: "การนำหัวข้อเทคนิคอย่าง VPS, rack, virtual machine, network และ security มาทำให้เข้าใจง่ายพอสำหรับผู้เล่นทั่วไปโดยยังคงความลึกของระบบ",
    process: "วาง core concept และ game loop → ออกแบบ data relationship ของ company, requests, rack และ VM → พัฒนาระบบเวลาและ event system → สร้าง UI ธีม cyberpunk พร้อม pixel art",
    phases: [
      {
        title: "Phase 1: Core Concept & Game Loop Design",
        description: "วาง core loop: รับ request → จัดสรร VM → deploy → รับรายได้ → อัปเกรดระบบ ออกแบบ mechanic หลักและ win/lose condition"
      },
      {
        title: "Phase 2: Data Relationship Design",
        description: "ออกแบบความสัมพันธ์ของ company, customer requests, rack configuration และ VM assignments ให้เป็น OOP architecture ที่ยืดหยุ่น"
      },
      {
        title: "Phase 3: Time System & Event System",
        description: "พัฒนาระบบเวลา (30 วินาทีจริง = 1 วันในเกม) และ event system เพื่อสร้างแรงกดดันและ progression ระหว่างการเช่า"
      },
      {
        title: "Phase 4: Cyberpunk UI & Pixel Art Graphics",
        description: "สร้าง UI ธีม cyberpunk ด้วย JavaFX และใช้ pixel art / graphic support เพื่อให้เกมมีเอกลักษณ์ที่จดจำได้"
      }
    ],
    result: "The Solution: เกมจำลองธุรกิจเชิงระบบที่มีทั้งความรู้สึกของ tycoon game และการจัดการ resource เชิงเทคนิค พร้อมระบบ save/load และ event-driven progression\nImpact: ได้ฝึก OOP, game system design, state management, และการทำงานร่วมกันในโปรเจกต์ขนาดทีม\nChallenges: จำลองระบบธุรกิจ VPS ที่มีทรัพยากรหลายชั้นให้เล่นสนุกและเข้าใจง่าย, ออกแบบความสัมพันธ์ระหว่าง rack / VM / requests / skill / events, และทำ UI ธีม cyberpunk ให้เข้ากับเนื้อหาเชิงเทคนิค\nIdeation: เปลี่ยนแนวคิดเรื่อง server management และ VPS hosting ซึ่งดู technical มาก ให้กลายเป็นเกมบริหารธุรกิจที่มีความก้าวหน้า มีการตัดสินใจ และมีระบบอัปเกรดชัดเจน",
    gallery: [
      "/images/Project/VPS-Tycoon/preview and gallery.png",
      "/images/Project/VPS-Tycoon/84.png",
      "/images/Project/VPS-Tycoon/85.png",
      "/images/Project/VPS-Tycoon/86.png",
      "/images/Project/VPS-Tycoon/87.png",
      "/images/Project/VPS-Tycoon/88.png",
      "/images/Project/VPS-Tycoon/89.png",
      "/images/Project/VPS-Tycoon/90.png",
      "/images/Project/VPS-Tycoon/91.png",
      "/images/Project/VPS-Tycoon/92.png",
    ],
  },
  {
    slug: "drive-kmitl",
    title: "Drive@KMITL",
    category: "programming",
    thumbnail: "/images/Project/Drive@KMITL/Preview and gallery1.png",
    heroImage: "/images/Project/Drive@KMITL/Preview and gallery1.png",
    date: "2024",
    tags: ["Next.js", "FastAPI", "WebSocket", "Tailwind CSS", "Full-Stack", "Real-Time"],
    techStack: ["Next.js", "FastAPI (Python)", "WebSockets", "Tailwind CSS", "Figma", "GitHub Desktop"],
    summary: "เว็บไซต์แชทสำหรับพูดคุยกับคนแปลกหน้าแบบสุ่ม โดยเปลี่ยนบรรยากาศตามสถานที่ต่าง ๆ ในมหาวิทยาลัย เสมือนกำลังเดินทางด้วยพาหนะ แบ่งผู้ใช้เป็น Driver และ Passenger มีระบบสร้างห้อง สุ่มเข้าห้อง จำกัดจำนวนคนตามประเภทรถ countdown ก่อนย้ายห้อง พื้นหลังวิดีโอแต่ละสถานที่ และบรรยากาศที่เปลี่ยนไปตาม room type",
    problem: "ผู้ใช้หลายคนอยากมีพื้นที่ปลอดภัยสำหรับคุยกับคนไม่รู้จักโดยไม่ถูกตัดสิน แต่แพลตฟอร์มทั่วไปไม่ได้ออกแบบประสบการณ์ random chat แบบมีธีมและ room transition ชัดเจน",
    process: "ออกแบบ flow หน้าหลัก, join room, create room และ chat room ใน Figma → พัฒนา backend API และ WebSocket communication ระหว่าง frontend กับ backend → สร้างระบบ create room, random join, role-based access และ room type restrictions → ปรับปรุง room status, user count, room transitions และหน้าเว็บให้สมบูรณ์ขึ้น",
    phases: [
      {
        title: "Phase 1: UI/UX Flow Design",
        description: "ออกแบบ flow ใน Figma ครอบคลุมหน้าหลัก, การตั้ง username, เลือก role, join/create room และ chat room interface"
      },
      {
        title: "Phase 2: FastAPI Backend & WebSocket",
        description: "พัฒนา backend API ด้วย FastAPI และระบบ real-time communication ผ่าน WebSocket เชื่อมระหว่าง Next.js frontend กับ Python backend"
      },
      {
        title: "Phase 3: Room System & Role Logic",
        description: "สร้างระบบ create room, random join, role-based access (Driver/Passenger) และ room type restrictions พร้อม capacity control ตามประเภทพาหนะ"
      },
      {
        title: "Phase 4: Room Status, Transitions & Polish",
        description: "เพิ่ม live room status, user count tracking, countdown timer, auto remove empty rooms และ location-based video backgrounds"
      }
    ],
    result: "The Solution: แพลตฟอร์ม random chat ที่ผสมแนวคิด journey experience เข้ากับ real-time web app ทำให้การคุยกับคนแปลกหน้ามีทั้งบริบทและความแปลกใหม่\nImpact: ได้ฝึก full-stack collaboration, real-time system design, และการแก้ปัญหา WebSocket / CORS / room transition ในโปรเจกต์จริง\nLimitations: เกมย่อยในแต่ละห้องยังไม่สมบูรณ์ และจำนวนห้อง/การย้อนกลับห้องเก่ายังมีข้อจำกัดจากระบบย้ายห้อง\nChallenges: ทำระบบ real-time communication ให้เปลี่ยนห้องอัตโนมัติได้โดยไม่หลุด connection, เชื่อม Backend กับ Frontend ให้เสถียร, และจัดการ room lifecycle เมื่อมีผู้ใช้เข้าออกหลายบทบาท",
    gallery: [
      "/images/Project/Drive@KMITL/Preview and gallery1.png",
      "/images/Project/Drive@KMITL/gallery2.png",
      "/images/Project/Drive@KMITL/gallery3.png",
      "/images/Project/Drive@KMITL/gallery4.png",
      "/images/Project/Drive@KMITL/gallery5.png",
    ],
  },
  {
    slug: "synchro",
    title: "Synchro",
    category: "programming",
    thumbnail: "/images/Project/Synchro/preview_and_gallery.png",
    heroImage: "/images/Project/Synchro/preview_and_gallery.png",
    date: "2025",
    tags: ["ESP32", "Arduino", "JavaScript", "Physical Computing", "Rhythm Game", "Web Integration"],
    techStack: ["ESP32", "Arduino IDE", "JavaScript", "HTML/CSS", "WiFi.h", "WebServer", "TFT_eSPI", "SD.h", "Figma"],
    summary: "โปรเจกต์ที่ผสม hardware และ software เข้าด้วยกัน โดยมีคอนโทรลเลอร์ที่ประกอบด้วยจอ TFT LCD และปุ่มกด เชื่อมต่อกับเว็บแอปพลิเคชันสำหรับเลือกเพลง สรุปสถิติการเล่น และฝึกสมาธิผ่าน rhythm game ที่สนุกพอให้กลับมาใช้งานต่อเนื่อง",
    problem: "ผู้ใช้หลายคนมีอาการหลุดโฟกัสจาก social media จนส่งผลต่อการเรียนและการทำงาน แต่เครื่องมือฝึกสมาธิมักไม่น่าสนใจพอให้ใช้งานต่อเนื่อง",
    process: "วางแผนอุปกรณ์ → ออกแบบ UI/CI ด้วย Figma → พัฒนา Frontend → ต่อวงจร Hardware (LCD, ESP32, Buttons) → เขียนโปรแกรมควบคุมเกม → สร้างเครื่องมือ Mapping เพลงแบบ JSON → เชื่อมต่อ Web Server เพื่อสรุปผลคะแนน",
    phases: [
      {
        title: "Step 1: Planning & UI/CI Design",
        description: "วางแผนอุปกรณ์และออกแบบ UI/CI ด้วย Figma ครอบคลุมหน้าเลือกเพลง, สรุปผล และ history"
      },
      {
        title: "Step 2: Frontend Development",
        description: "พัฒนาเว็บแอปด้วย JavaScript/HTML/CSS รองรับการเลือกเพลง, ดูสถิติ และ upload song mapping"
      },
      {
        title: "Step 3: Hardware Wiring",
        description: "ต่อวงจร ESP32 เชื่อมกับ TFT LCD display และปุ่มกดบน breadboard พร้อมแก้ปัญหาการจ่ายไฟ"
      },
      {
        title: "Step 4: Game Control Programming",
        description: "เขียนโปรแกรม Arduino ควบคุม rhythm game logic, การแสดงผลบน LCD และการรับ input จากปุ่ม"
      },
      {
        title: "Step 5: Song Mapping Tool",
        description: "สร้าง tool สำหรับ map note เพลงเป็น JSON ให้ผู้ใช้เพิ่มเพลงใหม่ได้เอง"
      },
      {
        title: "Step 6: Web Server Integration",
        description: "เชื่อมต่อ ESP32 Web Server กับหน้าเว็บเพื่อส่งผลคะแนนกลับมาสรุปและดู history"
      }
    ],
    result: "The Solution: อุปกรณ์ฝึกสมาธิในรูปแบบ rhythm game ที่สนุกพอให้ผู้ใช้กลับมาฝึกต่อเนื่องและเห็นพัฒนาการได้จากสถิติการเล่น\nImpact: ได้ฝึกทั้ง embedded, web integration และ product thinking ในโปรเจกต์เดียว สร้างประสบการณ์ทำงานกับ hardware จริงและการ sync ข้อมูลระหว่าง physical device กับ web app\nChallenges: การเปลี่ยนบอร์ดจาก Arduino UNO R4 เป็น ESP32 เนื่องจากข้อจำกัดด้าน library, ปัญหาการจ่ายไฟของ breadboard, การปรับ SD card adapter และการทำ handshaking ให้เว็บสื่อสารกับบอร์ดได้เสถียร\nIdeation: ใช้กลไก rhythm game เพื่อฝึก focused attention และช่วยลดผลกระทบจากการเสพโซเชียลมีเดียมากเกินไป",
    gallery: [
      "/images/Project/Synchro/synchrobox.jpg",
      "/images/Project/Synchro/SYNCHROPoster.png",
      "/images/Project/Synchro/Preview and gallery.png",
      "/images/Project/Synchro/preview_and_gallery.png",
    ],
  },
  {
    slug: "detect-cheat",
    title: "สืบ-ล่า-โกง (DETEC-CHEAT)",
    category: "game",
    thumbnail: "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/previewDetectcheat.png",
    heroImage: "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/previewDetectcheat.png",
    date: "2022",
    tags: ["Unity", "Illustrator", "NSC 24"],
    techStack: ["Unity", "Adobe Illustrator", "Adobe Photoshop", "Procreate"],
    summary: "โปรแกรมส่งเสริมทักษะการเรียนรู้เรื่อง พ.ร.บ. คอมพิวเตอร์ ปี 60 และกฎหมายการฉ้อโกงในรูปแบบเกม Chat Visual Novel 2D",
    problem: "สื่อการเรียนรู้กฎหมายมักมีความน่าเบื่อ ทำให้เยาวชนไม่สนใจศึกษาจนตกเป็นเหยื่อของมิจฉาชีพ",
    process: "ค้นคว้าข้อมูลกฎหมาย -> ออกแบบตัวละคร -> พัฒนาระบบแชทสืบคดี -> ทดสอบและประเมินผล",
    result: "The Solution: เกม Interactive ที่ผู้เล่นต้องเลือกรวบรวมหลักฐานให้ครบเพื่อจับกุมมิจฉาชีพ\nImpact: กลุ่มตัวอย่างมีความรู้ความเข้าใจด้านกฎหมายเพิ่มขึ้นและมีความพึงพอใจในระดับมากที่สุด",
    gallery: [
      "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/previewDetectcheat.png",
      "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/19.png",
      "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/21.png",
      "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/23.png",
      "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/25.png",
      "/images/Project/%E0%B8%AA%E0%B8%B7%E0%B8%9A-%E0%B8%A5%E0%B9%88%E0%B8%B2-%E0%B9%82%E0%B8%81%E0%B8%87%20(DETEC-CHEAT)/26.png",
    ],
  },
  {
    slug: "criminal-mind",
    title: "ห้วงลึกภายในจิตใจ (Criminal Minds)",
    category: "game",
    thumbnail: "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/preview%20and%20galletry.png",
    heroImage: "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/preview%20and%20galletry.png",
    date: "2023",
    tags: ["Unity", "Procreate", "NSC 25"],
    techStack: ["Unity", "Procreate"],
    summary: "โปรแกรมสวมบทบาทการทำงานของตำรวจพิสูจน์หลักฐานและสืบสวน เพื่อสอบสวนหาความจริงโดยยึดหลักนิติธรรมและความเป็นธรรมแก่ผู้ต้องหา",
    problem: "ปัญหามิจฉาทิฐิหรือการปฏิบัติที่ไม่เหมาะสมของเจ้าหน้าที่ต่อผู้ต้องหาในชีวิตจริง",
    process: "เขียนบทคดีธุรกิจ -> ออกแบบตัวละคร 2D -> พัฒนามินิเกม (ตรวจรอยนิ้วมือ, ตรวจเลือด) -> สรุปคดี",
    result: "The Solution: สร้างเกมที่จำลองสถานการณ์ความกดดันในการทำคดี แต่เน้นให้ผู้เล่นยึดหลักจริยธรรม\nImpact: สร้างแรงบันดาลใจและให้ความรู้เกี่ยวกับการทำงานที่ถูกต้องในสายงานตำรวจแก่เยาวชน",
    gallery: [
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/preview%20and%20galletry.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/27.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/30.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/32.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/34.png",
    ],
  }
];
