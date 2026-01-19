<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-24"
  >
    <div class="container relative">
      <div
        class="absolute -top-14 md:-top-20 left-4 md:left-1/2 md:-translate-x-1/2 text-primaryDark font-bold text-2xl md:text-3xl"
      >
        <span class="border-b-4 border-primaryDark z-100"> 1962 </span>
      </div>

      <!-- Center timeline line -->
      <div
        class="absolute -top-3 h-full w-[2px] bg-primaryDark left-4 md:left-1/2 md:-translate-x-1/2"
      />

      <!-- Timeline items -->
      <div class="flex flex-col gap-12 pt-6 relative z-10">
        <div
          v-for="(item, i) in slice.primary.year"
          :key="i"
          class="flex flex-col md:flex-row items-start md:justify-center pl-4 md:pl-0 gap-6"
          :class="[
            i % 2 === 0 ? 'md:flex-row-reverse' : '', // alternate sides on content and img
          ]"
        >
          <!-- top line -->
          <div
            class="absolute w-6 h-1 bg-primaryDark -left-4 md:left-1/2 md:-translate-x-1/2"
          ></div>

          <!-- text -->
          <div
            class="max-w-md w-full relative bg-light md:px-4"
            :class="
              i % 2 === 0
                ? 'md:text-left md:mr-auto'
                : 'md:text-right md:ml-auto'
            "
          >
            <p class="font-bold text-lg text-primaryDark">{{ item.year }}</p>
            <p class="font-semibold">{{ item.title }}</p>

            <prismic-rich-text
              v-if="item.content?.length"
              :field="item.content"
            />
          </div>

          <!-- media -->
          <div
            class="lg:max-w-md max-w-xs w-full md:mx-0 px-4"
            :class="i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'"
          >
            <!-- VIDEO -->
            <video
              v-if="
                item?.media?.kind === 'file' &&
                item?.media?.name?.includes('mp4')
              "
              :src="item.media.url"
              class="w-full h-auto aspect-[16/12] object-contain"
              muted
              autoplay
              loop
              playsinline
            ></video>

            <!-- IMAGE -->
            <img
              v-else-if="item?.media?.url"
              :src="item.media.url"
              :alt="item.media.alt || ''"
              data-timeline-image
              :data-index="i"
              class="w-full h-auto aspect-[16/12] object-contain object-center opacity-100 md:opacity-0 will-change-transform"
              :class="
                visibleItems.has(i) &&
                (i % 2 === 0 ? 'md:animate-fade-left' : 'md:animate-fade-right')
              "
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);

import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const visibleItems = ref(new Set());
let observer;

onMounted(async () => {
  await nextTick();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;
          visibleItems.value.add(Number(index));
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.35 }
  );

  document.querySelectorAll("[data-timeline-image]").forEach((el) => {
    observer.observe(el);
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>
