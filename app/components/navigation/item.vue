<template>
  <li class="relative group w-full lg:w-auto">
    <!-- Top-level link -->
    <div>
      <PrismicLink
        v-if="link.link_type === 'Document'"
        :field="link"
        class="hover:text-primaryDark block py-2 text-xl lg:text-base text-center lg:text-left"
        @click.prevent="toggleDropdown"
      >
        {{ text }}
      </PrismicLink>
    </div>

    <!-- Submenu -->
    <ul
      v-if="items.length"
      :class="[
        'lg:absolute lg:top-full lg:left-0 lg:bg-light lg:shadow-sm lg:p-3 lg:rounded-md lg:text-dark',
        open ? 'block' : 'hidden',
        'lg:group-hover:block'
      ]"
    >
      <NavigationItem
        v-for="(item, index) in items"
        :key="`menu-item-${index}`"
        :items="[]"
        :link="item.link"
        :text="item.text"
        class="py-2 text-lg lg:text-base "
      />
    </ul>
  </li>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  link: { type: Object, required: true },
  text: { type: String, required: true },
})

const open = ref(false)

// Toggle submenu on mobile/tablet only
function toggleDropdown() {
  if (window.innerWidth < 1024 && props.items.length > 0) {
    open.value = !open.value
  }
}
</script>