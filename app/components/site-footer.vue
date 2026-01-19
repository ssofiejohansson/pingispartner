<template>
  <div class="w-full py-20 bg-light mt-10">
    <div class="container">
      <div class="flex flex-col items-center justify-center gap-8">
        <nuxt-link :to="home">
          <prismic-image
            :field="settings?.data?.logo"
            class="h-20 w-auto block"
          />
        </nuxt-link>
       
        <SiteNavigation class="hidden lg:block" :is-footer="true" />

        <div class="flex flex-col lg:flex-row items-center gap-4">
          <p class="text-base md:-mb-1">I samarbete med</p>
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
        <!-- socials -->
        <div class="flex flex-row gap-2 justify-center items-center">
          <PrismicLink href="https://www.facebook.com" target="_blank" rel="noopener">
            <Icon name="facebook" class="h-10 w-auto" />
          </PrismicLink>
          <PrismicLink href="https://www.instagram.com" target="_blank" rel="noopener">
            <Icon name="instagram" class="h-10 w-auto" />
          </PrismicLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const home = useHome();
const { data: settings } = await useSettings();
const { data: footer } = await useFooter();
</script>
