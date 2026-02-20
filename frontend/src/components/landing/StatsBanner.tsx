const stats = [
  { value: '5+', label: 'Data Sources', sub: 'RMP, Reddit, Reviews', color: 'text-cook-red' },
  { value: '100%', label: 'AI-Powered', sub: 'Claude Sonnet 4.5', color: 'text-purple-600' },
  { value: '~30s', label: 'Analysis Time', sub: 'Lightning fast research', color: 'text-blue-600' },
  { value: 'Free', label: 'Always', sub: 'No account needed', color: 'text-emerald-600' },
];

export default function StatsBanner() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
      {stats.map(({ value, label, sub, color }) => (
        <div
          key={label}
          className="glass-card p-4 text-center hover:shadow-card-hover transition-shadow duration-200"
        >
          <div className={`text-3xl font-black mb-1 ${color}`}>{value}</div>
          <div className="text-sm font-bold text-gray-800">{label}</div>
          <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
        </div>
      ))}
    </div>
  );
}
