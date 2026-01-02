import locales from '~/config/locales';
import type { AlternateHreflang } from '~/types/seo';
import type {
  ListItem,
  Person,
  WithContext,
} from 'schema-dts';
import type { CareerBlock } from '~/types/features/career';

const SCHEMA_ORG = 'https://schema.org';

export const useSeo = () => {
  const { $i18n } = useNuxtApp();
  const { fullPath } = useRoute();
  const { public: { baseUrl } } = useRuntimeConfig();

  const stripUrlParams = (path: string | undefined): string => {
    if (!path) {
      return '';
    }
    const [root = ''] = path.split('?');
    return root;
  };

  const stripDefaultLocale = (path: string): string => {
    let sanitizedBase = path;
    if (sanitizedBase.endsWith('/')) {
      sanitizedBase = sanitizedBase.slice(0, -1);
    }
    return sanitizedBase;
  };

  const getCanonical = (path = fullPath): string =>
    stripDefaultLocale(stripUrlParams(`${baseUrl}${path}`));

  const getArrayFromTranslation = (source = ''): string[] =>
    source.split(',').map((each) => each.trim());

  const generateAlternateLinks = (page?: string): AlternateHreflang[] => {
    const alternateHreflangs: AlternateHreflang[] = [];
    for (const locale of locales) {
      alternateHreflangs.push({
        rel: 'alternate',
        hreflang: locale.language,
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

  const getAlternateISOLocales = (currentLocale: string): string[] => {
    return locales
      .filter(({ code }) => code !== currentLocale)
      .map(({ language }) => language);
  };

  const getISOLocale = (localeCode: string): string => {
    const locale = locales.find(({ code }) => code === localeCode);
    return locale ? locale.language : 'en-US';
  };

  const getIsoMonthDate = (source: CareerBlock['start'] | CareerBlock['end']): string | undefined => {
    if (!source) {
      return;
    }
    const [month = '', year = ''] = source.split('/');
    return `${year}-${month.padStart(2, '0')}`;
  };

  const generatePersonSchema = (careers: CareerBlock[] = []): WithContext<Person> => ({
    '@context': SCHEMA_ORG,
    '@type': 'Person',
    name: 'Anirban Mukherjee',
    alternateName: 'anirbmuk',
    gender: 'https://schema.org/Male',
    jobTitle: $i18n.t('seo.person.jobTitle'),
    email: 'anirban.mjee@gmail.com',
    knowsLanguage: getArrayFromTranslation($i18n.t('seo.person.knowsLanguage')),
    nationality: $i18n.t('seo.person.nationality'),
    memberOf: careers.map((career) => {
      return {
        '@type': 'ProgramMembership',
        programName: career.designation,
        startDate: getIsoMonthDate(career.start),
        endDate: getIsoMonthDate(career.end),
        description: career.description,
        hostingOrganization: {
          '@type': 'Organization',
          name: career.provider,
        },
      };
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: $i18n.t('seo.person.address.addressLocality'),
      addressCountry: $i18n.t('seo.person.address.addressCountry'),
    },
    url: `${baseUrl}/${$i18n.locale.value}`,
    sameAs: [
      'https://www.linkedin.com/in/anirbmuk',
      'https://x.com/anirbmuk',
      'https://stackoverflow.com/users/9652773/anirbmuk',
    ],
    knowsAbout: [
      'Vue',
      'Nuxt',
      'Angular',
      'TypeScript',
      'JavaScript',
    ],
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Jadavpur University',
        alternateName: 'JU',
        department: $i18n.t('seo.person.alumniOf.department'),
        address: {
          '@type': 'PostalAddress',
          addressLocality: $i18n.t('seo.person.alumniOf.address.addressLocality'),
          addressCountry: $i18n.t('seo.person.alumniOf.address.addressCountry'),
        },
      },
    ],
  });

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
      '@context': SCHEMA_ORG,
      ...(position && {
        position,
      }),
      item: {
        '@type': 'Article',
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
          '@type': 'Person',
          name: 'Anirban Mukherjee',
          alternateName: 'anirbmuk',
          url: `${baseUrl}/${$i18n.locale.value}`,
        },
      },
    };
  };

  const generateTechStackSchema = ({
    position,
    name,
    description,
  }: {
    position: number,
    name: string,
    description: string,
  }): WithContext<ListItem> => {
    return {
      '@type': 'ListItem',
      '@context': SCHEMA_ORG,
      ...(position && {
        position,
      }),
      item: {
        '@type': 'Thing',
        name,
        description,
      },
    };
  };

  return {
    getCanonical,
    getAlternateISOLocales,
    getISOLocale,
    generateAlternateLinks,
    generateListSchema,
    generatePersonSchema,
    generateTechStackSchema,
  };
};
