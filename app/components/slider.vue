<template>
  <div class="relative">
    <!-- ARROW: LEFT -->
 
    <Icon
      name="left"
      class="w-12 h-auto absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-light shadow p-2 rounded-full opacity-90 cursor-pointer"
      @click="slider?.prev()"
    />

    <!-- SLIDER -->
    <div ref="sliderRef" class="keen-slider">
      <div
        class="keen-slider__slide p-6 bg-white mb-6 flex flex-col shadow-md gap-1"
        v-for="(refData, i) in slides"
        :key="refData.item.id"
      >
 
          <img
            v-if="refData.item.data.image"
            :src="refData.item.data.image.url"
            :alt="refData.item.data.image.alt || ''"
            class="w-16 h-16 rounded-full object-cover object-top shrink-0"
          />

         <p class="ref"> <prismic-rich-text :field="refData.item.data.name" /></p> 
          <p class="ref"> <prismic-rich-text :field="refData.item.data.title" /></p>

          <p>
            {{ reviewPreview(i) }}

            <button
              v-if="reviewIsLong(i)"
              @click="toggle(i)"
              class="text-primaryDark hover:underline text-xs text-left"
            >
              {{ expanded[i] ? "Visa mindre" : "Visa mer" }}
            </button>
          </p>
        </div>
      
    </div>

    <!-- ARROW: RIGHT -->
    <Icon
      name="right"
      class="w-12 h-auto absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full  opacity-90 cursor-pointer"
      @click="slider?.next()"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

const props = defineProps({ slides: Array });

// ===== Expand / collapse logic =====
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

// ===== Keen Slider =====
const sliderRef = ref(null);
let slider;

onMounted(() => {
  slider = new KeenSlider(sliderRef.value, {
    loop: true,
    spacing: 20,
    mode: "snap",

    breakpoints: {
      "(min-width: 400px)": { slides: { perView: 1 } },
      "(min-width: 720px)": { slides: { perView: 2 } },
      "(min-width: 1224px)": { slides: { perView: 3 } },
      "(min-width: 1580px)": { slides: { perView: 4 } },
    },

    slides: { perView: 1 },

    created(slider) {
      let timeout;
      let mouseOver = false;

      function autoPlay() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => slider.next(), 2500);
      }

      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearTimeout(timeout);
      });

      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        autoPlay();
      });

      autoPlay();
    },
  });
});

onUnmounted(() => slider?.destroy());
</script>
