export const useCustomType = () => {
    const route = useRoute();

    if (route.path === "/") {
      return "homepage";
    } else {
      return "page";
    }
}