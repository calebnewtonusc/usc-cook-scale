import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import scoreRoutes from './routes/score';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
