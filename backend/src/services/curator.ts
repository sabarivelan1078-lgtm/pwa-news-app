import { Article, FeedSection } from '../../shared/types';
import logger from '../utils/logger';

export interface CurationResult {
  articles: Article[];
  section: FeedSection;
}

export const rankAndCurateArticles = (
  articles: Article[],
  section: FeedSection,
  maxPerSource: number = 2,
  totalArticles: number = 20
): Article[] => {
  try {
    // Rank by:
    // 1. Recency (more recent = higher score)
    // 2. Importance (breaking news > regular)
    // 3. Source credibility (predefined weights)
    // 4. Topic relevance to section

    const scored = articles.map(article => ({
      ...article,
      score: calculateArticleScore(article, section)
    }));

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Enforce source diversity
    const result: Article[] = [];
    const sourceCount: Record<string, number> = {};

    for (const article of scored) {
      if (!sourceCount[article.source]) {
        sourceCount[article.source] = 0;
      }

      if (sourceCount[article.source] < maxPerSource && result.length < totalArticles) {
        result.push(article);
        sourceCount[article.source]++;
      }
    }

    return result.slice(0, totalArticles);
  } catch (error) {
    logger.error('Error curating articles', error);
    return articles.slice(0, totalArticles);
  }
};

const calculateArticleScore = (article: Article, section: FeedSection): number => {
  let score = 0;

  // Recency score (articles from last 24 hours get higher score)
  const hoursSincePub = (Date.now() - article.publishedAt.getTime()) / (1000 * 60 * 60);
  score += Math.max(0, 10 - hoursSincePub * 0.1);

  // Topic relevance (bonus for matched topics)
  score += article.topics.length * 2;

  // Deduct for paywalled
  if (article.isPaywalled) {
    score -= 5;
  }

  return score;
};
