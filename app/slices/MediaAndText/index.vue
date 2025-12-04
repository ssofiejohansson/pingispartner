<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="wide bg-white"
  >
    <div
      class=""
      :class="[slice.primary.fixed_image ? 'container my-20' : '']"
    >
      <div
        class="flex flex-col lg:flex-row gap-4 lg:gap-12 w-full justify-center"
        :class="[slice.primary.fixed_image ? 'items-start' : 'items-center']"
      >
        <!-- MEDIA -->
        <div
          v-if="slice.primary.media && slice.primary.media.url"
          class="flex justify-center w-full to-lg:max-h-[4y-400px] lg:w-1/2 max-w-4xl flex-shrink-0"
          :class="[
            slice.variation === 'default'
              ? 'lg:order-1'
              : !tjanster
                ? 'lg:order-2 border-b-8 border-b-accent border-r-8 border-r-accent lg:-mb-12 lg:mr-12 lg:shadow-md'
                : 'lg:order-2',
            slice.primary.fixed_image ? 'lg:w-1/3 lg:sticky lg:top-40' : '',
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
            class="object-cover w-full h-auto aspect-[16/12]"
          />
        </div>

        <!-- CONTENT -->
        <div
          class="w-full lg:w-1/2 max-w-3xl lg:px-8 px-4 py-8 rich-text"
          :class="[
            slice.variation === 'default' ? 'lg:order-2' : 'lg:order-1',
            slice.primary.fixed_image ? 'lg:w-2/3' : '',
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
    </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);

// define what route for some styling
const route = useRoute()
const tjanster = route.name === 'tjanster' || route.path.includes('/tjanster')

</script>
