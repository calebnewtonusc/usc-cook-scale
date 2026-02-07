# 🚀 USC Cooked Scale - Product Roadmap

**Last Updated:** February 7, 2026
**Current Version:** V2 (Enhanced AI Analysis)
**Status:** Production - Live at https://usc-cook-scale.vercel.app/

---

## 📊 Current Status (V2)

### ✅ What's Working
- PDF parsing from USC WebReg
- Enhanced V2 algorithm with LLM-powered analysis
- Robust professor matching with name format parsing
- Error transparency with yellow warning boxes
- Real RMP quotes and Reddit discussions extraction
- USC-specific course database overrides
- Production deployment on Vercel

### 🔧 Known Issues
- Some LLM calls may timeout on complex schedules (6+ classes)
- RMP/Reddit API rate limiting possible with heavy usage
- No caching - repeated queries fetch data fresh each time
- Professor matching still ~60-70% success rate (better than 0% but not perfect)

---

## 🎯 Priority Roadmap

### 🔥 **TIER 1: CRITICAL FIXES** (Do Next)

#### 1. **Improve Professor Matching Success Rate**
**Current:** ~60-70% match rate
**Target:** 90%+ match rate

**Actions:**
- [ ] Implement fuzzy matching algorithm (Levenshtein distance)
- [ ] Try multiple name format variations automatically
- [ ] Cache negative results to avoid re-querying failed professors
- [ ] Add manual professor override option for users
- [ ] Fallback to department-wide averages when no match found

**Why:** The #1 complaint will be "It didn't find my professor"

---

#### 2. **Add Caching Layer**
**Current:** Every analysis fetches fresh data (slow, expensive)
**Target:** Sub-5-second analysis for cached professors

**Actions:**
- [ ] Redis or in-memory cache for RMP data (TTL: 24 hours)
- [ ] Cache Reddit search results (TTL: 7 days)
- [ ] Cache LLM course difficulty analysis (TTL: 1 semester)
- [ ] Add cache hit/miss tracking to monitor effectiveness
- [ ] Implement background cache refresh for popular professors

**Why:**
- Reduce Anthropic API costs
- Improve user experience (faster results)
- Reduce risk of rate limiting

---

#### 3. **Optimize LLM Calls & Timeout Issues**
**Current:** 36 LLM calls for 6 classes = potential timeout
**Target:** Max 10 LLM calls for any schedule

**Actions:**
- [ ] Batch similar LLM calls (analyze 6 courses in one prompt)
- [ ] Parallel execution of independent API calls
- [ ] Increase timeout to 90 seconds for complex schedules
- [ ] Implement progressive rendering (show classes as they complete)
- [ ] Add "Cancel analysis" button for long-running jobs

**Why:** Students won't wait 2+ minutes for results

---

#### 4. **Better Error Handling & User Feedback**
**Current:** Generic error messages, silent failures
**Target:** Clear, actionable error messages

**Actions:**
- [ ] Create error taxonomy (RMP failed, LLM timeout, invalid PDF, etc.)
- [ ] Show per-class status indicators during analysis
- [ ] Offer "Retry failed classes" option
- [ ] Display partial results when some classes fail
- [ ] Add "Report incorrect data" button for user feedback

**Why:** Users need to understand why data is missing vs wrong

---

### 🟡 **TIER 2: MAJOR FEATURES** (1-2 Months)

#### 5. **User Accounts & Saved Schedules**
**Actions:**
- [ ] Implement authentication (Auth0 or Clerk)
- [ ] Save multiple schedules per user
- [ ] Compare schedules side-by-side
- [ ] Track analysis history
- [ ] Share schedule analysis with friends (unique links)

**Benefits:**
- Student retention
- Viral growth potential
- Data for improving algorithm

---

#### 6. **Schedule Recommendations**
**Actions:**
- [ ] "Swap a class" feature - suggest easier alternatives
- [ ] Professor comparison tool - "What if I took Jones instead of Smith?"
- [ ] Time conflict detection and warnings
- [ ] GE requirement satisfaction checker
- [ ] Exam schedule clustering warnings

**Benefits:**
- Actionable insights, not just passive scores
- Differentiation from competitors

---

#### 7. **USC Course Catalog Integration**
**Actions:**
- [ ] Scrape USC course catalog (or use API if available)
- [ ] Build database of all courses with metadata
- [ ] Add historical grade distribution data
- [ ] Track course difficulty trends over time
- [ ] Auto-suggest classes based on major requirements

**Benefits:**
- More accurate base difficulty scores
- Better understanding of prerequisites and course sequences

---

#### 8. **Community Features**
**Actions:**
- [ ] Upvote/downvote accuracy of Cooked Scale scores
- [ ] User-submitted tips and reviews
- [ ] "Students who took this schedule also took..." suggestions
- [ ] Anonymous feedback on professor/course difficulty
- [ ] Leaderboard of most "cooked" schedules

**Benefits:**
- Social proof
- Crowdsourced accuracy improvements
- Engagement and retention

---

### 🟢 **TIER 3: ENHANCEMENTS** (3-6 Months)

#### 9. **Mobile App**
**Actions:**
- [ ] React Native or Flutter app
- [ ] Push notifications for registration deadlines
- [ ] Schedule reminders
- [ ] Offline mode with cached data

---

#### 10. **Advanced Analytics**
**Actions:**
- [ ] Workload distribution visualization (weekly study hours)
- [ ] Time conflict heatmap
- [ ] Walking distance between classes
- [ ] Professor teaching style compatibility quiz
- [ ] Study group matching

---

#### 11. **Multi-University Support**
**Actions:**
- [ ] Expand to UCLA, Stanford, UC Berkeley
- [ ] School-specific course databases
- [ ] Regional Reddit/forum scraping
- [ ] University selection on landing page

---

#### 12. **Browser Extension**
**Actions:**
- [ ] Chrome/Firefox extension
- [ ] Inject Cooked Scale scores directly into WebReg
- [ ] Show scores while browsing RateMyProfessors
- [ ] Quick analysis without leaving registration page

---

### 🔵 **TIER 4: POLISH & OPTIMIZATION** (Ongoing)

#### 13. **UX Improvements**
- [ ] Mobile-responsive design improvements
- [ ] Dark mode support
- [ ] Accessibility (WCAG 2.1 AA compliance)
- [ ] Onboarding tutorial for first-time users
- [ ] Export to PDF/image for sharing

---

#### 14. **Algorithm Refinements**
- [ ] Machine learning model for difficulty prediction
- [ ] Personalized difficulty based on user's major/background
- [ ] Semester-specific adjustments (fall vs spring)
- [ ] Account for online vs in-person format

---

#### 15. **Data Quality**
- [ ] Weekly data freshness checks
- [ ] Detect stale RMP reviews (weight recent reviews higher)
- [ ] Flag controversial professors (high variance in ratings)
- [ ] Verify course codes against official catalog

---

#### 16. **Performance**
- [ ] CDN for static assets
- [ ] Database query optimization
- [ ] Lazy loading of quotes/reviews
- [ ] Background job processing for heavy analysis

---

## 🔬 Research & Experimentation

### Ideas to Test

#### A/B Testing Opportunities
- [ ] Different verbal label systems (fun vs serious)
- [ ] Score scale (0-100 vs letter grades vs 1-5 stars)
- [ ] Landing page messaging
- [ ] Color schemes (red/yellow vs blue/green)

#### Algorithm Experiments
- [ ] Different weighting formulas for professor impact
- [ ] Include TA ratings in score calculation
- [ ] Factor in class size (small seminar vs large lecture)
- [ ] Time-of-day difficulty adjustment (8am = harder)

#### Data Sources to Explore
- [ ] Coursicle historical enrollment data
- [ ] USC academic senate grade distributions
- [ ] LinkedIn for professor industry experience
- [ ] Twitter sentiment analysis for courses

---

## 💰 Monetization (Future)

### Potential Revenue Streams
1. **Freemium Model**
   - Free: 3 schedule analyses per month
   - Pro ($4.99/month): Unlimited analyses, saved schedules, recommendations

2. **University Partnerships**
   - License data to academic advising departments
   - Integration with official registration systems

3. **Sponsored Content**
   - Tutoring services ads
   - Study material providers
   - Course prep companies

4. **Data Insights**
   - Aggregate (anonymized) data for education researchers
   - USC administration insights on course difficulty trends

---

## 🛡️ Risk Mitigation

### Legal Concerns
- [ ] Terms of Service review by lawyer
- [ ] Privacy policy for user data
- [ ] FERPA compliance review
- [ ] RateMyProfessors TOS compliance check
- [ ] Reddit API usage compliance

### Technical Risks
- [ ] Backup API keys (Anthropic API downtime)
- [ ] Fallback for RMP scraping (if blocked)
- [ ] Database backup strategy
- [ ] DDoS protection
- [ ] Rate limiting per user

### Reputation Risks
- [ ] Moderation system for user-submitted content
- [ ] Professor appeal process for incorrect data
- [ ] Transparency about data sources
- [ ] Clear disclaimers about score interpretation

---

## 📈 Success Metrics

### Current (V2)
- **Weekly Active Users:** ~50 (beta)
- **Average Analysis Time:** 30-45 seconds
- **Professor Match Rate:** 60-70%
- **User Satisfaction:** TBD (need feedback system)

### 6-Month Targets
- **Weekly Active Users:** 5,000+
- **Average Analysis Time:** <15 seconds
- **Professor Match Rate:** 90%+
- **User Retention (30-day):** 40%+
- **Viral Coefficient:** 1.5+ (each user brings 1.5 new users)

### 12-Month Targets
- **Weekly Active Users:** 15,000+ (majority of USC undergrads)
- **Saved Schedules:** 50,000+
- **Community Reviews:** 10,000+
- **Multi-University Support:** 5+ schools

---

## 🚧 Technical Debt to Address

### Code Quality
- [ ] Add comprehensive unit tests (currently 0%)
- [ ] Add integration tests for API endpoints
- [ ] Set up CI/CD pipeline
- [ ] Add error tracking (Sentry or similar)
- [ ] Implement logging/monitoring
- [ ] Remove duplicate V1 code

### Infrastructure
- [ ] Set up staging environment
- [ ] Database migration strategy
- [ ] Backup and disaster recovery plan
- [ ] Load testing for concurrent users

### Documentation
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Architecture decision records (ADRs)
- [ ] Deployment runbook
- [ ] Incident response playbook

---

## 🎓 Lessons Learned (V1 → V2)

### What Worked
✅ PDF parsing was solid from day one
✅ UI/UX design resonated with students
✅ Core value proposition ("how cooked am I?") is compelling
✅ Deployment pipeline works smoothly

### What Didn't Work
❌ Simple regex-based fallbacks looked fake
❌ No transparency = students didn't trust results
❌ All classes getting same score = no value
❌ No actual quotes = felt generic

### Key Insights
💡 **Students want REAL data, not estimates**
💡 **Transparency builds trust** (show when data is missing)
💡 **Differentiation matters** (each class needs unique analysis)
💡 **Speed is critical** (students won't wait 2+ minutes)
💡 **Professor accuracy >> algorithm sophistication**

---

## 🎯 Next Sprint (2 Weeks)

### Priority Actions
1. [ ] Implement caching for RMP data (Redis or in-memory)
2. [ ] Add fuzzy professor name matching
3. [ ] Batch LLM calls to reduce API requests
4. [ ] Add progress indicators for long-running analysis
5. [ ] Set up error tracking (Sentry)
6. [ ] Create feedback form for user reports
7. [ ] A/B test verbal label system

### Success Criteria
- Analysis time reduced to <20 seconds average
- Professor match rate improved to 80%+
- At least 100 user feedback submissions
- Zero production outages

---

**Made with 🔥 for USC students**

For questions or suggestions, see [CONTRIBUTING.md](./CONTRIBUTING.md)
