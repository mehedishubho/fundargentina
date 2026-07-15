import {
  DonationCardData,
  ExpenseData,
  TestimonialData,
  FAQData,
  ActivityFeedItem,
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
