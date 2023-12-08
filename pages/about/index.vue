<template>
  <div class="my-24 md:my-40">
    <article v-if="aboutme" class="mx-auto text-justify text-md md:text xl:max-w-1/2">
      <p
        v-for="content of aboutme"
        :key="content.documentid"
        class="px-4 py-4 md:py-5"
        v-html="content.description || ''"></p>
    </article>
  </div>
</template>

<script setup lang="ts">
import { ABOUTME } from '~/constants/url';
import type { AboutmeBlock } from '~/types/features/about';

const { fetch } = useFirebase();

const aboutme = (await fetch<AboutmeBlock>(ABOUTME))?.sort(
  (a1, a2) => a1.position - a2.position,
);
</script>
