import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface RedditPost {
  title: string;
  url: string;
  score: number;
  excerpt: string;
  subreddit: string;
}

interface ResearchResult {
  professor: string;
  courseName: string;
  redditMentions: RedditPost[];
  rmpLink: string | null;
  redditSearchLink: string;
  courseSearchLink: string;
  summary: string;
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
    const { professor, courseName } = req.body;

    if (!professor || !courseName) {
      return res.status(400).json({ error: 'Professor and courseName required' });
    }

    console.log(`Researching: ${professor} for ${courseName}`);

    // Search Reddit for mentions
    const redditMentions = await searchReddit(professor, courseName);

    // Generate RMP link
    const rmpLink = generateRMPLink(professor);

    // Generate search links
    const redditSearchLink = `https://www.reddit.com/r/USC/search/?q=${encodeURIComponent(professor + ' ' + courseName)}`;
    const courseSearchLink = `https://www.google.com/search?q=${encodeURIComponent(`USC ${courseName} ${professor} review`)}`;

    const result: ResearchResult = {
      professor,
      courseName,
      redditMentions,
      rmpLink,
      redditSearchLink,
      courseSearchLink,
      summary: generateSummary(redditMentions)
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error researching professor:', error);
    return res.status(500).json({
      error: 'Failed to research professor',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

async function searchReddit(professor: string, courseName: string): Promise<RedditPost[]> {
  try {
    // Use Reddit's JSON API (no auth needed for public search)
    const query = `${professor} ${courseName}`;
    const searchUrl = `https://www.reddit.com/r/USC/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&limit=10&sort=relevance`;

    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; USCCookScale/1.0)'
      },
      timeout: 5000
    });

    const posts = response.data?.data?.children || [];

    return posts
      .filter((post: any) => post.data && post.data.title)
      .slice(0, 5)
      .map((post: any) => ({
        title: post.data.title,
        url: `https://www.reddit.com${post.data.permalink}`,
        score: post.data.score || 0,
        excerpt: post.data.selftext?.substring(0, 200) || '',
        subreddit: post.data.subreddit
      }));
  } catch (error) {
    console.error('Reddit search error:', error);
    return [];
  }
}

function generateRMPLink(professor: string): string | null {
  try {
    // Generate RateMyProfessors search URL
    const searchQuery = encodeURIComponent(`${professor} USC`);
    return `https://www.ratemyprofessors.com/search/professors/1381?q=${searchQuery}`;
  } catch {
    return null;
  }
}

function generateSummary(mentions: RedditPost[]): string {
  if (mentions.length === 0) {
    return 'No Reddit discussions found. This could mean the professor is new or the class is less commonly discussed.';
  }

  const totalScore = mentions.reduce((sum, m) => sum + m.score, 0);
  const avgScore = Math.round(totalScore / mentions.length);

  return `Found ${mentions.length} Reddit discussions with average ${avgScore} upvotes. Check the links below for student experiences and insights.`;
}
