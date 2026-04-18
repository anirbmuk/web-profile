import { generateSitemap } from './../helpers/generate';

export default defineEventHandler((event) => {
  const { sitemap: { sourceUrl } } = useRuntimeConfig();

  setHeader(event, 'Content-Type', 'application/xml');
  return generateSitemap(sourceUrl);
});
