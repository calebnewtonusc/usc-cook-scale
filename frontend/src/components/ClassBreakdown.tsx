import type { ClassScore } from '../types';

interface ClassBreakdownProps {
  classes: ClassScore[];
}

export default function ClassBreakdown({ classes }: ClassBreakdownProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Class Breakdown</h3>

      {classes.map((cls, index) => (
        <div key={index} className="card border-l-4 border-cook-red">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-lg font-bold text-gray-900">
                {cls.type === 'STEM' ? '⚙️' : '📚'} {cls.courseName}
              </h4>
              <p className="text-gray-600">Prof. {cls.professor}</p>
              <p className="text-sm text-gray-500">{cls.units} units</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-cook-red">
                {cls.score}
              </div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>

          {cls.professorRating && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-1">Professor Ratings:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">Quality:</span>
                  <span className="font-medium ml-1">
                    {cls.professorRating.quality.toFixed(1)}/5
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="font-medium ml-1">
                    {cls.professorRating.difficulty.toFixed(1)}/5
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Would Take Again:</span>
                  <span className="font-medium ml-1">
                    {cls.professorRating.wouldTakeAgain.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 text-xs text-gray-600 bg-yellow-50 p-2 rounded">
            <p className="font-medium mb-1">Score Calculation:</p>
            <p>{cls.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
