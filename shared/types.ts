export type FeedSection =
  | 'Breaking News'
  | 'Headlines'
  | 'India'
  | 'Tamil Nadu'
  | 'Business & Finance'
  | 'Economy'
  | 'Europe'
  | 'Middle East'
  | 'East Asia'
  | 'World News'
  | 'Technology'
  | 'Indian Editorials'
  | 'International Editorials'
  | 'History'
  | 'Geopolitics'
  | 'For You';

export type Theme = 'system' | 'light' | 'dark' | 'sepia' | 'kindleWhite' | 'kindleWarm' | 'highContrast' | 'slate';

export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  source: string;
  sourceUrl: string;
  url: string;
  publishedAt: Date;
  readingTime: number; // in minutes
  section: FeedSection;
  topics: string[];
  isPaywalled: boolean;
  isFree: boolean;
}

export interface Feed {
  [key in FeedSection]: Article[];
}

export interface UserSettings {
  userId: string;
  theme: Theme;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  sources: string[];
  followedTopics: string[];
  notificationsEnabled: boolean;
  breakingNewsAlerts: boolean;
  sectionAlerts: Record<FeedSection, boolean>;
  feedRefreshInterval: number; // in minutes
  lastRefresh: Date;
}

export interface UserBehaviour {
  userId: string;
  articleId: string;
  action: 'open' | 'like' | 'dislike' | 'share';
  timeSpent?: number; // in seconds
  timestamp: Date;
}

export interface ArticleMetrics {
  articleId: string;
  views: number;
  likes: number;
  dislikes: number;
  shares: number;
  readingTime: number[];
}
