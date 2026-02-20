import { useState } from 'react';
import { AlertCircle, GraduationCap, ArrowLeft, RefreshCw } from 'lucide-react';
import LandingPage from './components/LandingPage';
import UploadSchedule from './components/UploadSchedule';
import CookScoreDisplayV2 from './components/CookScoreDisplayV2';
import LoadingState from './components/LoadingState';
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

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={handleBackToHome} />;
  }

  if (currentPage === 'terms') {
    return <TermsOfService onBack={handleBackToHome} />;
  }

  if (currentPage === 'landing') {
    return (
      <LandingPage
        onStart={handleStart}
        onPrivacy={() => setCurrentPage('privacy')}
        onTerms={() => setCurrentPage('terms')}
      />
    );
  }

  return (
    <div className="min-h-screen py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-1.5 text-gray-500 hover:text-cook-red transition-colors mb-6 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="USC Cooked Scale Logo"
              className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
            />
            <div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight">
                <span className="text-usc-gradient">
                  USC Cooked Scale
                </span>
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                AI-powered schedule difficulty analyzer
              </p>
            </div>
          </div>
        </header>

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {error && !loading && (
          <div className="card border-2 border-red-200 bg-red-50">
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-9 h-9 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-red-900 mb-2">
                Analysis Failed
              </h3>
              <p className="text-red-700 mb-2 text-sm max-w-md mx-auto">{error}</p>
              <p className="text-xs text-red-500 mb-6">
                This usually happens when the AI service is overloaded. Try again in a few seconds.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={handleReset} className="btn-primary flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
                <button onClick={handleBackToHome} className="btn-outline">
                  Back to Home
                </button>
              </div>
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
        <footer className="mt-12 pb-6">
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col items-center gap-4">
              <a
                href="https://calebnewton.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-cook-red/40 transition-all duration-200"
              >
                <img
                  src="/caleb-usc.jpg"
                  alt="Caleb Newton"
                  className="w-10 h-10 rounded-full object-cover border-2 border-cook-red/30"
                  style={{ objectPosition: 'center 30%' }}
                />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold leading-none mb-0.5">Built by</p>
                  <p className="text-sm text-gray-900 font-bold leading-none">Caleb Newton</p>
                </div>
              </a>

              <div className="text-center text-xs text-gray-500 space-y-1">
                <p>Powered by Claude AI &bull; Data from RateMyProfessors, Reddit &amp; More</p>
                <p className="flex items-center gap-1 justify-center">
                  Made for USC students
                  <GraduationCap className="inline w-3.5 h-3.5 text-cook-red" />
                </p>
              </div>

              <p className="text-[11px] text-gray-400 text-center max-w-2xl leading-relaxed px-4">
                Independent student project. Not affiliated with USC, RateMyProfessors, or Reddit.
                All scores are subjective algorithmic estimates for educational purposes only.
              </p>

              <div className="flex gap-4 text-xs text-gray-400">
                <button onClick={() => setCurrentPage('privacy')} className="hover:text-cook-red transition-colors">
                  Privacy Policy
                </button>
                <span>&bull;</span>
                <button onClick={() => setCurrentPage('terms')} className="hover:text-cook-red transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
