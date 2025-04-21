<template>
  <div
    v-show="width"
    :key="width"
    class="h-0.5 bg-gray-500 dark:bg-white"
    :style="{ width: `${width}%` }" />
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
  {
    immediate: true,
  },
);

defineOptions({
  name: 'ProgressBarComponent',
});
</script>
