<template>
  <nav v-if="nav?.data?.slices?.length > 0">
    <ul
      :class="[
        'flex flex-col lg:flex-row items-center space-y-5 lg:px-6 lg:space-y-0',
        isFooter ? 'lg:space-x-6' : 'lg:space-x-8'
      ]"
    >
      <NavigationItem
        v-for="(item, index) in nav.data.slices"
        :key="`menu-item-${index}`"
        :items="item.items"
        :link="item.primary.link"
        :text="item.primary.text"
        :is-footer="isFooter"
      />
    </ul>
  </nav>
</template>

<script setup>
const { data: nav } = await useNavigation();

defineProps({
  isFooter: {
    type: Boolean,
    default: false
  }
})
</script>
