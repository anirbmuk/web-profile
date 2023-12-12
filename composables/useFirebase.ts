import { fetchCollection } from '~/core/firebase.core';

export const useFirebase = () => {
  const { $firebaseApp } = useNuxtApp();
  const { loadingState } = useLoader();

  const fetch = async <T>(path: string, limit?: number | undefined) => {
    loadingState.value = true;
    if (!$firebaseApp) {
      throw new Error('Firestore configuration object is not initialized');
    }
    return await fetchCollection<T>($firebaseApp, {
      collections: [path],
      whereClause: [{ column: 'visibility', operator: '==', condition: 'public' }],
      ...((limit ?? -1) > 0 && { limit }),
    })
      .catch((e) => {
        console.error(`Error while fetching data for path '${path}'`, e);
        return [] as T[];
      })
      .finally(() => (loadingState.value = false));
  };

  return {
    fetch,
    loadingState,
  };
};
