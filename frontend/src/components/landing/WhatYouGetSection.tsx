import { Flame, Users, BarChart3, Lightbulb, Link, Circle, Skull } from 'lucide-react';

export default function WhatYouGetSection() {
  return (
    <div className="card bg-white/80 backdrop-blur mb-16">
      <h2 className="text-3xl font-bold text-center mb-6">What You'll Get</h2>
      <div className="space-y-4">
        <div className="border-l-4 border-cook-red p-4 bg-red-50">
          <div className="flex items-start gap-3">
            <Flame className="w-8 h-8 text-cook-red flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Overall Cook Scale Score</h3>
              <p className="text-sm text-gray-700">
                Your semester difficulty rated 0-100 with verbal label
                (Raw <Circle className="inline w-4 h-4" /> → Absolutely Burnt <Skull className="inline w-4 h-4" />)
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-yellow-500 p-4 bg-yellow-50">
          <div className="flex items-start gap-3">
            <Users className="w-8 h-8 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Professor Deep Dive</h3>
              <p className="text-sm text-gray-700">
                Real ratings, actual student quotes, Reddit threads, and
                direct links to all sources
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 p-4 bg-blue-50">
          <div className="flex items-start gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Per-Class Breakdown</h3>
              <p className="text-sm text-gray-700">
                Individual difficulty scores with explanations, workload estimates,
                and survival tips
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-green-500 p-4 bg-green-50">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Smart Recommendations</h3>
              <p className="text-sm text-gray-700">
                Schedule optimization tips, workload balance advice, and time
                management strategies
              </p>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-purple-500 p-4 bg-purple-50">
          <div className="flex items-start gap-3">
            <Link className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold mb-1">Source Links</h3>
              <p className="text-sm text-gray-700">
                Direct links to RateMyProfessors pages, Reddit discussions,
                reviews, and all data sources
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
