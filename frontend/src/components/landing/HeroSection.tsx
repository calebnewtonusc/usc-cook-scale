import { AlertTriangle, Flame, Zap } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="relative mb-16 text-center">
      {/* Hero card — clean white frosted glass on light gray */}
      <div
        className="relative overflow-hidden mb-8"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '0.5px solid rgba(60,60,67,0.1)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
          padding: '56px 40px 48px',
        }}
      >
        {/* Subtle USC red glow — very soft */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(153,0,0,0.06) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-7">
            <img
              src="/logo.png"
              alt="USC Cooked Scale Logo"
              style={{ width: 96, height: 96, margin: '0 auto' }}
            />
          </div>

          {/* Label pill */}
          <div className="flex justify-center mb-5">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(153,0,0,0.08)',
                color: '#990000',
                borderRadius: 980,
                padding: '5px 14px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.3px',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                border: '0.5px solid rgba(153,0,0,0.2)',
              }}
            >
              AI-Powered Schedule Analyzer
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(44px, 8vw, 72px)',
              letterSpacing: '-0.6px',
              lineHeight: 1.05,
              color: '#1c1c1e',
              marginBottom: 8,
            }}
          >
            USC{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #990000 0%, #CC0000 60%, #b30000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Cooked Scale
            </span>
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(18px, 3vw, 24px)',
              color: '#3a3a3c',
              marginBottom: 10,
              letterSpacing: '-0.2px',
            }}
          >
            How Cooked Is Your Schedule?
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 16,
              color: '#8e8e93',
              maxWidth: 520,
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            AI-powered difficulty analyzer combining real data from RateMyProfessors,
            Reddit, and more — giving you the honest truth about your semester.
          </p>

          {/* CTA Button */}
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
              (e.currentTarget as HTMLButtonElement).style.background = '#7a0000';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(153,0,0,0.35)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#990000';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px rgba(153,0,0,0.28)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            <Flame style={{ width: 20, height: 20 }} />
            Analyze My Schedule
            <Zap style={{ width: 18, height: 18 }} />
          </button>

          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 13,
              color: '#8e8e93',
              marginTop: 14,
            }}
          >
            Free &bull; No signup &bull; Results in ~30 seconds
          </p>
        </div>
      </div>

      {/* Disclaimer — clean Apple-style info bar */}
      <div
        style={{
          background: 'rgba(255,196,0,0.08)',
          border: '0.5px solid rgba(196,140,0,0.25)',
          borderRadius: 14,
          padding: '12px 16px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <AlertTriangle
          style={{ width: 16, height: 16, color: '#a07800', flexShrink: 0, marginTop: 1 }}
        />
        <div>
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontWeight: 600,
              fontSize: 12,
              color: '#7a5a00',
              marginBottom: 2,
            }}
          >
            Disclaimer
          </p>
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 12,
              color: '#8e7020',
              lineHeight: 1.5,
            }}
          >
            Independent student project — not affiliated with USC, RateMyProfessors, or Reddit.
            All scores are subjective algorithmic estimates for educational purposes only.
            Data may be incomplete or outdated. Always verify with official university sources.
          </p>
        </div>
      </div>
    </div>
  );
}
