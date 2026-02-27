import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function determineClassType(courseName: string): Promise<'STEM' | 'HUMANITIES'> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 10,
      messages: [{
        role: 'user',
        content: `Determine if this college course is STEM or HUMANITIES:
Course: ${courseName}

Respond with only: "STEM" or "HUMANITIES"

STEM includes: Engineering, Computer Science, Mathematics, Physics, Chemistry, Biology, Statistics, etc.
HUMANITIES includes: Psychology, English, History, GE courses, Arts, Business, Social Sciences, etc.`
      }]
    });

    const response = message.content[0].type === 'text'
      ? message.content[0].text.trim().toUpperCase()
      : 'HUMANITIES';

    return response === 'STEM' ? 'STEM' : 'HUMANITIES';
  } catch (error) {
    console.error('Error determining class type:', error);
    // Default to HUMANITIES on error
    return 'HUMANITIES';
  }
}

export async function parseScheduleText(scheduleText: string): Promise<Array<{courseName: string, professor: string, units: number}>> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `You are an expert at parsing USC course schedules from any format - structured tables, conversational text, bullet points, or natural language.

Extract all courses from this text and return them as JSON. Be VERY flexible and intelligent:

- Handle conversational language ("So Mark, what are your courses...", "I'm taking...", etc.)
- Extract course codes/names (e.g., "Chem 105B", "CSCI 104", "Spanish 150", "GESM 110")
- Extract professor names (including complex names like "Consuelo-Siguenza Ortiz", "Watts/Bearacat")
- Extract units (convert "four units" → 4, "three units" → 3, etc. Default to 4 if not mentioned)
- Ignore filler words, questions, and conversational fluff
- Be smart about abbreviations (Prof, Professor, etc.)

Schedule text:
${scheduleText}

Return ONLY valid JSON array, no explanations or other text:
[{"courseName": "CHEM 105B", "professor": "Moon", "units": 4}]

If there are absolutely NO courses mentioned, return: []`
      }]
    });

    const response = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : '[]';

    // Extract JSON from response (in case there's extra text)
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : '[]';

    const parsed = JSON.parse(jsonStr);

    // Log successful parse
    console.log(`Parsed ${parsed.length} classes from schedule text`);

    return parsed;
  } catch (error) {
    console.error('Error parsing schedule:', error);
    return [];
  }
}
