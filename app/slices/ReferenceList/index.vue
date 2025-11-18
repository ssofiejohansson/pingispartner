<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32"
  >
    <!-- {{ slice }} -->
    <div class="container mx-auto px-5 lg:px-10">
      <div v-if="slice.primary.heading && slice.primary.heading.length">
        <prismic-rich-text :field="slice.primary.heading" />
      </div>

      <!-- References list default -->
      <div
        v-if="slice.variation === 'default'"
        v-for="ref in slice.primary.reference"
        :key="ref.item.id"
        class="max-w-[800px] bg-white flex flex-col lg:flex-row gap-8 items-left justify-center p-6 lg:p-10 mb-6 mx-auto shadow-md"
      >
   
        <!-- Image -->
        <img
          v-if="ref.item.data.image"
          :src="ref.item.data.image.url"
          :alt="ref.item.data.image.alt || ''"
          class="w-28 h-28 lg:w-48 lg:h-48 rounded-full object-cover"
        />

        <!-- Text content -->
        <div
          class= "lg:px-6 flex flex-col justify-center rich-text"
        >
          <prismic-rich-text :field="ref.item.data.name" />
          <prismic-rich-text :field="ref.item.data.title" />
          <prismic-rich-text :field="ref.item.data.text" />
        </div> 
      </div>
   

<!-- old preview  -->
      <!-- <div v-if="slice.variation === 'preview'" class="flex ">
       
        <div
          v-for="ref in slice.primary.reference"
          :key="ref.item.id"
          class="w-80 border p-4 border-red-500"
        >
          <div>
         
          <prismic-rich-text :field="ref.item.data.name" />
          <prismic-rich-text :field="ref.item.data.text"/>
       
       </div>

        </div>
      </div> -->
    </div>
    <!-- preview slider -->
      <div v-if="slice.variation === 'preview'" class="py-10 mx-2">
        <Slider :slides="slice.primary.reference"/>
      </div>


  </section>
</template>

<script setup>
  defineProps(["slice", "index", "slices", "context"]);
</script>
