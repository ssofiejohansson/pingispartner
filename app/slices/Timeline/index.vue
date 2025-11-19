<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32"
  >
    <div class="container">
      {{ slice }}

      <div class="flex gap-2 flex-wrap">
        <div
          v-for="(item, i) in slice.primary.year"
          :key="i"
          class="bg-white p-6 shadow-md flex flex-col gap-4"
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
