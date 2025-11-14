<template>
  <div
    class="sticky top-0 w-full flex flex-col gap-4 justify-center px-5 lg:px-8 items-center pt-3 z-50 "
  >
    <div class="flex items-center">
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-20 w-auto block" />
      </nuxt-link>
    </div>

    <!-- Desktop Navigation (only visible on large screens) -->
    <div class="hidden lg:block">
      <SiteNavigation />
    </div>

    <!-- Mobile/Tablet Menu Button -->
    <div>
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="lg:hidden w-14 h-14 z-[60] relative"
      >
        <Icon v-if="mobileMenuOpen" name="x" class="w-14 h-14" />
        <Icon v-else name="hamburger" class="w-14 h-14" />
      </button>
    </div>

    <!-- Full-Screen Mobile/Tablet Menu -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-light/60 backdrop-blur-2xl flex flex-col justify-center items-center z-50 p-10 lg:hidden"
      >
        <SiteNavigation @click.native="mobileMenuOpen = false" />
      </div>
    </transition>
  </div>
</template>

<script setup>
const home = useHome()
const { data: settings } = await useSettings()
const mobileMenuOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
