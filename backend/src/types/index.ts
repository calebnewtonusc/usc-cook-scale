export interface ClassInput {
  courseName: string;
  professor: string;
  units: number;
  type?: 'STEM' | 'HUMANITIES';
}

export interface ProfessorRating {
  quality: number;          // 0-5
  difficulty: number;       // 0-5
  wouldTakeAgain: number;   // 0-100
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

export interface AnalyzeScheduleRequest {
  classes: ClassInput[];
}
