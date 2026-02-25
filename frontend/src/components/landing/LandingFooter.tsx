import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const sfText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
const easing = [0.25, 0.46, 0.45, 0.94] as const;

interface LandingFooterProps {
  onPrivacy?: () => void;
  onTerms?: () => void;
}

export default function LandingFooter({ onPrivacy, onTerms }: LandingFooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easing }}
      style={{
        paddingTop: 32,
        paddingBottom: 40,
        borderTop: '0.5px solid rgba(60,60,67,0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
        textAlign: 'center',
      }}
    >
      {/* Built by pill */}
      <motion.a
        href="https://calebnewton.me"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          y: -2,
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        }}
        transition={{ duration: 0.18, ease: easing }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 18px 8px 8px',
          background: '#ffffff',
          borderRadius: 980,
          border: '0.5px solid rgba(60,60,67,0.15)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <img
          src="/caleb-usc.jpg"
          alt="Caleb Newton"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            border: '1.5px solid rgba(153,0,0,0.2)',
            flexShrink: 0,
          }}
        />
        <div style={{ textAlign: 'left' }}>
          <p
            style={{
              fontFamily: sfText,
              fontSize: 10,
              fontWeight: 600,
              color: '#8e8e93',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: 3,
            }}
          >
            Built by
          </p>
          <p
            style={{
              fontFamily: sfText,
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
      </motion.a>

      {/* Legal links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          onClick={onPrivacy}
          style={{
            fontFamily: sfText,
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
          Privacy
        </button>
        <span style={{ color: 'rgba(60,60,67,0.2)', fontSize: 12, lineHeight: 1 }}>&middot;</span>
        <button
          onClick={onTerms}
          style={{
            fontFamily: sfText,
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
          Terms
        </button>
      </div>

      {/* Disclaimer */}
      <p
        style={{
          fontFamily: sfText,
          fontSize: 11,
          color: 'rgba(60,60,67,0.35)',
          maxWidth: 460,
          lineHeight: 1.5,
          padding: '0 16px',
          margin: 0,
        }}
      >
        USC Cook Scale is an independent student project. "USC" and "University of Southern
        California" are trademarks of the University of Southern California.
      </p>
    </motion.footer>
  );
}
