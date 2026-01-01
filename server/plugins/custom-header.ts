export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', ({ headers }) => {
    if (headers) {
      headers['x-author'] = 'anirbmuk (github.com/anirbmuk)';
      if ('X-Powered-By' in headers) {
        delete headers['X-Powered-By'];
      }
      if ('x-powered-by' in headers) {
        delete headers['x-powered-by'];
      }
    }
  });
});
