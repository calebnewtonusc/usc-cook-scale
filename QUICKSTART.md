# Quick Start - USC Cook Scale

## Option 1: Test Locally Right Now (5 minutes)

### Step 1: Get Claude API Key
1. Go to https://console.anthropic.com/
2. Create an account / Sign in
3. Create an API key
4. Copy it (starts with `sk-ant-...`)

### Step 2: Set Up Backend
```bash
cd ~/usc-cook-scale/backend
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
echo "PORT=3001" >> .env
npm run dev
```

Keep this terminal running. You should see:
```
🔥 USC Cook Scale API running on http://localhost:3001
```

### Step 3: Set Up Frontend (New Terminal)
```bash
cd ~/usc-cook-scale/frontend
echo "VITE_API_URL=http://localhost:3001" > .env
npm run dev
```

### Step 4: Test It!
1. Open http://localhost:5173 in your browser
2. Click "Manual Entry" tab
3. Add a test class:
   - Course Name: **CSCI 104**
   - Professor: **Mark Redekopp**
   - Units: **4**
4. Click "Calculate Cook Scale"
5. Wait 5-10 seconds for analysis
6. See your Cook Scale score! 🔥

## Option 2: Deploy to Vercel (10 minutes)

### Step 1: Push to GitHub
```bash
cd ~/usc-cook-scale
git init
git add .
git commit -m "USC Cook Scale app"
# Create repo on GitHub, then:
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

### Step 2: Deploy Backend
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Root Directory: `backend`
4. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-your-key-here`
5. Click Deploy
6. **Copy the backend URL** (e.g., `https://your-app-backend.vercel.app`)

### Step 3: Deploy Frontend
1. Go to https://vercel.com/new again
2. Import same GitHub repo
3. Root Directory: `frontend`
4. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: Your backend URL from Step 2
5. Click Deploy
6. **Your app is live!** Share the URL 🎉

## Test Cases

Try these to verify it's working:

### Easy Schedule
- PSYC 100 - Random Prof - 4 units
- ENGL 101 - Random Prof - 4 units
- Expected: 20-35 (Lightly Toasted)

### Medium Schedule
- CSCI 102 - Random Prof - 4 units
- MATH 225 - Random Prof - 4 units
- ENGL 101 - Random Prof - 4 units
- Expected: 40-55 (Medium to Well Done)

### Hard Schedule
- CSCI 104 - Mark Redekopp - 4 units
- CSCI 170 - Random Prof - 4 units
- MATH 226 - Random Prof - 4 units
- PHYS 151 - Random Prof - 4 units
- Expected: 70-85 (Extra Crispy to Burnt)

### Absolute Hell
- EE 109 - Random Prof - 4 units
- CSCI 104 - Random Prof - 4 units
- MATH 226 - Random Prof - 4 units
- PHYS 161 - Random Prof - 4 units
- CHEM 105 - Random Prof - 4 units
- Expected: 90-100 (Absolutely Burnt 💀)

## Troubleshooting

### Backend won't start
```bash
# Check if API key is set
cd ~/usc-cook-scale/backend
cat .env
# Should show: ANTHROPIC_API_KEY=sk-ant-...
```

### Frontend won't connect to backend
```bash
# Check if backend URL is set
cd ~/usc-cook-scale/frontend
cat .env
# Should show: VITE_API_URL=http://localhost:3001
```

### "Failed to analyze schedule"
- Check backend logs in terminal
- Verify Claude API key has credits
- Check https://console.anthropic.com/ for API usage

### Analysis takes forever
- First request is slower (cold start)
- RMP scraping takes 2-3 seconds per professor
- Total time: 5-15 seconds depending on class count

## Next Steps

1. ✅ Test locally
2. ✅ Deploy to Vercel
3. 📊 Monitor Claude API usage at https://console.anthropic.com/
4. 💰 Set up billing alerts (recommended: $10 threshold)
5. 📢 Share with USC students!
6. 🔄 Gather feedback and iterate

## Need Help?

- Full documentation: [README.md](./README.md)
- Deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Complete overview: [SUMMARY.md](./SUMMARY.md)

---

**You're ready to go!** 🚀
