import type { OverallAnalysis } from '../types';

interface OverallScoreDisplayV2Props {
  overall: OverallAnalysis;
  totalUnits: number;
}

export default function OverallScoreDisplayV2({ overall, totalUnits }: OverallScoreDisplayV2Props) {
  // Calculate percentage for visual bar
  const percentage = overall.score;

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className="card bg-gradient-to-br from-cook-red via-red-600 to-orange-600 text-white shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🔥 Your Cooked Scale Score 🔥</h2>
          <p className="text-red-100 text-sm">AI-Powered Semester Difficulty Analysis</p>
        </div>

        <div className="text-center mb-8">
          <div className="text-9xl font-black mb-4" style={{
            textShadow: '4px 4px 8px rgba(0,0,0,0.3)'
          }}>
            {overall.score}
          </div>
          <div className="text-4xl font-bold mb-4">{overall.verbalLabel}</div>
          <div className="text-xl text-red-100">out of 100</div>
        </div>

        {/* Visual Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-white bg-opacity-20 rounded-full h-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-300 to-white transition-all duration-1000 ease-out flex items-center justify-end pr-2"
              style={{ width: `${percentage}%` }}
            >
              {percentage > 15 && (
                <span className="text-xs font-bold text-red-900">{percentage}%</span>
              )}
            </div>
          </div>
        </div>

        {/* Semester Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold">{totalUnits}</div>
            <div className="text-sm text-red-100">Total Units</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold">
              {overall.score <= 35 ? '😌' : overall.score <= 50 ? '😐' : overall.score <= 70 ? '😰' : '💀'}
            </div>
            <div className="text-sm text-red-100">Difficulty Level</div>
          </div>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="card border-l-4 border-purple-500 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="text-3xl">🤖</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
            <p className="text-base text-gray-800 leading-relaxed">{overall.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Insights */}
      {overall.insights.length > 0 && (
        <div className="card border-l-4 border-blue-500 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Key Insights</h3>
              <ul className="space-y-2">
                {overall.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-sm text-gray-700 leading-relaxed flex-1">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Warnings */}
      {overall.warnings.length > 0 && (
        <div className="card border-l-4 border-red-500 bg-red-50 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="text-3xl">⚠️</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-900 mb-3">Warnings & Challenges</h3>
              <ul className="space-y-2">
                {overall.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">▸</span>
                    <span className="text-sm text-red-800 leading-relaxed flex-1 font-medium">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Strengths */}
      {overall.strengths.length > 0 && (
        <div className="card border-l-4 border-green-500 bg-green-50 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="text-3xl">✨</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-900 mb-3">Strengths & Opportunities</h3>
              <ul className="space-y-2">
                {overall.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-sm text-green-800 leading-relaxed flex-1 font-medium">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Cook Scale Legend */}
      <div className="card bg-gray-50">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Cook Scale Guide</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-16 text-center font-bold text-sm text-gray-700">0-20</div>
            <div className="flex-1 bg-green-100 border-l-4 border-green-500 px-3 py-2 rounded">
              <span className="font-medium text-gray-900">Raw 🥩</span>
              <span className="text-xs text-gray-600 ml-2">- Light semester, minimal stress</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 text-center font-bold text-sm text-gray-700">21-35</div>
            <div className="flex-1 bg-yellow-100 border-l-4 border-yellow-500 px-3 py-2 rounded">
              <span className="font-medium text-gray-900">Lightly Toasted 🍞</span>
              <span className="text-xs text-gray-600 ml-2">- Manageable with good habits</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 text-center font-bold text-sm text-gray-700">36-50</div>
            <div className="flex-1 bg-orange-100 border-l-4 border-orange-500 px-3 py-2 rounded">
              <span className="font-medium text-gray-900">Medium 🍳</span>
              <span className="text-xs text-gray-600 ml-2">- Standard USC workload</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 text-center font-bold text-sm text-gray-700">51-65</div>
            <div className="flex-1 bg-red-100 border-l-4 border-red-500 px-3 py-2 rounded">
              <span className="font-medium text-gray-900">Well Done 🥓</span>
              <span className="text-xs text-gray-600 ml-2">- Challenging but doable</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 text-center font-bold text-sm text-gray-700">66-80</div>
            <div className="flex-1 bg-red-200 border-l-4 border-red-600 px-3 py-2 rounded">
              <span className="font-medium text-gray-900">Extra Crispy 🔥</span>
              <span className="text-xs text-gray-600 ml-2">- Very demanding schedule</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 text-center font-bold text-sm text-gray-700">81-100</div>
            <div className="flex-1 bg-red-300 border-l-4 border-red-700 px-3 py-2 rounded">
              <span className="font-medium text-gray-900">Absolutely Burnt 💀</span>
              <span className="text-xs text-gray-600 ml-2">- Extreme difficulty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
