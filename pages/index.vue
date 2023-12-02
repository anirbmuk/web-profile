<template>
  <h2>{{ $i18n.t('root.title') }}</h2>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: $i18n.t('global.title'),
});
useSeoMeta({
  robots: 'index,follow',
});
</script>
