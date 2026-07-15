"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";
import { activityFeedItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function ActivityFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activityFeedItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const item = activityFeedItems[currentIndex];

  return (
    <section className="relative py-16 sm:py-20 bg-white" aria-label="Live activity feed">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f1f5f9] border border-slate-100 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
              Live Activity
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] tracking-tight">
            People Are Donating Right Now
          </h2>
        </motion.div>

        <div className="relative h-20 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 25 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -25 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-4 rounded-2xl bg-[#f8fafc] border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-blue to-sky-blue-light flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div className="flex items-center gap-2 text-base sm:text-lg">
                  <span className="font-semibold text-[#0f172a]">
                    {item.name}
                  </span>
                  <span className="text-slate-400">{item.action}</span>
                  {item.amount && (
                    <span className="font-bold text-gold">
                      ${item.amount}
                    </span>
                  )}
                </div>
                <Zap className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-6" aria-hidden="true">
          {activityFeedItems.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-400",
                index === currentIndex
                  ? "bg-sky-blue w-6"
                  : "bg-slate-200 w-1.5"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
