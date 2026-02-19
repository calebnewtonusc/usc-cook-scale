import { AlertTriangle, Flame } from 'lucide-react';

interface HeroSectionProps {
  onStart: () => void;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="text-center mb-16">
      <div className="inline-block mb-6">
        <img
          src="/logo.png"
          alt="USC Cooked Scale Logo"
          className="w-32 h-32 md:w-48 md:h-48 mx-auto animate-pulse"
        />
      </div>
      <h1 className="text-6xl md:text-8xl font-black mb-6">
        <span className="bg-gradient-to-r from-cook-red to-cook-yellow bg-clip-text text-transparent">
          USC Cooked Scale
        </span>
      </h1>
      <p className="text-2xl md:text-3xl text-gray-700 font-bold mb-4">
        How Cooked Is Your Schedule?
      </p>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        AI-powered schedule analyzer that combines <strong>real data</strong> from RateMyProfessors,
        Reddit, course reviews, and more to give you a comprehensive difficulty score.
      </p>

      {/* PROMINENT DISCLAIMERS */}
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
        <div className="flex items-start gap-3 text-left">
          <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-1 text-yellow-600" />
          <div className="space-y-2 text-sm text-gray-800">
            <p className="font-bold text-base text-yellow-900">IMPORTANT DISCLAIMERS:</p>
            <ul className="space-y-1.5 text-gray-700">
              <li><strong>Not Affiliated:</strong> This is an independent student project. Not affiliated with, endorsed by, or connected to the University of Southern California (USC), RateMyProfessors, Reddit, or any other third-party service.</li>
              <li><strong>Educational Purpose:</strong> Created for educational and informational purposes only as a student learning project.</li>
              <li><strong>Subjective Estimates:</strong> All difficulty scores are subjective algorithmic estimates based on available data and should not be considered definitive or official assessments.</li>
              <li><strong>Data Accuracy:</strong> While we strive for accuracy, data may be incomplete, outdated, or incorrect. Always verify information with official university sources.</li>
              <li><strong>USC Trademark:</strong> "USC" and "University of Southern California" are trademarks of the University of Southern California. Use of these terms is solely for descriptive purposes.</li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="btn-primary text-xl px-12 py-4 shadow-2xl hover:shadow-cook-red/50 transform hover:scale-105 transition-all inline-flex items-center gap-2"
      >
        Analyze My Schedule <Flame className="w-5 h-5" />
      </button>

      <p className="text-sm text-gray-500 mt-4">
        Free • No signup required • Takes 10 seconds
      </p>
    </div>
  );
}
