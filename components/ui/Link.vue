<template>
  <NuxtLink
    v-if="link.type === 'internal'"
    active-class="font-bold"
    :to="localePath(link.url)"
    :title="link?.title"
    @click="$emit('linkClink', 'internal')">
    {{ link?.text }}</NuxtLink
  >
  <a
    v-else
    target="_blank"
    :href="link?.url"
    :title="link?.title"
    rel="nofollow"
    class="md:border-black-light duration-200 ease-linear lg:hover:border-b"
    @click="$emit('linkClink', 'external')">
    {{ link?.text }}
  </a>
</template>

<script setup lang="ts">
import type { Link } from '~/types/components/link';

defineProps({
  link: {
    type: Object as PropType<Link>,
    required: true,
  },
});

defineEmits<{
  (e: 'linkClink', type: 'internal' | 'external'): void;
}>();

const localePath = useLocalePath();

defineOptions({
  name: 'LinkComponent',
});
</script>
