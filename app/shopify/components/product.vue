<template>
  <div class="relative">
    <nuxt-link :to="link" class="block bg-zinc-200">
      <nuxt-img
        :src="image"
        class="w-full aspect-square object-cover"
        format="webp"
      />
    </nuxt-link>
    <div class="mt-2 lg:mt-5">
      <h5 class="text-lg lg:text-xl lg:mb-2 leading-tight">{{ title }}</h5>
      <p class="text-sm lg:text-base space-x-2">
        <span :class="[priceOriginal ? 'text-black' : '']">
          {{ price }}
        </span>
        <del v-if="priceOriginal" class="text-zinc-400">
          {{ priceOriginal }}
        </del>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: [String, Boolean],
    required: true,
  },
  priceOriginal: {
    type: [String, Boolean],
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const cart = useCart();
</script>
