"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Sparkles = dynamic(() => import("./Sparkles"), { ssr: false });

export default function Hero() {
  const titleText = "Crafting Playful & Innovative Digital Experiences";
  const titleWords = titleText.split(" ");

  // Stagger variants for the words
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2, // Wait for Sparkles to init
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
    <section id="home" className="relative min-h-screen gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Particles */}
      <Sparkles />

      <div className="mx-auto max-w-7xl w-full px-6 py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Typography & CTA (60% width on lg) */}
        <motion.div 
          className="col-span-1 lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Greeting */}
          <motion.span 
            variants={wordVariants}
            className="font-body text-xl md:text-2xl font-bold text-deep-purple mb-4"
          >
            Hello, I'm [Your Name] 👋
          </motion.span>

          {/* Kinetic Typography Title */}
          <motion.h1 
            className="font-display text-5xl md:text-7xl lg:text-[80px] leading-[1.1] mb-6 tracking-wide drop-shadow-xl text-shadow-glow"
          >
            {titleWords.map((word, index) => (
              <motion.span 
                key={index} 
                className="inline-block mr-3 md:mr-5 text-dark-navy"
                variants={wordVariants}
              >
                {/* Add gradient to specific words like "Playful" and "Innovative" */}
                {["Playful", "Innovative", "Digital"].includes(word.replace("&", "")) ? (
                  <span className="gradient-text drop-shadow-none">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>

          {/* Role Badge */}
          <motion.div 
            variants={wordVariants}
            className="inline-block px-6 py-2 rounded-full bg-lavender/40 border border-lavender/60 backdrop-blur-sm mb-6"
          >
            <span className="font-body text-sm font-bold tracking-wider text-dark-navy uppercase">
              X+ Years / UX Designer · Programmer · CI Artist
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            variants={wordVariants}
            className="font-body text-lg md:text-xl text-dark-navy/80 max-w-md mb-10 leading-relaxed"
          >
            I blend thoughtful UX, clean code, and city pop aesthetics to build 
            digital products that feel alive. Welcome to my creative universe.
          </motion.p>

          {/* CTA Box / Buttons */}
          <motion.div 
            variants={wordVariants}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a 
              href="#works"
              className="inline-block px-8 py-3.5 bg-hot-pink text-soft-white font-body font-bold rounded-full text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,96,144,0.5)]"
            >
              View My Work
            </a>
            <a 
              href="#contact"
              className="inline-block px-8 py-3.5 bg-transparent text-electric-blue font-body font-bold rounded-full text-base transition-all duration-300 border-2 border-electric-blue hover:bg-electric-blue/10 hover:shadow-[0_0_20px_rgba(80,128,240,0.3)]"
            >
              Let's Talk
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Illustration Area (40% width on lg) */}
        <motion.div 
          className="col-span-1 lg:col-span-5 h-full w-full flex items-center justify-center relative mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-md aspect-square md:aspect-[4/5] glass rounded-[40px] border-2 border-soft-white/30 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(192,128,232,0.3)] glow-pink"
          >
             {/* Decorative background shapes for the empty container */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-cyan rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sakura-pink rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>

             <div className="relative z-10">
               <span className="font-display text-3xl text-hot-pink block mb-4">Space for Art ✦</span>
               <p className="font-body text-sm text-deep-purple/80">
                 Drop your city pop illustration in <br/>
                 <code className="text-xs font-mono bg-dark-navy/10 px-2 py-1 rounded">public/images/hero/</code>
               </p>
             </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="font-body text-xs font-bold tracking-widest text-deep-purple uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-deep-purple rounded-full flex justify-center p-1"
        >
          <motion.div 
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-deep-purple rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
