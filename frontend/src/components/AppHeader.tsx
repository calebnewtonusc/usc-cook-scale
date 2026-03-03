import { ArrowLeft } from 'lucide-react';

interface AppHeaderProps {
  onBack: () => void;
}

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif";

export default function AppHeader({ onBack }: AppHeaderProps) {
  return (
    <header style={{ marginBottom: 32 }}>
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontFamily: sfPro,
          fontSize: 14,
          fontWeight: 500,
          color: '#8e8e93',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 0',
          marginBottom: 20,
          transition: 'color 0.15s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#990000'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#8e8e93'; }}
      >
        <ArrowLeft style={{ width: 16, height: 16 }} />
        Back to Home
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <img
          src="/logo.png"
          alt="USC Cooked Scale Logo"
          style={{ width: 52, height: 52, flexShrink: 0 }}
        />
        <div>
          <h1
            style={{
              fontFamily: sfPro,
              fontWeight: 800,
              fontSize: 'clamp(24px, 5vw, 34px)',
              letterSpacing: '-0.5px',
              lineHeight: 1.05,
              color: '#1c1c1e',
              backgroundImage: 'linear-gradient(135deg, #990000 0%, #CC0000 50%, #FFCC00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            USC Cooked Scale
          </h1>
          <p
            style={{
              fontFamily: sfPro,
              fontSize: 13,
              color: '#8e8e93',
              marginTop: 2,
            }}
          >
            AI-powered schedule difficulty analyzer
          </p>
        </div>
      </div>
    </header>
  );
}
