<template>
  <SliceSimulator #default="{ slices }">
    <SliceZone :slices="slices" :components="{ ...slicesComponents, ...formComponents }" />
  </SliceSimulator>
</template>

<script setup>
import { SliceSimulator } from "@slicemachine/adapter-nuxt/simulator";
import { components as slicesComponents } from "~/slices";
import { components as formComponents } from "~/form-fields";

definePageMeta({
  layout: "empty",
});
</script>
