export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:response', ({ headers }) => {
        if (headers) {
            headers['X-Author'] = 'anirbmuk (github.com/anirbmuk)';
        }
    });
});