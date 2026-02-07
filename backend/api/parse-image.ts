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
    const { image, mediaType } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Invalid request: image base64 string is required' });
    }

    console.log('Parsing image with Claude Vision...');

    // Use Claude Vision to read the image
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-5-20250929'),
      maxTokens: 2000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              image: `data:${mediaType || 'image/png'};base64,${image}`,
            },
            {
              type: 'text',
              text: `You are an expert at reading college course schedules from screenshots, photos, or any image format.

Extract all courses from this image and return them as JSON. Be VERY intelligent and flexible:

- Look for course codes/names (e.g., "CSCI 104", "CHEM 105B", "WRIT 150")
- Find professor names (including complex names like "Consuelo-Siguenza Ortiz")
- Extract units (or estimate 4 units if not shown)
- Handle screenshots of WeReg, calendar apps, hand-written notes, or any format
- Ignore headers, footers, and irrelevant information

If this image does NOT contain any course schedule information, return: []

Return ONLY valid JSON array:
[{"courseName": "CSCI 104", "professor": "Redekopp", "units": 4}]

If there are absolutely NO courses in this image, or if the image is unclear/illegible, return: []`
            }
          ]
        }
      ]
    });

    // Extract JSON from response
    const jsonMatch = text.trim().match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : '[]';

    const classes = JSON.parse(jsonStr);

    console.log(`Parsed ${classes.length} classes from image`);

    return res.status(200).json({ classes });
  } catch (error) {
    console.error('Error parsing image:', error);
    return res.status(500).json({
      error: 'Failed to parse image',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
