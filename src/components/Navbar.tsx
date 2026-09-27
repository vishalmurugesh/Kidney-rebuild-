import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowRight, Menu, X, Activity, BarChart2, Info, Home as HomeIcon } from 'lucide-react';

export type NavTab = 'home' | 'prediction' | 'model' | 'about';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
    { id: 'prediction', label: 'Prediction', icon: <Activity className="w-4 h-4" /> },
    { id: 'model', label: 'Model', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-2xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div onClick={() => handleTabClick('home')}>
          <Logo />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#F0F8FF] p-1.5 rounded-full border border-sky-100">
          {navLinks.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0066B3] shadow-xs border border-sky-200/80 font-bold'
                    : 'text-slate-600 hover:text-[#0066B3] hover:bg-white/70'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Primary CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleTabClick('prediction')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-[#052E54] bg-[#C8F500] hover:bg-[#BFFF00] hover:shadow-[0_0_18px_rgba(200,245,0,0.45)] shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Start Prediction</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#052E54] transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => handleTabClick('prediction')}
            className="px-3 py-1.5 rounded-full text-xs font-bold text-[#052E54] bg-[#C8F500] shadow-xs"
          >
            Predict
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-sky-100 bg-white/98 backdrop-blur-xl px-4 py-5 shadow-xl transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-sky-50 text-[#0066B3] font-bold border border-sky-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-[#0066B3]' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-3 mt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleTabClick('prediction')}
                className="w-full py-2.5 px-4 rounded-full text-sm font-extrabold text-[#052E54] bg-[#C8F500] hover:bg-[#BFFF00] flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Start Prediction</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
