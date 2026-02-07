# 🔧 Troubleshooting Guide

## Issue: "Failed to parse file" Error When Uploading PDF

### Problem
When uploading a WebReg PDF, you get the error: "Failed to parse file. Please try text entry instead."

### Root Cause
The frontend is trying to call the backend API but the `VITE_API_URL` environment variable isn't set in Vercel, so it defaults to `http://localhost:3001` which doesn't exist in production.

### Solution

#### **Fix in Vercel Dashboard:**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **frontend** project: `usc-cook-scale`
3. Click **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://usc-cook-scale-backend.vercel.app`
   - **Environments:** Check all (Production, Preview, Development)
5. Click **Save**
6. Redeploy the frontend:
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **⋯** menu → **Redeploy**

#### **Verify Backend is Working:**

Test the backend directly:
```bash
curl -X POST https://usc-cook-scale-backend.vercel.app/api/parse-schedule \
  -H "Content-Type: application/json" \
  -d '{"scheduleText": "CSCI-103 with Slocum, 4 units"}'
```

Expected output:
```json
{"classes":[{"courseName":"CSCI-103","professor":"Slocum","units":4}]}
```

✅ **Backend is confirmed working!**

#### **Test Frontend After Fix:**

1. Wait for Vercel redeployment (~1-2 minutes)
2. Visit https://usc-cook-scale.vercel.app
3. Upload your WebReg PDF
4. Should now work! 🎉

---

## Alternative: Use Text Entry (Temporary Workaround)

While waiting for the environment variable fix, you can:

1. Open your WebReg PDF
2. Select all text (Cmd+A / Ctrl+A)
3. Copy it
4. Go to the app and click "Paste text instead"
5. Paste the copied text
6. Click "Analyze Schedule"

This will work immediately since text parsing doesn't require file upload.

---

## Debug Logs

With the latest update, the browser console will show detailed logs:
- `Extracting text from PDF...`
- `Extracted X characters from PDF`
- `Calling API: ...`
- `API response received: ...`

**To check logs:**
1. Right-click → Inspect
2. Go to Console tab
3. Try uploading the file again
4. Look for error messages

---

## Common Issues

### Issue: CORS Error
**Symptom:** Console shows "CORS policy" error
**Solution:** Backend already has CORS enabled. Clear browser cache and retry.

### Issue: PDF.js Worker Error
**Symptom:** Console shows "pdf.worker.js" error
**Solution:** Already using CDN worker. Check internet connection.

### Issue: Timeout
**Symptom:** Request takes >30 seconds
**Solution:** API timeout is set to 30s. Try with smaller PDF (fewer pages).

---

## Contact

If issues persist after setting environment variable:
1. Check browser console for specific errors
2. Open GitHub issue with console logs
3. Try different browser (Chrome/Firefox/Safari)

---

**Status:** Backend verified working ✅
**Action needed:** Set VITE_API_URL in Vercel frontend settings
