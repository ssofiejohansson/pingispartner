<template>
  <swiper
    :space-between="20"
    :loop="true"
    :autoplay="{ delay: 1500, pauseOnMouseEnter: true }"
    :pagination="{ clickable: true }"
    :navigation="true"
    :breakpoints="{
      400: { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      720: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
      1480: { slidesPerView: 6 },
    }"
  >
    <swiper-slide
      v-for="(ref, i) in slides"
      :key="ref.item.id"
      class="p-4 bg-white"
    >
      <div class="flex flex-col gap-2 text-sm cursor-e-resize">
        <prismic-rich-text :field="ref.item.data.name" />

        <p>
          {{ reviewPreview(i) }}
          <button
            v-if="reviewIsLong(i)"
            @click="toggle(i)"
            class="text-primaryDark hover:underline text-xs text-left"
          >
            {{ expanded[i] ? " Visa mindre" : " Visa mer" }}
          </button>
        </p>

        <!-- toggle text -->
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

const props = defineProps({ slides: Array });

//edit the word limit
const WORD_LIMIT = 35;
const expanded = ref({});

const toggle = (i) => (expanded.value[i] = !expanded.value[i]);

const extract = (i) => props.slides[i].item.data.text?.[0]?.text || "";

const reviewIsLong = (i) => extract(i).split(" ").length > WORD_LIMIT;

const reviewPreview = (i) => {
  const text = extract(i);
  const words = text.split(" ");

  if (expanded.value[i] || words.length <= WORD_LIMIT) return text;

  return words.slice(0, WORD_LIMIT).join(" ") + "...";
};
</script>
