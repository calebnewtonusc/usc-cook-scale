import { AlertCircle, RefreshCw } from 'lucide-react';

interface AppErrorStateProps {
  error: string;
  onRetry: () => void;
  onBack: () => void;
}

const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif";

export default function AppErrorState({ error, onRetry, onBack }: AppErrorStateProps) {
  return (
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
            onClick={onRetry}
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
            onClick={onBack}
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
  );
}
