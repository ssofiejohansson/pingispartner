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
      1024: { slidesPerView: 3 },
      1480: { slidesPerView: 5 },
    }"
  >
    <swiper-slide
      v-for="(ref, i) in slides"
      :key="ref.item.id"
      class="p-4 bg-white shadow-md"
    >
      <div class="flex flex-col gap-1 cursor-e-resize ">
        <img
          v-if="ref.item.data.image"
          :src="ref.item.data.image.url"
          :alt="ref.item.data.image.alt || ''"
          class="w-14 h-14 rounded-full object-cover object-top shrink-0"
        />
        <prismic-rich-text :field="ref.item.data.name" />
        <prismic-rich-text :field="ref.item.data.title" />

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
