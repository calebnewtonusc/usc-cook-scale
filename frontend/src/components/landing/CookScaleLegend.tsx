interface Level {
  range: string;
  label: string;
  emoji: string;
  desc: string;
  accentColor: string;
  accentBg: string;
  barColor: string;
  widthPct: number;
}

const levels: Level[] = [
  {
    range: '0–20',
    label: 'Raw',
    emoji: '😎',
    desc: 'Light semester, minimal stress. Go touch grass.',
    accentColor: '#1a7a34',
    accentBg: 'rgba(52,199,89,0.1)',
    barColor: '#34C759',
    widthPct: 20,
  },
  {
    range: '21–35',
    label: 'Lightly Toasted',
    emoji: '🌡️',
    desc: 'Manageable with good study habits.',
    accentColor: '#4a8000',
    accentBg: 'rgba(130,198,0,0.1)',
    barColor: '#82C600',
    widthPct: 35,
  },
  {
    range: '36–50',
    label: 'Medium',
    emoji: '🔥',
    desc: 'Standard USC workload. You signed up for this.',
    accentColor: '#a05a00',
    accentBg: 'rgba(255,149,0,0.1)',
    barColor: '#FF9500',
    widthPct: 50,
  },
  {
    range: '51–65',
    label: 'Well Done',
    emoji: '🔥🔥',
    desc: 'Challenging but doable. Start early, stay consistent.',
    accentColor: '#c03800',
    accentBg: 'rgba(255,69,0,0.1)',
    barColor: '#FF4500',
    widthPct: 65,
  },
  {
    range: '66–80',
    label: 'Extra Crispy',
    emoji: '🔥🔥🔥',
    desc: 'Very demanding. Plan every single week.',
    accentColor: '#cc1500',
    accentBg: 'rgba(220,38,38,0.1)',
    barColor: '#dc2626',
    widthPct: 80,
  },
  {
    range: '81–100',
    label: 'Absolutely Cooked',
    emoji: '💀',
    desc: 'Pray. Also: RateMyProfessors is your best friend now.',
    accentColor: '#990000',
    accentBg: 'rgba(153,0,0,0.1)',
    barColor: '#990000',
    widthPct: 100,
  },
];

export default function CookScaleLegend() {
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
          The Cooked Scale
        </h2>
        <p
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 15,
            color: '#8e8e93',
          }}
        >
          From "Chill" to "Send Help" — where does your schedule land?
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {levels.map(({ range, label, emoji, desc, accentColor, accentBg, barColor, widthPct }) => (
          <div
            key={range}
            style={{
              background: '#ffffff',
              borderRadius: 14,
              border: '0.5px solid rgba(60,60,67,0.1)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 3px 14px rgba(0,0,0,0.09)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
            }}
          >
            {/* Range badge */}
            <div
              style={{
                background: accentBg,
                color: accentColor,
                borderRadius: 980,
                padding: '3px 10px',
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                letterSpacing: '0.2px',
                flexShrink: 0,
                minWidth: 52,
                textAlign: 'center',
              }}
            >
              {range}
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: 80,
                height: 5,
                background: 'rgba(60,60,67,0.1)',
                borderRadius: 980,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${widthPct}%`,
                  background: barColor,
                  borderRadius: 980,
                }}
              />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 15, lineHeight: 1 }}>{emoji}</span>
                <span
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: '#1c1c1e',
                    letterSpacing: '-0.1px',
                  }}
                >
                  {label}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                  fontSize: 12,
                  color: '#8e8e93',
                  marginTop: 2,
                  lineHeight: 1.4,
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
