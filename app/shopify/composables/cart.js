export const useCart = () => {
  const cart = useState("cart", () => []);
  const cartOpen = useState("cartOpen", () => false);
  const cartQuantity = useState("cartQuantity", () => 0);
  const subTotal = useState("subTotal", () => 0);

  const cartToggle = () => {
    cartOpen.value = !cartOpen.value;
  };

  const loadCart = () => {
    cart.value = JSON.parse(localStorage.getItem("shoppingCart") || "[]");
    updateQuantity();
  };

  const setCart = (cart) => {
    cart.value = cart;
    updateCartLocalStorage();
  };

  const updateQuantity = () => {
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.value.forEach((item) => {
      const itemPrice = parseFloat(item.price) * item.quantity;

      totalQuantity = totalQuantity + item.quantity;
      totalPrice = totalPrice + itemPrice;
    });

    cartQuantity.value = totalQuantity;
    subTotal.value = totalPrice;
  };

  const updateCartLocalStorage = () => {
    updateQuantity();
    localStorage.setItem("shoppingCart", JSON.stringify(cart.value));
  };

  const addToCart = (product, quantity) => {
    const variantId = product.variants.edges[0].node.id;

    let itemInCart = cart.value.findIndex((i) => i.variantId === variantId);

    if (itemInCart >= 0) {
      cart.value[itemInCart].quantity =
        cart.value[itemInCart].quantity + quantity;
    } else {
      cart.value.push({
        variantId,
        thumbnail: product.images.edges[0].node.src,
        title: product.title,
        price: parseFloat(product.priceRange.maxVariantPrice.amount),
        currency: product.priceRange.maxVariantPrice.currencyCode,
        quantity,
      });
    }

    updateCartLocalStorage();
  };

  const removeFromCart = (product) => {
    let itemInCart = cart.value.findIndex((i) => i.variantId === product);

    if (itemInCart >= 0) {
      cart.value.splice(itemInCart, 1);
    }

    updateCartLocalStorage();
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    loadCart,
    cartQuantity,
    cartOpen,
    cartToggle,
    setCart,
    subTotal,
  };
};
