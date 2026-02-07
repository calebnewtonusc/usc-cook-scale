import { useState } from 'react';
import UploadSchedule from './components/UploadSchedule';
import CookScoreDisplay from './components/CookScoreDisplay';
import type { ClassInput, AnalysisResult } from './types';
import { analyzeSchedule } from './services/api';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (classes: ClassInput[]) => {
    setLoading(true);
    setError(null);

    try {
      const analysisResult = await analyzeSchedule(classes);
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
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cook-red to-cook-yellow bg-clip-text text-transparent">
              USC Cook Scale
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Find out how "cooked" your semester schedule really is
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="card text-center py-12">
            <div className="animate-bounce text-6xl mb-4">🔥</div>
            <p className="text-xl font-medium text-cook-red">
              Analyzing your schedule...
            </p>
            <p className="text-gray-600 mt-2">
              Checking professor ratings and calculating your Cook Scale score
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
              <CookScoreDisplay result={result} onReset={handleReset} />
            ) : (
              <UploadSchedule onAnalyze={handleAnalyze} />
            )}
          </>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>
            Powered by Claude AI • Data from RateMyProfessors
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
