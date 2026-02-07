# Vercel Deployment Checklist ✅

## Pre-Deployment Verification

### ✅ Code Quality
- [x] Backend builds successfully (`npm run build` in backend/)
- [x] Frontend builds successfully (`npm run build` in frontend/)
- [x] TypeScript compiles with no errors
- [x] All dependencies installed
- [x] No hardcoded localhost URLs (only as fallbacks)

### ✅ Security
- [x] `.env` files NOT in git repository
- [x] `.env.example` files present for reference
- [x] API keys stored securely (will be in Vercel env vars)
- [x] `.gitignore` properly configured

### ✅ Configuration Files
- [x] `backend/vercel.json` - Serverless function config
- [x] `backend/api/index.ts` - Vercel entry point
- [x] `frontend/vercel.json` - Vite build config
- [x] `README.md` - Documentation
- [x] `package.json` - Both frontend and backend

### ✅ Error Handling
- [x] RMP scraper has try-catch with null fallback
- [x] Claude API calls wrapped in error handling
- [x] Frontend handles API errors gracefully
- [x] CORS properly configured

### ✅ Functionality
- [x] PDF parsing (via Claude AI)
- [x] ICS parsing (via ical.js)
- [x] Manual entry
- [x] Class type detection (STEM vs Humanities)
- [x] Professor rating scraping (RateMyProfessors)
- [x] Scoring algorithm
- [x] Beautiful UI with red/yellow theme

## Vercel Deployment Steps

### Backend Deployment

1. **Import from GitHub**
   - Go to https://vercel.com/new
   - Select: `calebnewtonusc/usc-cook-scale`
   - Root Directory: `backend`
   - Framework Preset: Other

2. **Environment Variables** (CRITICAL!)
   ```
   ANTHROPIC_API_KEY = sk-ant-api03-ywk0V... (your full API key)
   ```

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: (leave default)
   - Install Command: `npm install`

4. **Deploy!**
   - Click "Deploy"
   - Wait ~1-2 minutes
   - Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

### Frontend Deployment

1. **Import from GitHub**
   - Go to https://vercel.com/new again
   - Select: `calebnewtonusc/usc-cook-scale`
   - Root Directory: `frontend`
   - Framework Preset: Vite

2. **Environment Variables** (CRITICAL!)
   ```
   VITE_API_URL = https://your-backend.vercel.app
   ```
   (Use the backend URL from step 1)

3. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy!**
   - Click "Deploy"
   - Wait ~1-2 minutes
   - Your app is live! 🎉

## Post-Deployment Testing

### Test Backend API
```bash
# Health check
curl https://your-backend.vercel.app/health

# Test analyze endpoint
curl -X POST https://your-backend.vercel.app/api/analyze-schedule \
  -H "Content-Type: application/json" \
  -d '{
    "classes": [{
      "courseName": "CSCI 104",
      "professor": "Mark Redekopp",
      "units": 4
    }]
  }'
```

### Test Frontend
1. Visit your frontend URL
2. Try **Manual Entry**:
   - Course: CSCI 104
   - Professor: Mark Redekopp
   - Units: 4
3. Click "Calculate Cook Scale"
4. Verify you get a score (should be ~70-85)

### Test All Upload Methods
- ✅ PDF Upload (try with a sample USC schedule)
- ✅ ICS Upload (export calendar and upload)
- ✅ Manual Entry (add 3-4 classes)

## Troubleshooting

### Backend Issues

**"Failed to analyze schedule"**
- Check Vercel logs: Project → Deployments → Click deployment → Functions tab
- Verify ANTHROPIC_API_KEY is set correctly
- Check API key has credits: https://console.anthropic.com/

**"Professor not found"**
- Normal! RMP may not have data for all professors
- Score will fallback to class type only
- Not an error

**CORS errors**
- Backend CORS is configured to allow all origins
- Should work out of the box

### Frontend Issues

**"Network Error" or can't connect to backend**
- Check VITE_API_URL is set correctly in Vercel
- Make sure it's your backend URL (no trailing slash)
- Verify backend is deployed and working

**Build fails**
- Check Vercel build logs
- Verify all dependencies in package.json
- Try building locally first: `npm run build`

## Success Criteria

✅ Backend health endpoint returns 200 OK
✅ Frontend loads without errors
✅ Can submit a schedule and get a Cook Scale score
✅ Score includes professor ratings (or gracefully handles missing data)
✅ UI displays properly (red/yellow theme, responsive)
✅ All three upload methods work

## Monitoring

### Set Up Alerts
1. **Anthropic Console**: https://console.anthropic.com/
   - Settings → Usage → Set billing alert at $10

2. **Vercel Dashboard**
   - Monitor function executions
   - Check error rates
   - View logs for debugging

### Expected Costs
- **Vercel**: Free (Hobby plan)
- **Claude API**: ~$0.005 per schedule analysis
  - 100 students/day = ~$0.50/day = ~$15/month

## You're Ready! 🚀

Everything is configured and tested. Your app is production-ready.

### Current Status:
- ✅ Code committed to GitHub
- ✅ Builds working
- ✅ Error handling robust
- ✅ Security configured
- ✅ Documentation complete

**Next step**: Import the repo to Vercel and set environment variables!

---

**GitHub Repo**: https://github.com/calebnewtonusc/usc-cook-scale
**Live Demo** (current): https://frontend-pi-nine-23.vercel.app
