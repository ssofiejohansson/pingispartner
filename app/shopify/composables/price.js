export const usePrice = () => {
  const formatPrice = (price) => {
    if (price.amount > 0) {
      return `${parseFloat(price.amount)} ${price.currencyCode}`;
    } else {
      return false;
    }
  };

  return { formatPrice };
};
