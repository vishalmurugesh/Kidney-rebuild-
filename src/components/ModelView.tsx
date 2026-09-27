import React from 'react';
import {
  Database,
  FileCode,
  ArrowRight
} from 'lucide-react';
import { NavTab } from './Navbar';

interface ModelViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const ModelView: React.FC<ModelViewProps> = ({ onNavigate }) => {
  return (
    <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <div className="text-center sm:text-left">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0066B3] border border-sky-200 mb-2">
          Model Specifications & Architecture
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-[#052E54] tracking-tight">
          Machine Learning Classification System
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Comprehensive performance evaluation, empirical test metrics, confusion matrices, and feature preprocessing
          architecture.
        </p>
      </div>

      {/* Model Performance Comparison Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-2">
          <div>
            <h2 className="text-lg font-bold text-[#052E54]">Unseen Test Performance Comparison</h2>
            <p className="text-xs text-slate-500">
              Evaluated on 80 held-out test records (50 CKD positive, 30 healthy controls) with random_state=42.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            Zero Data Leakage
          </span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-3 font-bold">Model</th>
                <th className="py-3 px-3 font-bold">Accuracy</th>
                <th className="py-3 px-3 font-bold">Precision (CKD)</th>
                <th className="py-3 px-3 font-bold">Recall (Sensitivity)</th>
                <th className="py-3 px-3 font-bold">F1-Score</th>
                <th className="py-3 px-3 font-bold">Test Errors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="bg-sky-50/50 font-semibold text-slate-900">
                <td className="py-3.5 px-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0066B3]" />
                  <span className="font-bold text-[#052E54]">Random Forest Classifier</span>
                </td>
                <td className="py-3.5 px-3 text-[#0066B3] font-black">100.0%</td>
                <td className="py-3.5 px-3 font-bold">100.0%</td>
                <td className="py-3.5 px-3 text-[#0066B3] font-black">100.0%</td>
                <td className="py-3.5 px-3 font-bold">100.0%</td>
                <td className="py-3.5 px-3 text-emerald-600 font-bold">0 / 80 (0%)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0877C9]" />
                  <span className="font-semibold text-slate-800">AdaBoost Classifier</span>
                </td>
                <td className="py-3.5 px-3 font-bold">98.75%</td>
                <td className="py-3.5 px-3">100.0%</td>
                <td className="py-3.5 px-3 font-bold text-[#0066B3]">98.00%</td>
                <td className="py-3.5 px-3 font-bold">98.99%</td>
                <td className="py-3.5 px-3 text-amber-600 font-bold">1 / 80 (1.25%)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0AA6DC]" />
                  <span className="font-semibold text-slate-800">Logistic Regression</span>
                </td>
                <td className="py-3.5 px-3 font-bold">98.75%</td>
                <td className="py-3.5 px-3">100.0%</td>
                <td className="py-3.5 px-3 font-bold text-[#0066B3]">98.00%</td>
                <td className="py-3.5 px-3 font-bold">98.99%</td>
                <td className="py-3.5 px-3 text-amber-600 font-bold">1 / 80 (1.25%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Confusion Matrices Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-[#052E54]">Confusion Matrices (80 Test Records)</h2>
          <p className="text-xs text-slate-500">
            True Negatives (TN), False Positives (FP), False Negatives (FN), and True Positives (TP).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Matrix 1: Random Forest */}
          <div className="border border-sky-200 bg-sky-50/30 rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#052E54] mb-3 flex items-center justify-between">
              <span>Random Forest</span>
              <span className="text-[10px] bg-[#0066B3] text-white px-2 py-0.5 rounded-full font-bold">
                Zero Misses
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">True Negative</div>
                <div className="text-base font-bold text-emerald-700">30</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">False Positive</div>
                <div className="text-base font-bold text-slate-700">0</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">False Negative</div>
                <div className="text-base font-bold text-slate-700">0</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">True Positive</div>
                <div className="text-base font-bold text-emerald-700">50</div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              100% sensitivity; zero CKD patients missed. Perfect orthogonal cuts across hemoglobin and urine albumin.
            </p>
          </div>

          {/* Matrix 2: AdaBoost */}
          <div className="border border-slate-200 bg-white rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#052E54] mb-3 flex items-center justify-between">
              <span>AdaBoost</span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                1 FN
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">True Negative</div>
                <div className="text-base font-bold text-emerald-700">30</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">False Positive</div>
                <div className="text-base font-bold text-slate-700">0</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">False Negative</div>
                <div className="text-base font-bold text-amber-700">1</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">True Positive</div>
                <div className="text-base font-bold text-emerald-700">49</div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              Single false negative on pediatric outlier patient with non-elevated adult baseline urinalysis markers.
            </p>
          </div>

          {/* Matrix 3: Logistic Regression */}
          <div className="border border-slate-200 bg-white rounded-xl p-5">
            <h3 className="text-sm font-bold text-[#052E54] mb-3 flex items-center justify-between">
              <span>Logistic Regression</span>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                1 FN
              </span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">True Negative</div>
                <div className="text-base font-bold text-emerald-700">30</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">False Positive</div>
                <div className="text-base font-bold text-slate-700">0</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">False Negative</div>
                <div className="text-base font-bold text-amber-700">1</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500">True Positive</div>
                <div className="text-base font-bold text-emerald-700">49</div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
              Borderline patient (P=0.416) missed at standard 0.50 threshold. Threshold tuning to 0.40 eliminates FN.
            </p>
          </div>
        </div>
      </div>

      {/* Dataset & Feature Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#0066B3]" />
            <h2 className="text-base font-bold text-[#052E54]">Dataset Specifications</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Source:</span>
              <span>UCI Machine Learning Repository (CKD Dataset)</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Total Patient Cohort:</span>
              <span>400 records (250 CKD / 150 Not-CKD)</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Stratified Training Split:</span>
              <span>320 patients (80% training data)</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Stratified Testing Split:</span>
              <span>80 patients (20% unseen test data)</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Missing Value Strategy:</span>
              <span>Median for numeric (14), Mode for categorical (10)</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Feature Scaling:</span>
              <span>StandardScaler (fit exclusively on train split)</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-[#0877C9]" />
            <h2 className="text-base font-bold text-[#052E54]">Technology Architecture</h2>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Machine Learning Framework:</span>
              <span>Python 3.10 • scikit-learn 1.7.2 • numpy • pandas</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Model Storage:</span>
              <span>joblib serialized binaries (pkl)</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Backend API Server:</span>
              <span>Express • TypeScript • Node.js</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Frontend Stack:</span>
              <span>React 19 • Vite • Tailwind CSS</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Typography:</span>
              <span>Manrope (body) & Space Grotesk (display)</span>
            </li>
            <li className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Inference Endpoint:</span>
              <span className="font-mono text-[#0066B3] font-bold">POST /predict</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#052E54]">Ready to test these models with live patient data?</h3>
          <p className="text-xs text-slate-600">Experience the prediction workflow using verified test samples.</p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('prediction')}
          className="px-6 py-2.5 rounded-full text-xs font-extrabold text-[#052E54] bg-[#C8F500] hover:bg-[#BFFF00] hover:shadow-[0_0_16px_rgba(200,245,0,0.4)] shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>Launch Prediction Form</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
