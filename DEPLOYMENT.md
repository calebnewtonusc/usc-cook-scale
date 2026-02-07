# USC Cook Scale - Vercel Deployment Guide

## Quick Deploy Steps

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Anthropic API key (get from [console.anthropic.com](https://console.anthropic.com))

### Option 1: Deploy from GitHub (Recommended)

1. **Push code to GitHub**
```bash
cd ~/usc-cook-scale
git init
git add .
git commit -m "Initial commit: USC Cook Scale app"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy Backend to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select "backend" as the root directory
   - Add environment variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: Your Claude API key (starts with `sk-ant-...`)
   - Click "Deploy"
   - Save your backend URL (e.g., `https://your-backend.vercel.app`)

3. **Deploy Frontend to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new) again
   - Import the same GitHub repository
   - Select "frontend" as the root directory
   - Add environment variable:
     - Name: `VITE_API_URL`
     - Value: Your backend URL from step 2
   - Click "Deploy"
   - Your app is live! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy Backend**
```bash
cd ~/usc-cook-scale/backend
vercel
```
   - Follow prompts
   - Set `ANTHROPIC_API_KEY` environment variable in Vercel dashboard
   - Note the deployment URL

4. **Deploy Frontend**
```bash
cd ~/usc-cook-scale/frontend
```
   - First, update `.env` with your backend URL:
```bash
echo "VITE_API_URL=https://your-backend-url.vercel.app" > .env
```
   - Then deploy:
```bash
vercel
```

## Environment Variables Setup

### Backend Variables (Required)
Set these in Vercel project settings → Environment Variables:

- `ANTHROPIC_API_KEY` - Your Claude API key
  - Get from: https://console.anthropic.com/
  - Format: `sk-ant-api03-...`
  - Important: Keep this secret!

### Frontend Variables (Required)
- `VITE_API_URL` - Your backend API URL
  - Format: `https://your-backend.vercel.app`
  - Do NOT include trailing slash

## Post-Deployment Steps

1. **Test the app**
   - Visit your frontend URL
   - Try manual entry with sample data:
     - Course: CSCI 104
     - Professor: Mark Redekopp
     - Units: 4
   - Verify you get a Cook Scale score

2. **Update production URLs**
   - If you change the backend URL, update frontend env var
   - Redeploy frontend after updating env vars

## Vercel Project Structure

```
GitHub Repo
├── backend/          → Vercel Project 1 (API)
│   └── vercel.json   → Backend config
└── frontend/         → Vercel Project 2 (Web App)
    └── vercel.json   → Frontend config (auto-detected by Vite)
```

## Troubleshooting

### Backend Issues

**Error: "Failed to analyze schedule"**
- Check if `ANTHROPIC_API_KEY` is set correctly in Vercel
- Verify API key has credits
- Check Vercel function logs

**Error: "CORS policy"**
- Backend's CORS is configured to allow all origins
- Check backend URL is correct in frontend env

### Frontend Issues

**Error: "Network Error" or "Failed to fetch"**
- Check `VITE_API_URL` is set correctly
- Make sure backend URL doesn't have trailing slash
- Verify backend is deployed and accessible

**Build fails with Tailwind errors**
- Should be fixed, but if issues persist:
- Make sure `tailwindcss@^3` is installed (not v4)
- Check `postcss.config.js` uses `tailwindcss: {}`

### RateMyProfessors Scraping

**Professors not found**
- RMP may rate-limit or block requests
- This is expected for some professors
- Score will fall back to class type only

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatic

## Cost

- **Vercel**: Free tier includes:
  - 100 GB bandwidth/month
  - Unlimited requests
  - Hobby projects

- **Anthropic API**:
  - Claude Sonnet 4.5: $3 per million input tokens
  - Typical request: ~500 tokens
  - Estimate: $0.0015 per schedule analysis
  - $5 credit = ~3,300 analyses

## Performance Tips

1. **Backend**:
   - RMP scraping can be slow (2-3 seconds per professor)
   - Consider adding caching in future versions

2. **Frontend**:
   - Large PDF.js bundle (~800KB)
   - Consider lazy loading PDF/ICS parsers
   - Use code splitting for future features

## Security Notes

1. **Never commit `.env` files** - already in `.gitignore`
2. **Keep API keys secret** - only set in Vercel dashboard
3. **RMP scraping** - may violate their ToS, use at own risk
4. **CORS** - Currently allows all origins, lock down in production

## Monitoring

- View logs in Vercel dashboard
- Check function execution time
- Monitor API usage in Anthropic console
- Set up usage alerts for API costs

## Next Steps

After deployment:
- Share the URL with USC students
- Gather feedback
- Monitor API costs
- Consider adding features from README.md

---

Need help? Check [Vercel Docs](https://vercel.com/docs) or [Anthropic Docs](https://docs.anthropic.com)
