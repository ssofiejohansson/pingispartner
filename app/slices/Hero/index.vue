<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="w-full overflow-hidden lg:h-[50vh] min-h-[30vh]"
  >
    <!-- Background Media (video or image) -->
    <!-- <div class="absolute inset-0 z-1 w-full h-full overflow-hidden opacity-20">


      <video
        v-if="
          slice?.primary?.hero_img?.kind === 'file' &&
          slice?.primary?.hero_img?.name?.includes('mp4')
        "
        :src="slice.primary.hero_img.url"
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
      ></video>

     
      <div
        v-else
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${slice.primary.hero_img.url})` }"
      ></div>

    </div> -->

    <!-- Hero Text -->
   <div class=" flex flex-col gap-2 items-center justify-center text-center max-w-3xl mx-auto p-6 my-12" >

   
    <div class="flex flex-row gap-0  ">
       <prismic-rich-text :field="slice.primary.heading" /> 
       <!-- <span>  <Icon name="pingisIcon" class=""/></span> -->
    </div>
    <hr class="w-32 h-2 mx-auto my-4 bg-accent border-0"></hr>
    <p class="text-lg font-light">
      <prismic-rich-text :field="slice.primary.text" />
    </p>
    
     <!-- Buttons -->
    <div
      v-if="slice.primary.button?.some((btn) => btn.text || btn.url)"
      class="flex flex-wrap gap-4 my-6 justify-center"
    >
      <Button v-for="(btn, i) in slice.primary.button" :key="i" :btn="btn" />
    </div>
  </div>
  </section>
</template>

<script setup>
defineProps(["slice", "index", "slices", "context"]);
</script>
