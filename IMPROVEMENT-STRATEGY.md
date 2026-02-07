# 🚀 USC Cook Scale - Comprehensive Improvement Strategy

**Date:** February 6, 2026
**Status:** Critical Issues Identified - Implementation Plan Ready

---

## 🎯 Core Problems Identified

### 1. **RMP Data Accuracy Issues** ⚠️
**Current Problem:**
- Takes first search result without verification (line 200 in analyze-schedule.ts)
- No name matching validation
- Could be selecting wrong professor entirely
- Links might not go to correct professor page

**Impact:** Students getting wrong difficulty scores, defeating the entire purpose

### 2. **Rigid Algorithm** 🤖
**Current Problem:**
```typescript
let baseScore = classType === 'STEM' ? 60 : 30; // TOO RIGID!
```
- Binary classification is oversimplified
- CSCI 104 (data structures) ≠ CSCI 180 (intro programming)
- MATH 226 (multivariable calc) ≠ MATH 118 (stats)
- Psychology can be harder than some "STEM" courses
- No consideration of course level (100 vs 400)

**Impact:** Inaccurate scores that don't reflect real difficulty

### 3. **Overall Score Calculation Broken** 📊
**Current Problem:**
```typescript
const totalScore = results.reduce((sum, cls) => sum + cls.score, 0);
const overallScore = Math.min(100, Math.round(totalScore));
```
- Just sums individual scores (can exceed 100 easily)
- Doesn't account for workload synergy
- 4 easy classes ≠ same as 4 hard classes
- No consideration of time conflicts or cumulative stress

**Impact:** Score of "78" is meaningless - doesn't represent actual semester difficulty

### 4. **Hardcoded Content** 📝
**Current Problem:** (lines 166-195 in ClassBreakdown.tsx)
- Survival tips are hardcoded if/else statements
- No personalization
- Same generic tips for all STEM or Humanities classes
- No actual insights from web data

**Impact:** Not useful, feels fake, doesn't leverage AI capabilities

### 5. **No Real Quotes or Web Data** 🌐
**Current Problem:**
- Reddit API exists but not integrated
- RMP scores extracted but no actual review quotes
- No real student experiences shown
- Links provided but no preview content

**Impact:** Students have to click away to get useful info

### 6. **UI/UX Issues** 🎨
**Current Problem:**
- Generic layout
- No visual hierarchy
- Cluttered information
- Not engaging or intuitive
- Doesn't feel like a tool students would share

**Impact:** Poor user experience, low retention

---

## 🧠 Solution Strategy

### Phase 1: Fix Data Accuracy (CRITICAL)

#### 1.1 Intelligent Professor Matching
**Implementation:**
- Use Claude LLM to verify professor name match
- Compare search result names against input
- Handle name variations (Dr. Smith vs John Smith vs J. Smith)
- Return confidence score with each match
- If low confidence, fetch multiple results and let LLM choose best

**New Function:**
```typescript
async function verifyProfessorMatch(
  searchQuery: string,
  searchResults: any[],
  llmClient: any
): Promise<{ match: any; confidence: number; reasoning: string }> {
  // Use Claude to analyze and select best match
  // Return null if no good matches found
}
```

**Benefits:**
- Accurate data → accurate scores
- Links go to correct professor pages
- Students can trust the results

#### 1.2 Extract RMP Review Quotes
**Implementation:**
- Fetch full professor page HTML (not just GraphQL)
- Use Cheerio to scrape top 3-5 reviews
- Extract: rating, date, course, comment text, tags (tough grader, caring, etc.)
- Use Claude to summarize common themes

**New Endpoint Enhancement:**
```typescript
async function getRMPReviews(professorId: string): Promise<RMPReview[]> {
  // Scrape actual review text
  // Return array of {rating, comment, course, tags, date}
}
```

**Benefits:**
- Real student voices, not just numbers
- Quotes build trust and provide context
- Students see actual experiences

#### 1.3 Extract Reddit Quote Snippets
**Implementation:**
- Already have Reddit search working
- Add: scrape comment threads from top posts
- Use Claude to extract most relevant quotes about professor/class
- Filter for substantive comments (min 50 chars, relevant keywords)

**Enhancement:**
```typescript
async function getRedditInsights(posts: RedditPost[]): Promise<string[]> {
  // Fetch comment threads
  // Use Claude to extract relevant quotes
  // Return array of meaningful student comments
}
```

---

### Phase 2: Genius Algorithm Redesign

#### 2.1 Course-Specific Difficulty Analysis
**Replace rigid binary with LLM-powered analysis:**

```typescript
async function analyzeCourseIntelligently(
  courseName: string,
  courseType: string,
  professorRating: ProfessorRating | null
): Promise<{ baseDifficulty: number; reasoning: string }> {
  const prompt = `Analyze this college course difficulty on a scale of 0-100:

Course: ${courseName}
Type: ${courseType}
Professor Avg Difficulty: ${professorRating?.difficulty || 'Unknown'}

Consider:
- Course level (100-level intro vs 400-level advanced)
- Subject inherent difficulty (Calculus vs Yoga)
- Typical workload (labs, projects, exams, papers)
- USC-specific reputation (if known)

Return JSON:
{
  "difficulty": 0-100,
  "reasoning": "why this score",
  "workloadFactors": ["factor1", "factor2"]
}`;

  // Use Claude to analyze
}
```

**Benefits:**
- CSCI 104 (notorious data structures) gets 85
- CSCI 101 (intro) gets 45
- WRIT 150 (required writing) gets 55 (moderate, lots of papers)
- Accounts for actual course reputation

#### 2.2 Professor Impact Multiplier
**Current formula is opaque and potentially wrong:**

```typescript
// CURRENT (line 228):
const professorFactor = (
  ((6 - quality) / 5) * 0.4 +
  (difficulty / 5) * 0.4 +
  ((1 - wouldTakeAgain / 100) * 0.2)
) * 2;
```

**NEW - LLM-Powered Analysis:**
```typescript
async function calculateProfessorImpact(
  professorRating: ProfessorRating,
  courseDifficulty: number
): Promise<{ multiplier: number; explanation: string }> {
  const prompt = `A professor has these ratings:
- Quality: ${professorRating.quality}/5
- Difficulty: ${professorRating.difficulty}/5
- Would Take Again: ${professorRating.wouldTakeAgain}%
- Number of Reviews: ${professorRating.numRatings}

The base course difficulty is ${courseDifficulty}/100.

How should the professor's ratings modify the difficulty score?

Consider:
- High quality + high difficulty = Hard but worthwhile
- Low quality + high difficulty = Nightmare scenario
- High quality + low difficulty = Easy A
- Few reviews = less reliable data

Return JSON:
{
  "multiplier": 0.5 to 2.0,
  "adjustedScore": final score,
  "reasoning": "explanation in student-friendly language"
}`;

  // Use Claude to calculate smart adjustment
}
```

**Benefits:**
- Captures nuance: "Hard but fair" vs "Hard and unfair"
- Transparent reasoning students can understand
- Adapts to edge cases automatically

#### 2.3 Overall Score - Workload Synergy Analysis
**Current approach (just sum) is BROKEN:**

**NEW - Smart Semester Analysis:**
```typescript
async function calculateOverallCookScale(
  classes: ClassResult[]
): Promise<{ score: number; label: string; insights: string[] }> {
  const classDescriptions = classes.map(c =>
    `${c.courseName} (${c.type}, ${c.score}/100, ${c.units} units, Prof: ${c.professor})`
  ).join('\n');

  const prompt = `Analyze this USC semester schedule and rate overall difficulty 0-100:

${classDescriptions}

Total Units: ${totalUnits}

Consider:
1. Individual class difficulties
2. Workload combination and synergy
   - 3 STEM classes = massive combined problem sets
   - Mix of STEM + humanities = balanced but time management challenge
   - All easy classes = light semester
3. Unit count (12-14 light, 15-17 normal, 18+ heavy)
4. Professor difficulty compounding effects
5. Time conflicts and stress accumulation

Return JSON:
{
  "overallScore": 0-100,
  "verbalLabel": "Raw/Lightly Toasted/Medium/Well Done/Extra Crispy/Absolutely Burnt",
  "reasoning": "why this score captures semester difficulty",
  "insights": ["insight1", "insight2", "insight3"],
  "warnings": ["potential issue1", "potential issue2"],
  "strengths": ["positive aspect1", "positive aspect2"]
}`;

  // Use Claude to calculate holistic difficulty
}
```

**Benefits:**
- Accounts for cumulative workload, not just sum
- Recognizes patterns (all-STEM semesters, balanced loads)
- Provides actionable insights beyond a number

---

### Phase 3: Dynamic LLM-Generated Content

#### 3.1 Survival Tips (Replace Hardcoded)
**Current:** Lines 166-195 in ClassBreakdown.tsx are hardcoded

**NEW:**
```typescript
async function generateSurvivalTips(
  classData: ClassResult,
  rmpReviews: RMPReview[],
  redditQuotes: string[]
): Promise<string[]> {
  const prompt = `Generate 3-5 specific, actionable survival tips for this class:

Class: ${classData.courseName}
Professor: ${classData.professor}
Cook Score: ${classData.score}/100
Type: ${classData.type}

RMP Reviews:
${rmpReviews.map(r => `- "${r.comment}" (${r.rating}/5)`).join('\n')}

Reddit Comments:
${redditQuotes.join('\n')}

Generate tips that:
1. Are specific to THIS professor and course
2. Reference actual student experiences
3. Include time management, study strategies
4. Are practical and actionable
5. Cite sources when relevant ("Students on RMP say...")

Return JSON array of 3-5 tips as strings.`;

  // Use Claude to generate personalized tips
}
```

**Benefits:**
- Personalized to each class
- Based on real data
- Actually useful, not generic

#### 3.2 Class Summary & Insights
**Add new section with LLM-generated analysis:**

```typescript
async function generateClassInsights(
  classData: ClassResult,
  rmpReviews: RMPReview[],
  redditQuotes: string[]
): Promise<{
  summary: string;
  keyThemes: string[];
  studentSentiment: string;
  quotes: { text: string; source: string }[];
}> {
  // Use Claude to analyze all data and create summary
  // Extract best quotes
  // Identify common themes (tough grader, lots of homework, etc.)
}
```

#### 3.3 Landing Page Dynamic Content
**Add LLM-powered sections:**
- Real student testimonials (scraped from Reddit)
- Dynamic "Course of the Week" spotlight (most searched)
- Live stats (recalculated)
- Trending professor discussions

---

### Phase 4: UI/UX Overhaul

#### 4.1 Results Page Redesign
**New Layout:**
```
┌────────────────────────────────────────┐
│  🔥 Overall Cook Scale                │
│                                        │
│  [HUGE VISUAL SCORE GAUGE]             │
│  78 / 100 - Extra Crispy               │
│                                        │
│  📊 [Visual breakdown bar chart]       │
│  └─ STEM Load: 65% (12 units)          │
│  └─ Humanities: 35% (6 units)          │
│                                        │
│  🎯 AI Analysis:                       │
│  "This is a heavily STEM-focused..."   │
│  [Dynamic LLM insights]                │
│                                        │
│  ⚠️ Warnings:                          │
│  • 3 classes with difficulty > 4.0     │
│  • Consider dropping CSCI 104 if...    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│  CLASS BREAKDOWN                       │
│  [Filterable, sortable cards]          │
│                                        │
│  🔴 CSCI-104 (Score: 92)               │
│  ├─ Prof. Smith - 2.1/5 ⭐            │
│  ├─ 💬 "Extremely difficult..."        │
│  │   — Reddit u/user123               │
│  ├─ 💬 "Tests are brutal but fair"     │
│  │   — RMP Review (4.0/5)             │
│  └─ [Expand for survival tips]         │
└────────────────────────────────────────┘
```

**Key Improvements:**
- Visual hierarchy (big score, then details)
- Quote cards with source attribution
- Interactive elements (expand/collapse)
- Color-coded difficulty (green/yellow/red gradient)
- Comparison to average USC student

#### 4.2 Visual Components
- **Difficulty Gauge:** Animated SVG thermometer/meter
- **Workload Distribution:** Pie chart (STEM vs Humanities vs Other)
- **Professor Rating Cards:** Mini profiles with stars
- **Quote Bubbles:** Speech-bubble style with source icons

---

## 📋 Implementation Priority

### **Immediate (Critical):**
1. Fix RMP professor matching with LLM verification
2. Fix overall score calculation with LLM analysis
3. Extract and display real RMP review quotes
4. Extract and display Reddit quotes

### **High Priority:**
5. Replace rigid STEM/Humanities with course-specific difficulty
6. Smart professor impact multiplier
7. Dynamic survival tips generation
8. UI/UX redesign of results page

### **Medium Priority:**
9. Landing page dynamic content
10. Visual components (gauges, charts)
11. Comparison features

---

## 🔧 Technical Implementation Details

### New Endpoints Needed:

**1. Enhanced Analysis Endpoint:**
```typescript
POST /api/analyze-schedule-v2
{
  "classes": [...],
  "options": {
    "includeQuotes": true,
    "generateInsights": true,
    "detailedBreakdown": true
  }
}

Response:
{
  "overallScore": 78,
  "verbalLabel": "Extra Crispy",
  "llmInsights": {
    "summary": "...",
    "warnings": [...],
    "strengths": [...]
  },
  "classes": [
    {
      ...classData,
      "rmpQuotes": [...],
      "redditQuotes": [...],
      "survivalTips": [...],
      "aiAnalysis": "..."
    }
  ]
}
```

**2. Professor Deep Research:**
```typescript
POST /api/research-professor-deep
{
  "professor": "John Smith",
  "courseName": "CSCI-104"
}

Response:
{
  "professorMatch": {
    "name": "John Smith",
    "confidence": 0.95,
    "rmpId": "123456"
  },
  "rmpReviews": [
    {
      "rating": 4.0,
      "difficulty": 4.5,
      "comment": "Hard but fair...",
      "course": "CSCI-104",
      "date": "2025-12-15",
      "tags": ["tough grader", "helpful"]
    }
  ],
  "redditMentions": [
    {
      "quote": "Smith's 104 class...",
      "url": "...",
      "upvotes": 45
    }
  ],
  "aiSummary": "Professor Smith is..."
}
```

### LLM Integration Points:

**Claude Sonnet 4.5 Usage:**
1. Professor name matching verification
2. Course difficulty analysis (replace binary STEM/Humanities)
3. Professor impact calculation
4. Overall semester analysis
5. Survival tips generation
6. Class insights generation
7. Quote selection and summarization

**Estimated Token Usage:**
- Per-class analysis: ~500 tokens
- Overall analysis: ~1000 tokens
- Quote extraction: ~300 tokens per source
- **Total per schedule:** ~5000-10000 tokens (~$0.05-0.10 per analysis)

---

## 🎯 Success Metrics

**After Implementation:**
- ✅ 95%+ professor match accuracy
- ✅ Real quotes displayed (3+ per class)
- ✅ Personalized survival tips (no hardcoding)
- ✅ Overall score accurately reflects workload (validated by user testing)
- ✅ UI feels professional and engaging
- ✅ Students share results ("This is so accurate!")

---

## 🚀 Next Steps

**Start with Critical Fixes:**
1. Create `analyze-schedule-v2.ts` with LLM-powered improvements
2. Add `getProfessorDeepData()` function with quote extraction
3. Test with your actual schedule (5 classes)
4. Iterate based on accuracy

**Then UI:**
5. Redesign ClassBreakdown.tsx with new layout
6. Add visual components
7. Deploy and test

---

**Ready to implement? This will transform the app from "cool idea" to "actually useful tool students will trust and share."**
