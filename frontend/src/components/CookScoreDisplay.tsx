import { Flame, Skull, Circle, CircleDot, Disc } from 'lucide-react';
import type { AnalysisResult } from '../types';
import ClassBreakdown from './ClassBreakdown';

interface CookScoreDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function CookScoreDisplay({ result, onReset }: CookScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score <= 20) return 'from-blue-400 to-blue-600';
    if (score <= 35) return 'from-green-400 to-green-600';
    if (score <= 50) return 'from-yellow-400 to-yellow-600';
    if (score <= 65) return 'from-orange-400 to-orange-600';
    if (score <= 80) return 'from-red-400 to-red-600';
    return 'from-red-600 to-red-900';
  };

  const getProgressWidth = (score: number) => `${score}%`;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Overall Score Card */}
      <div className="card text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Flame className="w-8 h-8 text-cook-red" /> Your Cook Scale Score <Flame className="w-8 h-8 text-cook-red" />
        </h2>

        <div className="my-8">
          <div className="text-7xl font-black text-cook-red mb-2">
            {result.overallScore}
            <span className="text-4xl text-gray-500">/100</span>
          </div>
          <div className="text-2xl font-bold text-gray-700 mb-6">
            {result.verbalLabel}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
            <div
              className={`h-full bg-gradient-to-r ${getScoreColor(
                result.overallScore
              )} transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
              style={{ width: getProgressWidth(result.overallScore) }}
            >
              <span className="text-white font-bold text-sm">
                {result.overallScore}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Total Classes:</span>{' '}
            {result.classes.length}
          </div>
          <div>
            <span className="font-medium">Total Units:</span>{' '}
            {result.totalUnits}
          </div>
        </div>

        <button
          onClick={onReset}
          className="btn-secondary mt-6"
        >
          Analyze Another Schedule
        </button>
      </div>

      {/* Class Breakdown */}
      <ClassBreakdown classes={result.classes} />

      {/* Legend */}
      <div className="card bg-gradient-to-r from-yellow-50 to-red-50">
        <h3 className="font-bold mb-3">Cook Scale Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-500 rounded"></span>
            <span className="flex items-center gap-1">0-20: Raw <Circle className="inline w-3 h-3" strokeWidth={3} /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-500 rounded"></span>
            <span className="flex items-center gap-1">21-35: Lightly Toasted <CircleDot className="inline w-3 h-3" strokeWidth={3} /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-yellow-500 rounded"></span>
            <span className="flex items-center gap-1">36-50: Medium <Disc className="inline w-3 h-3" strokeWidth={2} /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-orange-500 rounded"></span>
            <span className="flex items-center gap-1">51-65: Well Done <Disc className="inline w-3 h-3 fill-current" /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-500 rounded"></span>
            <span className="flex items-center gap-1">66-80: Extra Crispy <Flame className="inline w-3 h-3" /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-900 rounded"></span>
            <span className="flex items-center gap-1">81-100: Absolutely Burnt <Skull className="inline w-3 h-3" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}
