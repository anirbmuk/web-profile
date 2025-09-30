export const getSlug = function (path: string, base = '') {
  let [, slug = ''] = path.split(base);
  if (slug.startsWith('/')) {
    slug = slug.slice(1);
  }
  const [noparam] = slug?.split('?') || [];
  return noparam;
};
