<template>
  <About />
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
useHead({
  title: $i18n.t('about.title'),
});
defineOptions({
  name: 'AboutIndexPage',
});
</script>
