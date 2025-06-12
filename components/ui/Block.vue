<template>
  <div
    :class="{
      'bg-black-dark': blockStyle === 'normal',
      'border border-gray-300 bg-gray-200': blockStyle === 'inverted',
    }"
    class="flex space-x-2 rounded-t p-4">
    <span class="inline-block size-3 rounded-full bg-red" />
    <span class="inline-block size-3 rounded-full bg-yellow" />
    <span class="inline-block size-3 rounded-full bg-fluorescent-green" />
  </div>
  <div
    :class="{
      'bg-black text-white': blockStyle === 'normal',
      'border border-gray-300 bg-gray-100': blockStyle === 'inverted',
    }"
    class="-mt-0.5 rounded-b p-5 dark:bg-transparent">
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
