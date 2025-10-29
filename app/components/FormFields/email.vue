<template>
  <label>
    {{ data.primary.label }}
    <span v-if="data?.primary?.required" class="font-bold">*</span>
  </label>
  <input
    type="email"
    name="Email"
    class="form-input"
    :required="!!data?.primary?.required"
    :aria-required="data?.primary?.required ? 'true' : 'false'"
    :placeholder="data?.primary?.placeholder"
  />
</template>

<script setup>
defineProps(["data"]);
</script>
