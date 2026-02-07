import type { ClassScore } from '../types';

interface ClassBreakdownProps {
  classes: ClassScore[];
}

export default function ClassBreakdown({ classes }: ClassBreakdownProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        📚 Class-by-Class Analysis
      </h3>

      {classes.map((cls, index) => (
        <div key={index} className="card border-l-4 border-cook-red shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-900 mb-1">
                {cls.type === 'STEM' ? '⚙️' : '📚'} {cls.courseName}
              </h4>
              <p className="text-lg text-gray-700">
                👨‍🏫 Prof. {cls.professor}
              </p>
              <p className="text-sm text-gray-500">{cls.units} units • {cls.type}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black text-cook-red">
                {cls.score}
              </div>
              <div className="text-sm text-gray-600 font-medium">Cook Points</div>
            </div>
          </div>

          {/* Professor Ratings - if available */}
          {cls.professorRating && cls.professorRating.numRatings > 0 ? (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-base font-bold text-gray-800 mb-3">
                ⭐ Professor Ratings from RateMyProfessors
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {cls.professorRating.quality.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">Quality /5</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {cls.professorRating.difficulty.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">Difficulty /5</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {cls.professorRating.wouldTakeAgain.toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-600">Would Retake</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {cls.professorRating.numRatings}
                  </div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic">
                Based on {cls.professorRating.numRatings} real student reviews from RateMyProfessors
              </p>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                ℹ️ No RateMyProfessors data available
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Score calculated from course type ({cls.type}) and unit count only
              </p>
            </div>
          )}

          {/* Score Explanation */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
            <p className="font-bold text-gray-800 mb-2">🧮 How This Score Was Calculated:</p>
            <p className="text-sm text-gray-700 leading-relaxed">{cls.explanation}</p>
          </div>

          {/* Research Links */}
          {'rmpLink' in cls && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <p className="font-bold text-gray-800 mb-3">
                🔗 Research This Professor & Class
              </p>
              <div className="space-y-2">
                <a
                  href={cls.rmpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-white rounded hover:bg-blue-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⭐</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">
                        RateMyProfessors Reviews
                      </div>
                      <div className="text-xs text-gray-600">
                        Read detailed student reviews and ratings
                      </div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </a>

                <a
                  href={cls.redditSearchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-white rounded hover:bg-orange-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">
                        Reddit r/USC Discussions
                      </div>
                      <div className="text-xs text-gray-600">
                        See what USC students are saying on Reddit
                      </div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </a>

                <a
                  href={cls.courseSearchLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 bg-white rounded hover:bg-purple-50 transition-colors border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🔍</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">
                        Google Search: Reviews & Experiences
                      </div>
                      <div className="text-xs text-gray-600">
                        Find course reviews, syllabi, and student experiences
                      </div>
                    </div>
                    <span className="text-gray-400">→</span>
                  </div>
                </a>
              </div>

              <p className="text-xs text-gray-600 mt-3 italic">
                💡 Tip: Read multiple sources to get a complete picture. Different students have different experiences!
              </p>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="font-bold text-gray-800 mb-2">💡 Survival Tips:</p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              {cls.score > 65 && (
                <>
                  <li>This is a challenging class—start assignments early</li>
                  <li>Form study groups with classmates</li>
                  <li>Attend office hours regularly</li>
                  <li>Budget extra time for this class each week</li>
                </>
              )}
              {cls.score > 50 && cls.score <= 65 && (
                <>
                  <li>Moderate difficulty—stay on top of coursework</li>
                  <li>Review concepts regularly, don't cram</li>
                  <li>Use office hours when confused</li>
                </>
              )}
              {cls.score <= 50 && (
                <>
                  <li>Manageable workload—maintain consistent effort</li>
                  <li>Good opportunity to focus on harder classes</li>
                  <li>Still attend lectures and complete assignments</li>
                </>
              )}
              {cls.type === 'STEM' && (
                <li>STEM class: Focus on problem-solving and practice sets</li>
              )}
              {cls.professorRating && cls.professorRating.difficulty > 4 && (
                <li>⚠️ Professor rated very difficult—prepare accordingly!</li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
