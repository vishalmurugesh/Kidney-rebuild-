import React from 'react';
import { Sparkles } from 'lucide-react';
import { NavTab } from './Navbar';

interface StartPredictionCTAProps {
  onNavigate: (tab: NavTab) => void;
}

export const StartPredictionCTA: React.FC<StartPredictionCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0066B3] via-[#0877C9] to-[#0AA6DC] text-white p-8 sm:p-12 shadow-xl border border-sky-300/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00D9FF]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#004D8C]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-[#DDF7FF] mb-3 border border-white/25">
            <Sparkles className="w-3.5 h-3.5 text-[#C8F500]" />
            <span>Ready for Patient Evaluation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight mb-3 text-white">
            Start AI Kidney Health Prediction for <span className="text-[#C8F500]">Healthcare</span>
          </h2>
          <p className="text-sm text-[#EAFBFF]/95 leading-relaxed mb-6">
            Enter routine demographic and laboratory measurements to assess clinical indicators across three validated
            machine-learning models.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('prediction')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-extrabold text-[#052E54] bg-[#C8F500] hover:bg-[#BFFF00] hover:shadow-[0_0_20px_rgba(200,245,0,0.5)] shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Launch Prediction Form</span>
              <span className="w-5 h-5 rounded-full bg-[#052E54] text-[#C8F500] flex items-center justify-center text-xs">
                →
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Learn Project Methodology</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
