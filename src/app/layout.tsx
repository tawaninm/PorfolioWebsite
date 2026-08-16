import type { Metadata, Viewport } from "next";
import { Mitr, Prompt, JetBrains_Mono, Zen_Maru_Gothic } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import ThreeProvider from "@/components/ThreeProvider";
import WelcomeBurst from "@/components/WelcomeBurst";
import ScrollSpeedLines from "@/components/ScrollSpeedLines";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import CustomCursor from "@/components/CustomCursor";
import ChibiMascot from "@/components/ChibiMascot";

/* ---- Google Fonts via next/font ----
   Thai + Latin support: Mitr (display, rounded retro) + Prompt (body).
   Zen Maru Gothic stays for Japanese labels; JetBrains Mono for code. */
const mitr = Mitr({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mitr",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-prompt",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

/* ---- Metadata ---- */
export const metadata: Metadata = {
  title: "Portfolio | UX/UI Designer · Programmer · CI Artist",
  description:
    "City pop retro portfolio — UX/UI design, programming, and corporate identity art. Built with Next.js, Tailwind CSS, and Framer Motion.",
};

// Ensure proper mobile viewport so the site doesn't render as a tiny desktop page.
// NOTE: maximumScale intentionally omitted — blocking pinch-zoom breaks WCAG 1.4.4.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ---- Root Layout ---- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${mitr.variable} ${prompt.variable} ${jetbrainsMono.variable} ${zenMaruGothic.variable}`}
      >
        {/* Inline theme bootstrap — prevents light-mode flash (FOUC) for dark users.
            Mirrors next-themes resolution: stored theme, else system preference. */}
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var e=localStorage.getItem("theme");var d=e==="dark"||(!e&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d)}catch(x){}})()`,
            }}
          />
        </head>
        <body className="font-body antialiased bg-soft-white text-dark-navy dark:bg-space-navy dark:text-soft-white flex flex-col min-h-screen transition-colors duration-300">
          <ThemeProvider>
          <MotionProvider>
            <ThreeProvider />
            <WelcomeBurst />
            <ScrollSpeedLines />
            {/* Neon scroll progress bar — CSS scroll-driven, zero JS */}
            <div
              aria-hidden="true"
              className="scroll-progress-bar fixed top-0 left-0 right-0 h-[3px] z-[80] bg-gradient-to-r from-neon-magenta via-electric-blue to-neon-teal"
            />
            <Navbar />
              <div className="flex-grow">
                  {children}
                </div>
                <Footer />
                <KonamiEasterEgg />
                <CustomCursor />
                <ChibiMascot />
            </MotionProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
