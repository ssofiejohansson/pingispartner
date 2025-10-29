export const useSettings = () => {
  const { client } = usePrismic();
  const lang = useLang();

  return useAsyncData(`settings-${lang}`, () =>
    client.getSingle("settings", { lang })
  );
};
