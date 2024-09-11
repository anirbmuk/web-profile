import locales from '~/config/locales';
import type { AlternateHreflang } from '~/types/seo';

export const useSeo = () => {
  const { fullPath } = useRoute();
  const { public: { baseUrl } } = useRuntimeConfig();

  const stripUrlParams = (path: string) => {
    const [root] = path.split('?');
    return root;
  };

  const stripDefaultLocale = (path: string) => {
    let sanitizedBase = path;
    if (sanitizedBase.endsWith('/')) {
      sanitizedBase = sanitizedBase.slice(0, -1);
    }
    return sanitizedBase;
  };

  const getCanonical = (path = fullPath) =>
    stripDefaultLocale(stripUrlParams(`${baseUrl}${path}`));


  const generateAlternateLinks = (page?: string) => {
    const alternateHreflangs: AlternateHreflang[] = [];
    for (const locale of locales) {
      alternateHreflangs.push({
        rel: 'alternate',
        hreflang: locale.code,
        href: page ? `${baseUrl}/${locale.code}/${page}` : `${baseUrl}/${locale.code}`,
      });
      if (locale.default) {
        alternateHreflangs.push({
          rel: 'alternate',
          hreflang: 'x-default',
          href: page ? `${baseUrl}/${locale.code}/${page}` : `${baseUrl}/${locale.code}`,
        });
      }
    }

    return alternateHreflangs;
  };

  return {
    getCanonical,
    generateAlternateLinks,
  };
};
