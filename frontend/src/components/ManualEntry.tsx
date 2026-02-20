import { useState } from 'react';
import { Flame, Loader2, Info, ChevronDown, ChevronUp } from 'lucide-react';
import type { ClassInput } from '../types';
import { parseScheduleText } from '../services/api';

interface ManualEntryProps {
  onSubmit: (classes: ClassInput[]) => void;
}

export default function ManualEntry({ onSubmit }: ManualEntryProps) {
  const [scheduleText, setScheduleText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showExample, setShowExample] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!scheduleText.trim()) {
      setError('Please enter your schedule');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedClasses = await parseScheduleText(scheduleText);

      if (parsedClasses.length === 0) {
        setError('Could not find any classes. Make sure to include course names and professor names.');
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
MATH 225 - Linear Algebra - John Smith - 4 units
WRIT 150 - Writing - Lisa Johnson - 4 units`;

  const exampleWeReg = `Monday 10:00-11:50 CSCI 104 Lec Prof: Mark Redekopp
Tuesday 2:00-3:20 MATH 225 Lec Prof: John Smith`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-900 mb-1.5">What to include:</p>
            <div className="grid sm:grid-cols-3 gap-1.5 text-xs text-amber-800">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                <strong>Course name</strong> (CSCI 104)
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                <strong>Professor name</strong>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                <strong>Units</strong> (optional)
              </div>
            </div>
            <p className="text-xs text-amber-700 mt-2 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-cook-red flex-shrink-0" />
              Paste from WeReg, email, or just type it — AI handles any format
            </p>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div>
        <label htmlFor="schedule-input" className="block text-sm font-bold text-gray-700 mb-2">
          Your schedule:
        </label>
        <textarea
          id="schedule-input"
          className="input-field min-h-[180px] font-mono text-sm resize-y"
          placeholder={`Example:\n${exampleText}`}
          value={scheduleText}
          onChange={(e) => setScheduleText(e.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-gray-400 mt-1.5">
          {scheduleText.length > 0 && (
            <span className="text-emerald-600 font-medium">
              {scheduleText.length} characters entered
            </span>
          )}
          {scheduleText.length === 0 && 'Any format works — the AI is smart'}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
          <span className="text-red-500 flex-shrink-0 mt-0.5">&#9888;</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary w-full text-base"
        disabled={loading || !scheduleText.trim()}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Parsing your schedule...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Flame className="w-5 h-5" />
            Calculate Cook Scale Score
          </span>
        )}
      </button>

      {/* Example format toggle */}
      <button
        type="button"
        onClick={() => setShowExample(!showExample)}
        className="w-full flex items-center justify-between text-sm text-gray-500 hover:text-gray-700 py-2 border-t border-gray-100 transition-colors"
      >
        <span className="font-medium">See example formats</span>
        {showExample ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {showExample && (
        <div className="space-y-3 animate-fade-in">
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500 border-b border-gray-200">
              Simple format
            </div>
            <pre className="p-3 text-xs text-gray-700 overflow-x-auto bg-white">
              {exampleText}
            </pre>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500 border-b border-gray-200">
              WeReg paste format
            </div>
            <pre className="p-3 text-xs text-gray-700 overflow-x-auto bg-white">
              {exampleWeReg}
            </pre>
          </div>
          <button
            type="button"
            onClick={() => {
              setScheduleText(exampleText);
              setShowExample(false);
            }}
            className="text-xs text-cook-red hover:text-cook-red-dark font-semibold transition-colors"
          >
            Use example schedule to test
          </button>
        </div>
      )}
    </form>
  );
}
