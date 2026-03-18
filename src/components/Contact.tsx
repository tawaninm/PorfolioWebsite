"use client";

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaDribbble } from "react-icons/fa";

/* ---- Fade-in wrapper ---- */
function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden gradient-sunset">
      {/* Background decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-[10%] w-48 h-48 rounded-full bg-peach/20 blur-3xl"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-[10%] w-56 h-56 rounded-full bg-lavender/30 blur-[100px]"
          animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        {/* ---- Left Column: Text & Socials ---- */}
        <FadeSection className="flex flex-col text-center lg:text-left">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-dark-navy drop-shadow-sm leading-tight">
            <span className="gradient-text drop-shadow-none bg-clip-text text-transparent bg-gradient-to-r from-dark-navy via-deep-purple to-electric-blue">Let's Create Something</span>
            <br className="hidden md:block" />
            <span className="text-soft-white drop-shadow-md"> Amazing Together!</span>
          </h2>
          
          <p className="font-body text-dark-navy/80 text-lg max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
            Whether you have a wild idea, need a fresh redesign, or just want to chat about retro aesthetics, my inbox is always open.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <SocialLink href="https://github.com" icon={<FiGithub size={24} />} label="GitHub" />
            <SocialLink href="https://linkedin.com" icon={<FiLinkedin size={24} />} label="LinkedIn" />
            <SocialLink href="https://dribbble.com" icon={<FaDribbble size={24} />} label="Dribbble" />
            <SocialLink href="mailto:hello@example.com" icon={<FiMail size={24} />} label="Email" />
          </div>
        </FadeSection>

        {/* ---- Right Column: Retro Postcard Form ---- */}
        <FadeSection delay={0.2} className="w-full max-w-md mx-auto lg:ml-auto">
          <div className="relative glass p-8 md:p-10 rounded-[20px] shadow-[0_20px_60px_rgba(45,27,78,0.15)] transform rotate-1 hover:rotate-0 transition-transform duration-500 border border-soft-white/40 bg-soft-white/60 backdrop-blur-xl">
            {/* Postmark / Stamp decoration */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-40 pointer-events-none select-none flex flex-col items-center">
               <div className="w-12 h-16 border-2 border-dashed border-dark-navy/30 rounded flex items-center justify-center p-1">
                 <span className="text-[10px] uppercase font-bold text-center text-dark-navy/50 leading-tight">Place<br/>Stamp<br/>Here</span>
               </div>
               <div className="mt-2 w-16 h-16 border-4 border-double border-coral-red/30 rounded-full flex items-center justify-center rotate-[-15deg]">
                 <span className="text-[10px] font-bold text-coral-red/40 uppercase whitespace-nowrap">City Pop Mail</span>
               </div>
            </div>

            <form className="flex flex-col gap-5 mt-4 md:mt-0 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-5 py-3 rounded-full bg-lavender/20 border border-lavender/40 text-dark-navy placeholder:text-dark-navy/50 font-body outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-3 rounded-full bg-lavender/20 border border-lavender/40 text-dark-navy placeholder:text-dark-navy/50 font-body outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full px-5 py-4 rounded-3xl bg-lavender/20 border border-lavender/40 text-dark-navy placeholder:text-dark-navy/50 font-body outline-none focus:ring-2 focus:ring-electric-blue/50 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 bg-hot-pink text-soft-white font-body font-bold text-lg rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,96,144,0.6)] focus:outline-none focus:ring-4 focus:ring-hot-pink/30 flex items-center justify-center gap-2"
              >
                Send Message
                <span className="text-xl leading-none mb-[2px]">✉</span>
              </button>
            </form>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

/* ---- Social Link Component ---- */
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-14 h-14 rounded-full bg-soft-white/40 border border-soft-white/60 flex items-center justify-center text-dark-navy backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-electric-blue hover:text-soft-white hover:border-transparent hover:shadow-[0_0_20px_rgba(80,128,240,0.6)]"
    >
      {icon}
    </a>
  );
}
