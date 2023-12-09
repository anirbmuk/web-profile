<template>
  <Main />
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
useHead({
  title: $i18n.t('global.title'),
});
defineOptions({
  name: 'RootIndexPage',
});
</script>
