"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function TrophySVG({ onClick }: { onClick: () => void }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className="w-full h-full"
      onClick={onClick}
      role="img"
      aria-label="Trophy with wings"
    >
      <defs>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5A623" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#F5A623" />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EC1FF" />
          <stop offset="100%" stopColor="#4AA3E0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Trophy cup */}
      <path
        d="M80 65 L160 65 L155 130 Q120 155 85 130 Z"
        fill="url(#trophyGrad)"
        filter="url(#glow)"
      />
      {/* Trophy handles */}
      <path
        d="M80 80 Q55 80 55 105 Q55 125 75 125"
        fill="none"
        stroke="#D4900A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M160 80 Q185 80 185 105 Q185 125 165 125"
        fill="none"
        stroke="#D4900A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Trophy base */}
      <rect x="108" y="130" width="24" height="22" fill="#D4900A" rx="3" />
      <rect x="90" y="148" width="60" height="12" fill="#D4900A" rx="4" />
      {/* Star on trophy */}
      <polygon
        points="120,80 124,92 137,92 127,100 131,112 120,105 109,112 113,100 103,92 116,92"
        fill="#fff"
        opacity="0.95"
      />
      {/* Left wing */}
      <path
        d="M65 75 Q35 45 22 62 Q10 80 35 88 Q28 70 48 67 Q42 88 65 82"
        fill="url(#wingGrad)"
        opacity="0.9"
      />
      {/* Right wing */}
      <path
        d="M175 75 Q205 45 218 62 Q230 80 205 88 Q212 70 192 67 Q198 88 175 82"
        fill="url(#wingGrad)"
        opacity="0.9"
      />
      {/* Sparkles */}
      <circle cx="42" cy="52" r="3" fill="#F5A623" opacity="0.9" />
      <circle cx="198" cy="52" r="3" fill="#F5A623" opacity="0.9" />
      <circle cx="30" cy="70" r="2" fill="#6EC1FF" opacity="0.7" />
      <circle cx="210" cy="70" r="2" fill="#6EC1FF" opacity="0.7" />
      <circle cx="55" cy="40" r="2" fill="#fff" opacity="0.5" />
      <circle cx="185" cy="40" r="2" fill="#fff" opacity="0.5" />
    </svg>
  );
}

function DonationBoxSVG() {
  return (
    <svg viewBox="0 0 160 100" className="w-full h-full" role="img" aria-label="Donation box">
      <defs>
        <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EC1FF" />
          <stop offset="100%" stopColor="#4AA3E0" />
        </linearGradient>
      </defs>
      <rect x="20" y="30" width="120" height="60" rx="8" fill="url(#boxGrad)" />
      <path d="M20 30 L35 18 L125 18 L140 30" fill="#4AA3E0" stroke="#3590C0" strokeWidth="2" />
      <text x="55" y="68" fill="white" fontSize="22" fontWeight="bold" fontFamily="system-ui">$</text>
      <text x="80" y="68" fill="white" fontSize="22" fontWeight="bold" fontFamily="system-ui">$</text>
      <text x="68" y="85" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">$</text>
      <circle cx="60" cy="10" r="6" fill="#F5A623" stroke="#D4900A" strokeWidth="1.5" />
      <text x="58" y="13.5" fill="#D4900A" fontSize="7" fontWeight="bold" fontFamily="system-ui">$</text>
      <circle cx="90" cy="6" r="5" fill="#F5A623" stroke="#D4900A" strokeWidth="1.5" />
      <text x="88.5" y="9" fill="#D4900A" fontSize="6" fontWeight="bold" fontFamily="system-ui">$</text>
    </svg>
  );
}

export function Hero({ onDonate }: { onDonate: () => void }) {
  const [trophyClicks, setTrophyClicks] = useState(0);
  const [showUltraInstinct, setShowUltraInstinct] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms for different elements
  const trophyX = useTransform(smoothMouseX, (v) => v * 20);
  const trophyY = useTransform(smoothMouseY, (v) => v * 15);
  const boxX = useTransform(smoothMouseX, (v) => v * -10);
  const boxY = useTransform(smoothMouseY, (v) => v * -8);
  const headingX = useTransform(smoothMouseX, (v) => v * 5);
  const headingY = useTransform(smoothMouseY, (v) => v * 3);
  const badgeX = useTransform(smoothMouseX, (v) => v * -8);
  const badgeY = useTransform(smoothMouseY, (v) => v * -6);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTrophyClick = () => {
    const newCount = trophyClicks + 1;
    setTrophyClicks(newCount);
    if (newCount >= 5) {
      setShowUltraInstinct(true);
      setTrophyClicks(0);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-navy"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-sky-blue/[0.07] blur-[100px]"
          style={{ x: useTransform(smoothMouseX, (v) => v * -30), y: useTransform(smoothMouseY, (v) => v * -20) }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gold/[0.05] blur-[120px]"
          style={{ x: useTransform(smoothMouseX, (v) => v * 25), y: useTransform(smoothMouseY, (v) => v * 18) }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-sky-blue/[0.04] blur-[80px]"
          style={{ x: useTransform(smoothMouseX, (v) => v * -15), y: useTransform(smoothMouseY, (v) => v * -12) }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: badgeX, y: badgeY }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card mb-8">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-xs font-semibold tracking-widest uppercase text-white/70">
                  #1 Fake Campaign
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold leading-[1.05] tracking-tight mb-8"
              style={{ x: headingX, y: headingY }}
            >
              <span className="text-white">Save</span>
              <br />
              <span className="text-gradient-hero">Argentina</span>
              <br />
              <span className="text-white/90">Before It&apos;s Too Late</span>
              <span className="ml-3 inline-block" role="img" aria-label="Argentina flag">
                🇦🇷
              </span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-white/50 mb-10 max-w-lg leading-relaxed"
            >
              Scientists estimate Argentina&apos;s semifinal victory chance increases by
              0.0000001% for every meme donation.*
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={onDonate}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-sky-blue text-navy font-bold text-base transition-all duration-300 hover:bg-sky-blue/90 hover:shadow-[0_0_40px_rgba(110,193,255,0.3)]"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                Donate For Messi
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.a
                href="#expenses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white/70 font-medium text-base border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              >
                See Where Your Money Goes
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xs text-white/20 mt-8"
            >
              *This is a satirical website. No real money is collected.
            </motion.p>
          </div>

          {/* Right: Illustration */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            <div className="relative">
              {/* Glow behind trophy */}
              <div className="absolute inset-0 -m-16 rounded-full bg-gold/10 blur-[60px] animate-pulse-glow" />
              <motion.div
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem] cursor-pointer"
                style={{ x: trophyX, y: trophyY }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : { y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
                }
              >
                <TrophySVG onClick={handleTrophyClick} />
              </motion.div>
            </div>
            <motion.div
              className="w-44 h-30 sm:w-52 sm:h-36 mt-4"
              style={{ x: boxX, y: boxY }}
              animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
              transition={
                prefersReducedMotion
                  ? {}
                  : { y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }
              }
            >
              <DonationBoxSVG />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Ultra Instinct Easter Egg */}
      {showUltraInstinct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={() => setShowUltraInstinct(false)}
          role="dialog"
          aria-label="Easter egg message"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="text-center p-16 rounded-[2rem] glass-dark border border-sky-blue/20 max-w-lg mx-4"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      textShadow: [
                        "0 0 30px rgba(110,193,255,0.5)",
                        "0 0 80px rgba(245,166,35,0.5)",
                        "0 0 30px rgba(110,193,255,0.5)",
                      ],
                    }
              }
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-5xl sm:text-6xl font-bold text-gradient-hero mb-6"
            >
              ULTRA INSTINCT
            </motion.div>
            <p className="text-xl text-white/70 mb-2">
              Messi unlocked Ultra Instinct.
            </p>
            <p className="text-sm text-white/30 mt-6">Click anywhere to dismiss</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
