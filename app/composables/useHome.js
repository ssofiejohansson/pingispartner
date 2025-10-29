export const useHome = () => {
    const route = useRoute();

    if (route.path.includes("/en/")) {
      return "/en/";
    } else if (route.path.includes("/de/")) {
      return "/de/";
    } else {
      return "/";
    }
}