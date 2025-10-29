<template>
  <div
    class="sticky left-0 top-0 w-full flex justify-between px-5 md:px-8 items-center h-20 bg-black text-white z-50"
  >
    <div class="flex items-center md:space-x-10">
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-6 w-auto block" />
      </nuxt-link>
      <div
        class="to-md:absolute to-md:top-20 to-md:-left-0 to-md:w-full to-md:bg-zinc-800 to-md:z-50 to-md:p-5"
        :class="{ 'to-md:hidden': !mobileMenuOpen }"
      >
        <SiteNavigation />
      </div>
    </div>

    <div class="flex items-center gap-5">
      <LanguageSwitcher />
      <!-- <CartButton /> -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden w-6 h-6"
      >
        <Icon v-if="mobileMenuOpen" name="x" class="w-6 h-6" />
        <Icon v-else name="hamburger" class="w-6 h-6" />
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
