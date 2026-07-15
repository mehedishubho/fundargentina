"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-gold fill-gold" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  prefersReducedMotion,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
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
      className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden"
    >
      {/* Spotlight effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 300px at ${mouseX.get() * 100}% ${mouseY.get() * 100}%, rgba(110,193,255,0.06), transparent)`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10">
        <Quote className="absolute top-5 right-5 w-7 h-7 text-sky-blue/10" aria-hidden="true" />

        <StarRating count={testimonial.stars} />

        <blockquote className="mt-4 mb-6">
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-blue to-sky-blue-light flex items-center justify-center text-white font-bold text-xs shrink-0">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-[#0f172a] text-sm">{testimonial.name}</div>
            <div className="text-xs text-slate-400">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 sm:py-32 bg-[#f8fafc] overflow-hidden"
      aria-label="Testimonials"
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
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#0f172a] tracking-tight">
            What Supporters Say
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-md mx-auto">
            100% real testimonials from definitely real people.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 perspective-[1000px]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              prefersReducedMotion={prefersReducedMotion ?? false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
