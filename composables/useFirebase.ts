import { fetchCollection, fetchOfflineCollection } from '~/core/firebase.core';
import type { SupportedSlug } from '~/types/url';

export const useFirebase = () => {
  const { $firebaseApp, $i18n } = useNuxtApp();
  const {
    public: { offlineMode },
  } = useRuntimeConfig();
  const { getLocalizedSlug } = useSlug();

  const fetch = async <T>(
    path: SupportedSlug,
    localize = true,
    limit?: number | undefined,
  ) => {
    if (!$firebaseApp) {
      throw createError({
        message: $i18n.t('error.firebase_config'),
        statusCode: 500,
        fatal: true,
      });
    }

    const slug = localize ? getLocalizedSlug(path) : path;

    const data = offlineMode
      ? await fetchOfflineCollection<T>(slug)
      : await fetchCollection<T>($firebaseApp, {
        collections: [slug],
        whereClause: [{ column: 'visibility', operator: '==', condition: 'public' }],
        ...((limit ?? -1) > 0 && { limit }),
      }).catch(() => [] as T[]);

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
