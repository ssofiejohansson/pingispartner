<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32">
    {{ slice }}
    <div class="container mx-auto px-5 lg:px-10">
      <div v-if="slice.primary.heading && slice.primary.heading.length">
        <prismic-rich-text :field="slice.primary.heading" />
      </div>

      <!-- References list default -->
      <div
        v-if="slice.variation === 'default'"
        v-for="ref in slice.primary.reference"
        :key="ref.item.id"
        class="flex flex-col lg:flex-row items-center gap-8">
        <!-- Image -->
        <img
          v-if="ref.item.data.image"
          :src="ref.item.data.image.url"
          :alt="ref.item.data.image.alt || ''"
          class="w-48 h-48 lg:w-48 lg:h-48 rounded-full object-cover" />

        <!-- Text content -->
        <div
          class="w-full lg:w-1/2 p-5 lg:px-10 xl:px-14 flex flex-col justify-center rich-text">
          <prismic-rich-text :field="ref.item.data.name" />
          <prismic-rich-text :field="ref.item.data.title" />
          <prismic-rich-text :field="ref.item.data.text" />
        </div>
      </div>

      <div v-if="slice.variation === 'preview'" class="flex">
        <div
          v-for="ref in slice.primary.reference"
          :key="ref.item.id"
          class="h-48 flex flex-col gap-4 justify-between">
          <div class="">
            <prismic-rich-text :field="ref.item.data.name" class="" />
          </div>

          <p class="">
            {{ getExcerpt(ref.item.data.text, 140) }}
          </p>

          <PrismicLink
      :field="ref.item"
      class=""
    >
      Läs mer →
    </PrismicLink>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
defineProps(["slice", "index", "slices", "context"]);

const getExcerpt = (richText, length = 100) => {
  if (!richText || !Array.isArray(richText)) return "";

  const fullText = richText
    .map((block) => block.text)
    .join(" ")
    .trim();

  if (fullText.length <= length) return fullText;

  return fullText.slice(0, length) + "…";
};
</script>
