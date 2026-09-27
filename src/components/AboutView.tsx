import React from 'react';
import {
  Activity,
  HeartPulse,
  Brain,
  ShieldAlert,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { NavTab } from './Navbar';

interface AboutViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <div className="text-center sm:text-left">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0066B3] border border-sky-200 mb-2">
          Project Background & Purpose
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-[#052E54] tracking-tight">
          About the Kidney Health AI Initiative
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
          An academic machine learning project demonstrating how statistical pattern recognition can assist clinical
          laboratory screening for early-stage chronic kidney disease.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0066B3]">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#052E54]">Project Objective</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            The primary goal is the construction of a reliable, mathematically grounded classification pipeline for
            early chronic kidney disease detection. By rigorously handling missing data, eliminating information leakage,
            and standardizing 24 clinical biomarkers, this application demonstrates high-sensitivity diagnostic
            stratification.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#052E54]">Why Kidney Disease Prediction?</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Chronic Kidney Disease (CKD) often progresses silently in its early stages without overt symptoms until up to
            80% of nephron filtration capacity is lost. Early detection via routine urinalysis and serum chemistry allows
            preventative therapeutic interventions that can halt disease progression, avoiding costly dialysis and renal
            transplantation.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0877C9]">
            <Brain className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#052E54]">Machine Learning Approach</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            We evaluate three distinct algorithmic families: tree-based ensembling (Random Forest), adaptive boosting
            stumps (AdaBoost), and L2-regularized linear classification (Logistic Regression). All models operate on
            strictly partitioned, standardized inputs to ensure zero data leakage between training and testing splits.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0AA6DC]">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-[#052E54]">Educational & Research Purpose</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            This application is engineered exclusively as an educational project in medical data science. It is intended
            for students, researchers, and developers exploring healthcare machine learning pipelines, sensitivity-first
            metric trade-offs, and secure model deployment.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-6 sm:p-8 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-xs text-amber-950">
            <h3 className="text-base font-bold text-amber-900">Strict Medical & Clinical Disclaimer</h3>
            <p className="leading-relaxed">
              This system is not an authorized or certified medical diagnostic device. It does not replace the clinical
              judgment, physical examination, or diagnostic consultation of a licensed medical practitioner or
              nephrologist.
            </p>
            <p className="leading-relaxed">
              Predictions generated by this tool are probabilistic statistical estimates based on a retrospective
              research dataset. Users and patients should never commence, alter, or discontinue any pharmaceutical
              treatment or clinical regimen based on the output of this software.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => onNavigate('prediction')}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-extrabold text-[#052E54] bg-[#C8F500] hover:bg-[#BFFF00] hover:shadow-[0_0_20px_rgba(200,245,0,0.5)] shadow-xs cursor-pointer"
        >
          <span>Proceed to Prediction Module</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
