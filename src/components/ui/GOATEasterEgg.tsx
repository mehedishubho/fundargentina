"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function GOATEasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const showMessage = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length > 1) return;

      const newText = typedText + event.key;
      if (newText.toLowerCase().includes("goat")) {
        showMessage();
        setTypedText("");
      } else if (newText.length > 10) {
        setTypedText(newText.slice(-10));
      } else {
        setTypedText(newText);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedText, showMessage]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.85, y: 20 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.85, y: -20 }
          }
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="fixed bottom-8 right-8 z-[95] pointer-events-none"
          role="status"
          aria-live="polite"
        >
          <div className="glass-dark border border-white/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5">
            <span className="text-3xl" role="img" aria-label="GOAT">
              🐐
            </span>
            <div>
              <p className="font-bold text-base text-white">
                The GOAT has been summoned.
              </p>
              <p className="text-xs text-white/30 mt-0.5">
                Lionel Andrés Messi
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
