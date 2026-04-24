<template>
  <button
    type="button"
    class="fixed bottom-16 right-4 z-10 cursor-pointer rounded-full bg-black p-2.5 hover:opacity-100 md:opacity-70 dark:border-2 dark:border-white"
    :aria-label="$i18n.t('global.accessibility.ariaLabel.backToTopButton')"
    @click="$emit('scrollToTop')">
    <div class="flex items-center text-3xl text-white">
      <LazyUiIcon
        icon="up-arrow"
        loading="lazy"
        :size="6" />
    </div>
  </button>
</template>

<script setup lang="ts">
const { $i18n } = useNuxtApp();

defineEmits<{
  scrollToTop: [],
}>();

defineOptions({
  name: 'BackToTopComponent',
});
</script>
