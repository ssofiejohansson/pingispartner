<template>
  <SiteHeader />
  <main class="">
    <slot />
  </main>
  <SiteFooter />
</template>

<script setup>
const lang = useLang();

useHead({
  htmlAttrs: {
    lang: lang.split("-")[0],
  },
});
</script>
