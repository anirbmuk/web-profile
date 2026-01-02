<template>
  <div
    v-show="width"
    :key="width"
    role="progressbar"
    :aria-label="$i18n.t('global.accessibility.ariaLabel.loadingProgressBar')"
    class="h-0.5 bg-gray-500 dark:bg-white"
    :style="{ width: `${width}%` }" />
</template>

<script setup lang="ts">
const loadingState = useState('loader');
const width = ref<number>(0);
const { $i18n } = useNuxtApp();

let progressBar: NodeJS.Timeout | undefined;

watch(
  loadingState,
  (loading, _, onCleanup) => {
    if (loading) {
      progressBar = setInterval(() => {
        if (width.value < 100) {
          width.value++;
        }
      }, 25);
    } else {
      width.value = 0;
    }
    onCleanup(() => {
      if (progressBar) {
        clearInterval(progressBar);
      }
    });
  },
  {
    immediate: true,
  },
);

defineOptions({
  name: 'ProgressBarComponent',
});
</script>
