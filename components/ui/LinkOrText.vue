<template>
  <template v-if="Boolean(href)">
    <a
      rel="nofollow"
      target="_blank"
      :href="href"
      @click="$emit('linkClick', href)">
      <slot /></a>
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
defineEmits<{
  linkClick: [href: string | undefined]
}>();
defineOptions({
  name: 'LinkOrTextComponent',
});
</script>
