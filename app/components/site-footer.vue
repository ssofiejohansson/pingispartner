<template><div class="w-full py-20 bg-light mt-10">
  <div class="container flex flex-col lg:justify-between items-center gap-10">
    <!-- Logo -->
    <nuxt-link :to="home" class="transform transition-transform duration-300 hover:scale-105">
      <prismic-image :field="settings?.data?.logo" class="h-20 w-auto block" />
    </nuxt-link>

    <!-- Navigation -->
    <SiteNavigation class="hidden lg:flex" :is-footer="true" />

    <!-- Partner -->
    <div class="flex flex-col lg:flex-row items-center gap-4">
      <p class="text-base md:-mb-2">I samarbete med</p>
      <PrismicLink
        href="https://www.stigasports.com/sv"
        target="_blank"
        rel="noopener"
      >
        <div class="h-6">
          <Icon name="stiga" class="h-full w-full" />
        </div>
      </PrismicLink>
    </div>

    <!-- Socials -->
    <div class="flex flex-row gap-2 justify-center items-center">
      <PrismicLink href="https://www.facebook.com" target="_blank" rel="noopener"
        class="transform transition-transform duration-300 hover:scale-110">
        <Icon name="facebook" class="h-10 w-10" />
      </PrismicLink>
      <PrismicLink href="https://www.instagram.com" target="_blank" rel="noopener"
        class="transform transition-transform duration-300 hover:scale-110">
        <Icon name="instagram" class="h-10 w-10" />
      </PrismicLink>
    </div>  
    
    <!--  copyright -->
  <p class="text-xs text-gray-500  text-center">
    &copy; 2026 Pingispartner.se. All rights reserved.
  </p>
  </div>

</div>
</template>

<script setup>
const home = useHome();
const { data: settings } = await useSettings();
</script>