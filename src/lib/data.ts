import {
  DonationCardData,
  ExpenseData,
  TestimonialData,
  FAQData,
  ActivityFeedItem,
  MatchTimelineItem,
} from "@/types";

export const donationCards: DonationCardData[] = [
  {
    amount: 5,
    emoji: "🎯",
    title: "Lucky Football",
    description: "Buy one lucky football",
  },
  {
    amount: 10,
    emoji: "☕",
    title: "Messi's Coffee",
    description: "Sponsor Messi's morning coffee",
  },
  {
    amount: 25,
    emoji: "📈",
    title: "Morale Boost",
    description: "Increase team morale by 0.3%",
  },
  {
    amount: 50,
    emoji: "🍀",
    title: "Lucky Charm",
    description: "Bribe the football gods.*",
  },
  {
    amount: 100,
    emoji: "🎁",
    title: "Tactical Luck",
    description: "Emergency Tactical Luck Package",
  },
  {
    amount: 500,
    emoji: "⚡",
    title: "Premium Energy",
    description: "Unlock Premium Argentina Energy",
  },
];

export const expenses: ExpenseData[] = [
  { percentage: 38, emoji: "☕", label: "Extra Mate Tea" },
  { percentage: 22, emoji: "💬", label: "Motivational Speeches" },
  { percentage: 16, emoji: "🧦", label: "Lucky Socks Maintenance" },
  { percentage: 11, emoji: "⚽", label: "VAR Positive Energy" },
  { percentage: 8, emoji: "🍖", label: "Emergency BBQ" },
  { percentage: 5, emoji: "❓", label: "Unknown (Handled by Messi)" },
];

export const testimonials: TestimonialData[] = [
  {
    name: "Totally Real Fan",
    quote:
      "I donated $25 and Argentina scored two goals the next day. Coincidence? I think not.",
    stars: 5,
    role: "Verified Donor",
  },
  {
    name: "Sad Donor",
    quote: "My wife left me, but Argentina still won. Worth it.",
    stars: 5,
    role: "Loyal Supporter",
  },
  {
    name: "Nervous Supporter",
    quote:
      "I donated twice because penalties scare me. Money can't buy happiness, but it can buy lucky socks.",
    stars: 5,
    role: "Double Donor",
  },
  {
    name: "Mate Enthusiast",
    quote:
      "Since donating, my mate has tasted 37% better. The science is clear.",
    stars: 5,
    role: "Tea Connoisseur",
  },
  {
    name: "Barbecue Expert",
    quote:
      "I know my $50 went to BBQ and honestly that's the most responsible use of funds I've ever seen.",
    stars: 5,
    role: "Grill Master",
  },
];

export const faqs: FAQData[] = [
  {
    question: "Is this real?",
    answer: "Absolutely not.",
  },
  {
    question: "Where does the money go?",
    answer: "Mostly into good vibes.",
  },
  {
    question: "Will Argentina definitely win?",
    answer: "No. But the memes will.",
  },
  {
    question: "Can I really donate?",
    answer: "No. Please don't.",
  },
];

export const activityFeedItems: ActivityFeedItem[] = [
  { name: "Ahmed", action: "donated", amount: 10 },
  { name: "Maria", action: "donated", amount: 25 },
  { name: "John", action: "unlocked Lucky Socks" },
  { name: "Pedro", action: "sponsored BBQ" },
  { name: "Sofia", action: "donated", amount: 50 },
  { name: "Liam", action: "bribed the football gods" },
  { name: "Yuki", action: "donated", amount: 100 },
  { name: "Fatima", action: "sponsored mate tea" },
  { name: "Carlos", action: "donated", amount: 5 },
  { name: "Emma", action: "unlocked Premium Energy" },
];

export const matchTimeline: MatchTimelineItem[] = [
  {
    matchday: 1,
    date: "Jun 16, 2026",
    opponent: "Algeria",
    result: "3 - 0",
    moneySpent: 1200000,
    purpose: "Lucky pre-match mate ceremony",
    emoji: "☕",
    status: "completed",
  },
  {
    matchday: 2,
    date: "Jun 22, 2026",
    opponent: "Austria",
    result: "2 - 0",
    moneySpent: 1500000,
    purpose: "VAR positive energy crystals",
    emoji: "🔮",
    status: "completed",
  },
  {
    matchday: 3,
    date: "Jun 27, 2026",
    opponent: "Jordan",
    result: "3 - 1",
    moneySpent: 1800000,
    purpose: "Group stage lucky socks resupply",
    emoji: "🧦",
    status: "completed",
  },
  {
    matchday: 4,
    date: "Jul 3, 2026",
    opponent: "Cape Verde",
    result: "3 - 2 (a.e.t.)",
    moneySpent: 2400000,
    purpose: "Football gods emergency bribe",
    emoji: "⚽",
    status: "completed",
  },
  {
    matchday: 5,
    date: "Jul 7, 2026",
    opponent: "Egypt",
    result: "3 - 2",
    moneySpent: 3100000,
    purpose: "Last-minute comeback insurance",
    emoji: "🎯",
    status: "completed",
  },
  {
    matchday: 6,
    date: "Jul 11, 2026",
    opponent: "Switzerland",
    result: "3 - 1 (a.e.t.)",
    moneySpent: 3800000,
    purpose: "Extra time destiny boost",
    emoji: "⚡",
    status: "completed",
  },
  {
    matchday: 7,
    date: "Jul 15, 2026",
    opponent: "England",
    result: "TBD",
    moneySpent: 0,
    purpose: "Semi-final fate still undetermined",
    emoji: "🏆",
    status: "upcoming",
  },
];
