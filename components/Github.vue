<template>
  <section>
    <UiAccordion :state-key="'github'">
      <template #heading>
        <h2 class="md:heading gradient-text text-xl md:text-3xl lg:text-4xl">
          {{ $i18n.t('main.github.title') }}
        </h2>
      </template>
      <template #content>
        <div class="grid snap-x snap-mandatory gap-2 max-md:auto-cols-[87.5%] max-md:grid-flow-col max-md:overflow-y-hidden max-md:overscroll-contain md:snap-none md:grid-cols-2 md:gap-3 2xl:grid-cols-3 3xl:grid-cols-4">
          <template
            v-for="(repo, index) in block"
            :key="`github_${index + 1}`">
            <UtilIntersect
              v-if="repo?.value"
              class="max-md:snap-start"
              @tracked="
                tracker('github_section', String(repo.value))
              ">
              <UiLinkOrText
                :href="String(repo.value)"
                class="max-lg:-outline-offset-1"
                @link-click="onLinkClick(String(repo.value))">
                <div class="mb-2.5 flex h-32 items-center rounded border border-gray-300 p-4 duration-300 ease-in-out md:m-0.5 lg:h-36 lg:hover:scale-105 lg:hover:bg-gray-50 dark:bg-transparent dark:lg:hover:bg-transparent">
                  <div class="items-center space-y-2">
                    <div class="flex items-center space-x-2">
                      <LazyUiIcon
                        :icon="'github'"
                        :size="7"
                        loading="lazy"/>
                      <div
                        class="-mt-1 text md:text-2xl"
                        translate="no">
                        {{ transformRepo(String(repo.value)) }}
                      </div>
                    </div>
                    <div
                      class="text-md text-gray-500 lg:hidden"
                      translate="no">
                      {{ transformTechstack(repo?.technologies) }}
                    </div>
                    <div class="hidden space-x-2 lg:flex">
                      <ul
                        class="m-0 flex list-none flex-wrap items-center gap-1 p-0"
                        :aria-label="$i18n.t('global.accessibility.ariaLabel.technologies')">
                        <UiChip
                          v-for="technology in repo?.technologies"
                          :key="technology"
                          :text="technology" />
                      </ul>
                    </div>
                    <div class="text-md leading-4">
                      {{ repo?.description }}
                    </div>
                  </div>
                </div>
              </UiLinkOrText>
            </UtilIntersect>
          </template>
        </div>
      </template>
    </UiAccordion>
  </section>
</template>

<script setup lang="ts">
import type { GithubBlock } from '~/types/features/github';
import type { ImpressionEventParams } from '~/types/tracking';

const { $i18n } = useNuxtApp();
const {
  trackExternalClickEvent,
  trackImpressionItemEvent,
} = useTracking();
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

const tracker = (event_section: ImpressionEventParams['event_section'], item: string) =>
  trackImpressionItemEvent({
    pageTitle: window.document.title,
    pageType: 'home',
    pageUrl: window.location.href,
    locale: $i18n.locale.value,
    event_section,
    item,
  });

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
