import { useEffect, useState } from 'react';

const LOADING_MESSAGES = [
  { text: 'Consulting the Oracle of RateMyProfessors...', emoji: '🔮' },
  { text: 'Scanning r/USC for trauma reports...', emoji: '📱' },
  { text: 'Asking your future self how bad it was...', emoji: '🕰️' },
  { text: 'Calculating GPA destruction potential...', emoji: '📉' },
  { text: 'Waking up a Reddit lurker for insight...', emoji: '😴' },
  { text: 'Checking if this schedule is illegal...', emoji: '⚖️' },
  { text: 'Interviewing survivors from last semester...', emoji: '🎤' },
  { text: 'Reading professor reviews at 3am energy...', emoji: '☕' },
  { text: 'Calculating how much coffee you\'ll need...', emoji: '☕☕☕' },
  { text: 'Asking Claude to be brutally honest...', emoji: '🤖' },
  { text: 'Preparing your emotional support document...', emoji: '📋' },
  { text: 'Consulting ancient USC scheduling wisdom...', emoji: '📜' },
  { text: 'Running simulations of your finals week...', emoji: '💻' },
  { text: 'Checking if your major is known for sadism...', emoji: '😈' },
  { text: 'Counting the number of crying emojis in reviews...', emoji: '😭' },
];

const STEPS = [
  { label: 'Verifying professors on RateMyProfessors', emoji: '⭐' },
  { label: 'Extracting real student reviews', emoji: '💬' },
  { label: 'Searching Reddit discussions', emoji: '🔴' },
  { label: 'Calculating difficulty scores', emoji: '🧮' },
  { label: 'Generating survival tips', emoji: '💡' },
];

export default function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState('');
  const [flameCount, setFlameCount] = useState(1);

  // Rotate funny messages every 3 seconds
  useEffect(() => {
    const shuffled = [...LOADING_MESSAGES].sort(() => Math.random() - 0.5);
    let i = 0;

    const interval = setInterval(() => {
      i = (i + 1) % shuffled.length;
      setMessageIndex(i);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Advance step index to simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Flame animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFlameCount((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = LOADING_MESSAGES[messageIndex];

  return (
    <div className="card shadow-xl text-center py-12 px-8 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-4 text-6xl opacity-5 animate-spin-slow">🔥</div>
        <div className="absolute bottom-4 right-4 text-6xl opacity-5 animate-spin-slow" style={{ animationDirection: 'reverse' }}>🔥</div>
      </div>

      <div className="relative z-10">
        {/* Animated flame emoji stack */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="flex gap-1 text-5xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`transition-all duration-300 ${
                    i < flameCount ? 'opacity-100 scale-110' : 'opacity-20 scale-90'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  🔥
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main title */}
        <h2 className="text-2xl font-black text-cook-red mb-2">
          Analyzing Your Schedule{dots}
        </h2>

        {/* Rotating funny message */}
        <div className="min-h-[3rem] flex items-center justify-center mb-8">
          <div className="transition-all duration-500 text-center">
            <span className="text-3xl mb-2 block">{currentMessage.emoji}</span>
            <p className="text-gray-600 font-medium text-base italic">
              "{currentMessage.text}"
            </p>
          </div>
        </div>

        {/* Progress steps */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 text-left">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What we're doing:</p>
          <div className="space-y-2.5">
            {STEPS.map((step, i) => (
              <div
                key={step.label}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  i < stepIndex ? 'opacity-100' :
                  i === stepIndex ? 'opacity-100' :
                  'opacity-30'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all duration-500 ${
                    i < stepIndex
                      ? 'bg-emerald-100 text-emerald-600'
                      : i === stepIndex
                      ? 'bg-cook-red text-white animate-pulse'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i < stepIndex ? '✓' : step.emoji}
                </div>
                <span
                  className={`text-sm font-medium ${
                    i < stepIndex ? 'text-emerald-700 line-through opacity-60' :
                    i === stepIndex ? 'text-gray-900' :
                    'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
                {i === stepIndex && (
                  <div className="flex gap-1 ml-auto">
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="loading-dot w-1.5 h-1.5 bg-cook-red rounded-full"
                        style={{ animationDelay: `${d * 0.2}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-cook-red rounded-full animate-pulse" />
          <span>This takes 15–30 seconds — we're doing a LOT of research</span>
        </div>

        {/* Meme footer */}
        <p className="text-xs text-gray-400 mt-4 italic">
          (Your professors didn't make it this long to be summarized quickly)
        </p>
      </div>
    </div>
  );
}
