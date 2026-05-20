import express, { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import logger from '../utils/logger';

const router = express.Router();

// GET /api/v1/personalisation/foryou - Get For You section
router.get(
  '/foryou',
  asyncHandler(async (req: Request, res: Response) => {
    logger.info('Fetching For You section');
    res.json({
      message: 'For You articles',
      data: []
    });
  })
);

// POST /api/v1/personalisation/feedback - Record reading behaviour
router.post(
  '/feedback',
  asyncHandler(async (req: Request, res: Response) => {
    const { articleId, action, timeSpent } = req.body;
    logger.info('Recording user behaviour', { articleId, action, timeSpent });
    res.json({
      message: 'Feedback recorded'
    });
  })
);

export default router;
