<template>
  <PrismicLink
    v-if="btn"
    :field="btn"
    :class="[
      'px-5 py-2 rounded-full text-base font-medium transition transform inline-flex items-center gap-2 border hover:scale-105 ',
      variantClasses,
    ]"
  >
    <span class="flex items-center gap-0 relative">
      {{ btn.text }}
     
     <Icon
  v-if="btn.variant === 'CTA'"
  name="right"
  class=" w-5 h-auto opacity-0 -translate-x-2 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-x-0"
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
      return "bg-primary text-white border-primary hover:border-primaryDark hover:bg-primaryDark shadow-sm";
    case "Secondary":
      return "bg-transparent text-accent border-accent hover:bg-accent hover:text-light transition-all duration-300";
    case "CTA":
      return "pl-10 bg-accent text-white border-accent hover:bg-transparent hover:text-accent group ";
    default:
      return "";
  }
});
</script>
