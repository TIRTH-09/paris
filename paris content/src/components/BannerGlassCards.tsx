import React from 'react';
import { Compass, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { ActiveModal } from '../types';

interface BannerGlassCardsProps {
  card1Category?: string;
  card1Title?: string;
  card1Text?: string;
  card2Category?: string;
  card2Title?: string;
  card2Text?: string;
  generatedEnergyValue?: string;
  generatedEnergyText?: string;
  impactValue?: string;
  impactText?: string;
  openModal: (modal: ActiveModal) => void;
}

export const BannerGlassCards: React.FC<BannerGlassCardsProps> = ({
  card1Category = 'Explore',
  card1Title = 'Iconic Paris',
  card1Text = 'Immerse yourself in world-class art, timeless monuments, and golden sunsets over the Eiffel Tower.',
  card2Category = 'Experience',
  card2Title = 'Hidden Paris',
  card2Text = 'Step beyond the landmarks and uncover charming streets, local cafés, and unforgettable moments.',
  openModal,
}) => {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 pb-8 pt-4 z-20 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto items-end">
        {/* Card 1: Explore */}
        <div className="relative group rounded-3xl p-6 sm:p-7 bg-black/10 border border-white/15 transition-all duration-300 hover:bg-black/30 hover:border-white/30 hover:scale-[1.01]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl sm:text-3xl font-light text-white font-display tracking-tight">
              Explore
            </h3>
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono-tech uppercase tracking-wider text-white/60">
            <span className="flex items-center gap-2 text-emerald-400 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              Curated Itineraries
            </span>
            <button 
              onClick={() => openModal('projects')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
            >
              <span>Explore Highlights</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Experience */}
        <div className="relative group rounded-3xl p-6 sm:p-7 bg-black/10 border border-white/15 transition-all duration-300 hover:bg-black/30 hover:border-white/30 hover:scale-[1.01]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl sm:text-3xl font-light text-white font-display tracking-tight">
              Experience
            </h3>
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-mono-tech uppercase tracking-wider text-white/60">
            <span className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              Bespoke Journeys
            </span>
            <button 
              onClick={() => openModal('about')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
            >
              <span>Discover Secret Spots</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
