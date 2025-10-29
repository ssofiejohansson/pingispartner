<template>
  <div class="w-full py-20">
    <div class="container">
      <div class="flex flex-col items-center justify-center gap-8"> 
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-16 w-auto block" />
      </nuxt-link>

      <p class="text-xs">
        Skapad med kärlek av
        <a
          href="https://www.wilsoncreative.se"
          target="_blank"
          class="underline hover:no-underline underline-offset-4"
          >Wilson Creative</a
        >
      </p>
   
    </div>
    </div>
  </div>
</template>

<script setup>
const home = useHome();
const { data: settings } = await useSettings();

// Footer data from prismic single type:
// const { data: footer } = await useFooter();
</script>
