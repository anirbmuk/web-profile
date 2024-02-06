<template>
  <section class="mx-auto mt-16 md:mt-24 xl:max-w-3/4 2xl:max-w-4/5">
    <UtilIntersect @tracked="tracker('profile_image_section')">
      <div role="img" class="profile-image" aria-label="profile image" preload />
    </UtilIntersect>
  </section>
  <div class="mx-auto space-y-16 xl:max-w-3/4 2xl:max-w-4/5">
    <template v-if="profile">
      <UtilIntersect @tracked="tracker('profile_section')">
        <Profile :profile="profile" />
      </UtilIntersect>
    </template>
    <template v-if="career?.length">
      <UtilIntersect :threshold="[0.7]" @tracked="tracker('career_section')">
        <LazyCareer :block="career" />
      </UtilIntersect>
    </template>
    <template v-if="techstack">
      <UtilIntersect @tracked="tracker('techstack_section')">
        <LazyTechstack :block="techstack" />
      </UtilIntersect>
    </template>
    <template v-if="github?.length">
      <UtilIntersect @tracked="tracker('github_section')">
        <LazyGithub :block="github" />
      </UtilIntersect>
    </template>
    <template v-if="education?.length">
      <UtilIntersect @tracked="tracker('education_section')">
        <LazyEducation :block="education" />
      </UtilIntersect>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProfileBlock } from '~/types/features/profile';
import type { CareerBlock } from '~/types/features/career';
import type { TechstackBlock } from '~/types/components/techstack';
import type { GithubBlock } from '~/types/features/github';
import type { EducationBlock } from '~/types/features/education';

import type { ImpressionEventParams } from '~/types/tracking';

const { $i18n } = useNuxtApp();
const { fetch } = useFirebase();
const { loadingState } = useLoader();
const { trackPageViewEvent, trackImpressionCollectionEvent } = useTracking();

const loadData = async () => {
  loadingState.value = true;
  return await Promise.all([
    fetch<ProfileBlock>('profile', true, 1),
    fetch<CareerBlock>('career'),
    fetch<TechstackBlock>('techstack', false, 1),
    fetch<GithubBlock>('github').then(github =>
      github.sort((g1, g2) => g1.position - g2.position),
    ),
    fetch<EducationBlock>('education', true, 1).then(education =>
      education.sort((e1, e2) => e1.position - e2.position),
    ),
  ]).finally(() => (loadingState.value = false));
};

const [[profile], career, [techstack], github, education] = await loadData();

const tracker = (event_section: ImpressionEventParams['event_section']) =>
  trackImpressionCollectionEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section,
  });

onMounted(() =>
  trackPageViewEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
  }),
);

defineOptions({
  name: 'MainComponent',
});
</script>

<style scoped>
.profile-image {
  background: url('https://res.cloudinary.com/dgc8mx39l/image/upload/f_auto,q_25/seo_anirbmuk.webp') no-repeat center;
  @apply mb-2 h-[420px] rounded-sm bg-cover md:h-[600px] lg:h-[420px] mx-auto md:max-w-3/4 2xl:max-w-3/5;
}
</style>
