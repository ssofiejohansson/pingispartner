<template>
  <label>
    {{ data.primary.label }}
    <span v-if="data?.primary?.required" class="font-bold">*</span>
  </label>
  <input
    type="text"
    :name="data.primary.label"
    class="form-input"
    :placeholder="data?.primary?.placeholder"
    :required="!!data?.primary?.required"
    :aria-required="data?.primary?.required ? 'true' : 'false'"
  />
</template>

<script setup>
defineProps(["data"]);
</script>
