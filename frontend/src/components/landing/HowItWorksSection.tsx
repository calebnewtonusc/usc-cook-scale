import { motion } from 'framer-motion';
import { Upload, Search, Flame } from 'lucide-react';
import type { ReactNode } from 'react';

const sfDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const sfText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
const easing = [0.25, 0.46, 0.45, 0.94] as const;

interface Step {
  icon: ReactNode;
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Upload style={{ width: 24, height: 24, color: '#ffffff' }} />,
    number: '01',
    title: 'Upload Your Schedule',
    description:
      'Paste text, upload a PDF or screenshot, or drop a calendar file. Our AI reads any format from WeReg or your email.',
  },
  {
    icon: <Search style={{ width: 24, height: 24, color: '#ffffff' }} />,
    number: '02',
    title: 'AI Deep Research',
    description:
      'We scan RateMyProfessors, scrub Reddit r/USC, and aggregate thousands of student experiences, all in real time.',
  },
  {
    icon: <Flame style={{ width: 24, height: 24, color: '#ffffff' }} />,
    number: '03',
    title: 'Get Your Score',
    description:
      'Receive your Cook Scale score, per-professor breakdown, workload warnings, survival tips, and source links.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
};

export default function HowItWorksSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      style={{ marginBottom: 72 }}
    >
      {/* Section header */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing } },
        }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <p
          style={{
            fontFamily: sfText,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#8e8e93',
            marginBottom: 10,
          }}
        >
          How It Works
        </p>
        <h2
          style={{
            fontFamily: sfDisplay,
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 42px)',
            letterSpacing: '-1px',
            color: '#1c1c1e',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Three steps to your score
        </h2>
      </motion.div>

      {/* Step cards grid */}
      <div
        style={{ display: 'grid', gap: 16, position: 'relative' }}
        className="md:grid-cols-3"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            variants={cardVariants}
            whileHover={{
              y: -3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
            transition={{ duration: 0.2, ease: easing }}
            style={{
              background: '#ffffff',
              borderRadius: 20,
              border: '0.5px solid rgba(60,60,67,0.1)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
              padding: 28,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
            }}
          >
            {/* Watermark step number */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 16,
                right: 20,
                fontFamily: sfDisplay,
                fontWeight: 900,
                fontSize: 80,
                lineHeight: 1,
                letterSpacing: '-3px',
                color: 'rgba(153,0,0,0.06)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {step.number}
            </div>

            {/* Icon circle */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#990000',
                marginBottom: 20,
                flexShrink: 0,
              }}
            >
              {step.icon}
            </div>

            <h3
              style={{
                fontFamily: sfDisplay,
                fontWeight: 700,
                fontSize: 18,
                color: '#1c1c1e',
                letterSpacing: '-0.3px',
                marginBottom: 10,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: sfText,
                fontSize: 15,
                color: '#3a3a3c',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {step.description}
            </p>

            {/* Connector arrow — desktop only, not last item */}
            {i < steps.length - 1 && (
              <div
                className="hidden md:block"
                style={{
                  position: 'absolute',
                  right: -12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  width: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Dashed line connector */}
                <svg width="24" height="2" viewBox="0 0 24 2" fill="none">
                  <line
                    x1="0"
                    y1="1"
                    x2="24"
                    y2="1"
                    stroke="#e5e5ea"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
