<template>
  <label>
    {{ data.primary.label }}
    <span v-if="data?.primary?.required" class="font-bold">*</span>

    <span class="w-full flex items-start">
      <input
        type="checkbox"
        name="consent"
        class="border border-zinc-300 w-6 h-6 mr-3"
        :value="prismicH.asText(data.primary.consent_message)"
        :required="!!data?.primary?.required"
        :aria-required="data?.primary?.required ? 'true' : 'false'"
      />
      <prismic-rich-text :field="data.primary.consent_message" />
    </span>
  </label>
</template>

<script setup>
import * as prismicH from "@prismicio/helpers";

defineProps(["data"]);
</script>
