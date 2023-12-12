<template>
  <div
    v-show="width"
    class="progress-bar"
    :style="{ width: `${width}%` }"
    :key="width"></div>
</template>

<script setup lang="ts">
const loadingState = useState('loader');
const width = ref<number>(0);

let progressBar: NodeJS.Timeout | undefined;

watch(
  loadingState,
  (loading) => {
    if (loading) {
      progressBar = setInterval(() => {
        if (width.value < 100) {
          width.value++;
        }
      }, 50);
    } else {
      clearInterval(progressBar);
      width.value = 0;
    }
  },
  { immediate: true },
);

defineOptions({
  name: 'ProgressBarComponent',
});
</script>

<style scoped>
.progress-bar {
  @apply h-0.5 bg-gray-500;
}

@media (prefers-color-scheme: dark) {
  .progress-bar {
    @apply bg-white;
  }
}
</style>
