<template>
  <div class="mx-auto space-y-16 xl:max-w-3/4 2xl:max-w-4/5">
    <template v-if="profile">
      <Profile :profile="profile" />
    </template>
    <template v-if="career">
      <LazyCareer :block="career" />
    </template>
    <template v-if="techstack">
      <LazyTechstack :block="techstack" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '~/types/features/profile';
import type { CareerBlock } from '~/types/features/career';
import type { TechstackBlock } from '~/types/components/techstack';

import { CAREER, PROFILE, TECHSTACK } from '~/constants/url';

const { fetch } = useFirebase();

const [[profile], career, [techstack]] = await Promise.all([
  fetch<ProfileBlock>(PROFILE),
  fetch<CareerBlock>(CAREER),
  fetch<TechstackBlock>(TECHSTACK),
]);

defineOptions({
  name: 'MainComponent',
});
</script>
