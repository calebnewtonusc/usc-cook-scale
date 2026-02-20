import { Flame } from 'lucide-react';
import HeroSection from './landing/HeroSection';
import StatsBanner from './landing/StatsBanner';
import HowItWorksSection from './landing/HowItWorksSection';
import DataSourcesSection from './landing/DataSourcesSection';
import WhatYouGetSection from './landing/WhatYouGetSection';
import CookScaleLegend from './landing/CookScaleLegend';
import LandingFooter from './landing/LandingFooter';

interface LandingPageProps {
  onStart: () => void;
  onPrivacy?: () => void;
  onTerms?: () => void;
}

export default function LandingPage({ onStart, onPrivacy, onTerms }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Subtle top gradient backdrop */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at top, rgba(153, 0, 0, 0.04) 0%, transparent 60%)'
      }} />

      <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-16">
        <HeroSection onStart={onStart} />
        <StatsBanner />
        <HowItWorksSection />
        <WhatYouGetSection />
        <DataSourcesSection />
        <CookScaleLegend />

        {/* Final CTA */}
        <div className="text-center mb-12 py-12 px-6 rounded-3xl bg-gradient-to-br from-cook-red/5 to-cook-yellow/5 border border-cook-red/10">
          <h2 className="text-3xl font-black text-gray-900 mb-3">
            Ready to find out the truth?
          </h2>
          <p className="text-gray-500 mb-6 text-base">
            Join USC students who've already checked their schedules
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 btn-primary text-lg px-10 py-4 shadow-usc-lg"
          >
            <Flame className="w-5 h-5" />
            Get My Cook Scale Score
          </button>
          <p className="text-xs text-gray-400 mt-3">Takes about 15–30 seconds</p>
        </div>

        <LandingFooter onPrivacy={onPrivacy} onTerms={onTerms} />
      </div>
    </div>
  );
}
