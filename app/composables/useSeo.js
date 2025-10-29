export default ({ doc }) => {
  const runtimeConfig = useRuntimeConfig();
  const route = useRoute();

  useSeoMeta({
    title: doc?.value?.data?.metaTitle ?? doc?.value?.data?.title[0]?.text,
    ogTitle: doc?.value?.data?.metaTitle ?? "",
    ogDescription: doc?.value?.data?.metaDescription ?? "",
    description: doc?.value?.data?.metaDescription ?? "",
    ogImage: doc?.value?.data?.metaImage?.url ?? "",
    twitterTitle:
      doc?.value?.data?.metaTitle ?? doc?.value?.data?.title[0].text,
    twitterDescription: doc?.value?.data?.metaDescription ?? "",
    twitterImage: doc?.value?.data?.metaImage?.url ?? "",
    ogUrl:
      doc?.value?.data?.canonical ?? runtimeConfig.public.siteUrl + route.path,
    robots: doc?.value?.data?.hide_page ? "noindex, nofollow" : "index,follow",
  });

  useHead({
    link: [
      {
        rel: "canonical",
        href:
          doc?.value?.data?.canonical_url ??
          runtimeConfig.public.siteUrl + route.path,
      },
    ],
  });
};
