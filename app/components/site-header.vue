<template>
  <div class="relative z-50 bg-transparent w-full flex justify-between items-center p-5 lg:px-8 ">
    <!-- Logo Left -->
    <div class="flex items-center">
      <nuxt-link :to="home">
        <prismic-image :field="settings?.data?.logo" class="h-16 w-auto block" />
      </nuxt-link>
    </div>

    <!-- Desktop Nav Right -->
    <div class="hidden lg:flex">
      <SiteNavigation />
    </div>

    <!-- Mobile Menu Button Right -->
    <div class="lg:hidden">
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="w-14 h-14 relative z-[60] text-dark"
      >
        <Icon v-if="mobileMenuOpen" name="x" class="w-15 h-15" />
        <Icon v-else name="hamburger" class="w-15 h-15" />
      </button>
    </div>

    <!-- Mobile Menu Fullscreen -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-light/40 backdrop-blur-xl flex flex-col justify-center items-center z-50 lg:hidden"
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
