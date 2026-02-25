import { Star, MessageCircle, BookOpen, GraduationCap, TrendingUp, Bot } from 'lucide-react';
import type { ReactNode } from 'react';

interface Source {
  icon: ReactNode;
  name: string;
  desc: string;
  iconColor: string;
  iconBg: string;
}

const sources: Source[] = [
  {
    icon: <Star style={{ width: 18, height: 18 }} fill="currentColor" />,
    name: 'RateMyProfessors',
    desc: 'Professor ratings, difficulty scores, and "would take again" percentages',
    iconColor: '#c07000',
    iconBg: 'rgba(255,149,0,0.1)',
  },
  {
    icon: <MessageCircle style={{ width: 18, height: 18 }} />,
    name: 'Reddit r/USC',
    desc: 'Real student discussions, class experiences, and professor insights',
    iconColor: '#c03800',
    iconBg: 'rgba(255,69,0,0.1)',
  },
  {
    icon: <BookOpen style={{ width: 18, height: 18 }} />,
    name: 'Course Reviews',
    desc: 'Semester-specific feedback and workload reports from actual students',
    iconColor: '#0066cc',
    iconBg: 'rgba(0,102,204,0.1)',
  },
  {
    icon: <GraduationCap style={{ width: 18, height: 18 }} />,
    name: 'USC Forums',
    desc: 'Student forum discussions, tips, and warnings about specific classes',
    iconColor: '#990000',
    iconBg: 'rgba(153,0,0,0.1)',
  },
  {
    icon: <TrendingUp style={{ width: 18, height: 18 }} />,
    name: 'Grade Distributions',
    desc: 'Historical grade data and pass/fail rates when available',
    iconColor: '#1a7a34',
    iconBg: 'rgba(52,199,89,0.1)',
  },
  {
    icon: <Bot style={{ width: 18, height: 18 }} />,
    name: 'Claude AI Analysis',
    desc: 'Claude Sonnet 4.5 aggregates and synthesizes all data for insights',
    iconColor: '#6e3bc9',
    iconBg: 'rgba(110,59,201,0.1)',
  },
];

export default function DataSourcesSection() {
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
          Real Data Sources
        </h2>
        <p
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 15,
            color: '#8e8e93',
          }}
        >
          We aggregate actual student experiences, not just vibes
        </p>
      </div>

      <div
        style={{ display: 'grid', gap: 8 }}
        className="sm:grid-cols-2 lg:grid-cols-3"
      >
        {sources.map(({ icon, name, desc, iconColor, iconBg }) => (
          <div
            key={name}
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '0.5px solid rgba(60,60,67,0.1)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              padding: '14px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 3px 14px rgba(0,0,0,0.09)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 10,
                background: iconBg,
                color: iconColor,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  color: '#1c1c1e',
                  marginBottom: 3,
                }}
              >
                {name}
              </p>
              <p
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                  fontSize: 12,
                  color: '#8e8e93',
                  lineHeight: 1.45,
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
