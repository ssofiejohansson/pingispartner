<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="relative w-full flex items-center justify-center overflow-hidden"
  >
    <!-- Background Media (video or image) -->
    <div class="absolute inset-0 z-0 w-full h-full overflow-hidden">

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
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${slice.primary.hero_img.url})` }"
      ></div>

    </div>

    <!-- Hero Text -->
   <div class="text-center max-w-3xl mx-auto px-6 my-12" >
    <div class="">
        <prismic-rich-text :field="slice.primary.heading" />
    </div>

    <p class="text-lg font-light">
      <prismic-rich-text :field="slice.primary.text" />
    </p>
    
     <!-- Buttons -->
    <div
      v-if="slice.primary.button?.some((btn) => btn.text || btn.url)"
      class="flex flex-wrap gap-4 my-6 justify-center"
    >
      <Button v-for="(btn, i) in slice.primary.button" :key="i" :btn="btn" />
    </div>
  </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
