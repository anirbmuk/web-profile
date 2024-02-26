import { generateSitemap } from './../helpers/generate';

export default defineEventHandler((event) => {
  const {
    sitemap: { sourceUrl },
  } = useRuntimeConfig();

  setHeader(event, 'Content-Type', 'xhtml+xml');
  return `${generateSitemap(sourceUrl)}`;
});
