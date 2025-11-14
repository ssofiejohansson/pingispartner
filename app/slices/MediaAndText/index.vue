<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32">
    <div class="container mx-auto px-5 lg:px-10">

      <!-- {{ slice }} -->

      <div
        class="flex flex-col lg:flex-row relative items-center "
        :class="[
          slice.primary.type === 'service'
            ? 'bg-white w-full justify-center'
            : slice.primary.type === 'reference'
              ? 'bg-transparent text-center lg:text-left'
              : '',
        ]">
     
        <div
          v-if="slice.primary.type === 'service'"
          class="absolute top-2 left-2 w-full h-full border-r-8 border-b-8 border-primaryDark pointer-events-none"></div>

        <!-- MEDIA -->
        <div
          class="flex justify-center"
          :class="[
            slice.primary.type === 'service'
              ? 'w-full lg:w-1/2 flex-shrink-0'
              : 'w-auto flex-shrink-0',
            slice.variation === 'default' ? 'order-1' : 'order-2',
          ]">
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
            loop></video>

          <img
            v-else
            :src="slice?.primary?.media?.url"
            :alt="slice?.primary?.media?.alt"
            class="object-cover"
            :class="[
              slice.primary.type === 'service'
                ? 'w-full h-auto aspect-[16/12] '
                : 'w-48 h-48 lg:w-48 lg:h-48 rounded-full object-cover',
            ]" />
        </div>

        <!-- CONTENT -->
        <div
          class="w-full lg:w-1/2 p-5 lg:px-10 xl:px-14 rich-text "
          :class="[
            slice.variation === 'default' ? 'order-2' : 'order-1',
            slice.primary.type === 'reference'
              ? 'flex flex-col justify-center'
              : '',
          ]">
          <prismic-rich-text :field="slice.primary.content" />
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>

<style>
 .rich-text ul {
  list-style: none; 
  padding-left: 1.25rem;
}

.rich-text ul li {
  position: relative;
  padding-left: 2rem;
}

.rich-text ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.4rem;
  width: 1rem; 
  height: 1rem;
  background-image: url('/favicon.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>