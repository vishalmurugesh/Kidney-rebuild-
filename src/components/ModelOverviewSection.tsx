import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NavTab } from './Navbar';

interface ModelOverviewSectionProps {
  onNavigate: (tab: NavTab) => void;
}

export const ModelOverviewSection: React.FC<ModelOverviewSectionProps> = ({ onNavigate }) => {
  const models = [
    {
      name: 'Random Forest Classifier',
      tag: '100 Ensemble Trees',
      accuracy: '100.0%',
      recall: '100.0%',
      precision: '100.0%',
      f1: '100.0%',
      highlight: true,
      desc: 'Evaluates non-linear decision splits across lab features. Achieved zero classification errors on 80 unseen test cases.',
      cm: { tn: 30, fp: 0, fn: 0, tp: 50 },
    },
    {
      name: 'AdaBoost Classifier',
      tag: 'Sequential Stumps',
      accuracy: '98.75%',
      recall: '98.00%',
      precision: '100.0%',
      f1: '98.99%',
      highlight: false,
      desc: 'Adaptive boosting combining decision stumps. Missed 1 pediatric outlier case on test data.',
      cm: { tn: 30, fp: 0, fn: 1, tp: 49 },
    },
    {
      name: 'Logistic Regression',
      tag: 'L2 Standardized',
      accuracy: '98.75%',
      recall: '98.00%',
      precision: '100.0%',
      f1: '98.99%',
      highlight: false,
      desc: 'Linear hyperplane with L2 penalty. Provides calibrated, smooth predictive probability scores.',
      cm: { tn: 30, fp: 0, fn: 1, tp: 49 },
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0066B3] border border-sky-200 mb-2">
            Empirical Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#052E54] tracking-tight">
            Trained Model Performance
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Evaluated on the exact same 80 unseen test patients with strict data leakage prevention.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('model')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066B3] hover:text-[#0877C9] transition-colors self-start md:self-auto cursor-pointer"
        >
          <span>View Comprehensive Metrics & Charts</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {models.map((m, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between ${
              m.highlight
                ? 'bg-gradient-to-b from-sky-50/70 via-white to-white border-sky-300 shadow-md ring-1 ring-[#0877C9]/20'
                : 'bg-white border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {m.tag}
                </span>
                {m.highlight && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0066B3] text-white">
                    Top Recall
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[#052E54] mb-2">{m.name}</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">{m.desc}</p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-sky-50/50 rounded-xl border border-sky-100/80">
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Test Accuracy</div>
                  <div className="text-sm font-extrabold text-[#052E54]">{m.accuracy}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Recall (Sensitivity)</div>
                  <div className="text-sm font-extrabold text-[#0066B3]">{m.recall}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Precision</div>
                  <div className="text-sm font-extrabold text-[#052E54]">{m.precision}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">F1-Score</div>
                  <div className="text-sm font-extrabold text-[#052E54]">{m.f1}</div>
                </div>
              </div>

              {/* Confusion Matrix Mini Grid */}
              <div className="text-[11px] text-slate-600">
                <div className="font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Confusion Matrix (80 Test Cases):</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-center font-mono text-[10px]">
                  <div className="bg-emerald-50 text-emerald-800 p-1 rounded-sm border border-emerald-100 font-bold">
                    TN: {m.cm.tn}
                  </div>
                  <div className="bg-slate-100 text-slate-700 p-1 rounded-sm font-bold">
                    FP: {m.cm.fp}
                  </div>
                  <div className={`${m.cm.fn > 0 ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-100'} p-1 rounded-sm font-bold`}>
                    FN: {m.cm.fn}
                  </div>
                  <div className="bg-emerald-50 text-emerald-800 p-1 rounded-sm border border-emerald-100 font-bold">
                    TP: {m.cm.tp}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate('prediction')}
                className="w-full py-2.5 rounded-full text-xs font-bold text-[#0066B3] hover:text-white hover:bg-[#0066B3] border border-sky-200 hover:border-[#0066B3] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Test this Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
