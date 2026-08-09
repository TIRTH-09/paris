import React, { useState } from 'react';
import { ScrollCanvas } from './components/ScrollCanvas';
import { BannerHeader } from './components/BannerHeader';
import { BannerHeroContent } from './components/BannerHeroContent';
import { BannerGlassCards } from './components/BannerGlassCards';
import { ParisStorySection } from './components/ParisStorySection';
import { ParisMomentsSection } from './components/ParisMomentsSection';
import { ParisFinalCtaSection } from './components/ParisFinalCtaSection';
import { InteractiveModals } from './components/InteractiveModals';
import { BannerData, LanguageOption, ActiveModal } from './types';

const DEFAULT_BANNER_DATA: BannerData = {
  companyName: 'PARIS',
  headline: 'Experience Paris like never before',
  subtitle: 'From moonlit walks along the Seine to hidden cafés in Montmartre, experience Paris through journeys designed around you.',
  ctaText: 'Explore Paris · Plan Your Journey',
  card1Category: 'Explore',
  card1Title: 'Iconic Paris',
  card1Text: 'Discover world-renowned landmarks, timeless architecture, and golden sunsets along the Seine.',
  card2Category: 'Experience',
  card2Title: 'Hidden Paris',
  card2Text: 'Step beyond the landmarks and uncover charming streets, local cafés, and unforgettable moments.',
  generatedEnergyValue: '12 Districts',
  generatedEnergyText: 'uncovering famous art, world heritage, and timeless monuments',
  impactValue: '100% Bespoke',
  impactText: 'journeys crafted specifically around your travel desires and rhythm.',
};

export default function App() {
  const [bannerData, setBannerData] = useState<BannerData>(DEFAULT_BANNER_DATA);
  const [activeNav, setActiveNav] = useState('Overview');
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedLang, setSelectedLang] = useState<LanguageOption>({
    code: 'EN',
    name: 'English (UK)',
    flag: '🇬🇧',
  });

  return (
    <div className="relative w-full text-white select-none">
      {/* Scroll-driven canvas animation — fixed background at z-0 */}
      <ScrollCanvas />

      {/* Sophisticated Dark Corner Architectural Crosshairs */}
      <div className="corner-frame-tl z-20 hidden md:block" style={{ position: 'fixed' }} />
      <div className="corner-frame-br z-20 hidden md:block" style={{ position: 'fixed' }} />

      {/* Main Banner Composition (Top Nav -> Hero Content -> Bottom Glass Cards) */}
      <div id="section-overview" className="relative z-10 min-h-[100dvh] flex flex-col justify-between">
        {/* 1. Header Navigation */}
        <BannerHeader
          companyName={bannerData.companyName}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          openModal={(modal) => setActiveModal(modal)}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
        />

        {/* 2. Main Hero Content */}
        <BannerHeroContent
          headline={bannerData.headline}
          subtitle={bannerData.subtitle}
          ctaText={bannerData.ctaText}
          onCtaClick={() => setActiveModal('consultation')}
          openModal={(modal) => setActiveModal(modal)}
        />

        {/* 3. Bottom Glassmorphic Cards */}
        <BannerGlassCards
          card1Category={bannerData.card1Category}
          card1Title={bannerData.card1Title}
          card1Text={bannerData.card1Text}
          card2Category={bannerData.card2Category}
          card2Title={bannerData.card2Title}
          card2Text={bannerData.card2Text}
          openModal={(modal) => setActiveModal(modal)}
        />
      </div>

      {/* Section 2: Where Every Street Tells a Story */}
      <ParisStorySection openModal={(modal) => setActiveModal(modal)} />

      {/* Section 3: Experiences — Your Paris Moments */}
      <ParisMomentsSection openModal={(modal) => setActiveModal(modal)} />

      {/* Section 4: Final CTA — Your Story Starts Here */}
      <ParisFinalCtaSection openModal={(modal) => setActiveModal(modal)} />

      {/* Interactive Modals and Drawers */}
      <InteractiveModals
        activeModal={activeModal}
        closeModal={() => setActiveModal(null)}
        bannerData={bannerData}
      />
    </div>
  );
}
