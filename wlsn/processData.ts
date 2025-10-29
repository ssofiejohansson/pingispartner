import { formatLastmod, generatePageUrl } from "./helpers";
import { documentTypes } from "../wlsn.config";
import type { PrismicResult, PrismicDoc, ProcessedData, SitemapEntry } from "./types";

/**
 * Processes raw Prismic CMS data into routes and sitemap entries
 *
 * @param prismicData Array of Prismic results grouped by language
 * @returns ProcessedData object containing:
 *  - routes: Array of URL paths for the site
 *  - sitemap: Object mapping URLs to their sitemap entries
 */
export function processPrismicData(prismicData: PrismicResult[]): ProcessedData {
  console.log("🔄 Processing Prismic data...");

  // Initialize arrays to store processed data
  const routes: string[] = [];
  const sitemap: Record<string, SitemapEntry> = {};

  // Process each language's results
  prismicData.forEach(({ lang, results }) => {
    // Process each document within the language
    results.forEach((doc: PrismicDoc) => {
      const { type, uid } = doc;

      // Generate the URL path for this document
      const url = generatePageUrl(doc, lang);

      // Skip documents whose type isn't configured in documentTypes
      if (!documentTypes.some((docType) => docType.type === type)) return;

      // Add URL to routes array
      routes.push(url);

      // Create sitemap entry for this URL
      sitemap[url] = {
        loc: url, // URL location
        lastmod: formatLastmod(doc), // Last modified date
        // Set priority - use document's priority or default based on type
        priority: doc.data.priority || (documentTypes.some((docType) => docType.type === type) ? 0.5 : 0.3),
        // Set change frequency - use document's value or default to weekly
        changefreq: doc.data.changefreq || "weekly",
      };
    });
  });

  // Return processed routes and sitemap data
  return { routes, sitemap };
}
