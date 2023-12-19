<template>
  <div class="chip">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
defineOptions({
  name: 'ChipComponent',
});
</script>

<style scoped>
.chip {
  @apply min-w-4xs rounded-lg border border-gray-400 bg-transparent px-2 py-1 text-center text-md;
}
</style>
