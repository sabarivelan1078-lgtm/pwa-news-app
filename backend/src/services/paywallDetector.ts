import { HfInference } from '@huggingface/inference';
import logger from '../utils/logger';

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

export interface PaywallDetectionResult {
  isPaywalled: boolean;
  confidence: number;
  reason?: string;
}

export const detectPaywall = async (title: string, description: string, content?: string): Promise<PaywallDetectionResult> => {
  try {
    const text = `${title}. ${description}. ${content || ''}`;

    // Use zero-shot classification to detect paywall indicators
    const result = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: text,
      candidate_labels: ['paywalled article', 'free article', 'premium content'],
      multi_class: false
    });

    const isPaywalled = result.labels[0] === 'paywalled article' && result.scores[0] > 0.6;

    return {
      isPaywalled,
      confidence: result.scores[0],
      reason: result.labels[0]
    };
  } catch (error) {
    logger.error('Error detecting paywall', error);
    // Default: assume free if detection fails
    return { isPaywalled: false, confidence: 0.5 };
  }
};
