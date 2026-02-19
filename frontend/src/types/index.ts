export interface ClassInput {
  courseName: string;
  professor: string;
  units: number;
  type?: 'STEM' | 'HUMANITIES';
}

export interface ProfessorMatch {
  id: string;
  name: string;
  avgRating: number;
  avgDifficulty: number;
  wouldTakeAgainPercent: number;
  numRatings: number;
  confidence: number;
  reasoning: string;
}

export interface RMPReview {
  rating: number;
  difficulty: number;
  comment: string;
  course: string;
  date: string;
  tags: string[];
}

export interface RedditQuote {
  text: string;
  url: string;
  upvotes: number;
  author: string;
}

export interface ClassAnalysis {
  courseName: string;
  professor: string;
  units: number;
  professorMatch: ProfessorMatch | null;
  courseDifficulty: number;
  finalScore: number;
  rmpQuotes: RMPReview[];
  redditQuotes: RedditQuote[];
  survivalTips: string[];
  aiInsights: string;
  explanation: string;
  rmpLink: string;
  redditSearchLink: string;
  courseSearchLink: string;
  errors?: string[]; // NEW: Track what failed
}

export interface OverallAnalysis {
  score: number;
  verbalLabel: string;
  reasoning: string;
  insights: string[];
  warnings: string[];
  strengths: string[];
}

export interface AnalysisResultV2 {
  overall: OverallAnalysis;
  classes: ClassAnalysis[];
  totalUnits: number;
}
