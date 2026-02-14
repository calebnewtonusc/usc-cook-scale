import { BookOpen, AlertTriangle, Bot, Star, Flame, BarChart3 } from 'lucide-react';
import type { ClassAnalysis } from '../types';

interface ClassBreakdownV2Props {
  classes: ClassAnalysis[];
}

export default function ClassBreakdownV2({ classes }: ClassBreakdownV2Props) {
  return (
    <div className="space-y-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BookOpen className="w-8 h-8" /> Class-by-Class Breakdown
      </h3>

      {classes.map((cls, index) => (
        <div key={index} className="card border-l-4 shadow-xl" style={{
          borderLeftColor: cls.finalScore > 70 ? '#DC2626' : cls.finalScore > 50 ? '#F59E0B' : '#10B981'
        }}>

          {/* Header Section */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h4 className="text-3xl font-bold text-gray-900 mb-2">
                {cls.courseName}
              </h4>
              <p className="text-xl text-gray-700 font-medium mb-1">
                👨‍🏫 Prof. {cls.professor}
              </p>
              <p className="text-sm text-gray-500">{cls.units} units</p>
              {cls.professorMatch && (
                <p className="text-xs text-blue-600 mt-1">
                  ✓ Professor verified ({Math.round(cls.professorMatch.confidence * 100)}% match confidence)
                </p>
              )}
            </div>
            <div className="text-right ml-4">
              <div className="text-6xl font-black mb-1" style={{
                color: cls.finalScore > 70 ? '#DC2626' : cls.finalScore > 50 ? '#F59E0B' : '#10B981'
              }}>
                {cls.finalScore}
              </div>
              <div className="text-sm text-gray-600 font-bold">/ 100</div>
              <div className="text-xs text-gray-500 mt-1">Cook Points</div>
            </div>
          </div>

          {/* Errors/Warnings */}
          {cls.errors && cls.errors.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-300">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-yellow-900 mb-1">Data Limitations</p>
                  <ul className="text-xs text-yellow-800 space-y-0.5">
                    {cls.errors.map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* AI Insights */}
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-start gap-3">
              <Bot className="w-6 h-6 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-bold text-purple-900 mb-1">AI Analysis</p>
                <p className="text-sm text-gray-800 leading-relaxed">{cls.aiInsights}</p>
              </div>
            </div>
          </div>

          {/* Professor Stats */}
          {cls.professorMatch && cls.professorMatch.numRatings > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <p className="text-sm font-bold text-blue-900">
                  Professor Ratings ({cls.professorMatch.numRatings} reviews)
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-white rounded-lg p-3">
                  <div className="text-3xl font-bold text-blue-600">
                    {cls.professorMatch.avgRating.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Quality /5</div>
                </div>
                <div className="text-center bg-white rounded-lg p-3">
                  <div className="text-3xl font-bold text-orange-600">
                    {cls.professorMatch.avgDifficulty.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Difficulty /5</div>
                </div>
                <div className="text-center bg-white rounded-lg p-3">
                  <div className="text-3xl font-bold text-green-600">
                    {Math.round(cls.professorMatch.wouldTakeAgainPercent)}%
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Would Retake</div>
                </div>
              </div>
            </div>
          )}

          {/* RMP Quotes */}
          {cls.rmpQuotes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">💬</span>
                <p className="text-sm font-bold text-gray-900">
                  What Students Say (RateMyProfessors)
                </p>
              </div>
              <div className="space-y-3">
                {cls.rmpQuotes.slice(0, 3).map((review, idx) => (
                  <div key={idx} className="bg-white border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="text-lg font-bold text-blue-600">{review.rating.toFixed(1)}</div>
                        <div className="text-xs text-gray-500">Quality</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 leading-relaxed mb-2">
                          "{review.comment}"
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {review.course && <span>📖 {review.course}</span>}
                          {review.difficulty > 0 && (
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Difficulty: {review.difficulty.toFixed(1)}/5
                            </span>
                          )}
                          {review.tags.length > 0 && (
                            <div className="flex gap-1 flex-wrap">
                              {review.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={cls.rmpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Read all {cls.professorMatch?.numRatings || 'more'} reviews on RateMyProfessors →
              </a>
            </div>
          )}

          {/* Reddit Quotes */}
          {cls.redditQuotes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-red-500" />
                <p className="text-sm font-bold text-gray-900">
                  r/USC Discussions
                </p>
              </div>
              <div className="space-y-3">
                {cls.redditQuotes.slice(0, 2).map((quote, idx) => (
                  <div key={idx} className="bg-white border-l-4 border-orange-400 p-4 rounded-r-lg shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="text-lg font-bold text-orange-600">⬆️ {quote.upvotes}</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800 leading-relaxed mb-2">
                          "{quote.text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">u/{quote.author}</span>
                          <a
                            href={quote.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-orange-600 hover:text-orange-800 font-medium"
                          >
                            View discussion →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={cls.redditSearchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-orange-600 hover:text-orange-800 font-medium"
              >
                Search more Reddit discussions →
              </a>
            </div>
          )}

          {/* Survival Tips */}
          <div className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💡</span>
              <p className="text-base font-bold text-green-900">Survival Tips</p>
            </div>
            <ul className="space-y-2">
              {cls.survivalTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-sm text-gray-800 leading-relaxed flex-1">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Score Breakdown */}
          <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🧮</span>
              <p className="text-sm font-bold text-gray-900">How This Score Was Calculated</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{cls.explanation}</p>
          </div>

          {/* Additional Research Links */}
          <div className="mt-6 pt-4 border-t-2 border-gray-100">
            <p className="text-xs text-gray-600 mb-3 font-medium">
              🔗 Additional Research
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={cls.rmpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg font-medium transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> RateMyProfessors
                </span>
              </a>
              <a
                href={cls.redditSearchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-2 rounded-lg font-medium transition-colors"
              >
                💬 Reddit Discussions
              </a>
              <a
                href={cls.courseSearchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-lg font-medium transition-colors"
              >
                🔍 Google Search
              </a>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
