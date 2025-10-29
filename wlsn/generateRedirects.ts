import { ofetch } from "ofetch";
import fs from "fs";
import path from "path";
import smConfig from "../slicemachine.config.json";
import type { PrismicApiResponse, PrismicRef, RedirectItem, RedirectResponse } from "./types";

// Default export that returns redirect rules from Prismic
export default async () => {
  return await getPrismicRedirects();
};

/**
 * Fetches and processes redirect rules from Prismic CMS
 * Creates a Netlify _redirects file with the rules
 * @returns Array of redirect rules as strings
 */
export async function getPrismicRedirects(): Promise<string[]> {
  const redirects: string[] = [];
  // Construct Prismic API endpoint using repository name from config
  const endpoint = `https://${smConfig.repositoryName}.prismic.io/api/v2`;

  try {
    // Get Prismic API response to find the master ref
    const res = await ofetch<PrismicApiResponse>(endpoint);
    const ref = res.refs.find((ref: PrismicRef) => ref.isMasterRef)?.ref;

    if (!ref) {
      console.error("❌ Prismic Master Ref not found.");
      return [];
    }

    // Fetch redirect documents using the master ref
    const redirectEndpoint = `${endpoint}/documents/search?ref=${ref}&q=[[at(document.type,"redirects")]]#format=json`;
    const redirectResponse = await ofetch<RedirectResponse>(redirectEndpoint);

    if (!redirectResponse?.results?.length) {
      console.warn("⚠️ No redirects found in Prismic.");
      return [];
    }

    // Process each redirect rule from the Prismic document
    redirectResponse.results[0]?.data?.redirects?.forEach((redirect: RedirectItem) => {
      // Skip invalid redirects missing old or new paths
      if (!redirect.old || !redirect.new) {
        console.warn("⚠️ Skipping invalid redirect:", redirect);
        return;
      }
      // Format redirect rule: "old-path new-path status-code"
      redirects.push(`${redirect.old} ${redirect.new} ${parseInt(redirect.status) || 301}`);
    });

    console.log("🚀 Prismic Redirects:", redirects);

    // Array for additional static redirects that aren't managed in Prismic
    const manualRedirects: string[] = [
      // "/404 /404 404",
      // Example: "/old-url /new-url 301",
    ];

    // Write all redirects to the Netlify _redirects file
    const redirectsFilePath = path.resolve("public", "_redirects");
    const finalRedirects = [...redirects, ...manualRedirects].join("\n") + "\n";
    fs.writeFileSync(redirectsFilePath, finalRedirects);

    console.log("✅ Created new Netlify `_redirects` file:", redirectsFilePath);
    return redirects;
  } catch (error) {
    console.error("❌ Error fetching redirects from Prismic:", error);
    return [];
  }
}
