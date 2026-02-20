const levels = [
  {
    range: '0–20',
    label: 'Raw',
    emoji: '😎',
    desc: 'Light semester, minimal stress. Go touch grass.',
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-800',
    bar: 'bg-emerald-400',
    width: 'w-[20%]',
  },
  {
    range: '21–35',
    label: 'Lightly Toasted',
    emoji: '🌡️',
    desc: 'Manageable with good study habits.',
    bg: 'bg-lime-50',
    border: 'border-lime-300',
    text: 'text-lime-800',
    bar: 'bg-lime-400',
    width: 'w-[35%]',
  },
  {
    range: '36–50',
    label: 'Medium',
    emoji: '🔥',
    desc: 'Standard USC workload. You signed up for this.',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-800',
    bar: 'bg-amber-400',
    width: 'w-[50%]',
  },
  {
    range: '51–65',
    label: 'Well Done',
    emoji: '🔥🔥',
    desc: 'Challenging but doable. Start early, stay consistent.',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-800',
    bar: 'bg-orange-400',
    width: 'w-[65%]',
  },
  {
    range: '66–80',
    label: 'Extra Crispy',
    emoji: '🔥🔥🔥',
    desc: 'Very demanding. Plan every single week.',
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-800',
    bar: 'bg-red-400',
    width: 'w-[80%]',
  },
  {
    range: '81–100',
    label: 'Absolutely Cooked',
    emoji: '💀',
    desc: 'Pray. Also: RateMyProfessors is your best friend now.',
    bg: 'bg-rose-50',
    border: 'border-rose-400',
    text: 'text-rose-900',
    bar: 'bg-rose-600',
    width: 'w-full',
  },
];

export default function CookScaleLegend() {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="section-title">The Cooked Scale</h2>
        <p className="section-subtitle">From "Chill" to "Send Help" — where does your schedule land?</p>
      </div>

      <div className="space-y-3">
        {levels.map(({ range, label, emoji, desc, bg, border, text, bar, width }) => (
          <div
            key={range}
            className={`${bg} border ${border} rounded-2xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow duration-200`}
          >
            {/* Range label */}
            <div className={`text-xs font-black ${text} w-14 text-center flex-shrink-0`}>{range}</div>

            {/* Progress bar */}
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <div className={`h-full ${bar} rounded-full ${width}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <span className={`font-black text-base ${text}`}>{label}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
