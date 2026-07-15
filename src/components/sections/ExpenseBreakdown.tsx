"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { expenses } from "@/lib/data";

function ExpenseCard({
  expense,
  index,
  inView,
  prefersReducedMotion,
}: {
  expense: (typeof expenses)[number];
  index: number;
  inView: boolean;
  prefersReducedMotion: boolean;
}) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), springConfig);

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
    <motion.div
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-sky-blue/20 transition-all duration-500"
    >
      <div className="flex items-start justify-between mb-5">
        <motion.div
          whileHover={
            prefersReducedMotion ? {} : { scale: 1.15, rotate: [0, -5, 5, 0] }
          }
          transition={{ duration: 0.3 }}
          className="w-14 h-14 rounded-2xl bg-[#f1f5f9] flex items-center justify-center text-3xl group-hover:bg-sky-blue/10 transition-colors duration-300"
        >
          {expense.emoji}
        </motion.div>
        <span className="text-3xl font-bold text-sky-blue tracking-tight">
          {expense.percentage}%
        </span>
      </div>

      <h3 className="text-base font-bold text-[#0f172a] mb-4">{expense.label}</h3>

      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${expense.percentage}%` } : { width: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 1.2,
                  delay: 0.4 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="h-full rounded-full"
          style={{
            background:
              expense.percentage >= 20
                ? "linear-gradient(90deg, #6EC1FF, #a3d9ff)"
                : "linear-gradient(90deg, #F5A623, #ffd080)",
          }}
        />
      </div>
    </motion.div>
  );
}

export function ExpenseBreakdown() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="expenses"
      ref={ref}
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
      aria-label="Expense breakdown"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-sky-blue mb-4">
            Full Transparency
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
            Where Your Donation Goes
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-md mx-auto">
            100% transparency. 0% actual accountability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 perspective-[1000px]">
          {expenses.map((expense, index) => (
            <ExpenseCard
              key={expense.label}
              expense={expense}
              index={index}
              inView={inView}
              prefersReducedMotion={prefersReducedMotion ?? false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
