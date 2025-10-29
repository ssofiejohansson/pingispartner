<template>
  <li class="relative group">
    <PrismicLink
      v-if="link.link_type === 'Document'"
      :field="link"
      class="hover:text-green-500"
    >
      {{ text }}
    </PrismicLink>

    <ul
      v-if="items.length"
      class="absolute top-full left-0 group-hover:block hidden bg-white shadow-sm p-3 rounded-md text-zinc-900"
    >
      <NavigationItem
        v-for="(item, index) in items"
        :key="`menu-item-${index}`"
        :items="[]"
        :link="item.link"
        :text="item.text"
      />
    </ul>
  </li>
</template>

<script setup>
const props = defineProps({
  items: Object,
  link: Object,
  text: String,
});
</script>
