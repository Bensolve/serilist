// ============================================
// CHINA-LEVEL DATA ARCHITECTURE
// Scalable, Performance-First
// ============================================

export type Status =
  | "WATCHING"
  | "COMPLETED"
  | "PLANNING"
  | "DROPPED"
  | "PAUSED";

// Season tracking - each season separate
export interface Season {
  seasonNumber: number;
  episodeCount: number;
  watchedEpisodes: number[]; // Array of episode numbers watched [1, 2, 3, 5]
  status: Status;
  completedAt?: string; // ISO date when finished
}

// Genre for recommendations
export interface Genre {
  id: number;
  name: string;
}

// Main Series Model - Scalable
export interface Series {
  // Identifiers
  id: number; // TMDB ID
  tmdbId: number; // For API calls

  // Basic Info
  title: string;
  originalTitle: string;
  posterPath: string;
  backdropPath?: string;
  overview: string;

  // Metadata
  genres: Genre[];
  firstAirDate: string;
  status: "Returning Series" | "Ended" | "Canceled";

  // User Tracking Data
  userStatus: Status;
  seasons: Season[];
  rating?: number; // User's personal rating (1-10)
  notes?: string;

  // Performance metadata
  addedAt: string; // ISO date
  updatedAt: string; // ISO date
  lastWatchedAt?: string; // ISO date - for "Continue Watching"
}

// Stats calculation helper
export interface SeriesStats {
  totalSeasons: number;
  totalEpisodes: number;
  watchedEpisodes: number;
  progress: number; // Percentage 0-100
  currentSeason: number;
  currentEpisode: number;
}

// For trending/discovery
export interface TrendingData {
  seriesId: number;
  addCount: number; // How many users added this week
  watchCount: number; // Total episodes watched
  score: number; // Trending score
}

// Cache structure for performance
export interface CacheData {
  key: string;
  data: any;
  timestamp: number;
  ttl: number; // Time to live in ms
}

// Related series recommendations
export interface RelatedSeries {
  seriesId: number;
  title: string;
  posterPath: string;
  similarity: number; // 0-1 score
  reason: string; // "Same genre", "Same actors", etc.
}
