<template>
  <nav v-if="nav?.data?.slices?.length > 0">
    <ul class="md:flex md:space-x-8">
      <NavigationItem
        v-for="(item, index) in nav.data.slices"
        :key="`menu-item-${index}`"
        :items="item.items"
        :link="item.primary.link"
        :text="item.primary.text"
        class="py-3"
      />
    </ul>
  </nav>
</template>

<script setup>
const { data: nav } = await useNavigation();
</script>
