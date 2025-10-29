export const createCheckoutMutation = gql`
  mutation Checkout($lineItems: [CheckoutLineItemInput!]) {
    checkoutCreate(
      input: { lineItems: $lineItems }
    ) {
      checkout {
        webUrl
      }
    }
  }
`;