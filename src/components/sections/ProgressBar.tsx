"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Users, Share2, Heart } from "lucide-react";

const GOAL = 10_000_000;
const RAISED = 8_734_920;
const DONORS = 42_069;
const SHARES = 12_345;
const SUPPORTERS = 88_888;
const PROGRESS_PERCENT = (RAISED / GOAL) * 100;

function AnimatedCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCurrent(target);
      return;
    }

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const tick = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (now < endTime) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target, duration, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="progress"
      ref={ref}
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
      aria-label="Fundraising progress"
    >
      {/* Subtle top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-blue/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-sky-blue mb-4">
            Campaign Progress
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
            We&apos;re Almost There
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-md mx-auto">
            Getting dangerously close to our completely fictional goal.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-14"
        >
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
              <AnimatedCounter target={RAISED} prefix="$" />
            </span>
            <span className="text-base text-slate-400 font-medium">
              of <AnimatedCounter target={GOAL} prefix="$" />
            </span>
          </div>

          <div className="relative h-3 sm:h-4 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${PROGRESS_PERCENT}%` } : { width: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }
              }
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #6EC1FF 0%, #a3d9ff 60%, #F5A623 100%)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: prefersReducedMotion ? 0 : 2.6, duration: 0.4 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 mr-1"
            >
              <span className="text-[10px] font-bold text-navy bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                <AnimatedCounter
                  target={PROGRESS_PERCENT}
                  suffix="%"
                  duration={1.5}
                />
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-3 sm:gap-6"
        >
          {[
            { icon: Users, value: DONORS, label: "Donors", color: "text-sky-blue" },
            { icon: Share2, value: SHARES, label: "Shares", color: "text-gold" },
            { icon: Heart, value: SUPPORTERS, label: "Supporters", color: "text-sky-blue" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 sm:p-7 rounded-2xl bg-[#f8fafc] border border-slate-100"
            >
              <stat.icon
                className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} mx-auto mb-3`}
              />
              <div className="text-xl sm:text-3xl font-bold text-[#0f172a] tracking-tight">
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
