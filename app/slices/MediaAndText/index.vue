<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bg-white"
  >
    <div
      class="wide xl:container flex flex-col lg:flex-row w-full justify-center"
      :class="[slice.primary.fixed_image ? 'items-start' : 'items-center']"
    >
      <!-- MEDIA -->
      <div
        v-if="slice.primary.media && slice.primary.media.url"
        class="relative flex justify-center w-full to-lg:max-h-[500px] lg:w-1/2 lg:max-w-3xl flex-shrink-0"
        :class="[
          slice.variation === 'default'
            ? 'lg:order-1'
            : !tjanster
              ? 'lg:order-2'
              : 'lg:order-2',
          slice.primary.fixed_image ? 'lg:sticky lg:top-0' : '',
        ]"
      >
        <video
          v-if="
            slice?.primary?.media?.kind === 'file' &&
            slice?.primary?.media?.name.includes('mp4')
          "
          :src="slice?.primary?.media?.url"
          class="w-full h-auto aspect-[16/12] object-cover"
          muted
          autoplay
          playsinline
          loop
          preload="none"
          aria-hidden="true"
        ></video>

        <img
          ref="imageRef"
          v-else-if="
            slice?.primary?.media?.url &&
            !(
              slice?.primary?.media?.kind === 'file' &&
              slice?.primary?.media?.name.includes('mp4')
            )
          "
          :src="slice?.primary?.media?.url"
          :alt="slice?.primary?.media?.alt || ''"
          loading="lazy"
          decoding="async"
          class="w-full h-auto aspect-[16/12] object-cover object-center opacity-100 lg:opacity-0 lg:translate-y-6 will-change-transform"
          :class="
            imageVisible &&
            (slice.variation === 'default'
              ? 'lg:animate-fade-right'
              : 'lg:animate-fade-left')
          "
        />
      </div>

      <!-- CONTENT -->
      <div
        class="w-full lg:w-1/2 px-6 py-10 rich-text"
        :class="[
          slice.variation === 'default' ? 'lg:order-2' : 'lg:order-1',
          slice.primary.fixed_image ? 'lg:w-2/3 mb-6' : ' ',
        ]"
      >
        <prismic-rich-text :field="slice.primary.content" />

        <div
          v-if="slice.primary.button?.some((btn) => btn.text || btn.url)"
          class="flex flex-wrap gap-4 mt-6 text-center justify-center sm:justify-start"
        >
          <Button
            v-for="(btn, i) in slice.primary.button"
            :key="i"
            :btn="btn"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.rich-text img {
  display: block;
  width: 50px;
  height: 50px;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: rgba(237, 107, 68, 0.1);
  object-fit: cover;
}
</style>
<script setup>
import { ref, onMounted } from "vue";
defineProps(["slice", "index", "slices", "context"]);

// define what route for some styling
const route = useRoute();
const tjanster = route.name === "tjanster" || route.path.includes("/tjanster");

const imageVisible = ref(false);
const imageRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        imageVisible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.25 },
  );

  if (imageRef.value) observer.observe(imageRef.value);
});
</script>
