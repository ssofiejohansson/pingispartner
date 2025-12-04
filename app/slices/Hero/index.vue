<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="relative w-full lg:h-[40vh] h-[20vh]  flex items-center justify-center overflow-hidden mb-12"
  >
    <!-- Background Media (video or image) -->
    <div class="absolute inset-0 w-full h-full overflow-hidden">

      <!-- VIDEO (mp4) -->
      <video
        v-if="
          slice?.primary?.hero_img?.kind === 'file' &&
          slice?.primary?.hero_img?.name?.includes('mp4')
        "
        :src="slice.primary.hero_img.url"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      ></video>

      <!-- IMAGE -->
      <div
        v-else
        class="absolute inset-0 bg-cover bg-bottom"
        :style="{ backgroundImage: `url(${slice.primary.hero_img.url})` }"
      ></div>

    </div>

    <!-- Optional overlay -->
    <!-- <div class="absolute inset-0 bg-black/20"></div> -->

    <!-- Hero Text -->
    <div class="relative z-10 text-center px-4 md:px-0 rich-text">
      <prismic-rich-text :field="slice.primary.hero_text" />
    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
