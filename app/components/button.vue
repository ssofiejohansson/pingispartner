<template>
  <PrismicLink
    v-if="btn"
    :field="btn"
    :class="[
      'px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm lg:text-base font-medium transition inline-flex items-center gap-2',
      variantClasses,
    ]"
  >
    <span class="flex items-center gap-1 relative">
      {{ btn.text }}
     
     <Icon
  v-if="btn.variant === 'CTA'"
  name="right"
  class=" w-4 h-auto lg:w-5 lg:h-auto opacity-0 -translate-x-2 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-x-0"
/>
    </span>
  </PrismicLink>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  btn: {
    type: Object,
    required: true,
  },
});

const variantClasses = computed(() => {
  if (!props.btn.variant) return "";

  switch (props.btn.variant) {
    case "Primary":
      return "bg-transparent border border-primaryDark text-primaryDark hover:bg-primaryDark hover:text-light transform hover:scale-105";
    case "Secondary":
      return "bg-transparent text-accent border border-accent hover:bg-accent hover:text-light transform hover:scale-105 transition-all duration-300";
    case "CTA":
      return "lg:pl-11 pl-8 bg-accent text-white border border-accent hover:bg-transparent hover:text-accent transform hover:scale-105 group";
    default:
      return "";
  }
});
</script>
