import React, { useState } from 'react';
import { Menu, X, ChevronDown, Globe, Sparkles } from 'lucide-react';
import { LanguageOption, ActiveModal } from '../types';

interface BannerHeaderProps {
  companyName: string;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  openModal: (modal: ActiveModal) => void;
  selectedLang: LanguageOption;
  setSelectedLang: (lang: LanguageOption) => void;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'EN', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'NL', name: 'Nederlands', flag: '🇳🇱' },
];

export const BannerHeader: React.FC<BannerHeaderProps> = ({
  companyName,
  activeNav,
  setActiveNav,
  openModal,
  selectedLang,
  setSelectedLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = ['Overview', 'Story', 'Experiences', 'Journey'];

  const navItemToId: Record<string, string> = {
    Overview: 'section-overview',
    Story: 'section-story',
    Experiences: 'section-experiences',
    Journey: 'section-journey',
  };

  const handleNavClick = (item: string) => {
    setActiveNav(item);
    const targetId = navItemToId[item];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full pt-6 px-4 sm:px-8 lg:px-12 relative z-30 flex items-center justify-between flex-nowrap whitespace-nowrap">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); setActiveNav('Home'); }}
          className="text-lg sm:text-xl font-extrabold tracking-widest text-white font-display uppercase hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
        >
          {companyName}
        </a>
      </div>

      {/* Desktop Navigation Pill - Strictly single line */}
      <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl flex-nowrap whitespace-nowrap shrink-0 mx-2">
        {navItems.map((item) => {
          const isActive = activeNav === item;
          return (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className={`px-3 lg:px-4 py-1.5 rounded-full text-[10px] lg:text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-white text-slate-950 shadow-lg font-bold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {item}
            </button>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-nowrap whitespace-nowrap">
        {/* Open Menu Pill Button */}
        <button
          onClick={() => openModal('menu')}
          className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-1.5 rounded-full text-[10px] lg:text-[11px] uppercase tracking-widest font-medium border border-white/20 hover:bg-white hover:text-slate-950 text-white transition-all hover:scale-105 active:scale-95 bg-white/5 backdrop-blur-md whitespace-nowrap shrink-0"
        >
          Open menu
        </button>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-xl transition-all hover:scale-105 active:scale-95"
            title={`Language: ${selectedLang.name}`}
          >
            <span>{selectedLang.flag}</span>
          </button>

          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/20 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-white/10 transition-colors ${
                    selectedLang.code === lang.code ? 'text-cyan-400 font-semibold' : 'text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                  {selectedLang.code === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-left px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                  activeNav === item
                    ? 'bg-white text-slate-950 font-bold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <hr className="border-white/10 my-1" />

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openModal('menu');
            }}
            className="w-full py-3 rounded-2xl bg-cyan-500 text-slate-950 font-semibold text-center hover:bg-cyan-400 transition-colors"
          >
            Open Menu & Overview
          </button>
        </div>
      )}
    </header>
  );
};
