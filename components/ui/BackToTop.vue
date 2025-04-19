<template>
  <button
    type="button"
    class="fixed bottom-16 right-4 z-10 cursor-pointer rounded-full bg-black p-2.5 hover:opacity-100 md:opacity-70 dark:border-2 dark:border-white"
    @click="$emit('scrollToTop')">
    <div
      class="flex items-center text-3xl text-white"
      translate="no">
      <LazyUiIcon
        icon="UpArrow"
        loading="lazy"
        :size="6" />
    </div>
  </button>
</template>

<script setup lang="ts">
defineEmits<{
  scrollToTop: [],
}>();

defineOptions({
  name: 'BackToTopComponent',
});
</script>
