<template>
  <header>
    <nav class="flex justify-center bg-gray-200 p-4 text-xl">
      {{ $i18n.t('global.title') }}
    </nav>
  </header>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();
</script>
