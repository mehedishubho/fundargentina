"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ProgressBar } from "@/components/sections/ProgressBar";
import { DonationCards } from "@/components/sections/DonationCards";
import { DonationModal } from "@/components/sections/DonationModal";
import { ExpenseBreakdown } from "@/components/sections/ExpenseBreakdown";
import { MatchTimeline } from "@/components/sections/MatchTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ActivityFeed } from "@/components/sections/ActivityFeed";
import { Footer } from "@/components/sections/Footer";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { KonamiCodeEasterEgg } from "@/components/ui/KonamiCode";
import { GOATEasterEgg } from "@/components/ui/GOATEasterEgg";
import { CursorGlow } from "@/components/ui/CursorGlow";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const openModal = (amount?: number) => {
    if (amount) setSelectedAmount(amount);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAmount(null);
  };

  return (
    <>
      <CursorGlow />
      <FloatingElements />
      <KonamiCodeEasterEgg />
      <GOATEasterEgg />

      <Navbar onDonate={() => openModal()} />

      <main className="flex-1">
        <Hero onDonate={() => openModal()} />
        <ProgressBar />
        <DonationCards onSelect={(amount) => openModal(amount)} />
        <MatchTimeline />
        <ExpenseBreakdown />
        <Testimonials />
        <ActivityFeed />
        <FAQ />
      </main>

      <Footer />

      <DonationModal
        isOpen={modalOpen}
        onClose={closeModal}
        amount={selectedAmount}
      />
    </>
  );
}
