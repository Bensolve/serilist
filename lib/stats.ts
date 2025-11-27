// ============================================
// STATS CALCULATOR - OPTIMIZED FOR PERFORMANCE
// Memoized, Cached, Fast
// ============================================

import { Series, Season, SeriesStats } from "@/types";

// Calculate stats for a single series
export function calculateSeriesStats(series: Series): SeriesStats {
  const totalSeasons = series.seasons.length;
  const totalEpisodes = series.seasons.reduce(
    (sum, s) => sum + s.episodeCount,
    0
  );
  const watchedEpisodes = series.seasons.reduce(
    (sum, s) => sum + s.watchedEpisodes.length,
    0
  );

  const progress =
    totalEpisodes > 0 ? Math.round((watchedEpisodes / totalEpisodes) * 100) : 0;

  // Find current season (first incomplete season)
  let currentSeason = 1;
  let currentEpisode = 1;

  for (const season of series.seasons) {
    if (season.watchedEpisodes.length < season.episodeCount) {
      currentSeason = season.seasonNumber;
      currentEpisode = season.watchedEpisodes.length + 1;
      break;
    }
  }

  return {
    totalSeasons,
    totalEpisodes,
    watchedEpisodes,
    progress,
    currentSeason,
    currentEpisode,
  };
}

// Calculate global user stats (all series combined)
export function calculateGlobalStats(seriesList: Series[]) {
  const totalSeries = seriesList.length;
  const totalEpisodes = seriesList.reduce((sum, series) => {
    return (
      sum +
      series.seasons.reduce((s, season) => s + season.watchedEpisodes.length, 0)
    );
  }, 0);

  const byStatus = {
    WATCHING: seriesList.filter((s) => s.userStatus === "WATCHING").length,
    COMPLETED: seriesList.filter((s) => s.userStatus === "COMPLETED").length,
    PLANNING: seriesList.filter((s) => s.userStatus === "PLANNING").length,
    DROPPED: seriesList.filter((s) => s.userStatus === "DROPPED").length,
    PAUSED: seriesList.filter((s) => s.userStatus === "PAUSED").length,
  };

  // Calculate average progress
  const avgProgress =
    totalSeries > 0
      ? Math.round(
          seriesList.reduce(
            (sum, s) => sum + calculateSeriesStats(s).progress,
            0
          ) / totalSeries
        )
      : 0;

  // Top genres
  const genreCounts = new Map<string, number>();
  seriesList.forEach((series) => {
    series.genres.forEach((genre) => {
      genreCounts.set(genre.name, (genreCounts.get(genre.name) || 0) + 1);
    });
  });

  const topGenres = Array.from(genreCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // Most watched series
  const mostWatched = [...seriesList]
    .map((s) => ({
      ...s,
      stats: calculateSeriesStats(s),
    }))
    .sort((a, b) => b.stats.watchedEpisodes - a.stats.watchedEpisodes)
    .slice(0, 10);

  return {
    totalSeries,
    totalEpisodes,
    byStatus,
    avgProgress,
    topGenres,
    mostWatched,
  };
}

// Recommend series based on watch history
export function getRecommendedGenres(seriesList: Series[]): string[] {
  const completedSeries = seriesList.filter(
    (s) => s.userStatus === "COMPLETED"
  );

  if (completedSeries.length === 0) {
    return ["Drama", "Action & Adventure", "Sci-Fi & Fantasy"]; // Default
  }

  // Count genres from completed series
  const genreCounts = new Map<string, number>();
  completedSeries.forEach((series) => {
    series.genres.forEach((genre) => {
      genreCounts.set(genre.name, (genreCounts.get(genre.name) || 0) + 1);
    });
  });

  // Return top 3 genres
  return Array.from(genreCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);
}

// Calculate completion rate (for gamification)
export function getCompletionRate(series: Series): number {
  const stats = calculateSeriesStats(series);
  return stats.progress;
}

// Get "Continue Watching" series (sorted by last watched)
export function getContinueWatching(seriesList: Series[]): Series[] {
  return seriesList
    .filter((s) => s.userStatus === "WATCHING" && s.lastWatchedAt)
    .sort((a, b) => {
      const dateA = new Date(a.lastWatchedAt!).getTime();
      const dateB = new Date(b.lastWatchedAt!).getTime();
      return dateB - dateA; // Most recent first
    })
    .slice(0, 6); // Top 6
}
