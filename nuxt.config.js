// https://v3.nuxtjs.org/api/configuration/nuxt.config
import svgLoader from "vite-svg-loader";
import smConfig from "./slicemachine.config.json";
import { getPrismicRedirects } from "./wlsn/generateRedirects";
import { generateRoutes } from "./wlsn/generateRoutes";
import { documentTypes, prismicRoutes } from "./wlsn.config";

const prismicDataPromise = generateRoutes();

export default defineNuxtConfig({
  site: {
    url: process.env.URL || "http://localhost:3000",
    name: "Wilson Starter",
    trailingSlash: true,
  },

  app: {
    htmlAttrs: { lang: "sv" },
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      script: [
        {
          // Include Google Tag Manager if needed
          // hid: "gtm",
          // src: "/gtm.js",
        },
      ],
    },
  },

  // Include shopify if needed
  // extends: ["./shopify"],

  devtools: { enabled: false, componentInspector: false },

  modules: ["@nuxtjs/prismic", "@nuxtjs/tailwindcss", "@nuxtjs/sitemap"],

  css: ["~/assets/css/tailwind.css"],

  prismic: {
    endpoint: smConfig.repositoryName,
    modern: true,
    clientConfig: {
      routes: prismicRoutes,
    },
  },

  runtimeConfig: { public: { siteUrl: process.env.URL || "" } },

  sitemap: {
    // hostname: "https://yourdomain.com",
    exclude: ["/slice-simulator", "/preview"],
    urls: async () => {
      const { sitemap } = await prismicDataPromise; // ✅ Reuse cached data
      return Object.values(sitemap);
    },
    discoverVideos: false,
  },

  nitro: { prerender: { crawlLinks: false } },

  hooks: {
    async "nitro:config"(nitroConfig) {
      if (nitroConfig.dev) return;

      console.log("🚀 Fetching Prismic data for prerendering...");
      const { routes } = await prismicDataPromise; // ✅ Reuse cached data

      console.log(routes);

      console.log("📌 Adding routes for prerendering...");
      nitroConfig.prerender.routes.push(...routes);

      console.log("📜 Updating `_redirects` file...");
      await getPrismicRedirects();

      console.log("✅ Nitro config updated.");
    },
  },

  vite: { plugins: [svgLoader()] },

  compatibilityDate: "2025-04-11",
});
