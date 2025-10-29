<template>
  <div class="w-full bg-zinc-900 text-white py-20">
    <div class="container mb-20">
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-6 w-auto block" />
      </nuxt-link>
    </div>
    <div class="container text-center">
      <p class="text-xs">
        Skapad med kärlek av
        <a
          href="https://www.wilsoncreative.se"
          target="_blank"
          class="underline"
          >Wilson Creative</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
const home = useHome();
const { data: settings } = await useSettings();

// Footer data from prismic single type:
// const { data: footer } = await useFooter();
</script>
