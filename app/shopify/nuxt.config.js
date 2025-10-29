export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo"],

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.SHOPIFY_URL,
        httpLinkOptions: { headers: { "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESSTOKEN } },
      },
    },
  },

  runtimeConfig: { public: { shopify: true } },
});
