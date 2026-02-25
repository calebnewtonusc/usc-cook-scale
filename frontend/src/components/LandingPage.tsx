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
    <div style={{ minHeight: '100vh' }}>
      <div
        style={{
          position: 'relative',
          maxWidth: 896,
          margin: '0 auto',
          padding: '48px 16px 64px',
        }}
      >
        <HeroSection onStart={onStart} />
        <StatsBanner />
        <HowItWorksSection />
        <WhatYouGetSection />
        <DataSourcesSection />
        <CookScaleLegend />

        {/* Final CTA */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 48,
            padding: '48px 32px',
            borderRadius: 24,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(60,60,67,0.1)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          }}
        >
          <h2
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: '-0.4px',
              color: '#1c1c1e',
              marginBottom: 10,
            }}
          >
            Ready to find out the truth?
          </h2>
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 15,
              color: '#8e8e93',
              marginBottom: 28,
            }}
          >
            Join USC students who've already checked their schedules
          </p>
          <button
            onClick={onStart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#990000',
              color: '#ffffff',
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '-0.2px',
              padding: '16px 36px',
              borderRadius: 980,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              boxShadow: '0 2px 12px rgba(153,0,0,0.28)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = '#7a0000';
              el.style.boxShadow = '0 4px 20px rgba(153,0,0,0.35)';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = '#990000';
              el.style.boxShadow = '0 2px 12px rgba(153,0,0,0.28)';
              el.style.transform = 'translateY(0)';
            }}
          >
            <Flame style={{ width: 20, height: 20 }} />
            Get My Cook Scale Score
          </button>
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 12,
              color: '#8e8e93',
              marginTop: 12,
            }}
          >
            Takes about 15–30 seconds
          </p>
        </div>

        <LandingFooter onPrivacy={onPrivacy} onTerms={onTerms} />
      </div>
    </div>
  );
}
