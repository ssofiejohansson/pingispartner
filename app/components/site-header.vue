<template>
  <div
    class="sticky top-0 w-full flex justify-between px-5 md:px-8 items-center pt-5 text-dark z-50"
  >
    <div class="flex items-center md:space-x-10">
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-20 w-auto block" />
      </nuxt-link>
      <div
        class="to-md:absolute to-md:top-20 to-md:-right-0 to-md:w-full to-md:z-50 to-md:p-5 bg-light"
        :class="{ 'to-md:hidden': !mobileMenuOpen }"
      >
        <SiteNavigation />
      </div>
    </div>

    <div class="">
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden w-14 h-14"
      >
        <Icon v-if="mobileMenuOpen" name="x" class="w-14 h-14" />
        <Icon v-else name="hamburger" class="w-14 h-14" />
      </button>
    </div>
  </div>
  <!-- <Cart /> -->
</template>

<script setup>
const home = useHome();
const { data: settings } = await useSettings();

const mobileMenuOpen = ref(false);
</script>
