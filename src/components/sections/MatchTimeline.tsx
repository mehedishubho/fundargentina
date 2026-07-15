"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { matchTimeline } from "@/lib/data";
import { Trophy } from "lucide-react";

function formatMoney(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${amount.toLocaleString()}`;
}

function TimelineNode({
  item,
  index,
  isLeft,
  prefersReducedMotion,
}: {
  item: (typeof matchTimeline)[number];
  index: number;
  isLeft: boolean;
  prefersReducedMotion: boolean;
}) {
  const isUpcoming = item.status === "upcoming";
  const isFinal = item.stage === "FINAL";

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex items-center w-full ${
        isLeft ? "justify-start" : "justify-end"
      } mb-12 last:mb-0`}
    >
      {/* Card */}
      <motion.div
        whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -4 }}
        transition={{ duration: 0.3 }}
        className={`relative w-full rounded-2xl p-6 border transition-all duration-300 ${
          isFinal && isUpcoming
            ? "max-w-lg bg-gradient-to-br from-gold/20 via-white to-gold/20 border-gold/40 shadow-[0_0_60px_rgba(245,166,35,0.2)]"
            : isUpcoming
            ? "max-w-md bg-gradient-to-br from-sky-blue/10 to-gold/10 border-sky-blue/30 shadow-[0_0_30px_rgba(110,193,255,0.15)]"
            : "max-w-md bg-white border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-sky-blue/20"
        }`}
      >
        {/* Stage badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isFinal
                ? "bg-gradient-to-r from-gold to-amber-400 text-navy"
                : isUpcoming
                ? "bg-sky-blue/20 text-sky-blue"
                : "bg-navy/5 text-navy"
            }`}
          >
            {isFinal && <Trophy className="w-3 h-3" />}
            {item.stage}
          </span>
          {isUpcoming && (
            <motion.div
              animate={prefersReducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full"
            >
              {isFinal ? "MATCH DAY" : "UPCOMING"}
            </motion.div>
          )}
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.span
              whileHover={prefersReducedMotion ? {} : { scale: 1.2, rotate: [0, -10, 10, 0] }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                isFinal ? "bg-gold/30" : isUpcoming ? "bg-gold/20" : "bg-[#f1f5f9]"
              }`}
            >
              {item.emoji}
            </motion.span>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-sky-blue">
                {item.date}
              </span>
              <p className={`font-bold mt-0.5 ${isFinal ? "text-lg text-navy" : "text-base text-slate-600"}`}>
                Argentina vs {item.opponent}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-500">Result</span>
            <span
              className={`font-bold ${isFinal ? "text-xl" : "text-lg"} ${
                isUpcoming
                  ? "text-gold"
                  : item.result.includes("W") || !item.result.includes("L")
                  ? "text-emerald-600"
                  : "text-red-500"
              }`}
            >
              {item.result}
            </span>
          </div>
          {!isUpcoming && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">Money Sent</span>
              <span className={`font-bold text-sky-blue ${isFinal ? "text-xl" : "text-lg"}`}>
                {formatMoney(item.moneySpent)}
              </span>
            </div>
          )}
        </div>

        <div className={`pt-4 border-t ${isFinal ? "border-gold/20" : "border-slate-100"}`}>
          <p className={`text-sm ${isFinal ? "text-navy font-medium" : "text-slate-500 italic"}`}>
            {isUpcoming ? (
              <span className="text-gold font-medium not-italic">
                {isFinal ? "The ultimate showdown — every donation counts!" : "Donate now to help Argentina prepare!"}
              </span>
            ) : (
              item.purpose
            )}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MatchTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const totalSpent = matchTimeline
    .filter((m) => m.status === "completed")
    .reduce((sum, m) => sum + m.moneySpent, 0);

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
      aria-label="Match timeline"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-sky-blue mb-4">
            Match-by-Match Spending
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
            The Bribes That Got Us Here
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-lg mx-auto">
            Every match, every lucky charm, every donation — tracked for full transparency.
          </p>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-4 mt-8 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm"
          >
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-sky-blue">{formatMoney(totalSpent)}</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Matches</p>
              <p className="text-2xl font-bold text-navy">
                {matchTimeline.filter((m) => m.status === "completed").length}/{matchTimeline.length}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-blue/30 via-sky-blue/20 to-sky-blue/10" />

          {/* Center line - mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-blue/30 via-sky-blue/20 to-sky-blue/10" />

          {matchTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={item.matchday} className="relative">
                {/* Dot on line - desktop */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 z-10 ${
                    item.status === "upcoming"
                      ? "bg-gold border-gold shadow-[0_0_12px_rgba(245,166,35,0.5)]"
                      : "bg-sky-blue border-sky-blue shadow-[0_0_12px_rgba(110,193,255,0.5)]"
                  }`}
                />

                {/* Dot on line - mobile */}
                <motion.div
                  initial={prefersReducedMotion ? {} : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`lg:hidden absolute left-8 -translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 z-10 ${
                    item.status === "upcoming"
                      ? "bg-gold border-gold shadow-[0_0_12px_rgba(245,166,35,0.5)]"
                      : "bg-sky-blue border-sky-blue shadow-[0_0_12px_rgba(110,193,255,0.5)]"
                  }`}
                />

                {/* Desktop layout */}
                <div className="hidden lg:flex w-full">
                  {isLeft ? (
                    <>
                      <div className="w-1/2 pr-12">
                        <TimelineNode
                          item={item}
                          index={index}
                          isLeft={true}
                          prefersReducedMotion={prefersReducedMotion ?? false}
                        />
                      </div>
                      <div className="w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="w-1/2" />
                      <div className="w-1/2 pl-12">
                        <TimelineNode
                          item={item}
                          index={index}
                          isLeft={false}
                          prefersReducedMotion={prefersReducedMotion ?? false}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden pl-16">
                  <TimelineNode
                    item={item}
                    index={index}
                    isLeft={false}
                    prefersReducedMotion={prefersReducedMotion ?? false}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary footer */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-400 italic">
            *All amounts are 100% fictional. No referees were harmed (or bribed) in the making of this campaign.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
