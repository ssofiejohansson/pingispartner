// composables/useFooter.ts
export const useFooter = () => {
  const { client } = usePrismic();
  const lang = useLang();

  return useAsyncData(`footer-${lang}`, () =>
    client.getSingle("footer", { lang })
  );
};
