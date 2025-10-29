import { ofetch } from "ofetch";
import smConfig from "../slicemachine.config.json";
import type { PrismicApiResponse, PrismicRef } from "./types";

// Construct the Prismic API endpoint URL using repository name from config
export const PRISMIC_API = `https://${smConfig.repositoryName}.prismic.io/api/v2`;

/**
 * Fetches and returns essential metadata from Prismic API
 * @returns Object containing:
 * - ref: Current master reference ID for API requests
 * - languages: Array of available languages in the repository
 * @throws Error if master reference cannot be found
 */
export async function getPrismicMetadata() {
  try {
    // Fetch repository data from Prismic API
    const repoData = await ofetch<PrismicApiResponse>(PRISMIC_API);

    // Find the master reference ID from available refs
    const ref = repoData.refs.find((ref: PrismicRef) => ref.isMasterRef)?.ref;

    // Get available languages, defaulting to empty array if none exist
    const languages = repoData.languages || [];

    // Ensure master reference exists
    if (!ref) throw new Error("❌ Prismic Master Ref not found.");

    return { ref, languages };
  } catch (error) {
    console.error("❌ Error fetching Prismic metadata:", error);
    throw error;
  }
}
