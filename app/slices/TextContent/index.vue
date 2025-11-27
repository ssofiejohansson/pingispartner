<template>
<section
  :data-slice-type="slice.slice_type"
  :data-slice-variation="slice.variation"
  class="my-12"
>
  <div
    class="container rich-text"
    :class="slice.variation === 'center' ? 'text-center mx-auto max-w-lg' : ''"
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
