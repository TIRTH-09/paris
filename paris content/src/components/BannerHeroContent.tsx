import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ActiveModal } from '../types';

interface BannerHeroContentProps {
  headline: string;
  subtitle: string;
  ctaText: string;
  onCtaClick: () => void;
  openModal: (modal: ActiveModal) => void;
}

export const BannerHeroContent: React.FC<BannerHeroContentProps> = ({
  headline,
  subtitle,
  ctaText,
  onCtaClick,
  openModal,
}) => {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4 pt-4 sm:pt-20 md:pt-24 pb-6 my-auto z-20 transition-all">
      {/* Eyebrow badge matching Sophisticated Dark design theme */}
      <div className="mb-4">
        <span className="text-[11px] uppercase tracking-[0.4em] text-emerald-400 font-bold font-mono-tech">
          Bespoke Travel Journeys
        </span>
      </div>

      {/* Big Display Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12] font-display max-w-3xl drop-shadow-sm">
        {headline}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-sm sm:text-base md:text-lg text-white/60 font-light max-w-2xl leading-relaxed tracking-wide">
        {subtitle}
      </p>

      {/* CTA Pill Button with Circular Arrow Icon */}
      <div className="mt-7 md:mt-8 flex items-center gap-5">
        <button
          onClick={onCtaClick}
          className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-slate-950 font-semibold text-xs uppercase tracking-widest shadow-2xl hover:bg-slate-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="font-semibold text-slate-950">{ctaText}</span>
          <span className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center transition-transform duration-300 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </span>
        </button>

        <button 
          onClick={() => openModal('about')}
          className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-white/70 hover:text-white transition-colors group cursor-pointer"
        >
          <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            →
          </span>
          <span>View Manifesto</span>
        </button>
      </div>
    </div>
  );
};
