"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar({ onDonate }: { onDonate?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <span className="text-xl" role="img" aria-label="Argentina flag">
              🇦🇷
            </span>
            <span className="text-base font-bold text-white tracking-tight">
              Fund <span className="text-sky-blue">Argentina</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Progress", href: "#progress" },
              { label: "Donate", href: "#donate" },
              { label: "Expenses", href: "#expenses" },
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-white/50 hover:text-white/80 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onDonate}
              className="ml-3 px-5 py-2 rounded-full bg-sky-blue text-navy text-sm font-bold hover:bg-sky-blue/90 hover:shadow-[0_0_20px_rgba(110,193,255,0.2)] transition-all duration-300"
            >
              Donate Now
            </button>
          </div>

          <button
            className="md:hidden p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass-dark border-t border-white/5"
          >
            <div className="px-5 py-4 space-y-1">
              {[
                { label: "Progress", href: "#progress" },
                { label: "Donate", href: "#donate" },
                { label: "Expenses", href: "#expenses" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-white/50 hover:text-white/80 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  onDonate?.();
                  setMobileOpen(false);
                }}
                className="w-full mt-2 px-5 py-2.5 rounded-full bg-sky-blue text-navy text-sm font-bold hover:bg-sky-blue/90 transition-colors"
              >
                Donate Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
