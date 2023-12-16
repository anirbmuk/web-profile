import { fetchCollection } from '~/core/firebase.core';

export const useFirebase = () => {
  const { $firebaseApp } = useNuxtApp();
  const { $i18n } = useNuxtApp();

  const fetch = async <T>(path: string, limit?: number | undefined) => {
    if (!$firebaseApp) {
      throw createError({
        message: $i18n.t('error.firebase_config'),
        statusCode: 500,
        statusMessage: $i18n.t('error.firebase_config'),
        fatal: true,
      });
    }
    const data = await fetchCollection<T>($firebaseApp, {
      collections: [path],
      whereClause: [{ column: 'visibility', operator: '==', condition: 'public' }],
      ...((limit ?? -1) > 0 && { limit }),
    }).catch(() => [] as T[]);

    if (!data.length) {
      throw createError({
        message: $i18n.t('error.no_data_found', { path }),
        statusCode: 400,
        statusMessage: $i18n.t('error.no_data_found', { path }),
        fatal: true,
      });
    }

    return data;
  };

  return {
    fetch,
  };
};
