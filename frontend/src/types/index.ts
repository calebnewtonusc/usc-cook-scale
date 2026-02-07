export interface ClassInput {
  courseName: string;
  professor: string;
  units: number;
  type?: 'STEM' | 'HUMANITIES';
}

export interface ProfessorRating {
  quality: number;
  difficulty: number;
  wouldTakeAgain: number;
  numRatings: number;
}

export interface ClassScore {
  courseName: string;
  professor: string;
  units: number;
  type: 'STEM' | 'HUMANITIES';
  professorRating: ProfessorRating | null;
  score: number;
  explanation: string;
}

export interface AnalysisResult {
  overallScore: number;
  verbalLabel: string;
  classes: ClassScore[];
  totalUnits: number;
}
