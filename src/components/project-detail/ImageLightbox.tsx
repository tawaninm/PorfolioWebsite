"use client";

import { useEffect, useCallback, useRef } from "react";
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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  /* Touch swipe */
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // swipe horizontal ชัดกว่า vertical
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Close button — top right, large tap target */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-soft-white/10 border border-soft-white/20 flex items-center justify-center text-soft-white text-lg hover:bg-hot-pink/30 active:bg-hot-pink/50 transition-colors duration-200"
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {/* Image counter */}
          <span className="absolute top-5 left-5 z-20 font-body text-sm text-soft-white/70 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </span>

          {/* ── Tap zones (left/right half) for mobile ── */}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute left-0 top-0 h-full w-1/2 z-10 focus:outline-none"
              aria-label="Previous image"
            />
          )}
          {hasNext && (
            <button
              onClick={goNext}
              className="absolute right-0 top-0 h-full w-1/2 z-10 focus:outline-none"
              aria-label="Next image"
            />
          )}

          {/* ── Arrow buttons (visible, large) ── */}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute left-3 md:left-6 z-20 w-14 h-14 rounded-full bg-black/50 border border-soft-white/20 flex items-center justify-center text-soft-white text-2xl hover:bg-hot-pink/40 active:bg-hot-pink/60 hover:shadow-[0_0_20px_rgba(255,96,144,0.4)] transition-all duration-200 select-none"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}
          {hasNext && (
            <button
              onClick={goNext}
              className="absolute right-3 md:right-6 z-20 w-14 h-14 rounded-full bg-black/50 border border-soft-white/20 flex items-center justify-center text-soft-white text-2xl hover:bg-hot-pink/40 active:bg-hot-pink/60 hover:shadow-[0_0_20px_rgba(255,96,144,0.4)] transition-all duration-200 select-none"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Swipe hint on mobile */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 font-body text-xs text-soft-white/30 md:hidden pointer-events-none">
            ← swipe →
          </p>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative z-10 w-[88vw] max-w-5xl max-h-[82vh] rounded-2xl overflow-hidden flex items-center justify-center pointer-events-none"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[currentIndex]}
                alt={`Screenshot ${currentIndex + 1}`}
                className="max-w-full max-h-[82vh] w-auto h-auto rounded-2xl object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
