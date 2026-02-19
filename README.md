# 🔥 USC Cooked Scale 🔥

**Find out how "cooked" your USC semester schedule really is!**

AI-powered class difficulty analyzer that combines RateMyProfessors data with intelligent course classification to give you a "Cooked Scale" score from 0-100.

## ⚠️ IMPORTANT DISCLAIMERS

**This is an independent student project created for educational purposes.**

- **NOT AFFILIATED:** This project is not affiliated with, endorsed by, or connected to the University of Southern California (USC), RateMyProfessors, Reddit, or any other institution or service.
- **EDUCATIONAL PURPOSE:** Created as a student learning project for educational and informational purposes only.
- **SUBJECTIVE ESTIMATES:** All difficulty scores are subjective algorithmic estimates and should not be considered definitive or official assessments.
- **DATA ACCURACY:** Data may be incomplete, outdated, or incorrect. Always verify information with official university sources.
- **USC TRADEMARK:** "USC" and "University of Southern California" are trademarks of the University of Southern California. Use of these terms is solely for descriptive purposes.
- **NO GUARANTEES:** This is a student project with limited resources. We make no guarantees about accuracy, availability, or reliability.

## 🚀 Live App

**Try it now:** [https://usc-cook-scale.vercel.app/](https://usc-cook-scale.vercel.app/)

**Backend API:** [https://usc-cook-scale-backend.vercel.app/](https://usc-cook-scale-backend.vercel.app/)

---

## 🎯 Quick Start

### **For USC Students:**
1. Go to WebReg → Print/Save your schedule as PDF
2. Visit [usc-cook-scale.vercel.app](https://usc-cook-scale.vercel.app/)
3. Upload your WebReg PDF
4. Get instant Cooked Scale analysis! 🔥

**Or manually:** Paste your schedule text OR upload any file (PDF/image/calendar)

---

## ✨ Features

### 🎓 **USC WebReg PDF Support**
- **Smart parsing** of USC's official WebReg PDFs
- Automatically distinguishes **registered courses** from course bin items
- Only analyzes classes you're actually taking, not ones you're considering
- Zero manual entry needed - just download and upload!
- See [WEBREG-PARSER-FEATURE.md](./WEBREG-PARSER-FEATURE.md) for details

### 🤖 **V2: Enhanced AI-Powered Analysis** (NEW!)
- **Claude Sonnet 4.5** with robust JSON parsing and error handling
- **Intelligent professor matching** with name format parsing ("Last, First" → "First Last")
- **LLM-powered course difficulty analysis** considering USC-specific reputation and workload
- **USC course database** with known difficult courses (CSCI-104: 85, MATH-226: 75, etc.)
- **Transparent error tracking** - see exactly what data is available vs fallback estimates
- **Best match selection** - automatically chooses professors with most reviews for accuracy

### 📊 **Real Student Data & Insights**
- **Live RateMyProfessors data** via GraphQL API with verified professor matching
- **Real student review quotes** extracted and displayed with ratings and course context
- **Reddit discussions** from r/USC with upvote counts and direct links
- **AI-generated insights** synthesizing all data sources for each class
- **Personalized survival tips** based on actual student experiences and professor ratings
- USC-specific data (schoolID: 1381) with confidence scoring

### 🎯 **Intelligent Overall Analysis**
- **LLM-powered workload synergy detection** - understands compound difficulty
- **Contextual reasoning** about time management, exam schedules, and study balance
- **Dynamic verbal labels** with nuanced explanations (not just score averages)
- **Warnings and strengths** highlighting specific challenges and advantages

### 📁 **Universal File Upload**
- **PDF** schedules (extracted with PDF.js)
- **Images/Screenshots** (parsed with Claude Vision)
- **ICS/Calendar** files
- **Plain text** or ANY file format
- Intelligent parsing extracts course info from any format

### 🧪 **Thoroughly Tested**
- **Comprehensive API validation** ensuring reliable endpoint functionality
- Performance optimized (typically 1.8s for 3 classes)
- Basic security measures (SQL injection, XSS protection)
- Full test report: [COMPREHENSIVE-TEST-REPORT.md](./COMPREHENSIVE-TEST-REPORT.md)
- **Note:** As a student project, testing is best-effort and not production-grade

## Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- PDF.js for PDF parsing
- ical.js for calendar parsing

### Backend
- Node.js + Express
- TypeScript
- Anthropic Claude API
- Cheerio for web scraping
- Axios

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Add your Anthropic API key to `.env`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
PORT=3001
```

5. Start the development server:
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure API URL in `.env`:
```
VITE_API_URL=http://localhost:3001
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Deploying to Vercel

### Backend Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to backend directory:
```bash
cd backend
```

3. Deploy to Vercel:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add `ANTHROPIC_API_KEY` with your Claude API key

5. Note your backend URL (e.g., `https://your-backend.vercel.app`)

### Frontend Deployment

1. Update frontend `.env` with your backend URL:
```
VITE_API_URL=https://your-backend.vercel.app
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Deploy to Vercel:
```bash
vercel
```

4. Your app is live! 🎉

### Alternative: Deploy Both from GitHub

1. Push your code to GitHub
2. Import project to Vercel from GitHub
3. Create two separate projects:
   - One for `backend` folder
   - One for `frontend` folder
4. Add environment variables in Vercel dashboard

## Environment Variables

### Backend
- `ANTHROPIC_API_KEY` (required): Your Anthropic API key
- `PORT` (optional): Server port, defaults to 3001

### Frontend
- `VITE_API_URL` (required): Backend API URL

## How It Works

1. **Upload**: Student uploads their schedule (PDF, ICS, or manual entry)
2. **Parse**: If PDF/ICS, Claude AI extracts class information
3. **Classify**: Claude determines if each class is STEM or Humanities
4. **Scrape**: Backend scrapes RateMyProfessors for each professor
5. **Calculate**: Scoring algorithm combines:
   - Base difficulty (STEM = 60pts, Humanities = 30pts)
   - Professor multiplier (based on quality, difficulty, would-take-again)
   - Unit multiplier (normalized to 4-unit standard)
6. **Display**: Show overall Cooked Scale score (0-100) with breakdown

## Scoring Algorithm

```
Class Score = Base Score × Professor Factor × Unit Factor

Base Score:
- STEM classes: 60 points
- Humanities classes: 30 points

Professor Factor (0.5 to 2.0):
- Based on RateMyProfessor ratings:
  - Quality (lower = harder)
  - Difficulty (higher = harder)
  - Would Take Again % (lower = harder)

Unit Factor:
- Normalized to 4-unit standard
- 2 units = 0.5x, 4 units = 1.0x, 6 units = 1.5x

Overall Score:
- Sum of all class scores
- Normalized to 0-100 scale
```

## Cooked Scale Legend

- **0-20**: Raw 🥩 (Easy schedule)
- **21-35**: Lightly Toasted 🍞 (Manageable)
- **36-50**: Medium 🍳 (Moderate difficulty)
- **51-65**: Well Done 🥓 (Challenging)
- **66-80**: Extra Crispy 🔥 (Very hard)
- **81-100**: Absolutely Burnt 💀 (Extremely difficult)

## API Endpoints

### `POST /api/analyze-schedule`
Analyzes a schedule and returns Cooked Scale score.

**Request Body:**
```json
{
  "classes": [
    {
      "courseName": "CSCI 104",
      "professor": "John Smith",
      "units": 4,
      "type": "STEM" // optional
    }
  ]
}
```

**Response:**
```json
{
  "overallScore": 78,
  "verbalLabel": "Extra Crispy 🔥",
  "totalUnits": 16,
  "classes": [...]
}
```

### `POST /api/parse-schedule`
Parses schedule text (from PDF) into structured data.

**Request Body:**
```json
{
  "scheduleText": "CSCI 104 - John Smith - 4 units..."
}
```

**Response:**
```json
{
  "classes": [
    {
      "courseName": "CSCI 104",
      "professor": "John Smith",
      "units": 4
    }
  ]
}
```

## Known Limitations & Warnings

### Data & Accuracy
- **Subjective scores:** All difficulty ratings are algorithmic estimates, not definitive assessments
- **Data may be incomplete or outdated:** Third-party data sources may have missing, incorrect, or old information
- **No official verification:** We cannot verify the accuracy of scraped data from RateMyProfessors, Reddit, etc.
- **Professor matching:** Name matching is best-effort and may occasionally be incorrect

### Technical Limitations
- **RateMyProfessors rate limiting:** Scraping may be rate-limited or blocked during heavy usage
- **PDF parsing:** Accuracy depends on PDF format; some formats may not parse correctly
- **No rate limiting protection:** Currently lacks comprehensive rate limiting (see Security Warnings below)
- **USC-only:** Hardcoded for USC (school ID: 1381); not compatible with other universities
- **No user accounts:** No saved schedules or historical data in current version
- **Student project resources:** Limited server resources, no SLA or uptime guarantees

### Security Warnings

⚠️ **IMPORTANT:** This is a student project with basic security measures but not production-grade security:

1. **No rate limiting implemented:** Currently vulnerable to abuse. Excessive requests may overwhelm the API.
2. **API key exposure risk:** Backend relies on Anthropic API keys. Protect your `.env` files.
3. **Third-party dependencies:** Security depends on external services (RateMyProfessors, Reddit, Claude AI)
4. **Limited monitoring:** No comprehensive logging or abuse detection systems

**If deploying publicly, implement rate limiting immediately.** See [RATE_LIMITING.md](./RATE_LIMITING.md) for setup instructions.

## Future Enhancements

- [ ] User accounts and saved schedules
- [ ] USC course catalog database
- [ ] Comparison to average USC student
- [ ] Schedule recommendations
- [ ] Multi-university support
- [ ] Historical grade data integration

## Legal Pages

- [Privacy Policy](/frontend/src/components/PrivacyPolicy.tsx)
- [Terms of Service](/frontend/src/components/TermsOfService.tsx)

## Contributing

This is a student project! Contributions welcome. However, please note this is primarily an educational project and may not be actively maintained.

## License

MIT License - See LICENSE file for details

## Disclaimer (Repeated for Emphasis)

**This is an independent student project.** We are not affiliated with, endorsed by, or connected to:
- University of Southern California (USC)
- RateMyProfessors
- Reddit
- Any other institution or service mentioned

All information is provided "AS IS" for educational purposes only. No warranties or guarantees are made regarding accuracy, completeness, or reliability. Always verify information with official university sources before making academic decisions.

"USC" and "University of Southern California" are trademarks of the University of Southern California.

---

Made with 🔥 for USC students by [Caleb Newton](https://calebnewton.me) - A Student Learning Project
