import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UploadSchedule from './components/UploadSchedule';
import CookScoreDisplayV2 from './components/CookScoreDisplayV2';
import type { ClassInput, AnalysisResultV2 } from './types';
import { analyzeScheduleV2 } from './services/api';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [result, setResult] = useState<AnalysisResultV2 | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setShowLanding(false);
  };

  const handleAnalyze = async (classes: ClassInput[]) => {
    setLoading(true);
    setError(null);

    try {
      const analysisResult = await analyzeScheduleV2(classes);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze schedule');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setShowLanding(false);
  };

  const handleBackToHome = () => {
    setResult(null);
    setError(null);
    setShowLanding(true);
  };

  // Show landing page
  if (showLanding) {
    return <LandingPage onStart={handleStart} />;
  }

  // Show main app
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <button
            onClick={handleBackToHome}
            className="text-gray-600 hover:text-cook-red transition-colors mb-4 text-sm"
          >
            ← Back to Home
          </button>
          <div className="flex items-center justify-center gap-4 mb-2">
            <img
              src="/logo.png"
              alt="USC Cook Scale Logo"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h1 className="text-4xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-cook-red to-cook-yellow bg-clip-text text-transparent">
                USC Cook Scale
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-700">
            How cooked is your schedule?
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="card text-center py-12">
            <div className="animate-bounce text-6xl mb-4">🔥</div>
            <p className="text-xl font-medium text-cook-red">
              Analyzing Your Schedule with AI...
            </p>
            <p className="text-gray-600 mt-2">
              • Verifying professors on RateMyProfessors<br />
              • Extracting real student reviews and quotes<br />
              • Searching Reddit discussions<br />
              • Calculating intelligent difficulty scores<br />
              • Generating personalized survival tips
            </p>
            <p className="text-sm text-gray-500 mt-4">
              This may take 15-30 seconds (we're doing a LOT of research!)
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="card bg-red-50 border-2 border-red-300">
            <div className="text-center">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Error Analyzing Schedule
              </h3>
              <p className="text-red-700">{error}</p>
              <button onClick={handleReset} className="btn-primary mt-4">
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {result ? (
              <CookScoreDisplayV2 result={result} onReset={handleReset} />
            ) : (
              <UploadSchedule onAnalyze={handleAnalyze} />
            )}
          </>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>
            Powered by Claude AI • Data from RateMyProfessors, Reddit & More
          </p>
          <p className="mt-1">
            Made for USC students 🎓
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
