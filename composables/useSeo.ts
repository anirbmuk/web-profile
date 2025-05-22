import locales from '~/config/locales';
import type { AlternateHreflang } from '~/types/seo';
import type {
  ListItem,
  WithContext,
} from 'schema-dts';

export const useSeo = () => {
  const { $i18n } = useNuxtApp();
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

  const generateListSchema = ({
    position,
    name,
    description,
    image,
    url,
    additional,
  }: {
    position: number,
    name: string,
    description: string,
    image?: string,
    url?: string,
    additional?: string[],
  }): WithContext<ListItem> => {
    return {
      '@type': 'ListItem',
      '@context': 'https://schema.org',
      ...(position && {
        position,
      }),
      item: {
        '@type': 'SoftwareSourceCode',
        ...(url && {
          url,
        }),
        name,
        headline: description,
        ...(image && {
          image,
        }),
        ...(additional && {
          programmingLanguage: additional.join(', '),
        }),
        author: {
          name: 'Anirban Mukherjee (anirbmuk)',
          '@type': 'Person',
          url: `${baseUrl}/${$i18n.locale.value}`,
        },
      },
    };
  };

  return {
    getCanonical,
    generateAlternateLinks,
    generateListSchema,
  };
};
