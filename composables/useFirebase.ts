import { fetchOfflineCollection } from '~/modules/firebase/src/core/firebase.core';
import type { SupportedSlug } from '~/types/url';

export const useFirebase = () => {
  const { $i18n } = useNuxtApp();
  const {
    public: {
      offlineMode, apiBasePath = '/api', 
    }, 
  } = useRuntimeConfig();
  const { getLocalizedSlug } = useSlug();

  const fetch = async <T>(
    path: SupportedSlug,
    localize = true,
    limit?: number | undefined,
  ) => {
    const slug = localize ? getLocalizedSlug(path) : path;
    const langParam = [localize ? `lang=${$i18n.locale.value}` : ''];
    const limitParam = [(limit ?? -1) > 0 ? `limit=${limit}` : ''];
    const allParams = [...langParam, ...limitParam].filter(Boolean).join('&');
    const params = allParams ? `?${allParams}` : '';

    const data = offlineMode
      ? await fetchOfflineCollection<T>(slug)
      : await $fetch<T[]>(`${apiBasePath}/${path}${params}`);

    if (!data?.length) {
      throw createError({
        message: $i18n.t('error.no_data_found', {
          path, 
        }),
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
