import { ofetch } from "ofetch";
import { PRISMIC_API, getPrismicMetadata } from "./prismicSetup";
import { documentTypes } from "../wlsn.config";
import type { PrismicLanguage, PrismicResult } from "./types";

/**
 * Fetches content from Prismic CMS for all configured languages
 * Handles pagination to fetch all documents when more than 100 exist
 * Returns an array of results grouped by language
 */
export async function fetchPrismicData(): Promise<PrismicResult[]> {
  try {
    // Get the current Prismic API reference and available languages
    const { ref, languages } = await getPrismicMetadata();

    // Create a comma-separated string of document types to query
    // e.g. "homepage","page"
    const queryTypes = documentTypes.map((doc) => `"${doc.type}"`).join(",");

    // Fetch data for each language in parallel
    return await Promise.all(
      languages.map(async (lang: PrismicLanguage) => {
        try {
          // For Swedish (sv-se), we don't need a language parameter
          // For other languages, add the language code to the query
          const langString = lang.id === "sv-se" ? "" : `&lang=${lang.id}`;
          let allResults: any[] = [];
          let page = 1;
          let hasMorePages = true;

          // Keep fetching pages until we get all documents
          while (hasMorePages) {
            // Construct the Prismic API URL with:
            // - Current API reference
            // - Page size of 100 documents
            // - Current page number
            // - Query to fetch documents of specified types
            // - Language parameter if needed
            const url = `${PRISMIC_API}/documents/search?ref=${ref}&pageSize=100&page=${page}&q=[[any(document.type,[${queryTypes}])]]${langString}#format=json`;

            // Fetch documents from Prismic
            const res = await ofetch<{ results: any[]; next_page: string | null }>(url);

            // Add this page's results to our collection
            allResults = allResults.concat(res.results || []);

            // Check if there are more pages to fetch
            hasMorePages = !!res.next_page;
            page++;
          }

          // Return all results for this language
          return { lang: lang.id, results: allResults };
        } catch (error) {
          // If fetching fails for a specific language, log error and return empty results
          console.error(`❌ Failed to fetch data for language: ${lang.id}`, error);
          return { lang: lang.id, results: [] };
        }
      })
    );
  } catch (error) {
    // If the overall fetch fails (e.g. metadata fetch fails), log and return empty array
    console.error("❌ Error fetching Prismic data:", error);
    return [];
  }
}
