import { useEffect, useRef, useState } from 'react';

interface CookGaugeProps {
  score: number; // 0-100
  label: string;
  animate?: boolean;
}

// Map score to color stops on the arc
const getGaugeColor = (score: number): string => {
  if (score <= 20) return '#10B981';   // emerald
  if (score <= 35) return '#84CC16';   // lime
  if (score <= 50) return '#F59E0B';   // amber
  if (score <= 65) return '#F97316';   // orange
  if (score <= 80) return '#EF4444';   // red
  return '#7C0000';                     // dark red (burnt)
};

const getFlameCount = (score: number): number => {
  if (score <= 20) return 0;
  if (score <= 35) return 1;
  if (score <= 50) return 2;
  if (score <= 65) return 3;
  if (score <= 80) return 4;
  return 5;
};

const SCORE_LABELS = [
  { min: 0, max: 20, label: 'Chill', emoji: '😎' },
  { min: 21, max: 35, label: 'Toasty', emoji: '🌡️' },
  { min: 36, max: 50, label: 'Warm', emoji: '🔥' },
  { min: 51, max: 65, label: 'Hot', emoji: '🔥🔥' },
  { min: 66, max: 80, label: 'Scorching', emoji: '🔥🔥🔥' },
  { min: 81, max: 100, label: 'COOKED', emoji: '💀' },
];

export default function CookGauge({ score, label, animate = true }: CookGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [needleAngle, setNeedleAngle] = useState(-90);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimated.current) return;
    hasAnimated.current = true;

    // Animate count-up
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * score);
      setDisplayScore(current);
      // Needle goes from -90deg (0) to +90deg (100)
      setNeedleAngle(-90 + eased * 1.8 * score);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [score, animate]);

  const color = getGaugeColor(score);
  const flameCount = getFlameCount(score);
  const levelInfo = SCORE_LABELS.find(l => score >= l.min && score <= l.max) || SCORE_LABELS[SCORE_LABELS.length - 1];

  // SVG gauge arc parameters
  const cx = 120;
  const cy = 110;
  const r = 90;

  // Arc path helper
  const polarToCartesian = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const arcPath = (startDeg: number, endDeg: number, radius: number) => {
    const arcStart = polarToCartesian(startDeg);
    const end = polarToCartesian(endDeg);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  // Needle tip calculation
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleTipX = cx + 75 * Math.cos(needleRad);
  const needleTipY = cy + 75 * Math.sin(needleRad);

  // Color segments for the arc
  const segments = [
    { start: -180, end: -144, color: '#10B981' }, // 0-20: emerald
    { start: -144, end: -108, color: '#84CC16' }, // 21-35: lime
    { start: -108, end:  -72, color: '#F59E0B' }, // 36-50: amber
    { start:  -72, end:  -36, color: '#F97316' }, // 51-65: orange
    { start:  -36, end:   -9, color: '#EF4444' }, // 66-80: red
    { start:   -9, end:    0, color: '#7C0000' }, // 81-100: dark red
  ];

  return (
    <div className="flex flex-col items-center">
      {/* SVG Gauge */}
      <div className="relative w-full max-w-[260px]">
        <svg viewBox="0 0 240 130" className="w-full" aria-label={`Cook Scale gauge: ${displayScore} out of 100`}>
          {/* Background arc */}
          <path
            d={arcPath(-180, 0, r)}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="22"
            strokeLinecap="round"
          />

          {/* Colored segments */}
          {segments.map((seg, i) => (
            <path
              key={i}
              d={arcPath(seg.start, seg.end, r)}
              fill="none"
              stroke={seg.color}
              strokeWidth="18"
              opacity="0.9"
            />
          ))}

          {/* Glow overlay for current score */}
          <path
            d={arcPath(-180, -180 + 1.8 * displayScore, r)}
            fill="none"
            stroke={getGaugeColor(displayScore)}
            strokeWidth="8"
            opacity="0.6"
            strokeLinecap="round"
            style={{ filter: 'blur(2px)' }}
          />

          {/* Tick marks */}
          {[0, 20, 35, 50, 65, 80, 100].map((tick) => {
            const angle = -180 + tick * 1.8;
            const inner = polarToCartesian(angle);
            const outer = {
              x: cx + 105 * Math.cos((angle * Math.PI) / 180),
              y: cy + 105 * Math.sin((angle * Math.PI) / 180),
            };
            return (
              <line
                key={tick}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="#9ca3af"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Needle shadow */}
          <line
            x1={cx}
            y1={cy}
            x2={needleTipX + 1}
            y2={needleTipY + 1}
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleTipX}
            y2={needleTipY}
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ transition: 'all 0.1s' }}
          />

          {/* Center hub */}
          <circle cx={cx} cy={cy} r="9" fill={color} />
          <circle cx={cx} cy={cy} r="5" fill="white" />

          {/* Labels below arc */}
          <text x="28" y="125" fontSize="9" fill="#6b7280" textAnchor="middle" fontWeight="600">Chill</text>
          <text x="212" y="125" fontSize="9" fill="#6b7280" textAnchor="middle" fontWeight="600">Cooked</text>
        </svg>

        {/* Score display in center */}
        <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none">
          <div className="text-center">
            <div
              className="text-5xl font-black leading-none"
              style={{ color, textShadow: `0 2px 8px ${color}40` }}
            >
              {displayScore}
            </div>
            <div className="text-xs font-bold text-gray-500 mt-0.5">/ 100</div>
          </div>
        </div>
      </div>

      {/* Label and flames */}
      <div className="mt-3 text-center">
        <div className="text-2xl font-black text-gray-900 mb-1">{label}</div>
        <div className="flex items-center justify-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-xl transition-all duration-300 ${i < flameCount ? 'opacity-100 animate-bounce-subtle' : 'opacity-20'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {i < flameCount ? '🔥' : '🔥'}
            </span>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500 font-medium">
          {levelInfo.emoji} {levelInfo.label} Territory
        </div>
      </div>

      {/* Mini scale legend */}
      <div className="mt-4 flex items-center gap-1 w-full max-w-[260px]">
        {segments.map((seg, i) => {
          const labels = ['0', '20', '35', '50', '65', '80', '100'];
          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full h-2 rounded-sm"
                style={{ backgroundColor: seg.color }}
              />
              <div className="text-[9px] text-gray-400 mt-0.5">{labels[i]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
