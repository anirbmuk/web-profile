<template>
  <button
    type="button"
    @click="$emit('scrollToTop')">
    <div
      class="flex items-center text-3xl text-white"
      translate="no">
      &#8593;
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

<style scoped>
button {
  @apply fixed bottom-16 right-4 z-10 cursor-pointer rounded-full bg-black-light px-4 pb-2 pt-1 opacity-70 hover:bg-black;
}

@media (hover: hover) {
  button:hover {
    @apply md:opacity-100;
  }
}
</style>
