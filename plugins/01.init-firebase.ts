import type { FirebaseApp } from 'firebase/app';
import type { FirebaseConfig } from '~/core/firebase';
import { initFirebaseApp } from '~/core/firebase.core';

const firebaseApp = ref<FirebaseApp | undefined>();

export default defineNuxtPlugin(({ ssrContext }) => {
  const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = useRuntimeConfig();
  const state = useState<FirebaseConfig>('firebase', () => ({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  }));

  firebaseApp.value = initFirebaseApp(state.value);
  if (ssrContext) {
    ssrContext.firebaseApp = firebaseApp.value;
  }

  return {
    provide: {
      firebaseApp,
    },
  };
});
