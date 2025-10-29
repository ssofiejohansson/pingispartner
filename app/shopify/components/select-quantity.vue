<template>
  <div class="border border-zinc-300 flex items-center mr-3">
    <div
      @click="$emit('decreaseQuantity')"
      class="remove h-full flex items-center justify-center cursor-pointer"
      :class="[small ? 'w-8' : 'w-14']"
    >
      <Icon
        name="minus"
        class="block"
        :class="[small ? 'w-3 h-3' : 'w-4 h-4']"
      />
    </div>
    <input
      type="text"
      class="text-center bg-transparent appearance-none focus:outline-none pointer-events-none"
      :class="[small ? 'text-[12px] md:text-sm w-8 h-6 md:h-8' : 'w-20 h-10']"
      :value="quantity"
    />
    <div
      @click="$emit('increaseQuantity')"
      class="add h-full flex items-center justify-center cursor-pointer"
      :class="[small ? 'w-8' : 'w-14']"
    >
      <Icon
        name="plus"
        class="block"
        :class="[small ? 'w-3 h-3' : 'w-4 h-4']"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  quantity: {
    type: Number,
    required: true,
  },
  small: {
    type: Boolean,
    defafult: false,
  },
});
</script>
