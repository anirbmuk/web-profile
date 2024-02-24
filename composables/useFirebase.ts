import { fetchOfflineCollection } from '~/core/firebase.core';
import type { SupportedSlug } from '~/types/url';

export const useFirebase = () => {
  const { $i18n } = useNuxtApp();
  const {
    public: { offlineMode, apiBasePath = '' },
  } = useRuntimeConfig();
  const { getLocalizedSlug } = useSlug();

  const fetch = async <T>(
    path: SupportedSlug,
    localize = true,
    limit?: number | undefined,
  ) => {
    const slug = localize ? getLocalizedSlug(path) : path;
    const limitParam = (limit ?? -1) > 0 ? `?limit=${limit}` : '';

    const data = offlineMode
      ? await fetchOfflineCollection<T>(slug)
      : await $fetch<T[]>(`${apiBasePath}/${slug}${limitParam}`);

    if (!data?.length) {
      throw createError({
        message: $i18n.t('error.no_data_found', { path }),
        statusCode: 400,
        fatal: true,
      });
    }

    return data;
  };

  return {
    fetch,
  };
};
