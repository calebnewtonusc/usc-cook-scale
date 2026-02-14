import { AlertTriangle, Save } from 'lucide-react';
import type { AnalysisResultV2 } from '../types';
import OverallScoreDisplayV2 from './OverallScoreDisplayV2';
import ClassBreakdownV2 from './ClassBreakdownV2';

interface CookScoreDisplayV2Props {
  result: AnalysisResultV2;
  onReset: () => void;
}

export default function CookScoreDisplayV2({ result, onReset }: CookScoreDisplayV2Props) {
  return (
    <div className="space-y-8">
      {/* Overall Score Section */}
      <OverallScoreDisplayV2 overall={result.overall} totalUnits={result.totalUnits} />

      {/* Class Breakdown Section */}
      <ClassBreakdownV2 classes={result.classes} />

      {/* Action Buttons */}
      <div className="card bg-gray-50 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          What's Next?
        </h3>
        <p className="text-gray-700 mb-6">
          Want to analyze a different schedule or adjust your current one?
        </p>
        <div className="flex gap-4 justify-center">
          <button onClick={onReset} className="btn-primary">
            Analyze Another Schedule
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <Save className="w-5 h-5" /> Save Results (Print)
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card bg-yellow-50 border-2 border-yellow-300">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 mb-2">Important Disclaimer</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              The Cook Scale is an AI-powered tool that aggregates data from RateMyProfessors, Reddit, and other
              sources to help you understand your schedule difficulty. Scores are estimates based on available data
              and may not reflect your personal experience. Every student's capabilities and circumstances are different.
              Use this as one data point among many when planning your semester.
            </p>
            <p className="text-xs text-gray-600 mt-2">
              💡 Always consult with your academic advisor and consider your own strengths, interests, and goals.
            </p>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 text-center">
        <h4 className="text-lg font-bold text-gray-900 mb-2">
          Help Fellow Trojans! 🎓
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Share USC Cook Scale with your friends to help them plan their semesters
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              const url = window.location.origin;
              navigator.clipboard.writeText(url);
              alert('Link copied to clipboard!');
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            📋 Copy Link
          </button>
          <a
            href={`https://www.reddit.com/r/USC/submit?title=Check%20out%20USC%20Cook%20Scale!&text=I%20found%20this%20tool%20that%20analyzes%20your%20schedule%20difficulty:%20${encodeURIComponent(window.location.origin)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            💬 Share on r/USC
          </a>
        </div>
      </div>
    </div>
  );
}
