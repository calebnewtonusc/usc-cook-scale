import { Flame, Users, BarChart3, Lightbulb, ExternalLink, Trophy } from 'lucide-react';

const features = [
  {
    icon: <Flame className="w-6 h-6" />,
    title: 'Overall Cook Scale Score',
    description: 'Your semester difficulty rated 0–100 with a verbal label from "Raw" to "Absolutely Cooked"',
    bg: 'bg-red-50',
    iconBg: 'bg-cook-red text-white',
    border: 'border-red-100',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Professor Deep Dive',
    description: 'Real RMP ratings, actual student quotes, Reddit threads, and direct links to all sources',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-500 text-white',
    border: 'border-amber-100',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Per-Class Breakdown',
    description: 'Individual difficulty scores with star ratings, trend indicators, and color-coded difficulty badges',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-600 text-white',
    border: 'border-blue-100',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Survival Tips',
    description: 'AI-generated tips specific to each professor and course based on real student feedback',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-600 text-white',
    border: 'border-emerald-100',
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: 'Schedule Strengths',
    description: 'What\'s working in your favor — silver linings and opportunities in your course selection',
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-600 text-white',
    border: 'border-purple-100',
  },
  {
    icon: <ExternalLink className="w-6 h-6" />,
    title: 'Source Links',
    description: 'Direct links to RateMyProfessors pages, Reddit discussions, and Google searches for every class',
    bg: 'bg-gray-50',
    iconBg: 'bg-gray-600 text-white',
    border: 'border-gray-100',
  },
];

export default function WhatYouGetSection() {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="section-title">What You'll Get</h2>
        <p className="section-subtitle">Comprehensive schedule intelligence, not just a number</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map(({ icon, title, description, bg, iconBg, border }) => (
          <div
            key={title}
            className={`${bg} border ${border} rounded-2xl p-5 hover:shadow-card-hover transition-all duration-200`}
          >
            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-3 ${iconBg}`}>
              {icon}
            </div>
            <h3 className="font-black text-gray-900 mb-1.5 text-base">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
