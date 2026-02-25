import { motion } from 'framer-motion';
import { Flame, AlertTriangle } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

const sfDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const sfText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
};

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div style={{ marginBottom: 80 }}>
      {/* Main hero — full-width, centered */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          minHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 24px 64px',
        }}
      >
        {/* Radial USC red glow — very subtle */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(153,0,0,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
          <img
            src="/logo.png"
            alt="USC Cook Scale"
            style={{
              width: 88,
              height: 88,
              margin: '0 auto',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Label */}
        <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
          <span
            style={{
              fontFamily: sfText,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: '#8e8e93',
            }}
          >
            USC Schedule Analysis
          </span>
        </motion.div>

        {/* Giant title */}
        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: sfDisplay,
            fontWeight: 900,
            fontSize: 'clamp(48px, 8vw, 72px)',
            letterSpacing: '-2.5px',
            lineHeight: 1.0,
            color: '#1c1c1e',
            margin: '0 0 16px',
            maxWidth: 700,
          }}
        >
          How{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #990000 0%, #cc0000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Cooked
          </span>{' '}
          Is
          <br />
          Your Schedule?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: sfText,
            fontSize: 17,
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#3a3a3c',
            maxWidth: 480,
            margin: '0 auto 36px',
          }}
        >
          Get your AI-powered difficulty score powered by RateMyProfessors,
          Reddit r/USC, and Claude AI.
        </motion.p>

        {/* CTA buttons row */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 18,
          }}
        >
          {/* Primary CTA */}
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
              fontSize: 16,
              letterSpacing: '-0.2px',
              height: 56,
              padding: '0 36px',
              borderRadius: 980,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 16px rgba(153,0,0,0.25)',
            }}
          >
            <Flame style={{ width: 20, height: 20 }} />
            Check My Schedule
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={onStart}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: easing }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'transparent',
              color: '#990000',
              fontFamily: sfDisplay,
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '-0.2px',
              height: 56,
              padding: '0 32px',
              borderRadius: 980,
              border: '1.5px solid #990000',
              cursor: 'pointer',
            }}
          >
            See How It Works
          </motion.button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: sfText,
            fontSize: 13,
            color: '#8e8e93',
            letterSpacing: '0.1px',
          }}
        >
          Free&nbsp;&middot;&nbsp;No account needed&nbsp;&middot;&nbsp;Results in ~30 seconds
        </motion.p>
      </motion.section>

      {/* Disclaimer bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: easing }}
        style={{
          background: 'rgba(255,196,0,0.07)',
          border: '0.5px solid rgba(196,140,0,0.22)',
          borderRadius: 14,
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          textAlign: 'left',
        }}
      >
        <AlertTriangle
          style={{ width: 15, height: 15, color: '#a07800', flexShrink: 0, marginTop: 1 }}
        />
        <p
          style={{
            fontFamily: sfText,
            fontSize: 12,
            color: '#8e7020',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          <strong style={{ fontWeight: 600, color: '#7a5a00' }}>Disclaimer: </strong>
          Independent student project — not affiliated with USC, RateMyProfessors, or Reddit.
          All scores are subjective algorithmic estimates for educational purposes only.
          Data may be incomplete or outdated. Always verify with official university sources.
        </p>
      </motion.div>
    </div>
  );
}
