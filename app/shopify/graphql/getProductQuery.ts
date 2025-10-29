export const getProductQuery = gql`
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      productType
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
      description
      metafields(identifiers: 
        [
          {namespace: "custom", key: "width"},
          {namespace: "custom", key: "height"},
          {namespace: "custom", key: "length"},
          {namespace: "custom", key: "volume"},
        ]) {
        key
        value
      }
      images(first: 1) {
        edges {
          node {
            src
          }
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;