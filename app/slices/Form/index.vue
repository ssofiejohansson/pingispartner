<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="my-12 lg:my-24 xl:my-32"
  >
    <div class="container">
      <div v-if="slice.primary.form?.data">
        <div class="font-bold text-3xl mb-3">
          <prismic-text :field="slice.primary.form.data.title" />
        </div>
        <prismic-rich-text :field="slice.primary.form.data.description" />

        <form
          action="https://usebasin.com/f/3044d6d9f9f5"
          method="POST"
          class="mt-10 -mx-5 flex flex-wrap"
        >
          <slice-zone
            :components="components"
            :slices="slice.primary.form.data.slices"
          />
          <div
            class="field sr-only"
            :index="slice?.primary?.form?.data?.slices?.length"
          >
            <div class="sm:!w-4/5">
              <input type="text" name="_gotcha" />
            </div>
          </div>
          <div class="w-full px-5">
            <input
              type="submit"
              class="bg-black text-white px-5 py-3 rounded-md"
              :value="slice.primary.form.data.submit_button_text"
            />
          </div>
        </form>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        <p>Form is missing or not properly configured.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { components } from "~/form-fields";

defineProps(["slice", "index", "slices", "context"]);
</script>
