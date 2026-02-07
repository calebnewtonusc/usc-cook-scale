import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

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
    const { scheduleText } = req.body;

    if (!scheduleText || typeof scheduleText !== 'string') {
      return res.status(400).json({ error: 'Invalid request: scheduleText is required' });
    }

    // Use Claude AI to parse the schedule with Vercel AI SDK
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 2000,
      prompt: `You are an expert at parsing USC course schedules from any format - structured tables, conversational text, bullet points, or natural language.

Extract all courses from this text and return them as JSON. Be VERY flexible and intelligent:

**For USC WebReg PDFs (if detected):**
- ONLY extract courses that say "This section is Registered"
- IGNORE courses that say "Not Scheduled and Not Registered" (these are just in the course bin, not actually enrolled)
- Look for patterns like:
  - Course: "CSCI-103" or "MATH-225" or "MPGU-120A"
  - Instructor: "Slocum, Carter" or "Tabing, Felicia"
  - Units: "4.0" or "2.0"
- For Type: Lab, Quiz, Discussion sections → ignore (0 units), only include Lecture sections
- The status "This section is Registered" means the student IS taking that class

**For general text/conversational format:**
- Handle conversational language ("So Mark, what are your courses...", "I'm taking...", etc.)
- Extract course codes/names (e.g., "Chem 105B", "CSCI 104", "Spanish 150", "GESM 110")
- Extract professor names (including complex names like "Consuelo-Siguenza Ortiz", "Watts/Bearacat")
- Extract units (convert "four units" → 4, "three units" → 3, etc. Default to 4 if not mentioned)
- Ignore filler words, questions, and conversational fluff
- Be smart about abbreviations (Prof, Professor, etc.)

IMPORTANT: If the text does NOT contain any course schedule information (e.g., it's random text, a conversation about something else, or insufficient information), return an empty array.

Schedule text:
${scheduleText}

Return ONLY valid JSON array, no explanations or other text:
[{"courseName": "CHEM 105B", "professor": "Moon", "units": 4}]

If there are absolutely NO courses mentioned OR insufficient schedule information, return: []`
    });

    // Extract JSON from response
    const jsonMatch = text.trim().match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : '[]';

    const classes = JSON.parse(jsonStr);

    console.log(`Parsed ${classes.length} classes from schedule text`);

    return res.status(200).json({ classes });
  } catch (error) {
    console.error('Error parsing schedule:', error);
    return res.status(500).json({
      error: 'Failed to parse schedule',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
