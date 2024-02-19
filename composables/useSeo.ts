export const useSeo = () => {
    const { fullPath } = useRoute();
    const {
        public: { baseUrl },
      } = useRuntimeConfig();

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

    const getCanonical = (path = fullPath) => stripDefaultLocale(stripUrlParams(`${baseUrl}${path}`));

    return {
        getCanonical,
    };
};
