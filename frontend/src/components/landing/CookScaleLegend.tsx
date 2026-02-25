import { motion } from 'framer-motion';

const sfDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const sfText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
const easing = [0.25, 0.46, 0.45, 0.94] as const;

interface Level {
  range: string;
  label: string;
  desc: string;
  color: string;
  colorBg: string;
  barColor: string;
  widthPct: number;
}

const levels: Level[] = [
  {
    range: '0–20',
    label: 'Raw',
    desc: 'Light semester, minimal stress. Go touch grass.',
    color: '#1a7a34',
    colorBg: 'rgba(52,199,89,0.10)',
    barColor: '#34C759',
    widthPct: 20,
  },
  {
    range: '21–35',
    label: 'Lightly Toasted',
    desc: 'Manageable with good study habits.',
    color: '#4a8000',
    colorBg: 'rgba(130,198,0,0.10)',
    barColor: '#82C600',
    widthPct: 35,
  },
  {
    range: '36–50',
    label: 'Medium',
    desc: 'Standard USC workload. You signed up for this.',
    color: '#a05a00',
    colorBg: 'rgba(255,149,0,0.10)',
    barColor: '#FF9500',
    widthPct: 50,
  },
  {
    range: '51–65',
    label: 'Well Done',
    desc: 'Challenging but doable. Start early, stay consistent.',
    color: '#c03800',
    colorBg: 'rgba(255,69,0,0.10)',
    barColor: '#FF4500',
    widthPct: 65,
  },
  {
    range: '66–80',
    label: 'Extra Crispy',
    desc: 'Very demanding. Plan every single week.',
    color: '#cc1500',
    colorBg: 'rgba(220,38,38,0.10)',
    barColor: '#dc2626',
    widthPct: 80,
  },
  {
    range: '81–100',
    label: 'Absolutely Cooked',
    desc: 'Pray. Also: RateMyProfessors is your best friend now.',
    color: '#990000',
    colorBg: 'rgba(153,0,0,0.10)',
    barColor: '#990000',
    widthPct: 100,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing },
  },
};

export default function CookScaleLegend() {
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
          The Rating System
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
          The Cooked Scale
        </h2>
        <p
          style={{
            fontFamily: sfText,
            fontSize: 17,
            color: '#3a3a3c',
            marginTop: 12,
            lineHeight: 1.5,
          }}
        >
          From "Chill" to "Send Help" — where does your schedule land?
        </p>
      </motion.div>

      {/* Tier cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {levels.map(({ range, label, desc, color, colorBg, barColor, widthPct }) => (
          <motion.div
            key={range}
            variants={cardVariants}
            whileHover={{
              y: -3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }}
            transition={{ duration: 0.2, ease: easing }}
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '0.5px solid rgba(60,60,67,0.1)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${barColor}`,
              overflow: 'hidden',
              cursor: 'default',
            }}
          >
            <div
              style={{
                padding: '18px 20px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Score range badge */}
              <div
                style={{
                  background: colorBg,
                  color: color,
                  borderRadius: 980,
                  padding: '4px 12px',
                  fontFamily: sfText,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.2px',
                  flexShrink: 0,
                  minWidth: 56,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {range}
              </div>

              {/* Text content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: sfDisplay,
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#1c1c1e',
                    letterSpacing: '-0.2px',
                    margin: '0 0 3px',
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontFamily: sfText,
                    fontSize: 14,
                    color: '#8e8e93',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {desc}
                </p>
              </div>
            </div>

            {/* Progress bar — thin strip at bottom */}
            <div
              style={{
                height: 3,
                background: 'rgba(60,60,67,0.06)',
                width: '100%',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${widthPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: easing }}
                style={{
                  height: '100%',
                  background: barColor,
                  borderRadius: '0 2px 2px 0',
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
