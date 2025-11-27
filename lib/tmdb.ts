// ============================================
// TMDB API SERVICE - CHINA PERFORMANCE LEVEL
// Caching, Error Handling, Optimization
// ============================================

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

// Cache for 1 hour (Chinese apps cache aggressively)
const CACHE_TTL = 3600000;
const cache = new Map<string, { data: any; timestamp: number }>();

// Cache helper
function getCached(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

// Search TV Series
export async function searchSeries(query: string) {
  const cacheKey = `search:${query}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    setCache(cacheKey, data.results || []);
    return data.results || [];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}

// Get Full Series Details (with seasons!)
export async function getSeriesDetails(seriesId: number) {
  const cacheKey = `series:${seriesId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${BASE_URL}/tv/${seriesId}?api_key=${API_KEY}&append_to_response=credits,recommendations`
    );
    const data = await res.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Failed to get series details:", error);
    return null;
  }
}

// Get Season Details
export async function getSeasonDetails(seriesId: number, seasonNumber: number) {
  const cacheKey = `season:${seriesId}:${seasonNumber}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${BASE_URL}/tv/${seriesId}/season/${seasonNumber}?api_key=${API_KEY}`
    );
    const data = await res.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error("Failed to get season details:", error);
    return null;
  }
}

// Get Recommendations (genre-based)
export async function getRecommendations(seriesId: number) {
  const cacheKey = `recommendations:${seriesId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${BASE_URL}/tv/${seriesId}/recommendations?api_key=${API_KEY}`
    );
    const data = await res.json();
    const recommendations = data.results?.slice(0, 10) || [];
    setCache(cacheKey, recommendations);
    return recommendations;
  } catch (error) {
    console.error("Failed to get recommendations:", error);
    return [];
  }
}

// Get Similar Series (algorithm-based)
export async function getSimilarSeries(seriesId: number) {
  const cacheKey = `similar:${seriesId}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${BASE_URL}/tv/${seriesId}/similar?api_key=${API_KEY}`
    );
    const data = await res.json();
    const similar = data.results?.slice(0, 10) || [];
    setCache(cacheKey, similar);
    return similar;
  } catch (error) {
    console.error("Failed to get similar series:", error);
    return [];
  }
}

// Get Trending Series (daily)
export async function getTrending() {
  const cacheKey = "trending:daily";
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`);
    const data = await res.json();
    const trending = data.results?.slice(0, 20) || [];
    setCache(cacheKey, trending);
    return trending;
  } catch (error) {
    console.error("Failed to get trending:", error);
    return [];
  }
}

// Image URL helpers (performance optimization)
export const getImageUrl = {
  poster: (path: string | null, size: "w185" | "w342" | "w500" = "w342") =>
    path ? `${IMAGE_BASE}/${size}${path}` : "",
  backdrop: (
    path: string | null,
    size: "w780" | "w1280" | "original" = "w780"
  ) => (path ? `${IMAGE_BASE}/${size}${path}` : ""),
};

// Clear cache (for debugging)
export function clearCache() {
  cache.clear();
}
