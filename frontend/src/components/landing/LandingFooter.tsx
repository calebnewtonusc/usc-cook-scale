import { GraduationCap } from 'lucide-react';

interface LandingFooterProps {
  onPrivacy?: () => void;
  onTerms?: () => void;
}

export default function LandingFooter({ onPrivacy, onTerms }: LandingFooterProps) {
  return (
    <div className="flex flex-col items-center gap-6 pt-8 border-t border-gray-200">
      <a
        href="https://calebnewton.me"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 px-8 py-6 bg-white/80 backdrop-blur-sm rounded-full border-2 border-cook-red/30 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:border-cook-red/60 transition-all duration-300 no-underline"
      >
        <img
          src="/caleb-usc.jpg"
          alt="Caleb Newton at USC"
          className="w-12 h-12 rounded-full object-cover shadow-lg"
          style={{
            objectPosition: 'center 30%',
            border: '2px solid #DC2626'
          }}
        />
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            Built by
          </span>
          <span className="text-base text-gray-900 font-bold">
            Caleb Newton
          </span>
        </div>
      </a>
      <p className="text-sm text-gray-600 flex items-center gap-2 justify-center">
        Made for USC students <GraduationCap className="w-5 h-5 text-cook-red" />
      </p>
      <div className="text-xs text-gray-500 space-x-4">
        <button onClick={onPrivacy} className="hover:text-cook-red transition-colors">Privacy Policy</button>
        <span>•</span>
        <button onClick={onTerms} className="hover:text-cook-red transition-colors">Terms of Service</button>
      </div>
    </div>
  );
}
