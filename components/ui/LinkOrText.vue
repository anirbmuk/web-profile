<template>
  <template v-if="Boolean(href)">
    <a rel="nofollow" target="_blank" :href="href"> <slot /></a>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: undefined,
  },
});
defineOptions({
  name: 'LinkOrTextComponent',
});
</script>
