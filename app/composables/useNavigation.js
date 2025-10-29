export const useNavigation = () => {
  const { client } = usePrismic();
  const lang = useLang();

  return useAsyncData(`navigation-${lang}`, () =>
    client.getSingle("navigation", { lang })
  );
};
