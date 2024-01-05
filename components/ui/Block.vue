<template>
  <div
    :class="{
      'bg-black-dark': blockStyle === 'normal',
      'border border-gray-300 bg-gray-200': blockStyle === 'inverted',
    }"
    class="flex space-x-2 rounded-t p-4"
  >
    <span class="circle bg-red" />
    <span class="circle bg-yellow" />
    <span class="circle bg-fluorescent-green" />
  </div>
  <div
    :class="{
      'bg-black text-white': blockStyle === 'normal',
      'border border-gray-300 bg-gray-100': blockStyle === 'inverted',
    }"
    class="-mt-0.5 rounded-b p-5"
    previewbody
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { BlockType } from '~/types/components/block';

defineProps({
  blockStyle: {
    type: String as PropType<BlockType>,
    default: 'normal',
  },
});
defineOptions({
  name: 'BlockComponent',
});
</script>

<style scoped>
.circle {
  @apply inline-block h-3 w-3 rounded-full;
}

@media (prefers-color-scheme: dark) {
  [previewbody] {
    @apply bg-transparent;
  }
}
</style>
