<template>
  <div
    class="relative z-50 bg-transparent w-full flex justify-between items-center p-5 lg:px-8"
  >
    <!-- Logo Left -->
    <div class="flex items-center">
      <nuxt-link :to="home">
        <prismic-image
          :field="settings?.data?.logo"
          class="h-16 w-auto block"
        />
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
        class="relative w-12 h-12 z-[60] text-dark"
      >
        <!-- Hamburger -->
        <Icon
          name="hamburger"
          class="absolute inset-0 w-12 h-12 transition-all duration-100"
          :class="
            mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100'
          "
        />

        <!-- X -->
        <Icon
          name="x"
          class="absolute inset-0 w-12 h-12 transition-all duration-100 "
          :class="
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 -rotate-90 scale-75'
          "
        />
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
import { ref } from "vue";

const home = useHome();
const { data: settings } = await useSettings();
const mobileMenuOpen = ref(false);
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

.icon-enter-active,
.icon-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

.icon-enter-from {
  transform: rotate(-90deg) scale(0.8);
  opacity: 0;
}

.icon-leave-to {
  transform: rotate(90deg) scale(0.8);
  opacity: 0;
}
</style>
