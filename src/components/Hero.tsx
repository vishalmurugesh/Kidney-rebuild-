import React from 'react';
import { ArrowRight, Sparkles, Database, CheckCircle, Cpu, Activity, ShieldCheck } from 'lucide-react';
import { KidneyVisual } from './KidneyVisual';
import { NavTab } from './Navbar';

interface HeroProps {
  onNavigate: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-3 pb-12 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0066B3] via-[#0877C9] to-[#0AA6DC] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-sky-300/30">
        <div className="absolute -top-16 -right-16 w-96 h-96 bg-[#00D9FF]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#38E8FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#004D8C]/40 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-12 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(221, 247, 255, 0.6) 1.2px, transparent 1.2px)`,
            backgroundSize: '26px 26px',
          }}
        />
        <div className="absolute -inset-full w-[300%] h-[300%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.06)_50%,transparent_55%)] pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#EAFBFF] text-xs font-semibold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C8F500]" />
              <span>AI-POWERED KIDNEY HEALTH ANALYSIS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-display font-extrabold text-white tracking-tight leading-[1.15]">
              Kidney Disease <br className="hidden sm:inline" />
              Prediction for{' '}
              <span className="text-[#C8F500] drop-shadow-[0_2px_12px_rgba(200,245,0,0.35)]">
                Healthcare
              </span>
            </h1>
            <p className="text-sm sm:text-base text-[#EAFBFF]/95 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Analyze patient health and laboratory information using an AI-based prediction model designed for
              educational and research purposes.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('prediction')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-extrabold text-[#052E54] bg-[#C8F500] hover:bg-[#BFFF00] hover:shadow-[0_0_24px_rgba(200,245,0,0.5)] shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Start Prediction</span>
                <span className="w-5 h-5 rounded-full bg-[#052E54] text-[#C8F500] flex items-center justify-center text-xs">
                  →
                </span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('model')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-[#38E8FF]" />
                <span>Explore Model</span>
              </button>
            </div>
            <div className="pt-5 border-t border-white/20 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-sm sm:text-base font-display font-extrabold text-white">100%</div>
                <div className="text-[10px] sm:text-xs text-[#DDF7FF]">Sensitivity (RF)</div>
              </div>
              <div className="border-l border-white/20 pl-3 sm:pl-4">
                <div className="text-sm sm:text-base font-display font-extrabold text-white">24 Tests</div>
                <div className="text-[10px] sm:text-xs text-[#DDF7FF]">Clinical Markers</div>
              </div>
              <div className="border-l border-white/20 pl-3 sm:pl-4">
                <div className="text-sm sm:text-base font-display font-extrabold text-white">3 Models</div>
                <div className="text-[10px] sm:text-xs text-[#DDF7FF]">Consensus Vote</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center items-center">
            <KidneyVisual />
          </div>
        </div>
        <div className="mt-8 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#EAFBFF]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8F500] shadow-[0_0_8px_#C8F500]" />
            <span className="font-medium">Validated on UCI Chronic Kidney Disease Clinical Cohort</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#DDF7FF]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#38E8FF] animate-pulse" />
              Real-Time Inference Active
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline">Zero Data Retention</span>
          </div>
        </div>
      </div>
    </section>
  );
};
