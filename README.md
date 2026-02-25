# USC Cook Scale

![React](https://img.shields.io/badge/React-TypeScript-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-frontend-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-Sonnet%204.5-8A2BE2)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-yellow)

AI-powered USC semester difficulty analyzer. Upload your WebReg PDF (or paste a schedule) and get a "Cooked Scale" score from 0 to 100 combining live RateMyProfessors data, Reddit discussions, and Claude-powered workload analysis.

**Live app:** [usc-cook-scale.vercel.app](https://usc-cook-scale.vercel.app)

> Screenshot

> **Note:** This is an independent student project, not affiliated with the University of Southern California or RateMyProfessors.

## Features

- **WebReg PDF parsing**: upload your official USC schedule export and the app automatically extracts registered courses (not course-bin items), with zero manual entry
- **Claude-powered analysis**: Claude Sonnet 4.5 scores each class for difficulty considering USC-specific course reputation, professor data, and workload synergy between courses
- **Live RateMyProfessors data**: real professor ratings, difficulty scores, and "would take again" percentages fetched via GraphQL with intelligent name-format matching
- **Reddit integration**: surfaces relevant r/USC threads per course with upvote counts and direct links
- **Composite Cooked Scale**: 0 to 100 score combining base class difficulty, professor multiplier, and unit weight, with verbal labels from "Raw" to "Absolutely Burnt"
- **Universal file support**: accepts PDFs (PDF.js), images (Claude Vision), ICS calendar files, or plain text

## Scoring System

```
Class Score = Base Score × Professor Factor × Unit Factor

Base:      STEM = 60 pts  |  Humanities = 30 pts
Professor: 0.5 to 2.0x based on RMP quality, difficulty, would-take-again
Units:     normalized to 4-unit standard (2 units = 0.5x, 6 units = 1.5x)

Overall:   sum of class scores, normalized to 0 to 100
```

| Score | Label |
|---|---|
| 0 to 20 | Raw (easy schedule) |
| 21 to 35 | Lightly Toasted |
| 36 to 50 | Medium |
| 51 to 65 | Well Done |
| 66 to 80 | Extra Crispy |
| 81 to 100 | Absolutely Burnt |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, PDF.js, ical.js |
| Backend | Node.js, Express, TypeScript |
| AI | Anthropic Claude Sonnet 4.5 (schedule parsing, course analysis, vision) |
| Data | RateMyProfessors GraphQL API, Reddit scraping (Cheerio) |
| Deployment | Vercel (frontend + backend as separate projects) |

## Getting Started

### Prerequisites

- Node.js 18+
- Anthropic API key: [console.anthropic.com](https://console.anthropic.com)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Set ANTHROPIC_API_KEY in .env
npm run dev
# Runs on http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:3001
npm run dev
# Runs on http://localhost:5173
```

### Deploy to Vercel

Deploy frontend and backend as separate Vercel projects. Set `ANTHROPIC_API_KEY` in the backend project's environment variables, then set `VITE_API_URL` in the frontend to point at the deployed backend URL.

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/parse-schedule` | POST | Parse schedule text/PDF into structured course list |
| `/api/analyze-schedule` | POST | Score a course list and return Cooked Scale result |

## Author

**Caleb Newton** | [calebnewton.me](https://calebnewton.me) | [GitHub](https://github.com/calebnewtonusc)
