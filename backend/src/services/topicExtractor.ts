import { HfInference } from '@huggingface/inference';
import logger from '../utils/logger';
import { FOLLOWED_TOPICS } from '../../shared/constants';

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

export interface TopicExtractionResult {
  topics: string[];
  scores: number[];
}

export const extractTopics = async (title: string, description: string): Promise<TopicExtractionResult> => {
  try {
    const text = `${title}. ${description}`;

    // Use zero-shot classification for topic extraction
    const result = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: text,
      candidate_labels: Array.from(FOLLOWED_TOPICS).slice(0, 50), // Limit to 50 for API
      multi_class: true
    });

    return {
      topics: result.labels.filter((_, i) => result.scores[i] > 0.3),
      scores: result.scores.filter(score => score > 0.3)
    };
  } catch (error) {
    logger.error('Error extracting topics', error);
    return { topics: [], scores: [] };
  }
};
