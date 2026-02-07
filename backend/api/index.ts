import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scoreRoutes from '../src/routes/score';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api', scoreRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'USC Cook Scale API is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'USC Cook Scale API',
    endpoints: {
      health: '/health',
      analyzeSchedule: '/api/analyze-schedule',
      parseSchedule: '/api/parse-schedule'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Export for Vercel serverless
export default app;
