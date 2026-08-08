import React, { useState } from 'react';
import { 
  Palette, 
  Layers, 
  Edit3, 
  Code, 
  Eye, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Check, 
  Copy, 
  Maximize2, 
  RotateCcw,
  Image as ImageIcon,
  Grid
} from 'lucide-react';
import { BackgroundMode, BannerData, ActiveModal } from '../types';

interface StudioControlPanelProps {
  bgMode: BackgroundMode;
  setBgMode: (mode: BackgroundMode) => void;
  bannerData: BannerData;
  setBannerData: React.Dispatch<React.SetStateAction<BannerData>>;
  openModal: (modal: ActiveModal) => void;
  resetDefault: () => void;
}

export const StudioControlPanel: React.FC<StudioControlPanelProps> = ({
  bgMode,
  setBgMode,
  bannerData,
  setBannerData,
  openModal,
  resetDefault,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'background' | 'editor' | 'export'>('background');
  const [copiedCode, setCopiedCode] = useState(false);

  const bgOptions: { id: BackgroundMode; name: string; desc: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'studio-teal',
      name: 'Clean Studio Teal (No Background)',
      desc: 'Minimalist studio gradient matching reference composition without photo noise',
      icon: <Sparkles className="w-4 h-4 text-emerald-300" />,
      color: 'bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-900',
    },
    {
      id: 'studio-dark',
      name: 'Dark Studio Minimalist',
      desc: 'Sleek dark slate studio background for high contrast typography',
      icon: <Palette className="w-4 h-4 text-slate-300" />,
      color: 'bg-slate-950',
    },
    {
      id: 'studio-light',
      name: 'Light Studio Clean',
      desc: 'Soft light studio backdrop for high contrast dark branding',
      icon: <Palette className="w-4 h-4 text-amber-300" />,
      color: 'bg-teal-50',
    },
    {
      id: 'photo',
      name: 'Clean Energy Landscape Photo',
      desc: 'AI generated photorealistic wind turbines & solar energy backdrop',
      icon: <ImageIcon className="w-4 h-4 text-cyan-300" />,
      color: 'bg-gradient-to-r from-blue-600 to-emerald-600',
    },
    {
      id: 'transparent-grid',
      name: 'Transparent Canvas Grid',
      desc: 'Checkerboard blueprint grid for isolated component review',
      icon: <Grid className="w-4 h-4 text-indigo-300" />,
      color: 'bg-slate-800',
    },
  ];

  const generateReactCode = () => {
    return `<div className="relative min-h-screen flex flex-col justify-between bg-teal-800 text-white font-sans">
  {/* Header */}
  <header className="flex items-center justify-between p-6">
    <div className="text-2xl font-bold uppercase tracking-wider">${bannerData.companyName}</div>
    <nav className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
      <button className="px-4 py-1.5 rounded-full bg-white text-slate-900 font-medium">Home</button>
      <button className="px-4 py-1.5 hover:bg-white/10 rounded-full">Solutions</button>
      <button className="px-4 py-1.5 hover:bg-white/10 rounded-full">Projects</button>
      <button className="px-4 py-1.5 hover:bg-white/10 rounded-full">About us</button>
      <button className="px-4 py-1.5 hover:bg-white/10 rounded-full">Contact</button>
    </nav>
    <button className="px-5 py-2 rounded-full bg-white/15 backdrop-blur-md">Open menu</button>
  </header>

  {/* Main Hero */}
  <main className="text-center max-w-4xl mx-auto px-4 py-12 my-auto">
    <h1 className="text-6xl font-light font-display leading-tight">${bannerData.headline}</h1>
    <p className="mt-4 text-xl text-white/90 font-light max-w-xl mx-auto">${bannerData.subtitle}</p>
    <button className="mt-8 px-6 py-2.5 rounded-full bg-white text-slate-900 font-medium inline-flex items-center gap-3">
      ${bannerData.ctaText} ↗
    </button>
  </main>

  {/* Bottom Glass Cards */}
  <footer className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-7xl mx-auto w-full">
    <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
      <h3 className="text-2xl font-light mb-2">Clean energy generated</h3>
      <p>Since 2019, we've generated over <strong>${bannerData.generatedEnergyValue}</strong> ${bannerData.generatedEnergyText}</p>
    </div>
    <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
      <h3 className="text-2xl font-light mb-2">Impact</h3>
      <p>Our clean energy solutions currently benefit over <strong>${bannerData.impactValue}</strong> ${bannerData.impactText}</p>
    </div>
  </footer>
</div>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateReactCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md w-full sm:w-96 px-2">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        {/* Header Bar */}
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="px-5 py-3.5 flex items-center justify-between bg-white/5 border-b border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-white tracking-wide">Banner Studio Controls</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); resetDefault(); }}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Reset Banner to Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button className="text-slate-300">
              {isCollapsed ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <div className="p-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {/* Control Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-2xl border border-white/10 text-xs font-medium">
              <button
                onClick={() => setActiveTab('background')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'background' ? 'bg-white text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Background</span>
              </button>
              <button
                onClick={() => setActiveTab('editor')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'editor' ? 'bg-white text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Text</span>
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'export' ? 'bg-white text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>

            {/* TAB 1: BACKGROUND SELECTION */}
            {activeTab === 'background' && (
              <div className="flex flex-col gap-2.5">
                <span className="text-xs text-slate-400 font-medium">Select Canvas Background:</span>
                {bgOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBgMode(opt.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      bgMode === opt.id
                        ? 'bg-white/10 border-emerald-400 shadow-lg ring-1 ring-emerald-400'
                        : 'bg-slate-950/60 border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl ${opt.color} flex items-center justify-center shrink-0 mt-0.5 border border-white/20`}>
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{opt.name}</span>
                        {bgMode === opt.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* TAB 2: TEXT EDITOR */}
            {activeTab === 'editor' && (
              <div className="flex flex-col gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Company Name:</label>
                  <input
                    type="text"
                    value={bannerData.companyName}
                    onChange={(e) => setBannerData({ ...bannerData, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Headline:</label>
                  <textarea
                    rows={2}
                    value={bannerData.headline}
                    onChange={(e) => setBannerData({ ...bannerData, headline: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Subtitle:</label>
                  <input
                    type="text"
                    value={bannerData.subtitle}
                    onChange={(e) => setBannerData({ ...bannerData, subtitle: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">CTA Button Text:</label>
                  <input
                    type="text"
                    value={bannerData.ctaText}
                    onChange={(e) => setBannerData({ ...bannerData, ctaText: e.target.value })}
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Generated Stat:</label>
                    <input
                      type="text"
                      value={bannerData.generatedEnergyValue}
                      onChange={(e) => setBannerData({ ...bannerData, generatedEnergyValue: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Impact Metric:</label>
                    <input
                      type="text"
                      value={bannerData.impactValue}
                      onChange={(e) => setBannerData({ ...bannerData, impactValue: e.target.value })}
                      className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CODE EXPORT */}
            {activeTab === 'export' && (
              <div className="flex flex-col gap-3 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  Export this banner layout structure with current typography, glassmorphism CSS, and responsive layout:
                </p>

                <div className="relative bg-slate-950 rounded-2xl p-3 border border-white/10 font-mono text-[11px] text-emerald-400 max-h-36 overflow-y-auto">
                  <pre>{generateReactCode()}</pre>
                </div>

                <button
                  onClick={handleCopyCode}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Banner Code'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
