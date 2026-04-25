<template>
  <template v-if="Boolean(href)">
    <a
      rel="noopener"
      target="_blank"
      :href="href"
      @click="$emit('linkClick', href)">
      <slot />
      <span class="sr-only">
        ({{ $i18n.t('global.accessibility.hint.newTab') }})
      </span>
    </a>
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

const { $i18n } = useNuxtApp();

defineOptions({
  name: 'LinkOrTextComponent',
});
</script>
