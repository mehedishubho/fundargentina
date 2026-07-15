"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingItem {
  emoji: string;
  x: string;
  y: string;
  size: string;
  delay: number;
  duration: number;
}

const items: FloatingItem[] = [
  { emoji: "⚽", x: "8%", y: "18%", size: "text-xl", delay: 0, duration: 7 },
  { emoji: "🇦🇷", x: "88%", y: "12%", size: "text-lg", delay: 1.5, duration: 9 },
  { emoji: "⭐", x: "78%", y: "55%", size: "text-base", delay: 3, duration: 8 },
  { emoji: "⚽", x: "15%", y: "65%", size: "text-lg", delay: 0.8, duration: 10 },
  { emoji: "🇦🇷", x: "55%", y: "8%", size: "text-sm", delay: 2, duration: 7 },
  { emoji: "⭐", x: "92%", y: "35%", size: "text-sm", delay: 4, duration: 11 },
  { emoji: "⚽", x: "3%", y: "45%", size: "text-base", delay: 1, duration: 9 },
  { emoji: "🇦🇷", x: "62%", y: "78%", size: "text-lg", delay: 2.5, duration: 8 },
];

export function FloatingElements() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.size} opacity-0`}
          style={{ left: item.x, top: item.y }}
          animate={{
            opacity: [0, 0.15, 0.15, 0],
            y: [0, -25, -25, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}
