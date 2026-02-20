import { Star, MessageCircle, BookOpen, GraduationCap, TrendingUp, Bot } from 'lucide-react';

const sources = [
  {
    icon: <Star className="w-6 h-6" fill="currentColor" />,
    name: 'RateMyProfessors',
    desc: 'Professor ratings, difficulty scores, and "would take again" percentages',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    name: 'Reddit r/USC',
    desc: 'Real student discussions, class experiences, and professor insights',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    name: 'Course Reviews',
    desc: 'Semester-specific feedback and workload reports from actual students',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    name: 'USC Forums',
    desc: 'Student forum discussions, tips, and warnings about specific classes',
    color: 'text-cook-red bg-red-50 border-red-200',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    name: 'Grade Distributions',
    desc: 'Historical grade data and pass/fail rates when available',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    icon: <Bot className="w-6 h-6" />,
    name: 'Claude AI Analysis',
    desc: 'Claude Sonnet 4.5 aggregates and synthesizes all data for insights',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
  },
];

export default function DataSourcesSection() {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="section-title">Real Data Sources</h2>
        <p className="section-subtitle">We aggregate actual student experiences — not just vibes</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sources.map(({ icon, name, desc, color }) => (
          <div
            key={name}
            className={`border rounded-xl p-4 flex items-start gap-3 hover:shadow-sm transition-shadow ${color.split(' ').slice(1).join(' ')}`}
          >
            <div className={`flex-shrink-0 ${color.split(' ')[0]}`}>{icon}</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{name}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
