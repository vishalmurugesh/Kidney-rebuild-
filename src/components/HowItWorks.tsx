import React from 'react';
import { UserCheck, Binary, Cpu, BarChart3 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Enter Information',
      desc: 'Input patient demographics, vital signs, urinalysis findings, and laboratory blood panels into the validated clinical form.',
      icon: <UserCheck className="w-5 h-5 text-[#0066B3]" />,
    },
    {
      step: '02',
      title: 'AI Processes Data',
      desc: 'Backend sanitizes values, maps categorical metrics, and standardizes continuous biomarkers using frozen StandardScaler vectors.',
      icon: <Binary className="w-5 h-5 text-[#0877C9]" />,
    },
    {
      step: '03',
      title: 'Model Prediction',
      desc: 'The trained classification algorithm evaluates the 24-dimensional feature vector and computes multi-class decision probabilities.',
      icon: <Cpu className="w-5 h-5 text-[#0AA6DC]" />,
    },
    {
      step: '04',
      title: 'View Results',
      desc: 'Receive clear diagnostic classification, probability risk percentage, and cross-model consensus analysis instantly.',
      icon: <BarChart3 className="w-5 h-5 text-[#052E54]" />,
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0066B3] border border-sky-200 mb-2">
          Step-by-Step Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#052E54] tracking-tight">
          How the Prediction Pipeline Works
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          From clinical input validation to trained algorithmic inference in four seamless stages.
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-sky-200 via-[#0877C9]/40 to-sky-200 -translate-y-6 z-0 rounded-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-300 relative group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-black text-2xl text-[#0877C9]/30 group-hover:text-[#0877C9] transition-colors">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-base font-bold text-[#052E54] mb-2">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              {idx < steps.length - 1 && (
                <div className="lg:hidden mt-4 pt-2 flex justify-center text-sky-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
