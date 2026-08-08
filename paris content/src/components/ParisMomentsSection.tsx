import React from 'react';
import { Heart, Palette, Coffee, Crown, ArrowUpRight, Sparkles } from 'lucide-react';
import { ActiveModal } from '../types';

interface ParisMomentsSectionProps {
  openModal: (modal: ActiveModal) => void;
}

export const ParisMomentsSection: React.FC<ParisMomentsSectionProps> = ({ openModal }) => {
  const experiences = [
    {
      id: 'romantic',
      title: 'Romantic Paris',
      desc: 'Sunset Seine cruises, candlelit dinners, and hidden corners made for two.',
      icon: <Heart className="w-5 h-5 text-rose-400" />,
      badge: 'For Couples',
      gradient: 'from-rose-500/10 via-purple-500/5 to-transparent',
    },
    {
      id: 'art',
      title: 'Art & Culture',
      desc: "Explore the Louvre, Musée d'Orsay, and the artistic soul of Montmartre.",
      icon: <Palette className="w-5 h-5 text-cyan-400" />,
      badge: 'Curated Heritage',
      gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
    },
    {
      id: 'lifestyle',
      title: 'Parisian Lifestyle',
      desc: 'Cafés, boutiques, local markets, and slow mornings like a true Parisian.',
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
      badge: 'Local Rhythm',
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    },
    {
      id: 'luxury',
      title: 'Luxury Escape',
      desc: 'Private tours, fine dining, chauffeur transfers, and unforgettable stays.',
      icon: <Crown className="w-5 h-5 text-emerald-400" />,
      badge: 'VIP Concierge',
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    },
  ];

  return (
    <section id="section-experiences" className="relative w-full px-4 sm:px-8 lg:px-12 py-20 bg-transparent text-white z-20 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="mb-3">
              <span className="text-[11px] uppercase tracking-[0.35em] text-emerald-400 font-bold font-mono-tech flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Section 3 Experiences — “Your Paris Moments”
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] font-display">
              Choose Your Paris
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/70 font-light max-w-md leading-relaxed">
            Tailor every detail of your journey. Select an experience archetype or combine elements to create your dream itinerary.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative group rounded-3xl p-6 bg-black/10 border border-white/15 flex flex-col justify-between transition-all duration-300 hover:bg-black/30 hover:border-white/35 hover:-translate-y-1"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shadow-md">
                    {exp.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-mono-tech text-white/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {exp.badge}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-white tracking-tight mb-3 font-display">
                  {exp.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                  {exp.desc}
                </p>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => openModal('consultation')}
                  className="text-xs font-semibold uppercase tracking-wider text-emerald-400 group-hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Select Experience</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
