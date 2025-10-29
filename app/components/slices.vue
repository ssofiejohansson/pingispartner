<template>
  <slice-zone v-if="doc?.data?.slices?.length > 0" :slices="doc.data.slices" :components="components" />
  <error v-else />
</template>

<script setup>
import { components } from "~/slices";

defineProps(["doc"]);
</script>
