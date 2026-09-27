import React from 'react';

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-9', isLight = false }) => {
  return (
    <div className={`flex items-center gap-2.5 font-sans select-none cursor-pointer ${className}`}>
      {/* Ocean Blue & Electric Cyan Kidney Symbol with Lime accent node */}
      <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0066B3] via-[#0877C9] to-[#00D9FF] p-0.5 shadow-sm flex items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Kidney bean geometric contour */}
          <path
            d="M9 7C14.5 4.5 24 7 24 15C24 23 15 27.5 10 24C6.5 21.5 6 15 7.5 12C9 9 9 7 9 7Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Renal hilum curve */}
          <path
            d="M12 12C14.5 13.5 15.5 17 13.5 19.5"
            stroke="#38E8FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Lime Accent AI data node */}
          <circle cx="17.5" cy="14" r="1.8" fill="#C8F500" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1">
          <span className={`font-display font-extrabold text-lg tracking-tight ${isLight ? 'text-white' : 'text-[#052E54]'}`}>
            KP
          </span>
          <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-sm bg-[#0877C9]/10 text-[#0066B3] tracking-wider border border-[#0877C9]/20">
            AI
          </span>
        </div>
        <span className={`text-[10px] font-medium tracking-wide ${isLight ? 'text-[#DDF7FF]' : 'text-slate-500'}`}>
          Kidney Prediction
        </span>
      </div>
    </div>
  );
};
