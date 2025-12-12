<template>
  <li class="relative group w-full lg:w-auto">
    <!-- Top-level link -->
    <div>
      <PrismicLink
        v-if="link.link_type === 'Document'"
        :field="link"
        @click.prevent="toggleDropdown"
        :class="[
          'hover:text-primaryDark font-normal block py-1 text-lg text-center lg:text-left',
          isActive ? 'border-b-4 border-primaryDark text-primaryDark' : '',
        ]"
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
        'lg:group-hover:block',
      ]"
    >
      <NavigationItem
        v-for="(item, index) in items"
        :key="`menu-item-${index}`"
        :items="[]"
        :link="item.link"
        :text="item.text"
        class="py-2 text-lg lg:text-base"
      />
    </ul>
  </li>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  link: { type: Object, required: true },
  text: { type: String, required: true },
});

const open = ref(false);
const route = useRoute();

// Check if this link is the current page
const isActive = computed(() => {
  return props.link?.url === route.path;
});

// Toggle submenu on mobile/tablet only
function toggleDropdown() {
  if (window.innerWidth < 1024 && props.items.length > 0) {
    open.value = !open.value;
  }
}
</script>
