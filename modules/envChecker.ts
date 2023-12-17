import { defineNuxtModule } from '@nuxt/kit';

const environmentVariables = [
  'APP_ENV',
  'DEFAULT_DOMAIN',
  'NUXT_PUBLIC_BASE_URL',
  'NUXT_PUBLIC_GTAG_ID',
  'NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
  'NUXT_API_KEY',
  'NUXT_AUTH_DOMAIN',
  'NUXT_PROJECT_ID',
  'NUXT_STORAGE_BUCKET',
  'NUXT_MESSAGING_SENDER_ID',
  'NUXT_APP_ID',
  'NUXT_MEASUREMENT_ID',
];

const isNotEmpty = (value: unknown) => {
  return !!value && (value as string).trim() !== '';
};

const checkMissingEnvVars = (variables = {}) => {
  const missing = environmentVariables.filter((key) => !isNotEmpty(variables[key]));
  if (missing?.length) {
    throw new Error(
      `The following environment variables are not set up: '${missing.join(
        ', ',
      )}'. Refer to ".env-template" file for the complete list.`,
    );
  }
};

export default defineNuxtModule(() => checkMissingEnvVars(process.env));
