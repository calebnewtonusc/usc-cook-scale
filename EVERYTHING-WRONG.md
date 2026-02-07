# 🔥 EVERYTHING WRONG WITH THIS PROJECT 🔥

**Date:** February 6, 2026
**Status:** CRITICAL FAILURES ACROSS THE BOARD

---

## 🚨 **TIER 1: CATASTROPHIC FAILURES** (App is Broken)

### 1. **Professor Matching: 100% Failure Rate**
- ❌ **Every professor returns `null`**
- ❌ RMP GraphQL API is being called but finding NO results
- ❌ Name format issue: "Slocum, Carter" might not match RMP "Carter Slocum"
- ❌ LLM verification is never reached because search returns empty
- ❌ User sees "No RateMyProfessors data available" for EVERY class

**Impact:** The entire "verified professor matching" feature doesn't work AT ALL

### 2. **Course Difficulty Analysis: Immediate Fallback**
- ❌ **EVERY class gets fallback score** (35 or 60 based on basic regex)
- ❌ LLM course analysis is failing/timing out/returning unparseable JSON
- ❌ Says "Fallback analysis based on course code" for everything
- ❌ No actual intelligent analysis happening

**Impact:** No difference from a simple if(courseName.includes('CSCI')) return 60

### 3. **RMP Review Quotes: Zero Results**
- ❌ **No reviews extracted for ANY professor**
- ❌ Even if professor is found, review fetch fails
- ❌ GraphQL query might be malformed or blocked
- ❌ User sees empty quotes section on EVERY class

**Impact:** Promised "real student quotes" - delivers nothing

### 4. **Reddit Integration: Completely Broken**
- ❌ **No Reddit quotes for ANY class**
- ❌ Reddit API might be rate limiting
- ❌ Search query might be malformed
- ❌ Posts might exist but not being fetched

**Impact:** Another promised feature that doesn't work

### 5. **Overall Score: Worthless**
- ❌ **Just averages the fallback scores**
- ❌ Says "Calculated as average of individual class scores"
- ❌ No LLM workload synergy analysis happening
- ❌ **18-unit semester = "32/100 Lightly Toasted"** (clearly wrong!)

**Impact:** Students can't trust the main score

### 6. **Survival Tips: Generic Garbage**
- ❌ **Same 3 tips for EVERY class:**
  - "Maintain consistent effort"
  - "Review concepts regularly"
  - "Use this class to balance harder courses"
- ❌ No personalization whatsoever
- ❌ LLM generation failing, falling back to hardcoded tips

**Impact:** Users think "Why did I waste time uploading my schedule?"

---

## 🔴 **TIER 2: MAJOR BUGS** (Broken Promises)

### 7. **LLM Calls Failing Silently**
- ❌ No error messages shown to user
- ❌ Try-catch blocks return empty/default data
- ❌ User has no idea everything is broken
- ❌ Logs say "[V2]" but there's no V2 intelligence happening

### 8. **Timeout Issues**
- ❌ 60-second timeout might not be enough for 6 classes
- ❌ Each class makes 6+ LLM calls (professor match, difficulty, impact, tips, insights, overall)
- ❌ **6 classes × 6 LLM calls = 36 API calls in 60 seconds** = guaranteed timeouts
- ❌ No batching, no parallelization optimization

### 9. **API Rate Limiting**
- ❌ RMP GraphQL might be blocking requests
- ❌ Reddit JSON API might be rate limiting
- ❌ Anthropic API might hit rate limits with 36 calls
- ❌ No retry logic, no exponential backoff

### 10. **JSON Parsing Errors**
- ❌ LLM returns markdown instead of JSON
- ❌ LLM returns JSON with extra text before/after
- ❌ JSON.parse() fails, crashes to fallback
- ❌ No validation of LLM responses

### 11. **Professor Name Format Mismatch**
- ❌ WebReg gives "Slocum, Carter"
- ❌ RMP expects "Carter Slocum" or "C. Slocum"
- ❌ Search fails because format doesn't match
- ❌ LLM verification never runs because search returns empty

### 12. **Missing Error Handling**
- ❌ User never sees actual errors
- ❌ "Analysis failed - using default score" is hidden from user
- ❌ Silently fails and shows garbage results
- ❌ User thinks it worked but got bad data

---

## 🟡 **TIER 3: UX/UI PROBLEMS** (Poor User Experience)

### 13. **Loading Time: Too Long**
- ❌ Takes 30+ seconds per class
- ❌ 6 classes = 3+ minutes of waiting
- ❌ No progress indicator showing which class is being analyzed
- ❌ User thinks app froze

### 14. **No Transparency**
- ❌ Doesn't tell user when RMP professor not found
- ❌ Doesn't explain why there are no quotes
- ❌ Doesn't show confidence score for professor match
- ❌ User can't tell if data is real or fallback

### 15. **Results Look Fake**
- ❌ All scores suspiciously similar (35, 35, 35, 35...)
- ❌ AI insights are vague and generic
- ❌ No actual data differentiation between classes
- ❌ Students will immediately recognize this as BS

### 16. **No Source Attribution**
- ❌ Quotes (when they work) don't link to actual review
- ❌ Can't verify if AI insights are accurate
- ❌ No way to check if RMP data is current
- ❌ Feels untrustworthy

### 17. **Color Scheme Issues**
- ❌ All classes show same color (green for 35/100)
- ❌ No visual differentiation
- ❌ Border color logic exists but all scores identical so pointless

### 18. **Mobile UI Not Optimized**
- ❌ Probably terrible on phone
- ❌ Long class cards
- ❌ No responsive testing done

---

## 🟢 **TIER 4: DATA QUALITY ISSUES**

### 19. **Incorrect Course Classifications**
- ❌ Regex matching "CSCI" → STEM is too simplistic
- ❌ MATH-118 (stats) vs MATH-226 (calc) both treated same
- ❌ GE courses misclassified
- ❌ Doesn't account for course level (100 vs 400)

### 20. **Professor Ratings Unreliable**
- ❌ When found, takes FIRST result without verification
- ❌ Might be wrong professor with same name
- ❌ No confidence threshold
- ❌ Could be professor from different university

### 21. **Outdated Data**
- ❌ RMP ratings could be from 5 years ago
- ❌ Professor might have changed teaching style
- ❌ No weighting for recent reviews
- ❌ No indication of data freshness

### 22. **Missing Data Not Handled Well**
- ❌ New professors have no data → shows as "35/100"
- ❌ Graduate TAs not in RMP → ignored
- ❌ Visiting professors → no data
- ❌ Should explain "No data available" vs "Easy class"

---

## 🔵 **TIER 5: ALGORITHMIC PROBLEMS**

### 23. **Unit Multiplier is Weird**
- ❌ 2-unit guitar class gets `35 × 0.5 = 17.5`
- ❌ Makes sense mathematically but feels arbitrary
- ❌ Doesn't account for time-intensive 2-unit labs
- ❌ Unit count ≠ difficulty perfectly

### 24. **STEM Bias**
- ❌ Auto-assumes all STEM = harder
- ❌ CSCI-180 (intro) scores same as CSCI-104 (notorious)
- ❌ Some humanities courses (ancient languages) are brutal
- ❌ Oversimplified binary classification

### 25. **Professor Impact Formula Unclear**
- ❌ LLM decides multiplier but logic is opaque
- ❌ "Hard but fair" (high difficulty, high quality) handled how?
- ❌ Students can't predict how their prof affects score
- ❌ Feels arbitrary

### 26. **Overall Score Doesn't Account For:**
- ❌ Time conflicts (classes at same time = impossible)
- ❌ Location conflicts (back-to-back classes across campus)
- ❌ Exam schedules (3 midterms same week)
- ❌ Prerequisites (advanced course without background)
- ❌ Workload synergy (3 STEM classes = compound difficulty)

### 27. **Verbal Labels Misleading**
- ❌ "Lightly Toasted" for 32/100 seems good
- ❌ But 18 units with those classes is actually hard!
- ❌ Labels don't match student reality
- ❌ Needs recalibration based on real feedback

---

## 🟣 **TIER 6: TECHNICAL DEBT**

### 28. **Code Duplication**
- ❌ Old v1 endpoint still exists
- ❌ ClassBreakdown and ClassBreakdownV2 both in codebase
- ❌ CookScoreDisplay and CookScoreDisplayV2
- ❌ Confusing which is actually being used

### 29. **No Tests**
- ❌ Zero unit tests
- ❌ Zero integration tests
- ❌ No test coverage for LLM responses
- ❌ Relying on manual testing = bugs slip through

### 30. **No Logging/Monitoring**
- ❌ Can't debug production failures
- ❌ Don't know when RMP API goes down
- ❌ Don't know LLM failure rate
- ❌ No Sentry/error tracking

### 31. **Hardcoded Values Everywhere**
- ❌ USC School ID hardcoded
- ❌ Timeout values hardcoded
- ❌ Base difficulty scores hardcoded
- ❌ Should be in config file

### 32. **No Caching**
- ❌ Same professor fetched multiple times
- ❌ Same Reddit searches repeated
- ❌ LLM calls not cached
- ❌ Wasting time and money

### 33. **Environment Variable Confusion**
- ❌ VITE_API_URL might not be set
- ❌ Anthropic API key might expire
- ❌ No validation on startup
- ❌ Silent failures if env vars missing

---

## 🟤 **TIER 7: MISSING FEATURES**

### 34. **No User Accounts**
- ❌ Can't save schedules
- ❌ Can't compare semesters
- ❌ Can't share results with friends
- ❌ Have to re-enter every time

### 35. **No Schedule Comparison**
- ❌ Can't compare "should I take Smith or Jones?"
- ❌ Can't see "what if I drop this class?"
- ❌ No A/B testing schedules

### 36. **No PDF Upload Persistence**
- ❌ Upload PDF, analyze, then lose it
- ❌ Want to adjust? Re-upload
- ❌ Annoying UX

### 37. **No Export/Share Functionality**
- ❌ Can't export to PDF with results
- ❌ Can't share link with friends
- ❌ Print function is basic browser print
- ❌ No social sharing

### 38. **No Historical Data**
- ❌ Doesn't track "was this accurate?"
- ❌ Can't improve algorithm based on feedback
- ❌ No community validation

---

## ⚫ **TIER 8: DEPLOYMENT ISSUES**

### 39. **Build Failures**
- ❌ TypeScript errors slip through
- ❌ Had to fix CookScoreDisplay vs V2 issue
- ❌ No pre-commit hooks
- ❌ Deploy breaks production

### 40. **No Staging Environment**
- ❌ Testing on production
- ❌ Users see broken features
- ❌ Can't test safely

### 41. **Vercel Function Timeout**
- ❌ 60-second limit might not be enough
- ❌ Complex schedules will timeout
- ❌ No background job processing

### 42. **CORS Issues (Potential)**
- ❌ Might break on some browsers
- ❌ Preflight requests might fail
- ❌ Headers set multiple places (redundant)

---

## 💀 **TIER 9: FATAL FLAWS** (Existential Problems)

### 43. **Value Proposition Unclear**
- ❌ If it just shows "35" for everything, why use it?
- ❌ Easier to just Google "CSCI-104 Reddit USC"
- ❌ Not providing value over manual research
- ❌ Students won't recommend it

### 44. **Trust Issues**
- ❌ Results don't match student experience
- ❌ "This class is hard but it says 35/100?"
- ❌ Once trust is lost, won't be used
- ❌ Critical for adoption

### 45. **Not USC-Specific Enough**
- ❌ Doesn't use USC course catalog
- ❌ Doesn't know USC-specific course difficulty
- ❌ Doesn't account for USC culture (CSCI-104 is legendary hard at USC)
- ❌ Generic tool trying to be specific

### 46. **Doesn't Account for Student Differences**
- ❌ CS major vs non-major taking CSCI-101 = different difficulty
- ❌ Math background affects MATH-226 difficulty
- ❌ Everyone gets same score regardless of background
- ❌ Not personalized

### 47. **Legal/Ethical Issues**
- ❌ Scraping RMP might violate terms of service
- ❌ Reddit scraping might have rate limits/TOS
- ❌ Using USC name without permission?
- ❌ Liability if student trusts bad recommendation?

### 48. **Scalability**
- ❌ Can't handle 1000 concurrent users
- ❌ LLM costs scale linearly with usage
- ❌ No business model to sustain
- ❌ Will run out of free Anthropic credits

---

## 📊 **SUMMARY OF CRITICAL FAILURES**

**What Actually Works:**
1. ✅ PDF parsing (from previous work)
2. ✅ Frontend displays data (even if it's garbage)
3. ✅ Deployment pipeline works
4. ✅ UI looks decent (just showing bad data)

**What is COMPLETELY BROKEN:**
1. ❌ Professor matching (0% success rate)
2. ❌ RMP review quotes (0 quotes extracted)
3. ❌ Reddit discussions (0 found)
4. ❌ Course difficulty analysis (100% fallback)
5. ❌ Personalized survival tips (100% generic)
6. ❌ Overall score intelligence (just an average)

**Percentage of V2 Features Working:**
- **~15%** (basic functionality works, all "intelligent" features broken)

**User Experience Rating:**
- **2/10** (Worse than if we just showed RMP links and said "research yourself")

---

## 🎯 **THE FUNDAMENTAL PROBLEM**

The entire V2 algorithm is built on:
1. LLM calls that are failing
2. API integrations that don't work
3. Fallbacks that make it seem like it works

**It's a house of cards that LOOKS impressive but DOES NOTHING.**

Students will try it once, see generic results, and never come back.

---

## 🚀 **WHAT NEEDS TO HAPPEN IMMEDIATELY**

**Do This Today:**
1. Fix RMP professor search (handle name formats)
2. Make LLM calls more robust (handle errors, parse JSON better)
3. Add retry logic for API failures
4. Show user when data is missing vs when using fallback
5. Test with REAL schedules and verify accuracy

**Do This Week:**
6. Implement caching to speed up repeat queries
7. Add progress indicators for long analysis
8. Improve error messages
9. Add source links to verify data
10. Get real student feedback and iterate

**Do This Month:**
11. Build test suite
12. Add monitoring/logging
13. Optimize for speed
14. Add user accounts
15. Launch marketing push (ONLY when it actually works)

---

**Bottom Line:** This is an AMAZING idea executed with BROKEN implementation. Fix the core data pipeline before adding features.

**The promise:** "AI-powered intelligent analysis with real student quotes"
**The reality:** "Regex-based fallback scores with no data"

**Students aren't stupid - they'll notice immediately.**
