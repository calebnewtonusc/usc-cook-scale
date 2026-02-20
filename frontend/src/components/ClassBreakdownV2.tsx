import { useState } from 'react';
import type { ReactNode } from 'react';
import { BookOpen, AlertTriangle, Bot, Star, Flame, BarChart3, Users, MessageCircle, Lightbulb, ExternalLink, Search, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ClassAnalysis } from '../types';

interface ClassBreakdownV2Props {
  classes: ClassAnalysis[];
}

// ─── Utility helpers ────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score <= 25) return '#10B981';
  if (score <= 45) return '#F59E0B';
  if (score <= 65) return '#F97316';
  return '#990000';
}

function getDifficultyTrend(difficulty: number): ReactNode {
  if (difficulty >= 4.0) return <TrendingUp className="w-4 h-4 text-red-500" />;
  if (difficulty >= 2.5) return <Minus className="w-4 h-4 text-amber-500" />;
  return <TrendingDown className="w-4 h-4 text-green-500" />;
}

// ─── Small focused components ────────────────────────────────────────────────

function DifficultyBadge({ score }: { score: number }) {
  if (score <= 25) return (
    <span className="badge-easy">
      <span>Easy</span>
    </span>
  );
  if (score <= 45) return (
    <span className="badge-medium">
      <span>Moderate</span>
    </span>
  );
  if (score <= 65) return (
    <span className="badge-hard">
      <span>Hard</span>
    </span>
  );
  return (
    <span className="badge-brutal">
      <Flame className="w-3 h-3" />
      <span>Brutal</span>
    </span>
  );
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < filled ? 'text-cook-yellow fill-cook-yellow' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );
}

interface ClassCardHeaderProps {
  cls: ClassAnalysis;
  scoreColor: string;
}

function ClassCardHeader({ cls, scoreColor }: ClassCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <h4 className="text-xl font-black text-gray-900 leading-tight">{cls.courseName}</h4>
          <DifficultyBadge score={cls.finalScore} />
        </div>
        <p className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
          <Users className="w-4 h-4 flex-shrink-0" />
          Prof. {cls.professor}
          {cls.professorMatch && (
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-full">
              Verified {Math.round(cls.professorMatch.confidence * 100)}%
            </span>
          )}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{cls.units} units</p>
      </div>

      {/* Score circle */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-md"
          style={{ backgroundColor: `${scoreColor}15`, border: `2px solid ${scoreColor}30` }}
        >
          <div className="text-3xl font-black leading-none" style={{ color: scoreColor }}>
            {cls.finalScore}
          </div>
          <div className="text-[10px] font-bold text-gray-500 mt-0.5">/ 100</div>
        </div>
        <span className="text-[10px] text-gray-400 mt-1">Cook Points</span>
      </div>
    </div>
  );
}

function ProfessorRatingCard({ cls }: { cls: ClassAnalysis }) {
  if (!cls.professorMatch || cls.professorMatch.numRatings === 0) return null;

  const { professorMatch } = cls;

  return (
    <div className="mb-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-blue-100">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-cook-yellow fill-cook-yellow" />
          Professor Rating
        </p>
        <span className="text-xs text-gray-400">{professorMatch.numRatings} reviews</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {/* Quality rating */}
        <div className="text-center bg-white rounded-xl p-2.5 shadow-sm">
          <div className="text-2xl font-black text-blue-600">{professorMatch.avgRating.toFixed(1)}</div>
          <StarRating rating={professorMatch.avgRating} />
          <div className="text-[11px] text-gray-500 mt-1">Quality /5</div>
        </div>
        {/* Difficulty rating */}
        <div className="text-center bg-white rounded-xl p-2.5 shadow-sm">
          <div className="flex items-center justify-center gap-1">
            <div className="text-2xl font-black text-orange-600">{professorMatch.avgDifficulty.toFixed(1)}</div>
            {getDifficultyTrend(professorMatch.avgDifficulty)}
          </div>
          <div className="flex justify-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-sm mx-0.5 ${i < Math.round(professorMatch.avgDifficulty) ? 'bg-orange-400' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Difficulty /5</div>
        </div>
        {/* Would retake */}
        <div className="text-center bg-white rounded-xl p-2.5 shadow-sm">
          <div
            className="text-2xl font-black"
            style={{ color: professorMatch.wouldTakeAgainPercent >= 70 ? '#10B981' : professorMatch.wouldTakeAgainPercent >= 50 ? '#F59E0B' : '#EF4444' }}
          >
            {Math.round(professorMatch.wouldTakeAgainPercent)}%
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Would Retake</div>
        </div>
      </div>
    </div>
  );
}

function DataWarnings({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
      <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-bold text-amber-800">Limited data available</p>
        <ul className="text-xs text-amber-700 mt-1 space-y-0.5">
          {errors.map((e) => (
            <li key={e}>• {e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AiInsightsCard({ aiInsights }: { aiInsights: string }) {
  return (
    <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
      <div className="flex items-start gap-2">
        <Bot className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-purple-800 mb-1">AI Analysis</p>
          <p className="text-sm text-gray-700 leading-relaxed">{aiInsights}</p>
        </div>
      </div>
    </div>
  );
}

interface RmpReviewsProps {
  quotes: ClassAnalysis['rmpQuotes'];
  rmpLink: string;
}

function RmpReviews({ quotes, rmpLink }: RmpReviewsProps) {
  if (quotes.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
          <Star className="w-4 h-4 text-cook-yellow" />
          What Students Say
        </p>
        <span className="text-xs text-gray-400">RateMyProfessors</span>
      </div>
      <div className="space-y-3">
        {quotes.slice(0, 3).map((review) => (
          <div
            key={`${review.date}-${review.comment.slice(0, 20)}`}
            className="bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-center">
                <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center text-xs font-black"
                  style={{
                    backgroundColor: `${review.rating >= 4 ? '#10B981' : review.rating >= 3 ? '#F59E0B' : '#EF4444'}20`,
                    color: review.rating >= 4 ? '#10B981' : review.rating >= 3 ? '#F59E0B' : '#EF4444'
                  }}>
                  {review.rating.toFixed(1)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  "{review.comment}"
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {review.course && (
                    <span className="text-xs text-gray-400">
                      {review.course}
                    </span>
                  )}
                  {review.difficulty > 0 && (
                    <span className="text-xs font-medium px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full border border-orange-100">
                      Difficulty: {review.difficulty.toFixed(1)}/5
                    </span>
                  )}
                  {review.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a
        href={rmpLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-3 text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
      >
        Read all reviews on RMP <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

function RedditDiscussions({ quotes }: { quotes: ClassAnalysis['redditQuotes'] }) {
  if (quotes.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4 text-orange-500" />
          r/USC Discussions
        </p>
      </div>
      <div className="space-y-3">
        {quotes.slice(0, 2).map((quote) => (
          <div
            key={quote.url}
            className="bg-orange-50 rounded-xl border border-orange-100 p-3.5"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="text-xs font-black text-orange-600 bg-orange-100 rounded-lg px-2 py-1">
                  {quote.upvotes > 0 ? `+${quote.upvotes}` : quote.upvotes}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  "{quote.text}"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">u/{quote.author}</span>
                  <a
                    href={quote.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-600 hover:text-orange-800 font-medium flex items-center gap-0.5"
                  >
                    View thread <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SurvivalTips({ tips }: { tips: string[] }) {
  if (tips.length === 0) return null;

  return (
    <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-5 h-5 text-emerald-600" />
        <p className="text-sm font-bold text-emerald-900">Survival Tips</p>
      </div>
      <ul className="space-y-2">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-emerald-700 text-xs font-bold">&#10003;</span>
            </div>
            <span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ScoreExplanationProps {
  explanation: string;
  rmpLink: string;
  redditSearchLink: string;
  courseSearchLink: string;
}

function ScoreExplanationAndLinks({ explanation, rmpLink, redditSearchLink, courseSearchLink }: ScoreExplanationProps) {
  return (
    <>
      <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1">
          <BarChart3 className="w-3.5 h-3.5" />
          How this score was calculated
        </p>
        <p className="text-xs text-gray-600 leading-relaxed">{explanation}</p>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
        <a
          href={rmpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-medium transition-colors border border-blue-100"
        >
          <Star className="w-3.5 h-3.5" /> RateMyProfessors
        </a>
        <a
          href={redditSearchLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg font-medium transition-colors border border-orange-100"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Reddit
        </a>
        <a
          href={courseSearchLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-medium transition-colors border border-purple-100"
        >
          <Search className="w-3.5 h-3.5" /> Google
        </a>
      </div>
    </>
  );
}

// ─── ClassCard ───────────────────────────────────────────────────────────────

function ClassCard({ cls, index }: { cls: ClassAnalysis; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const scoreColor = getScoreColor(cls.finalScore);

  return (
    <div
      className="card shadow-md border border-gray-100 overflow-hidden transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Color accent bar */}
      <div className="h-1 -mx-6 -mt-6 mb-6" style={{ backgroundColor: scoreColor }} />

      <ClassCardHeader cls={cls} scoreColor={scoreColor} />
      <ProfessorRatingCard cls={cls} />
      <DataWarnings errors={cls.errors} />
      <AiInsightsCard aiInsights={cls.aiInsights} />

      {/* Expand/collapse toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 border border-gray-200 mb-3"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Show Student Reviews & Tips
          </>
        )}
      </button>

      {/* Expandable content */}
      {expanded && (
        <div className="space-y-4 animate-fade-in">
          <RmpReviews quotes={cls.rmpQuotes} rmpLink={cls.rmpLink} />
          <RedditDiscussions quotes={cls.redditQuotes} />
          <SurvivalTips tips={cls.survivalTips} />
          <ScoreExplanationAndLinks
            explanation={cls.explanation}
            rmpLink={cls.rmpLink}
            redditSearchLink={cls.redditSearchLink}
            courseSearchLink={cls.courseSearchLink}
          />
        </div>
      )}
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function ClassBreakdownV2({ classes }: ClassBreakdownV2Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-cook-red" />
            Class Breakdown
          </h3>
          <p className="text-sm text-gray-500 mt-1">{classes.length} courses analyzed</p>
        </div>
        {/* Sort indicator */}
        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
          Sorted by difficulty
        </div>
      </div>

      <div className="space-y-6">
        {[...classes]
          .sort((a, b) => b.finalScore - a.finalScore)
          .map((cls, i) => (
            <ClassCard key={`${cls.courseName}-${cls.professor}`} cls={cls} index={i} />
          ))}
      </div>
    </div>
  );
}
