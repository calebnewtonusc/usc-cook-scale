import { Star, MessageCircle, BookOpen, GraduationCap, TrendingUp, Bot } from 'lucide-react';

export default function DataSourcesSection() {
  return (
    <div className="card bg-gradient-to-r from-cook-red/10 to-cook-yellow/10 mb-16">
      <h2 className="text-3xl font-bold text-center mb-6">Real Data Sources</h2>
      <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
        We don't just guess—we aggregate <strong>actual student experiences</strong> from
        multiple verified sources to give you the most accurate picture.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-8 h-8 text-cook-red flex-shrink-0" fill="currentColor" />
            <span className="font-bold">RateMyProfessors</span>
          </div>
          <p className="text-sm text-gray-600">
            Professor ratings, difficulty scores, and "would take again" percentages
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-8 h-8 text-cook-red flex-shrink-0" />
            <span className="font-bold">Reddit r/USC</span>
          </div>
          <p className="text-sm text-gray-600">
            Real student discussions, class experiences, and professor insights
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-cook-red flex-shrink-0" />
            <span className="font-bold">Course Reviews</span>
          </div>
          <p className="text-sm text-gray-600">
            Semester-specific feedback and workload reports from actual students
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-cook-red flex-shrink-0" />
            <span className="font-bold">USC Forums</span>
          </div>
          <p className="text-sm text-gray-600">
            Student forum discussions, tips, and warnings about specific classes
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-cook-red flex-shrink-0" />
            <span className="font-bold">Grade Distributions</span>
          </div>
          <p className="text-sm text-gray-600">
            Historical grade data and pass/fail rates when available
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-2">
            <Bot className="w-8 h-8 text-cook-red flex-shrink-0" />
            <span className="font-bold">AI Analysis</span>
          </div>
          <p className="text-sm text-gray-600">
            Claude Sonnet 4.5 aggregates and analyzes all data for insights
          </p>
        </div>
      </div>
    </div>
  );
}
