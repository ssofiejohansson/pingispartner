<template>
<section
  :data-slice-type="slice.slice_type"
  :data-slice-variation="slice.variation"
  class="wide xl:container px-6 my-12 lg:my-16"
>
  <div
    class=" rich-text max-w-xl"
    :class="slice.variation === 'center' ? 'text-center mx-auto' : ''"
  >
    <!-- Text -->
    <prismic-rich-text
      v-if="slice.primary.content?.length"
      :field="slice.primary.content"
    />

    <!-- Buttons -->
    <div
      v-if="slice.primary.button?.some((btn) => btn.text || btn.url)"
      class="flex flex-wrap gap-4 my-6"
      :class="slice.variation === 'center' ? 'justify-center' : 'justify-start'"
    >
      <Button v-for="(btn, i) in slice.primary.button" :key="i" :btn="btn" />
    </div>
  </div>
</section>

</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
