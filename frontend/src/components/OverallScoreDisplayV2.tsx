import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Lightbulb, BarChart3, Flame, Smile, Meh, Frown, Skull, Bot, Sparkles } from 'lucide-react';
import type { OverallAnalysis } from '../types';
import CookGauge from './CookGauge';

interface OverallScoreDisplayV2Props {
  overall: OverallAnalysis;
  totalUnits: number;
}

function getDifficultyIcon(score: number) {
  if (score <= 35) return <Smile className="w-8 h-8 text-emerald-400" />;
  if (score <= 50) return <Meh className="w-8 h-8 text-amber-400" />;
  if (score <= 70) return <Frown className="w-8 h-8 text-orange-400" />;
  return <Skull className="w-8 h-8 text-red-400" />;
}

function getDifficultyBgClass(score: number): string {
  if (score <= 20) return 'from-emerald-900 via-emerald-800 to-green-900';
  if (score <= 35) return 'from-green-900 via-lime-900 to-yellow-900';
  if (score <= 50) return 'from-amber-900 via-orange-900 to-yellow-900';
  if (score <= 65) return 'from-orange-900 via-red-900 to-orange-900';
  if (score <= 80) return 'from-red-900 via-rose-900 to-cook-red-dark';
  return 'from-cook-red-dark via-red-950 to-gray-950';
}

function getScoreVerdict(score: number): { title: string; subtitle: string; emoji: string } {
  if (score <= 20) return { title: 'You\'re Chillin\'', subtitle: 'Light workload. Enjoy it while it lasts.', emoji: '😎' };
  if (score <= 35) return { title: 'Lightly Toasted', subtitle: 'Manageable with good habits.', emoji: '🌡️' };
  if (score <= 50) return { title: 'Getting Warm', subtitle: 'Standard USC workload. You\'ve got this.', emoji: '🔥' };
  if (score <= 65) return { title: 'Well Done', subtitle: 'Challenging semester. Start strong.', emoji: '🔥🔥' };
  if (score <= 80) return { title: 'Extra Crispy', subtitle: 'Very demanding. Plan every week carefully.', emoji: '🔥🔥🔥' };
  return { title: 'ABSOLUTELY COOKED', subtitle: 'Send help. And coffee. And prayers.', emoji: '💀' };
}

export default function OverallScoreDisplayV2({ overall, totalUnits }: OverallScoreDisplayV2Props) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const verdict = getScoreVerdict(overall.score);
  const bgGradient = getDifficultyBgClass(overall.score);

  return (
    <div
      ref={containerRef}
      className={`space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Main Score Hero Card */}
      <div className={`rounded-3xl bg-gradient-to-br ${bgGradient} text-white shadow-2xl overflow-hidden relative`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-cook-yellow/10 blur-3xl" />
          {overall.score > 60 && (
            <>
              <div className="absolute top-4 left-8 text-4xl opacity-10 animate-bounce-subtle">🔥</div>
              <div className="absolute top-12 right-12 text-3xl opacity-10 animate-bounce-subtle" style={{ animationDelay: '0.3s' }}>🔥</div>
              <div className="absolute bottom-8 left-1/3 text-2xl opacity-10 animate-bounce-subtle" style={{ animationDelay: '0.6s' }}>🔥</div>
            </>
          )}
        </div>

        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
              <Flame className="w-4 h-4 text-cook-yellow" />
              <span className="text-sm font-semibold text-cook-yellow uppercase tracking-widest">
                USC Cooked Scale Result
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-1">
              {verdict.emoji} {verdict.title}
            </h2>
            <p className="text-white/70 text-base">{verdict.subtitle}</p>
          </div>

          {/* Gauge */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 w-full max-w-xs">
              <CookGauge score={overall.score} label={overall.verbalLabel} animate={visible} />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center border border-white/10">
              <div className="text-3xl font-black text-cook-yellow">{overall.score}</div>
              <div className="text-xs text-white/60 mt-1 uppercase tracking-wide">Cook Score</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center border border-white/10">
              <div className="text-3xl font-black text-white">{totalUnits}</div>
              <div className="text-xs text-white/60 mt-1 uppercase tracking-wide">Units</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center border border-white/10">
              <div className="flex justify-center mb-1">{getDifficultyIcon(overall.score)}</div>
              <div className="text-xs text-white/60 uppercase tracking-wide">Vibe Check</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Card */}
      <div
        className={`card border border-purple-100 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-xl flex-shrink-0">
            <Bot className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              AI Analysis
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">Claude AI</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{overall.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Insights + Warnings + Strengths grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Warnings */}
        {overall.warnings.length > 0 && (
          <div
            className={`card bg-red-50 border border-red-200 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="font-bold text-red-900">Watch Out</h3>
            </div>
            <ul className="space-y-2">
              {overall.warnings.map((warning) => (
                <li key={warning} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0 text-xs">&#9654;</span>
                  <span className="text-sm text-red-800 leading-relaxed">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Strengths */}
        {overall.strengths.length > 0 && (
          <div
            className={`card bg-emerald-50 border border-emerald-200 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-emerald-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-emerald-900">Silver Linings</h3>
            </div>
            <ul className="space-y-2">
              {overall.strengths.map((strength) => (
                <li key={strength} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1 flex-shrink-0">&#10003;</span>
                  <span className="text-sm text-emerald-800 leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Key Insights */}
      {overall.insights.length > 0 && (
        <div
          className={`card border border-blue-100 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900">Key Insights</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {overall.insights.map((insight, i) => (
              <div key={insight} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 leading-relaxed">{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cook Scale Legend */}
      <div
        className={`card bg-gray-50 border border-gray-200 transition-all duration-700 delay-[600ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cook-red" />
          Cook Scale Reference Guide
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { range: '0-20', label: 'Raw', desc: 'Smooth sailing', color: 'bg-emerald-100 border-emerald-300 text-emerald-800', active: overall.score <= 20 },
            { range: '21-35', label: 'Lightly Toasted', desc: 'Manageable', color: 'bg-lime-100 border-lime-300 text-lime-800', active: overall.score > 20 && overall.score <= 35 },
            { range: '36-50', label: 'Medium', desc: 'Standard USC', color: 'bg-amber-100 border-amber-300 text-amber-800', active: overall.score > 35 && overall.score <= 50 },
            { range: '51-65', label: 'Well Done', desc: 'Challenging', color: 'bg-orange-100 border-orange-300 text-orange-800', active: overall.score > 50 && overall.score <= 65 },
            { range: '66-80', label: 'Extra Crispy', desc: 'Very tough', color: 'bg-red-100 border-red-300 text-red-800', active: overall.score > 65 && overall.score <= 80 },
            { range: '81-100', label: 'Absolutely Burnt', desc: 'Send help', color: 'bg-red-200 border-red-500 text-red-900', active: overall.score > 80 },
          ].map(({ range, label, desc, color, active }) => (
            <div
              key={range}
              className={`p-2.5 rounded-xl border-2 ${color} ${active ? 'ring-2 ring-cook-red ring-offset-1 scale-105 shadow-md' : 'opacity-60'} transition-all`}
            >
              <div className="font-bold text-xs">{range}</div>
              <div className="font-black text-sm">{label}</div>
              <div className="text-xs opacity-70">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
