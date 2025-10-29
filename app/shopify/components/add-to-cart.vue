<template>
  <div class="flex">
    <SelectQuantity
      :quantity="quantity"
      @decreaseQuantity="quantity--"
      @increaseQuantity="quantity++"
    />
    <button
      @click="addProductToCart(product, quantity)"
      class="bg-black hover:bg-zinc-800 text-white px-8 antialiased h-14 relative"
    >
      <span
        class="transition-opacity"
        :class="[added ? 'opacity-0' : 'opacity-100']"
        ><slot
      /></span>
      <svg
        class="absolute top-0 left-0 right-0 bottom-0 w-7 h-7 m-auto transition-opacity"
        :class="[added ? 'opacity-100' : 'opacity-0']"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { addToCart } = useCart();
const quantity = ref(1);
const added = ref(false);

function addProductToCart(product, quantity) {
  added.value = true;
  addToCart(product, quantity);
  setTimeout(() => {
    added.value = false;
  }, 2000);
}

function increaseQuantity() {
  quantity.value++;
}

function decreaseQuantity() {
  quantity.value--;
}
</script>
