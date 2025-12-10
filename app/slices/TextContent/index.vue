<template>
<section
  :data-slice-type="slice.slice_type"
  :data-slice-variation="slice.variation"
  class="wide 2xl:container px-6 my-16 lg:my-28"
>
  <div
    class=" rich-text max-w-2xl"
    :class="slice.variation === 'center' ? 'text-center sm:mx-auto ' : 'text-center md:text-left'"
  >
  <!-- Icon -->
  <div
  v-if="slice.primary.icon && slice.primary.icon?.url"
  class="flex my-4 text-primaryDark"
   :class="slice.variation === 'center' ? 'justify-center' : 'md:justify-start justify-center'"
>
  <img
    :src="slice.primary.icon.url"
    :alt="slice.primary.icon.alt || ''"
    class="w-12 h-12 object-contain"
  />
</div> 

    <!-- Text -->
    <prismic-rich-text
      v-if="slice.primary.content?.length"
      :field="slice.primary.content"
    />

    <!-- Buttons -->
    <div
      v-if="slice.primary.button?.some((btn) => btn.text || btn.url)"
      class="flex flex-wrap gap-4 my-6"
      :class="slice.variation === 'center' ? 'justify-center' : 'justify-center sm:justify-start'"
    >
      <Button v-for="(btn, i) in slice.primary.button" :key="i" :btn="btn" />
    </div>
  </div>
</section>

</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
