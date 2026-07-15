"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function FallingFootball({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      initial={{ y: -60, x, opacity: 0 }}
      animate={{ y: "110vh", opacity: [0, 0.8, 0.8, 0] }}
      transition={{
        duration: 3.5 + Math.random() * 2,
        delay,
        ease: "linear",
      }}
      className="absolute text-3xl"
      aria-hidden="true"
    >
      ⚽
    </motion.div>
  );
}

export function KonamiCodeEasterEgg() {
  const [isActive, setIsActive] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const KONAMI_SEQUENCE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  const activate = useCallback(() => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 5000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const expectedKey = KONAMI_SEQUENCE[sequence.length];
      if (event.key === expectedKey) {
        const newSequence = [...sequence, event.key];
        if (newSequence.length === KONAMI_SEQUENCE.length) {
          activate();
          setSequence([]);
        } else {
          setSequence(newSequence);
        }
      } else {
        setSequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, activate]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[80] overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 35 }).map((_, i) => (
            <FallingFootball
              key={i}
              delay={i * 0.12}
              x={Math.random() * 100}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
