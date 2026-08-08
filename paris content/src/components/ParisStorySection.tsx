import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ActiveModal } from '../types';

interface ParisStorySectionProps {
  openModal: (modal: ActiveModal) => void;
}

export const ParisStorySection: React.FC<ParisStorySectionProps> = ({ openModal }) => {
  const highlights = [
    { icon: '🗼', title: 'Iconic landmarks', desc: 'Eiffel Tower, Louvre Museum, Notre-Dame Cathedral & Arc de Triomphe' },
    { icon: '🥐', title: 'Authentic French cuisine', desc: 'Artisanal boulangeries, Michelin dining & cozy Montmartre bistros' },
    { icon: '🎨', title: 'Art & culture', desc: 'World-class galleries, Musée d’Orsay masterworks & private studio tours' },
    { icon: '🌙', title: 'Paris after dark', desc: 'Seine river cruises, jazz cellars, rooftop lounges & illuminated vistas' },
  ];

  return (
    <section id="section-story" className="relative w-full px-4 sm:px-8 lg:px-12 py-20 bg-transparent text-white z-20 border-t border-white/10 overflow-hidden">
      {/* Subtle background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Eyebrow Label */}
        <div className="mb-4">
          <span className="text-[11px] uppercase tracking-[0.35em] text-emerald-400 font-bold font-mono-tech">
            Section 2 — Discover Paris
          </span>
        </div>

        {/* Main Headline & Lead Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] font-display">
              Where Every Street Tells a Story
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between h-full pt-2">
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
              Paris is more than the Eiffel Tower. Wander through historic streets, discover timeless architecture, taste unforgettable cuisine, and experience the effortless romance that makes the city unlike anywhere else.
            </p>

            <div className="mt-8">
              <button
                onClick={() => openModal('consultation')}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/20 transition-all duration-300 font-semibold text-xs uppercase tracking-widest cursor-pointer"
              >
                <span>Plan Your Custom Itinerary</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="relative group rounded-3xl p-6 bg-black/10 border border-white/15 hover:bg-black/30 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-white/60 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
