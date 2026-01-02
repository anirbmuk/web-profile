<template>
  <header class="fixed top-0 z-50 h-16 w-full border-b border-gray-100 bg-gray-50 md:h-[72px] lg:h-20 dark:bg-transparent">
    <div class="py-4">
      <h1
        class="text-shadow h-8 items-center text-center text-3xl font-bold uppercase tracking-wide md:h-10 md:text-4xl md:tracking-wider lg:h-12 lg:text-6xl"
        translate="no">
        Anirban Mukherjee
      </h1>
    </div>
    <UiProgressBar />
  </header>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HeaderComponent',
});
</script>
