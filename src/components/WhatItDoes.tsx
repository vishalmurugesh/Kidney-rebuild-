import React from 'react';
import { FileText, Cpu, Zap, GraduationCap } from 'lucide-react';

export const WhatItDoes: React.FC = () => {
  const cards = [
    {
      icon: <FileText className="w-5 h-5 text-[#0066B3]" />,
      title: 'Patient Data Analysis',
      description:
        'Accepts 24 comprehensive clinical biomarkers spanning blood chemistry, urinalysis, complete blood count, and patient history.',
      tag: 'Multivariate Input',
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#0877C9]" />,
      title: 'Machine Learning Prediction',
      description:
        'Processes clinical measurements through pre-trained Random Forest, AdaBoost, and Logistic Regression algorithms.',
      tag: 'Trained Models',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#00A6DC]" />,
      title: 'Fast Instant Results',
      description:
        'Standardizes numerical lab values and returns diagnostic probability assessment in milliseconds without server delay.',
      tag: 'Real-Time Inference',
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-[#004D8C]" />,
      title: 'Educational AI Tool',
      description:
        'Constructed as an academic healthcare ML project to demonstrate multi-model evaluation, cross-validation, and risk stratification.',
      tag: 'Academic Research',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0066B3] border border-sky-200 mb-2">
          Application Overview
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#052E54] tracking-tight">
          What This Application Does
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          A standardized machine-learning platform designed to evaluate kidney health indicators and calculate
          statistical predictive risk.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {card.icon}
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {card.tag}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#052E54] mb-2 group-hover:text-[#0066B3] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{card.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#0066B3] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View details</span>
              <span>&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
