import { fetchCollection } from '~/core/firebase.core';

export const useFirebase = () => {
  const { $firebaseApp } = useNuxtApp();

  const get = <T>(path: string, limit = 1) =>
    fetchCollection<T>($firebaseApp.value!, {
      collections: [path],
      whereClause: [{ column: 'visibility', operator: '==', condition: 'public' }],
      ...(limit > 0 && { limit }),
    });

  return {
    get,
    $firebaseApp,
  };
};
