<template>
  <swiper
    :space-between="20"
    :loop="true"
    :autoplay="{ delay: 1000 }"
    :pagination="{ clickable: true }"
    :navigation="true"
    :breakpoints="{
      400: { slidesPerView: 1 }, // mobile
      600: { slidesPerView: 2 }, // mobile
      720: { slidesPerView: 3 }, // Tablet
      1024: { slidesPerView: 5 }, // Desktop
      1280: { slidesPerView: 6 }, // Desktop
    }"
    class=""
  >
    <swiper-slide
      v-for="ref in slides"
      :key="ref.item.id"
      class="p-4 bg-white shadow-md"
    >
      <div class="flex flex-col gap-2 text-sm">
        <!-- <Icon name="pingisIcon" /> -->
        <prismic-rich-text :field="ref.item.data.name" />
        <prismic-rich-text :field="ref.item.data.text" />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

defineProps({
  slides: {
    type: Array,
    required: true,
  },
  slidesPerView: {
    type: Number,
    default: 3,
  },
});
</script>
