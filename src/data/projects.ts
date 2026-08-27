// Project data — Thanatpat Promthong (TAWAN-OS Portfolio)
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
    slug: "lorcana-cloud-playlab",
    title: "Disney Lorcana PlayLab (AWS Serverless Real-Time Cloud TCG)",
    category: "programming",
    thumbnail: "/images/Project/Lorcana/01_landing_hero.png",
    heroImage: "/images/Project/Lorcana/01_landing_hero.png",
    date: "2026",
    tags: ["AWS Serverless", "Real-Time WebSocket", "DynamoDB Single-Table", "3D Card Physics", "OWASP Security", "E2E Testing", "KMITL IT"],
    techStack: ["AWS API Gateway (WebSockets)", "AWS Lambda (Node.js/Python)", "Amazon DynamoDB", "AWS S3 / CloudFront", "SAM CLI", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Playwright", "Vitest"],
    summary: "โครงงานวิชา Cloud Computing (1/2569) คณะเทคโนโลยีสารสนเทศ สจล. (KMITL) พัฒนาแพลตฟอร์มการเล่นการ์ดเกมออนไลน์แบบมัลติเพลเยอร์เรียลไทม์บนสถาปัตยกรรม AWS Serverless เต็มรูปแบบ ด้วยต้นทุนค่าเซิร์ฟเวอร์ $0.00 (AWS Free Tier Optimized) เชื่อมต่อผู้เล่น 2 ฝั่งด้วย API Gateway WebSocket (<100ms latency), สุ่มเปิดซองการ์ดด้วย Fisher-Yates Randomization Engine จากฐานข้อมูลการ์ดทางการ 3,129 ใบ (Set 1 & 2 ครบทั้ง 9 ระดับ Rarity), จำลองฟิสิกส์การฉีกซองและการพลิกการ์ด 3D พร้อมชุดทดสอบความปลอดภัยตามกรอบ OWASP Top 10 และ Playwright E2E Automation",
    problem: "โปรแกรมจำลองการ์ดเกม TCG บนเว็บส่วนใหญ่มี UI ที่เทอะทะ ขาดความลื่นไหลบนมือถือ/แท็บเล็ต, ขาดมิติทางกายภาพของการเล่นการ์ดจริง (เช่น การฉีกซอง Booster, การพลิกการ์ด 3D, แสงสะท้อน Foil) และมักใช้เซิร์ฟเวอร์แบบเดิมที่มีค่าใช้จ่ายรายเดือนสูง โจทย์หลักคือการสร้างระบบ Real-time State Sync บน Cloud ที่มี Latency ต่ำกว่า 100ms โดยไม่มีค่าใช้จ่ายเซิร์ฟเวอร์ ($0.00) และรองรับการ Reconnect อัตโนมัติเมื่อเกิดปัญหาสัญญาณเน็ตหลุด",
    process: "วางสถาปัตยกรรม Event-driven WebSocket Router ($connect, sendAction, $disconnect) -> ออกแบบ DynamoDB Single-Table State Storage -> สร้าง Hexagonal Architecture พร้อม Client-side In-memory Fallback Database (FALLBACK_DATABASE) สำหรับการทำงาน Offline -> พัฒนาระบบสุ่มการ์ด Fisher-Yates 100% True Randomization จากการ์ด 3,129 ใบ -> ออกแบบฟิสิกส์ฉีกซองและพลิกการ์ด 3D ด้วย Framer Motion & CSS 3D Transforms -> เขียน Master QA Test Suite และรัน Playwright E2E Automation ตรวจสอบความปลอดภัยตาม OWASP",
    phases: [
      {
        title: "AWS Serverless & Event-Driven WebSocket Router",
        description: "ออกแบบระบบสื่อสารสองทาง (<100ms latency) ผ่าน AWS API Gateway WebSocket เชื่อมต่อกับ Lambda Actions Router และ DynamoDB Single-Table Schema จัดเก็บ Room State, Turn Phase, Inks, Lore Count, และ Connection ID แบบ Pay-per-request"
      },
      {
        title: "Deep Modules & Hexagonal Offline Failover",
        description: "ออกแบบ Core Domain Logic แยกขาดจากโครงสร้างพื้นฐานภายนอก พร้อมระบบ FALLBACK_DATABASE ในตัว หาก AWS Services ขัดข้อง ระบบจะสลับไปรันบน Client-side Repository ทันทีโดยหน้าเว็บไม่เกิด Runtime Crash"
      },
      {
        title: "Fisher-Yates Booster Pack Gacha Engine (3,129 Cards)",
        description: "พัฒนาระบบสุ่มเปิดซองการ์ดแบบ Unbiased Fisher-Yates Shuffle จากคลังการ์ดทางการ Set 1 และ Set 2 รวม 3,129 ใบ ครอบคลุม 9 ระดับ Rarity (Common, Uncommon, Rare, Super Rare, Epic, Legendary, Enchanted Secret Art, Iconic, Special)"
      },
      {
        title: "Luxury 3D Card Physics, Master QA & OWASP Hardening",
        description: "พัฒนา UI ธีม Dark Obsidian Slate & Amber Gold Foil (#070A10 + #F59E0B) พร้อมฟิสิกส์ฉีกซองและหมุนการ์ด 180° แบบ 2-Step Tap/Swipe, แก้ปัญหา Ravensburger CDN Hotlink ด้วย referrerPolicy='no-referrer' และทดสอบ E2E ด้วย Playwright"
      }
    ],
    result: "The Solution: แพลตฟอร์มการ์ดเกมบน Cloud สถาปัตยกรรม Serverless ที่เปิดให้ผู้เล่นจัดเด็ค เปิดซอง และดวลการ์ดแบบเรียลไทม์ได้อย่างลื่นไหล พร้อมระบบ Fallback Failsafe\nImpact: ค่าใช้จ่าย Server Cost คงที่อยู่ที่ $0.00 บน AWS Free Tier, ผ่านการทดสอบ Automated E2E Test ครอบคลุมทุก Action การเล่น และระบบ Reconnect คืนสถานะเกมได้ 100%",
    gallery: [
      "/images/Project/Lorcana/01_landing_hero.png",
      "/images/Project/Lorcana/07_realtime_room_play.png",
      "/images/Project/Lorcana/04_deck_builder.png",
      "/images/Project/Lorcana/CardGachaDisney.png",
      "/images/Project/Lorcana/03_after_login_match_lobby.png",
      "/images/Project/Lorcana/10_analytics_dashboard.png",
      "/images/Project/Lorcana/aws_serverless_architecture.png",
      "/images/Project/Lorcana/aws_websocket_flow.png",
      "/images/Project/Lorcana/aws_fallback_strategy.png",
      "/images/Project/Lorcana/qa_dashboard_full.png"
    ],
  },
  {
    slug: "tawan-os-agent-harness",
    title: "TAWAN-OS (Agentic AI Personal Operating System & CLI Harness)",
    category: "programming",
    thumbnail: "/images/Project/TawanOS/preview-tawanos.png",
    heroImage: "/images/Project/TawanOS/preview-tawanos.png",
    date: "2026",
    tags: ["Agentic AI", "MCP (Model Context Protocol)", "Terminal CLI Harness", "Obsidian Second Brain", "Dynamic Model Proxy", "500+ Skills"],
    techStack: ["Antigravity CLI (agy)", "Hermes Agent", "Model Context Protocol (MCP)", "Python 3.11", "Next.js", "Obsidian Markdown", "Gemini 3.7 Flash High / 3.1 Pro", "PowerShell / Bash"],
    summary: "ระบบปฏิบัติการส่วนบุคคลและ AI Agent Harness แบบ Markdown-first ออกแบบสำหรับรองรับการเรียนมหาวิทยาลัย (KMITL IT), การฝึกวินัยชีวิต (Life OS), คลังความรู้สมองที่สอง (Second Brain ใน Obsidian) และงานพัฒนาระบบซอฟต์แวร์ ควบคุมการทำงานของ Multi-Agent Orchestration ผ่าน Terminal และ Hermes Agent, มีระบบ Local MCP Bridge ควบคุม Canvas ของ Figma, เชื่อมโยงโน้ต Obsidian, และสั่งงาน Unity CLI พร้อมสถาปัตยกรรม Proxy Gateway (Port 3120) เชื่อมต่อโมเดล High-Tier และคลัง Custom Skills กว่า 500+ ทักษะ",
    problem: "การใช้งาน AI แชทบอทบนเว็บทั่วไปมักเจอปัญหา Context หลุด (Stateless), สลับเครื่องมือลำบาก, ไม่สามารถสั่งงานหรือแก้ไขไฟล์บนเครื่องได้จริง ขาดการเชื่อมโยงกับ Design Tools อย่าง Figma หรือ Knowledge Base อย่าง Obsidian และมักเกิดการเขียนโค้ดแบบ Vibe Coding ที่ไม่มีระบบทดสอบความถูกต้อง",
    process: "วางโครงสร้าง Persistent Memory Vault (AGENTS.md, RULES.md, 07_MEMORY/ Decisions, Lessons, Mistakes) -> สร้าง Bridge Protocol เชื่อมต่อ Hermes Agent เข้ากับ Antigravity CLI -> พัฒนา Python WebSocket MCP Bridge เพื่อให้ AI สร้าง Vector Components บนหน้าจอ Figma สดๆ -> สร้าง Proxy Gateway (proxy:3120) สำหรับสลับโมเดล High-Tier อัตโนมัติ -> พัฒนาระบบคัดกรอง 500+ Custom Skills พร้อม Verification Loops (Plan -> Execute -> Doctor Test / Lint Gate)",
    phases: [
      {
        title: "Spec-Driven Memory Vault & Context Hierarchy",
        description: "วางมาตรฐาน Obsidian Markdown จัดการความจำระยะยาว กฎความปลอดภัย Guardrails และ Context Packets เพื่อให้ AI ทุกตัวมี Single Source of Truth เดียวกันโดยไม่เกิดอาการหลอน Context"
      },
      {
        title: "Real-Time MCP Bridge Ecosystem (Figma, Obsidian, Unity)",
        description: "พัฒนา Local WebSocket MCP Bridge ให้ AI ควบคุมการวาด Vector UI Components บน Figma Canvas แบบ Real-time, อ่านและเขียนโครงสร้างโน้ตใน Obsidian, และส่งคำสั่งควบคุม Unity Engine ผ่าน Terminal"
      },
      {
        title: "Local Proxy Gateway & Dynamic Model Balancing (Port 3120)",
        description: "สร้างสถาปัตยกรรม Proxy Server เชื่อมโยงโมเดลระดับสูง (Gemini 3.7 Flash High / 3.1 Pro) สำหรับงาน Coding หนักๆ และสลับเป็นโมเดลความเร็วสูงสำหรับงานตรวจสอบย่อย เพื่อประหยัด Token และลด Latency"
      },
      {
        title: "500+ Custom Skills & Self-Healing Verification Loops",
        description: "จัดระเบียบคลังทักษะใน .agents/skills/ พร้อมระบบ Auto-routing อัตโนมัติตามประเภทงาน และติดตั้ง SWE-Loop ตรวจสอบ Error Code และรันคำสั่ง agy doctor ทดสอบระบบก่อนยืนยันผลลัพธ์ทุกครั้ง"
      }
    ],
    result: "The Solution: สภาพแวดล้อมวิศวกรรมซอฟต์แวร์ AI-Native ครบวงจร ที่ผสานการเขียนโค้ด การออกแบบ UI และการจัดการความรู้เข้าเป็นระบบอัตโนมัติที่มีความจำต่อเนื่อง\nImpact: ลดเวลาจัดการงานประจำวันลงกว่า 60%, ป้องกันปัญหา AI Code Slop ด้วย Spec-First Architecture และสั่งงานเครื่องมือภายนอกผ่าน MCP ได้อย่างไร้รอยต่อ",
    gallery: [
      "/images/Project/TawanOS/preview-tawanos.png",
      "/images/Project/TawanOS/mcp-ecosystem.png",
      "/images/Project/TawanOS/agent-architecture.png"
    ],
  },
  {
    slug: "redbull-f1-verstappen",
    title: "Red Bull Racing F1 — Max Verstappen (3D Interactive Three.js Experience)",
    category: "programming",
    thumbnail: "/images/Project/RedBull-F1/hero-bg.jpg",
    heroImage: "/images/Project/RedBull-F1/hero-bg.jpg",
    date: "2026",
    tags: ["Three.js", "3D Exploded View", "GSAP Parallax", "Antigravity CLI Sprint", "Google Veo Video", "High-Performance Dark"],
    techStack: ["Three.js", "WebGL", "GSAP (ScrollTrigger)", "Antigravity CLI (Agent Harness)", "NotebookLM", "Google Flow (Veo AI)", "JavaScript", "HTML5/CSS3", "Custom Design Tokens"],
    summary: "เว็บไซต์ประสบการณ์จำลอง 3D Interactive สำหรับทีมแข่ง Oracle Red Bull Racing และแชมป์โลก F1 4 สมัย 'Max Verstappen' พัฒนาขึ้นในระยะเวลา 1 สัปดาห์เต็มผ่านการทดลองใช้ Antigravity CLI (ระบบ Agent Harness แบ่งงาน 17 Subagents และ 25 Skills โดยไม่ใช้ Claude) โดดเด่นด้วยโมเดล 3D รถแข่ง RB19 ที่หมุนสำรวจรอบคันและแสดงมุมมองระเบิดชิ้นส่วน (Exploded View) แยก Body, Aero Wings และ Slick Tires, แอนิเมชัน Parallax ไทม์ไลน์ความเร็วสูงด้วย GSAP ScrollTrigger, ระบบเสียงเครื่องยนต์ F1 และฟุตเทจวิดีโอ AI Cinematic จาก Google Veo",
    problem: "เว็บไซต์มอเตอร์สปอร์ตส่วนใหญ่มักเป็นภาพนิ่ง 2D ขาดความตื่นเต้นและไม่สามารถถ่ายทอดความล้ำสมัยของเทคโนโลยีแอร์โรไดนามิกส์ในรถแข่ง F1 ได้อย่างสมจริง ขณะเดียวกันการพัฒนาเว็บ 3D ด้วย AI มักเจอปัญหาโค้ดหลุดติด Template สำเร็จรูป ขาดเอกลักษณ์ และกิน Token มหาศาลจนไม่สามารถปรับแต่งงานคราฟต์ได้",
    process: "ดึงข้อมูลการแข่งขันและประวัติจาก YouTube เข้า NotebookLM เพื่อสร้าง Knowledge Base -> ใช้ Google Flow เจนวิดีโอ Cinematic ผ่านโมเดล Veo Fast -> ปรับจูนโมเดล 3D RB19 GLB และเขียนสคริปต์ three-exploded.js สำหรับแยกชิ้นส่วนตามแกนกล้อง -> ควบคุม Antigravity CLI 17 Agents จัดการงานเฉพาะจุดพร้อม Balance AI สลับโมเดล -> คุมแอนิเมชัน GSAP ScrollTrigger และวาง Design Tokens สไตล์ High-Performance Dark (#0a1024, Max Red #e01020, Champion Gold #f1c40f)",
    phases: [
      {
        title: "1-Week Sprint with Antigravity CLI (Agent Harness)",
        description: "ทดลองสร้างระบบนิเวศ Agent Harness ด้วย Antigravity CLI รันคู่ขนาน 17 Subagents และ 25 Skills พร้อมทำ Dynamic Model Balancing สลับโมเดลตามความยากของงาน ทำให้แก้โค้ดไปกว่า 100 Prompts โดยไม่ติด Token Limit"
      },
      {
        title: "Multi-Modal AI Pipeline (NotebookLM & Google Veo)",
        description: "สกัดข้อมูลประวัตินักแข่งและสถิติจากวิดีโอผ่าน NotebookLM เพื่อเป็นฐานข้อมูลให้ Agent และสร้างคลิปวิดีโอ AI Cinematic จาก Google Flow (Veo Fast Model) มาตัดต่อเป็นแอนิเมชันเปิดตัว"
      },
      {
        title: "Three.js 3D Exploded View Engine (RB19 GLB)",
        description: "โหลดและเรนเดอร์โมเดล 3D Oracle Red Bull Racing RB19 GLB พร้อมพัฒนา three-exploded.js เพื่อคำนวณเวกเตอร์การระเบิดแยกชิ้นส่วนตัวถัง แอร์โรพาร์ท และล้อรถตามการ Scroll ของผู้ใช้"
      },
      {
        title: "Human Taste, Audio Engine & GSAP ScrollTrigger",
        description: "ปรับแต่งจังหวะการเลื่อนของหน้าจอด้วย GSAP ScrollTrigger ผสานเอฟเฟกต์เสียงเครื่องยนต์ F1 และ Telemetry HUD โดยอาศัย Taste ของมนุษย์เป็นคนคุมทิศทาง ไม่พึ่งพา Template สำเร็จรูปของ AI"
      }
    ],
    result: "The Solution: ผลงาน 3D Web Showpiece ระดับ Awwwards ที่ผสานกราฟิก 3D WebGL, แอนิเมชัน Scroll Parallax และวิดีโอ Generative AI ได้อย่างสมบูรณ์แบบ\nImpact: พิสูจน์ขีดความสามารถของ Agentic CLI ที่ทำงานร่วมกับ Taste ของคนในการสร้างสรรค์งาน Front-End ขั้นสูงได้เสร็จสิ้นภายใน 1 สัปดาห์ และรัน 3D ได้ลื่นไหล 60 FPS",
    gallery: [
      "/images/Project/RedBull-F1/hero-bg.jpg",
      "/images/Project/RedBull-F1/max_portrait.jpg",
      "/images/Project/RedBull-F1/Open.png",
      "/images/Project/RedBull-F1/End.png",
      "/images/Project/RedBull-F1/max_helmet_intro.jpg",
      "/images/Project/RedBull-F1/video_start_frame.jpg",
      "/images/Project/RedBull-F1/timeline_2003.jpg",
      "/images/Project/RedBull-F1/timeline_2014.jpg",
      "/images/Project/RedBull-F1/timeline_2015.jpg",
      "/images/Project/RedBull-F1/timeline_2016.jpg",
      "/images/Project/RedBull-F1/timeline_2021.jpg",
      "/images/Project/RedBull-F1/timeline_2024.jpg"
    ],
  },
  {
    slug: "hybricareer-ai",
    title: "HybriCareer AI (BridgeAI) — Generation Thailand Hackathon 2026",
    category: "uxui",
    thumbnail: "/images/Project/HybriCareer/slide1_hackathon_cover.png",
    heroImage: "/images/Project/HybriCareer/slide1_hackathon_cover.png",
    date: "2026",
    tags: ["Hackathon Proposal", "Top 10 Finalist (5th Reserve)", "User Research", "AI Skill-Proof Radar", "Dual-Persona SaaS", "ATS Bypass"],
    techStack: ["Figma", "Lovable", "React", "TypeScript", "Tailwind CSS", "Prompt Engineering", "Gemini API", "User Interviews", "Labor Data Analytics"],
    summary: "ข้อเสนอโครงการและ Interactive Web Prototype สำหรับการแข่งขัน Generation Thailand Hackathon 2026 ได้รับการคัดเลือกเป็น 'Top 10 Finalist Proposal' (ทีมสำรองอันดับที่ 5) พัฒนาขึ้นจากงานวิจัยเชิงลึกกับผู้ต้องการย้ายสายงาน 5 คน และ HR 2 คน เพื่อแก้ปัญหาอัตราการว่างงานของเด็กจบใหม่อายุ 20-24 ปีในไทยที่มีสัดส่วนสูงถึง 34% (สถิติ สสช. Q1/2569) โดดเด่นด้วยระบบ AI Skill-Proof & Benchmark Radar ประเมินทักษะที่ถ่ายทอดได้ (Transferable Skills) จากผลงานจริง, AI Hybrid Storyteller จำลองการสัมภาษณ์งาน และ ATS Bypass Skill Badge ช่วยให้ผู้สมัครที่วุฒิไม่ตรงสายสามารถพิสูจน์ความสามารถให้ HR เห็นได้ตั้งแต่ด่านแรก",
    problem: "ในตลาดแรงงานไทย เด็กจบใหม่และคนทำงานที่ต้องการเปลี่ยนสายงาน (เช่น จบเภสัชศาสตร์แต่อยากเป็น Data Analyst) มักถูกคัดทิ้งโดยระบบ ATS ตั้งแต่ด่านแรกเนื่องจากชื่อปริญญาไม่ตรงสาย แม้จะมีทักษะจริงผ่านการเรียนรู้ด้วยตนเอง ขณะที่ฝั่ง HR องค์กรขนาดเล็ก-กลางมีเวลาจำกัด ขาดเครื่องมือคัดกรองความสามารถเชิงประจักษ์ ทำให้เกิดการคัดคนไม่ตรงกับความสามารถจริงและเสียเวลาหางานนาน 4-6 เดือน",
    process: "สัมภาษณ์เชิงลึกกลุ่มตัวอย่าง 5 ผู้ย้ายสายงาน + 2 HR และวิเคราะห์สถิติแรงงาน สสช. -> กำหนด Persona 'น้องมิว' (จบเภสัชฯ อยากเป็น Healthcare Data Analyst) -> ออกแบบ Information Architecture & Visual Identity สไตล์ Modern SaaS (Indigo & Emerald) -> พัฒนา Interactive Prototype ใน Lovable มี View Switcher Toggle สลับมุมมอง Candidate vs. HR -> จัดทำสไลด์ Pitch Deck และได้รับคัดเลือกเป็น Top 10 Finalist Proposal (ทีมสำรองอันดับ 5)",
    phases: [
      {
        title: "User Research & Labor Market Analytics (34% Youth Unemployment)",
        description: "วิเคราะห์สถิติ สสช. พบว่ากลุ่มว่างงานสูงสุดคือช่วงอายุ 20-24 ปี (134,900 คน) และสัมภาษณ์เชิงลึกพบว่าผู้ย้ายสายงานต้องใช้เวลาทำพอร์ตและหางานนานหลายเดือนเพราะติดระบบกรองวุฒิของ ATS"
      },
      {
        title: "Dual-Persona Experience Design (Candidate vs. HR Recruiter)",
        description: "ออกแบบระบบ 2 มุมมอง: ฝั่งผู้สมัคร (Upload ผลงาน, ดู Skill Radar, ซ้อมสัมภาษณ์ AI) และฝั่ง HR (Dashboard ค้นหาคนที่มีปุ่ม ATS Bypass Mode และปุ่ม 1-Click Invite to Interview)"
      },
      {
        title: "AI Skill-Proof Radar & Hybrid Storyteller Engine",
        description: "พัฒนาระบบคำนวณความพร้อมของทักษะ (Skill Readiness %) ที่ชูจุดเด่นความรู้เฉพาะทางเดิม (เช่น เภสัชฯ มีความรู้ Healthcare 99%) ควบคู่กับทักษะเทคนิคใหม่ พร้อมจำลองคำถามสัมภาษณ์งาน"
      },
      {
        title: "Interactive PoC in Lovable & Hackathon Finalist Pitch",
        description: "สร้าง Prototype เว็บแอปพลิเคชันที่คลิกทดสอบได้จริงใน Lovable และจัดทำสไลด์นำเสนอต่อคณะกรรมการ Generation Thailand จนได้รับการจัดอันดับเป็น Top 10 Finalist Proposal (ทีมสำรองอันดับที่ 5)"
      }
    ],
    result: "The Solution: ข้อเสนอแพลตฟอร์ม HR-Tech ที่เปลี่ยนใบปริญญาให้กลายเป็นหลักฐานทางทักษะเชิงประจักษ์ (Zero Bias on Degree Name)\nImpact: ได้รับการคัดเลือกเป็น Top 10 Finalist Proposal (ทีมสำรองอันดับที่ 5) ในเวที Hackathon ระดับประเทศ และได้ฝึกฝนกระบวนการ Product Discovery, User Research, และ AI Rapid Prototyping เต็มรูปแบบ",
    gallery: [
      "/images/Project/HybriCareer/slide1_hackathon_cover.png",
      "/images/Project/HybriCareer/slide2_user_research.png",
      "/images/Project/HybriCareer/slide3_solution_architecture.png",
      "/images/Project/HybriCareer/slide4_candidate_view.png",
      "/images/Project/HybriCareer/slide5_recruiter_view.png"
    ],
  },
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
        description: "Target Platform iOS (Apple HIG) ทำ UI Components 25+ รายการ ออกแบบ Detailed Screen ทุกหน้า สร้าง Prototype ใน Figma ทำ Guerilla Usability Testing 3 คน โดยใช้ Thinking Aloud พบจุดที่ต้องปรับปรุงและแก้ไข"
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
        title: "Core Concept & Game Loop Design",
        description: "วาง core loop: รับ request → จัดสรร VM → deploy → รับรายได้ → อัปเกรดระบบ ออกแบบ mechanic หลักและ win/lose condition"
      },
      {
        title: "Data Relationship & OOP Architecture",
        description: "ออกแบบความสัมพันธ์ของ company, customer requests, rack configuration และ VM assignments ให้เป็น OOP architecture ที่ยืดหยุ่น"
      },
      {
        title: "Time System & Event Simulation",
        description: "พัฒนาระบบเวลา (30 วินาทีจริง = 1 วันในเกม) และ event system เพื่อสร้างแรงกดดันและ progression ระหว่างการเช่า"
      },
      {
        title: "Cyberpunk UI & Pixel Art Graphics",
        description: "สร้าง UI ธีม cyberpunk ด้วย JavaFX และใช้ pixel art / graphic support เพื่อให้เกมมีเอกลักษณ์ที่จดจำได้"
      }
    ],
    result: "The Solution: เกมจำลองธุรกิจเชิงระบบที่มีทั้งความรู้สึกของ tycoon game และการจัดการ resource เชิงเทคนิค พร้อมระบบ save/load และ event-driven progression\nImpact: ได้ฝึก OOP, game system design, state management, และการทำงานร่วมกันในโปรเจกต์ขนาดทีม\nChallenges: จำลองระบบธุรกิจ VPS ที่มีทรัพยากรหลายชั้นให้เล่นสนุกและเข้าใจง่าย, ออกแบบความสัมพันธ์ระหว่าง rack / VM / requests / skill / events, และทำ UI ธีม cyberpunk ให้เข้ากับเนื้อหาเชิงเทคนิค",
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
        title: "UI/UX Flow & Interactive Campus Journey",
        description: "ออกแบบ flow ใน Figma ครอบคลุมหน้าหลัก, การตั้ง username, เลือก role, join/create room และ chat room interface"
      },
      {
        title: "FastAPI Backend & WebSocket Real-Time Gateway",
        description: "พัฒนา backend API ด้วย FastAPI และระบบ real-time communication ผ่าน WebSocket เชื่อมระหว่าง Next.js frontend กับ Python backend"
      },
      {
        title: "Vehicle Room System & Role-Based Access",
        description: "สร้างระบบ create room, random join, role-based access (Driver/Passenger) และ room type restrictions พร้อม capacity control ตามประเภทพาหนะ (Bicycle 2, Taxi 4, Songthaew 10, EV Minibus 15)"
      },
      {
        title: "Dynamic Room Polish & Video Backgrounds",
        description: "เพิ่ม live room status, user count tracking, countdown timer, auto remove empty rooms และ location-based video backgrounds ตามจุดสำคัญใน สจล."
      }
    ],
    result: "The Solution: แพลตฟอร์ม random chat ที่ผสมแนวคิด journey experience เข้ากับ real-time web app ทำให้การคุยกับคนแปลกหน้ามีทั้งบริบทและความแปลกใหม่\nImpact: ได้ฝึก full-stack collaboration, real-time system design, และการแก้ปัญหา WebSocket / CORS / room transition ในโปรเจกต์จริง",
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
        title: "Hardware Wiring & Breadboard Engineering",
        description: "ต่อวงจร ESP32 เชื่อมกับ TFT LCD display และปุ่มกดบน breadboard พร้อมแก้ปัญหาการจ่ายไฟและ Logic Level Shifter สำหรับ SD Card Module"
      },
      {
        title: "Embedded Rhythm Game Engine in C++",
        description: "เขียนโปรแกรม Arduino ควบคุม rhythm game logic, การแสดงผลโน้ตเพลงบน LCD และการรับ input จากปุ่มกดแบบ real-time"
      },
      {
        title: "Custom JSON Song Mapping Tool",
        description: "สร้างเครื่องมือ mapping โน้ตเพลงเป็นโครงสร้าง JSON เพื่อให้ผู้ใช้สามารถอัปโหลดและเพิ่มเพลงใหม่ลงใน SD Card ได้อย่างยืดหยุ่น"
      },
      {
        title: "Embedded Web Server & Analytics Sync",
        description: "เชื่อมต่อ ESP32 Web Server เข้ากับ Frontend Web App เพื่อรับส่งคะแนน สรุปผลการฝึกสมาธิ และเก็บบันทึกประวัติการเล่น"
      }
    ],
    result: "The Solution: อุปกรณ์ฝึกสมาธิในรูปแบบ rhythm game ที่สนุกพอให้ผู้ใช้กลับมาฝึกต่อเนื่องและเห็นพัฒนาการได้จากสถิติการเล่น\nImpact: ได้ฝึกทั้ง embedded, web integration และ product thinking ในโปรเจกต์เดียว สร้างประสบการณ์ทำงานกับ hardware จริงและการ sync ข้อมูลระหว่าง physical device กับ web app",
    gallery: [
      "/images/Project/Synchro/preview-gallery.png",
      "/images/Project/Synchro/SYNCHROPoster.png",
      "/images/Project/Synchro/synchrobox.jpg",
      "/images/Project/Synchro/preview_and_gallery.png",
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
    tags: ["Unity", "Illustrator", "NSC 24", "Visual Novel", "Cyber Law"],
    techStack: ["Unity", "Adobe Illustrator", "Adobe Photoshop", "Procreate", "C#"],
    summary: "โปรแกรมส่งเสริมทักษะการเรียนรู้เรื่อง พ.ร.บ. คอมพิวเตอร์ ปี 60 และกฎหมายการฉ้อโกงในรูปแบบเกม Chat Visual Novel 2D ส่งเข้าประกวดการแข่งขันพัฒนาโปรแกรมคอมพิวเตอร์แห่งประเทศไทย (NSC 24)",
    problem: "สื่อการเรียนรู้กฎหมายมักมีความน่าเบื่อ ทำให้เยาวชนไม่สนใจศึกษาจนตกเป็นเหยื่อของมิจฉาชีพทางไซเบอร์",
    process: "ค้นคว้าข้อมูลกฎหมาย พ.ร.บ. คอมพิวเตอร์ -> ออกแบบตัวละครและฉาก 2D -> พัฒนาระบบแชทสืบคดีและระบบเลือกทางแยก (Branching Storyline) -> ทดสอบและประเมินผลการเรียนรู้",
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
    tags: ["Unity", "Procreate", "NSC 25", "Forensics", "Detective RPG"],
    techStack: ["Unity", "Procreate", "C#"],
    summary: "โปรแกรมสวมบทบาทการทำงานของตำรวจพิสูจน์หลักฐานและสืบสวน เพื่อสอบสวนหาความจริงโดยยึดหลักนิติธรรมและความเป็นธรรมแก่ผู้ต้องหา ส่งเข้าประกวดการแข่งขัน NSC 25",
    problem: "ปัญหามิจฉาทิฐิหรือการปฏิบัติที่ไม่เหมาะสมของเจ้าหน้าที่ต่อผู้ต้องหาในชีวิตจริง และการขาดความรู้ความเข้าใจเกี่ยวกับกระบวนการพิสูจน์หลักฐานทางนิติวิทยาศาสตร์",
    process: "เขียนบทคดีธุรกิจ -> ออกแบบตัวละคร 2D ใน Procreate -> พัฒนามินิเกม (ตรวจรอยนิ้วมือ, ตรวจกรุ๊ปเลือด) -> สรุปคดีและตัดสินผู้กระทำความผิดตามหลักฐาน",
    result: "The Solution: สร้างเกมที่จำลองสถานการณ์ความกดดันในการทำคดี แต่เน้นให้ผู้เล่นยึดหลักจริยธรรมและวิทยาศาสตร์พิสูจน์หลักฐาน\nImpact: สร้างแรงบันดาลใจและให้ความรู้เกี่ยวกับการทำงานที่ถูกต้องในสายงานนิติวิทยาศาสตร์และตำรวจแก่เยาวชน",
    gallery: [
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/preview-gallery.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/27.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/30.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/32.png",
      "/images/Project/%E0%B8%AB%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%A5%E0%B8%B6%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%88%E0%B8%B4%E0%B8%95%E0%B9%83%E0%B8%88%20(Criminal%20Minds)/34.png",
    ],
  }
];
