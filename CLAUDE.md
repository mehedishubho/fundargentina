# CLAUDE.md – Build a Funny "Fund Argentina" Fundraising Landing Page

## Project Overview

Create a **single-page satirical fundraising website** using **Next.js 16.2 (App Router)**. The website is purely for entertainment and memes. It should parody crowdfunding campaigns by pretending to collect donations to "help Argentina win the semifinal."

**This is NOT a real fundraising website.**
No real payments should be processed, and no actual donations should be accepted.

The tone should feel like:

- Modern startup landing page
- Kickstarter/GoFundMe inspired
- Premium SaaS UI
- Funny football meme
- Clean, minimalistic, responsive

The final result should look so professional that users initially think it's a real campaign, then gradually realize it's a joke.

---

# Tech Stack

Use:

- Next.js 16.2
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Framer Motion
- next/font (Geist)
- App Router
- Server Components whenever appropriate

No unnecessary libraries.

Follow modern React best practices.

---

# Package manager

Use: pnpm as package manager and do not use npm or other package manager

---

# Design Style

Theme:

Modern crowdfunding platform.

Color palette:

- Sky Blue (#6EC1FF)
- White
- Light Gray
- Very Dark Navy
- Gold accent for donation amount

Rounded corners everywhere.

Glassmorphism where appropriate.

Large spacing.

Premium typography.

Responsive.

Animations should be smooth but subtle.

Think:

- Stripe
- Linear
- Vercel
- GoFundMe
- Kickstarter

combined together.

---

# Hero Section

Large heading:

> Save Argentina Before It's Too Late 🇦🇷

Sub heading:

> Scientists estimate Argentina's semifinal victory chance increases by 0.0000001% for every meme donation.\*

CTA Button:

"Donate For Messi"

Secondary button

"See Where Your Money Goes"

Right side:

Funny illustration.

Ideas:

- Messi carrying a donation box
- Football with dollar wings
- Trophy inside piggy bank
- Flying pesos

Do NOT use copyrighted artwork.

Use clean vector illustrations or abstract SVG graphics.

---

# Fake Progress Bar

Display a realistic fundraiser.

Goal:

$10,000,000

Raised:

$8,734,920

Progress:

87%

Display:

- donors
- shares
- supporters

Animated counting numbers.

---

# Funny Donation Cards

Cards:

### $5

Buy one lucky football.

---

### $10

Sponsor Messi's morning coffee.

---

### $25

Increase team morale by 0.3%.

---

### $50

Bribe the football gods.\*

---

### $100

Emergency Tactical Luck Package.

---

### $500

Unlock Premium Argentina Energy.

Each card should have

- emoji
- icon
- hover animation
- funny description

Selecting a card highlights it.

---

# Fake Donation Button

Button:

"Donate Now"

When clicked:

Open beautiful modal.

Instead of payment:

Display

"Payment gateway is currently negotiating with FIFA."

Buttons:

Close

Laugh Again

---

# Where Your Donation Goes

Create humorous expense cards.

Examples:

38%

Extra Mate Tea ☕

22%

Motivational Speeches

16%

Lucky Socks Maintenance

11%

VAR Positive Energy

8%

Emergency BBQ

5%

Unknown (Handled by Messi)

Animated icons.

---

# Testimonials

Create fake testimonials.

Examples:

⭐⭐⭐⭐⭐

"I donated $25 and Argentina scored two goals the next day."

— Totally Real Fan

---

"My wife left me, but Argentina still won."

---

"I donated twice because penalties scare me."

Make these look believable.

---

# FAQ

Examples

Is this real?

Answer:

Absolutely not.

---

Where does the money go?

Mostly into good vibes.

---

Will Argentina definitely win?

No.

But the memes will.

---

Can I really donate?

No.

Please don't.

---

# Live Activity Feed

Small animated feed.

Examples:

Ahmed donated $10

Maria donated $25

John unlocked Lucky Socks

Pedro sponsored BBQ

Loop forever.

---

# Floating Elements

Floating footballs

Stars

Confetti

Tiny Argentina flags

Very subtle movement.

---

# Footer

Include disclaimer:

---

⚠️ Disclaimer

This website is satire.

No real money is collected.

No affiliation with FIFA, Argentina Football Association, Lionel Messi, or any official organization.

Made for entertainment only.

---

# Hidden Easter Eggs

When clicking the trophy 5 times:

Show

"Messi unlocked Ultra Instinct."

---

Konami code:

Show raining footballs.

---

Typing "GOAT"

Display

"The GOAT has been summoned."

---

# Animations

Use Framer Motion everywhere appropriate.

Page load animations

Fade up

Scale

Progress animation

Counter animation

Hover animations

Smooth transitions

Respect reduced motion preference.

---

# Accessibility

Proper semantic HTML

Keyboard navigation

ARIA labels

Visible focus states

Color contrast

Screen reader friendly

---

# Performance

Target Lighthouse:

Performance 95+

Accessibility 100

SEO 100

Best Practices 100

No layout shifts.

Optimize every asset.

---

# SEO

Generate metadata.

Open Graph.

Twitter cards.

JSON-LD Website schema.

Funny title:

"Fund Argentina — The World's Most Important Fake Fundraiser"

Description:

"The internet's most professional fake fundraising campaign dedicated to helping Argentina win absolutely nothing through imaginary donations."

Use proper canonical tags.

---

# Folder Structure

Organize code cleanly.

Suggested structure:

```
app/
components/
components/sections/
components/ui/
lib/
hooks/
public/
styles/
types/
```

Use reusable components.

No duplicated code.

---

# Code Quality

Follow production-grade architecture.

Strong TypeScript typing.

Reusable components.

No inline styles.

No `any` types.

No console logs.

Keep components modular and maintainable.

---

# Final Goal

The finished website should genuinely resemble a high-quality crowdfunding platform at first glance, while gradually revealing its satirical nature through clever copy, humorous interactions, and fake donation flows. It should feel polished enough to be portfolio-worthy, with smooth animations, excellent UX, responsive design, and clean architecture suitable for a modern Next.js application.
