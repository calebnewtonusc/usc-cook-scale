import { Flame, Users, BarChart3, Lightbulb, ExternalLink, Trophy } from 'lucide-react';
import type { ReactNode } from 'react';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

const features: Feature[] = [
  {
    icon: <Flame style={{ width: 20, height: 20 }} />,
    title: 'Overall Cook Scale Score',
    description: 'Your semester difficulty rated 0–100 with a verbal label from "Raw" to "Absolutely Cooked"',
    iconColor: '#990000',
    iconBg: 'rgba(153,0,0,0.1)',
  },
  {
    icon: <Users style={{ width: 20, height: 20 }} />,
    title: 'Professor Deep Dive',
    description: 'Real RMP ratings, actual student quotes, Reddit threads, and direct links to all sources',
    iconColor: '#c07000',
    iconBg: 'rgba(255,149,0,0.1)',
  },
  {
    icon: <BarChart3 style={{ width: 20, height: 20 }} />,
    title: 'Per-Class Breakdown',
    description: 'Individual difficulty scores with star ratings, trend indicators, and color-coded difficulty badges',
    iconColor: '#0066cc',
    iconBg: 'rgba(0,102,204,0.1)',
  },
  {
    icon: <Lightbulb style={{ width: 20, height: 20 }} />,
    title: 'Survival Tips',
    description: 'AI-generated tips specific to each professor and course based on real student feedback',
    iconColor: '#1a7a34',
    iconBg: 'rgba(52,199,89,0.1)',
  },
  {
    icon: <Trophy style={{ width: 20, height: 20 }} />,
    title: 'Schedule Strengths',
    description: "What's working in your favor — silver linings and opportunities in your course selection",
    iconColor: '#6e3bc9',
    iconBg: 'rgba(110,59,201,0.1)',
  },
  {
    icon: <ExternalLink style={{ width: 20, height: 20 }} />,
    title: 'Source Links',
    description: 'Direct links to RateMyProfessors pages, Reddit discussions, and Google searches for every class',
    iconColor: '#3a3a3c',
    iconBg: 'rgba(60,60,67,0.08)',
  },
];

export default function WhatYouGetSection() {
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
          What You'll Get
        </h2>
        <p
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 15,
            color: '#8e8e93',
          }}
        >
          Comprehensive schedule intelligence, not just a number
        </p>
      </div>

      <div
        style={{ display: 'grid', gap: 10 }}
        className="sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map(({ icon, title, description, iconColor, iconBg }) => (
          <div
            key={title}
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '0.5px solid rgba(60,60,67,0.1)',
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
              padding: '20px 18px',
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 18px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)';
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 13,
                background: iconBg,
                color: iconColor,
                marginBottom: 14,
              }}
            >
              {icon}
            </div>
            <h3
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                color: '#1c1c1e',
                marginBottom: 6,
                letterSpacing: '-0.15px',
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontSize: 13,
                color: '#3a3a3c',
                lineHeight: 1.55,
              }}
            >
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
