import { SupportedQueryParams } from '~/types/url';
import { FirebaseController } from '~/core/firebase';

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path');
  if (!path) {
    throw new Error(`No request handler exists for empty path`);
  }
  const query = getQuery<SupportedQueryParams>(event);
  const limit = isNaN(+query.limit) ? undefined : +query.limit;
  const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = useRuntimeConfig();

  const firebase = FirebaseController.getInstance({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  });

  return await firebase.fetch(path, limit);
});
