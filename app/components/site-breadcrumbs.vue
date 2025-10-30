<template>
  <div class="bg-white leading-none px-8">
    <ol class="flex items-center space-x-4 h-10">
      <li class="sep">
        <nuxt-link to="/">Hem</nuxt-link>
      </li>
      <li v-if="doc?.data?.parent?.data?.parent" class="sep">
        <prismic-link :field="doc.data.parent.data.parent">
          {{ doc.data.parent.data.parent.data.title[0].text }}
        </prismic-link>
      </li>
      <li v-if="doc?.data?.parent?.data" class="sep">
        <prismic-link :field="doc.data.parent">
          {{ doc.data.parent.data.title[0].text }}
        </prismic-link>
      </li>
      <li v-if="doc?.data?.title[0]?.text">{{ doc.data.title[0].text }}</li>
    </ol>
  </div>
</template>

<script setup>
defineProps(["doc"]);
</script>

<style lang="postcss" scoped>
:deep(.sep) {
  @apply after:content-['/'] after:inline-block after:ml-4;
}

:deep(a) {
  @apply text-primaryDark underline hover:no-underline underline-offset-2;
}
</style>
