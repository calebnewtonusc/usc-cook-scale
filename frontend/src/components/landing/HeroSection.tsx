import { AlertTriangle, Flame, Zap } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="relative mb-16 text-center">
      {/* Dark hero background card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-950 via-cook-red-dark to-gray-950 p-8 md:p-14 mb-8 shadow-2xl">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cook-red/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cook-yellow/10 rounded-full blur-3xl" />
        </div>

        {/* Floating flame decorations */}
        <div className="absolute top-6 left-6 text-4xl opacity-20 animate-bounce-subtle">🔥</div>
        <div className="absolute top-8 right-8 text-3xl opacity-15 animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>🔥</div>
        <div className="absolute bottom-6 left-12 text-2xl opacity-10 animate-bounce-subtle" style={{ animationDelay: '1s' }}>🔥</div>
        <div className="absolute bottom-8 right-12 text-4xl opacity-15 animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>💀</div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/logo.png"
              alt="USC Cooked Scale Logo"
              className="w-24 h-24 md:w-32 md:h-32 mx-auto drop-shadow-2xl"
            />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none">
            <span className="text-white">USC</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #FFCC00 0%, #FFE066 50%, #FFCC00 100%)' }}
            >
              Cooked Scale
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 font-bold mb-2">
            How Cooked Is Your Schedule?
          </p>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed">
            AI-powered difficulty analyzer combining real data from RateMyProfessors,
            Reddit, and more to give you the brutal truth about your semester.
          </p>

          {/* CTA Button */}
          <button
            onClick={onStart}
            className="inline-flex items-center gap-3 bg-cook-yellow hover:bg-cook-yellow-light text-gray-950 font-black text-xl px-10 py-4 rounded-2xl shadow-gold hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Flame className="w-6 h-6 animate-bounce-subtle" />
            Analyze My Schedule
            <Zap className="w-5 h-5" />
          </button>

          <p className="text-white/30 text-sm mt-4">
            Free &bull; No signup &bull; Results in ~30 seconds
          </p>
        </div>
      </div>

      {/* Disclaimer card - more compact */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-900 text-sm mb-1">Disclaimer</p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Independent student project — not affiliated with USC, RateMyProfessors, or Reddit.
              All scores are subjective algorithmic estimates for educational purposes only.
              Data may be incomplete or outdated. Always verify with official university sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
