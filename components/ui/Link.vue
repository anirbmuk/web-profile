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
    rel="noopener"
    class="duration-200 ease-linear md:border-black-light lg:hover:border-b"
    @click="$emit('linkClick', 'external')">
    {{ link?.text }}
    <span class="sr-only">
      ({{ $i18n.t('global.accessibility.hint.newTab') }})
    </span>
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
  linkClick: [type: 'internal' | 'external']
}>();

const localePath = useLocalePath();
const { $i18n } = useNuxtApp();

defineOptions({
  name: 'LinkComponent',
});
</script>
