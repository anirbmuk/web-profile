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
        const [base] = path.split(`${defaultLocale}`);
        if (base.endsWith('/')) {
            return base.slice(0, -1);
        }
        return base;
    };

    const getCanonical = (path = fullPath) => stripDefaultLocale(stripUrlParams(`${baseUrl}${path}`));

    return {
        getCanonical,
    };
};