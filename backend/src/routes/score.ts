import { Router, Request, Response } from 'express';
import { AnalyzeScheduleRequest, ClassInput, ClassScore } from '../types';
import { determineClassType, parseScheduleText } from '../services/claudeService';
import { getProfessorRating } from '../services/rmpScraper';
import { calculateClassScore, calculateOverallScore } from '../services/scoreCalculator';

const router = Router();

router.post('/analyze-schedule', async (req: Request, res: Response) => {
  try {
    const { classes } = req.body as AnalyzeScheduleRequest;

    if (!classes || !Array.isArray(classes) || classes.length === 0) {
      return res.status(400).json({ error: 'Invalid request: classes array is required' });
    }

    // Process each class
    const classScores: ClassScore[] = [];

    for (const classInput of classes) {
      // Determine class type if not provided
      const classType = classInput.type || await determineClassType(classInput.courseName);

      // Get professor rating
      const professorRating = await getProfessorRating(classInput.professor);

      // Calculate score
      const classScore = calculateClassScore(
        classInput.courseName,
        classInput.professor,
        classInput.units,
        classType,
        professorRating
      );

      classScores.push(classScore);
    }

    // Calculate overall score
    const result = calculateOverallScore(classScores);

    res.json(result);
  } catch (error) {
    console.error('Error analyzing schedule:', error);
    res.status(500).json({ error: 'Failed to analyze schedule' });
  }
});

router.post('/parse-schedule', async (req: Request, res: Response) => {
  try {
    const { scheduleText } = req.body;

    if (!scheduleText || typeof scheduleText !== 'string') {
      return res.status(400).json({ error: 'Invalid request: scheduleText is required' });
    }

    const classes = await parseScheduleText(scheduleText);

    res.json({ classes });
  } catch (error) {
    console.error('Error parsing schedule:', error);
    res.status(500).json({ error: 'Failed to parse schedule' });
  }
});

export default router;
