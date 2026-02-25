import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import HeroSection from './landing/HeroSection';
import StatsBanner from './landing/StatsBanner';
import HowItWorksSection from './landing/HowItWorksSection';
import DataSourcesSection from './landing/DataSourcesSection';
import WhatYouGetSection from './landing/WhatYouGetSection';
import CookScaleLegend from './landing/CookScaleLegend';
import LandingFooter from './landing/LandingFooter';

const sfDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const sfText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
const easing = [0.25, 0.46, 0.45, 0.94] as const;

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
          padding: '0 16px 64px',
        }}
      >
        <HeroSection onStart={onStart} />
        <StatsBanner />
        <HowItWorksSection />
        <WhatYouGetSection />
        <DataSourcesSection />
        <CookScaleLegend />

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: easing }}
          style={{
            textAlign: 'center',
            marginBottom: 56,
            padding: '56px 40px',
            borderRadius: 24,
            background: '#ffffff',
            border: '0.5px solid rgba(60,60,67,0.1)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Soft red glow */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(153,0,0,0.04) 0%, transparent 70%)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2
              style={{
                fontFamily: sfDisplay,
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 38px)',
                letterSpacing: '-1px',
                color: '#1c1c1e',
                marginBottom: 12,
                lineHeight: 1.1,
              }}
            >
              Ready to find out the truth?
            </h2>
            <p
              style={{
                fontFamily: sfText,
                fontSize: 17,
                color: '#3a3a3c',
                marginBottom: 32,
                lineHeight: 1.5,
              }}
            >
              Join USC students who've already checked their schedules
            </p>
            <motion.button
              onClick={onStart}
              whileHover={{
                y: -2,
                boxShadow: '0 8px 32px rgba(153,0,0,0.32)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: easing }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#990000',
                color: '#ffffff',
                fontFamily: sfDisplay,
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: '-0.2px',
                height: 56,
                padding: '0 40px',
                borderRadius: 980,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 16px rgba(153,0,0,0.25)',
              }}
            >
              <Flame style={{ width: 20, height: 20 }} />
              Get My Cook Scale Score
            </motion.button>
            <p
              style={{
                fontFamily: sfText,
                fontSize: 13,
                color: '#8e8e93',
                marginTop: 14,
              }}
            >
              Takes about 15–30 seconds
            </p>
          </div>
        </motion.div>

        <LandingFooter onPrivacy={onPrivacy} onTerms={onTerms} />
      </div>
    </div>
  );
}
