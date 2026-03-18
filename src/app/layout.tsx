import type { Metadata } from "next";
import { Righteous, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

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
      className={`${righteous.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-dark-navy text-soft-white flex flex-col min-h-screen">
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
