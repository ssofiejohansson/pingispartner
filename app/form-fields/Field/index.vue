<template>
  <div v-if="slice.variation == 'default'" class="field px-5" :class="fieldSize">
    <FormFieldsText :data="slice" />
  </div>
  <div v-if="slice.variation == 'email'" class="field px-5" :class="fieldSize">
    <FormFieldsEmail :data="slice" />
  </div>
  <div v-else-if="slice.variation == 'textarea'" class="field px-5" :class="fieldSize">
    <FormFieldsTextarea :data="slice" />
  </div>
  <div v-else-if="slice.variation == 'select'" class="field px-5" :class="fieldSize">
    <FormFieldsSelect :data="slice" />
  </div>
  <div v-else-if="slice.variation == 'consent'" class="field px-5" :class="fieldSize">
    <FormFieldsConsent :data="slice" />
  </div>
</template>
<style scoped lang="postcss">
.field {
  @apply mb-5 px-5;
}
</style>

<script setup>
const { slice, index, slices, context } = defineProps(["slice", "index", "slices", "context"]);

const fieldSize = computed(() => {
  if (slice.primary.size === "33%") {
    return "w-full md:w-1/3";
  } else if (slice.primary.size === "50%") {
    return "w-full md:w-1/2";
  } else {
    return "w-full";
  }
});
</script>
