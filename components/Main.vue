<template>
  <div v-if="profile">{{ profile }}</div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '~/types/features/profile';
import { PROFILE } from '~/constants/url';

const { fetch } = useFirebase();

const [profile] = await Promise.all([fetch<ProfileBlock>(PROFILE)]);

defineOptions({
  name: 'MainComponent',
});
</script>
