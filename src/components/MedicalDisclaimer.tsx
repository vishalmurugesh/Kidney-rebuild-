import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <section className="py-6 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="rounded-2xl border border-amber-200/90 bg-amber-50/70 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 text-xs text-amber-950">
          <h4 className="font-bold text-sm text-amber-900 tracking-tight flex items-center gap-2">
            <span>Academic & Clinical Safety Notice</span>
            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-800">
              Research Prototype
            </span>
          </h4>
          <p className="leading-relaxed text-amber-900/90">
            This tool is intended for educational and research purposes only and should not be used as a substitute for
            professional medical diagnosis or advice. No medical treatment decisions or clinical interventions should be
            initiated based upon these model estimates. Patients experiencing symptoms or abnormal laboratory results
            must consult a qualified nephrologist or medical physician.
          </p>
        </div>
      </div>
    </section>
  );
};
