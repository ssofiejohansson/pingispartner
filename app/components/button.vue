<template>
  <PrismicLink
    v-if="btn"
    :field="btn"
    :class="[
      'px-4 py-2 rounded-full text-base font-medium transition',
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
      return "bg-primary text-white hover:bg-primaryDark";
    case "Secondary":
      return "bg-transparent text-primaryDark border border-primaryDark hover:";
    case "CTA":
      return "bg-primaryDark text-white hover:bg-primary";
    default:
      return "";
  }
});
</script>
