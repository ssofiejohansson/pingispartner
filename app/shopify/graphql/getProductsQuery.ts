export const getProductsQuery = gql`
query Products ($first: Int!, $query: String, $sortKey: ProductSortKeys!, $reverse: Boolean) {
  products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse ) {
    edges {
      node {
        id
        images(first: 1) {
          edges {
            node {
              src
            }
          }
        }
        title
        description
        handle
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`