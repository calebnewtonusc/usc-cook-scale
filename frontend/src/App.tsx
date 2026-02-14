import { useState } from 'react';
import { Loader2, XCircle, GraduationCap } from 'lucide-react';
import LandingPage from './components/LandingPage';
import UploadSchedule from './components/UploadSchedule';
import CookScoreDisplayV2 from './components/CookScoreDisplayV2';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import type { ClassInput, AnalysisResultV2 } from './types';
import { analyzeScheduleV2 } from './services/api';

type PageView = 'landing' | 'app' | 'privacy' | 'terms';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [result, setResult] = useState<AnalysisResultV2 | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setCurrentPage('app');
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
    setCurrentPage('app');
  };

  const handleBackToHome = () => {
    setResult(null);
    setError(null);
    setCurrentPage('landing');
  };

  // Show privacy policy
  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={handleBackToHome} />;
  }

  // Show terms of service
  if (currentPage === 'terms') {
    return <TermsOfService onBack={handleBackToHome} />;
  }

  // Show landing page
  if (currentPage === 'landing') {
    return (
      <LandingPage
        onStart={handleStart}
        onPrivacy={() => setCurrentPage('privacy')}
        onTerms={() => setCurrentPage('terms')}
      />
    );
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
              alt="USC Cooked Scale Logo"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h1 className="text-4xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-cook-red to-cook-yellow bg-clip-text text-transparent">
                USC Cooked Scale
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
            <div className="mb-4 flex justify-center">
              <Loader2 className="w-16 h-16 text-cook-red animate-spin" />
            </div>
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
              <div className="mb-4 flex justify-center">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
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
        <footer className="mt-12 text-center">
          <div className="flex flex-col items-center gap-6 mb-6">
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
          </div>
          <div className="text-sm text-gray-600">
            <p>
              Powered by Claude AI • Data from RateMyProfessors, Reddit & More
            </p>
            <p className="mt-1">
              Made for USC students <GraduationCap className="inline w-4 h-4" />
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-500 max-w-3xl mx-auto px-4">
            <p className="mb-2">
              <strong>Disclaimer:</strong> Independent student project. Not affiliated with USC, RateMyProfessors, or Reddit.
              All scores are subjective algorithmic estimates for educational purposes only. Data may be incomplete or outdated.
            </p>
            <div className="space-x-4">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-cook-red transition-colors">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-cook-red transition-colors">Terms of Service</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
