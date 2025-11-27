<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24"
  >
    <div class="mx-auto text-center">

      <!-- Headline -->
      <div v-if="slice.primary.eyebrowHeadline?.length" class="rich-text">
        <prismic-rich-text 
          :field="slice.primary.eyebrowHeadline" 
        />
      </div>

      <!-- Logos -->
      <ul v-if="slice.primary.logos.length" class="flex flex-wrap justify-center gap-6">
        <li v-for="logo in slice.primary.logos" :key="logo.image.url" class="flex justify-center">
          <PrismicLink :field="logo.link">
            <PrismicImage
              :field="logo.image"
              :height="26"
              :width="160"
              class="max-w-[10rem] h-auto"
            />
          </PrismicLink>
        </li>
      </ul>

    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
