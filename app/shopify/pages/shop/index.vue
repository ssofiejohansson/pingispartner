<template>
  <div class="my-10 lg:my-20 px-5 lg:px-8" v-if="shop.value">
    <div class="flex justify-between items-center mb-5 text-sm">
      <div>{{ shop.value.products.edges.length }} produkter</div>
      <div
        class="flex items-center space-x-2"
        @click="filterOpen = !filterOpen"
      >
        <svg
          class="w-5 h-5 block"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          test test
          <path
            d="M17 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM17 15.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM3.75 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.5 2.75a.75.75 0 00-1.5 0v5.5a.75.75 0 001.5 0v-5.5zM10 11a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0110 11zM10.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM10 6a2 2 0 100 4 2 2 0 000-4zM3.75 10a2 2 0 100 4 2 2 0 000-4zM16.25 10a2 2 0 100 4 2 2 0 000-4z"
          ></path>
        </svg>
        <span>Filtrera</span>
      </div>
    </div>
    <div class="flex -mx-5">
      <div class="flex-1 px-5">
        <div class="flex flex-wrap -mx-5 -mb-10">
          <div
            class="w-1/2 md:w-1/3 lg:w-1/4 px-5 mb-10"
            v-for="{ node } in shop.value.products.edges"
            :key="node.id"
          >
            <Product
              :image="node.images.edges[0].node.src"
              :title="node.title"
              :price="formatPrice(node.priceRange.maxVariantPrice)"
              :price-original="
                formatPrice(node.compareAtPriceRange.maxVariantPrice)
              "
              :link="`/products/${node.handle}/`"
              :description="node.description"
            />
          </div>
        </div>
      </div>
      <div
        class="flex-shrink-0 flex-grow-0 transition-all duration-150"
        :class="[filterOpen ? 'w-[23%] px-5' : 'w-0 px-0']"
      >
        <Filter @updateFilter="filterProducts" :filterOpen="filterOpen" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProductsQuery } from "../../graphql/getProductsQuery";

const { formatPrice } = usePrice();
const shop = ref({});
const filterOpen = ref(false);
const filter = ref({
  first: 40,
  sortKey: "BEST_SELLING",
  reverse: false,
});

shop.value = await useAsyncQuery(getProductsQuery, filter.value).data;

const filterProducts = async (newFilter) => {
  filter.value.sortKey = newFilter.sort.split(" ")[0];
  filter.value.reverse = newFilter.sort.split(" ")[1] !== "ASC";

  shop.value = await useAsyncQuery(getProductsQuery, filter.value).data;
};
</script>
