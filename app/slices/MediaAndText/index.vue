<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="">
    <div class="wide">

      <!-- {{ slice }} -->

      <div
        class="flex flex-col lg:flex-row items-center bg-white w-full justify-center">
    
        <!-- MEDIA -->
        <div
          class="flex justify-center w-full lg:w-1/2 flex-shrink-0"
          :class="[
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
            class="object-cover w-full h-auto aspect-[16/12]"
           />
        </div>

        <!-- CONTENT -->
        <div
          class="w-full lg:w-1/2 p-6 rich-text "
          :class="[
            slice.variation === 'default' ? 'order-2' : 'order-1',
          
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