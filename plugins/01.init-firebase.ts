import type { FirebaseConfig } from '~/core/firebase';
import { initFirebaseApp } from '~/core/firebase.core';

export default defineNuxtPlugin(() => {
  const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = useRuntimeConfig();

  const state = useState<FirebaseConfig | undefined>('firebase', () => ({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  }));

  if (state.value) {
    initFirebaseApp(state.value);
  }

  if (process.client) {
    state.value = undefined;
  }
});
