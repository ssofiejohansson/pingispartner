<template>
  <section class="my-5 md:my-10 lg:my-20">
    <div class="container">
      <div class="lg:flex items-center">
        <NuxtImg
          :src="product.productByHandle.images.edges[0].node.src"
          class="w-full lg:w-1/2 aspect-square object-cover mb-5 lg:mb-0 flex-shrink-0"
          alt="Product Image"
          format="webp" />
        <div class="lg:ml-10">
          <h2 class="text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-3">
            {{ product.productByHandle.title }}
          </h2>
          <p class="mb-3 lg:mb-5 lg:text-lg xl:text-xl space-x-2">
            <span :class="[price ? 'text-black' : '']">
              {{ price }}
            </span>
            <del v-if="priceOriginal" class="text-zinc-400">
              {{ priceOriginal }}
            </del>
          </p>

          <p class="text-zinc-800 mb-6 text-sm lg:text-base">
            {{ product.productByHandle.description }}
          </p>

          <div class="my-10" v-if="metafields.length">
            <div class="text-sm">
              <h3 class="text-lg mb-3 mt-0 leading-none">Metafields</h3>
              <div v-for="(item, key) in metafields" :key="`metafield-${key}`" class="">
                <div class="flex space-x-1" v-if="item !== null">
                  <!-- item.key needs to be converted to readable text by developer.. can't access label in api.. -->
                  <div class="text-zinc-500">{{ item.key }}:</div>

                  <div class="bold">
                    {{ JSON.parse(item.value).value }}
                    {{ JSON.parse(item.value).unit }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AddToCart :product="product.productByHandle" :quantity="quantity"> Lägg i varukorgen </AddToCart>
        </div>
      </div>

      <div class="my-20">
        <h2 class="text-xl md:text-2xl lg:text-4xl mb-4 lg:mb-7">Relaterade produkter</h2>

        <div class="flex flex-wrap -mx-3 lg:-mx-6 -mb-10">
          <div
            v-for="{ node } in related.products.edges"
            :key="node.id"
            class="w-1/2 md:w-1/3 lg:w-1/4 px-3 lg:px-6 mb-10">
            <Product
              :image="node.images.edges[0].node.src"
              :title="node.title"
              :price="formatPrice(node.priceRange.maxVariantPrice)"
              :price-original="formatPrice(node.compareAtPriceRange.maxVariantPrice)"
              :link="`/products/${node.handle}`"
              :description="node.description" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { getProductQuery } from "~~/graphql/getProductQuery";
import { getProductsQuery } from "~~/graphql/getProductsQuery";

const { formatPrice } = usePrice();
const quantity = ref(1);
const route = useRoute();

const { data: product } = await useAsyncQuery(getProductQuery, { handle: route.params.handle });

const price = formatPrice(product.value.productByHandle.priceRange.maxVariantPrice);

const priceOriginal = formatPrice(product.value.productByHandle.compareAtPriceRange.maxVariantPrice);

const { data: metafields } = await useAsyncData("metafields", async () => {
  const gid = product.value.productByHandle.id;
  const gidParts = gid.split("/");
  const id = gidParts[gidParts.length - 1];

  const res = await $fetch(
    `https://wilson-creative-dev.myshopify.com/admin/api/2023-07/products/${id}/metafields.json`,
    { headers: { "X-Shopify-Access-Token": "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" } }
  );

  return res.metafields;
});

const { data: related } = await useAsyncQuery(getProductsQuery, {
  first: 4,
  sortKey: "RELEVANCE",
  reverse: false,
  query: `product_type:${product.value.productByHandle.productType} AND NOT title:'${product.value.productByHandle.title}'`,
});
</script>
