import express, { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import logger from '../utils/logger';

const router = express.Router();

// GET /api/v1/search?q=query - Search articles
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;
    logger.info(`Search query: ${q}`);
    res.json({
      message: 'Search results',
      data: []
    });
  })
);

// GET /api/v1/search/suggestions?q=query - Search suggestions
router.get(
  '/suggestions',
  asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;
    logger.info(`Search suggestions for: ${q}`);
    res.json({
      message: 'Search suggestions',
      data: []
    });
  })
);

export default router;
