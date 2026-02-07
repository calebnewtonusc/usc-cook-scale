import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import axios from 'axios';
import * as cheerio from 'cheerio';

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

interface CourseDifficultyAnalysis {
  difficulty: number;
  reasoning: string;
  workloadFactors: string[];
}

interface ProfessorImpactAnalysis {
  multiplier: number;
  adjustedScore: number;
  reasoning: string;
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
  // CORS headers
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

    console.log(`[V2] Analyzing ${classes.length} classes with enhanced algorithm...`);

    // Process each class with comprehensive analysis
    const classAnalyses: ClassAnalysis[] = await Promise.all(
      classes.map(async (cls: ClassInput) => analyzeClass(cls))
    );

    // Calculate overall score using LLM
    const overallAnalysis = await calculateOverallScore(classAnalyses);

    const totalUnits = classes.reduce((sum: number, cls: ClassInput) => sum + cls.units, 0);

    const result: AnalysisResult = {
      overall: overallAnalysis,
      classes: classAnalyses,
      totalUnits
    };

    console.log(`[V2] Analysis complete: ${overallAnalysis.score}/100 (${overallAnalysis.verbalLabel})`);

    return res.status(200).json(result);
  } catch (error) {
    console.error('[V2] Error analyzing schedule:', error);
    return res.status(500).json({
      error: 'Failed to analyze schedule',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

// ============= CLASS ANALYSIS =============

async function analyzeClass(cls: ClassInput): Promise<ClassAnalysis> {
  console.log(`[V2] Analyzing ${cls.courseName} with ${cls.professor}...`);

  try {
    // Step 1: Find and verify professor match
    const professorMatch = await findAndVerifyProfessor(cls.professor);

    // Step 2: Get RMP reviews (if professor found)
    const rmpQuotes = professorMatch
      ? await getRMPReviews(professorMatch.id, cls.courseName)
      : [];

    // Step 3: Get Reddit quotes
    const redditQuotes = await getRedditQuotes(cls.professor, cls.courseName);

    // Step 4: Analyze course difficulty with LLM
    const courseDifficultyAnalysis = await analyzeCourseDifficulty(
      cls.courseName,
      professorMatch,
      rmpQuotes
    );

    // Step 5: Calculate professor impact and final score
    const { finalScore, explanation } = await calculateClassScore(
      cls,
      courseDifficultyAnalysis,
      professorMatch
    );

    // Step 6: Generate personalized survival tips
    const survivalTips = await generateSurvivalTips(
      cls,
      finalScore,
      rmpQuotes,
      redditQuotes
    );

    // Step 7: Generate AI insights summary
    const aiInsights = await generateClassInsights(
      cls,
      finalScore,
      rmpQuotes,
      redditQuotes
    );

    // Generate research links
    const rmpLink = professorMatch
      ? `https://www.ratemyprofessors.com/professor/${professorMatch.id}`
      : `https://www.ratemyprofessors.com/search/professors/1381?q=${encodeURIComponent(cls.professor)}`;

    const redditSearchLink = `https://www.reddit.com/r/USC/search/?q=${encodeURIComponent(cls.professor + ' ' + cls.courseName)}`;
    const courseSearchLink = `https://www.google.com/search?q=${encodeURIComponent(`USC ${cls.courseName} ${cls.professor} review reddit`)}`;

    return {
      courseName: cls.courseName,
      professor: cls.professor,
      units: cls.units,
      professorMatch,
      courseDifficulty: courseDifficultyAnalysis.difficulty,
      finalScore,
      rmpQuotes,
      redditQuotes,
      survivalTips,
      aiInsights,
      explanation,
      rmpLink,
      redditSearchLink,
      courseSearchLink
    };
  } catch (error) {
    console.error(`[V2] Error analyzing ${cls.courseName}:`, error);

    // Return basic analysis on error
    return {
      courseName: cls.courseName,
      professor: cls.professor,
      units: cls.units,
      professorMatch: null,
      courseDifficulty: 50,
      finalScore: 50,
      rmpQuotes: [],
      redditQuotes: [],
      survivalTips: ['Unable to fetch detailed analysis. Check back later.'],
      aiInsights: 'Analysis failed - using default score.',
      explanation: 'Error during analysis',
      rmpLink: `https://www.ratemyprofessors.com/search/professors/1381?q=${encodeURIComponent(cls.professor)}`,
      redditSearchLink: `https://www.reddit.com/r/USC/search/?q=${encodeURIComponent(cls.courseName)}`,
      courseSearchLink: `https://www.google.com/search?q=${encodeURIComponent(`USC ${cls.courseName}`)}`
    };
  }
}

// ============= PROFESSOR MATCHING =============

async function findAndVerifyProfessor(professorName: string): Promise<ProfessorMatch | null> {
  try {
    console.log(`[V2] Searching for professor: ${professorName}`);

    // Search RMP GraphQL API
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
      console.log(`[V2] No professors found for: ${professorName}`);
      return null;
    }

    // Use LLM to verify and select best match
    const verified = await verifyProfessorMatch(professorName, teachers);

    if (!verified) {
      console.log(`[V2] No confident match found for: ${professorName}`);
      return null;
    }

    console.log(`[V2] Matched professor: ${verified.name} (confidence: ${verified.confidence})`);
    return verified;

  } catch (error) {
    console.error(`[V2] Error finding professor ${professorName}:`, error);
    return null;
  }
}

async function verifyProfessorMatch(
  searchQuery: string,
  searchResults: any[]
): Promise<ProfessorMatch | null> {
  try {
    const resultsText = searchResults.map((edge, idx) => {
      const node = edge.node;
      return `${idx + 1}. ${node.firstName} ${node.lastName} (${node.numRatings} ratings, ${node.avgRating?.toFixed(1)}/5 quality)`;
    }).join('\n');

    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 200,
      prompt: `You are verifying RateMyProfessors search results for USC.

Search query: "${searchQuery}"

Results found:
${resultsText}

Task: Select the best matching professor.

Consider:
- Name similarity (handle "Smith, John" vs "John Smith" vs "J. Smith")
- Must be from USC (we already filtered by school)
- Prefer results with more ratings (more reliable)

Return JSON:
{
  "matchIndex": number (1-based index) or null if no good match,
  "confidence": 0.0-1.0,
  "reasoning": "why this match or why no match"
}

If names are very different or unclear, return matchIndex: null.`
    });

    const result = JSON.parse(text.trim());

    if (!result.matchIndex || result.confidence < 0.6) {
      return null;
    }

    const selectedTeacher = searchResults[result.matchIndex - 1].node;

    return {
      id: selectedTeacher.id,
      name: `${selectedTeacher.firstName} ${selectedTeacher.lastName}`,
      avgRating: selectedTeacher.avgRating || 0,
      avgDifficulty: selectedTeacher.avgDifficulty || 0,
      wouldTakeAgainPercent: selectedTeacher.wouldTakeAgainPercent || 0,
      numRatings: selectedTeacher.numRatings || 0,
      confidence: result.confidence,
      reasoning: result.reasoning
    };

  } catch (error) {
    console.error('[V2] Error verifying professor match:', error);
    return null;
  }
}

// ============= RMP REVIEW SCRAPING =============

async function getRMPReviews(professorId: string, courseName: string): Promise<RMPReview[]> {
  try {
    console.log(`[V2] Fetching RMP reviews for professor ID: ${professorId}`);

    // Fetch reviews via GraphQL
    const query = {
      query: `query RatingsQuery($id: ID!) {
        node(id: $id) {
          ... on Teacher {
            ratings(first: 10) {
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
      variables: {
        id: professorId
      }
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
      console.log(`[V2] No reviews found for professor ${professorId}`);
      return [];
    }

    // Convert to our format
    const reviews: RMPReview[] = ratings
      .map((edge: any) => {
        const node = edge.node;
        return {
          rating: node.clarityRating || node.helpfulRating || 0,
          difficulty: node.difficultyRating || 0,
          comment: node.comment || '',
          course: node.class || '',
          date: node.date || '',
          tags: node.ratingTags ? node.ratingTags.split(',').map((t: string) => t.trim()) : []
        };
      })
      .filter((r: RMPReview) => r.comment && r.comment.length > 20)
      .slice(0, 5);

    console.log(`[V2] Found ${reviews.length} quality reviews`);
    return reviews;

  } catch (error) {
    console.error(`[V2] Error fetching RMP reviews:`, error);
    return [];
  }
}

// ============= REDDIT SCRAPING =============

async function getRedditQuotes(professor: string, courseName: string): Promise<RedditQuote[]> {
  try {
    console.log(`[V2] Searching Reddit for: ${professor} ${courseName}`);

    const query = `${professor} ${courseName}`;
    const searchUrl = `https://www.reddit.com/r/USC/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&limit=5&sort=relevance`;

    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; USCCookScale/1.0)'
      },
      timeout: 5000
    });

    const posts = response.data?.data?.children || [];

    if (posts.length === 0) {
      return [];
    }

    // Extract meaningful quotes
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
      })
      .filter((q: RedditQuote) => q.text.length > 30);

    console.log(`[V2] Found ${quotes.length} Reddit mentions`);
    return quotes;

  } catch (error) {
    console.error(`[V2] Error fetching Reddit quotes:`, error);
    return [];
  }
}

// ============= COURSE DIFFICULTY ANALYSIS =============

async function analyzeCourseDifficulty(
  courseName: string,
  professorMatch: ProfessorMatch | null,
  rmpReviews: RMPReview[]
): Promise<CourseDifficultyAnalysis> {
  try {
    console.log(`[V2] Analyzing course difficulty for: ${courseName}`);

    const reviewContext = rmpReviews.length > 0
      ? `Student reviews mention: ${rmpReviews.slice(0, 3).map(r => `"${r.comment.substring(0, 100)}..."`).join('; ')}`
      : 'No student reviews available.';

    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 300,
      prompt: `Analyze this USC course difficulty on a scale of 0-100:

Course: ${courseName}
Professor Avg Difficulty: ${professorMatch?.avgDifficulty?.toFixed(1) || 'Unknown'}/5
${reviewContext}

Consider:
1. Course level (100-level intro = easier, 400-level = harder)
2. Subject inherent difficulty (e.g., CSCI-104 data structures is notoriously hard, CSCI-101 intro is moderate)
3. Typical USC workload for this course (labs, projects, exams, papers)
4. USC-specific reputation if known

Examples:
- CSCI-104 (data structures): 75-85 (hard STEM, heavy workload)
- CSCI-101 (intro CS): 40-50 (moderate intro)
- MATH-226 (multivariable calc): 70-80 (hard math)
- WRIT-150 (required writing): 45-55 (moderate, lots of papers)
- PSYC-100 (intro psych): 30-40 (easier humanities)

Return JSON:
{
  "difficulty": 0-100,
  "reasoning": "concise explanation of score",
  "workloadFactors": ["factor1", "factor2"]
}`
    });

    const result = JSON.parse(text.trim());

    return {
      difficulty: Math.max(0, Math.min(100, result.difficulty)),
      reasoning: result.reasoning || 'Course difficulty analysis',
      workloadFactors: result.workloadFactors || []
    };

  } catch (error) {
    console.error('[V2] Error analyzing course difficulty:', error);

    // Fallback to simple heuristic
    const isStem = /CSCI|MATH|PHYS|CHEM|EE|ENGR/i.test(courseName);
    return {
      difficulty: isStem ? 60 : 35,
      reasoning: 'Fallback analysis based on course code',
      workloadFactors: [isStem ? 'STEM course' : 'Humanities course']
    };
  }
}

// ============= SCORE CALCULATION =============

async function calculateClassScore(
  cls: ClassInput,
  courseDifficulty: CourseDifficultyAnalysis,
  professorMatch: ProfessorMatch | null
): Promise<{ finalScore: number; explanation: string }> {
  try {
    let score = courseDifficulty.difficulty;
    let explanation = `Base difficulty: ${score}/100 (${courseDifficulty.reasoning})`;

    // Apply professor impact if available
    if (professorMatch && professorMatch.numRatings > 5) {
      const { text } = await generateText({
        model: anthropic('claude-sonnet-4-5-20250929'),
        maxTokens: 200,
        prompt: `Calculate professor impact on course difficulty:

Base Course Difficulty: ${score}/100
Professor Ratings:
- Quality: ${professorMatch.avgRating.toFixed(1)}/5
- Difficulty: ${professorMatch.avgDifficulty.toFixed(1)}/5
- Would Take Again: ${professorMatch.wouldTakeAgainPercent.toFixed(0)}%
- Number of Reviews: ${professorMatch.numRatings}

Consider:
- High quality + high difficulty = Hard but worthwhile (multiply by 0.9)
- Low quality + high difficulty = Nightmare (multiply by 1.3-1.5)
- High quality + low difficulty = Easy A (multiply by 0.7)
- Low quality + low difficulty = Boring but easy (multiply by 0.8)

Return JSON:
{
  "multiplier": 0.5 to 1.5,
  "reasoning": "brief explanation"
}`
      });

      const result = JSON.parse(text.trim());
      score = score * result.multiplier;
      explanation += ` × ${result.multiplier.toFixed(2)} professor factor (${result.reasoning})`;
    }

    // Apply unit multiplier
    const unitMultiplier = cls.units / 4;
    score = score * unitMultiplier;

    if (unitMultiplier !== 1) {
      explanation += ` × ${unitMultiplier} unit adjustment`;
    }

    return {
      finalScore: Math.round(Math.max(0, Math.min(100, score))),
      explanation
    };

  } catch (error) {
    console.error('[V2] Error calculating class score:', error);
    return {
      finalScore: courseDifficulty.difficulty,
      explanation: 'Error calculating professor impact - using base difficulty'
    };
  }
}

// ============= SURVIVAL TIPS GENERATION =============

async function generateSurvivalTips(
  cls: ClassInput,
  score: number,
  rmpReviews: RMPReview[],
  redditQuotes: RedditQuote[]
): Promise<string[]> {
  try {
    console.log(`[V2] Generating survival tips for: ${cls.courseName}`);

    const rmpContext = rmpReviews.length > 0
      ? rmpReviews.slice(0, 3).map(r => `- "${r.comment.substring(0, 150)}..." (${r.rating}/5, Difficulty: ${r.difficulty}/5)`).join('\n')
      : 'No RMP reviews available';

    const redditContext = redditQuotes.length > 0
      ? redditQuotes.map(q => `- "${q.text}" (${q.upvotes} upvotes)`).join('\n')
      : 'No Reddit discussions found';

    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 400,
      prompt: `Generate 4-5 specific, actionable survival tips for this USC class:

Class: ${cls.courseName}
Professor: ${cls.professor}
Cook Score: ${score}/100
Units: ${cls.units}

RMP Reviews:
${rmpContext}

Reddit Comments:
${redditContext}

Generate tips that:
1. Are specific to THIS professor and course (not generic)
2. Reference actual student experiences when available
3. Include time management and study strategies
4. Are practical and actionable
5. Cite sources ("Students on RMP say...", "According to Reddit...")

Return JSON array of 4-5 strings.

Example format:
["Start problem sets early - students report spending 15+ hours per week", "Attend office hours - RMP reviews mention prof is helpful one-on-one", "Form study groups - Reddit users say collaboration is key"]`
    });

    const tips = JSON.parse(text.trim());
    return Array.isArray(tips) ? tips : [];

  } catch (error) {
    console.error('[V2] Error generating survival tips:', error);

    // Fallback generic tips
    if (score > 70) {
      return [
        'This is a challenging class - start assignments early',
        'Form study groups with classmates',
        'Attend office hours regularly',
        'Budget extra time for this class each week'
      ];
    } else {
      return [
        'Maintain consistent effort throughout the semester',
        'Review concepts regularly to stay on track',
        'Use this class to balance harder courses in your schedule'
      ];
    }
  }
}

// ============= CLASS INSIGHTS GENERATION =============

async function generateClassInsights(
  cls: ClassInput,
  score: number,
  rmpReviews: RMPReview[],
  redditQuotes: RedditQuote[]
): Promise<string> {
  try {
    const rmpSummary = rmpReviews.length > 0
      ? `${rmpReviews.length} RMP reviews available. Common themes: ${rmpReviews.slice(0, 2).map(r => `"${r.comment.substring(0, 100)}..."`).join('; ')}`
      : 'No RMP reviews found';

    const redditSummary = redditQuotes.length > 0
      ? `Reddit mentions: ${redditQuotes.length} discussions found`
      : 'No Reddit discussions found';

    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 200,
      prompt: `Summarize this USC class in 2-3 sentences for a student:

Class: ${cls.courseName} with Prof. ${cls.professor}
Difficulty Score: ${score}/100
${rmpSummary}
${redditSummary}

Write a helpful, honest summary. Mention key themes from reviews if available.
Keep it concise and student-friendly.`
    });

    return text.trim();

  } catch (error) {
    console.error('[V2] Error generating insights:', error);
    return `${cls.courseName} with Prof. ${cls.professor} has a difficulty score of ${score}/100.`;
  }
}

// ============= OVERALL SCORE CALCULATION =============

async function calculateOverallScore(classes: ClassAnalysis[]): Promise<OverallAnalysis> {
  try {
    console.log('[V2] Calculating overall semester difficulty with LLM...');

    const classDescriptions = classes.map(c =>
      `- ${c.courseName} (Score: ${c.finalScore}/100, ${c.units} units, Prof: ${c.professor})`
    ).join('\n');

    const totalUnits = classes.reduce((sum, c) => sum + c.units, 0);
    const avgScore = Math.round(classes.reduce((sum, c) => sum + c.finalScore, 0) / classes.length);

    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 500,
      prompt: `Analyze this USC semester schedule and rate overall difficulty 0-100:

${classDescriptions}

Total Units: ${totalUnits}
Average Class Score: ${avgScore}

Consider:
1. Individual class difficulties and how they compound
2. Workload synergy:
   - Multiple hard STEM classes = synergistic difficulty (harder than sum)
   - Mix of STEM + humanities = balanced but challenging
   - All easy classes = truly light semester
3. Unit count context:
   - 12-14 units = light load
   - 15-17 units = normal load
   - 18+ units = heavy load
4. Time management challenges
5. Cumulative stress across semester

DO NOT just average the scores. Consider how classes interact.

Return JSON:
{
  "overallScore": 0-100,
  "verbalLabel": "Raw 🥩" or "Lightly Toasted 🍞" or "Medium 🍳" or "Well Done 🥓" or "Extra Crispy 🔥" or "Absolutely Burnt 💀",
  "reasoning": "2-3 sentences explaining the score",
  "insights": ["insight1", "insight2", "insight3"],
  "warnings": ["warning1", "warning2"] or [],
  "strengths": ["strength1", "strength2"] or []
}

Verbal label guidelines:
- 0-20: Raw 🥩
- 21-35: Lightly Toasted 🍞
- 36-50: Medium 🍳
- 51-65: Well Done 🥓
- 66-80: Extra Crispy 🔥
- 81-100: Absolutely Burnt 💀`
    });

    const result = JSON.parse(text.trim());

    return {
      score: Math.max(0, Math.min(100, result.overallScore)),
      verbalLabel: result.verbalLabel || getVerbalLabel(result.overallScore),
      reasoning: result.reasoning || '',
      insights: result.insights || [],
      warnings: result.warnings || [],
      strengths: result.strengths || []
    };

  } catch (error) {
    console.error('[V2] Error calculating overall score:', error);

    // Fallback calculation
    const totalScore = classes.reduce((sum, c) => sum + c.finalScore, 0);
    const avgScore = Math.round(totalScore / classes.length);

    return {
      score: avgScore,
      verbalLabel: getVerbalLabel(avgScore),
      reasoning: 'Calculated as average of individual class scores',
      insights: [],
      warnings: [],
      strengths: []
    };
  }
}

function getVerbalLabel(score: number): string {
  if (score <= 20) return 'Raw 🥩';
  if (score <= 35) return 'Lightly Toasted 🍞';
  if (score <= 50) return 'Medium 🍳';
  if (score <= 65) return 'Well Done 🥓';
  if (score <= 80) return 'Extra Crispy 🔥';
  return 'Absolutely Burnt 💀';
}
