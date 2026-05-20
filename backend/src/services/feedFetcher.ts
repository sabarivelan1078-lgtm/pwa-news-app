import axios from 'axios';
import logger from '../utils/logger';

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
  source: string;
}

export const fetchFeedFromURL = async (url: string): Promise<FeedItem[]> => {
  try {
    // First, try to fetch RSS feed if available
    const rssEndpoints = [
      `${url}/feed`,
      `${url}/rss`,
      `${url}/feed.xml`,
      `${url}/rss.xml`
    ];

    for (const endpoint of rssEndpoints) {
      try {
        const response = await axios.get(endpoint, { timeout: 5000 });
        logger.debug(`Found RSS feed at ${endpoint}`);
        // Parse RSS here (will implement with rss-parser)
        return parseFeedContent(response.data, url);
      } catch (e) {
        // Continue to next endpoint
      }
    }

    logger.warn(`No RSS feed found for ${url}`);
    return [];
  } catch (error) {
    logger.error(`Error fetching feed from ${url}`, error);
    return [];
  }
};

const parseFeedContent = (content: string, sourceUrl: string): FeedItem[] => {
  // Placeholder: will implement RSS parsing with rss-parser
  return [];
};
