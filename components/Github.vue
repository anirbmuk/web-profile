<template>
  <section>
    <UiAccordion :state-key="'github'">
      <template #heading>
        <h3 class="md:heading gradient-text">
          {{ $i18n.t('main.github.title') }}
        </h3>
      </template>
      <template #content>
        <div class="grid snap-x snap-mandatory gap-2 max-md:auto-cols-[87.5%] max-md:grid-flow-col max-md:overflow-y-hidden max-md:overscroll-contain md:snap-none md:grid-cols-2 md:gap-3 2xl:grid-cols-3 3xl:grid-cols-4">
          <template
            v-for="(repo, index) in block"
            :key="`github_${index + 1}`">
            <UiLinkOrText
              :href="repo?.value?.toString()"
              class="max-md:snap-start"
              @link-click="onLinkClick(repo?.value?.toString())">
              <div
                v-if="repo?.value"
                class="mb-2.5 flex h-32 items-center rounded border border-gray-300 p-4 duration-300 ease-in-out hover:scale-105 hover:bg-gray-50 max-lg:pointer-events-none md:m-0.5 lg:h-36 dark:bg-transparent dark:hover:bg-transparent">
                <div class="items-center space-y-2">
                  <div class="flex items-center space-x-2">
                    <LazyUiIcon
                      :icon="'github'"
                      :size="7"
                      loading="lazy"/>
                    <div
                      class="-mt-1 text md:text-2xl"
                      translate="no">
                      {{ transformRepo(repo?.value?.toString()) }}
                    </div>
                  </div>
                  <div
                    class="text-md text-gray-500 lg:hidden"
                    translate="no">
                    {{ transformTechstack(repo?.technologies) }}
                  </div>
                  <div class="hidden space-x-2 lg:flex">
                    <UiChip
                      v-for="technology in repo?.technologies"
                      :key="technology"
                      :text="technology" />
                  </div>
                  <div class="text-md leading-4">
                    {{ repo?.description }}
                  </div>
                </div>
              </div>
            </UiLinkOrText>
          </template>
        </div>
      </template>
    </UiAccordion>
  </section>
</template>

<script setup lang="ts">
import type { GithubBlock } from '~/types/features/github';

const { $i18n } = useNuxtApp();
const { trackExternalClickEvent } = useTracking();
const { generateListSchema } = useSeo();

const props = defineProps({
  block: {
    type: Array as PropType<GithubBlock[]>,
    required: true,
  },
});

const transformRepo = (value: string | undefined) => {
  if (!value) {
    return;
  }
  const urlParts = value.split('/');
  const repo = urlParts?.pop();
  return `${repo}`;
};

const transformTechstack = (value: string[] | undefined) => {
  if (!value) {
    return '';
  }
  return value?.join(', ') ?? '';
};

const onLinkClick = (event_url: string | undefined) => {
  trackExternalClickEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section: 'profile_section',
    event_url,
  });
};

useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: props.block.length,
  itemListElement: props.block.map(({
    value,
    description,
    image,
    technologies,
  }, position) => generateListSchema({
    name: transformRepo(String(value)) || '',
    description,
    image,
    position: position + 1,
    url: String(value),
    additional: technologies,
  })),
}));

defineOptions({
  name: 'GithubComponent',
});
</script>
