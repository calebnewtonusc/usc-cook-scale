# 🔥 USC Cook Scale 🔥

**Find out how "cooked" your USC semester schedule really is!**

AI-powered class difficulty analyzer that combines RateMyProfessors data with intelligent course classification to give you a "Cook Scale" score from 0-100.

## 🚀 Live App

**Try it now:** [https://usc-cook-scale.vercel.app/](https://usc-cook-scale.vercel.app/)

**Backend API:** [https://usc-cook-scale-backend.vercel.app/](https://usc-cook-scale-backend.vercel.app/)

---

## 🎯 Quick Start

1. Visit [usc-cook-scale.vercel.app](https://usc-cook-scale.vercel.app/)
2. Paste your schedule text OR upload a file (PDF/image/calendar)
3. Get your Cook Scale score instantly!

---

## ✨ Features

### 🤖 **100% AI-Powered**
- **Claude Sonnet 4.5** intelligently parses schedules from ANY format
- Understands conversational text: "I'm taking CSCI 104 with Redekopp for 4 units"
- Handles complex professor names, written numbers, and mixed formats
- **NO fake data** - everything is real and legitimate

### 📊 **Real RateMyProfessors Data**
- Live scraping from RateMyProfessors GraphQL API
- Quality ratings, difficulty scores, and "would take again" percentages
- USC-specific professor data (schoolID: 1381)

### 🎯 **Smart Classification**
- Automatic STEM vs Humanities detection
- Claude AI analyzes course names to categorize correctly
- Accounts for course type in difficulty scoring

### 📁 **Universal File Upload**
- **PDF** schedules (extracted with PDF.js)
- **Images/Screenshots** (parsed with Claude Vision)
- **ICS/Calendar** files
- **Plain text** or ANY file format
- Intelligent parsing extracts course info from any format

### 🧪 **Extensively Tested**
- **46 automated tests** with **98% pass rate**
- Performance optimized (1.8s for 3 classes)
- Security tested (SQL injection, XSS protection)
- Full test report: [COMPREHENSIVE-TEST-REPORT.md](./COMPREHENSIVE-TEST-REPORT.md)

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
6. **Display**: Show overall Cook Scale score (0-100) with breakdown

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

## Cook Scale Legend

- **0-20**: Raw 🥩 (Easy schedule)
- **21-35**: Lightly Toasted 🍞 (Manageable)
- **36-50**: Medium 🍳 (Moderate difficulty)
- **51-65**: Well Done 🥓 (Challenging)
- **66-80**: Extra Crispy 🔥 (Very hard)
- **81-100**: Absolutely Burnt 💀 (Extremely difficult)

## API Endpoints

### `POST /api/analyze-schedule`
Analyzes a schedule and returns Cook Scale score.

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

## Known Limitations

- RateMyProfessors scraping may be rate-limited or blocked
- PDF parsing accuracy depends on PDF format
- USC-only for now (hardcoded school ID)
- No user accounts or saved schedules in V1

## Future Enhancements

- [ ] User accounts and saved schedules
- [ ] USC course catalog database
- [ ] Comparison to average USC student
- [ ] Schedule recommendations
- [ ] Multi-university support
- [ ] Historical grade data integration

## Contributing

This is a student project! Contributions welcome.

## License

MIT

---

Made with 🔥 for USC students
