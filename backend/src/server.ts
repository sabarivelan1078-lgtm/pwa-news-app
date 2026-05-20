import express from 'express';
import dotenv from 'dotenv';
import { corsMiddleware, requestLogger } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';

import feedRoutes from './routes/feed';
import articleRoutes from './routes/articles';
import searchRoutes from './routes/search';
import settingsRoutes from './routes/settings';
import personalisationRoutes from './routes/personalisation';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// API Routes
app.use('/api/v1/feed', feedRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/personalisation', personalisationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      status: 404,
      message: 'Route not found'
    }
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Backend server running on port ${PORT}`);
  logger.info(`📍 Health check: http://localhost:${PORT}/health`);
});

export default app;
