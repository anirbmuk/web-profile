<template>
  <NuxtLink
    v-if="link.type === 'internal'"
    active-class="font-semibold"
    trailing-slash="remove"
    class="navlink"
    :to="localePath(link.url)"
    :title="link?.title"
    @click="$emit('linkClick', 'internal')">
    {{ link?.text }}
  </NuxtLink>
  <a
    v-else
    target="_blank"
    :href="link?.url"
    :title="link?.title"
    rel="nofollow"
    class="duration-200 ease-linear md:border-black-light lg:hover:border-b"
    @click="$emit('linkClick', 'external')">
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

defineEmits<{(e: 'linkClick', type: 'internal' | 'external'): void;}>();

const localePath = useLocalePath();

defineOptions({
  name: 'LinkComponent',
});
</script>
