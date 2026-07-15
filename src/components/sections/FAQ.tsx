"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
      aria-label="Frequently asked questions"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-sky-blue mb-4">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
            Questions & Answers
          </h2>
          <p className="text-lg text-slate-500 mt-4">
            Answers you didn&apos;t know you needed.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                onClick={() => toggle(index)}
                className={cn(
                  "w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300",
                  "bg-white border",
                  openIndex === index
                    ? "border-sky-blue/20 shadow-[0_4px_20px_rgba(110,193,255,0.08)]"
                    : "border-slate-100 hover:border-slate-200 hover:shadow-sm"
                )}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base sm:text-lg font-semibold text-[#0f172a]">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : { rotate: openIndex === index ? 180 : 0 }
                    }
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 w-8 h-8 rounded-lg bg-[#f1f5f9] flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 0, height: 0 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, height: "auto" }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, height: 0 }
                      }
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-500 mt-4 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
