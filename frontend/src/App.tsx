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

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif";

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
    <div style={{ minHeight: '100vh', padding: '24px 16px' }}>
      <div style={{ maxWidth: 768, margin: '0 auto' }}>

        {/* Header */}
        <header style={{ marginBottom: 32 }}>
          <button
            onClick={handleBackToHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: sfPro,
              fontSize: 14,
              fontWeight: 500,
              color: '#8e8e93',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              marginBottom: 20,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#990000'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#8e8e93'; }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            Back to Home
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src="/logo.png"
              alt="USC Cooked Scale Logo"
              style={{ width: 52, height: 52, flexShrink: 0 }}
            />
            <div>
              <h1
                style={{
                  fontFamily: sfPro,
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 5vw, 34px)',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.05,
                  color: '#1c1c1e',
                  backgroundImage: 'linear-gradient(135deg, #990000 0%, #CC0000 50%, #FFCC00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                USC Cooked Scale
              </h1>
              <p
                style={{
                  fontFamily: sfPro,
                  fontSize: 13,
                  color: '#8e8e93',
                  marginTop: 2,
                }}
              >
                AI-powered schedule difficulty analyzer
              </p>
            </div>
          </div>
        </header>

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Error State */}
        {error && !loading && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              border: '0.5px solid rgba(220,38,38,0.2)',
              boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
              padding: 24,
            }}
          >
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: 'rgba(220,38,38,0.08)',
                  borderRadius: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <AlertCircle style={{ width: 32, height: 32, color: '#dc2626' }} />
              </div>
              <h3
                style={{
                  fontFamily: sfPro,
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#1c1c1e',
                  letterSpacing: '-0.2px',
                  marginBottom: 8,
                }}
              >
                Analysis Failed
              </h3>
              <p
                style={{
                  fontFamily: sfPro,
                  fontSize: 14,
                  color: '#3a3a3c',
                  marginBottom: 6,
                  maxWidth: 400,
                  margin: '0 auto 6px',
                }}
              >
                {error}
              </p>
              <p
                style={{
                  fontFamily: sfPro,
                  fontSize: 12,
                  color: '#8e8e93',
                  marginBottom: 24,
                }}
              >
                This usually happens when the AI service is overloaded. Try again in a few seconds.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button
                  onClick={handleReset}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: '#990000',
                    color: '#ffffff',
                    fontFamily: sfPro,
                    fontWeight: 600,
                    fontSize: 14,
                    padding: '10px 20px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <RefreshCw style={{ width: 14, height: 14 }} />
                  Try Again
                </button>
                <button
                  onClick={handleBackToHome}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(60,60,67,0.08)',
                    color: '#1c1c1e',
                    fontFamily: sfPro,
                    fontWeight: 600,
                    fontSize: 14,
                    padding: '10px 20px',
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
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
        <footer style={{ marginTop: 48, paddingBottom: 24 }}>
          <div
            style={{
              borderTop: '0.5px solid rgba(60,60,67,0.12)',
              paddingTop: 32,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <a
                href="https://calebnewton.me"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 18px 10px 10px',
                  background: '#ffffff',
                  borderRadius: 980,
                  border: '0.5px solid rgba(60,60,67,0.15)',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                  textDecoration: 'none',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                  el.style.transform = 'translateY(-1px)';
                  el.style.borderColor = 'rgba(153,0,0,0.3)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = '0 1px 6px rgba(0,0,0,0.07)';
                  el.style.transform = 'translateY(0)';
                  el.style.borderColor = 'rgba(60,60,67,0.15)';
                }}
              >
                <img
                  src="/caleb-usc.jpg"
                  alt="Caleb Newton"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                    border: '1.5px solid rgba(153,0,0,0.25)',
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: sfPro,
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#8e8e93',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      lineHeight: 1,
                      marginBottom: 3,
                    }}
                  >
                    Built by
                  </p>
                  <p
                    style={{
                      fontFamily: sfPro,
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#1c1c1e',
                      lineHeight: 1,
                    }}
                  >
                    Caleb Newton
                  </p>
                </div>
              </a>

              <p
                style={{
                  fontFamily: sfPro,
                  fontSize: 12,
                  color: '#8e8e93',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  textAlign: 'center',
                }}
              >
                Powered by Claude AI &bull; Data from RateMyProfessors, Reddit &amp; more
                <GraduationCap style={{ width: 13, height: 13, color: '#990000' }} />
              </p>

              <p
                style={{
                  fontFamily: sfPro,
                  fontSize: 11,
                  color: 'rgba(60,60,67,0.35)',
                  textAlign: 'center',
                  maxWidth: 480,
                  lineHeight: 1.5,
                  padding: '0 16px',
                }}
              >
                Independent student project. Not affiliated with USC, RateMyProfessors, or Reddit.
                All scores are subjective algorithmic estimates for educational purposes only.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                  onClick={() => setCurrentPage('privacy')}
                  style={{
                    fontFamily: sfPro,
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#8e8e93',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#990000'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#8e8e93'; }}
                >
                  Privacy Policy
                </button>
                <span style={{ color: 'rgba(60,60,67,0.2)', fontSize: 12 }}>&bull;</span>
                <button
                  onClick={() => setCurrentPage('terms')}
                  style={{
                    fontFamily: sfPro,
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#8e8e93',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#990000'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#8e8e93'; }}
                >
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
