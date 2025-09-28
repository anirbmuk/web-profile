/* eslint-disable no-console */
export default defineEventHandler(async () => {
  const storage = useStorage();

  console.warn('WARNING: clearing nitro cache');
  console.time('NITRO_CACHE');

  await storage.clear();
  console.timeEnd('NITRO_CACHE');
});
