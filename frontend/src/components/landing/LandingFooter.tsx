import { GraduationCap, ExternalLink } from 'lucide-react';

interface LandingFooterProps {
  onPrivacy?: () => void;
  onTerms?: () => void;
}

export default function LandingFooter({ onPrivacy, onTerms }: LandingFooterProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        paddingTop: 32,
        borderTop: '0.5px solid rgba(60,60,67,0.12)',
      }}
    >
      {/* Built by pill */}
      <a
        href="https://calebnewton.me"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 18px 10px 10px',
          background: '#ffffff',
          borderRadius: 980,
          border: '0.5px solid rgba(60,60,67,0.15)',
          boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
          textDecoration: 'none',
          transition: 'all 0.18s ease',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
          el.style.transform = 'translateY(-1px)';
          el.style.borderColor = 'rgba(153,0,0,0.3)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.boxShadow = '0 1px 6px rgba(0,0,0,0.07)';
          el.style.transform = 'translateY(0)';
          el.style.borderColor = 'rgba(60,60,67,0.15)';
        }}
      >
        <img
          src="/caleb-usc.jpg"
          alt="Caleb Newton"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            border: '1.5px solid rgba(153,0,0,0.25)',
          }}
        />
        <div>
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              color: '#8e8e93',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: 3,
            }}
          >
            Built by
          </p>
          <p
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: '#1c1c1e',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            Caleb Newton
            <ExternalLink style={{ width: 11, height: 11, color: '#8e8e93' }} />
          </p>
        </div>
      </a>

      {/* Made for USC */}
      <p
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: 13,
          color: '#8e8e93',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        Made with too much caffeine for USC students
        <GraduationCap style={{ width: 14, height: 14, color: '#990000' }} />
      </p>

      {/* Legal links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <button
          onClick={onPrivacy}
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: '#8e8e93',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#990000'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#8e8e93'; }}
        >
          Privacy Policy
        </button>
        <span style={{ color: 'rgba(60,60,67,0.2)', fontSize: 12 }}>&bull;</span>
        <button
          onClick={onTerms}
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: '#8e8e93',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#990000'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#8e8e93'; }}
        >
          Terms of Service
        </button>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: 11,
          color: 'rgba(60,60,67,0.35)',
          textAlign: 'center',
          maxWidth: 480,
          lineHeight: 1.5,
          padding: '0 16px',
        }}
      >
        USC Cook Scale is an independent student project. "USC" and "University of Southern California"
        are trademarks of the University of Southern California.
      </p>
    </div>
  );
}
