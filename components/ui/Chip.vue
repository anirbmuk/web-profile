<template>
  <div class="min-w-4xs rounded-md border border-gray-400 bg-gray-100 px-2 py-1 text-center text-md dark:border-white dark:bg-transparent">
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
