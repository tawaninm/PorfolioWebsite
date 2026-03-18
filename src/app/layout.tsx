import type { Metadata } from "next";
import { Righteous, DM_Sans, JetBrains_Mono, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import ThreeProvider from "@/components/ThreeProvider";

/* ---- Google Fonts via next/font ---- */
const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-righteous",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
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

/* ---- Root Layout ---- */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${righteous.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${zenMaruGothic.variable}`}
    >
      <body className="font-body antialiased bg-soft-white text-dark-navy dark:bg-space-navy dark:text-soft-white flex flex-col min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <MotionProvider>
            <ThreeProvider />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
