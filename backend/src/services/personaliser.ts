import { Article } from '../../shared/types';
import logger from '../utils/logger';

export interface PersonalisationResult {
  articles: Article[];
  personalityTraits?: string[];
}

export const personaliseArticles = (
  articles: Article[],
  userTopics: string[],
  readingBehaviour: any
): Article[] => {
  try {
    // Score articles based on:
    // 1. Overlap with user followed topics
    // 2. Reading time (prefer articles matching user avg reading time)
    // 3. Patterns from past behaviour (liked topics, sections)

    const scored = articles.map(article => ({
      ...article,
      personalScore: calculatePersonalisationScore(article, userTopics, readingBehaviour)
    }));

    scored.sort((a, b) => b.personalScore - a.personalScore);

    return scored.map(({ personalScore, ...article }) => article);
  } catch (error) {
    logger.error('Error personalising articles', error);
    return articles;
  }
};

const calculatePersonalisationScore = (
  article: Article,
  userTopics: string[],
  readingBehaviour: any
): number => {
  let score = 0;

  // Topic match
  const matchedTopics = article.topics.filter(topic => userTopics.includes(topic));
  score += matchedTopics.length * 3;

  // Reading time preference (if available)
  if (readingBehaviour?.avgReadingTime) {
    const diff = Math.abs(article.readingTime - readingBehaviour.avgReadingTime);
    score += Math.max(0, 5 - diff * 0.1);
  }

  return score;
};
