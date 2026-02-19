# Rate Limiting Setup Guide

## ⚠️ CRITICAL: Why You Need Rate Limiting

**Your API is currently vulnerable without rate limiting!** This can lead to:

1. **API Key Quota Exhaustion:** The Claude API costs money per request. Unlimited requests = unlimited costs.
2. **Server Overload:** Too many concurrent requests can crash your server.
3. **Denial of Service:** Malicious actors can intentionally overload your API.
4. **Fair Access:** Without limits, one user can monopolize resources.

**For any public deployment, implementing rate limiting is MANDATORY.**

---

## Quick Setup (5 minutes)

### Step 1: Install express-rate-limit

```bash
cd backend
npm install express-rate-limit
```

### Step 2: Update server.ts

Open `/Users/joelnewton/usc-cook-scale/backend/src/server.ts` and uncomment the rate limiting configuration:

```typescript
import rateLimit from 'express-rate-limit';

// Basic rate limiter (adjust values as needed)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all API routes
app.use('/api/', limiter);
```

### Step 3: Test It Works

1. Restart your backend server:
   ```bash
   npm run dev
   ```

2. Make 11 requests to any API endpoint within 15 minutes
3. The 11th request should return a 429 error with the rate limit message

---

## Recommended Configurations

### For Development (Lenient)

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // 50 requests per 15 min (plenty for testing)
  message: 'Rate limit exceeded. Please wait before making more requests.',
});
```

### For Production - Light Usage (Default)

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per 15 min (reasonable for real usage)
  message: 'Too many requests. Please try again in 15 minutes.',
});
```

### For Production - Heavy Usage

```typescript
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30, // 30 requests per hour
  message: 'Rate limit exceeded. Please try again later.',
});
```

### For Production - Strict (Recommended for Public Apps)

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 requests per 15 min
  message: 'Too many schedule analyses. Please wait 15 minutes before trying again.',
});
```

---

## Advanced: Different Limits for Different Endpoints

Some endpoints are more expensive than others. You can apply stricter limits to expensive operations:

```typescript
// General API rate limit (lenient)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Too many requests. Please slow down.',
});

// Strict limit for expensive AI analysis
const analysisLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many schedule analyses. Each analysis uses AI which is expensive. Please wait 15 minutes.',
});

// Apply different limits
app.use('/api/', generalLimiter); // All API routes get general limit
app.use('/api/analyze-schedule-v2', analysisLimiter); // Analysis route gets stricter limit
app.use('/api/analyze-schedule', analysisLimiter);
```

---

## Advanced: Per-User Rate Limiting

For better control, implement per-user (not just per-IP) rate limiting:

```typescript
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';

// Set up Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect();

// Use Redis to track rate limits across multiple servers
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  store: new RedisStore({
    client: redisClient,
    prefix: 'rate-limit:',
  }),
  // Track by IP or user session
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || 'unknown';
  },
});
```

**Note:** Redis setup requires additional infrastructure. Only needed for scaled deployments.

---

## Monitoring Rate Limit Usage

Add logging to track when users hit rate limits:

```typescript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  handler: (req, res) => {
    console.warn(`[RATE LIMIT] IP ${req.ip} exceeded limit`);
    res.status(429).json({
      error: 'Too many requests',
      message: 'You have exceeded the rate limit. Please try again later.',
      retryAfter: '15 minutes',
    });
  },
});
```

---

## Frontend: Handling Rate Limit Errors

Update your frontend to handle 429 errors gracefully:

```typescript
// In frontend/src/services/api.ts
try {
  const response = await axios.post('/api/analyze-schedule-v2', data);
  return response.data;
} catch (error) {
  if (error.response?.status === 429) {
    throw new Error(
      'Too many requests. This free service has rate limits. Please try again in 15 minutes.'
    );
  }
  throw error;
}
```

Add a user-friendly message in your UI:

```tsx
{error && error.includes('rate limit') && (
  <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-4">
    <p className="font-semibold text-yellow-900">Rate Limit Reached</p>
    <p className="text-sm text-yellow-800 mt-2">
      This free service has rate limits to prevent abuse and control costs.
      Please wait 15 minutes before analyzing another schedule.
    </p>
    <p className="text-xs text-yellow-700 mt-2">
      Why? Each analysis uses AI (Claude API) which costs money per request.
    </p>
  </div>
)}
```

---

## Vercel Deployment Considerations

If deploying to Vercel:

1. **Serverless functions have their own limits:** Vercel has built-in rate limiting and timeouts
2. **Use Vercel Edge Config:** For persistent rate limiting across function invocations
3. **Consider Vercel KV (Redis):** For distributed rate limiting

Example Vercel configuration in `vercel.json`:

```json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30,
      "memory": 1024
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## Testing Your Rate Limiting

### Manual Test

Use curl to test rate limiting:

```bash
# Make 11 requests quickly
for i in {1..11}; do
  echo "Request $i:"
  curl -X POST http://localhost:3001/api/analyze-schedule-v2 \
    -H "Content-Type: application/json" \
    -d '{"classes":[{"courseName":"TEST 101","professor":"Test Prof","units":4}]}'
  echo "\n---"
  sleep 1
done
```

The 11th request should return a 429 error.

### Automated Test Script

Create `backend/test-rate-limit.sh`:

```bash
#!/bin/bash
echo "Testing rate limiting..."

for i in {1..12}; do
  echo "Request #$i"
  response=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST http://localhost:3001/api/parse-schedule \
    -H "Content-Type: application/json" \
    -d '{"scheduleText":"CSCI 104 - Test - 4 units"}')

  echo "$response" | grep "HTTP_CODE"

  if echo "$response" | grep -q "HTTP_CODE:429"; then
    echo "✅ Rate limiting working! Request #$i was blocked."
    exit 0
  fi

  sleep 2
done

echo "❌ Rate limiting NOT working - all 12 requests succeeded"
exit 1
```

Run it:
```bash
chmod +x backend/test-rate-limit.sh
./backend/test-rate-limit.sh
```

---

## Cost Estimation & Why Rate Limiting Matters

### Claude API Costs (as of 2024)

- **Claude Sonnet 4.5:**
  - Input: $3 per million tokens
  - Output: $15 per million tokens

### Example: USC Schedule Analysis

- Average input: ~2,000 tokens (schedule + prompts)
- Average output: ~3,000 tokens (analysis + quotes)
- Cost per request: ~$0.05 (5 cents)

### Without Rate Limiting

- 1,000 malicious requests = **$50**
- 10,000 requests = **$500**
- 100,000 requests = **$5,000**

### With Rate Limiting (10 req/15min per IP)

- Max requests per day per IP: ~960 requests
- If 100 unique IPs abuse it: $4,800/day max (still high, but bounded)
- Realistic usage (10 IPs, 5 req/day each): $2.50/day

**Bottom line: Rate limiting is essential to prevent financial disaster.**

---

## Monitoring & Alerts

Set up monitoring to track:

1. **API usage:** How many requests per day/hour
2. **Rate limit hits:** How often users hit limits
3. **API costs:** Total Claude API spend
4. **Error rates:** 429 errors vs. other errors

### Simple Logging

```typescript
// Track stats in memory (resets on restart, but better than nothing)
const stats = {
  totalRequests: 0,
  rateLimitHits: 0,
  lastReset: new Date(),
};

app.use((req, res, next) => {
  stats.totalRequests++;
  next();
});

const limiter = rateLimit({
  // ... config
  handler: (req, res) => {
    stats.rateLimitHits++;
    console.warn(`Rate limit hit: ${stats.rateLimitHits} total`);
    // ... send 429 response
  },
});

// Stats endpoint (protect this in production!)
app.get('/api/stats', (req, res) => {
  res.json({
    ...stats,
    rateLimitPercentage: (stats.rateLimitHits / stats.totalRequests * 100).toFixed(2) + '%',
  });
});
```

---

## Summary Checklist

Before deploying to production:

- [ ] Install `express-rate-limit` package
- [ ] Uncomment and configure rate limiting in `server.ts`
- [ ] Test rate limiting works (make 11+ requests)
- [ ] Update frontend to handle 429 errors gracefully
- [ ] Add logging/monitoring for rate limit hits
- [ ] Consider stricter limits for expensive endpoints
- [ ] Set up cost monitoring for Claude API usage
- [ ] Document rate limits for users (in FAQ or help section)
- [ ] Consider implementing user accounts for per-user limits (future)

---

## Additional Resources

- [express-rate-limit documentation](https://github.com/express-rate-limit/express-rate-limit)
- [Anthropic API pricing](https://www.anthropic.com/pricing)
- [OWASP Rate Limiting Guide](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html#rate-limiting)
- [Vercel Rate Limiting](https://vercel.com/docs/concepts/limits/overview)

---

## Questions?

This is a student project, so support is limited. However, the configuration above should cover most use cases. Adjust limits based on your actual usage patterns and budget constraints.

**Remember: It's better to start with strict limits and loosen them later than to start too permissive and get hit with a huge API bill!**
