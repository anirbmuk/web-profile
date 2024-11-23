import { FirebaseController } from './../core/firebase';
import { RedisController } from './../core/redis';
import { getSlug } from './../helpers/url.helper';
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
    redis: {
      host,
      port,
      prefix,
    },
  } = useRuntimeConfig();
  const path = getSlug(event.path, apiBasePath);
  if (!path) {
    throw new Error('No request handler exists for empty path');
  }

  const query = getQuery<SupportedQueryParams>(event);

  const limit = isNaN(+query.limit) ? undefined : +query.limit;
  const { lang } = query;

  const slug = lang ? `${path}_${lang}` : path;

  const firebase = FirebaseController.getInstance({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  });
  const redis = RedisController.getInstance({
    host,
    port,
    prefix,
  });
  const key = `${slug}_${limit ?? -1}`;

  const cached = await redis.getCache(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const data = await firebase.fetch(slug, limit);
  await redis.setCache(key, data);

  return data;
});
