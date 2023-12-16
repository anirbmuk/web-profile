export const useSlug = () => {
  const { $i18n } = useNuxtApp();

  const getLocalizedSlug = (slug: string) => `${slug}_${$i18n.locale.value}`;

  return {
    getLocalizedSlug,
  };
};
