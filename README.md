# AI-Powered Progressive Web News App

A sophisticated, AI-curated progressive web app (PWA) for premium news reading, optimised for the Redmi Pad 2 display.

## Features

- **AI Chief Editor**: Actively curates, filters, ranks, and personalises the news feed
- **16 Editorial Sections**: Breaking News, Headlines, India, Tamil Nadu, Business & Finance, Economy, Europe, Middle East, East Asia, World News, Technology, Indian Editorials, International Editorials, History, Geopolitics, For You
- **Material 3 Expressive Design**: Premium, clean UI with 8 theme options
- **156 Curated News Sources**: User-defined, zero paywalled content
- **PWA with Offline Support**: Service Worker, App manifest, home screen installability
- **Smart Paywall Detection**: AI-powered filtering for paywalled articles
- **Personalisation**: Topic-based "For You" section with reading behaviour analytics
- **Fast & Responsive**: 30-45 min feed refresh, aggressive caching, Redmi Pad 2 optimised

## Project Structure

```
pwa-news-app/
├── backend/                    # Node.js Express server
│   ├── src/
│   │   ├── routes/
│   │   │   ├── feed.ts        # Feed fetching & aggregation
│   │   │   ├── articles.ts    # Article retrieval & ranking
│   │   │   ├── settings.ts    # User preferences
│   │   │   ├── search.ts      # Search & suggestions
│   │   │   └── personalisation.ts  # For You section
│   │   ├── services/
│   │   │   ├── feedFetcher.ts     # RSS parsing
│   │   │   ├── scraper.ts        # HTML scraping
│   │   │   ├── paywallDetector.ts # AI paywall detection
│   │   │   ├── curator.ts        # Feed ranking & curation
│   │   │   ├── topicExtractor.ts  # Topic classification
│   │   │   └── personaliser.ts    # Personalisation engine
│   │   ├── db/
│   │   │   ├── models.ts      # Data models
│   │   │   └── index.ts       # DB connection (Firebase/Supabase)
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   └── validators.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── errorHandler.ts
│   │   └── server.ts          # Express app entry
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/                   # React + TypeScript PWA
│   ├── public/
│   │   ├── manifest.json      # PWA manifest
│   │   ├── service-worker.js  # Service Worker
│   │   ├── icons/             # App icons (192x192, 512x512, etc.)
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── NavTabs.tsx
│   │   │   │   └── Sidebar.tsx
│   │   │   ├── Feed/
│   │   │   │   ├── FeedSection.tsx    # 2-column grid section
│   │   │   │   ├── ArticleCard.tsx    # Individual article card
│   │   │   │   ├── SectionTabs.tsx    # Horizontal swipeable tabs
│   │   │   │   └── PullToRefresh.tsx
│   │   │   ├── Article/
│   │   │   │   ├── ArticleReader.tsx  # Full article view
│   │   │   │   └── ArticleFeedback.tsx # Like/feedback controls
│   │   │   ├── Search/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── SearchResults.tsx
│   │   │   ├── Settings/
│   │   │   │   ├── SettingsPanel.tsx
│   │   │   │   ├── SourceManagement.tsx
│   │   │   │   ├── TopicManagement.tsx
│   │   │   │   ├── ThemeSelector.tsx
│   │   │   │   ├── NotificationSettings.tsx
│   │   │   │   └── CacheManager.tsx
│   │   │   └── Common/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Modal.tsx
│   │   │       └── Loader.tsx
│   │   ├── hooks/
│   │   │   ├── useFeed.ts
│   │   │   ├── useArticle.ts
│   │   │   ├── useSettings.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── usePersonalisation.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── context/
│   │   │   ├── ThemeContext.tsx
│   │   │   ├── UserContext.tsx
│   │   │   └── FeedContext.tsx
│   │   ├── styles/
│   │   │   ├── themes/
│   │   │   │   ├── lightMode.ts
│   │   │   │   ├── darkMode.ts
│   │   │   │   ├── sepiaMode.ts
│   │   │   │   ├── kindleWhite.ts
│   │   │   │   ├── kindleWarm.ts
│   │   │   │   ├── highContrast.ts
│   │   │   │   └── slate.ts
│   │   │   ├── globals.css
│   │   │   └── responsive.css
│   │   ├── utils/
│   │   │   ├── api.ts         # API client
│   │   │   ├── cache.ts       # IndexedDB manager
│   │   │   ├── gestures.ts    # Touch gesture handlers
│   │   │   ├── notifications.ts
│   │   │   └── helpers.ts
│   │   ├── types/
│   │   │   ├── feed.ts
│   │   │   ├── article.ts
│   │   │   ├── user.ts
│   │   │   └── api.ts
│   │   ├── pages/
│   │   │   ├── Home.tsx       # Main feed view
│   │   │   ├── ArticlePage.tsx # Full article reader
│   │   │   ├── SearchPage.tsx  # Search results
│   │   │   └── SettingsPage.tsx
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── shared/                     # Shared utilities
│   ├── types.ts               # Common TypeScript types
│   ├── constants.ts           # App constants (sections, etc.)
│   └── config.ts              # Configuration
│
├── docker-compose.yml         # Local development
├── .env.example               # Environment variables template
├── .gitignore
└── package.json               # Root package for workspaces
```

## Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Material-UI (MUI)** with Material 3 theme
- **TanStack Query** (data fetching & caching)
- **Zustand** (state management)
- **IndexedDB** (offline storage)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Firebase Realtime Database** or **Supabase** (free tier, user data)
- **Hugging Face Inference API** (AI paywall detection, topic extraction)
- **Cheerio** (HTML scraping)
- **rss-parser** (RSS parsing)
- **Bull** (job queue for feed refresh)

### PWA & Deployment
- **Service Worker** (offline support, caching)
- **Web Push API** (notifications)
- **Vercel** or **Railway** (serverless backend)
- **Cloudflare Pages** or **Vercel** (static frontend)
- **Bubblewrap** (APK packaging, optional)

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase or Supabase account (free tier)
- Hugging Face API token (free)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/sabarivelan1078-lgtm/pwa-news-app.git
cd pwa-news-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API keys and configuration
```

4. Start the backend:
```bash
cd backend
npm run dev
```

5. Start the frontend (in another terminal):
```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

## Configuration

### News Sources (156 URLs)
All 156 news sources are pre-configured in `shared/constants.ts`.

### Followed Topics (223 Topics)
All 223 topics are embedded in `shared/constants.ts`.

### Tamil Nadu Districts (12 Districts)
Special prioritisation for:
- Ramanathapuram, Paramakudi, Muthukulathur, Chennai, Vellore, Tirunelveli
- Tiruppur, Tiruvannamalai, Coimbatore, Tiruchirappalli, Madurai, Sayalgudi

### Feed Sections (16 Sections)
1. Breaking News
2. Headlines
3. India
4. Tamil Nadu
5. Business & Finance
6. Economy
7. Europe
8. Middle East
9. East Asia
10. World News
11. Technology
12. Indian Editorials
13. International Editorials
14. History
15. Geopolitics
16. For You (Personalised)

## Features

### AI Curation
- **Chief Editor Logic**: Editorial ranking based on importance, recency, source credibility
- **Paywall Detection**: AI model classifies articles as free or paywalled
- **Topic Extraction**: Automatic categorisation of articles
- **Deduplication**: Removes thematically similar stories
- **Source Diversity**: Max 2 articles per source per section

### Personalisation
- **Reading Behaviour**: Tracks time spent, articles opened, topics revisited
- **Explicit Feedback**: "Show more / Show less" buttons on every article
- **For You Section**: Dynamically curated based on preferences
- **Topic Management**: Users can add/remove followed topics

### Performance
- **Feed Refresh**: 30-45 minute intervals (user configurable)
- **Static Between Refreshes**: No re-renders unless interval elapsed
- **Aggressive Caching**: Service Worker + Cache API
- **Image Optimisation**: Lazy loading, responsive srcset
- **Offline Support**: Previously cached content always available

### Themes (8 Options)
1. System Default
2. Light Mode
3. Dark Mode
4. Sepia Mode
5. Kindle Paperwhite
6. Kindle Soft Glow
7. High Contrast
8. Slate / Neutral

### Device Optimisation
- **Redmi Pad 2**: 2000×1200 resolution, 10.61-inch display
- **Responsive Design**: Portrait & landscape support
- **Gesture Support**: Swipe, scroll, pinch-to-zoom, pull-to-refresh, long-press
- **Tap Targets**: 48dp minimum (Material 3 spec)

## API Endpoints

### Feed API
```
GET  /api/v1/feed/sections        # All sections with articles
GET  /api/v1/feed/section/:id     # Single section
POST /api/v1/feed/refresh         # Trigger manual refresh
```

### Articles API
```
GET  /api/v1/articles/:id         # Full article content
POST /api/v1/articles/:id/read    # Mark as read
POST /api/v1/articles/:id/feedback # Like / Dislike
```

### Search API
```
GET  /api/v1/search?q=query       # Search articles
GET  /api/v1/search/suggestions?q=query # Search suggestions
```

### Settings API
```
GET  /api/v1/settings             # User settings
POST /api/v1/settings             # Update settings
GET  /api/v1/settings/sources     # Configured sources
POST /api/v1/settings/sources     # Add/remove sources
GET  /api/v1/settings/topics      # Followed topics
POST /api/v1/settings/topics      # Add/remove topics
```

### Personalisation API
```
GET  /api/v1/personalisation/foryou    # For You section
POST /api/v1/personalisation/feedback  # Reading behaviour
```

## Deployment

### Backend (Vercel)
```bash
vercel --prod
```

### Frontend (Vercel / Cloudflare Pages)
```bash
npm run build
# Upload to Vercel or Cloudflare Pages
```

## Cost Breakdown (All Free-Tier)

- **Hosting**: Vercel (frontend + backend functions) — Free
- **Database**: Firebase Realtime / Supabase — Free tier (generous limits)
- **AI Models**: Hugging Face Inference API — Free tier (5,000 requests/month)
- **Domain**: GitHub Pages or Vercel domain — Free
- **Notifications**: Web Push API — Free (no third-party service)
- **CDN**: Vercel / Cloudflare — Free

**Total Monthly Cost: $0**

## Development Roadmap

- [x] Project scaffold
- [ ] Phase 1: Core PWA infrastructure (Express, Material 3, Service Worker)
- [ ] Phase 2: Backend feed pipeline (RSS fetcher, scraper, paywall detector)
- [ ] Phase 3: AI curation & personalisation (ranking, topic extraction, For You)
- [ ] Phase 4: Frontend UI & UX (React components, themes, responsive design)
- [ ] Phase 5: Testing & optimization (E2E tests, performance tuning)
- [ ] Phase 6: Deployment & monitoring (Vercel setup, error tracking)

## License

MIT

## Author

Built with ❤️ for premium news reading.
