<template>
  <div class="w-full py-20">
    <div class="container">
      <div class="flex flex-col items-center justify-center gap-8"> 
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-16 w-auto block" />
      </nuxt-link>
   
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
