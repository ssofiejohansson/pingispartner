<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" class="my-12 lg:my-24 xl:my-32">
    <div class="container rich-text">
      <prismic-rich-text :field="slice.primary.content" />
    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
