<template>
  <header class="header-background fixed top-0 z-50 w-full">
    <div class="py-4">
      <h1
        class="text-shadow items-center text-center text-3xl font-bold uppercase tracking-wide md:text-4xl md:tracking-wider lg:text-6xl"
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

<style scoped>
.text-shadow {
  text-shadow: 0 0 2px var(--black-light);
}

.header-background {
  @apply border-b border-gray-100 bg-gray-50;
}

@media (prefers-color-scheme: dark) {
  .header-background {
    @apply border-b border-transparent bg-transparent;
  }
}
</style>
