import type { VercelRequest, VercelResponse } from '@vercel/node';
import pdf from 'pdf-parse';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers - must be set before any return statements
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pdfBase64 } = req.body;

    if (!pdfBase64 || typeof pdfBase64 !== 'string') {
      return res.status(400).json({ error: 'Invalid request: pdfBase64 is required' });
    }

    console.log('Parsing PDF on server...');

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Parse PDF
    const data = await pdf(pdfBuffer);

    console.log(`Extracted ${data.text.length} characters from PDF`);

    return res.status(200).json({
      text: data.text,
      pages: data.numpages
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return res.status(500).json({
      error: 'Failed to parse PDF',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
