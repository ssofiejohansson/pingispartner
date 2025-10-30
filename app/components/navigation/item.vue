<template>
  <li class="relative group">
    <PrismicLink
      v-if="link.link_type === 'Document'"
      :field="link"
      class="hover:text-primaryDark"
    >
      {{ text }}
    </PrismicLink>

    <ul
      v-if="items.length"
      class="absolute top-full left-0 group-hover:block hidden bg-light shadow-sm p-3 rounded-md text-dark"
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
