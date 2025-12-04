<template>
  <PrismicLink
    v-if="btn"
    :field="btn"
    :class="[
      'px-5 py-2 rounded-full text-base font-medium transition',
      variantClasses,
    ]"
  >
    {{ btn.text }}
  </PrismicLink>
</template>

<script setup>
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
      return "bg-primaryDark border border-primaryDark  text-light shadow-md hover:bg-white hover:text-primaryDark transform hover:scale-105";
    case "Secondary":
       return "bg-white text-primaryDark border border-primaryDark shadow-md hover:bg-primaryDark hover:text-light transform hover:scale-105 transition-all duration-300";

    case "CTA":
     return "bg-accent text-white border border-accent shadow-md hover:bg-white hover:text-accent transform hover:scale-105";

    default:
      return "";
  }
});
</script>
