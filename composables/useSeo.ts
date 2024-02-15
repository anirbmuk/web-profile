export const useSeo = () => {
    const { fullPath } = useRoute();
    const { $i18n } = useNuxtApp();
    const {
        public: { baseUrl },
      } = useRuntimeConfig();

    const defaultLocale = $i18n.defaultLocale;

    const stripUrlParams = (path: string) => {
        const [root] = path.split('?');
        return root;
    };

    const stripDefaultLocale = (path: string) => {
        let sanitizedBase = path;
        if (sanitizedBase.endsWith('/')) {
            sanitizedBase = sanitizedBase.slice(0, -1);
        }
        if (sanitizedBase.endsWith(`/${defaultLocale}`)) {
            const [base] = sanitizedBase.split(`/${defaultLocale}`);
            return base;
        }
        return sanitizedBase;
    };

    const getCanonical = (path = fullPath) => stripDefaultLocale(stripUrlParams(`${baseUrl}${path}`));

    return {
        getCanonical,
    };
};