import { Rocket } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <HeroSection onStart={onStart} />
        <StatsBanner />
        <HowItWorksSection />
        <DataSourcesSection />
        <WhatYouGetSection />
        <CookScaleLegend />

        {/* CTA */}
        <div className="text-center mb-12">
          <button
            onClick={onStart}
            className="btn-primary text-2xl px-16 py-6 shadow-2xl hover:shadow-cook-red/50 transform hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            Get Started Now <Rocket className="w-6 h-6" />
          </button>
          <p className="text-gray-600 mt-4">
            Join hundreds of USC students making smarter schedule decisions
          </p>
        </div>

        <LandingFooter onPrivacy={onPrivacy} onTerms={onTerms} />
      </div>
    </div>
  );
}
