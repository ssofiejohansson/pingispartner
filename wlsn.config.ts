import type { DocumentType } from "./wlsn/types";

// Used to generate routes in Nuxt and during site generation.
export const documentTypes: DocumentType[] = [
  // Do not include lang in path
  {
    type: "homepage",
    singleton: true,
    paths: {
      "sv-se": "",
      "en-gb": "",
    }
  },
  {
    type: "page",
    singleton: false,
    paths: {},
  },
];

// Used to return the correct urls in <prismic-link> fields.
export const prismicRoutes = [
  {
    type: "homepage",
    path: "/:lang?/"
  },
  {
    type: "page",
    path: "/:lang?/:grandparent?/:parent?/:uid/",
    resolvers: { grandparent: "parent.parent", parent: "parent" },
  },
]