<template>
  <div ref="content">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  threshold: {
    type: Array as PropType<number[]>,
    default: undefined,
  },
});
const emit = defineEmits(['tracked']);

const content = ref<HTMLElement | null>(null);
const tracked = ref(false);

let observer: IntersectionObserver;

onMounted(() => {
  const intersectionOptions: IntersectionObserverInit = {
    root: document,
    rootMargin: '0px',
    threshold: props.threshold || [1],
  };
  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !tracked.value) {
        tracked.value = true;
        emit('tracked');
      }
    });
  };
  observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
  const target = content.value;
  target && observer?.observe(target);
});
defineOptions({
  name: 'IntersectComponent',
});
</script>
