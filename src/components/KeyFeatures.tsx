import React from 'react';
import {
  BrainCircuit,
  SlidersHorizontal,
  TestTube2,
  Smartphone,
  Gauge,
  BookOpen
} from 'lucide-react';

export const KeyFeatures: React.FC = () => {
  const features = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-[#0066B3]" />,
      title: 'AI-Based Prediction',
      desc: 'Harnesses three distinct machine learning architectures: Random Forest, AdaBoost, and Logistic Regression with verified performance metrics.',
    },
    {
      icon: <SlidersHorizontal className="w-5 h-5 text-[#0877C9]" />,
      title: 'Structured Patient Inputs',
      desc: 'Intuitive input categorization grouping clinical vitals, dipstick urinalysis, serum electrolytes, and hematology parameters.',
    },
    {
      icon: <TestTube2 className="w-5 h-5 text-[#0AA6DC]" />,
      title: 'Laboratory Data Analysis',
      desc: 'Seamless normalization of continuous biomarkers like Serum Creatinine, Hemoglobin, Blood Urea, and Urine Specific Gravity.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#0066B3]" />,
      title: 'Responsive Interface',
      desc: 'Designed mobile-first with adaptive touch-friendly forms, fluid typography, and clear visual hierarchy across all device viewports.',
    },
    {
      icon: <Gauge className="w-5 h-5 text-[#0877C9]" />,
      title: 'Fast Prediction Speed',
      desc: 'Pre-fitted scikit-learn models deliver low-latency classification results and calibrated probabilities in sub-second response times.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#0AA6DC]" />,
      title: 'Educational / Research Use',
      desc: 'Engineered as an open academic demonstration with complete transparency into data preprocessing, confusion matrices, and feature importance.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0066B3] border border-sky-200 mb-2">
          System Capabilities
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#052E54] tracking-tight">
          Engineered for Accuracy & Usability
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Robust data engineering combined with modern clinical usability standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all duration-300 flex items-start gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
              {feat.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#052E54] mb-1.5">{feat.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
