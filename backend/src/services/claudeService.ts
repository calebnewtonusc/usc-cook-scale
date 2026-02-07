import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function determineClassType(courseName: string): Promise<'STEM' | 'HUMANITIES'> {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
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
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Parse this USC schedule into a JSON array. Extract course name, professor name, and units (estimate 4 if not specified).

Schedule text:
${scheduleText}

Return ONLY valid JSON in this exact format, no other text:
[{"courseName": "CSCI 104", "professor": "John Smith", "units": 4}]

If you cannot parse the schedule, return an empty array: []`
      }]
    });

    const response = message.content[0].type === 'text'
      ? message.content[0].text.trim()
      : '[]';

    // Extract JSON from response (in case there's extra text)
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : '[]';

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error parsing schedule:', error);
    return [];
  }
}
