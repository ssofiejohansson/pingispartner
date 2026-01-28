<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class=""
  >
    <div class="xl:container px-6">
      <!-- Sortbutton by select -->
      <div
        class="flex flex-wrap items-center justify-center md:justify-start gap-3 my-6"
        v-if="slice.variation === 'default'"
      >
        <Button
          v-for="(option, i) in [
            { label: 'Alla', value: 'all', variant: 'Primary' },
            { label: 'Företagsevent', value: 'company', variant: 'Primary' },
            { label: 'Sparringpartner', value: 'sparring', variant: 'Primary' },
            { label: 'Tävlingscoach', value: 'coach', variant: 'Primary' },
            { label: 'Klubbträning', value: 'club', variant: 'Primary' },
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
            ? 'md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 auto-rows-min'
            : '',
        ]"
      >
        <!-- References list default -->
        <div
          v-if="slice.variation === 'default'"
          v-for="ref in filteredReferences"
          :key="ref.id"
          class="bg-white flex flex-col gap-4 to-md:mb-4 justify-start px-4 py-6 shadow-sm"
        >
          <div class="flex flex-row gap-4 justify-start items-center">
            <Icon name="quote-left" class="h-6 w-auto -ml-6 -mb-28 shrink-0" />
            <!-- Image -->
            <img
              v-if="ref.data.image"
              :src="ref.data.image.url"
              :alt="ref.data.image.alt || ''"
              class="w-28 h-28 rounded-full object-cover object-top shrink-0"
            />

            <!-- Text content -->

            <div class="ref">
              
              <prismic-rich-text :field="ref.data.name" />
              <prismic-rich-text :field="ref.data.title" />
              <div
                class="text-xs font-bold text-primaryDark"
              >
                <prismic-rich-text :field="ref.data.year" />
              </div>
            </div>
          </div>
          <!-- Text with preview / toggle -->
          <div class="flex flex-col rich-text">
            <template v-if="!expanded[ref.id]">
              <!-- Preview text -->
              {{ reviewPreview(ref.id) }}
            </template>
            <template v-else>
              <!-- Full rich text including lists -->
              <prismic-rich-text :field="ref.data.text" />
            </template>

            <!-- Toggle button -->
            <button
              v-if="reviewIsLong(ref.id)"
              @click="toggle(ref.id)"
              class="text-primaryDark hover:underline mt-2 text-sm text-left"
            >
              {{ expanded[ref.id] ? "Visa mindre" : "Visa mer" }}
            </button>
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
import { ref, computed } from "vue";

const props = defineProps(["slice", "index", "slices", "context"]);
const filter = ref("all");

const prismic = usePrismic();

// Fetch all references
const { data: allReferences } = await useAsyncData("all-references", () =>
  prismic.client.getAllByType("reference"),
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
      }),
    );
});

// ===== Expand / collapse logic =====
const expanded = ref({}); // store expanded state for each reference
const WORD_LIMIT = 40;

// Toggle expanded state
const toggle = (id) => (expanded.value[id] = !expanded.value[id]);

// Extract plain text for preview (joins all blocks)
const extract = (id) => {
  const refItem = filteredReferences.value.find((r) => r.id === id);
  return refItem?.data.text?.map((block) => block.text).join(" ") || "";
};

// Check if text is longer than WORD_LIMIT
const reviewIsLong = (id) => extract(id).split(" ").length > WORD_LIMIT;

// Get preview text
const reviewPreview = (id) => {
  const text = extract(id);
  const words = text.split(" ");
  if (expanded.value[id] || words.length <= WORD_LIMIT) return text;
  return words.slice(0, WORD_LIMIT).join(" ") + "...";
};
</script>
