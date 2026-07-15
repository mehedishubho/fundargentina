"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Heart, ExternalLink, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white" role="contentinfo">
      {/* Disclaimer */}
      <div className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  Disclaimer
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  This website is satire. No real money is collected. No affiliation
                  with FIFA, Argentina Football Association, Lionel Messi, or any
                  official organization. Made for entertainment only.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl" role="img" aria-label="Argentina flag">
                🇦🇷
              </span>
              <span className="text-lg font-bold">
                Fund <span className="text-sky-blue">Argentina</span>
              </span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">
              The world&apos;s most professional fake fundraising campaign.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/50 mb-4 tracking-widest uppercase">
              Links
            </h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (link) => (
                  <li key={link}>
                    <span className="text-sm text-white/30 hover:text-white/50 transition-colors cursor-default">
                      {link}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/50 mb-4 tracking-widest uppercase">
              Social
            </h4>
            <ul className="space-y-2.5">
              {["Twitter", "Instagram", "TikTok"].map((link) => (
                <li key={link}>
                  <span className="text-sm text-white/30 hover:text-white/50 transition-colors cursor-default">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-white/20">
              &copy; 2026 Fund Argentina. All rights reserved. (Not really.)
            </p>
            <div className="flex flex-col items-center sm:items-end gap-3">
              <p className="text-xs text-white/20 flex items-center gap-1.5">
                Made with{" "}
                <Heart className="w-3 h-3 text-sky-blue fill-sky-blue" /> and
                imaginary money
              </p>
              <div className="flex items-center gap-4">
                <p className="text-xs text-white/30">
                  Developed by <span className="text-white/50 font-semibold">MHS</span>
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wpmhs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-white/60 transition-colors"
                    aria-label="Developer website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com/wpmhs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-white/60 transition-colors"
                    aria-label="Developer Facebook"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/mehedishubho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/30 hover:text-white/60 transition-colors"
                    aria-label="Developer GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
