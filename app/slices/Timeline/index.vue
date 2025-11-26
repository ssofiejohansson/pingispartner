<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32"
  >
    <div class="container relative">

      <div
        class="absolute -top-16 left-1 md:left-1/2 md:-translate-x-1/2 text-primaryDark font-bold text-3xl md:text-3xl"
      >
        1961
      </div>
      <!-- Center timeline line -->
      <div
        class="absolute top-0 h-full w-[2px] bg-gray-300 left-4 md:left-1/2 md:-translate-x-1/2"
      />

      <!-- Timeline items -->
      <div class="flex flex-col gap-12 relative z-10">

        <div
          v-for="(item, i) in slice.primary.year"
          :key="i"
          class="flex flex-col md:flex-row items-start pl-4 md:pl-0 gap-6"
          :class="[
            i % 2 === 0 ? 'md:flex-row-reverse' : '', // alternate sides on content and img
          ]"
        >
          <!-- top line -->
          <div
            class="absolute w-8 h-1 bg-primaryDark -left-4 md:left-1/2 md:-translate-x-1/2"
          />

          <!-- text -->
          <div
            class="max-w-md w-full relative bg-light py-1"
            :class="[
              i % 2 === 0
                ? 'md:text-left md:ml-auto'
                : 'md:text-right md:mr-auto',
            ]"
          >
            <p class="font-bold text-lg">{{ item.year }}</p>
            <p class="font-semibold">{{ item.title }}</p>

            <prismic-rich-text
              v-if="item.content?.length"
              :field="item.content"
            />
          </div>

          <div
            class="lg:max-w-sm max-w-xs w-full"
            :class="[i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto']"
          >
            <img
              v-if="item.image?.small?.url"
              :src="item.image.small.url"
              class="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
