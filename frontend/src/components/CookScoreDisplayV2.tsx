import { useState } from 'react';
import { AlertTriangle, Lightbulb, Save, MessageCircle, Link, Check, Share2, Twitter } from 'lucide-react';
import type { AnalysisResultV2 } from '../types';
import OverallScoreDisplayV2 from './OverallScoreDisplayV2';
import ClassBreakdownV2 from './ClassBreakdownV2';

interface CookScoreDisplayV2Props {
  result: AnalysisResultV2;
  onReset: () => void;
}

function SharePanel({ result }: { result: AnalysisResultV2 }) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const score = result.overall.score;
  const label = result.overall.verbalLabel;
  const units = result.totalUnits;
  const url = window.location.origin;

  const shareText = `My USC schedule got a ${score}/100 on the Cooked Scale: "${label}" 🔥\n(${units} units this semester)\n\nCheck yours: ${url}`;

  const tweetText = encodeURIComponent(
    `My USC schedule got ${score}/100 on the Cooked Scale: "${label}" 🔥\n\nCheck yours: ${url} #USC #Trojans`
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareResult = async () => {
    if (typeof navigator.share === 'function') {
      setSharing(true);
      try {
        await navigator.share({
          title: 'My USC Cooked Scale Score',
          text: shareText,
          url,
        });
      } catch {
        // User cancelled or browser doesn't support
      } finally {
        setSharing(false);
      }
    } else {
      // Fallback: copy full share text
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="card border border-cook-red/20 bg-gradient-to-br from-cook-red/5 to-cook-yellow/5">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-cook-red" />
        <h4 className="text-base font-bold text-gray-900">Share Your Results</h4>
      </div>

      {/* Score preview */}
      <div className="bg-white rounded-xl p-3 mb-4 border border-gray-100 shadow-sm">
        <p className="text-xs text-gray-500 mb-1">Your share message:</p>
        <p className="text-sm text-gray-800 font-medium leading-relaxed">
          My USC schedule got a <span className="text-cook-red font-black">{score}/100</span> on the Cooked Scale: "{label}" 🔥
          <br />
          <span className="text-gray-500 text-xs">({units} units this semester)</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCopyLink}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 border-2 ${
            copied
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
              : 'bg-white border-gray-200 text-gray-700 hover:border-cook-red/50 hover:text-cook-red'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>

        <a
          href={`https://twitter.com/intent/tweet?text=${tweetText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-sky-500 hover:bg-sky-600 text-white"
        >
          <Twitter className="w-4 h-4" />
          Tweet It
        </a>

        <a
          href={`https://www.reddit.com/r/USC/submit?title=My%20USC%20Schedule%20got%20${score}%2F100%20on%20the%20Cooked%20Scale&text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-orange-500 hover:bg-orange-600 text-white"
        >
          <MessageCircle className="w-4 h-4" />
          Post to r/USC
        </a>

        {typeof navigator.share === 'function' && (
          <button
            onClick={handleShareResult}
            disabled={sharing}
            className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 bg-cook-red hover:bg-cook-red-dark text-white disabled:opacity-60"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Help fellow Trojans know what they're getting into
      </p>
    </div>
  );
}

export default function CookScoreDisplayV2({ result, onReset }: CookScoreDisplayV2Props) {
  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <OverallScoreDisplayV2 overall={result.overall} totalUnits={result.totalUnits} />

      {/* Share Panel */}
      <SharePanel result={result} />

      {/* Class Breakdown Section */}
      <ClassBreakdownV2 classes={result.classes} />

      {/* Action Buttons */}
      <div className="card bg-gray-50 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          What's Next?
        </h3>
        <p className="text-sm text-gray-600 mb-5">
          Want to analyze a different schedule or check a friend's classes?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onReset} className="btn-primary flex-1 flex items-center justify-center gap-2">
            Analyze Another Schedule
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-gray-400 transition-colors text-sm no-print"
          >
            <Save className="w-4 h-4" />
            Save / Print Results
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-amber-50 border border-amber-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-gray-900 mb-1 text-sm">Important Disclaimer</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              The Cook Scale is an AI-powered tool that aggregates data from RateMyProfessors, Reddit, and other
              sources. Scores are subjective algorithmic estimates and may not reflect your personal experience.
              Every student's capabilities and circumstances are different.
            </p>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              Always consult your academic advisor before making schedule decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
