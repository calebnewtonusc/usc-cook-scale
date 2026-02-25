import { Upload, Search, Flame } from 'lucide-react';
import type { ReactNode } from 'react';

interface Step {
  icon: ReactNode;
  number: string;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

const steps: Step[] = [
  {
    icon: <Upload style={{ width: 22, height: 22 }} />,
    number: '01',
    title: 'Upload Your Schedule',
    description: 'Paste text, upload a PDF/screenshot, or drop a calendar file. Our AI reads any format from WeReg or your email.',
    iconColor: '#0066cc',
    iconBg: 'rgba(0,102,204,0.1)',
  },
  {
    icon: <Search style={{ width: 22, height: 22 }} />,
    number: '02',
    title: 'AI Deep Research',
    description: 'We scan RateMyProfessors, scrub Reddit, and aggregate thousands of student experiences — all in real time.',
    iconColor: '#6e3bc9',
    iconBg: 'rgba(110,59,201,0.1)',
  },
  {
    icon: <Flame style={{ width: 22, height: 22 }} />,
    number: '03',
    title: 'Get Your Score',
    description: 'Receive your Cook Scale score, per-professor breakdown, workload warnings, survival tips, and source links.',
    iconColor: '#990000',
    iconBg: 'rgba(153,0,0,0.1)',
  },
];

export default function HowItWorksSection() {
  return (
    <div style={{ marginBottom: 64 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: '-0.4px',
            color: '#1c1c1e',
            marginBottom: 6,
          }}
        >
          How It Works
        </h2>
        <p
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 15,
            color: '#8e8e93',
          }}
        >
          Three steps to knowing exactly what you're in for
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: 12,
        }}
        className="md:grid-cols-3"
      >
        {steps.map((step, i) => (
          <div
            key={step.number}
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '0.5px solid rgba(60,60,67,0.1)',
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              padding: '24px 22px',
              position: 'relative',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.07)';
            }}
          >
            {/* Step number — watermark */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 18,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontWeight: 900,
                fontSize: 36,
                color: 'rgba(60,60,67,0.06)',
                lineHeight: 1,
                letterSpacing: '-1px',
                userSelect: 'none',
              }}
            >
              {step.number}
            </div>

            {/* Icon */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 14,
                background: step.iconBg,
                color: step.iconColor,
                marginBottom: 16,
              }}
            >
              {step.icon}
            </div>

            <h3
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: '#1c1c1e',
                marginBottom: 8,
                letterSpacing: '-0.2px',
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontSize: 14,
                color: '#3a3a3c',
                lineHeight: 1.55,
              }}
            >
              {step.description}
            </p>

            {/* Connector chevron for non-last items (desktop) */}
            {i < steps.length - 1 && (
              <div
                className="hidden md:block"
                style={{
                  position: 'absolute',
                  right: -14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  color: 'rgba(60,60,67,0.25)',
                  fontSize: 22,
                  fontWeight: 300,
                }}
              >
                ›
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
