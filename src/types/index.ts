export interface DonationCardData {
  amount: number;
  emoji: string;
  title: string;
  description: string;
}

export interface ExpenseData {
  percentage: number;
  emoji: string;
  label: string;
}

export interface TestimonialData {
  name: string;
  quote: string;
  stars: number;
  role: string;
}

export interface FAQData {
  question: string;
  answer: string;
}

export interface ActivityFeedItem {
  name: string;
  action: string;
  amount?: number;
}
