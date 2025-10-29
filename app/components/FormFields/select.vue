<template>
  <label>
    {{ data.primary.label }}
    <span v-if="data?.primary?.required" class="font-bold">*</span>
  </label>
  <select :name="data.primary.label" class="form-input form-select">
    <option selected disabled>Välj</option>
    <option
      v-for="(item, index) in data.items"
      :value="getOptionValue(item.option)"
      :required="!!data?.primary?.required"
      :aria-required="data?.primary?.required ? 'true' : 'false'"
    >
      {{ getOptionText(item.option) }}
    </option>
  </select>
</template>

<script setup>
defineProps(["data"]);

function getOptionValue(option) {
  const optionArr = option.split(" : ");

  return optionArr[0];
}

function getOptionText(option) {
  const optionArr = option.split(" : ");

  if (optionArr.length > 1) {
    return optionArr[1];
  } else {
    return optionArr[0];
  }
}
</script>
