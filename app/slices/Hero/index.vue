<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="relative w-full h-[60vh] xl:h-[80vh] flex items-center justify-center overflow-hidden mb-12"
  >
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-fixed"
      :style="{ backgroundImage: `url(${slice.primary.hero_img.url})` }"
    ></div>

    <!-- Optional overlay for readability -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Hero Text -->
    <div class="relative z-10 text-center px-4 md:px-0 rich-text">
      <prismic-rich-text :field="slice.primary.hero_text" />
    </div>

  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
