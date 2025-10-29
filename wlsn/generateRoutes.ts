import { fetchPrismicData } from "./prismicData";
import { processPrismicData } from "./processData";
import type { ProcessedData } from "./types";

// Cache to store processed Prismic data and avoid redundant API calls
let prismicDataCache: ProcessedData | null = null;

/**
 * Generates routes and sitemap data from Prismic CMS content
 * Uses caching to prevent unnecessary API calls
 *
 * @returns ProcessedData containing:
 * - routes: Array of URL paths
 * - sitemap: Object with sitemap entries
 */
export async function generateRoutes(): Promise<ProcessedData> {
  // Return cached data if available
  if (prismicDataCache) {
    console.log("♻️ Using cached Prismic data...");
    return prismicDataCache;
  }

  // Fetch fresh data from Prismic API
  const prismicData = await fetchPrismicData();

  // Transform raw Prismic data into routes and sitemap entries
  const processedData = processPrismicData(prismicData);

  // Cache the processed data for future use
  prismicDataCache = processedData;

  return processedData;
}
