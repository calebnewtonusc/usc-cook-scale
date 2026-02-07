# USC Cook Scale - Project Complete! 🔥

Hey Mark! Your USC Cook Scale app is ready to deploy. Here's everything you need to know.

## What We Built

A full-stack web app that analyzes USC students' course schedules and gives them a "Cook Scale" score from 0-100 based on:
- **Class difficulty** (STEM vs Humanities)
- **Professor ratings** from RateMyProfessors (quality, difficulty, would take again %)
- **Total units** taken

### Features Delivered

✅ **Multiple upload methods**:
- PDF upload (with AI parsing via Claude)
- ICS/calendar file upload
- Manual entry form

✅ **AI-powered analysis**:
- Claude AI determines STEM vs Humanities
- Claude AI parses PDF schedules
- Smart scoring algorithm

✅ **RateMyProfessors integration**:
- Scrapes professor ratings
- Combines quality, difficulty, and would-take-again scores
- Falls back gracefully if prof not found

✅ **Beautiful UI**:
- Red and yellow color scheme
- Clean, modern design
- Mobile responsive
- Animated score reveal
- Detailed breakdown per class

✅ **Production ready**:
- TypeScript for type safety
- Error handling
- Loading states
- Vercel deployment config

## Tech Stack

**Frontend**: React + TypeScript + Vite + Tailwind CSS
**Backend**: Node.js + Express + TypeScript
**AI**: Anthropic Claude Sonnet 4.5
**Hosting**: Vercel (both frontend and backend)

## File Structure

```
~/usc-cook-scale/
├── frontend/              React app
│   ├── src/
│   │   ├── components/    UI components
│   │   ├── services/      API calls & file parsers
│   │   ├── types/         TypeScript types
│   │   ├── App.tsx        Main app
│   │   └── index.css      Tailwind styles
│   ├── .env               Frontend config (needs backend URL)
│   └── package.json
│
├── backend/               Express API
│   ├── src/
│   │   ├── services/      Claude, RMP scraper, scoring
│   │   ├── routes/        API endpoints
│   │   ├── types/         TypeScript types
│   │   └── server.ts      Express server
│   ├── .env               Backend config (needs Claude API key)
│   ├── vercel.json        Vercel config
│   └── package.json
│
├── README.md              Full documentation
├── DEPLOYMENT.md          Deployment guide
└── .gitignore             Git ignore rules
```

## Quick Start Guide

### 1. Get Your Claude API Key

1. Go to https://console.anthropic.com/
2. Sign up / Log in
3. Go to API Keys section
4. Create a new key
5. Copy it (starts with `sk-ant-...`)
6. **Important**: Add credits to your account

### 2. Set Up Locally (Optional - for testing)

```bash
# Backend
cd ~/usc-cook-scale/backend
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env
npm run dev

# Frontend (in new terminal)
cd ~/usc-cook-scale/frontend
echo "VITE_API_URL=http://localhost:3001" > .env
npm run dev
```

Visit http://localhost:5173

### 3. Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps, but quick version:

1. Push code to GitHub
2. Import to Vercel (create 2 projects: backend + frontend)
3. Set environment variables:
   - Backend: `ANTHROPIC_API_KEY`
   - Frontend: `VITE_API_URL`
4. Deploy!

Or use CLI:
```bash
cd backend && vercel
cd frontend && vercel
```

## How It Works

1. **Student uploads schedule** → PDF, ICS, or manual entry
2. **Frontend parses file** → Extracts class names, professors, units
3. **Backend receives data** → Array of classes
4. **For each class**:
   - Claude determines if STEM or Humanities
   - RMP scraper finds professor ratings
   - Scoring algorithm calculates class score
5. **Returns result** → Overall score + breakdown
6. **Frontend displays** → Cook Scale score with explanations

## Scoring Formula

```
Class Score = Base Score × Professor Factor × Unit Factor

Base Score:
- STEM: 60 points
- Humanities: 30 points

Professor Factor (0.5 to 2.0):
- Based on RMP: quality (inverted), difficulty, would-take-again %
- No professor data? Use 1.0 (base score unchanged)

Unit Factor:
- Units / 4 (normalized to 4-unit standard)
- 2 units = 0.5x, 4 units = 1.0x, 8 units = 2.0x

Overall Score:
- Sum all class scores
- Normalize to 0-100 based on typical hard semester
```

## Cook Scale Legend

- **0-20**: Raw 🥩 - Easy peasy
- **21-35**: Lightly Toasted 🍞 - Manageable
- **36-50**: Medium 🍳 - Moderate
- **51-65**: Well Done 🥓 - Challenging
- **66-80**: Extra Crispy 🔥 - Very hard
- **81-100**: Absolutely Burnt 💀 - RIP your social life

## API Endpoints

### `POST /api/analyze-schedule`
Analyzes schedule, returns Cook Scale score

**Request**:
```json
{
  "classes": [
    {
      "courseName": "CSCI 104",
      "professor": "Mark Redekopp",
      "units": 4
    }
  ]
}
```

**Response**:
```json
{
  "overallScore": 78,
  "verbalLabel": "Extra Crispy 🔥",
  "totalUnits": 16,
  "classes": [...]
}
```

### `POST /api/parse-schedule`
Parses PDF text into structured data

**Request**:
```json
{
  "scheduleText": "CSCI 104 - Mark Redekopp..."
}
```

**Response**:
```json
{
  "classes": [...]
}
```

## Important Notes

### Claude API Usage
- Each schedule analysis = ~1,500-2,000 tokens (all classes combined)
- Cost: ~$0.005 per analysis (half a cent)
- $5 gets you ~1,000 analyses

### RateMyProfessors Scraping
- May be slow (2-3 seconds per professor)
- May get rate limited or blocked
- Uses their GraphQL API (semi-official)
- **Legal grey area** - use at your own risk
- Falls back gracefully if scraping fails

### Limitations (V1)
- USC only (hardcoded school ID: 1381)
- No user accounts or saved schedules
- No course catalog database
- RMP scraping may be unreliable
- PDF parsing depends on format

## Future Enhancements

Want to take it further? Consider adding:
- [ ] User accounts (save schedules, track over time)
- [ ] USC course catalog integration
- [ ] Compare to average student
- [ ] Schedule recommendations
- [ ] Multi-university support
- [ ] Historical grade data
- [ ] Social features (share scores)
- [ ] Chrome extension for WeReg
- [ ] Rate limiting / caching for RMP

## Troubleshooting

**"Failed to analyze schedule"**
→ Check Claude API key is set and has credits

**"Professor not found"**
→ Normal - score falls back to class type only

**Build errors**
→ Make sure Tailwind v3 is installed, not v4

**CORS errors**
→ Check backend URL in frontend .env

**Slow analysis**
→ RMP scraping is slow, consider caching

## Cost Estimates

**Vercel** (Free tier):
- ✅ 100 GB bandwidth/month
- ✅ Unlimited requests
- ✅ Serverless functions

**Claude API** (Pay as you go):
- ~$0.005 per schedule analysis
- $5 = ~1,000 analyses
- Set up billing alerts!

**Total for 100 users/day** = ~$15/month

## Launch Checklist

Before sharing widely:

- [ ] Test with real USC schedule PDFs
- [ ] Test with various professors
- [ ] Check Claude API billing alerts set up
- [ ] Monitor initial usage
- [ ] Have backup plan if RMP blocks you
- [ ] Consider rate limiting
- [ ] Add analytics (optional)
- [ ] Custom domain (optional)

## Support

Need help?
- **README.md** - Full documentation
- **DEPLOYMENT.md** - Deployment guide
- **Vercel Docs**: https://vercel.com/docs
- **Claude Docs**: https://docs.anthropic.com

## Share It!

Once deployed:
1. Share on USC Discord servers
2. Post in Facebook groups
3. Reddit r/USC
4. Word of mouth

Make sure to:
- Set API usage alerts
- Monitor costs
- Gather feedback
- Iterate!

---

**You're all set!** 🎉

The app is ready to deploy. Just need your Claude API key to get started. Let me know if you have any questions!

Good luck with the launch! 🔥
