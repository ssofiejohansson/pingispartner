export interface PrismicRef {
  isMasterRef: boolean;
  ref: string;
}

export interface PrismicLanguage {
  id: string;
  name: string;
}

export interface PrismicApiResponse {
  refs: PrismicRef[];
  languages: PrismicLanguage[];
}

export interface DocumentType {
  type: string;
  singleton: boolean;
  paths: Record<string, string>;
}

export interface PrismicResult {
  lang: string;
  results: any[];
}

export interface SitemapEntry {
  loc: string;
  lastmod: string | null;
  priority: number;
  changefreq: string;
}

export interface ProcessedData {
  routes: string[];
  sitemap: Record<string, SitemapEntry>;
}

export interface PrismicDoc {
  type: string | null;
  uid: string | null;
  last_publication_date?: string | null;
  data: {
    parent?: { uid?: string | null; data?: { parent?: { uid?: string | null } } };
    priority?: number | null;
    changefreq?: string | null;
  };
}

export interface RedirectItem {
  old: string;
  new: string;
  status: string;
}

export interface RedirectResponse {
  results: [{ data: { redirects: RedirectItem[] } }];
}
