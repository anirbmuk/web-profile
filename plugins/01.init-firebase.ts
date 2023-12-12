import type { FirebaseApp } from 'firebase/app';
import type { FirebaseConfig } from '~/core/firebase';
import { initFirebaseApp } from '~/core/firebase.core';

let firebaseApp: FirebaseApp | undefined;

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
    firebaseApp = initFirebaseApp(state.value);
  }

  if (process.client) {
    state.value = undefined;
  }

  return {
    provide: {
      firebaseApp,
    },
  };
});
