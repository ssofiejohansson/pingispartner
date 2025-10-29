import type { PrismicDoc } from "./types";
import { documentTypes } from "../wlsn.config";


/**
 * Formats a document's last publication date into YYYY-MM-DD format
 * @param doc - Prismic document containing publication date
 * @returns Formatted date string or null if no date exists
 */
export function formatLastmod(doc: PrismicDoc): string | null {
  if (!doc.last_publication_date) return null;
  return new Date(doc.last_publication_date).toISOString().split("T")[0] ?? null;
}

/**
 * Generates the full URL path for a Prismic document
 * Handles language prefixes and nested page structures
 * @param doc - Prismic document to generate URL for
 * @param langId - Language identifier (e.g. "sv-se", "en-us")
 * @returns Complete URL path with appropriate nesting and language prefix
 */
export function generatePageUrl(doc: PrismicDoc, langId: string): string {
  const langSlug = langId === "sv-se" ? "/" : `/${langId.split("-")[0]}/`;

  // Page gets special treatment
  if (doc.type === 'page') {
    if (hasGrandparent(doc)) {
      return `${langSlug}${doc.data.parent?.data?.parent?.uid}/${doc?.data?.parent?.uid}/${doc.uid}/`;
    } else if (hasParent(doc)) {
      return `${langSlug}${doc.data.parent?.uid}/${doc.uid}/`;
    } else {
      return `${langSlug}${doc.uid}/`;
    }
  }

  // Other types automatically get the correct path from documentTypes in wlsn.config.ts
  const documentType = documentTypes.find((dt) => doc.type === dt.type);
  if (documentType && documentType.paths && documentType.paths[langId] !== undefined) {
    return langSlug + documentType.paths[langId];
  }

  return "";
}

/**
 * Checks if a document has a grandparent page in its hierarchy
 * @param doc - Prismic document to check
 * @returns true if document has both parent and grandparent
 */
export function hasGrandparent(doc: PrismicDoc): boolean {
  return hasProp(doc.data.parent, "data") && hasProp(doc.data.parent?.data, "parent");
}

/**
 * Checks if a document has a parent page
 * @param doc - Prismic document to check
 * @returns true if document has a parent with a uid
 */
export function hasParent(doc: PrismicDoc): boolean {
  return hasProp(doc.data.parent, "uid");
}

/**
 * Safely checks if an object has a specific property
 * @param obj - Object to check
 * @param prop - Property name to look for
 * @returns true if object exists and has the specified property
 */
export function hasProp(obj: any, prop: string): boolean {
  return obj && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, prop);
}
