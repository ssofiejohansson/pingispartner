<template>
  <div
    :class="[
      'sticky top-0 w-full flex flex-col gap-2 justify-center px-5 lg:px-8 items-center pt-8 z-50 transition-colors duration-300',
      scrolled && isDesktop ? 'bg-light/40 backdrop-blur-lg  border-b-2' : ''
    ]"
  >
    <div class="flex items-center">
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-16 w-auto block" />
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
        class="fixed inset-0 bg-light/60 backdrop-blur-lg flex flex-col justify-center items-center z-50 lg:hidden"
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

import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);
const isDesktop = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 80; // change threshold if needed
};

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024; // Tailwind lg breakpoint
};

onMounted(() => {
  handleResize();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
});
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
