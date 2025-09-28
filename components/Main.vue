<template>
  <section class="mx-auto mt-16 md:mt-24 xl:max-w-3/4 2xl:max-w-4/5">
    <UtilIntersect @tracked="tracker('profile_image_section')">
      <div
        role="img"
        class="profile-image"
        :aria-label="$i18n.t('global.accessibility.ariaLabel.profileImage')" />
    </UtilIntersect>
  </section>
  <div class="mx-auto space-y-8 xl:max-w-3/4 xl:space-y-12 2xl:max-w-4/5 2xl:space-y-16">
    <template v-if="profile">
      <UtilIntersect
        :threshold="[0.1]"
        @tracked="tracker('profile_section')">
        <Profile
          :profile="profile"
          class="translate-y-1/3 opacity-[0.01] transition-all delay-100 duration-1000"
          :class="{
            '!translate-y-0 !opacity-100': visibility['profile_section'] === true,
          }" />
      </UtilIntersect>
    </template>
    <template v-if="data?.career?.length">
      <UtilIntersect
        :threshold="[0.1]"
        @tracked="tracker('career_section')">
        <LazyCareer
          :block="data.career"
          class="translate-y-1/3 opacity-[0.01] transition-all delay-100 duration-1000"
          :class="{
            '!translate-y-0 !opacity-100': visibility['career_section'] === true,
          }"
          hydrate-on-visible />
      </UtilIntersect>
    </template>
    <template v-if="data?.techstack">
      <UtilIntersect
        :threshold="[0.1]"
        @tracked="tracker('techstack_section')">
        <LazyTechstack
          :block="data.techstack"
          class="translate-y-1/3 opacity-[0.01] transition-all delay-100 duration-1000"
          :class="{
            '!translate-y-0 !opacity-100': visibility['techstack_section'] === true,
          }"
          hydrate-on-visible />
      </UtilIntersect>
    </template>
    <template v-if="data?.github?.length">
      <UtilIntersect
        :threshold="[0.1]"
        @tracked="tracker('github_section')">
        <LazyGithub
          :block="data.github"
          class="translate-y-1/3 opacity-[0.01] transition-all delay-100 duration-1000"
          :class="{
            '!translate-y-0 !opacity-100': visibility['github_section'] === true,
          }"
          hydrate-on-visible />
      </UtilIntersect>
    </template>
    <template v-if="data?.education?.length">
      <UtilIntersect
        :threshold="[0.1]"
        @tracked="tracker('education_section')">
        <LazyEducation
          :block="data.education"
          class="translate-y-1/3 opacity-[0.01] transition-all delay-100 duration-1000"
          :class="{
            '!translate-y-0 !opacity-100': visibility['education_section'] === true,
          }"
          hydrate-on-visible />
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

import { omit } from 'radash';

const { $i18n } = useNuxtApp();
const { fetch } = useFirebase();
const { loadingState } = useLoader();
const {
  trackPageViewEvent,
  trackImpressionCollectionEvent,
} = useTracking();

const visibility = reactive<Partial<Record<ImpressionEventParams['event_section'], boolean>>>({
});

const onEnteringComponent = (event_section: ImpressionEventParams['event_section']) =>
  (visibility[event_section] = true);

const loadData = async () => {
  loadingState.value = true;
  return await Promise.all([
    fetch<CareerBlock>('career'),
    fetch<TechstackBlock>('techstack', false, 1),
    fetch<GithubBlock>('github').then((github) =>
      github.sort((g1, g2) => g1.position - g2.position),
    ),
    fetch<EducationBlock>('education', true, 1).then((education) =>
      education.sort((e1, e2) => e1.position - e2.position),
    ),
  ]).finally(() => (loadingState.value = false));
};

const { data: profile } = useAsyncData('profile', async () => {
  const [profile] = await fetch<ProfileBlock>('profile', true, 1);
  return profile;
}, {
  getCachedData(key, nuxt) {
    return nuxt.payload.data[key];
  },
  transform(profileBlock) {
    return omit(profileBlock!, ['contact', 'documentid', 'visibility']) as ProfileBlock;
  },
});

const { data } = useLazyAsyncData('others', async () => {
  const [career, [techstack], github, education] = await loadData();
  return {
    career,
    techstack,
    github,
    education,
  };
}, {
  getCachedData(key, nuxt) {
    return nuxt.payload.data[key];
  },
  transform({
    career,
    techstack,
    github,
    education,
  }) {
    return {
      career: career.map((each) => omit(each, ['documentid', 'visibility']) as CareerBlock),
      techstack: omit(techstack!, ['documentid', 'visibility']) as TechstackBlock,
      github: github.map((each) => omit(each, ['documentid', 'visibility']) as GithubBlock),
      education: education.map((each) => omit(each, ['documentid', 'visibility']) as EducationBlock),
    };
  },
});

const tracker = (event_section: ImpressionEventParams['event_section']) => {
  trackImpressionCollectionEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section,
  });
  onEnteringComponent(event_section);
};

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
