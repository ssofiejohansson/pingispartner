<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="w-full overflow-hidden lg:min-h-[50vh] min-h-[30vh]"
  >
  
    <!-- Hero Text -->
     
   <div class=" flex flex-col gap-2 items-center justify-center text-center max-w-3xl mx-auto p-6 my-12" >
   
    <div class="flex flex-col gap-0  ">
       <prismic-rich-text :field="slice.primary.heading" /> 

       <!-- possible hero img/logo -->
         <img
    v-if="slice.primary.hero_img?.url"
    :src="slice.primary.hero_img.url"
    :alt="slice.primary.hero_img.alt || ''"
    class="w-12 md:w-16 h-auto object-contain mx-auto mb-2"
  />
 
    </div>
 
    <div class="text-base md:text-lg font-light">
      <prismic-rich-text :field="slice.primary.text" />
    </div>
    
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
