"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CursorGlow() {
  const [isDesktop, setIsDesktop] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, reducedMotion, mouseX, mouseY]);

  if (!isDesktop || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 mix-blend-screen"
      style={{
        x,
        y,
        background:
          "radial-gradient(circle, rgba(110,193,255,0.15) 0%, rgba(110,193,255,0.05) 40%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
