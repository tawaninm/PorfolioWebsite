"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Sparkles = dynamic(() => import("./Sparkles"), { ssr: false });
const CardFlipGallery = dynamic(() => import("./CardFlipGallery"), { ssr: false });

/* ---- Comic decorative components ---- */

function SpeechBubble() {
  return (
    <motion.div
      className="absolute top-20 right-[6%] z-0 select-none pointer-events-none"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative bg-soft-white border-2 border-dark-navy rounded-2xl px-4 py-2 shadow-md">
        <span className="font-display text-sm text-dark-navy tracking-wide">Welcome! ✦</span>
        {/* Tail */}
        <div
          className="absolute -bottom-[10px] left-5 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "10px solid #1A1A2E",
          }}
        />
        <div
          className="absolute -bottom-[8px] left-[22px] w-0 h-0"
          style={{
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "8px solid #F4ECE4",
          }}
        />
      </div>
    </motion.div>
  );
}

function StarBurst({ size, top, left, right, bottom, rotate, delay }: {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate: number;
  delay: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="absolute z-0 pointer-events-none select-none"
      style={{ top, left, right, bottom }}
      animate={{ rotate: [rotate, rotate + 20, rotate], scale: [1, 1.12, 1] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <polygon
        points="50,5 61,35 95,35 68,57 79,91 50,68 21,91 32,57 5,35 39,35"
        fill="#F0D040"
        opacity={0.85}
      />
    </motion.svg>
  );
}

function SpeedLines() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute bottom-16 left-0 w-48 h-48 z-0 pointer-events-none select-none"
      style={{ opacity: 0.15 }}
      aria-hidden="true"
    >
      {[0, 12, 24, 36, 48, 60, 72, 84].map((_angle, i) => (
        <line
          key={i}
          x1="0"
          y1="200"
          x2={200 + i * 10}
          y2={200 - 150 - i * 15}
          stroke="#F4ECE4"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const titleText = "Crafting Playful & Innovative Digital Experiences";
  const titleWords = titleText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A3A5C 0%, #1C1C2E 100%)" }}
    >
      {/* Halftone dot overlay */}
      <div className="absolute inset-0 halftone-bg opacity-[0.05] pointer-events-none z-0" />

      {/* Background Particles */}
      <Sparkles />

      {/* Comic decorative elements */}
      <SpeechBubble />
      <StarBurst size={28} top="18%" left="5%" rotate={15} delay={0} />
      <StarBurst size={20} top="35%" right="3%" rotate={-10} delay={0.6} />
      <StarBurst size={16} bottom="28%" left="18%" rotate={30} delay={1} />
      <StarBurst size={24} top="65%" right="12%" rotate={-25} delay={0.3} />
      <SpeedLines />

      <div className="mx-auto max-w-7xl w-full px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Column */}
        <motion.div
          className="col-span-1 lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Greeting */}
          <motion.span
            variants={wordVariants}
            className="font-body text-xl md:text-2xl font-bold text-soft-white/90 mb-4"
          >
            Hello, I'm Tawan 👋
          </motion.span>

          {/* Kinetic Typography Title */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-[80px] leading-[1.1] mb-6 tracking-wide drop-shadow-xl"
          >
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-3 md:mr-5"
                variants={wordVariants}
              >
                {["Playful", "Innovative", "Digital"].includes(word.replace("&", "")) ? (
                  <span
                    className="drop-shadow-none"
                    style={{
                      background: "linear-gradient(90deg, #FF2D78, #F0D040, #5080F0)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {word}
                  </span>
                ) : (
                  <span className="text-soft-white">{word}</span>
                )}
              </motion.span>
            ))}
          </motion.h1>

          {/* Role Badge */}
          <motion.div
            variants={wordVariants}
            className="flex flex-col items-center lg:items-start gap-1 mb-6"
          >
            <div className="inline-block px-6 py-2 rounded-full bg-lavender/20 border border-lavender/40 backdrop-blur-sm">
              <span className="font-body text-sm font-bold tracking-wider text-soft-white uppercase">
                X+ Years / UX Designer · Programmer · CI Artist
              </span>
            </div>
            {/* Japanese subtitle */}
            <span className="font-zen text-sm text-muted-lilac tracking-widest mt-1">
              シティポップ ✦ デザイナー
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={wordVariants}
            className="font-body text-lg md:text-xl text-soft-white/70 max-w-md mb-10 leading-relaxed"
          >
            I blend thoughtful UX, clean code, and city pop aesthetics to build
            digital products that feel alive. Welcome to my creative universe.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={wordVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#works"
              className="inline-block px-8 py-3.5 bg-hot-pink text-soft-white font-body font-bold rounded-full text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,96,144,0.5)] hover:[animation:comic-shake_0.3s_ease_3]"
            >
              View My Work
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 bg-transparent text-electric-blue font-body font-bold rounded-full text-base transition-all duration-300 border-2 border-electric-blue hover:bg-electric-blue/10 hover:shadow-[0_0_20px_rgba(80,128,240,0.3)]"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-block px-8 py-3.5 bg-transparent text-soft-white/80 font-body font-bold rounded-full text-base transition-all duration-300 border border-soft-white/30 hover:border-soft-white/60 hover:text-soft-white"
            >
              Let's Talk
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="col-span-1 lg:col-span-5 h-full w-full flex items-center justify-center relative mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Experience badge */}
          <motion.div
            className="absolute -top-4 -left-4 z-20 px-4 py-2 bg-retro-yellow text-deep-black font-body font-bold text-sm rounded-lg border-2 border-dark-navy shadow-md"
            style={{ rotate: "-3deg" }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            X+ Years Experience
          </motion.div>

          <CardFlipGallery />
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="font-body text-xs font-bold tracking-widest text-soft-white/60 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-soft-white/50 rounded-full flex justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-soft-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
