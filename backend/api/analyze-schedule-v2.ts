import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import axios from 'axios';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

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
  errors: string[];
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

// ============= HELPER: ROBUST LLM CALL =============

async function callLLMRobust<T>(
  prompt: string,
  fallback: T,
  errorMsg: string
): Promise<{ result: T; error?: string }> {
  try {
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 500,
      temperature: 0.3,
      prompt
    });

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = text.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }

    // Try to find JSON object/array
    const jsonMatch = jsonText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    const result = JSON.parse(jsonText);
    return { result };
  } catch (error) {
    console.error(`[LLM Error] ${errorMsg}:`, error);
    return {
      result: fallback,
      error: `${errorMsg}: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
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

    console.log(`[V2-LLM] Analyzing ${classes.length} classes with REAL LLM...`);

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

    console.log(`[V2-LLM] Analysis complete: ${overallAnalysis.score}/100`);
    return res.status(200).json(result);
  } catch (error) {
    console.error('[V2-LLM] Error:', error);
    return res.status(500).json({
      error: 'Failed to analyze schedule',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

// ============= CLASS ANALYSIS =============

async function analyzeClass(cls: ClassInput): Promise<ClassAnalysis> {
  console.log(`[V2-LLM] Analyzing ${cls.courseName} with ${cls.professor}`);

  const errors: string[] = [];
  const professorName = parseProfessorName(cls.professor);

  // Step 1: Find professor on RMP
  const professorMatch = await findProfessor(professorName, errors);

  // Step 2: Get RMP reviews
  const rmpQuotes = professorMatch
    ? await getRMPReviews(professorMatch.id, cls.courseName, errors)
    : [];

  // Step 3: Get Reddit quotes
  const redditQuotes = await getRedditQuotes(professorName, cls.courseName, errors);

  // Step 4: LLM analyze course difficulty
  const { difficulty, reasoning, error: diffError } = await analyzeCourseDifficultyLLM(
    cls.courseName,
    professorMatch,
    rmpQuotes
  );
  if (diffError) errors.push(diffError);

  // Step 5: Calculate final score
  const { finalScore, explanation } = calculateFinalScore(cls, difficulty, professorMatch);

  // Step 6: LLM generate survival tips
  const { tips: survivalTips, error: tipsError } = await generateSurvivalTipsLLM(
    cls,
    finalScore,
    rmpQuotes,
    redditQuotes
  );
  if (tipsError) errors.push(tipsError);

  // Step 7: LLM generate insights
  const { insights: aiInsights, error: insightsError } = await generateInsightsLLM(
    cls,
    finalScore,
    rmpQuotes,
    redditQuotes,
    professorMatch
  );
  if (insightsError) errors.push(insightsError);

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
    errors
  };
}

// ============= PROFESSOR NAME PARSING =============

function parseProfessorName(input: string): string {
  if (input.includes(',')) {
    const [last, first] = input.split(',').map(s => s.trim());
    return `${first} ${last}`;
  }
  return input;
}

// ============= PROFESSOR MATCHING =============

async function findProfessor(professorName: string, errors: string[]): Promise<ProfessorMatch | null> {
  try {
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
      errors.push(`Professor "${professorName}" not found on RateMyProfessors`);
      return null;
    }

    const sorted = teachers.sort((a: any, b: any) =>
      (b.node.numRatings || 0) - (a.node.numRatings || 0)
    );

    const best = sorted[0].node;

    return {
      id: best.id,
      name: `${best.firstName} ${best.lastName}`,
      avgRating: best.avgRating || 0,
      avgDifficulty: best.avgDifficulty || 0,
      wouldTakeAgainPercent: best.wouldTakeAgainPercent || 0,
      numRatings: best.numRatings || 0,
      confidence: best.numRatings > 10 ? 0.9 : 0.7,
      reasoning: `Matched by name with ${best.numRatings} reviews`
    };
  } catch (error) {
    errors.push(`RMP API error: ${error instanceof Error ? error.message : 'Unknown'}`);
    return null;
  }
}

// ============= RMP REVIEWS =============

async function getRMPReviews(professorId: string, courseName: string, errors: string[]): Promise<RMPReview[]> {
  try {
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

    return ratings
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
  } catch (error) {
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

    return posts
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
  } catch (error) {
    errors.push('Reddit search failed');
    return [];
  }
}

// ============= LLM COURSE DIFFICULTY =============

async function analyzeCourseDifficultyLLM(
  courseName: string,
  professorMatch: ProfessorMatch | null,
  rmpReviews: RMPReview[]
): Promise<{ difficulty: number; reasoning: string; error?: string }> {
  // USC-specific overrides (known courses)
  const uscKnown: Record<string, number> = {
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

  // LLM analysis
  const reviewContext = rmpReviews.length > 0
    ? `Student reviews: ${rmpReviews.slice(0, 2).map(r => `"${r.comment.substring(0, 100)}..."`).join('; ')}`
    : 'No reviews available';

  const prompt = `Analyze this USC course difficulty (0-100):

Course: ${courseName}
Professor RMP Difficulty: ${professorMatch?.avgDifficulty || 'Unknown'}/5
${reviewContext}

Consider:
- Course level (100=intro, 400=advanced)
- Subject difficulty (data structures vs intro programming)
- USC-specific reputation
- Typical workload

Return ONLY valid JSON:
{"difficulty": 0-100, "reasoning": "brief explanation"}`;

  const { result, error } = await callLLMRobust<{difficulty: number; reasoning: string}>(
    prompt,
    {
      difficulty: /CSCI|MATH|PHYS|CHEM|EE|ENGR/i.test(courseName) ? 65 : 40,
      reasoning: 'LLM analysis failed - using STEM/Humanities fallback'
    },
    'Course difficulty analysis failed'
  );

  return { ...result, error };
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
    const multiplier = 0.7 + (professorMatch.avgDifficulty / 5) * 0.6;
    score *= multiplier;
    explanation += ` × ${multiplier.toFixed(2)} (Prof: ${professorMatch.avgRating.toFixed(1)}/5, Diff: ${professorMatch.avgDifficulty.toFixed(1)}/5)`;
  }

  const unitMult = cls.units / 4;
  score *= unitMult;
  if (unitMult !== 1) explanation += ` × ${unitMult} units`;

  return {
    finalScore: Math.round(Math.max(10, Math.min(100, score))),
    explanation
  };
}

// ============= LLM SURVIVAL TIPS =============

async function generateSurvivalTipsLLM(
  cls: ClassInput,
  score: number,
  rmpReviews: RMPReview[],
  redditQuotes: RedditQuote[]
): Promise<{ tips: string[]; error?: string }> {
  const rmpContext = rmpReviews.length > 0
    ? rmpReviews.slice(0, 2).map(r => `"${r.comment.substring(0, 100)}"`).join('; ')
    : 'No reviews';

  const redditContext = redditQuotes.length > 0
    ? redditQuotes.map(q => `"${q.text.substring(0, 80)}"`).join('; ')
    : 'No Reddit discussions';

  const prompt = `Generate 4 specific survival tips for this USC class:

Class: ${cls.courseName} with Prof. ${cls.professor}
Difficulty: ${score}/100
RMP Reviews: ${rmpContext}
Reddit: ${redditContext}

Tips must:
- Be specific to THIS class/professor
- Reference actual student feedback when available
- Include time management strategies
- Be actionable

Return ONLY valid JSON array:
["tip1", "tip2", "tip3", "tip4"]`;

  const fallback = score > 70
    ? [
        'This is a challenging class - budget 15+ hours per week',
        'Start assignments early, they take longer than expected',
        'Form study groups with classmates',
        'Attend office hours regularly'
      ]
    : [
        'Maintain consistent effort throughout the semester',
        'Review concepts regularly to stay on track',
        'Use this as an opportunity to balance harder classes',
        'Attend lectures and complete assignments on time'
      ];

  const { result, error } = await callLLMRobust<string[]>(
    prompt,
    fallback,
    'Survival tips generation failed'
  );

  return { tips: result, error };
}

// ============= LLM INSIGHTS =============

async function generateInsightsLLM(
  cls: ClassInput,
  score: number,
  rmpReviews: RMPReview[],
  redditQuotes: RedditQuote[],
  professorMatch: ProfessorMatch | null
): Promise<{ insights: string; error?: string }> {
  const rmpSummary = professorMatch
    ? `${professorMatch.numRatings} RMP reviews, ${professorMatch.avgRating.toFixed(1)}/5 rating`
    : 'No RMP data';

  const reviewsSummary = rmpReviews.length > 0
    ? `Reviews mention: ${rmpReviews[0].comment.substring(0, 100)}...`
    : 'No reviews available';

  const prompt = `Summarize this USC class in 2-3 sentences:

Class: ${cls.courseName} with Prof. ${cls.professor}
Difficulty: ${score}/100
${rmpSummary}
${reviewsSummary}

Be honest, student-friendly, and mention data sources.
Return plain text (no markdown, no JSON).`;

  try {
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 300,
      temperature: 0.5,
      prompt
    });

    return { insights: text.trim() };
  } catch (error) {
    const fallback = `${cls.courseName} with Prof. ${cls.professor} has a difficulty score of ${score}/100. ${
      professorMatch
        ? `Prof. ${professorMatch.name} has ${professorMatch.numRatings} reviews with a ${professorMatch.avgRating.toFixed(1)}/5 rating.`
        : 'No RateMyProfessors data available yet.'
    }`;

    return {
      insights: fallback,
      error: 'Insights generation failed'
    };
  }
}

// ============= OVERALL SCORE =============

async function calculateOverallScore(classes: ClassAnalysis[]): Promise<OverallAnalysis> {
  const avgScore = Math.round(classes.reduce((sum, c) => sum + c.finalScore, 0) / classes.length);
  const stemCount = classes.filter(c => /CSCI|MATH|PHYS|CHEM|EE|ENGR/i.test(c.courseName)).length;
  const highDiffCount = classes.filter(c => c.finalScore > 70).length;

  let finalScore = avgScore;
  const insights: string[] = [];
  const warnings: string[] = [];

  if (stemCount >= 3) {
    finalScore += 10;
    warnings.push('Multiple STEM classes - expect compounding difficulty');
  }

  if (highDiffCount >= 2) {
    warnings.push(`${highDiffCount} challenging classes in one semester`);
  }

  if (finalScore < 40) {
    insights.push('Light semester - good for internships/extracurriculars');
  } else if (finalScore > 75) {
    insights.push('Very demanding schedule - prioritize time management');
  }

  return {
    score: Math.min(100, finalScore),
    verbalLabel: getVerbalLabel(finalScore),
    reasoning: `Average difficulty (${avgScore}) adjusted for workload synergy`,
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
