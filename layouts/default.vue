<template>
  <Header />
  <div class="container mx-auto my-4">
    <slot />
  </div>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
useHead({
  htmlAttrs: {
    lang: $i18n.locale,
  },
  title: $i18n.t('global.title'),
});
useSeoMeta({
  robots: 'index,follow',
});
</script>
