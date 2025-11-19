<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32"
  >
    <div class="container">
        <!-- timeline line -->
      <div class="w-px h-44 bg-gray-300 mx-4"></div>
      <div class="flex flex-col gap-2 items-center">
      
        
        <div
          v-for="(item, i) in slice.primary.year"
          :key="i"
          class="p-2 min-w-[100px] max-w-[200px] bg-white flex flex-col flex-wrap justify-center"
        >
          <div class="font-bold">{{ item.year }}</div>
          <div class="">{{ item.title }}</div>

          <prismic-rich-text
            v-if="item.content?.length"
            :field="item.content"
          />

          <img
            v-if="item.image?.small?.url"
            :src="item.image.small.url"
            class="w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
