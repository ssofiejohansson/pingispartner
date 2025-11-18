<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32"
  >
    <!-- {{ slice }} -->
    <div
      class="container">
      <!-- Sortbutton by select: company/private or all as default -->
    
      <div class="flex items-center justify-center gap-3 my-6">
        <button
          @click="filter = 'all'"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition',
            filter === 'all'
              ? 'bg-dark text-white'
              : 'bg-light text-dark border',
          ]">
          Alla
        </button>

        <button
          @click="filter = 'company'"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition',
            filter === 'company'
              ? 'bg-dark text-white'
              : 'bg-light text-dark border',
          ]"
        >
          Företag
        </button>

        <button
          @click="filter = 'private'"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition',
            filter === 'private'
              ? 'bg-dark text-white'
              : 'bg-light text-dark border',
          ]"
        >
          Privat
        </button>
      </div>
    </div>

    <div
      class="wide mx-auto px-5 lg:px-10"
      :class="[
        slice.variation === 'default'
          ? 'md:grid grid-cols-2 gap-4 place-items-start'
          : '',
      ]"
    >
      <!-- References list default -->
      <div
        v-if="slice.variation === 'default'"
        v-for="ref in filteredReferences"
        :key="ref.item.id"
        class="max-w-[800px] bg-white flex flex-col xl:flex-row gap-6 to-md:mb-4 xl:items-center justify-center p-6 lg:p-10 shadow-md"
      >
        <!-- Image -->
        <img
          v-if="ref.item.data.image"
          :src="ref.item.data.image.url"
          :alt="ref.item.data.image.alt || ''"
          class="w-28 h-28 xl:w-48 xl:h-48 rounded-full object-cover"
        />

        <!-- Text content -->
        <div class="lg:px-2 flex flex-col justify-center rich-text">
          <prismic-rich-text :field="ref.item.data.name" />
          <prismic-rich-text :field="ref.item.data.title" />
          <prismic-rich-text :field="ref.item.data.text" />
        </div>
      </div>
    </div>

    <!-- preview slider -->
    <div v-if="slice.variation === 'preview'" class="py-10 mx-2">
      <Slider :slides="slice.primary.reference" />
    </div>
  </section>
</template>

<script setup>
const props = defineProps(["slice", "index", "slices", "context"]);

const filter = ref("all");

const filteredReferences = computed(() => {
  return props.slice.primary.reference.filter((ref) => {
    const category = ref.item.data.category;
    if (filter.value === "all") return true;
    return category === filter.value;
  });
});
</script>