import { useEffect, useRef } from 'react';
import { Circle } from 'progressbar.js';

interface AnimatedScoreCircleProps {
  score: number;
  size?: number;
}

export default function AnimatedScoreCircle({ score, size = 120 }: AnimatedScoreCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<InstanceType<typeof Circle> | null>(null);

  const color =
    score > 70 ? '#ef4444' :
    score > 50 ? '#f97316' :
    score > 30 ? '#f59e0b' :
    '#22c55e';

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy previous instance if any
    if (barRef.current) {
      barRef.current.destroy();
      barRef.current = null;
    }

    const bar = new Circle(containerRef.current, {
      color,
      strokeWidth: 7,
      trailColor: 'rgba(60,60,67,0.10)',
      trailWidth: 4,
      duration: 1500,
      easing: 'easeInOut',
      svgStyle: { width: '100%', height: '100%' },
      text: {
        value: `${score}`,
        className: 'progressbar-text',
        style: {
          color: '#1c1c1e',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          margin: '0',
          padding: '0',
          fontSize: size > 100 ? '28px' : '20px',
          fontWeight: '900',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          letterSpacing: '-1px',
        },
      },
    });

    bar.animate(score / 100);
    barRef.current = bar;

    return () => {
      bar.destroy();
      barRef.current = null;
    };
  }, [score, color, size]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: size,
        height: size,
        margin: '0 auto',
      }}
    />
  );
}
