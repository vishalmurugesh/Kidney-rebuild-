import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export const KidneyVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Luminous Electric Cyan & Cerulean Atmospheric Halo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00D9FF]/35 via-[#0877C9]/40 to-[#38E8FF]/30 rounded-full blur-3xl transform scale-95 pointer-events-none" />
      <div className="absolute inset-6 bg-[#00D9FF]/20 rounded-full blur-xl pointer-events-none" />

      {/* Subtle Ice-Blue Waveform Vector in Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M10 200 H120 L135 150 L148 245 L162 110 L178 285 L192 185 L208 215 L222 200 H390"
          stroke="#C8F1FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-wave"
        />
        {/* Soft grid points */}
        <circle cx="50" cy="70" r="1.5" fill="#38E8FF" opacity="0.6" />
        <circle cx="350" cy="90" r="1.5" fill="#38E8FF" opacity="0.6" />
        <circle cx="70" cy="330" r="1.5" fill="#38E8FF" opacity="0.6" />
        <circle cx="330" cy="310" r="1.5" fill="#38E8FF" opacity="0.6" />
      </svg>

      {/* Floating Animated Crystalline Kidney Organ */}
      <div className="relative z-10 w-[300px] sm:w-[340px] aspect-square animate-float">
        {/* Cyan Medical Scanning Beam Effect */}
        <div className="absolute inset-x-2 h-14 bg-gradient-to-b from-transparent via-[#00D9FF]/40 to-transparent pointer-events-none animate-scanline z-20 rounded-full blur-xs" />

        {/* 3D Crystalline Translucent Kidney SVG */}
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full drop-shadow-[0_16px_36px_rgba(0,217,255,0.45)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="crystallineOuter" x1="40" y1="30" x2="280" y2="290" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5BE7FF" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#00D9FF" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#0877C9" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#004680" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="crystallineInnerCore" x1="160" y1="70" x2="160" y2="250" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38E8FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0877C9" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="arteryPedicle" x1="125" y1="150" x2="50" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4B4B" />
              <stop offset="100%" stopColor="#E02424" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="veinPedicle" x1="130" y1="170" x2="55" y2="185" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38E8FF" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="ureterPedicle" x1="140" y1="185" x2="115" y2="285" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD13B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Pedicle Vessels (Artery, Vein, Ureter) */}
          <path
            d="M125 155 C90 145 60 135 45 130"
            stroke="url(#arteryPedicle)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M130 175 C95 175 65 180 50 185"
            stroke="url(#veinPedicle)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M140 185 C135 220 125 255 118 280"
            stroke="url(#ureterPedicle)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Kidney Anatomical Contour */}
          <path
            d="M150 40
                C220 35 285 75 285 160
                C285 240 215 285 155 280
                C110 275 100 230 115 190
                C125 165 125 145 110 125
                C95 105 105 45 150 40 Z"
            fill="url(#crystallineOuter)"
            stroke="#A7F3D0"
            strokeWidth="2.5"
            strokeOpacity="0.7"
          />

          {/* Inner Glomerular / Nephron Cortex */}
          <path
            d="M165 65
                C210 65 255 95 255 160
                C255 220 205 255 165 250
                C145 245 138 215 145 185
                C152 165 150 145 140 130
                C132 115 138 68 165 65 Z"
            fill="url(#crystallineInnerCore)"
            stroke="#38E8FF"
            strokeWidth="1.2"
            strokeDasharray="4 2"
          />

          {/* Renal Calices */}
          <path d="M190 90 L230 100 L210 120 Z" fill="#0284C7" opacity="0.65" stroke="#5BE7FF" strokeWidth="1" />
          <path d="M210 135 L250 150 L220 170 Z" fill="#0284C7" opacity="0.65" stroke="#5BE7FF" strokeWidth="1" />
          <path d="M200 185 L240 205 L205 220 Z" fill="#0284C7" opacity="0.65" stroke="#5BE7FF" strokeWidth="1" />
          <path d="M175 230 L205 245 L180 255 Z" fill="#0284C7" opacity="0.65" stroke="#5BE7FF" strokeWidth="1" />

          {/* AI Neural Network Telemetry Overlay */}
          <g stroke="#38E8FF" strokeWidth="1.2" opacity="0.85">
            <line x1="165" y1="75" x2="220" y2="105" />
            <line x1="220" y1="105" x2="235" y2="160" />
            <line x1="235" y1="160" x2="215" y2="210" />
            <line x1="215" y1="210" x2="175" y2="245" />
            <line x1="140" y1="160" x2="185" y2="160" />
            <line x1="185" y1="160" x2="235" y2="160" />
          </g>

          {/* Glowing Telemetry Nodes */}
          <circle cx="165" cy="75" r="3.5" fill="#FFFFFF" className="animate-node-pulse" />
          <circle cx="220" cy="105" r="3" fill="#C8F500" />
          <circle cx="235" cy="160" r="4.5" fill="#FFFFFF" className="animate-node-pulse" />
          <circle cx="215" cy="210" r="3" fill="#38E8FF" />
          <circle cx="175" cy="245" r="3.5" fill="#C8F500" className="animate-node-pulse" />
          <circle cx="185" cy="160" r="3" fill="#FFFFFF" />

          {/* Gloss Light Reflection */}
          <path
            d="M170 48 C225 48 270 80 280 140 C250 82 195 62 170 48 Z"
            fill="white"
            opacity="0.5"
          />
        </svg>

        {/* Ambient Orbiting AI Particles */}
        <div className="absolute top-2 left-6 w-2.5 h-2.5 rounded-full bg-[#00D9FF] shadow-[0_0_12px_#00D9FF] animate-node-pulse" />
        <div className="absolute top-12 right-2 w-2 h-2 rounded-full bg-[#C8F500] shadow-[0_0_10px_#C8F500] animate-node-pulse" />
        <div className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-[#38E8FF] shadow-[0_0_10px_#38E8FF] animate-node-pulse" />
        <div className="absolute bottom-4 right-10 w-2.5 h-2.5 rounded-full bg-[#5BE7FF] shadow-[0_0_12px_#5BE7FF] animate-node-pulse" />
      </div>

      {/* Floating Badge 1 (Top-Left) */}
      <div className="absolute -top-1 left-1 sm:-left-3 z-30 bg-[#062447]/90 backdrop-blur-md text-white border border-[#00D9FF]/40 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 transform -rotate-1 hover:rotate-0 transition-transform">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-80" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
        </span>
        <span className="text-[10px] font-bold tracking-wider uppercase text-[#DDF7FF]">
          REAL-TIME MONITORING
        </span>
      </div>

      {/* Floating Badge 2 (Right Side) */}
      <div className="absolute top-1/2 -right-2 sm:-right-4 -translate-y-1/2 z-30 bg-white/95 backdrop-blur-md text-slate-900 border border-[#C8F1FF] p-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 hover:scale-105 transition-transform">
        <div className="w-8 h-8 rounded-xl bg-[#0877C9]/10 border border-[#0877C9]/20 flex items-center justify-center text-[#0877C9]">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Predictive Accuracy</div>
          <div className="text-xs font-extrabold text-[#0066B3]">100% Sensitivity (RF)</div>
        </div>
      </div>

      {/* Floating Badge 3 (Bottom-Left) */}
      <div className="absolute -bottom-2 left-6 sm:left-2 z-30 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200/80 p-2 rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
        <div className="w-7 h-7 rounded-lg bg-[#C8F500]/25 border border-[#C8F500]/60 flex items-center justify-center text-[#052E54]">
          <Activity className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-slate-900">24 Biomarkers</div>
          <div className="text-[9px] text-slate-500">Multivariate Analysis</div>
        </div>
      </div>
    </div>
  );
};
