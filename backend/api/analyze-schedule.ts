import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import axios from 'axios';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// RateMyProfessor GraphQL API
const RMP_GRAPHQL_URL = 'https://www.ratemyprofessors.com/graphql';
const USC_SCHOOL_ID = '1381';

interface ClassInput {
  courseName: string;
  professor: string;
  units: number;
  type?: 'STEM' | 'HUMANITIES';
}

interface ProfessorRating {
  quality: number;
  difficulty: number;
  wouldTakeAgain: number;
  numRatings: number;
}

interface ClassResult extends ClassInput {
  type: 'STEM' | 'HUMANITIES';
  professorRating: ProfessorRating | null;
  score: number;
  explanation: string;
  rmpLink: string;
  redditSearchLink: string;
  courseSearchLink: string;
}

interface AnalysisResult {
  overallScore: number;
  verbalLabel: string;
  classes: ClassResult[];
  totalUnits: number;
}

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

    // Validate each class
    for (const cls of classes) {
      if (!cls.courseName || typeof cls.courseName !== 'string') {
        return res.status(400).json({ error: 'Invalid class: courseName is required' });
      }
      if (!cls.professor || typeof cls.professor !== 'string') {
        return res.status(400).json({ error: 'Invalid class: professor is required' });
      }
      if (!cls.units || typeof cls.units !== 'number' || cls.units <= 0) {
        return res.status(400).json({ error: 'Invalid class: units must be a positive number' });
      }
    }

    console.log(`Analyzing ${classes.length} classes...`);

    // Process each class
    const results: ClassResult[] = await Promise.all(
      classes.map(async (cls: ClassInput) => {
        // Determine class type and get professor rating in parallel
        const [classType, professorRating] = await Promise.all([
          cls.type ? Promise.resolve(cls.type) : determineClassType(cls.courseName),
          getProfessorRating(cls.professor)
        ]);

        // Calculate score
        const { score, explanation} = calculateClassScore(cls, classType, professorRating);

        // Generate research links
        const rmpLink = `https://www.ratemyprofessors.com/search/professors/1381?q=${encodeURIComponent(cls.professor)}`;
        const redditSearchLink = `https://www.reddit.com/r/USC/search/?q=${encodeURIComponent(cls.professor + ' ' + cls.courseName)}`;
        const courseSearchLink = `https://www.google.com/search?q=${encodeURIComponent(`USC ${cls.courseName} ${cls.professor} review reddit`)}`;

        return {
          ...cls,
          type: classType,
          professorRating,
          score,
          explanation,
          rmpLink,
          redditSearchLink,
          courseSearchLink
        };
      })
    );

    // Calculate overall score and total units
    const totalScore = results.reduce((sum, cls) => sum + cls.score, 0);
    const totalUnits = results.reduce((sum, cls) => sum + cls.units, 0);
    const overallScore = Math.min(100, Math.round(totalScore));

    // Determine verbal label
    const verbalLabel = getVerbalLabel(overallScore);

    const result: AnalysisResult = {
      overallScore,
      verbalLabel,
      classes: results,
      totalUnits
    };

    console.log(`Analysis complete: Overall score = ${overallScore} (${verbalLabel})`);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error analyzing schedule:', error);
    return res.status(500).json({
      error: 'Failed to analyze schedule',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

async function determineClassType(courseName: string): Promise<'STEM' | 'HUMANITIES'> {
  try {
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 10,
      prompt: `Determine if this college course is STEM or HUMANITIES:
Course: ${courseName}

Respond with only: "STEM" or "HUMANITIES"

STEM includes: Engineering, Computer Science, Mathematics, Physics, Chemistry, Biology, Statistics, etc.
HUMANITIES includes: Psychology, English, History, GE courses, Arts, Business, Social Sciences, etc.`
    });

    const response = text.trim().toUpperCase();
    return response === 'STEM' ? 'STEM' : 'HUMANITIES';
  } catch (error) {
    console.error('Error determining class type:', error);
    return 'HUMANITIES';
  }
}

async function getProfessorRating(professorName: string): Promise<ProfessorRating | null> {
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
      console.log(`Professor ${professorName} not found on RMP`);
      return null;
    }

    const teacher = teachers[0].node;

    return {
      quality: teacher.avgRating || 0,
      difficulty: teacher.avgDifficulty || 0,
      wouldTakeAgain: teacher.wouldTakeAgainPercent || 0,
      numRatings: teacher.numRatings || 0
    };
  } catch (error) {
    console.error(`Error fetching RMP data for ${professorName}:`, error);
    return null;
  }
}

function calculateClassScore(
  cls: ClassInput,
  classType: 'STEM' | 'HUMANITIES',
  professorRating: ProfessorRating | null
): { score: number; explanation: string } {
  // Base difficulty score
  let baseScore = classType === 'STEM' ? 60 : 30;
  let explanation = `Base ${classType} difficulty (${baseScore})`;

  // Professor adjustment
  if (professorRating && professorRating.numRatings > 0) {
    const { quality, difficulty, wouldTakeAgain } = professorRating;

    // Combined professor factor (0.5 to 2.0 multiplier)
    const professorFactor = (
      ((6 - quality) / 5) * 0.4 +           // Quality (inverted, lower is harder)
      (difficulty / 5) * 0.4 +              // Difficulty
      ((1 - wouldTakeAgain / 100) * 0.2)    // Would take again (inverted)
    ) * 2;

    baseScore *= professorFactor;
    explanation += ` × professor factor (${professorFactor.toFixed(2)})`;
  } else {
    explanation += ` (no professor data)`;
  }

  // Unit adjustment
  const unitMultiplier = cls.units / 4;
  const finalScore = baseScore * unitMultiplier;

  if (unitMultiplier !== 1) {
    explanation += ` × unit multiplier (${unitMultiplier})`;
  }

  return {
    score: Math.round(finalScore),
    explanation
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
