import { motion } from 'framer-motion';

const sfDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const sfText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";
const easing = [0.25, 0.46, 0.45, 0.94] as const;

const stats = [
  { value: '5+', label: 'Data Sources', sub: 'RMP, Reddit & more' },
  { value: '100%', label: 'AI-Powered', sub: 'Claude Sonnet 4.5' },
  { value: '~30s', label: 'Analysis Time', sub: 'Lightning fast' },
  { value: 'Free', label: 'Always', sub: 'No account needed' },
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

export default function StatsBanner() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 12,
        marginBottom: 72,
      }}
      className="md:grid-cols-4"
    >
      {stats.map(({ value, label, sub }) => (
        <motion.div
          key={label}
          variants={cardVariants}
          whileHover={{
            y: -3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
          transition={{ duration: 0.2, ease: easing }}
          style={{
            background: '#ffffff',
            borderRadius: 20,
            border: '0.5px solid rgba(60,60,67,0.1)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            padding: 24,
            textAlign: 'center',
            cursor: 'default',
          }}
        >
          <div
            style={{
              fontFamily: sfDisplay,
              fontWeight: 800,
              fontSize: 40,
              letterSpacing: '-1px',
              color: '#990000',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontFamily: sfText,
              fontWeight: 600,
              fontSize: 14,
              color: '#1c1c1e',
              marginBottom: 3,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: sfText,
              fontSize: 12,
              color: '#8e8e93',
              letterSpacing: '0.1px',
            }}
          >
            {sub}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
