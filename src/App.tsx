/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatItDoes } from './components/WhatItDoes';
import { HowItWorks } from './components/HowItWorks';
import { KeyFeatures } from './components/KeyFeatures';
import { ModelOverviewSection } from './components/ModelOverviewSection';
import { StartPredictionCTA } from './components/StartPredictionCTA';
import { MedicalDisclaimer } from './components/MedicalDisclaimer';
import { Footer } from './components/Footer';
import { PredictionView } from './components/PredictionView';
import { ModelView } from './components/ModelView';
import { AboutView } from './components/AboutView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  const handleNavigate = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F9FC] text-[#122033] flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Sticky Modern Navigation */}
      <Navbar currentTab={currentTab} onSelectTab={handleNavigate} />

      {/* Main Content Area Based on Active Navigation Tab */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* 1. Hero Section with 3D Glowing Kidney Visual & Live Status */}
            <Hero onNavigate={handleNavigate} />

            {/* 2. What This Application Does */}
            <WhatItDoes />

            {/* 3. How It Works: 4-Step Visual Process */}
            <HowItWorks />

            {/* 4. Key Features Grid */}
            <KeyFeatures />

            {/* 5. AI / Model Overview Section with Verified Metrics */}
            <ModelOverviewSection onNavigate={handleNavigate} />

            {/* 6. Start Prediction CTA Banner */}
            <StartPredictionCTA onNavigate={handleNavigate} />

            {/* 7. Medical Disclaimer */}
            <MedicalDisclaimer />
          </>
        )}

        {currentTab === 'prediction' && (
          <>
            <PredictionView />
            <MedicalDisclaimer />
          </>
        )}

        {currentTab === 'model' && (
          <>
            <ModelView onNavigate={handleNavigate} />
            <MedicalDisclaimer />
          </>
        )}

        {currentTab === 'about' && (
          <>
            <AboutView onNavigate={handleNavigate} />
          </>
        )}
      </main>

      {/* Modern Trustworthy Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
