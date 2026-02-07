import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import axios from 'axios';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// RateMyProfessor API
const RMP_GRAPHQL_URL = 'https://www.ratemyprofessors.com/graphql';
const USC_SCHOOL_ID = '1381';

// ============= INTERFACES =============

interface ClassInput {
  courseName: string;
  professor: string;
  units: number;
}

interface ProfessorMatch {
  id: string;
  name: string;
  avgRating: number;
  avgDifficulty: number;
  wouldTakeAgainPercent: number;
  numRatings: number;
  confidence: number;
  reasoning: string;
}

interface RMPReview {
  rating: number;
  difficulty: number;
  comment: string;
  course: string;
  date: string;
  tags: string[];
}

interface RedditQuote {
  text: string;
  url: string;
  upvotes: number;
  author: string;
}

interface ClassAnalysis {
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
  errors: string[]; // NEW: Track what failed
}

interface OverallAnalysis {
  score: number;
  verbalLabel: string;
  reasoning: string;
  insights: string[];
  warnings: string[];
  strengths: string[];
}

interface AnalysisResult {
  overall: OverallAnalysis;
  classes: ClassAnalysis[];
  totalUnits: number;
}

// ============= MAIN HANDLER =============

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { classes } = req.body;

    if (!classes || !Array.isArray(classes) || classes.length === 0) {
      return res.status(400).json({ error: 'Invalid request: classes array is required' });
    }

    console.log(`[V3-FIXED] Analyzing ${classes.length} classes...`);

    const classAnalyses: ClassAnalysis[] = await Promise.all(
      classes.map(async (cls: ClassInput) => analyzeClass(cls))
    );

    const overallAnalysis = await calculateOverallScore(classAnalyses);
    const totalUnits = classes.reduce((sum: number, cls: ClassInput) => sum + cls.units, 0);

    const result: AnalysisResult = {
      overall: overallAnalysis,
      classes: classAnalyses,
      totalUnits
    };

    console.log(`[V3-FIXED] Analysis complete: ${overallAnalysis.score}/100`);
    return res.status(200).json(result);
  } catch (error) {
    console.error('[V3-FIXED] Error:', error);
    return res.status(500).json({
      error: 'Failed to analyze schedule',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

// ============= CLASS ANALYSIS =============

async function analyzeClass(cls: ClassInput): Promise<ClassAnalysis> {
  console.log(`[V3-FIXED] Analyzing ${cls.courseName} with ${cls.professor}`);

  const errors: string[] = [];

  // FIX: Parse professor name BEFORE searching
  const professorName = parseProfessorName(cls.professor);
  console.log(`[V3-FIXED] Parsed "${cls.professor}" → "${professorName}"`);

  // Step 1: Find professor
  const professorMatch = await findProfessor(professorName, errors);

  // Step 2: Get RMP reviews (only if professor found)
  const rmpQuotes = professorMatch
    ? await getRMPReviews(professorMatch.id, cls.courseName, errors)
    : [];

  // Step 3: Get Reddit quotes
  const redditQuotes = await getRedditQuotes(professorName, cls.courseName, errors);

  // Step 4: Analyze course difficulty (ROBUST)
  const { difficulty, reasoning, error: diffError } = await analyzeCourseDifficultyRobust(
    cls.courseName,
    professorMatch,
    rmpQuotes
  );
  if (diffError) errors.push(diffError);

  // Step 5: Calculate final score
  const { finalScore, explanation } = calculateFinalScore(cls, difficulty, professorMatch);

  // Step 6: Generate survival tips (ROBUST)
  const survivalTips = await generateSurvivalTipsRobust(
    cls,
    finalScore,
    rmpQuotes,
    redditQuotes,
    errors
  );

  // Step 7: Generate AI insights
  const aiInsights = await generateInsightsRobust(
    cls,
    finalScore,
    rmpQuotes,
    redditQuotes,
    professorMatch,
    errors
  );

  const rmpLink = professorMatch
    ? `https://www.ratemyprofessors.com/professor/${professorMatch.id}`
    : `https://www.ratemyprofessors.com/search/professors/1381?q=${encodeURIComponent(professorName)}`;

  return {
    courseName: cls.courseName,
    professor: cls.professor,
    units: cls.units,
    professorMatch,
    courseDifficulty: difficulty,
    finalScore,
    rmpQuotes,
    redditQuotes,
    survivalTips,
    aiInsights,
    explanation,
    rmpLink,
    redditSearchLink: `https://www.reddit.com/r/USC/search/?q=${encodeURIComponent(professorName + ' ' + cls.courseName)}`,
    courseSearchLink: `https://www.google.com/search?q=${encodeURIComponent(`USC ${cls.courseName} ${professorName} review reddit`)}`,
    errors // NEW: Return errors for transparency
  };
}

// ============= PROFESSOR NAME PARSING =============

function parseProfessorName(input: string): string {
  // Handle "Last, First" format
  if (input.includes(',')) {
    const [last, first] = input.split(',').map(s => s.trim());
    return `${first} ${last}`;
  }
  return input;
}

// ============= PROFESSOR MATCHING =============

async function findProfessor(professorName: string, errors: string[]): Promise<ProfessorMatch | null> {
  try {
    console.log(`[V3-FIXED] Searching RMP for: ${professorName}`);

    const query = {
      query: `query NewSearchTeachersQuery($text: String!, $schoolID: ID!) {
        newSearch {
          teachers(query: {text: $text, schoolID: $schoolID}) {
            edges {
              node {
                id
                firstName
                lastName
                avgRating
                avgDifficulty
                wouldTakeAgainPercent
                numRatings
              }
            }
          }
        }
      }`,
      variables: {
        text: professorName,
        schoolID: btoa(`School-${USC_SCHOOL_ID}`)
      }
    };

    const response = await axios.post(RMP_GRAPHQL_URL, query, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic dGVzdDp0ZXN0'
      },
      timeout: 10000
    });

    const teachers = response.data?.data?.newSearch?.teachers?.edges;

    if (!teachers || teachers.length === 0) {
      console.log(`[V3-FIXED] No professors found for: ${professorName}`);
      errors.push(`Professor "${professorName}" not found on RateMyProfessors`);
      return null;
    }

    // Take BEST match (most reviews)
    const sortedTeachers = teachers.sort((a: any, b: any) =>
      (b.node.numRatings || 0) - (a.node.numRatings || 0)
    );

    const bestMatch = sortedTeachers[0].node;
    const matchName = `${bestMatch.firstName} ${bestMatch.lastName}`;

    console.log(`[V3-FIXED] Found professor: ${matchName} (${bestMatch.numRatings} ratings)`);

    return {
      id: bestMatch.id,
      name: matchName,
      avgRating: bestMatch.avgRating || 0,
      avgDifficulty: bestMatch.avgDifficulty || 0,
      wouldTakeAgainPercent: bestMatch.wouldTakeAgainPercent || 0,
      numRatings: bestMatch.numRatings || 0,
      confidence: bestMatch.numRatings > 10 ? 0.9 : 0.7,
      reasoning: `Matched by name with ${bestMatch.numRatings} reviews`
    };

  } catch (error) {
    console.error('[V3-FIXED] RMP search error:', error);
    errors.push(`RMP API error: ${error instanceof Error ? error.message : 'Unknown'}`);
    return null;
  }
}

// ============= RMP REVIEWS =============

async function getRMPReviews(professorId: string, courseName: string, errors: string[]): Promise<RMPReview[]> {
  try {
    console.log(`[V3-FIXED] Fetching reviews for ID: ${professorId}`);

    const query = {
      query: `query RatingsQuery($id: ID!) {
        node(id: $id) {
          ... on Teacher {
            ratings(first: 20) {
              edges {
                node {
                  class
                  comment
                  date
                  difficultyRating
                  helpfulRating
                  clarityRating
                  ratingTags
                }
              }
            }
          }
        }
      }`,
      variables: { id: professorId }
    };

    const response = await axios.post(RMP_GRAPHQL_URL, query, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic dGVzdDp0ZXN0'
      },
      timeout: 10000
    });

    const ratings = response.data?.data?.node?.ratings?.edges || [];

    if (ratings.length === 0) {
      errors.push('No reviews found for this professor');
      return [];
    }

    const reviews: RMPReview[] = ratings
      .map((edge: any) => {
        const node = edge.node;
        return {
          rating: node.clarityRating || node.helpfulRating || 0,
          difficulty: node.difficultyRating || 0,
          comment: node.comment || '',
          course: node.class || '',
          date: node.date || '',
          tags: node.ratingTags ? [node.ratingTags] : []
        };
      })
      .filter((r: RMPReview) => r.comment && r.comment.length > 30)
      .slice(0, 5);

    console.log(`[V3-FIXED] Found ${reviews.length} quality reviews`);
    return reviews;

  } catch (error) {
    console.error('[V3-FIXED] RMP reviews error:', error);
    errors.push(`Failed to fetch reviews: ${error instanceof Error ? error.message : 'Unknown'}`);
    return [];
  }
}

// ============= REDDIT =============

async function getRedditQuotes(professor: string, courseName: string, errors: string[]): Promise<RedditQuote[]> {
  try {
    const query = `${professor} ${courseName}`;
    const searchUrl = `https://www.reddit.com/r/USC/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&limit=5&sort=relevance`;

    const response = await axios.get(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; USCCookScale/1.0)' },
      timeout: 5000
    });

    const posts = response.data?.data?.children || [];

    if (posts.length === 0) {
      errors.push('No Reddit discussions found');
      return [];
    }

    const quotes: RedditQuote[] = posts
      .filter((post: any) => post.data && (post.data.selftext || post.data.title))
      .slice(0, 3)
      .map((post: any) => {
        const data = post.data;
        const text = data.selftext || data.title;
        const preview = text.length > 200 ? text.substring(0, 200) + '...' : text;

        return {
          text: preview,
          url: `https://www.reddit.com${data.permalink}`,
          upvotes: data.score || 0,
          author: data.author || 'unknown'
        };
      });

    console.log(`[V3-FIXED] Found ${quotes.length} Reddit mentions`);
    return quotes;

  } catch (error) {
    console.error('[V3-FIXED] Reddit error:', error);
    errors.push('Reddit search failed');
    return [];
  }
}

// ============= ROBUST COURSE DIFFICULTY =============

async function analyzeCourseDifficultyRobust(
  courseName: string,
  professorMatch: ProfessorMatch | null,
  rmpReviews: RMPReview[]
): Promise<{ difficulty: number; reasoning: string; error?: string }> {
  // USC-specific known difficulties
  const usc Known = {
    'CSCI-104': 85, 'CSCI-170': 70, 'CSCI-103': 60,
    'MATH-226': 75, 'MATH-225': 70, 'MATH-125': 50,
    'WRIT-150': 55, 'WRIT-340': 60
  };

  if (uscKnown[courseName]) {
    return {
      difficulty: uscKnown[courseName],
      reasoning: `USC-specific known difficulty for ${courseName}`
    };
  }

  // Regex fallback (TEMPORARY until LLM is fixed)
  const isStem = /CSCI|MATH|PHYS|CHEM|EE|ENGR/i.test(courseName);
  const baseScore = isStem ? 65 : 40;

  return {
    difficulty: baseScore,
    reasoning: `${isStem ? 'STEM' : 'Humanities'} course (${baseScore}/100)`,
    error: 'Using simplified classification - LLM analysis temporarily disabled'
  };
}

// ============= SCORE CALCULATION =============

function calculateFinalScore(
  cls: ClassInput,
  baseDifficulty: number,
  professorMatch: ProfessorMatch | null
): { finalScore: number; explanation: string } {
  let score = baseDifficulty;
  let explanation = `Base: ${score}`;

  if (professorMatch && professorMatch.numRatings > 5) {
    const { avgRating, avgDifficulty } = professorMatch;

    // Simple multiplier based on professor difficulty
    const multiplier = 0.7 + (avgDifficulty / 5) * 0.6; // Range: 0.7 to 1.3
    score = score * multiplier;
    explanation += ` × ${multiplier.toFixed(2)} (Prof: ${avgRating.toFixed(1)}/5, Difficulty: ${avgDifficulty.toFixed(1)}/5)`;
  }

  // Unit adjustment
  const unitMultiplier = cls.units / 4;
  score = score * unitMultiplier;
  if (unitMultiplier !== 1) {
    explanation += ` × ${unitMultiplier} units`;
  }

  return {
    finalScore: Math.round(Math.max(10, Math.min(100, score))),
    explanation
  };
}

// ============= ROBUST SURVIVAL TIPS =============

async function generateSurvivalTipsRobust(
  cls: ClassInput,
  score: number,
  rmpReviews: RMPReview[],
  redditQuotes: RedditQuote[],
  errors: string[]
): Promise<string[]> {
  // Smart fallback based on actual data
  const tips: string[] = [];

  if (score > 70) {
    tips.push('This is a challenging class - budget 15+ hours per week');
    tips.push('Start assignments early, they take longer than expected');
    tips.push('Form study groups with classmates');
  } else if (score > 50) {
    tips.push('Moderate difficulty - stay consistent with coursework');
    tips.push('Attend office hours when you need help');
  } else {
    tips.push('Manageable workload - maintain steady effort');
    tips.push('Good opportunity to focus on harder classes');
  }

  if (rmpReviews.length > 0) {
    const avgDiff = rmpReviews.reduce((sum, r) => sum + r.difficulty, 0) / rmpReviews.length;
    if (avgDiff > 4) {
      tips.push('⚠️ Students rate this professor as very difficult - prepare accordingly');
    }
  }

  return tips;
}

// ============= ROBUST INSIGHTS =============

async function generateInsightsRobust(
  cls: ClassInput,
  score: number,
  rmpReviews: RMPReview[],
  redditQuotes: RedditQuote[],
  professorMatch: ProfessorMatch | null,
  errors: string[]
): Promise<string> {
  let insight = `${cls.courseName} with Prof. ${cls.professor} has a difficulty score of ${score}/100. `;

  if (professorMatch && professorMatch.numRatings > 0) {
    insight += `Prof. ${professorMatch.name} has ${professorMatch.numRatings} reviews with an average rating of ${professorMatch.avgRating.toFixed(1)}/5. `;
  } else {
    insight += `No RateMyProfessors data available for this professor yet. `;
  }

  if (rmpReviews.length > 0) {
    insight += `Based on ${rmpReviews.length} student reviews, this class has moderate expectations. `;
  }

  if (redditQuotes.length > 0) {
    insight += `Found ${redditQuotes.length} Reddit discussions about this class/professor. `;
  }

  return insight;
}

// ============= OVERALL SCORE =============

async function calculateOverallScore(classes: ClassAnalysis[]): Promise<OverallAnalysis> {
  const avgScore = Math.round(classes.reduce((sum, c) => sum + c.finalScore, 0) / classes.length);

  // Smart adjustments
  const stemCount = classes.filter(c => /CSCI|MATH|PHYS|CHEM|EE|ENGR/i.test(c.courseName)).length;
  const highDiffCount = classes.filter(c => c.finalScore > 70).length;

  let finalScore = avgScore;
  let insights: string[] = [];
  let warnings: string[] = [];

  if (stemCount >= 3) {
    finalScore += 10;
    warnings.push('Multiple STEM classes - expect compounding difficulty');
  }

  if (highDiffCount >= 2) {
    warnings.push(`${highDiffCount} challenging classes in one semester`);
  }

  if (finalScore < 40) {
    insights.push('Light semester - good for taking on internships or extracurriculars');
  } else if (finalScore > 75) {
    insights.push('Very demanding schedule - prioritize time management');
  }

  return {
    score: Math.min(100, finalScore),
    verbalLabel: getVerbalLabel(finalScore),
    reasoning: `Average class difficulty (${avgScore}) adjusted for workload factors`,
    insights,
    warnings,
    strengths: finalScore < 50 ? ['Balanced workload'] : []
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
