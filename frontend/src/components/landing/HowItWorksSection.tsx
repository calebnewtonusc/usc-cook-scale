import { Upload, Search, Flame } from 'lucide-react';

const steps = [
  {
    icon: <Upload className="w-8 h-8" />,
    number: '01',
    title: 'Upload Your Schedule',
    description: 'Paste text, upload a PDF/screenshot, or drop a calendar file. Our AI reads any format from WeReg or your email.',
    color: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
  },
  {
    icon: <Search className="w-8 h-8" />,
    number: '02',
    title: 'AI Deep Research',
    description: 'We scan RateMyProfessors, scrub Reddit, and aggregate thousands of student experiences — all in real time.',
    color: 'bg-purple-100 text-purple-700',
    border: 'border-purple-200',
  },
  {
    icon: <Flame className="w-8 h-8" />,
    number: '03',
    title: 'Get Your Score',
    description: 'Receive your Cook Scale score, per-professor breakdown, workload warnings, survival tips, and source links.',
    color: 'bg-red-100 text-cook-red',
    border: 'border-red-200',
  },
];

export default function HowItWorksSection() {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Three steps to knowing exactly what you're in for</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`glass-card p-6 border ${step.border} hover:shadow-card-hover transition-all duration-200 relative`}
          >
            {/* Number */}
            <div className="absolute top-4 right-4 text-4xl font-black text-gray-100">
              {step.number}
            </div>

            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${step.color}`}>
              {step.icon}
            </div>

            <h3 className="text-lg font-black text-gray-900 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

            {/* Connector arrow for non-last items */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-300 text-xl">
                &#8250;
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
