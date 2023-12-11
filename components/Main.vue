<template>
  <div class="mx-auto space-y-16 xl:max-w-3/4 2xl:max-w-4/5">
    <template v-if="profile">
      <Profile :profile="profile" />
    </template>
    <template v-if="career">
      <Career :block="career" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '~/types/features/profile';
import type { CareerBlock } from '~/types/features/career';

import { CAREER, PROFILE } from '~/constants/url';

const { fetch } = useFirebase();

const [[profile], career] = await Promise.all([
  fetch<ProfileBlock>(PROFILE),
  fetch<CareerBlock>(CAREER),
]);

defineOptions({
  name: 'MainComponent',
});
</script>
