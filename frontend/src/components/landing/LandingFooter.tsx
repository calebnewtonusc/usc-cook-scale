import { GraduationCap, ExternalLink } from 'lucide-react';

interface LandingFooterProps {
  onPrivacy?: () => void;
  onTerms?: () => void;
}

export default function LandingFooter({ onPrivacy, onTerms }: LandingFooterProps) {
  return (
    <div className="flex flex-col items-center gap-5 pt-8 border-t border-gray-200">
      <a
        href="https://calebnewton.me"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 hover:border-cook-red/40 transition-all duration-200"
      >
        <img
          src="/caleb-usc.jpg"
          alt="Caleb Newton"
          className="w-10 h-10 rounded-full object-cover border-2 border-cook-red/30"
          style={{ objectPosition: 'center 30%' }}
        />
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold leading-none mb-0.5">Built by</p>
          <p className="text-sm text-gray-900 font-bold leading-none flex items-center gap-1">
            Caleb Newton
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </p>
        </div>
      </a>

      <p className="text-sm text-gray-500 flex items-center gap-1.5">
        Made with too much caffeine for USC students
        <GraduationCap className="w-4 h-4 text-cook-red" />
      </p>

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <button onClick={onPrivacy} className="hover:text-cook-red transition-colors font-medium">
          Privacy Policy
        </button>
        <span>&bull;</span>
        <button onClick={onTerms} className="hover:text-cook-red transition-colors font-medium">
          Terms of Service
        </button>
      </div>

      <p className="text-[11px] text-gray-300 text-center max-w-xl px-4">
        USC Cook Scale is an independent student project. "USC" and "University of Southern California"
        are trademarks of the University of Southern California.
      </p>
    </div>
  );
}
