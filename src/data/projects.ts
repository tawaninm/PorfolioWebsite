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
    thumbnail: "/images/Project/VPS-Tycoon/preview-gallery.png",
    heroImage: "/images/Project/VPS-Tycoon/preview-gallery.png",
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
      "/images/Project/VPS-Tycoon/preview-gallery.png",
      "/images/Project/VPS-Tycoon/58.png",
      "/images/Project/VPS-Tycoon/59.png",
      "/images/Project/VPS-Tycoon/61.png",
      "/images/Project/VPS-Tycoon/62.png",
      "/images/Project/VPS-Tycoon/63.png",
      "/images/Project/VPS-Tycoon/64.png",
      "/images/Project/VPS-Tycoon/65.png",
      "/images/Project/VPS-Tycoon/66.png",
      "/images/Project/VPS-Tycoon/67.png",
      "/images/Project/VPS-Tycoon/69.png",
      "/images/Project/VPS-Tycoon/70.png",
      "/images/Project/VPS-Tycoon/71.png",
      "/images/Project/VPS-Tycoon/72.png",
      "/images/Project/VPS-Tycoon/73.png",
      "/images/Project/VPS-Tycoon/74.png",
      "/images/Project/VPS-Tycoon/75.png",
      "/images/Project/VPS-Tycoon/76.png",
      "/images/Project/VPS-Tycoon/77.png",
      "/images/Project/VPS-Tycoon/78.png",
      "/images/Project/VPS-Tycoon/79.png",
      "/images/Project/VPS-Tycoon/80.png",
      "/images/Project/VPS-Tycoon/81.png",
    ],
  },
  {
    slug: "drive-kmitl",
    title: "Drive@KMITL",
    category: "programming",
    thumbnail: "/images/Project/Drive@KMITL/preview-gallery.png",
    heroImage: "/images/Project/Drive@KMITL/preview-gallery.png",
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
      "/images/Project/Drive@KMITL/preview-gallery.png",
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
    thumbnail: "/images/Project/Synchro/preview-gallery.png",
    heroImage: "/images/Project/Synchro/preview-gallery.png",
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
      "/images/Project/Synchro/preview-gallery.png",
      "/images/Project/Synchro/SYNCHROPoster.png",
      "/images/Project/Synchro/84.png",
      "/images/Project/Synchro/85.png",
      "/images/Project/Synchro/86.png",
      "/images/Project/Synchro/87.png",
      "/images/Project/Synchro/88.png",
      "/images/Project/Synchro/89.png",
      "/images/Project/Synchro/90.png",
      "/images/Project/Synchro/91.png",
      "/images/Project/Synchro/92.png",
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
    thumbnail: "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/preview-gallery.png",
    heroImage: "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/preview-gallery.png",
    date: "2023",
    tags: ["Unity", "Procreate", "NSC 25"],
    techStack: ["Unity", "Procreate"],
    summary: "โปรแกรมสวมบทบาทการทำงานของตำรวจพิสูจน์หลักฐานและสืบสวน เพื่อสอบสวนหาความจริงโดยยึดหลักนิติธรรมและความเป็นธรรมแก่ผู้ต้องหา",
    problem: "ปัญหามิจฉาทิฐิหรือการปฏิบัติที่ไม่เหมาะสมของเจ้าหน้าที่ต่อผู้ต้องหาในชีวิตจริง",
    process: "เขียนบทคดีธุรกิจ -> ออกแบบตัวละคร 2D -> พัฒนามินิเกม (ตรวจรอยนิ้วมือ, ตรวจเลือด) -> สรุปคดี",
    result: "The Solution: สร้างเกมที่จำลองสถานการณ์ความกดดันในการทำคดี แต่เน้นให้ผู้เล่นยึดหลักจริยธรรม\nImpact: สร้างแรงบันดาลใจและให้ความรู้เกี่ยวกับการทำงานที่ถูกต้องในสายงานตำรวจแก่เยาวชน",
    gallery: [
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/preview-gallery.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/27.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/30.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/32.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/34.png",
    ],
  },
  {
    slug: "lorcana-cloud-playlab",
    title: "Disney Lorcana PlayLab (AWS Cloud & OWASP QA Testing)",
    category: "programming",
    thumbnail: "/images/Project/Lorcana/preview-cloudgame.png",
    heroImage: "/images/Project/Lorcana/preview-cloudgame.png",
    date: "2026",
    tags: ["AWS Serverless", "WebSocket", "DynamoDB", "QA Testing", "OWASP Security", "Playwright", "Real-Time"],
    techStack: ["AWS API Gateway (WebSockets)", "AWS Lambda (Node.js)", "Amazon DynamoDB (Single-Table)", "AWS S3 / CloudFront", "AWS SAM CLI", "Playwright E2E", "Vitest", "Tailwind CSS"],
    summary: "แพลตฟอร์มการเล่นการ์ดเกมออนไลน์แบบเรียลไทม์บนสถาปัตยกรรม AWS Serverless เชื่อมต่อผู้เล่นผ่าน WebSocket API Gateway (<100ms latency), DynamoDB Single-Table State Sync พร้อมชุดทดสอบ E2E และแผนการทดสอบความปลอดภัยตามกรอบ OWASP Top 10 และระบบ Reconnect อัตโนมัติ",
    problem: "เกมการ์ด TCG มี State การเล่นที่ซับซ้อนมาก การส่งข้อมูลผ่าน REST API ทั่วไปจะหน่วงและเกิด Race Condition อีกทั้งการจัดการห้องเล่น (Room Lifecycle) มักเสี่ยงต่อปัญหาข้อมูลสูญหายเมื่อเน็ตหลุด และช่องโหว่ด้านความปลอดภัยจากการปลอมแปลง Action",
    process: "ออกแบบ DynamoDB Single-Table Schema -> พัฒนา Lambda Action Routers ($connect, sendAction, $disconnect) -> สร้าง Frontend React พร้อม Optimistic UI -> ออกแบบ Master QA Test Sheet และรัน Playwright E2E จำลองผู้เล่นคู่ขนาน พร้อมทดสอบความปลอดภัยตามกรอบ OWASP Web/API",
    phases: [
      {
        title: "Phase 1: AWS Serverless & WebSocket Architecture",
        description: "วางระบบ API Gateway WebSocket เชื่อมต่อ Lambda Routers และจัดเก็บ Connection State ลง DynamoDB แบบ Pay-per-request"
      },
      {
        title: "Phase 2: Game Board Frontend & Optimistic Sync",
        description: "พัฒนา UI กระดานเกมใน React รองรับการขยับการ์ด, Inkwell, Quest Lore Count พร้อมระบบ Live Broadcast (<100ms)"
      },
      {
        title: "Phase 3: Master QA Testing & Automation Suite",
        description: "สร้าง Master QA Sheet (backend-aws-runner.cjs / qa-reporter.cjs) และเขียน Playwright E2E Test ครอบคลุมทุก Action การเล่น"
      },
      {
        title: "Phase 4: OWASP Security & Connection Resilience",
        description: "ทดสอบการป้องกัน Injection/State Tampering ตาม OWASP Guidelines และจำลองกรณี Network Drop เพื่อยืนยันว่าระบบ Reconnect ได้ 100% โดย State ไม่หาย"
      }
    ],
    result: "The Solution: ระบบเล่นการ์ดเกมบน Cloud ที่เสถียร รองรับการเล่นแบบ Real-time พร้อมหลักฐานการทดสอบ QA ครอบคลุมทั้งฟังก์ชันและความปลอดภัย\nImpact: Server Cost เป็น $0 บน AWS Free Tier, ผ่านการทดสอบ Stress/Fault-Tolerance Test และรับประกัน State Integrity ตลอดทั้งเกม",
    gallery: [
      "/images/Project/Lorcana/preview-cloudgame.png",
      "/images/Project/Lorcana/qa-dashboard.png",
      "/images/Project/Lorcana/cloud-architecture.png",
      "/images/Project/Lorcana/gameplay-board.png",
      "/images/Project/Lorcana/dynamodb-schema.png"
    ],
  },
  {
    slug: "tawan-os-agent-harness",
    title: "TAWAN-OS (Agentic AI Operating System & CLI Harness)",
    category: "programming",
    thumbnail: "/images/Project/TawanOS/preview-tawanos.png",
    heroImage: "/images/Project/TawanOS/preview-tawanos.png",
    date: "2026",
    tags: ["Agentic AI", "MCP (Model Context Protocol)", "Hermes Agent", "Antigravity CLI", "Python", "Automation"],
    techStack: ["Antigravity CLI (agy)", "Hermes Agent", "Model Context Protocol (MCP)", "Python 3.11", "Next.js", "Obsidian Markdown", "Gemini 3.7 Flash High / 3.1 Pro"],
    summary: "ระบบปฏิบัติการส่วนบุคคลและ AI Agent Harness แบบ Markdown-first ควบคุมการทำงานของ Multi-Agent Orchestration ผ่าน Terminal, มีระบบเชื่อมต่อ Model Context Protocol (MCP) ควบคุม Figma Canvas, Obsidian, Unity Engine, และ Canva พร้อมสถาปัตยกรรม Proxy:3120 เชื่อมโมเดล High-Tier และคลัง Custom Skills กว่า 500+ ทักษะ",
    problem: "การใช้งาน AI แชทบอททั่วไปขาด Context ระยะยาว (Stateless), สลับเครื่องมือลำบาก, ไม่สามารถสั่งงานโปรแกรมในเครื่อง (เช่น Figma, Local Files, Git) ได้จริง และมักสร้างโค้ดแบบ Vibe Coding ที่ไม่มีการตรวจสอบความถูกต้อง",
    process: "วางโครงสร้าง Persistent Memory Vault (AGENTS.md, RULES.md, 07_MEMORY) -> ติดตั้ง Antigravity CLI & Hermes Agent พร้อม Proxy Bridge (proxy:3120) -> พัฒนา Figma MCP Bridge ผ่าน WebSocket ให้ AI วาด Component บน Canvas สด -> สร้าง Custom Skill Engine (500+ Skills) พร้อม Verification Loops (Plan -> Execute -> Doctor Test)",
    phases: [
      {
        title: "Phase 1: Spec-Driven Memory Vault & System Rules",
        description: "วางมาตรฐาน Obsidian Markdown จัดการความจำระยะยาว, กฎความปลอดภัย Guardrails, และ Context Packets"
      },
      {
        title: "Phase 2: Local Proxy Architecture & Model Routing",
        description: "สร้าง Proxy Gateway (Port 3120 / _antigravity_proxy.py) สำหรับสลับโมเดล High-Tier อัตโนมัติตามความยากของงานเพื่อประหยัด Token"
      },
      {
        title: "Phase 3: Real-Time MCP Ecosystem (Figma, Obsidian, Unity)",
        description: "พัฒนา Local WebSocket MCP Bridge ให้ AI ควบคุม Canvas ของ Figma, อ่าน/เขียนโน้ต Obsidian, และสั่งงาน Unity Editor ได้โดยตรง"
      },
      {
        title: "Phase 4: 500+ Custom Skills & Self-Healing Loops",
        description: "สร้างระบบ Custom Skill Registry (SKILL.md) และ Verification Pipeline (SWE-loop / agy doctor) ให้ AI ตรวจสอบและแก้ Bug โค้ดด้วยตัวเองก่อนส่งมอบ"
      }
    ],
    result: "The Solution: สภาพแวดล้อม AI-Native วิศวกรรมซอฟต์แวร์เต็มรูปแบบ ที่ผสานการเขียนโค้ด การออกแบบ UI และการจัดการความรู้ไว้ในจุดเดียว\nImpact: ลดเวลาจัดการงานประจำวันลงกว่า 60%, ป้องกันการเกิด AI Code Slop ด้วย Spec-First Architecture และสามารถควบคุมเครื่องมือภายนอกผ่าน MCP ได้อย่างไร้รอยต่อ",
    gallery: [
      "/images/Project/TawanOS/preview-tawanos.png",
      "/images/Project/TawanOS/mcp-ecosystem.png",
      "/images/Project/TawanOS/agent-architecture.png"
    ],
  },
  {
    slug: "redbull-f1-verstappen",
    title: "Red Bull Racing F1 — Max Verstappen (3D Interactive Experience)",
    category: "programming",
    thumbnail: "/images/Project/RedBull-F1/preview-f1.png",
    heroImage: "/images/Project/RedBull-F1/preview-f1.png",
    date: "2026",
    tags: ["Three.js", "3D Web", "GSAP Animation", "Interactive UI", "F1", "Veo AI Video"],
    techStack: ["Three.js", "WebGL / GLTF 3D Loader", "GSAP (ScrollTrigger)", "JavaScript (Vanilla)", "HTML5/CSS3", "Google Veo AI Video", "Custom Design Tokens"],
    summary: "เว็บไซต์ประสบการณ์จำลอง 3D แบบ Interactive สำหรับทีม Red Bull Racing และแชมป์โลก F1 'Max Verstappen' โดดเด่นด้วยโมเดล 3D รถแข่ง RB19 (2023) ที่หมุนสำรวจรอบคันและแสดงมุมมองระเบิดชิ้นส่วน (Exploded View), อนิเมชันเลื่อนหน้าจอ Parallax ความเร็วสูงด้วย GSAP, ระบบเสียงเครื่องยนต์ และวิดีโอ AI Cinematic จาก Google Veo",
    problem: "เว็บไซต์กีฬาความเร็วและยานยนต์ส่วนใหญ่มักเป็นภาพนิ่ง 2D ขาดความเร้าใจและไม่สามารถถ่ายทอดความล้ำสมัยของเทคโนโลยีแอร์โรไดนามิกส์ในรถแข่ง F1 ยุคใหม่ได้อย่างเต็มอารมณ์",
    process: "วางแนวคิด Design Token สไตล์ High-Performance Dark (#0a1024, Max Red #e01020, Champion Gold #f1c40f) -> นำเข้าโมเดล 3D RB19 GLB และเขียนสคริปต์ Three.js สำหรับ Exploded View Camera Tracking -> สร้าง GSAP ScrollTrigger ควบคุมจังหวะไทม์ไลน์และ Parallax -> เสริมพลังด้วย Generative Video และ Telemetry HUD",
    phases: [
      {
        title: "Phase 1: Concept & Design Token System",
        description: "กำหนดสเปค DESIGN.md ธีม Dark High-Performance ตัดเส้นขอบนีออน สะท้อนความดุดันและแม่นยำของ Max Verstappen"
      },
      {
        title: "Phase 2: 3D Asset Optimization & Three.js Canvas",
        description: "โหลดและเรนเดอร์โมเดล Oracle Red Bull Racing RB19 GLB พร้อมเขียนสคริปต์ three-exploded.js เพื่อแยกชิ้นส่วน Body, Wings, และ Tires"
      },
      {
        title: "Phase 3: Cinematic GSAP Scroll & Parallax",
        description: "ผูกการหมุนของรถ 3D และการเลื่อนข้อความ Telemetry เข้ากับความเร็วในการ Scroll ของผู้ใช้แบบไร้รอยต่อ"
      },
      {
        title: "Phase 4: Multi-Media & AI Video Integration",
        description: "สกัดเฟรมและผสมผสานวิดีโอ Cinematic AI (Google Veo) พร้อมเสียงเครื่องยนต์ F1 เพิ่มความสมจริงในระดับมัลติมีเดีย"
      }
    ],
    result: "The Solution: เว็บไซต์ 3D Showpiece ที่ผสมผสานศาสตร์ Visual Design, 3D Graphics และ Web Performance ได้อย่างลงตัว\nImpact: ยกระดับประสบการณ์การรับชมเนื้อหา F1 บนเบราว์เซอร์ให้ตื่นเต้นและมีปฏิสัมพันธ์แบบ Real-time โดยไม่สูญเสียความเร็วในการโหลดหน้าเว็บ",
    gallery: [
      "/images/Project/RedBull-F1/preview-f1.png",
      "/images/Project/RedBull-F1/exploded-view.png",
      "/images/Project/RedBull-F1/telemetry-hud.png"
    ],
  },
  {
    slug: "hybricareer-ai",
    title: "HybriCareer AI (BridgeAI) — Generation Hackathon Proposal",
    category: "uxui",
    thumbnail: "/images/Project/HybriCareer/preview-hybricareer.png",
    heroImage: "/images/Project/HybriCareer/preview-hybricareer.png",
    date: "2026",
    tags: ["Hackathon Proposal", "Top 10 Finalist", "AI SaaS Concept", "UX/UI Design", "Product Strategy"],
    techStack: ["Figma", "React / TypeScript (PoC)", "Tailwind CSS", "Prompt Engineering", "Lovable", "Gemini API"],
    summary: "ข้อเสนอโครงการและ Interactive PoC สำหรับการแข่งขัน Generation Thailand Hackathon ได้รับการคัดเลือกเป็น 'Top 10 Finalist Proposal' (ทีมสำรองอันดับที่ 5) นำเสนอแพลตฟอร์ม AI เพื่อแก้ปัญหาบัณฑิตต้องการย้ายสายงาน (Non-traditional Graduates) ให้ก้าวข้ามการคัดกรองของระบบ ATS ด้วย AI Skill-Proof Radar และ Narrative Mock Interview",
    problem: "ผู้ที่ต้องการเปลี่ยนสายงานมักถูกคัดทิ้งโดยระบบ ATS ตั้งแต่ด่านแรกเนื่องจากชื่อปริญญาไม่ตรงสาย แม้จะมีทักษะจริง ขาดเครื่องมือที่ช่วยยืนยัน Transferable Skills และพิสูจน์ความพร้อมเชิงประจักษ์ให้ HR เชื่อมั่น",
    process: "ทำ User Research & Persona Mapping (Candidate vs. Recruiter) -> ออกแบบ Information Architecture & Visual Identity สไตล์ Modern SaaS (Indigo & Emerald) -> สร้าง Interactive PoC สำหรับคำนวณ Skill Radar และจำลองการสัมภาษณ์งานด้วย AI Narrative Engine -> สรุป Pitch Deck นำเสนอคณะกรรมการ",
    phases: [
      {
        title: "Phase 1: Problem Discovery & Hackathon Ideation",
        description: "วิเคราะห์ Pain Point ของกลุ่ม Career Switcher ในไทย และออกแบบคุณค่าหลัก (Value Proposition) เพื่อนำเสนอใน Generation Hackathon"
      },
      {
        title: "Phase 2: Dual-Persona UX/UI Design",
        description: "ออกแบบหน้าจอสำหรับ Candidate (Upload Portfolio / AI Feedback) และ HR Recruiter (1-Click Skill Verification Dashboard)"
      },
      {
        title: "Phase 3: Interactive AI PoC Prototype",
        description: "พัฒนา Prototype จำลองการคำนวณ Skill Readiness Radar Chart และบทสนทนาสัมภาษณ์งานจำลองแบบ Interactive"
      },
      {
        title: "Phase 4: Pitch Deck & Proposal Submission",
        description: "จัดทำเอกสารข้อเสนอโครงการและสไลด์ Pitching จนผ่านการคัดเลือกเข้ารอบ Top 10 Finalist Proposal (5th Reserve Team)"
      }
    ],
    result: "The Solution: ข้อเสนอโซลูชันด้าน HR-Tech ที่เปลี่ยนใบปริญญาเป็นหลักฐานทางทักษะที่จับต้องได้จริง (Competency-based Proof)\nImpact: ได้รับการจัดอันดับเป็น Top 10 Shortlisted Proposal ในการแข่งขันระดับประเทศ และได้ฝึกฝน Product Thinking, AI Prompt Workflow, และ UX Design System อย่างเข้มข้น",
    gallery: [
      "/images/Project/HybriCareer/preview-hybricareer.png",
      "/images/Project/HybriCareer/hackathon-slide.png",
      "/images/Project/HybriCareer/candidate-flow.png",
      "/images/Project/HybriCareer/skill-radar.png"
    ],
  }
];
