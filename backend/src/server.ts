import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scoreRoutes from './routes/score';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ====================================
// RATE LIMITING CONFIGURATION
// ====================================
// IMPORTANT: Basic rate limiting is commented out for development.
// For production deployment, UNCOMMENT and configure properly!
//
// To implement rate limiting:
// 1. Install express-rate-limit: npm install express-rate-limit
// 2. Uncomment the code below
// 3. Adjust limits based on your API usage patterns
// 4. Consider implementing IP-based or user-based limits
//
// import rateLimit from 'express-rate-limit';
//
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // Limit each IP to 10 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });
//
// Apply to all routes:
// app.use('/api/', limiter);
//
// Or create stricter limits for specific endpoints:
// const strictLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5, // Even stricter for expensive operations
// });
// app.use('/api/analyze-schedule-v2', strictLimiter);
//
// WARNING: Without rate limiting, this API is vulnerable to:
// - Abuse and excessive requests
// - API key quota exhaustion (Claude API costs money!)
// - Server overload
// - Denial of service attacks
//
// See RATE_LIMITING.md for detailed setup instructions.
// ====================================

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for PDF uploads

// Routes
app.use('/api', scoreRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'USC Cook Scale API is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🔥 USC Cook Scale API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
