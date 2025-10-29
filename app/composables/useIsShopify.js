export const useIsShopify = () => {
    const runtimeConfig = useRuntimeConfig();

    if ( runtimeConfig?.public?.shopify === true ) {
        return true;
    } else {
        return false;
    }
}