"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, MessageCircle, Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "bot" | "user";
  text: string;
  delay: number;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-slate-300"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ChatBubble({
  message,
  isVisible,
}: {
  message: ChatMessage;
  isVisible: boolean;
}) {
  const isBot = message.sender === "bot";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}
        >
          <div className={`flex items-end gap-2 max-w-[85%] ${isBot ? "" : "flex-row-reverse"}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                isBot
                  ? "bg-sky-blue/10"
                  : "bg-gradient-to-br from-amber-400 to-orange-500"
              }`}
            >
              {isBot ? (
                <Bot className="w-4 h-4 text-sky-blue" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div
              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                isBot
                  ? "bg-slate-100 text-[#0f172a] rounded-bl-md"
                  : "bg-sky-blue text-navy rounded-br-md"
              }`}
            >
              {message.text}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [chatComplete, setChatComplete] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const messages: ChatMessage[] = [
    {
      id: 1,
      sender: "bot",
      text: "Welcome to FIFA Support! How can I help you today?",
      delay: 500,
    },
    {
      id: 2,
      sender: "user",
      text: amount
        ? `I want to donate $${amount} to help Argentina win.`
        : "I want to donate to help Argentina win.",
      delay: 1200,
    },
    {
      id: 3,
      sender: "bot",
      text: "Interesting. Let me check with the Football Gods...",
      delay: 2000,
    },
    {
      id: 4,
      sender: "bot",
      text: "...",
      delay: 2800,
    },
    {
      id: 5,
      sender: "bot",
      text: "The Football Gods have responded. They said:",
      delay: 3600,
    },
    {
      id: 6,
      sender: "bot",
      text: '"Lmao no."',
      delay: 4200,
    },
    {
      id: 7,
      sender: "bot",
      text: "But we appreciate your optimism! Maybe try buying more mate tea instead?",
      delay: 5000,
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setVisibleMessages([]);
      setShowTyping(false);
      setChatComplete(false);
      return;
    }

    messages.forEach((msg) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.id]);
        setShowTyping(false);
      }, msg.delay);
    });

    // Show typing before bot messages
    setTimeout(() => setShowTyping(true), 1800);

    setTimeout(() => setChatComplete(true), 5600);
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, showTyping]);

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
          aria-label="FIFA donation chat"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/70 backdrop-blur-lg"
            onClick={onClose}
          />

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
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(600px, 85vh)" }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-sky-blue/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-blue/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-sky-blue" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a]">
                    FIFA Support
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-slate-400">
                      Football Gods Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 min-h-[300px]">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  isVisible={visibleMessages.includes(msg.id)}
                />
              ))}
              {showTyping && (
                <div className="flex justify-start mb-3">
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-sky-blue/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-sky-blue" />
                    </div>
                    <div className="bg-slate-100 rounded-2xl rounded-bl-md">
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Bottom Actions */}
            <AnimatePresence>
              {chatComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-5 py-4 border-t border-slate-100 bg-[#fafbfc]"
                >
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                    >
                      Close Chat
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 px-5 py-3 rounded-xl bg-sky-blue text-navy text-sm font-bold hover:bg-sky-blue/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      Reply (It Won&apos;t Help)
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
