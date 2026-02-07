import { ClassScore, ProfessorRating, AnalysisResult } from '../types';

export function calculateClassScore(
  courseName: string,
  professor: string,
  units: number,
  type: 'STEM' | 'HUMANITIES',
  professorRating: ProfessorRating | null
): ClassScore {
  // Base difficulty score
  let baseScore = type === 'STEM' ? 60 : 30;
  let explanation = `${type === 'STEM' ? 'STEM' : 'Humanities'} class (${baseScore} base points)`;

  // Professor adjustment (if RMP data exists)
  if (professorRating && professorRating.numRatings > 0) {
    const { quality, difficulty, wouldTakeAgain } = professorRating;

    // Combined professor factor (0.5 to 2.0 multiplier)
    // Lower quality + higher difficulty + lower would-take-again = harder class
    const qualityFactor = (6 - quality) / 5;  // Invert quality (5 stars = easy, 1 star = hard)
    const difficultyFactor = difficulty / 5;   // Higher difficulty = harder
    const wtaFactor = (100 - wouldTakeAgain) / 100;  // Lower WTA = harder

    // Weighted average of factors
    const professorFactor = (
      qualityFactor * 0.4 +
      difficultyFactor * 0.4 +
      wtaFactor * 0.2
    ) * 2;  // Scale to 0.5-2.0 range

    baseScore *= professorFactor;
    explanation += ` × ${professorFactor.toFixed(2)} professor multiplier (Quality: ${quality.toFixed(1)}/5, Difficulty: ${difficulty.toFixed(1)}/5, WTA: ${wouldTakeAgain.toFixed(0)}%)`;
  } else {
    explanation += ' (no professor rating available)';
  }

  // Unit adjustment (normalize to 4-unit standard)
  const unitMultiplier = units / 4;
  const finalScore = baseScore * unitMultiplier;
  explanation += ` × ${unitMultiplier.toFixed(2)} unit multiplier = ${Math.round(finalScore)} points`;

  return {
    courseName,
    professor,
    units,
    type,
    professorRating,
    score: Math.round(finalScore),
    explanation
  };
}

export function calculateOverallScore(classScores: ClassScore[]): AnalysisResult {
  const totalUnits = classScores.reduce((sum, cls) => sum + cls.units, 0);
  const rawTotal = classScores.reduce((sum, cls) => sum + cls.score, 0);

  // Normalize to 0-100 scale based on typical semester load
  // Assuming typical hard semester (18 units of all STEM with tough profs) = 100
  // and typical easy semester (12 units of all humanities with easy profs) = 20
  const typicalHardSemester = 18 * 60 * 1.5; // 1620 points
  const normalizedScore = Math.min(100, Math.round((rawTotal / typicalHardSemester) * 100));

  const verbalLabel = getVerbalLabel(normalizedScore);

  return {
    overallScore: normalizedScore,
    verbalLabel,
    classes: classScores,
    totalUnits
  };
}

function getVerbalLabel(score: number): string {
  if (score <= 20) return 'Raw 🥩';
  if (score <= 35) return 'Lightly Toasted 🍞';
  if (score <= 50) return 'Medium 🍳';
  if (score <= 65) return 'Well Done 🥓';
  if (score <= 80) return 'Extra Crispy 🔥';
  return 'Absolutely Burnt 💀';
}
