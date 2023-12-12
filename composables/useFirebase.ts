import { fetchCollection } from '~/core/firebase.core';

export const useFirebase = () => {
  const { $firebaseApp } = useNuxtApp();

  const fetch = async <T>(path: string, limit?: number | undefined) => {
    if (!$firebaseApp) {
      throw createError({
        message: 'Firestore configuration object is not initialized',
        statusCode: 500,
        statusMessage: 'Firestore configuration object is not initialized',
        fatal: true,
      });
    }
    const data = await fetchCollection<T>($firebaseApp, {
      collections: [path],
      whereClause: [{ column: 'visibility', operator: '==', condition: 'public' }],
      ...((limit ?? -1) > 0 && { limit }),
    }).catch((e) => {
      console.error(e);
      return [] as T[];
    });

    if (!data.length) {
      throw createError({
        message: `No data received while fetching for path '${path}'`,
        statusCode: 400,
        statusMessage: `Error at path '${path}'`,
        fatal: true,
      });
    }

    return data;
  };

  return {
    fetch,
  };
};
