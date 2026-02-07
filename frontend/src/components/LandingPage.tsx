export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <img
              src="/logo.png"
              alt="USC Cooked Scale Logo"
              className="w-32 h-32 md:w-48 md:h-48 mx-auto animate-pulse"
            />
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-cook-red to-cook-yellow bg-clip-text text-transparent">
              USC Cooked Scale
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-bold mb-4">
            How Cooked Is Your Schedule?
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI-powered schedule analyzer that combines <strong>real data</strong> from RateMyProfessors,
            Reddit, course reviews, and more to give you a comprehensive difficulty score.
          </p>

          <button
            onClick={onStart}
            className="btn-primary text-xl px-12 py-4 shadow-2xl hover:shadow-cook-red/50 transform hover:scale-105 transition-all"
          >
            Analyze My Schedule 🔥
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Free • No signup required • Takes 10 seconds
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="card text-center bg-white/80 backdrop-blur">
            <div className="text-4xl font-black text-cook-red mb-2">5+</div>
            <div className="text-sm text-gray-600">Data Sources</div>
            <div className="text-xs text-gray-500 mt-1">RMP, Reddit, Reviews</div>
          </div>
          <div className="card text-center bg-white/80 backdrop-blur">
            <div className="text-4xl font-black text-cook-red mb-2">100%</div>
            <div className="text-sm text-gray-600">AI-Powered</div>
            <div className="text-xs text-gray-500 mt-1">Claude Sonnet 4.5</div>
          </div>
          <div className="card text-center bg-white/80 backdrop-blur">
            <div className="text-4xl font-black text-cook-red mb-2">98%</div>
            <div className="text-sm text-gray-600">Test Pass Rate</div>
            <div className="text-xs text-gray-500 mt-1">46 automated tests</div>
          </div>
          <div className="card text-center bg-white/80 backdrop-blur">
            <div className="text-4xl font-black text-cook-red mb-2">&lt;2s</div>
            <div className="text-sm text-gray-600">Analysis Speed</div>
            <div className="text-xs text-gray-500 mt-1">Instant results</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="card bg-white/80 backdrop-blur mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">1. Upload Schedule</h3>
              <p className="text-gray-600">
                Paste text, upload PDF/screenshot, or drop a calendar file.
                Our AI understands ANY format.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">2. AI Research</h3>
              <p className="text-gray-600">
                We scan RateMyProfessors, Reddit, course reviews, and aggregate
                thousands of student experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">3. Get Insights</h3>
              <p className="text-gray-600">
                Receive your Cook Scale score, professor insights, workload
                warnings, and optimization tips.
              </p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="card bg-gradient-to-r from-cook-red/10 to-cook-yellow/10 mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Real Data Sources</h2>
          <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
            We don't just guess—we aggregate <strong>actual student experiences</strong> from
            multiple verified sources to give you the most accurate picture.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⭐</span>
                <span className="font-bold">RateMyProfessors</span>
              </div>
              <p className="text-sm text-gray-600">
                Professor ratings, difficulty scores, and "would take again" percentages
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💬</span>
                <span className="font-bold">Reddit r/USC</span>
              </div>
              <p className="text-sm text-gray-600">
                Real student discussions, class experiences, and professor insights
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📚</span>
                <span className="font-bold">Course Reviews</span>
              </div>
              <p className="text-sm text-gray-600">
                Semester-specific feedback and workload reports from actual students
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎓</span>
                <span className="font-bold">USC Forums</span>
              </div>
              <p className="text-sm text-gray-600">
                Student forum discussions, tips, and warnings about specific classes
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📈</span>
                <span className="font-bold">Grade Distributions</span>
              </div>
              <p className="text-sm text-gray-600">
                Historical grade data and pass/fail rates when available
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🤖</span>
                <span className="font-bold">AI Analysis</span>
              </div>
              <p className="text-sm text-gray-600">
                Claude Sonnet 4.5 aggregates and analyzes all data for insights
              </p>
            </div>
          </div>
        </div>

        {/* Example Results Preview */}
        <div className="card bg-white/80 backdrop-blur mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">What You'll Get</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-cook-red p-4 bg-red-50">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔥</span>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">Overall Cook Scale Score</h3>
                  <p className="text-sm text-gray-700">
                    Your semester difficulty rated 0-100 with verbal label
                    (Raw 🥩 → Absolutely Burnt 💀)
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 p-4 bg-yellow-50">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👨‍🏫</span>
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
                <span className="text-2xl">📊</span>
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
                <span className="text-2xl">💡</span>
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
                <span className="text-2xl">🔗</span>
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

        {/* Cooked Scale Legend */}
        <div className="card bg-gradient-to-r from-blue-50 to-red-50 mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">The Cooked Scale</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
              <div className="text-3xl mb-2">🥩</div>
              <div className="font-bold text-lg mb-1">0-20: Raw</div>
              <p className="text-sm">Easy semester, manageable workload</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
              <div className="text-3xl mb-2">🍞</div>
              <div className="font-bold text-lg mb-1">21-35: Lightly Toasted</div>
              <p className="text-sm">Some challenges but doable</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
              <div className="text-3xl mb-2">🍳</div>
              <div className="font-bold text-lg mb-1">36-50: Medium</div>
              <p className="text-sm">Moderate difficulty, balanced</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-300">
              <div className="text-3xl mb-2">🥓</div>
              <div className="font-bold text-lg mb-1">51-65: Well Done</div>
              <p className="text-sm">Challenging semester ahead</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300">
              <div className="text-3xl mb-2">🔥</div>
              <div className="font-bold text-lg mb-1">66-80: Extra Crispy</div>
              <p className="text-sm">Very difficult, plan accordingly</p>
            </div>
            <div className="bg-red-200 p-4 rounded-lg border-2 border-red-500">
              <div className="text-3xl mb-2">💀</div>
              <div className="font-bold text-lg mb-1">81-100: Absolutely Burnt</div>
              <p className="text-sm">Extremely hard—good luck!</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-12">
          <button
            onClick={onStart}
            className="btn-primary text-2xl px-16 py-6 shadow-2xl hover:shadow-cook-red/50 transform hover:scale-105 transition-all"
          >
            Get Started Now 🚀
          </button>
          <p className="text-gray-600 mt-4">
            Join hundreds of USC students making smarter schedule decisions
          </p>
        </div>

        {/* Built By Footer */}
        <div className="flex flex-col items-center gap-6 pt-8 border-t border-gray-200">
          <a
            href="https://calebnewton.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-8 py-6 bg-white/80 backdrop-blur-sm rounded-full border-2 border-cook-red/30 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:border-cook-red/60 transition-all duration-300 no-underline"
          >
            <img
              src="/caleb-usc.jpg"
              alt="Caleb Newton at USC"
              className="w-12 h-12 rounded-full object-cover shadow-lg"
              style={{
                objectPosition: 'center 30%',
                border: '2px solid #DC2626'
              }}
            />
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                Built by
              </span>
              <span className="text-base text-gray-900 font-bold">
                Caleb Newton
              </span>
            </div>
          </a>
          <p className="text-sm text-gray-600">
            Made for USC students 🎓
          </p>
        </div>
      </div>
    </div>
  );
}
