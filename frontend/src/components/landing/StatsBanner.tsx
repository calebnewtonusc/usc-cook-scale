const stats = [
  { value: '5+', label: 'Data Sources', sub: 'RMP, Reddit & more' },
  { value: '100%', label: 'AI-Powered', sub: 'Claude Sonnet 4.5' },
  { value: '~30s', label: 'Analysis Time', sub: 'Lightning fast' },
  { value: 'Free', label: 'Always', sub: 'No account needed' },
];

export default function StatsBanner() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginBottom: 64,
      }}
      className="md:grid-cols-4"
    >
      {stats.map(({ value, label, sub }) => (
        <div
          key={label}
          style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '0.5px solid rgba(60,60,67,0.1)',
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
            padding: '20px 16px',
            textAlign: 'center',
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 6px rgba(0,0,0,0.06)';
          }}
        >
          <div
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontWeight: 800,
              fontSize: 30,
              letterSpacing: '-0.4px',
              color: '#990000',
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: '#1c1c1e',
              marginBottom: 2,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: 11,
              color: '#8e8e93',
              letterSpacing: '0.1px',
            }}
          >
            {sub}
          </div>
        </div>
      ))}
    </div>
  );
}
