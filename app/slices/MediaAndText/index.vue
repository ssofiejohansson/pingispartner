<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="wide bg-white"
  >
  
      <div
        class="flex flex-col lg:flex-row w-full justify-center"
        :class="[slice.primary.fixed_image ? 'items-start' : 'items-center']"
      >
        <!-- MEDIA -->
        <div
          v-if="slice.primary.media && slice.primary.media.url"
          class="flex justify-center w-full to-lg:max-h-[400px] lg:w-1/2 lg:max-w-2xl flex-shrink-0"
          :class="[
            slice.variation === 'default'
              ? 'lg:order-1'
              : !tjanster
                ? 'lg:order-2 lg:-mt-6'
                : 'lg:order-2 lg:mt-0 ',
            slice.primary.fixed_image ? ' lg:sticky lg:top-0 max-w-xl' : '',
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
          ></video>

          <img
            v-else
            :src="slice?.primary?.media?.url"
            :alt="slice?.primary?.media?.alt"
            class="object-cover w-full h-auto aspect-[16/12] object-center "
          />
        </div>

        <!-- CONTENT -->
        <div
          class="w-full lg:w-1/2 max-w-2xl lg:px-10 lg:py-4 py-12 px-4 rich-text"
          :class="[
            slice.variation === 'default' ? 'lg:order-2' : 'lg:order-1',
            slice.primary.fixed_image ? 'lg:w-2/3  mb-6  px-6 py-8' : ' ',
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

<script setup>
defineProps(["slice", "index", "slices", "context"]);

// define what route for some styling
const route = useRoute()
const tjanster = route.name === 'tjanster' || route.path.includes('/tjanster')

</script>
