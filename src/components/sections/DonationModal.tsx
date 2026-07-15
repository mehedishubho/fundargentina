"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Laugh, AlertTriangle } from "lucide-react";

export function DonationModal({
  isOpen,
  onClose,
  amount,
}: {
  isOpen: boolean;
  onClose: () => void;
  amount: number | null;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Donation modal"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/70 backdrop-blur-lg"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.92, y: 20 }
            }
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8 sm:p-10 text-center">
              <motion.div
                initial={
                  prefersReducedMotion ? {} : { rotate: [0, -8, 8, -8, 0] }
                }
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/10 flex items-center justify-center"
              >
                <AlertTriangle className="w-8 h-8 text-gold" />
              </motion.div>

              <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight mb-3">
                Payment Pending
              </h3>

              {amount && (
                <p className="text-lg font-bold text-sky-blue mb-4">
                  ${amount} Donation
                </p>
              )}

              <p className="text-slate-500 mb-2 leading-relaxed">
                Payment gateway is currently negotiating with FIFA.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Please try again after the World Cup.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 rounded-xl bg-sky-blue text-navy font-bold hover:bg-sky-blue/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Laugh className="w-4 h-4" />
                  Laugh Again
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
