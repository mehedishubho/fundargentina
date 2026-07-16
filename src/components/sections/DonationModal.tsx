"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  MessageCircle,
  Send,
  Bot,
  User,
  Smile,
  AlertTriangle,
} from "lucide-react";

interface ChatMessage {
  id: number;
  sender: "bot" | "user" | "system";
  text: string;
  delay: number;
  emoji?: string;
}

const BOT_REACTIONS = [
  "🤡",
  "😂",
  "💀",
  "😭",
  "👀",
  "🍿",
  "🫡",
  "🤷",
  "⚽",
  "🐐",
];

function getBotReaction(): string {
  return BOT_REACTIONS[Math.floor(Math.random() * BOT_REACTIONS.length)];
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

function SystemMessage({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex justify-center my-3"
    >
      <div className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
        <span className="text-[11px] text-slate-400 font-medium">{text}</span>
      </div>
    </motion.div>
  );
}

function ChatBubble({
  message,
  isVisible,
  reaction,
}: {
  message: ChatMessage;
  isVisible: boolean;
  reaction?: string;
}) {
  const isBot = message.sender === "bot";
  const isUser = message.sender === "user";

  if (message.sender === "system") {
    return <SystemMessage text={message.text} />;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}
        >
          <div
            className={`flex items-end gap-2 max-w-[85%] ${
              isBot ? "" : "flex-row-reverse"
            }`}
          >
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
            <div className="relative">
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  isBot
                    ? "bg-slate-100 text-[#0f172a] rounded-bl-md"
                    : "bg-sky-blue text-navy rounded-br-md"
                }`}
              >
                {message.text}
              </div>
              {/* Emoji reaction on bot messages */}
              {isBot && reaction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
                  className="absolute -bottom-2 -right-1 bg-white rounded-full shadow-md px-1.5 py-0.5 text-xs border border-slate-100"
                >
                  {reaction}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const REPLY_AUTO_REPLIES: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /^goat$/i,
    reply: "The GOAT has been summoned. But he's busy. Please hold. 🐐",
  },
  {
    pattern: /please/i,
    reply:
      "Begging doesn't work either. We tried. Even Messi begged once. Still lost.",
  },
  {
    pattern: /messi/i,
    reply:
      "We forwarded your message to Messi. He responded with a laughing emoji. That's it.",
  },
  {
    pattern: /win|victory|champion/i,
    reply:
      "Our optimism department will review your request. Current backlog: 87 years.",
  },
  {
    pattern: /money|donate|dollar|\$/i,
    reply:
      "We accept positive vibes, good karma, and sacrificed chickens. Money is optional.",
  },
  {
    pattern: /penalty|penalties/i,
    reply:
      "Please don't mention penalties. Our servers are still recovering from 2022 PTSD.",
  },
  {
    pattern: /help/i,
    reply:
      "Help is available. But not here. Our help desk is just one guy named Carlos who's currently asleep. 🛌",
  },
  {
    pattern: /hello|hi|hey/i,
    reply:
      "Hey! Welcome to our support. Your estimated wait time is: until the next World Cup.",
  },
  {
    pattern: /argentina/i,
    reply:
      "Argentina is great! Beautiful country, amazing football, and an economy that runs on pure vibes.",
  },
  {
    pattern: /real|serious|legit/i,
    reply:
      "As real as Argentina's inflation numbers. So... no. 😂",
  },
];

function getAutoReply(userText: string): string {
  for (const { pattern, reply } of REPLY_AUTO_REPLIES) {
    if (pattern.test(userText)) return reply;
  }
  const fallbackReplies = [
    "Interesting. Let me file that under 'Wishes That Will Never Come True.'",
    "Noted. Our spiritual advisor will get back to you in 3-5 business days.",
    "That's... one way to look at it. We respect your optimism even if we don't share it.",
    "Our AI just processed your message. It responded with a sigh. 🫠",
    "Thanks for sharing! Your message has been forwarded to absolutely no one.",
    "Carlos from accounting just read your message. He's now crying. 😭",
    "Our database has categorized your message under: 'Things We Can't Help With.'",
    "Wow. Even our bot is confused by that one.",
  ];
  return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}

const FAREWELL_MESSAGES = [
  "Closing this chat won't save you from watching penalties...",
  "You're leaving? Fine. Just know, every time you close this chat, an Argentine grandma sheds a tear.",
  "It was nice talking to you too 😊. The Football Gods will remember this.",
];

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
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [farewellIndex, setFarewellIndex] = useState(0);
  const [extraMessages, setExtraMessages] = useState<ChatMessage[]>([]);
  const [reactions, setReactions] = useState<Record<number, string>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(100);

  const messages: ChatMessage[] = [
    {
      id: 1,
      sender: "system",
      text: "FIFA Support • Live Chat",
      delay: 300,
    },
    {
      id: 2,
      sender: "bot",
      text: "Welcome to FIFA Support! How can I help you today?",
      delay: 800,
    },
    {
      id: 3,
      sender: "user",
      text: amount
        ? `I want to donate $${amount} to help Argentina win.`
        : "I want to donate to help Argentina win.",
      delay: 1500,
    },
    {
      id: 4,
      sender: "system",
      text: "Football Gods are typing...",
      delay: 2000,
    },
    {
      id: 5,
      sender: "bot",
      text: "Interesting. Let me check with the Football Gods...",
      delay: 2800,
      emoji: "👀",
    },
    {
      id: 6,
      sender: "bot",
      text: "...",
      delay: 3400,
    },
    {
      id: 7,
      sender: "system",
      text: "Messi has left the chat",
      delay: 3800,
    },
    {
      id: 8,
      sender: "bot",
      text: "The Football Gods have responded. They said:",
      delay: 4400,
    },
    {
      id: 9,
      sender: "bot",
      text: '"Lmao no."',
      delay: 5000,
      emoji: "🤡",
    },
    {
      id: 10,
      sender: "bot",
      text: "But we appreciate your optimism! Maybe try buying more mate tea instead?",
      delay: 5600,
    },
  ];

  const allMessages = [...messages, ...extraMessages];

  useEffect(() => {
    if (!isOpen) {
      setVisibleMessages([]);
      setShowTyping(false);
      setChatComplete(false);
      setShowReplyInput(false);
      setReplyText("");
      setIsClosing(false);
      setFarewellIndex(0);
      setExtraMessages([]);
      setReactions({});
      return;
    }

    messages.forEach((msg) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.id]);
        setShowTyping(false);
      }, msg.delay);
    });

    setTimeout(() => setShowTyping(true), 2600);
    setTimeout(() => setShowTyping(true), 3600);

    setTimeout(() => setChatComplete(true), 6200);
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, showTyping, extraMessages]);

  useEffect(() => {
    if (showReplyInput && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [showReplyInput]);

  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    const msgId = nextId.current++;
    const farewell = FAREWELL_MESSAGES[farewellIndex];
    setFarewellIndex((prev) => (prev + 1) % FAREWELL_MESSAGES.length);

    setShowTyping(true);

    setTimeout(() => {
      setShowTyping(false);
      setExtraMessages((prev) => [
        ...prev,
        { id: msgId, sender: "bot", text: farewell, delay: 0 },
      ]);
      setVisibleMessages((prev) => [...prev, msgId]);
    }, 1200);

    setTimeout(() => {
      const statusId = nextId.current++;
      setExtraMessages((prev) => [
        ...prev,
        {
          id: statusId,
          sender: "system",
          text: "Football Gods: Disappointed 😔",
          delay: 0,
        },
      ]);
      setVisibleMessages((prev) => [...prev, statusId]);
    }, 2200);

    setTimeout(() => {
      onClose();
    }, 3500);
  }, [isClosing, farewellIndex, onClose]);

  const handleReply = useCallback(() => {
    if (!replyText.trim()) return;

    const userMsgId = nextId.current++;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: replyText.trim(),
      delay: 0,
    };

    setExtraMessages((prev) => [...prev, userMessage]);
    setVisibleMessages((prev) => [...prev, userMsgId]);
    setReplyText("");
    setShowReplyInput(false);

    setShowTyping(true);

    setTimeout(() => {
      setShowTyping(false);
      const botReplyId = nextId.current++;
      const botReply = getAutoReply(userMessage.text);
      const emoji = getBotReaction();

      setReactions((prev) => ({ ...prev, [botReplyId]: emoji }));
      setExtraMessages((prev) => [
        ...prev,
        { id: botReplyId, sender: "bot", text: botReply, delay: 0, emoji },
      ]);
      setVisibleMessages((prev) => [...prev, botReplyId]);
    }, 1500 + Math.random() * 1000);
  }, [replyText]);

  const handleReplyKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleReply();
      }
    },
    [handleReply]
  );

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
            onClick={handleClose}
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
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isClosing
                          ? "bg-amber-400"
                          : "bg-emerald-400 animate-pulse"
                      }`}
                    />
                    <span className="text-xs text-slate-400">
                      {isClosing
                        ? "Football Gods Disappointed"
                        : "Football Gods Online"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 min-h-[300px]">
              {allMessages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg}
                  isVisible={visibleMessages.includes(msg.id)}
                  reaction={
                    msg.sender === "bot" ? reactions[msg.id] : undefined
                  }
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

            {/* Reply Input */}
            <AnimatePresence>
              {showReplyInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 py-3 border-t border-slate-100 bg-white"
                >
                  <div className="flex gap-2">
                    <input
                      ref={replyInputRef}
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={handleReplyKeyDown}
                      placeholder="Type something funny..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0f172a] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-blue/30 focus:border-sky-blue transition-all"
                    />
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim()}
                      className="px-4 py-2.5 rounded-xl bg-sky-blue text-navy text-sm font-bold hover:bg-sky-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1.5"
                    >
                      <Smile className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Actions */}
            <AnimatePresence>
              {chatComplete && !isClosing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-5 py-4 border-t border-slate-100 bg-[#fafbfc]"
                >
                  <div className="flex gap-3">
                    <button
                      onClick={handleClose}
                      className="flex-1 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                    >
                      Close Chat
                    </button>
                    <button
                      onClick={() => setShowReplyInput((prev) => !prev)}
                      className="flex-1 px-5 py-3 rounded-xl bg-sky-blue text-navy text-sm font-bold hover:bg-sky-blue/90 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      {showReplyInput
                        ? "Hide Input"
                        : "Reply (It Won't Help)"}
                    </button>
                  </div>
                  {!showReplyInput && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] text-slate-300 text-center mt-2"
                    >
                      <AlertTriangle className="w-3 h-3 inline mr-1 -mt-0.5" />
                      Warning: Replying may cause existential dread
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
