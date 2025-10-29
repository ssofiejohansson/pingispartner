export const useLang = () => {
    const route = useRoute();

    if (route.path.includes("/en/")) {
      return "en-gb";
    } else if (route.path.includes("/de/")) {
      return "de-de";
    } else {
      return "sv-se";
    }
}