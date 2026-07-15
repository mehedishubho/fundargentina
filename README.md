<div align="center">

# ⚽ Fund Argentina

**The World's Most Professional Fake Fundraiser**

A satirical crowdfunding landing page that looks so real, you'll want to donate... to absolutely nothing.

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Live Demo](https://fundargentina.com) · [Report Bug](https://github.com/mehedishubho/fundargentina/issues) · [Request Feature](https://github.com/mehedishubho/fundargentina/issues)

</div>

---

## ✨ Features

- **Premium UI/UX** — Glassmorphism, smooth animations, and a design that rivals Stripe and Linear
- **3D Card Interactions** — Tilt and spotlight effects on donation cards
- **Parallax Hero** — Mouse-driven parallax on the hero section
- **Custom Cursor Glow** — Subtle cursor follower effect on desktop
- **Animated Counters** — Progress bar with real-time counting animation
- **Easter Eggs** — Konami code, "GOAT" typing, and trophy clicks
- **Activity Feed** — Simulated live donation feed
- **Fully Responsive** — Mobile-first design, works on all devices
- **Accessible** — Semantic HTML, ARIA labels, keyboard navigation, reduced motion support
- **SEO Optimized** — OpenGraph, Twitter cards, JSON-LD structured data

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16.2 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Components | shadcn/ui |
| Package Manager | pnpm |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/mehedishubho/fundargentina.git

# Navigate to the project
cd fundargentina

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.tsx           # Root layout with fonts & metadata
│   ├── page.tsx             # Main page orchestrator
│   └── icon.svg             # Argentina flag favicon
├── components/
│   ├── layout/
│   │   └── Navbar.tsx       # Glassmorphism navigation bar
│   ├── sections/
│   │   ├── Hero.tsx         # Hero with parallax & trophy SVG
│   │   ├── ProgressBar.tsx  # Animated fundraiser progress
│   │   ├── DonationCards.tsx # 6 donation tier cards
│   │   ├── DonationModal.tsx # Fake payment modal
│   │   ├── ExpenseBreakdown.tsx # Expense allocation cards
│   │   ├── Testimonials.tsx # Fake testimonials
│   │   ├── ActivityFeed.tsx # Live donation feed
│   │   ├── FAQ.tsx          # Accordion FAQ section
│   │   └── Footer.tsx       # Footer with credits
│   └── ui/
│       ├── CursorGlow.tsx   # Custom cursor effect
│       ├── FloatingElements.tsx # Floating decorations
│       ├── KonamiCode.tsx   # Konami code easter egg
│       └── GOATEasterEgg.tsx # GOAT typing easter egg
├── hooks/
│   └── useReducedMotion.ts  # Accessibility hook
├── lib/
│   ├── data.ts              # Static content data
│   └── utils.ts             # Utility functions
└── types/
    └── index.ts             # TypeScript interfaces
```

## 🎯 Easter Eggs

| Secret | How to Trigger |
|--------|----------------|
| 🏆 Ultra Instinct | Click the trophy 5 times |
| ⚽ Raining Footballs | Enter the Konami Code (↑↑↓↓←→←→BA) |
| 🐐 The GOAT | Type "GOAT" anywhere on the page |

## 🌐 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
pnpm build
```

Or deploy to any platform that supports Next.js (Netlify, Railway, etc.).

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**MHS** — [wpmhs.com](https://wpmhs.com)

[![GitHub](https://img.shields.io/badge/GitHub-mehedishubho-181717?logo=github)](https://github.com/mehedishubho)
[![Facebook](https://img.shields.io/badge/Facebook-wpmhs-1877F2?logo=facebook)](https://facebook.com/wpmhs)

---

<div align="center">

**⚠️ Disclaimer:** This website is satire. No real money is collected. No affiliation with FIFA, AFA, or Lionel Messi.

Made with ❤️ and imaginary money

</div>
