import express, { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import logger from '../utils/logger';

const router = express.Router();

// GET /api/v1/articles/:id - Get full article
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`Fetching article: ${id}`);
    res.json({
      message: `Article ${id}`,
      data: {}
    });
  })
);

// POST /api/v1/articles/:id/read - Mark as read
router.post(
  '/:id/read',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    logger.info(`Marked article as read: ${id}`);
    res.json({ message: 'Article marked as read' });
  })
);

// POST /api/v1/articles/:id/feedback - Article feedback
router.post(
  '/:id/feedback',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { action } = req.body; // like, dislike, share
    logger.info(`Article feedback: ${id} - ${action}`);
    res.json({ message: 'Feedback recorded' });
  })
);

export default router;
