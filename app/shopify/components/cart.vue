<template>
  <div v-if="cartOpen">
    <div
      class="fixed right-0 top-0 h-screen w-11/12 max-w-[600px] bg-white z-[200] p-5 lg:p-10 flex flex-col justify-between"
    >
      <div>
        <div
          class="flex items-center text-2xl md:text-4xl lg:text-6xl leading-none"
        >
          Varukorg
          <div
            class="transform -translate-y-1/2 text-[0.5em] ml-1 translate-x-1"
          >
            [{{ cartQuantity }}]
          </div>
        </div>

        <div class="mt-10 space-y-5">
          <div
            v-for="(item, index) in cart"
            :key="item.variantId"
            class="flex w-full space-x-3 sm:space-x-5 border-b border-zinc-100 pb-5 last:border-none"
          >
            <nuxt-img
              :src="item.thumbnail"
              class="w-16 md:w-20 lg:w-24 mb-auto aspect-square flex-shrink-0 flex-grow-0"
              format="webp"
            />
            <div class="w-full flex flex-col justify-between">
              <div class="flex justify-between w-full leading-[1.15]">
                <div>
                  <p
                    class="text-sm md:text-lg m-0 flex-shrink pr-5 lg:pr-10 mb-2"
                  >
                    {{ item.title }}
                    <span class="text-base">x{{ item.quantity }}</span>
                  </p>
                </div>
                <p class="text-sm mdtext-lg m-0 flex-shrink-0 text-right">
                  {{ item.price }} SEK
                </p>
              </div>
              <div class="flex justify-between items-end w-full">
                <SelectQuantity
                  :quantity="item.quantity"
                  @decreaseQuantity="decreaseQuantity(index)"
                  @increaseQuantity="increaseQuantity(index)"
                  :small="true"
                />

                <p
                  class="text-[12px] md:text-sm hover:underline underline-offset-4 cursor-pointer"
                  @click="removeFromCart(item.variantId)"
                >
                  Ta bort
                </p>
              </div>
            </div>
          </div>

          <div v-if="!cart.length">
            <p>Din varukorg är tom!</p>
          </div>
        </div>
      </div>

      <div>
        <div
          v-if="cart.length"
          class="flex items-end justify-between md:text-lg mb-6"
        >
          <span>Totalsumma:</span>
          <span class="lg:text-2xl">{{ subTotal }} SEK</span>
        </div>

        <button
          v-if="cart.length"
          class="appearance-none w-full bg-black text-white hover:bg-zinc-800 px-8 text-center h-12 md:h-16 lg:h-20"
          @click="redirectToPayment(cart)"
        >
          <span v-if="!loading">Till kassan</span>
          <img v-else src="/preloader.svg" class="w-8 h-auto block mx-auto" />
        </button>
      </div>
    </div>
    <div
      class="fixed w-full h-full inset-0 bg-zinc-900 bg-opacity-20 z-[100]"
      @click="cartToggle()"
    ></div>
  </div>
</template>

<script setup>
import { createCheckoutMutation } from "~~/graphql/createCheckoutMutation";

const {
  cart,
  cartOpen,
  cartToggle,
  removeFromCart,
  loadCart,
  cartQuantity,
  setCart,
  subTotal,
} = useCart();

const loading = ref(false);

const redirectToPayment = async (cart) => {
  loading.value = true;
  const lineItems = [];

  cart.forEach((item) => {
    lineItems.push({
      variantId: item.variantId,
      quantity: item.quantity,
    });
  });

  const { data } = await useAsyncQuery(createCheckoutMutation, {
    lineItems,
  });

  window.location.href = data.value.checkoutCreate.checkout.webUrl;
};

const decreaseQuantity = (index) => {
  cart.value[index].quantity--;

  if (cart.value[index].quantity > 0) {
    setCart(cart.value);
  } else {
    removeFromCart(cart.value[index].variantId);
  }
};

const increaseQuantity = (index) => {
  cart.value[index].quantity++;

  if (cart.value[index].quantity > 0) {
    setCart(cart.value);
  } else {
    removeFromCart(cart.value[index].variantId);
  }
};

onMounted(() => {
  loadCart();
});
</script>
