<template>
  <button type="button" @click="$emit('scrollToTop')">
    <div class="material-symbols-rounded flex items-center text-white" translate="no">
      arrow_upward
    </div>
  </button>
</template>

<script setup lang="ts">
defineEmits(['scrollToTop']);

defineOptions({
  name: 'BackToTopComponent',
});
</script>

<style scoped>
button {
  @apply fixed bottom-16 right-4 z-10 cursor-pointer rounded-full bg-black-light p-2 opacity-70;
}

@media (hover: hover) {
  button:hover {
    @apply md:opacity-100;
  }
}
</style>
