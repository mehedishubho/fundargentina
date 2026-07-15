"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { donationCards } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconPaths: Record<number, string> = {
  5: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
  10: "M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3",
  25: "M23 6l-9.5 9.5-5-5L1 18",
  50: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
  100: "M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 110-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 100-5C13 2 12 7 12 7z",
  500: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

function DonationCard({
  card,
  index,
  selected,
  onSelect,
  prefersReducedMotion,
}: {
  card: (typeof donationCards)[number];
  index: number;
  selected: boolean;
  onSelect: (amount: number) => void;
  prefersReducedMotion: boolean;
}) {
  const cardRef = useState<HTMLButtonElement | null>(null)[1];
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), springConfig);
  const spotlightX = useTransform(mouseX, (v) => v * 100);
  const spotlightY = useTransform(mouseY, (v) => v * 100);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.button
      ref={cardRef}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={
        prefersReducedMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
      }
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onClick={() => onSelect(card.amount)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative text-left p-6 sm:p-7 rounded-2xl transition-all duration-500 group overflow-hidden",
        "bg-white border",
        selected
          ? "border-sky-blue shadow-[0_8px_30px_rgba(110,193,255,0.15)] ring-1 ring-sky-blue/20"
          : "border-slate-100 shadow-sm hover:border-sky-blue/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      )}
      aria-pressed={selected}
    >
      {/* Spotlight effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 300px at ${spotlightX.get()}% ${spotlightY.get()}%, rgba(110,193,255,0.06), transparent)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={card.title}>
              {card.emoji}
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center group-hover:bg-sky-blue/10 transition-colors duration-300">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-sky-blue"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={iconPaths[card.amount]} />
              </svg>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
              ${card.amount}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-[#0f172a] mb-1">{card.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>

        {/* Subtle hover indicator */}
        <div
          className={cn(
            "absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-500",
            selected ? "bg-sky-blue opacity-100" : "bg-sky-blue opacity-0 group-hover:opacity-40"
          )}
        />
      </div>
    </motion.button>
  );
}

export function DonationCards({ onSelect }: { onSelect: (amount: number) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSelect = (amount: number) => {
    setSelected(amount);
    onSelect(amount);
  };

  return (
    <section
      id="donate"
      className="relative py-24 sm:py-32 bg-[#f8fafc] overflow-hidden"
      aria-label="Donation options"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-sky-blue mb-4">
            Choose Your Impact
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
            Every Dollar Helps
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-lg mx-auto">
            Every donation makes absolutely no difference. Pick the one that speaks to your soul.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 perspective-[1000px]">
          {donationCards.map((card, index) => (
            <DonationCard
              key={card.amount}
              card={card}
              index={index}
              selected={selected === card.amount}
              onSelect={handleSelect}
              prefersReducedMotion={prefersReducedMotion ?? false}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-xs text-slate-400 mt-10"
        >
          *This is satire. No real donations are being processed.
        </motion.p>
      </div>
    </section>
  );
}
