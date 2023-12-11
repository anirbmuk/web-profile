<template>
  <button
    @click="$emit('onclick')"
    :type="buttonType.type"
    :class="buttonType.buttonClass"
    :aria-label="buttonType.ariaLabel">
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { Button } from '~/types/components/button';

defineProps({
  buttonType: {
    type: Object as PropType<Button>,
    default: {
      type: 'button',
    },
  },
});
defineEmits(['onclick']);
defineOptions({
  name: 'ButtonComponent',
});
</script>
