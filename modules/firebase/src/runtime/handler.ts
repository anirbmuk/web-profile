import { FirebaseController } from '../core/firebase';
import { getSlug } from '../helpers/url.helper';
import type { SupportedQueryParams } from './../types';

export default defineEventHandler(async (event) => {
  const {
    firebase: {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
      apiBasePath,
    },
  } = useRuntimeConfig();
  // eslint-disable-next-line no-console
  console.log('[DEBUG]', '[firebase]::handler::apiKey', apiKey ? 'true' : 'false');
  const path = getSlug(event.path, apiBasePath);
  // eslint-disable-next-line no-console
  console.log('[DEBUG]', '[firebase]::handler::path', path);
  if (!path) {
    throw new Error('No request handler exists for empty path');
  }

  const query = getQuery<SupportedQueryParams>(event);

  const limit = isNaN(+query.limit) ? undefined : +query.limit;
  const lang = query.lang;

  const slug = lang ? `${path}_${lang}` : path;

  // eslint-disable-next-line no-console
  console.log('[DEBUG]', '[firebase]::handler::slug', slug);

  const firebase = FirebaseController.getInstance({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  });
  // eslint-disable-next-line no-console
  console.log('[DEBUG]', '[firebase]::handler::instance', firebase ? 'true' : 'false');

  return await firebase.fetch(slug, limit);
});
