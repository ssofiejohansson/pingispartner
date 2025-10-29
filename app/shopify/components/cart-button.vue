<template>
  <div class="flex items-center cursor-pointer" @click="cartToggle()">
    Varukorg
    <span class="block transform -translate-y-1/3 text-sm"
      >[{{ cartQuantity }}]</span
    >
  </div>
</template>

<script setup>
let amount = ref(1);
const { cartQuantity, cartOpen, cartToggle } = useCart();
</script>
