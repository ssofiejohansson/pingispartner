<template>
  <div
    class="border-l border-zinc-200 ml-0 -mr-8 h-full p-8 overflow-scroll transition-opacity duration-150"
    :class="[filterOpen ? 'opacity-100]' : 'opacity-0']"
  >
    <label class="block text-sm mb-2">Sortera på</label>
    <select
      class="block bg-white w-full h-12 px-4 border border-zinc-200 rounded-md"
      v-model="filter.sort"
      @change="$emit('updateFilter', filter)"
    >
      <option value="BEST_SELLING DESC">Vår rekommendation</option>
      <option value="TITLE ASC">Namn A-Ö</option>
      <option value="TITLE DESC">Namn Ö-A</option>
      <option value="PRICE ASC">Billigast först</option>
      <option value="PRICE DESC">Dyrast först</option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  filterOpen: {
    type: Boolean,
    required: true,
  },
});

const filter = ref({
  sort: "BEST_SELLING DESC",
});
</script>
