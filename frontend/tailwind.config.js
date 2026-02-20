/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cook-red': '#990000',
        'cook-red-light': '#CC0000',
        'cook-red-dark': '#6B0000',
        'cook-yellow': '#FFCC00',
        'cook-yellow-light': '#FFE066',
        'cook-yellow-dark': '#CC9900',
        'cook-gold': '#FFB800',
        'usc-red': '#990000',
        'usc-gold': '#FFCC00',
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'flame-flicker': 'flicker 0.8s ease-in-out infinite alternate',
        'needle-swing': 'needleSwing 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'count-up': 'countUp 1.5s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        flicker: {
          '0%': { opacity: '0.85', transform: 'scaleY(0.96) scaleX(0.98)' },
          '100%': { opacity: '1', transform: 'scaleY(1.04) scaleX(1.02)' },
        },
        needleSwing: {
          '0%': { transform: 'rotate(-90deg)' },
          '100%': { transform: 'var(--needle-rotate)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(153, 0, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(153, 0, 0, 0.6)' },
        },
      },
      backgroundImage: {
        'usc-gradient': 'linear-gradient(135deg, #990000 0%, #CC0000 50%, #6B0000 100%)',
        'hero-gradient': 'linear-gradient(135deg, #1a0000 0%, #3d0000 40%, #1a0000 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #FFCC00 0%, #FFE066 50%, #FFCC00 100%)',
      },
      boxShadow: {
        'usc': '0 4px 20px rgba(153, 0, 0, 0.3)',
        'usc-lg': '0 8px 40px rgba(153, 0, 0, 0.4)',
        'gold': '0 4px 20px rgba(255, 204, 0, 0.4)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
