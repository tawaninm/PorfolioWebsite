"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  isStar: boolean;
  opacity: number;
}

export default function Sparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Determine particle count based on screen width
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 15 : 40;

    const newParticles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random x from 0-100%
      y: Math.random() * 100 + 10, // start slightly below top
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 20 + 20, // 20-40s upward float
      delay: Math.random() * -20, // Negative delay so they're visible immediately
      isStar: Math.random() > 0.7, // 30% are 4-point stars
      opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8 base opacity
    }));

    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => {
        const animateY = [p.y, -20];
        const animateX = [p.x, p.x + (Math.random() > 0.5 ? 5 : -5)];
        const pulseOpacity = [p.opacity, p.opacity + 0.3, p.opacity];

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full shadow-[0_0_10px_rgba(240,208,64,0.6)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.isStar ? "#FFF8F0" : "#F0D040", // soft-white for stars, retro-yellow for circles
              // Create a custom 4-point star shape using clip-path for stars
              clipPath: p.isStar
                ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" 
                : "none",
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: animateY,
              x: animateX,
              opacity: pulseOpacity,
            }}
            transition={{
              y: {
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay,
              },
              x: {
                duration: p.duration / 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: p.delay,
              },
              opacity: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
          />
        );
      })}
    </div>
  );
}
