<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation" class="my-12 lg:my-24 xl:my-32">
    <div class="container">

      <!-- Wrap slice -->
      <div class="lg:flex items-center border-dark border-2 border-dotted">

        <div
          class="w-full lg:w-1/2"
          :class="[slice.variation === 'default' ? 'order-1' : 'order-2']">
          <video
            v-if="slice?.primary?.media?.kind === 'file' && slice?.primary?.media?.name.includes('mp4')"
            :src="slice?.primary?.media?.url"
            class="w-full h-auto aspect-[16/12] rounded-3xl object-cover"
            muted
            autoplay
            playsinline
            loop></video>
          <img
            v-else
            :src="slice?.primary?.media?.url"
            :alt="slice?.primary?.media?.alt"
            class="w-full h-auto aspect-[16/12] object-cover" />
        </div>

        <div
          class="w-full lg:w-1/2 px-5 lg:px-10 xl:px-14 rich-text"
          :class="[slice.variation === 'default' ? 'order-2' : 'order-1']">
          <prismic-rich-text :field="slice.primary.content" />
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
