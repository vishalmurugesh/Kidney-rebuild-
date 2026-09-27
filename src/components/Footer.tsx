import React from 'react';
import { Logo } from './Logo';
import { NavTab } from './Navbar';
import { Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-sky-100 bg-white pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-sky-50">
          <div className="md:col-span-5 space-y-3">
            <div onClick={() => onNavigate('home')}>
              <Logo />
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Early Prediction of Chronic Kidney Disease Using Machine Learning. An academic and clinical research
              demonstration evaluating Random Forest, AdaBoost, and Logistic Regression on standardized biomarker data.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-[#0066B3]" />
              <span>Zero Clinical Data Retention Policy</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-bold text-[#052E54] uppercase tracking-wider mb-2">Navigation</div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#0066B3] transition-colors cursor-pointer"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('prediction')}
                  className="hover:text-[#0066B3] transition-colors cursor-pointer"
                >
                  Interactive Prediction
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('model')}
                  className="hover:text-[#0066B3] transition-colors cursor-pointer"
                >
                  Model Architecture & Metrics
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#0066B3] transition-colors cursor-pointer"
                >
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold text-[#052E54] uppercase tracking-wider mb-2">
              Academic Citation
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Trained on the UCI Machine Learning Repository Chronic Kidney Disease dataset. Preprocessing includes
              stratified splitting, median & mode imputation, and StandardScaler normalizations.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-400">
              Dataset: 400 records • 24 biomarkers • Stratified 80/20
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Kidney Prediction (KP) AI Project. For Educational & Research Purposes.
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Privacy Assured</span>
            <span>•</span>
            <span>Local Inference</span>
            <span>•</span>
            <span>v1.1.0 Reference Color Palette</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
