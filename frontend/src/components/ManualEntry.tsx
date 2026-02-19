import { useState } from 'react';
import { Flame, Loader2, FileText } from 'lucide-react';
import type { ClassInput } from '../types';
import { parseScheduleText } from '../services/api';

interface ManualEntryProps {
  onSubmit: (classes: ClassInput[]) => void;
}

export default function ManualEntry({ onSubmit }: ManualEntryProps) {
  const [scheduleText, setScheduleText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scheduleText.trim()) {
      setError('Please enter your schedule');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use Claude AI to parse the schedule text
      const parsedClasses = await parseScheduleText(scheduleText);

      if (parsedClasses.length === 0) {
        setError('Could not find any classes in your text. Please make sure to include course names and professor names.');
        setLoading(false);
        return;
      }

      onSubmit(parsedClasses);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const exampleText = `CSCI 104 - Data Structures - Mark Redekopp - 4 units
MATH 225 - Linear Algebra - Smith - 4 units
WRIT 150 - Writing - Johnson - 4 units`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Instructions */}
      <div className="bg-yellow-50 border-l-4 border-cook-yellow p-4 rounded">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> What to include:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>Course names</strong> (e.g., CSCI 104, Math 225)</li>
          <li>• <strong>Professor names</strong> (e.g., Mark Redekopp)</li>
          <li>• <strong>Units</strong> (optional - we'll estimate if missing)</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3 flex items-center gap-1">
          Just paste your schedule or type it naturally - our AI will figure it out! <Flame className="inline w-4 h-4 text-cook-red" />
        </p>
      </div>

      {/* Text Area */}
      <div>
        <label htmlFor="schedule-input" className="block text-sm font-medium mb-2 text-gray-700">
          Paste or type your schedule:
        </label>
        <textarea
          id="schedule-input"
          className="input-field min-h-[200px] font-mono text-sm"
          placeholder={exampleText}
          value={scheduleText}
          onChange={(e) => setScheduleText(e.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          Any format works! Copy from WeReg, your email, or just type it out.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            AI is reading your schedule...
          </span>
        ) : (
          'Calculate Cook Scale'
        )}
      </button>

      {/* Example */}
      <details className="text-sm text-gray-600">
        <summary className="cursor-pointer font-medium hover:text-gray-900">
          See example format
        </summary>
        <pre className="mt-2 p-3 bg-gray-50 rounded border text-xs overflow-x-auto">
{exampleText}

Or just paste from WeReg:
Monday 10:00-11:50 CSCI 104 Lec Prof: Mark Redekopp
Tuesday 2:00-3:20 MATH 225 Lec Prof: John Smith
        </pre>
      </details>
    </form>
  );
}
