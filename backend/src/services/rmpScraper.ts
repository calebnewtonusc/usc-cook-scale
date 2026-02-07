import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProfessorRating } from '../types';

// RateMyProfessor GraphQL API endpoint (used by their website)
const RMP_GRAPHQL_URL = 'https://www.ratemyprofessors.com/graphql';

export async function getProfessorRating(professorName: string, school: string = 'USC'): Promise<ProfessorRating | null> {
  try {
    // RateMyProfessors uses a GraphQL API - we'll search for the professor
    // First, search for the school ID
    const schoolId = await getSchoolId(school);
    if (!schoolId) {
      console.log(`School ${school} not found on RMP`);
      return null;
    }

    // Search for professor by name at this school
    const professorData = await searchProfessor(professorName, schoolId);
    if (!professorData) {
      console.log(`Professor ${professorName} not found on RMP`);
      return null;
    }

    return professorData;
  } catch (error) {
    console.error('Error scraping RateMyProfessor:', error);
    return null;
  }
}

async function getSchoolId(schoolName: string): Promise<string | null> {
  try {
    // USC's RateMyProfessors school ID is known to be 1381
    // For other schools, we'd need to search, but for MVP let's hardcode USC
    if (schoolName.toUpperCase().includes('USC') || schoolName.toUpperCase().includes('SOUTHERN CALIFORNIA')) {
      return '1381';
    }
    return null;
  } catch (error) {
    console.error('Error getting school ID:', error);
    return null;
  }
}

async function searchProfessor(professorName: string, schoolId: string): Promise<ProfessorRating | null> {
  try {
    // Use RMP's GraphQL API
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
        schoolID: btoa(`School-${schoolId}`)
      }
    };

    const response = await axios.post(RMP_GRAPHQL_URL, query, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic dGVzdDp0ZXN0'
      }
    });

    const teachers = response.data?.data?.newSearch?.teachers?.edges;
    if (!teachers || teachers.length === 0) {
      return null;
    }

    // Take the first match (most relevant)
    const teacher = teachers[0].node;

    return {
      quality: teacher.avgRating || 0,
      difficulty: teacher.avgDifficulty || 0,
      wouldTakeAgain: teacher.wouldTakeAgainPercent || 0,
      numRatings: teacher.numRatings || 0
    };
  } catch (error) {
    // GraphQL API might fail, try web scraping as backup
    return scrapeProfessorPage(professorName);
  }
}

// Backup method: scrape the website directly
async function scrapeProfessorPage(professorName: string): Promise<ProfessorRating | null> {
  try {
    // Search for professor on RMP
    const searchUrl = `https://www.ratemyprofessors.com/search/professors/1381?q=${encodeURIComponent(professorName)}`;

    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // This is a simplified version - RMP's HTML structure may vary
    // In production, you'd want more robust selectors
    const firstResult = $('.TeacherCard__StyledTeacherCard-syjs0d-0').first();

    if (firstResult.length === 0) {
      return null;
    }

    // Extract ratings (these selectors are approximate and may need adjustment)
    const quality = parseFloat(firstResult.find('.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2').first().text()) || 0;
    const difficulty = parseFloat(firstResult.find('.CardFeedback__CardFeedbackNumber-lq6nix-2').first().text()) || 0;

    // For scraping, we might not get all data
    return {
      quality,
      difficulty,
      wouldTakeAgain: 50, // Default if not available
      numRatings: 1
    };
  } catch (error) {
    console.error('Error in backup scraping:', error);
    return null;
  }
}
