<template>
  <label>
    {{ data.primary.label }}
    <span v-if="data?.primary?.required" class="font-bold">*</span>
  </label>
  <textarea
    class="form-textarea"
    :name="data.primary.label"
    :placeholder="data?.primary?.placeholder"
    :required="!!data?.primary?.required"
    :aria-required="data?.primary?.required ? 'true' : 'false'"
  ></textarea>
</template>

<script setup>
defineProps(["data"]);
</script>
