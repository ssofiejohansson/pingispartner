<template>
  <div class="w-full py-20">
    <div class="container">
      <div class="flex flex-col items-center justify-center gap-8">
        <nuxt-link :to="home">
          <prismic-image
            :field="settings?.data?.logo"
            class="h-16 w-auto block"
          />
        </nuxt-link>

        <div class="flex items-center gap-1">
          <p class="text-sm">I samarbete med</p>
          <Icon name="x" class="w-8 h-8"></Icon>
        </div>

        <!-- <p class="text-sm">Skapad av...</p> -->
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
