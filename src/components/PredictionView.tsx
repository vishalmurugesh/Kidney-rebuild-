import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Info,
  Check,
  Stethoscope,
  RotateCcw,
  User,
  HeartPulse,
  TestTube
} from 'lucide-react';

interface PatientFormState {
  model: 'random_forest' | 'adaboost' | 'logistic_regression';
  age: string;
  bp: string;
  sg: string;
  al: string;
  su: string;
  bgr: string;
  bu: string;
  sc: string;
  sod: string;
  pot: string;
  hemo: string;
  pcv: string;
  wc: string;
  rc: string;
  rbc: string;
  pc: string;
  pcc: string;
  ba: string;
  htn: string;
  dm: string;
  cad: string;
  appet: string;
  pe: string;
  ane: string;
}

interface PredictionResponse {
  success: boolean;
  message?: string;
  model_used: string;
  prediction: 'ckd' | 'notckd';
  prediction_display: string;
  is_ckd: boolean;
  probability_ckd_percent: number | null;
  confidence_percent: number | null;
  comparison?: {
    [key: string]: {
      prediction: string;
      display: string;
      probability_ckd: number | null;
    };
  };
  disclaimer?: string;
  error?: string;
  missing_fields?: string[];
  invalid_fields?: string[];
}

const INITIAL_FORM: PatientFormState = {
  model: 'random_forest',
  age: '',
  bp: '',
  sg: '1.020',
  al: '0',
  su: '0',
  bgr: '',
  bu: '',
  sc: '',
  sod: '',
  pot: '',
  hemo: '',
  pcv: '',
  wc: '',
  rc: '',
  rbc: 'normal',
  pc: 'normal',
  pcc: 'notpresent',
  ba: 'notpresent',
  htn: 'no',
  dm: 'no',
  cad: 'no',
  appet: 'good',
  pe: 'no',
  ane: 'no',
};

// Verified patient cases from the UCI clinical cohort
const SAMPLE_CKD: Partial<PatientFormState> = {
  age: '48',
  bp: '80',
  sg: '1.020',
  al: '1',
  su: '0',
  bgr: '121',
  bu: '36',
  sc: '1.2',
  sod: '138',
  pot: '4.4',
  hemo: '15.4',
  pcv: '44',
  wc: '7800',
  rc: '5.2',
  rbc: 'normal',
  pc: 'normal',
  pcc: 'notpresent',
  ba: 'notpresent',
  htn: 'yes',
  dm: 'yes',
  cad: 'no',
  appet: 'good',
  pe: 'no',
  ane: 'no',
};

const SAMPLE_HEALTHY: Partial<PatientFormState> = {
  age: '40',
  bp: '80',
  sg: '1.025',
  al: '0',
  su: '0',
  bgr: '140',
  bu: '10',
  sc: '1.2',
  sod: '135',
  pot: '5.0',
  hemo: '15.0',
  pcv: '48',
  wc: '10400',
  rc: '4.5',
  rbc: 'normal',
  pc: 'normal',
  pcc: 'notpresent',
  ba: 'notpresent',
  htn: 'no',
  dm: 'no',
  cad: 'no',
  appet: 'good',
  pe: 'no',
  ane: 'no',
};

export const PredictionView: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormState>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Analyzing patient data...');
  const [clientErrors, setClientErrors] = useState<string[]>([]);
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleInputChange = (field: keyof PatientFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (clientErrors.length > 0) {
      setClientErrors([]);
    }
  };

  const loadSample = (sample: Partial<PatientFormState>) => {
    setFormData((prev) => ({
      ...prev,
      ...sample,
    }));
    setClientErrors([]);
    setApiError(null);
    setPredictionResult(null);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setClientErrors([]);
    setApiError(null);
    setPredictionResult(null);
  };

  const validateInputs = (): string[] => {
    const errors: string[] = [];
    const requiredNumeric: Array<{ key: keyof PatientFormState; label: string; min: number; max: number }> = [
      { key: 'age', label: 'Age', min: 1, max: 120 },
      { key: 'bp', label: 'Blood Pressure', min: 40, max: 250 },
      { key: 'bgr', label: 'Blood Glucose Random', min: 20, max: 1000 },
      { key: 'bu', label: 'Blood Urea', min: 1, max: 500 },
      { key: 'sc', label: 'Serum Creatinine', min: 0.1, max: 100 },
      { key: 'sod', label: 'Sodium', min: 50, max: 200 },
      { key: 'pot', label: 'Potassium', min: 1, max: 50 },
      { key: 'hemo', label: 'Hemoglobin', min: 1, max: 25 },
      { key: 'pcv', label: 'Packed Cell Volume (PCV)', min: 5, max: 65 },
      { key: 'wc', label: 'White Blood Cell Count (WBC)', min: 500, max: 50000 },
      { key: 'rc', label: 'Red Blood Cell Count (RBC)', min: 1, max: 12 },
    ];

    for (const item of requiredNumeric) {
      const val = formData[item.key];
      if (val === '' || val === null || val === undefined) {
        errors.push(`${item.label} is required.`);
      } else {
        const num = parseFloat(val);
        if (isNaN(num)) {
          errors.push(`${item.label} must be a valid number.`);
        } else if (num < item.min || num > item.max) {
          errors.push(`${item.label} must be between ${item.min} and ${item.max}.`);
        }
      }
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setApiError(null);
    setPredictionResult(null);

    // Initial form field validation
    const errors = validateInputs();
    if (errors.length > 0) {
      setClientErrors(errors);
      setApiError('Please fill in all medical inputs.');
      return;
    }
    setClientErrors([]);

    // Construct the structured patient data payload
    const payload = {
      model: formData.model,
      age: formData.age !== '' ? parseFloat(formData.age) : null,
      bp: formData.bp !== '' ? parseFloat(formData.bp) : null,
      sg: formData.sg !== '' ? parseFloat(formData.sg) : null,
      al: formData.al !== '' ? parseFloat(formData.al) : null,
      su: formData.su !== '' ? parseFloat(formData.su) : null,
      bgr: formData.bgr !== '' ? parseFloat(formData.bgr) : null,
      bu: formData.bu !== '' ? parseFloat(formData.bu) : null,
      sc: formData.sc !== '' ? parseFloat(formData.sc) : null,
      sod: formData.sod !== '' ? parseFloat(formData.sod) : null,
      pot: formData.pot !== '' ? parseFloat(formData.pot) : null,
      hemo: formData.hemo !== '' ? parseFloat(formData.hemo) : null,
      pcv: formData.pcv !== '' ? parseFloat(formData.pcv) : null,
      wc: formData.wc !== '' ? parseFloat(formData.wc) : null,
      rc: formData.rc !== '' ? parseFloat(formData.rc) : null,
      rbc: formData.rbc,
      pc: formData.pc,
      pcc: formData.pcc,
      ba: formData.ba,
      htn: formData.htn,
      dm: formData.dm,
      cad: formData.cad,
      appet: formData.appet,
      pe: formData.pe,
      ane: formData.ane,
    };

    // Strict defensive validation immediately before fetch('/predict') call:
    // If the patient data payload has any empty, null, undefined, or NaN fields, completely halt execution
    const hasInvalidField = Object.entries(payload).some(([_, value]) => {
      return (
        value === '' ||
        value === null ||
        value === undefined ||
        (typeof value === 'number' && isNaN(value))
      );
    });

    if (hasInvalidField) {
      setApiError('Please fill in all medical inputs.');
      return;
    }

    setLoading(true);
    setLoadingStep('Analyzing patient data...');
    const timer = setTimeout(() => {
      setLoadingStep('Processing with AI model...');
    }, 400);

    try {
      // POST to prediction API with defensive error checking
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Catch 500 Internal Server Error cleanly
      if (response.status === 500) {
        setApiError('Server failed to process patient data');
        return;
      }

      const data: PredictionResponse = await response.json();

      if (!response.ok || !data.success) {
        setApiError(data.error || 'Server failed to process patient data');
      } else {
        setPredictionResult(data);
        setTimeout(() => {
          const resultElem = document.getElementById('prediction-result-anchor');
          if (resultElem && window.innerWidth < 1024) {
            resultElem.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } catch (_err) {
      setApiError('Server failed to process patient data');
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Title & Eyebrow */}
      <div className="mb-8 text-center sm:text-left">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-[#0066B3] border border-sky-200 mb-2">
          Diagnostic Evaluation Module
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-[#052E54] tracking-tight">
          Patient Kidney Health Prediction Form
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl leading-relaxed">
          Provide demographic and clinical laboratory parameters. Inputs are scaled against training distributions
          before algorithmic evaluation.
        </p>
      </div>

      {/* Quick Sample Selector Bar */}
      <div className="mb-8 p-4 bg-white rounded-2xl border border-sky-100 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <Sliders className="w-4 h-4 text-[#0877C9] shrink-0" />
          <span className="font-bold text-[#052E54]">Test Verified Profiles:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => loadSample(SAMPLE_CKD)}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            Load Sample Patient (CKD Positive)
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => loadSample(SAMPLE_HEALTHY)}
            className="px-3.5 py-1.5 text-xs font-bold rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer disabled:opacity-50"
          >
            Load Sample Patient (Non-CKD)
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-sky-100 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Algorithm Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#052E54] mb-3">
                Classification Model Selection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'random_forest',
                    title: 'Random Forest',
                    stat: '100% Accuracy',
                    sub: '100% Sensitivity (Recall)',
                  },
                  {
                    id: 'adaboost',
                    title: 'AdaBoost',
                    stat: '98.75% Accuracy',
                    sub: '98% Sensitivity (Recall)',
                  },
                  {
                    id: 'logistic_regression',
                    title: 'Logistic Regression',
                    stat: '98.75% Accuracy',
                    sub: 'Calibrated Probabilities',
                  },
                ].map((m) => {
                  const isSelected = formData.model === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      disabled={loading}
                      onClick={() => handleInputChange('model', m.id as any)}
                      className={`text-left p-3.5 rounded-xl border text-xs transition-all relative cursor-pointer ${
                        isSelected
                          ? 'border-[#0877C9] bg-sky-50/70 ring-2 ring-[#0877C9]/20 shadow-xs'
                          : 'border-slate-200 hover:border-sky-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#052E54]">{m.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#0066B3]" />}
                      </div>
                      <div className="text-[11px] font-bold text-[#0066B3]">{m.stat}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{m.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP 1: PATIENT INFORMATION */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-[#0066B3]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#052E54]">1. Patient Information</h3>
                  <p className="text-[11px] text-slate-500">Demographic baseline and physical vital signs</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age <span className="text-slate-400 font-normal">(Years, valid: 1 - 120)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 48"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0877C9]/20 focus:border-[#0877C9] bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Blood Pressure <span className="text-slate-400 font-normal">(mm/Hg, valid: 40 - 250)</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 80"
                    value={formData.bp}
                    onChange={(e) => handleInputChange('bp', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-[#0877C9]/20 focus:border-[#0877C9] bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            {/* GROUP 2: MEDICAL INFORMATION */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-[#0066B3]">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#052E54]">2. Medical Information</h3>
                  <p className="text-[11px] text-slate-500">Documented clinical comorbidities and physical findings</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hypertension (htn)</label>
                  <select
                    value={formData.htn}
                    onChange={(e) => handleInputChange('htn', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50/50"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Diabetes Mellitus (dm)</label>
                  <select
                    value={formData.dm}
                    onChange={(e) => handleInputChange('dm', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50/50"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Coronary Artery (cad)</label>
                  <select
                    value={formData.cad}
                    onChange={(e) => handleInputChange('cad', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50/50"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Appetite (appet)</label>
                  <select
                    value={formData.appet}
                    onChange={(e) => handleInputChange('appet', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50/50"
                  >
                    <option value="good">Good</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pedal Edema (pe)</label>
                  <select
                    value={formData.pe}
                    onChange={(e) => handleInputChange('pe', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50/50"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Anemia (ane)</label>
                  <select
                    value={formData.ane}
                    onChange={(e) => handleInputChange('ane', e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50/50"
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* GROUP 3: LABORATORY INFORMATION */}
            <div className="pt-6 border-t border-slate-100 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-[#0066B3]">
                  <TestTube className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#052E54]">3. Laboratory Information</h3>
                  <p className="text-[11px] text-slate-500">Diagnostic urinalysis, serum chemistry, and hematology panels</p>
                </div>
              </div>

              {/* Urinalysis */}
              <div className="p-4 rounded-xl bg-sky-50/30 border border-sky-100 space-y-3">
                <div className="text-xs font-bold text-[#052E54] uppercase tracking-wider">
                  Panel A: Urinalysis Findings
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Gravity (sg)</label>
                    <select
                      value={formData.sg}
                      onChange={(e) => handleInputChange('sg', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="1.005">1.005</option>
                      <option value="1.010">1.010</option>
                      <option value="1.015">1.015</option>
                      <option value="1.020">1.020 (Normal)</option>
                      <option value="1.025">1.025</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Albumin Dipstick (al)</label>
                    <select
                      value={formData.al}
                      onChange={(e) => handleInputChange('al', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="0">0 (Normal / Negative)</option>
                      <option value="1">1 (Mild +)</option>
                      <option value="2">2 (Moderate ++)</option>
                      <option value="3">3 (Elevated +++)</option>
                      <option value="4">4 (Severe ++++)</option>
                      <option value="5">5 (Severe +++++)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Sugar Dipstick (su)</label>
                    <select
                      value={formData.su}
                      onChange={(e) => handleInputChange('su', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="0">0 (Normal / Negative)</option>
                      <option value="1">1 (+)</option>
                      <option value="2">2 (++)</option>
                      <option value="3">3 (+++)</option>
                      <option value="4">4 (++++)</option>
                      <option value="5">5 (+++++)</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Red Blood Cells</label>
                    <select
                      value={formData.rbc}
                      onChange={(e) => handleInputChange('rbc', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="normal">Normal</option>
                      <option value="abnormal">Abnormal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pus Cell</label>
                    <select
                      value={formData.pc}
                      onChange={(e) => handleInputChange('pc', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="normal">Normal</option>
                      <option value="abnormal">Abnormal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Pus Cell Clumps</label>
                    <select
                      value={formData.pcc}
                      onChange={(e) => handleInputChange('pcc', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="notpresent">Not Present</option>
                      <option value="present">Present</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bacteria</label>
                    <select
                      value={formData.ba}
                      onChange={(e) => handleInputChange('ba', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    >
                      <option value="notpresent">Not Present</option>
                      <option value="present">Present</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Blood Chemistry */}
              <div className="p-4 rounded-xl bg-sky-50/30 border border-sky-100 space-y-3">
                <div className="text-xs font-bold text-[#052E54] uppercase tracking-wider">
                  Panel B: Blood Chemistry & Renal Biomarkers
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Blood Glucose (bgr) <span className="text-slate-400 font-normal">(mg/dL, 20 - 1000)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 121"
                      value={formData.bgr}
                      onChange={(e) => handleInputChange('bgr', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Blood Urea (bu) <span className="text-slate-400 font-normal">(mg/dL, 1 - 500)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 36"
                      value={formData.bu}
                      onChange={(e) => handleInputChange('bu', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Creatinine (sc) <span className="text-slate-400 font-normal">(mg/dL, 0.1 - 100)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 1.2"
                      value={formData.sc}
                      onChange={(e) => handleInputChange('sc', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Sodium (sod) <span className="text-slate-400 font-normal">(mEq/L, 50 - 200)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 138"
                      value={formData.sod}
                      onChange={(e) => handleInputChange('sod', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Potassium (pot) <span className="text-slate-400 font-normal">(mEq/L, 1 - 50)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 4.4"
                      value={formData.pot}
                      onChange={(e) => handleInputChange('pot', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Complete Blood Count */}
              <div className="p-4 rounded-xl bg-sky-50/30 border border-sky-100 space-y-3">
                <div className="text-xs font-bold text-[#052E54] uppercase tracking-wider">
                  Panel C: Complete Blood Count (CBC)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hemoglobin <span className="text-slate-400 font-normal">(g/dL, 1 - 25)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 15.4"
                      value={formData.hemo}
                      onChange={(e) => handleInputChange('hemo', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PCV <span className="text-slate-400 font-normal">(%, 5 - 65)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 44"
                      value={formData.pcv}
                      onChange={(e) => handleInputChange('pcv', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WBC Count <span className="text-slate-400 font-normal">(500 - 50k)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 7800"
                      value={formData.wc}
                      onChange={(e) => handleInputChange('wc', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      RBC Count <span className="text-slate-400 font-normal">(1 - 12)</span>
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 5.2"
                      value={formData.rc}
                      onChange={(e) => handleInputChange('rc', e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Client Validation Alerts */}
            {clientErrors.length > 0 && (
              <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1.5 text-red-900">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Please complete the following required fields:
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {clientErrors.slice(0, 4).map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                  {clientErrors.length > 4 && <li>...plus {clientErrors.length - 4} more required fields.</li>}
                </ul>
              </div>
            )}

            {/* Form Submit Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  loading
                    ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                    : 'bg-[#C8F500] hover:bg-[#BFFF00] text-[#052E54] hover:shadow-[0_0_20px_rgba(200,245,0,0.5)] active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#052E54]" />
                    <span>{loadingStep}</span>
                  </>
                ) : (
                  <>
                    <span>Generate Model Prediction</span>
                    <span className="w-5 h-5 rounded-full bg-[#052E54] text-[#C8F500] flex items-center justify-center text-xs">
                      →
                    </span>
                  </>
                )}
              </button>
              <span className="text-xs text-slate-400 text-center sm:text-right">
                All 24 clinical biomarkers checked prior to evaluation
              </span>
            </div>
          </form>
        </div>

        {/* Right Column: Output */}
        <div id="prediction-result-anchor" className="lg:col-span-4 space-y-6">
          {predictionResult ? (
            <div
              className={`p-6 sm:p-7 rounded-2xl border shadow-md transition-all ${
                predictionResult.is_ckd
                  ? 'border-red-200 bg-red-50/50 text-slate-900'
                  : 'border-emerald-200 bg-emerald-50/50 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Prediction Output
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold ${
                    predictionResult.is_ckd
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {predictionResult.is_ckd ? (
                    <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  {predictionResult.prediction.toUpperCase()}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight text-[#052E54] mb-2">
                {predictionResult.prediction_display}
              </h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Evaluated by{' '}
                <strong className="font-semibold text-slate-800">
                  {predictionResult.model_used.replace('_', ' ').toUpperCase()}
                </strong>{' '}
                from preprocessed patient laboratory vectors.
              </p>

              {predictionResult.probability_ckd_percent !== null && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4 space-y-3 shadow-2xs">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-semibold">Prediction Probability:</span>
                      <span
                        className={`font-extrabold ${
                          predictionResult.probability_ckd_percent > 50 ? 'text-red-600' : 'text-emerald-600'
                        }`}
                      >
                        {predictionResult.probability_ckd_percent}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          predictionResult.probability_ckd_percent > 50 ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(Math.max(predictionResult.probability_ckd_percent, 2), 100)}%` }}
                      />
                    </div>
                  </div>
                  {predictionResult.confidence_percent !== null && (
                    <div className="flex justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-500">Model Decision Confidence:</span>
                      <span className="font-bold text-slate-800">{predictionResult.confidence_percent}%</span>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 mb-4 text-xs text-slate-600 leading-relaxed shadow-2xs">
                <span className="font-bold text-slate-800 block mb-1">Educational Summary:</span>
                {predictionResult.is_ckd ? (
                  <p>
                    The trained classifier identified elevated risk factors consistent with renal impairment. Specific
                    indicators like serum creatinine, urine albumin, or hypertension contributed to the positive decision.
                  </p>
                ) : (
                  <p>
                    The trained classifier observed clinical parameters within the reference physiological range,
                    yielding a high negative predictive confidence for chronic kidney disease.
                  </p>
                )}
              </div>

              {predictionResult.comparison && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4 shadow-2xs">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#052E54] mb-2.5 flex items-center justify-between">
                    <span>Cross-Model Consensus</span>
                    <span className="text-[10px] text-[#0066B3] font-bold">3/3 Models</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    {Object.entries(predictionResult.comparison).map(([mKey, mVal]) => (
                      <div
                        key={mKey}
                        className="flex items-center justify-between py-1 border-b border-slate-50 last:border-none"
                      >
                        <span className="capitalize text-slate-700 font-medium">
                          {mKey.replace('_', ' ')}:
                        </span>
                        <div className="text-right">
                          <span
                            className={`font-bold ${
                              mVal.prediction === 'ckd' ? 'text-red-600' : 'text-emerald-600'
                            }`}
                          >
                            {mVal.display}
                          </span>
                          {mVal.probability_ckd !== null && (
                            <span className="text-[10px] text-slate-400 ml-1.5 font-mono">
                              ({mVal.probability_ckd}%)
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Prediction</span>
                </button>
              </div>

              <div className="text-[10px] text-slate-500 italic bg-white/70 p-3 rounded-lg border border-slate-200/70 leading-relaxed">
                This prediction is for educational and research purposes only and should not be used as a substitute for
                professional medical advice or diagnosis.
              </div>
            </div>
          ) : (
            <div className="bg-white p-7 rounded-2xl border border-dashed border-sky-200 text-center text-slate-500 shadow-2xs">
              <div className="w-12 h-12 mx-auto rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0877C9] mb-3">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-[#052E54] mb-1">Awaiting Patient Inputs</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Complete the Patient, Medical, and Laboratory sections on the left or load a sample patient profile to
                generate a live prediction.
              </p>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0066B3] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                <Info className="w-3.5 h-3.5" /> API Connected & Active
              </div>
            </div>
          )}

          {/* API Error Box */}
          {apiError && (
            <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs shadow-xs">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-red-900">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                Prediction Engine Notice
              </div>
              <p className="leading-relaxed">{apiError}</p>
            </div>
          )}

          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs text-xs space-y-3">
            <h4 className="font-bold text-[#052E54] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0877C9]" />
              <span>Standardized Feature Pipeline</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-[#0877C9] font-bold">•</span>
                <span>14 continuous numerical features scaled via frozen StandardScaler</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0877C9] font-bold">•</span>
                <span>10 categorical indicators mapped directly to binary indices (0/1)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#0877C9] font-bold">•</span>
                <span>Deterministic inference matching training checkpoint</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
