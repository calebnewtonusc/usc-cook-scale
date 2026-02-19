import { FileText, Search, BarChart3 } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <div className="card bg-white/80 backdrop-blur mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="mb-4"><FileText className="w-20 h-20 text-cook-red mx-auto" /></div>
          <h3 className="text-xl font-bold mb-2">1. Upload Schedule</h3>
          <p className="text-gray-600">
            Paste text, upload PDF/screenshot, or drop a calendar file.
            Our AI understands ANY format.
          </p>
        </div>
        <div className="text-center">
          <div className="mb-4"><Search className="w-20 h-20 text-cook-red mx-auto" /></div>
          <h3 className="text-xl font-bold mb-2">2. AI Research</h3>
          <p className="text-gray-600">
            We scan RateMyProfessors, Reddit, course reviews, and aggregate
            thousands of student experiences.
          </p>
        </div>
        <div className="text-center">
          <div className="mb-4"><BarChart3 className="w-20 h-20 text-cook-red mx-auto" /></div>
          <h3 className="text-xl font-bold mb-2">3. Get Insights</h3>
          <p className="text-gray-600">
            Receive your Cook Scale score, professor insights, workload
            warnings, and optimization tips.
          </p>
        </div>
      </div>
    </div>
  );
}
