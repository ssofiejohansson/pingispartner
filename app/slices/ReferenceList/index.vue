<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class=""
  >
    <div class="xl:container px-6">
      <!-- Sortbutton by select: company/private or all as default -->
      <div
        class="flex items-center justify-start gap-3 my-6"
        v-if="slice.variation === 'default'"
      >
        <Button
          v-for="(option, i) in [
            { label: 'Alla', value: 'all', variant: 'Primary' },
            { label: 'Företag', value: 'company', variant: 'Secondary' },
            { label: 'Privat', value: 'private', variant: 'Secondary' },
          ]"
          :class="'cursor-pointer'"
          :key="i"
          :btn="{ text: option.label, variant: option.variant }"
          @click="filter = option.value"
        />
      </div>
    
      <div
        class="mx-auto"
        :class="[
          slice.variation === 'default'
            ? 'md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 auto-rows-auto'
            : '',
        ]"
      >
        <!-- References list default -->
        <div
          v-if="slice.variation === 'default'"
          v-for="ref in filteredReferences"
          :key="ref.id"
          class="bg-white flex flex-col gap-6 to-md:mb-4 justify-center px-4 py-6 shadow-md"
        >
          <!-- Image -->
          <img
            v-if="ref.data.image"
            :src="ref.data.image.url"
            :alt="ref.data.image.alt || ''"
            class="w-28 h-28 rounded-full object-cover object-top shrink-0"
          />

          <!-- Text content -->
          <div class="lg:px-2 flex flex-col justify-center rich-text">
            <prismic-rich-text :field="ref.data.name" />
            <prismic-rich-text :field="ref.data.title" />
            <prismic-rich-text :field="ref.data.text" />
          </div>
        </div>
      </div>
    </div>

    <!-- variation: preview slider -->
    <div v-if="slice.variation === 'preview'" class="mx-2">
      <Slider :slides="slice.primary.reference" />
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["slice", "index", "slices", "context"]);
const filter = ref("all");

const prismic = usePrismic();

// Fetch all references
const { data: allReferences } = await useAsyncData("all-references", () =>
  prismic.client.getAllByType("reference")
);

// Filtering logic
const filteredReferences = computed(() => {
  if (!allReferences.value) return [];

  return allReferences.value
    .filter((ref) => {
      const category = ref.data.category;
      if (filter.value === "all") return true;
      return category === filter.value;
    })
    .sort((a, b) =>
      a.data.name[0]?.text?.localeCompare(b.data.name[0]?.text, "sv", {
        sensitivity: "base",
      })
    );
});
</script>
