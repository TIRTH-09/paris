import React, { useState } from 'react';
import { X, Send, Sparkles, Sun, ShieldCheck, Zap, ArrowRight, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { ActiveModal, BannerData } from '../types';

interface InteractiveModalsProps {
  activeModal: ActiveModal;
  closeModal: () => void;
  bannerData: BannerData;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  activeModal,
  closeModal,
  bannerData,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', energyNeeds: '100k-500k' });

  if (!activeModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      closeModal();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL 1: CONSULTATION / CONTACT */}
        {(activeModal === 'consultation' || activeModal === 'contact') && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold font-display">Let's Talk Solar Solutions</h3>
                <p className="text-sm text-slate-400">Tailor-made commercial solar infrastructure across Europe</p>
              </div>
            </div>

            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center gap-3 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Consultation Request Sent!</h4>
                <p className="text-sm text-slate-300 max-w-sm">
                  Our solar energy engineers will contact you at <strong>{formData.email || 'your email'}</strong> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-6 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-xs mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-xs mb-1">Business Email</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 text-xs mb-1">Company / Organization</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sunrock Logistics B.V."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 text-xs mb-1">Estimated Annual Energy Consumption</label>
                  <select
                    value={formData.energyNeeds}
                    onChange={(e) => setFormData({ ...formData, energyNeeds: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="50k-100k">50,000 – 100,000 kWh / year</option>
                    <option value="100k-500k">100,000 – 500,000 kWh / year</option>
                    <option value="500k-2M">500,000 – 2,000,000 kWh / year</option>
                    <option value="2M+">2,000,000+ kWh / year (Enterprise Grid)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-white text-slate-950 font-bold uppercase tracking-widest text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Tailored Solar Proposal</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* MODAL 2: OPEN MENU OVERVIEW */}
        {activeModal === 'menu' && (
          <div>
            <h3 className="text-2xl font-semibold font-display mb-2">{bannerData.companyName} Menu & Architecture</h3>
            <p className="text-sm text-slate-400 mb-6">Comprehensive navigation breakdown and solar capability directory</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors">
                <h4 className="font-semibold text-cyan-400 mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Commercial Solar
                </h4>
                <p className="text-xs text-slate-300">Roof-mounted and ground solar installations for industrial parks & logistics hubs.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors">
                <h4 className="font-semibold text-cyan-400 mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Smart Storage & Battery
                </h4>
                <p className="text-xs text-slate-300">BESS solutions to store excess energy and balance grid fluctuations efficiently.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors">
                <h4 className="font-semibold text-cyan-400 mb-1 flex items-center gap-2">
                  <Sun className="w-4 h-4" /> EV Fleet Charging
                </h4>
                <p className="text-xs text-slate-300">Integrated solar-powered EV charging infrastructure for zero-emission fleets.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors">
                <h4 className="font-semibold text-cyan-400 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> ESG & Carbon Reporting
                </h4>
                <p className="text-xs text-slate-300">Real-time GWh telemetry and automated sustainability impact documentation.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-full bg-white text-slate-950 font-medium text-xs hover:bg-slate-200 transition-colors"
              >
                Close Overview
              </button>
            </div>
          </div>
        )}

        {/* MODAL 3: SOLUTIONS */}
        {activeModal === 'solutions' && (
          <div>
            <h3 className="text-2xl font-semibold font-display mb-2">Solar Energy Solutions</h3>
            <p className="text-sm text-slate-400 mb-6">Sustainable energy solutions made easy, reliable, and tailor-made for Europe</p>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">Solar Rooftops</span>
                  <span className="text-xs text-emerald-400 font-mono">Up to 25MWp</span>
                </div>
                <p className="text-xs text-slate-400">Transform idle roof space into revenue-generating clean energy power plants.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">Solar Carports</span>
                  <span className="text-xs text-emerald-400 font-mono">Integrated EV Storage</span>
                </div>
                <p className="text-xs text-slate-400">Protect corporate vehicles while generating local solar electricity for your office.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">Power Purchase Agreements (PPA)</span>
                  <span className="text-xs text-cyan-400 font-mono">Zero Upfront CAPEX</span>
                </div>
                <p className="text-xs text-slate-400">We invest, build, and operate the system; you lock in predictable clean energy rates.</p>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 4: PROJECTS */}
        {activeModal === 'projects' && (
          <div>
            <h3 className="text-2xl font-semibold font-display mb-2">GWh Clean Energy Projects</h3>
            <p className="text-sm text-slate-400 mb-6">Over {bannerData.generatedEnergyValue} generated across 180+ European logistics sites</p>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4 font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <span className="text-slate-400 block text-[10px]">TOTAL CAPACITY</span>
                <span className="text-lg font-bold text-cyan-400">946 GWh</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10">
                <span className="text-slate-400 block text-[10px]">BENEFICIARIES</span>
                <span className="text-lg font-bold text-emerald-400">{bannerData.impactValue}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Every project is monitored with real-time IoT telemetry, sending live performance statistics to European grid operators and client dashboards.
            </p>
          </div>
        )}

        {/* MODAL 5: ABOUT */}
        {activeModal === 'about' && (
          <div>
            <h3 className="text-2xl font-semibold font-display mb-2">About {bannerData.companyName}</h3>
            <p className="text-sm text-slate-400 mb-4">Leading Europe's transition to clean, decentralized solar power</p>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Since 2019, {bannerData.companyName} has developed, financed, and operated large-scale solar projects for logistics and commercial real estate partners across Germany, France, Netherlands, and the UK.
            </p>

            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
              🌍 European Commitment: Driving net-zero emissions through smart grid integration and custom solar architecture.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
