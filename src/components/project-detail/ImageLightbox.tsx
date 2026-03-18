"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.2 },
  },
};

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", handleKey);
    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-dark-navy/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-soft-white/10 border border-soft-white/20 flex items-center justify-center text-soft-white hover:bg-hot-pink/30 transition-colors duration-200"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Image counter */}
          <span className="absolute top-6 left-6 z-10 font-body text-sm text-soft-white/60">
            {currentIndex + 1} / {images.length}
          </span>

          {/* Previous arrow */}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-soft-white/10 border border-soft-white/20 flex items-center justify-center text-soft-white text-xl hover:bg-hot-pink/30 hover:shadow-[0_0_20px_rgba(255,96,144,0.3)] transition-all duration-200"
              aria-label="Previous image"
            >
              ←
            </button>
          )}

          {/* Next arrow */}
          {hasNext && (
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-soft-white/10 border border-soft-white/20 flex items-center justify-center text-soft-white text-xl hover:bg-hot-pink/30 hover:shadow-[0_0_20px_rgba(255,96,144,0.3)] transition-all duration-200"
              aria-label="Next image"
            >
              →
            </button>
          )}

          {/* Image display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative z-10 w-[90vw] max-w-4xl aspect-video rounded-2xl overflow-hidden bg-deep-purple/40"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Placeholder — swap with next/image when real images are added */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lavender/20 to-sakura-pink/10">
                <div className="text-center">
                  <span className="font-display text-5xl text-soft-white/30 block mb-2">
                    ✦
                  </span>
                  <span className="font-body text-sm text-soft-white/40">
                    Screenshot {currentIndex + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
