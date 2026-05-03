/* eslint-disable no-console */
const PROCESS_NAME = 'Clear nitro cache';

export default defineEventHandler(async (event) => {
  requireBasicAuth(event);
  console.time(PROCESS_NAME);
  try {
    const storage = useStorage();
    await storage.clear();
    return {
      success: true,
      message: 'Nitro cache cleared',
    };
  } catch (e) {
    return {
      success: false,
      message: (e as Error).message || 'Failed to clear nitro cache',
    };
  } finally {
    console.timeEnd(PROCESS_NAME);
    console.log('clear-cache.post.ts executed');
  }
});
