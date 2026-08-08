import React from 'react';
import { ArrowRight, Compass, Heart } from 'lucide-react';
import { ActiveModal } from '../types';

interface ParisFinalCtaSectionProps {
  openModal: (modal: ActiveModal) => void;
}

export const ParisFinalCtaSection: React.FC<ParisFinalCtaSectionProps> = ({ openModal }) => {
  return (
    <section id="section-journey" className="relative w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32 bg-transparent text-white z-20 border-t border-white/10 overflow-hidden text-center">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Architectural corner crosshairs matching Sophisticated Dark design theme */}
      <div className="corner-frame-tl z-10 hidden md:block" />
      <div className="corner-frame-br z-10 hidden md:block" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow badge */}
        <div className="mb-4">
          <span className="text-[11px] uppercase tracking-[0.4em] text-emerald-400 font-bold font-mono-tech">
            Section 4. Final CTA — “Your Story Starts Here”
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08] font-display mb-6">
          Paris Is Waiting
        </h2>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-white/90 font-medium tracking-wide max-w-xl mb-3">
          You bring the dream. We'll create the journey.
        </p>

        <p className="text-sm sm:text-base text-white/60 font-light max-w-2xl leading-relaxed mb-10">
          Let us turn your Paris trip into memories you'll carry long after you've left the City of Light.
        </p>

        {/* Primary CTA Button */}
        <button
          onClick={() => openModal('consultation')}
          className="group inline-flex items-center gap-3 pl-8 pr-3 py-3.5 rounded-full bg-white text-slate-950 font-semibold text-xs sm:text-sm uppercase tracking-widest shadow-2xl hover:bg-emerald-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="font-semibold">{`Start Your Paris Journey`}</span>
          <span className="w-8 h-8 rounded-full bg-slate-950 text-white flex items-center justify-center transition-transform duration-300 group-hover:bg-slate-950 group-hover:rotate-45">
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>

        {/* Small footer line */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-tech uppercase tracking-[0.25em] text-white/40 gap-4">
          <span className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            PARIS ARCHETYPE CORE
          </span>
          <span className="text-white/80 font-bold tracking-[0.3em]">
            Paris. Your story. Your way.
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
            EST 2024
          </span>
        </div>
      </div>
    </section>
  );
};
